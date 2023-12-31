import type { Locale } from "../../i18n.config";

const dictionaries = {
  en: () => import("../dictionaries/en.json").then((module) => module.default),
  // ja: () => import("../dictionaries/ja.json").then((module) => module.default),
  // "zh-CN": () =>
  //   import("../dictionaries/zh-CN.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale) =>
  dictionaries[locale]?.() ?? dictionaries.en();

export const localeNameToLangName: Record<Locale, string> = {
  en: "English",
  // ja: "日本語",
  // "zh-CN": "简体中文",
};

export const langNameToLocaleName: Record<string, Locale> = {
  English: "en",
};

export const listOfLangName = ["English"];
