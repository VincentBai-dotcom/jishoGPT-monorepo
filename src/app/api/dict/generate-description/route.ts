import connectToDB from "@/lib/db";
import WordEntry from "../../../../../models/WordEntry";
import { generateWordDescription } from "@/lib/openai/openaiServices";

export async function POST(req: Request) {
  try {
    console.log("### Start generating description for word");
    await connectToDB();
    const { word, pronunciation } = await req.json();
    console.log("Checking if word exists in the database");
    const wordEntry = await WordEntry.findOne({ word, pronunciation });
    if (!wordEntry) {
      console.log("The word does not exist in the database. Generation failed");
    }
    const wordDescription = await generateWordDescription(word, pronunciation);
    console.log("Description generated");
  } catch (err) {
    console.log("### Description generation failed");
    return Response.json(err, {
      status: 400,
    });
  }
}
