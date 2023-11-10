import OpenAI from "openai";
import { Prompts } from "./prompts";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const generateWordDescription = async (
  word: string,
  pronunciation: string
) => {
  const description = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: Prompts.wordDescriptionSystemPrompy,
      },
      {
        role: "user",
        content: `${word}, pronunced as ${pronunciation}`,
      },
    ],
    temperature: 0.2,
  });

  return description;
};
