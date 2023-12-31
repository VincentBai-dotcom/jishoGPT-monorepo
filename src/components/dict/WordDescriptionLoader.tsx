"use client";

import { IWordEntry } from "../../../models/WordEntry";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { useGeneratedContentLoader } from "@/lib/hooks/useGeneratedContentLoader";

export default function WordDescriptionLoader({
  wordEntry,
}: {
  wordEntry: IWordEntry;
}) {
  const descriptionLoader = useGeneratedContentLoader<"description">(
    wordEntry.description,
    "description",
    wordEntry._id
  );

  return (
    <div>
      <h3>Meaning</h3>
      {descriptionLoader.isLoading ? (
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
            {descriptionLoader.errorMessage || descriptionLoader.content}
          </p>
          <button
            className="btn btn-sm btn-primary ml-auto"
            onClick={() => descriptionLoader.reloadContent()}
          >
            <FaArrowRotateLeft />
            Regenerate
          </button>
        </div>
      )}
    </div>
  );
}
