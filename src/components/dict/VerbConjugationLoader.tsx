"use client";

import { IWordEntry } from "../../../models/WordEntry";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { useGeneratedContentLoader } from "@/lib/hooks/useGeneratedContentLoader";

export default function VerbConjugationLoader({
  wordEntry,
}: {
  wordEntry: IWordEntry;
}) {
  const conjugationLoader = useGeneratedContentLoader<"conjugation">(
    wordEntry.conjugation,
    "conjugation",
    wordEntry._id
  );

  return (
    <div>
      <h3>Conjugations</h3>
      {conjugationLoader.isLoading ? (
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
            {conjugationLoader.errorMessage || conjugationLoader.content}
          </p>
          <button
            className="btn btn-sm btn-primary ml-auto"
            onClick={() => conjugationLoader.reloadContent()}
          >
            <FaArrowRotateLeft />
            Regenerate
          </button>
        </div>
      )}
    </div>
  );
}
