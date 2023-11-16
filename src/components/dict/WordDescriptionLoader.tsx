"use client";
import { useState } from "react";
import { useEffect } from "react";
import { IWordEntry } from "../../../models/WordEntry";
import { FaArrowRotateLeft } from "react-icons/fa6";

export default function WordDescriptionLoader({
  wordEntry,
}: {
  wordEntry: IWordEntry;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [description, setDescription] = useState<string>(
    wordEntry.description === undefined ? "" : wordEntry.description
  );

  useEffect(() => {
    if (description === "") {
      const generateDescription = async (wordEntry: IWordEntry) => {
        setIsLoading(true);
        try {
          const generateDiscriptionRes = await fetch(
            process.env.NEXT_PUBLIC_API_PATH + "/api/dict/generate/description",
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
        } catch (err) {
          setDescription("Word description generation failed :(");
        } finally {
          setIsLoading(false);
        }
      };
      generateDescription(wordEntry);
    } else {
      setIsLoading(false);
    }
  }, [wordEntry, description]);

  return (
    <div>
      <h3>Meaning</h3>
      {isLoading ? (
        <div
          className="flex flex-col gap-4 w-full"
          style={{ marginTop: "1rem" }}
        >
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
      ) : (
        <div className="flex flex-col">
          <p
            style={{
              whiteSpace: "pre-line",
            }}
          >
            {description}
          </p>
          <button
            className="btn btn-sm btn-primary ml-auto"
            onClick={() => setDescription("")}
          >
            <FaArrowRotateLeft />
            Regenerate
          </button>
        </div>
      )}
    </div>
  );
}
