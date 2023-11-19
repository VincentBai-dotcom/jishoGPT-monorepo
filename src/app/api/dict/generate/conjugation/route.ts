import connectToDB from "@/lib/db";
import WordEntry, { IWordEntry } from "../../../../../../models/WordEntry";
import { generateWordConjugation } from "@/lib/openai/openaiServices";
import { Errors } from "../../../../../../errors";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  try {
    console.log("### Start generating conjugation for word");
    await connectToDB();
    const { wordID } = await req.json();
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

    const timeOutPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        reject("Reqeust time out");
      }, 50000);
    });

    const conjugation = await Promise.race([
      generateWordConjugation(wordEntry.word, wordEntry.pronunciation),
      timeOutPromise,
    ]);

    console.log("Conjugation generated");
    await WordEntry.updateOne({ _id: wordID }, { conjugation });
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
