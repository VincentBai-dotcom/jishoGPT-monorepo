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
      model: "gpt-4-1106-preview",
      temperature: 0.2,
      max_tokens: 140,
    });
    console.log(
      `Prompt token for descriptions: ${descriptions.usage?.prompt_tokens}`
    );
    console.log(
      `Completion token for descriptions: ${descriptions.usage?.completion_tokens}`
    );
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
    const synonyms = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: Prompts.synonymPrompt,
        },
        {
          role: "user",
          content: `${word}, pronounced as ${pronunciation}`,
        },
      ],
      model: "gpt-3.5-turbo",
      temperature: 0.2,
      max_tokens: 130,
    });

    console.log(`Prompt token for synonyms: ${synonyms.usage?.prompt_tokens}`);
    console.log(
      `Completion token for synonyms: ${synonyms.usage?.completion_tokens}`
    );
    return synonyms.choices[0].message.content;
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
    const usageContext = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: Prompts.usageContextPrompt,
        },
        {
          role: "user",
          content: `${word}, pronounced as ${pronunciation}`,
        },
      ],
      model: "gpt-3.5-turbo",
      temperature: 0.8,
      max_tokens: 350,
    });
    console.log(
      `Prompt token for context: ${usageContext.usage?.prompt_tokens}`
    );
    console.log(
      `Completion token for context: ${usageContext.usage?.completion_tokens}`
    );
    return usageContext.choices[0].message.content;
  } catch (err) {
    console.log("Generation Failed");
    console.log(err);
    return null;
  }
};

export const generateWordConjugation = async (
  word: string,
  pronunciation: string
) => {
  try {
    const conjugations = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: Prompts.conjugationPrompt,
        },
        {
          role: "user",
          content: `${word}, pronounced as ${pronunciation}`,
        },
      ],
      model: "gpt-3.5-turbo",
      temperature: 0.1,
      max_tokens: 600,
    });
    console.log(
      `Prompt token for conjugations: ${conjugations.usage?.prompt_tokens}`
    );
    console.log(
      `Completion token for conjugations: ${conjugations.usage?.completion_tokens}`
    );
    return conjugations.choices[0].message.content;
  } catch (err) {
    console.log("Generation Failed");
    console.log(err);
    return null;
  }
};

export const verbIdentifier = async (word: string, pronunciation: string) => {
  try {
    const descriptions = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `Is ${word} pronounced as ${pronunciation} a verb?`,
        },
      ],
      model: "gpt-4-1106-preview",
      temperature: 0.0,
      max_tokens: 1,
    });
    return descriptions.choices[0].message.content?.charAt(0) === "Y";
  } catch (err) {
    console.log("Generation Failed");
    console.log(err);
    return null;
  }
};

const chargeCalculator = (
  inputToken: number,
  outputToken: number,
  model: "gpt-3.5-turbo" | "gpt-4-1106-preview"
) => {};
