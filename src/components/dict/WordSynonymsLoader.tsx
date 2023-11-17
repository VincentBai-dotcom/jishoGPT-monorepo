"use client";

import { IWordEntry } from "../../../models/WordEntry";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { useGeneratedContentLoader } from "@/lib/hooks/useGeneratedContentLoader";

export default function WordSynonymsLoader({
  wordEntry,
}: {
  wordEntry: IWordEntry;
}) {
  const synonymsLoader = useGeneratedContentLoader<"synonyms">(
    wordEntry.synonyms,
    "synonyms",
    wordEntry._id
  );

  return (
    <div>
      <h3>Synonyms</h3>
      {synonymsLoader.isLoading ? (
        <div
          className="flex flex-col gap-4 w-full"
          style={{ marginTop: "1rem" }}
        >
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
            {synonymsLoader.errorMessage || synonymsLoader.content?.join(", ")}
          </p>
          <button
            className="btn btn-sm btn-primary ml-auto"
            onClick={() => synonymsLoader.reloadContent()}
          >
            <FaArrowRotateLeft />
            Regenerate
          </button>
        </div>
      )}
    </div>
  );
}
