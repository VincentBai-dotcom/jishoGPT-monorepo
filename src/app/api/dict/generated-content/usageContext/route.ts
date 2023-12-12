import connectToDB from "@/lib/db";
import WordEntry, { IWordEntry } from "../../../../../../models/WordEntry";
import { generateWordUsageContext } from "@/lib/openai/openaiServices";
import { Errors } from "../../../../../../errors";
import { revalidatePath } from "next/cache";
import { promiseWithTimeout } from "@/lib/promiseWithTimeout";
import User, { IUser } from "../../../../../../models/User";

export async function POST(req: Request) {
  try {
    console.log("### Start generating usage context for word");
    await connectToDB();
    const { wordID, userID } = await req.json();
    console.log("Checking if word exists in the database");
    const wordEntry = await WordEntry.findOne<IWordEntry>({
      _id: wordID,
    }).select("+usageContext");
    if (!wordEntry) {
      console.log("The word does not exist in the database. Generation failed");
      return Response.json(Errors.wordEntryDoesNotExistError, { status: 400 });
    }
    console.log("Word entry found in the database");
    console.log("generating...");

    const { usageContext, charge } =
      (await promiseWithTimeout(
        generateWordUsageContext(wordEntry.word, wordEntry.pronunciation),
        60000
      )) || {};

    console.log("Usage context generated");

    const updateUsageContext = new Promise(async (resolve) => {
      if (usageContext) {
        await WordEntry.updateOne({ _id: wordID }, { usageContext });
      }
      resolve("");
    });

    const processCharge = new Promise(async (resolve) => {
      if (charge) {
        const user = await User.findOne<IUser>({ _id: userID });
        if (user) {
          await User.updateOne(
            { _id: userID },
            { searchCredit: Math.max(user.searchCredit - charge * 100, 0) }
          );
        }
      }
      resolve("");
    });
    await Promise.all([updateUsageContext, processCharge]);
    revalidatePath(`/dict/word/${wordEntry._id}`);
    return Response.json({ usageContext });
  } catch (err) {
    console.log("### Usage context generation failed");
    console.log(err);
    return Response.json(err, {
      status: 400,
    });
  }
}
