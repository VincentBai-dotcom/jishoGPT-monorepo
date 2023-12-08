import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

type ContentType =
  | "description"
  | "synonyms"
  | "usageContext"
  | "conjugation"
  | "isVerb";

type ContentDataType<T> =
  | (T extends "description"
      ? string
      : T extends "synonyms"
      ? string[]
      : T extends "usageContext"
      ? string
      : T extends "conjugation"
      ? string
      : T extends "isVerb"
      ? boolean
      : never)
  | undefined;

export function useGeneratedContentLoader<T extends ContentType>(
  initialContent: ContentDataType<T>,
  contentType: ContentType,
  wordID: string
) {
  const [content, setContent] = useState(initialContent);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const { data: session, status } = useSession();

  useEffect(() => {
    setErrorMessage("");
    if (!content) {
      const generateContent = async (wordID: string) => {
        setIsLoading(true);
        try {
          const generateContentRes = await fetch(
            process.env.NEXT_PUBLIC_API_PATH + `dict/generate/${contentType}`,
            {
              method: "POST",
              body: JSON.stringify({
                wordID,
                userID: session?.user?.id,
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
  }, [wordID, content, contentType, session?.user?.id]);

  const reloadContent = () => {
    setContent(undefined);
  };

  return { content, isLoading, reloadContent, errorMessage };
}
