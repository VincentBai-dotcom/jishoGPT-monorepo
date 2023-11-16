import { useEffect, useState } from "react";

enum ContentType {
  description = "description",
  synonyms = "synonyms",
}

const getInitialContent = (contentType: ContentType): string | string[] => {
  switch (contentType) {
    case "description":
      return "";
    case "synonyms":
      return [];
  }
  return "";
};

const getErrorContent = (contentType: ContentType) => {
  switch (contentType) {
    case "description":
      return "Word description generation failed :(";
    case "synonyms":
      return ["Word description generation failed :("];
  }
  return "";
};

export function useContentLoader(
  initialContent: string,
  contentType: ContentType,
  wordID: number
) {
  const [content, setContent] = useState(
    initialContent || getInitialContent(contentType)
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!content) {
      const generateContent = async (wordID: number) => {
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
            setContent(getErrorContent(contentType));
          }
        } catch (err) {
          setContent(getErrorContent(contentType));
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
    setContent(getInitialContent(contentType));
  };

  return { content, isLoading, reloadContent };
}
