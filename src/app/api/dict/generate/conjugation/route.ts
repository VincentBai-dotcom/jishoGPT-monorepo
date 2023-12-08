import connectToDB from "@/lib/db";
import WordEntry, { IWordEntry } from "../../../../../../models/WordEntry";
import { generateWordConjugation } from "@/lib/openai/openaiServices";
import { Errors } from "../../../../../../errors";
import { revalidatePath } from "next/cache";
import User, { IUser } from "../../../../../../models/User";

export async function POST(req: Request) {
  try {
    console.log("### Start generating conjugation for word");
    await connectToDB();
    const { wordID, userID } = await req.json();
    console.log("Checking if word exists in the database");
    const wordEntry = await WordEntry.findOne<IWordEntry>({
      _id: wordID,
    }).select("+conjugation");
    if (!wordEntry) {
      console.log("The word does not exist in the database. Generation failed");
      return Response.json(Errors.wordEntryDoesNotExistError, { status: 400 });
    }
    console.log("Word entry found in the database");
    console.log("generating...");

    const timeOutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => {
        reject("Reqeust time out");
      }, 50000);
    });

    const { conjugation = "", charge = 0 } =
      (await Promise.race([
        generateWordConjugation(wordEntry.word, wordEntry.pronunciation),
        timeOutPromise,
      ])) || {};

    console.log("Conjugation generated");
    const updateConjugation = new Promise(async () => {
      if (conjugation) {
        await WordEntry.updateOne({ _id: wordID }, { conjugation });
      }
    });

    const processCharge = new Promise(async () => {
      if (charge) {
        const user = await User.findOne<IUser>({ _id: userID });
        if (user) {
          await User.updateOne(
            { _id: userID },
            { searchCredit: Math.max(user.searchCredit - charge * 100, 0) }
          );
        }
      }
    });

    await Promise.all([updateConjugation, processCharge]);

    revalidatePath(`/dict/word/${wordEntry._id}`);
    return Response.json({ conjugation });
  } catch (err) {
    console.log("### Conjugation generation failed");
    console.log(err);
    return Response.json(err, {
      status: 400,
    });
  }
}
