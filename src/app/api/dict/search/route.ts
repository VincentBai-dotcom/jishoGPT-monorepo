import connectToDB from "@/lib/db";
import WordEntry from "../../../../../models/WordEntry";

export async function POST(req: Request) {
  try {
    await connectToDB();
    console.log("### Searching word...");
    const { searchString } = await req.json();
    const normalizedSearchString = searchString.toLowerCase();
    const searchResult = await WordEntry.aggregate([
      {
        $search: {
          index: "wordEntry",
          text: {
            query: normalizedSearchString,
            path: {
              wildcard: "*",
            },
          },
        },
      },
      {
        $limit: 50,
      },
    ]);

    // return the entry if it's stored in the database
    if (searchResult !== null) {
      console.log("word found in database");
      return Response.json(searchResult);
    } else {
      console.log("word not found");
      return Response.json(searchResult);
    }
  } catch (err) {
    console.log("### Searching failed");
    console.log(err);
    return Response.json(err, {
      status: 400,
    });
  }
}
