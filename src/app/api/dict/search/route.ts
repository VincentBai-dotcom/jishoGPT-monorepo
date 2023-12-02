import connectToDB from "@/lib/db";
import WordEntry from "../../../../../models/WordEntry";

export async function POST(req: Request) {
  try {
    await connectToDB();
    console.log("### Searching word...");
    const { searchString, page = 0 } = await req.json();
    const query = {
      index: "wordEntry",
      compound: {
        must: [
          {
            text: {
              query: searchString,
              path: {
                wildcard: "*",
              },
            },
          },
        ],
        should: [
          {
            text: {
              query: searchString,
              path: ["word", "pronunciation"],
            },
          },
        ],
      },
    };
    const searchResult = await WordEntry.aggregate([
      { $search: query },
      {
        $facet: {
          metaData: [{ $count: "total" }, { $addFields: { page: page } }],
          data: [{ $skip: 10 * page }, { $limit: 10 }],
        },
      },
    ]);
    // return the entry if it's stored in the database
    return Response.json(searchResult);
  } catch (err) {
    console.log("### Searching failed");
    console.log(err);
    return Response.json(err, {
      status: 400,
    });
  }
}
