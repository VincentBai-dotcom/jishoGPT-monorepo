import "server-only";
import type { Locale } from "../../i18n.config";

type Dictionaries = {};

const dictionaries = (locale: Locale) => {
  switch (locale) {
    case "en":
      return () =>
        import("../dictionaries/en.json").then((module) => module.default);
    case "ja":
      return () =>
        import("../dictionaries/ja.json").then((module) => module.default);
    case "zh-CN":
      return () =>
        import("../dictionaries/zh-CN.json").then((module) => module.default);
  }
};

export const getDictionary = async (locale: Locale) => {
  return dictionaries(locale)();
};
