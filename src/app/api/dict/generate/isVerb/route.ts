import connectToDB from "@/lib/db";
import WordEntry from "../../../../../../models/WordEntry";
import { IWordEntry } from "../../../../../../models/WordEntry";
import { verbIdentifier } from "@/lib/openai/openaiServices";
import { revalidatePath } from "next/cache";
import { Errors } from "../../../../../../errors";

export async function POST(req: Request) {
  try {
    console.log("### Start identifying if the word is a verb");
    await connectToDB();
    const { wordID } = await req.json();
    console.log("Checking if word exists in the database");
    const wordEntry = await WordEntry.findOne<IWordEntry>({
      _id: wordID,
    });
    if (!wordEntry) {
      console.log(
        "The word does not exist in the database. Identification failed"
      );
      return Response.json(Errors.wordEntryDoesNotExistError, { status: 400 });
    }
    console.log("Word entry found in the database");
    console.log("Identifying...");

    const timeOutPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        reject("Reqeust time out");
      }, 5000);
    });

    const isVerb = await Promise.race([
      verbIdentifier(wordEntry.word, wordEntry.pronunciation),
      timeOutPromise,
    ]);
    console.log("Identification completed");
    await WordEntry.updateOne({ _id: wordID }, { isVerb });
    revalidatePath(`/dict/word/${wordEntry._id}`);
    return Response.json({ isVerb });
  } catch (err) {
    console.log("### Description generation failed");
    console.log(err);
    return Response.json(err, {
      status: 400,
    });
  }
}
