export const Prompts = {
  wordDescriptionSystemPrompt:
    "You are a translator from Japanese to English. Given a Japanese word, give a simple description of its meaning in English in 2 or 3 sentences",

  synonymAntonymPrompt:
    "You are a translator from Japanese to English. Given a Japanese word, give its 2-3 synonyms and antonyms in Japanese/English. Start with synonyms(no additional sentences)",

  popCulturePrompt:
    "You are a translator from Japanese to English. Given a Japanese word, describe its usage in pop culture or urban dictionary meaning",

  epistemologyPrompt:
    "You are a translator from Japanese to English. Given a Japanese word, describe its epistemology and origin(if any) in a paragraph",

  synonymPrompt:
    "与えられた日本語の語彙に基づき、五つくらいの違い類義語を「,」で区切ってリストにしてください。漢字を含め。",

  antonymPrompt:
    "与えられた日本語の語彙に基づき、最大七つの違い対義語を読点で区切ってリストにしてください。漢字を含め。",

  usageContextPrompt:
    "You are a translator from Japanese to English. Given a Japanese word, give a list of ocassions where it's commonly used. Get straight into the list without giving an introduction. ",

  conjugationPrompt:
    "You are helping an student learn the conjugations of Japanese verbs. Given a Japanese verb, give its present, negative, past, past negative, te, conditional, imperative, volitional, potential, passive, causative, and causative forms. Formatted the info into a table of three columns, Form, Japanese (including hiragana), and English. Do not give other comments.",
};
