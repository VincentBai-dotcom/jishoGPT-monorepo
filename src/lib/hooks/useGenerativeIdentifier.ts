import { useEffect, useState } from "react";

type identificationCategory = "isVerb";

export function useGeneratedContentLoader(
  initialContent: boolean | undefined,
  contentType: identificationCategory,
  wordID: string
) {
  const [identification, setIdentification] = useState(initialContent);

  useEffect(() => {
    if (identification === undefined) {
      const generateIdentification = async (wordID: string) => {
        try {
          const res = await fetch(
            process.env.NEXT_PUBLIC_API_PATH +
              `/api/dict/identifier/${contentType}`,
            {
              method: "POST",
              body: JSON.stringify({
                wordID,
              }),
            }
          );

          if (res.ok) {
            const generatedIdentification = await res
              .json()
              .then((res_json) => res_json[contentType]);

            setIdentification(generatedIdentification);
          }
        } catch (err) {
        } finally {
        }
      };
      generateIdentification(wordID);
    }
  }, [contentType, wordID, identification]);

  return { identification };
}
