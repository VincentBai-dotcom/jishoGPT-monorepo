import "server-only";
import type { Locale } from "../../i18n.config";

const dictionaries = {
  en: () => import("../dictionaries/en.json").then((module) => module.default),
  ja: () => import("../dictionaries/ja.json").then((module) => module.default),
  "zh-CN": () =>
    import("../dictionaries/zh-CN.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => dictionaries[locale]();
