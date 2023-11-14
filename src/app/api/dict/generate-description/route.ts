import connectToDB from "@/lib/db";
import WordEntry, { IWordEntry } from "../../../../../models/WordEntry";
import { generateWordDescription } from "@/lib/openai/openaiServices";
import { Errors } from "../../../../../errors";

export async function POST(req: Request) {
  try {
    console.log("### Start generating description for word");
    await connectToDB();
    const { wordId } = await req.json();
    console.log("Checking if word exists in the database");
    const wordEntry = await WordEntry.findOne<IWordEntry>({
      _id: wordId,
    });
    if (!wordEntry) {
      console.log("The word does not exist in the database. Generation failed");
      return Response.json(Errors.wordEntryDoesNotExistError, { status: 400 });
    }
    console.log("Word entry found in the database");
    console.log("generating...");
    const description = await generateWordDescription(
      wordEntry.word,
      wordEntry.pronunciation
    );
    console.log("Description generated");

    await WordEntry.updateOne({ _id: wordId }, { description });
    return Response.json({ description });
  } catch (err) {
    console.log("### Description generation failed");
    console.log(err);
    return Response.json(err, {
      status: 400,
    });
  }
}
