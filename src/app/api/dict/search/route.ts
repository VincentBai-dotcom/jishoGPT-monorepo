import connectToDB from "@/lib/db";
import { NextResponse } from "next/server";
import WordEntry from "../../../../../models/WordEntry";

export async function POST(request: Request) {
  try {
    await connectToDB();
    console.log("### Searching word...");
    const body = await request.json();
    const searchString = body.searchString;
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
    }
    console.log("word not found");
    return Response.json(searchResult);
  } catch (err) {
    return Response.json({ err });
  }
}
