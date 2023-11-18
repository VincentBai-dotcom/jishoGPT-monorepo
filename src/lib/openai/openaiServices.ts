import OpenAI from "openai";
import { Prompts } from "./prompts";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const generateWordDescription = async (
  word: string,
  pronunciation: string
) => {
  try {
    const descriptions = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: Prompts.wordDescriptionSystemPrompt,
        },
        {
          role: "user",
          content: `${word}, pronounced as ${pronunciation}`,
        },
      ],
      model: "gpt-3.5-turbo",
      temperature: 0.2,
      max_tokens: 140,
    });
    return descriptions.choices[0].message.content;
  } catch (err) {
    console.log("Generation Failed");
    console.log(err);
    return null;
  }
};

export const generateWordSynonyms = async (
  word: string,
  pronunciation: string
) => {
  try {
    const descriptions = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: Prompts.synonymPrompt,
        },
        {
          role: "user",
          content: `${word} (${pronunciation})`,
        },
      ],
      model: "gpt-3.5-turbo",
      temperature: 0.2,
      max_tokens: 100,
    });
    return descriptions.choices[0].message.content;
  } catch (err) {
    console.log("Generation Failed");
    console.log(err);
    return null;
  }
};

export const generateWordUsageContext = async (
  word: string,
  pronunciation: string
) => {
  try {
    const descriptions = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: Prompts.usageContextPrompt,
        },
        {
          role: "user",
          content: `${word} (${pronunciation})`,
        },
      ],
      model: "gpt-3.5-turbo",
      temperature: 0.8,
      max_tokens: 350,
    });
    return descriptions.choices[0].message.content;
  } catch (err) {
    console.log("Generation Failed");
    console.log(err);
    return null;
  }
};
