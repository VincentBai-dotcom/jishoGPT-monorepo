import OpenAI from "openai";
import { Prompts } from "./prompts";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const generateWordDescription = async (
  word: string,
  pronunciation: string
) => {
  try {
    const model = "gpt-4-1106-preview";
    const completions = await openai.chat.completions.create({
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
      model: model,
      temperature: 0.2,
      max_tokens: 140,
    });

    const inputToken = completions.usage?.prompt_tokens;
    const outputToken = completions.usage?.completion_tokens;
    const charge = chargeCalculator(inputToken || 0, outputToken || 0, model);
    return { description: completions.choices[0].message.content, charge };
  } catch (err) {
    console.log("Generation Failed");
    console.log(err);
  }
};

export const generateWordSynonyms = async (
  word: string,
  pronunciation: string
) => {
  try {
    const model = "gpt-3.5-turbo-1106";
    const completions = await openai.chat.completions.create({
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
      model: model,
      temperature: 0.2,
      max_tokens: 130,
    });
    const inputToken = completions.usage?.prompt_tokens;
    const outputToken = completions.usage?.completion_tokens;
    const charge = chargeCalculator(inputToken || 0, outputToken || 0, model);
    return { synonyms: completions.choices[0].message.content, charge };
  } catch (err) {
    console.log("Generation Failed");
    console.log(err);
  }
};

export const generateWordUsageContext = async (
  word: string,
  pronunciation: string
) => {
  try {
    const model = "gpt-3.5-turbo-1106";
    const completions = await openai.chat.completions.create({
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
      model: model,
      temperature: 0.8,
      max_tokens: 350,
    });
    const inputToken = completions.usage?.prompt_tokens;
    const outputToken = completions.usage?.completion_tokens;
    const charge = chargeCalculator(inputToken || 0, outputToken || 0, model);
    return { usageContext: completions.choices[0].message.content, charge };
  } catch (err) {
    console.log("Generation Failed");
    console.log(err);
  }
};

export const generateWordConjugation = async (
  word: string,
  pronunciation: string
) => {
  try {
    const model = "gpt-3.5-turbo-1106";
    const completions = await openai.chat.completions.create({
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
      model: model,
      temperature: 0.1,
      max_tokens: 600,
    });
    const inputToken = completions.usage?.prompt_tokens;
    const outputToken = completions.usage?.completion_tokens;
    const charge = chargeCalculator(inputToken || 0, outputToken || 0, model);
    return {
      conjugation: completions.choices[0].message.content || "",
      charge,
    };
  } catch (err) {
    console.log("Generation Failed");
    console.log(err);
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
  }
};

const chargeCalculator = (
  inputToken: number,
  outputToken: number,
  model: "gpt-3.5-turbo-1106" | "gpt-4-1106-preview"
) => {
  switch (model) {
    case "gpt-3.5-turbo-1106":
      return ((inputToken / 1000) * 0.001 + (outputToken / 1000) * 0.002) * 2;
    case "gpt-4-1106-preview":
      return ((inputToken / 1000) * 0.01 + (outputToken / 1000) * 0.03) * 2;
  }
};
