"use client";
import { useState } from "react";
import { useEffect } from "react";
import { IWordEntry } from "../../../models/WordEntry";

export default function WordDescriptionLoader({
  wordEntry,
}: {
  wordEntry: IWordEntry;
}) {
  const savedDescription = wordEntry.description || "";
  const [isLoading, setIsLoading] = useState<boolean>(savedDescription === "");
  const [description, setDescription] = useState<string>(savedDescription);

  useEffect(() => {
    if (!savedDescription) {
      setIsLoading(true);
      const generateDescription = async (wordEntry: IWordEntry) => {
        const generateDiscriptionRes = await fetch(
          process.env.NEXT_PUBLIC_API_PATH + "/api/dict/generate-description",
          {
            method: "POST",
            body: JSON.stringify({
              wordID: wordEntry._id,
            }),
          }
        );

        if (generateDiscriptionRes.ok) {
          const generateDescription = await generateDiscriptionRes
            .json()
            .then((res_json) => res_json["description"]);

          setDescription(generateDescription);
        } else {
          setDescription("Word description generation failed :(");
        }
      };
      generateDescription(wordEntry);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [wordEntry, savedDescription]);

  return (
    <div>
      {isLoading ? (
        <div className="flex flex-col gap-4 w-52">
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
      ) : (
        <p>{description}</p>
      )}
    </div>
  );
}
