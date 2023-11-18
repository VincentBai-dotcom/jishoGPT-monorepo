import { useEffect, useState } from "react";

type ContentType = "description" | "synonyms" | "usageContext";

type ContentDataType<T> =
  | (T extends "description"
      ? string
      : T extends "synonyms"
      ? string[]
      : T extends "usageContext"
      ? string
      : never)
  | undefined;

export function useGeneratedContentLoader<T extends ContentType>(
  initialContent: ContentDataType<T>,
  contentType: ContentType,
  wordID: string
) {
  const [content, setContent] = useState(initialContent);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setErrorMessage("");
    if (!content) {
      const generateContent = async (wordID: string) => {
        setIsLoading(true);
        try {
          const generateContentRes = await fetch(
            process.env.NEXT_PUBLIC_API_PATH +
              `/api/dict/generate/${contentType}`,
            {
              method: "POST",
              body: JSON.stringify({
                wordID,
              }),
            }
          );

          if (generateContentRes.ok) {
            const generatedContent = await generateContentRes
              .json()
              .then((res_json) => res_json[contentType]);

            setContent(generatedContent);
          } else {
            setErrorMessage("Generation failed :(");
          }
        } catch (err) {
          setErrorMessage("Generation failed :(");
        } finally {
          setIsLoading(false);
        }
      };
      generateContent(wordID);
    } else {
      setIsLoading(false);
    }
  }, [wordID, content, contentType]);

  const reloadContent = () => {
    setContent(undefined);
  };

  return { content, isLoading, reloadContent, errorMessage };
}
