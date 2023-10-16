export const i18n = {
  defaultLocale: "en",
  locales: ["en", "ja", "zh-CN"],
} as const;

export type Locale = (typeof i18n)["locales"][number];

export const localeNameToLangName: Record<Locale, string> = {
  en: "English",
  ja: "Japanese",
  "zh-CN": "Simplified Chinese",
};
