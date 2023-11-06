import connectToDB from "@/lib/db";
import WordEntry from "../../../../../models/WordEntry";

export async function POST(req: Request) {
  try {
    await connectToDB();
    console.log("### Searching word...");
    const { searchString } = await req.json();
    const normalizedSearchString = searchString.toLowerCase();
    const searchResult = await WordEntry.find({
      $or: [
        { word: normalizedSearchString },
        { pronunciation: normalizedSearchString },
      ],
    });

    // return the entry if it's stored in the database
    if (searchResult !== null) {
      console.log("word found in database");
      console.log(searchResult);
      return Response.json(searchResult);
    } else {
      console.log("word not found");
      return Response.json(searchResult);
    }
  } catch (err) {
    return Response.json({ err });
  }
}
