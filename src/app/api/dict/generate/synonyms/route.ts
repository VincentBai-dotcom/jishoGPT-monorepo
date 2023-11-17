import connectToDB from "@/lib/db";
import WordEntry, { IWordEntry } from "../../../../../../models/WordEntry";
import {
  generateWordDescription,
  generateWordSynonyms,
} from "@/lib/openai/openaiServices";
import { Errors } from "../../../../../../errors";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  try {
    console.log("### Start generating synonyms for word");
    await connectToDB();
    const { wordID } = await req.json();
    console.log("Checking if word exists in the database");
    const wordEntry = await WordEntry.findOne<IWordEntry>({
      _id: wordID,
    }).select("+synonyms");
    if (!wordEntry) {
      console.log("The word does not exist in the database. Generation failed");
      return Response.json(Errors.wordEntryDoesNotExistError, { status: 400 });
    }
    console.log("Word entry found in the database");
    console.log("generating...");

    const timeOutPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        reject("Reqeust time out");
      }, 30000);
    });

    const synonyms = await Promise.race([
      generateWordSynonyms(wordEntry.word, wordEntry.pronunciation).then(
        (res) => {
          return res?.split(", ");
        }
      ),
      timeOutPromise,
    ]);

    console.log("Description generated");
    await WordEntry.updateOne({ _id: wordID }, { synonyms });
    revalidatePath(`/dict/word/${wordEntry._id}`);
    return Response.json({ synonyms });
  } catch (err) {
    console.log("### Description generation failed");
    console.log(err);
    return Response.json(err, {
      status: 400,
    });
  }
}
