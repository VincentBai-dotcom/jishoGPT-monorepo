import connectToDB from "@/lib/db";
import WordEntry, { IWordEntry } from "../../../../../../models/WordEntry";
import { type NextRequest } from "next/server";
import { Errors } from "../../../../../../errors";

export async function GET(req: NextRequest) {
  try {
    await connectToDB();
    console.log("### Fetching word info from database");
    const wordId = req.nextUrl.searchParams.get("wordID");
    const wordEntry = await WordEntry.findById<IWordEntry>(wordId).select(
      "+description +synonyms +usageContext +conjugation"
    );
    if (!wordEntry) {
      console.log("Word does not exist");
      return Response.json(Errors.wordEntryDoesNotExistError, {
        status: 400,
      });
    }
    console.log("Word found in database");

    if (wordEntry.isVerb === undefined) {
      const res = await fetch(
        process.env.NEXT_PUBLIC_API_PATH + "/api/dict/identify-verb",
        {
          method: "POST",
          body: JSON.stringify({
            wordID: wordEntry._id,
          }),
        }
      );
      if (res.ok) {
        wordEntry.isVerb = (await res.json())["isVerb"];
      } else {
        throw new Error("Verb identification failed");
      }
    }

    return Response.json(wordEntry);
  } catch (err) {
    console.log("fetching failed");
    console.log(err);
    return Response.json(err, {
      status: 400,
    });
  }
}
