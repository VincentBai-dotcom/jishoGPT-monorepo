"use client";

import { useGeneratedContentLoader } from "@/lib/hooks/useGeneratedContentLoader";
import { IWordEntry } from "../../../models/WordEntry";
import { FaArrowRotateLeft } from "react-icons/fa6";

export default function WordUsageContextLoader({
  wordEntry,
}: {
  wordEntry: IWordEntry;
}) {
  const usageContextLoader = useGeneratedContentLoader<"usageContext">(
    wordEntry.usageContext,
    "usageContext",
    wordEntry._id
  );

  return (
    <div>
      <h3>Usage Contexts</h3>
      {usageContextLoader.isLoading ? (
        <div
          className="flex flex-col gap-4 w-full"
          style={{ marginTop: "1rem" }}
        >
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
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
            {usageContextLoader.errorMessage || usageContextLoader.content}
          </p>
          <button
            className="btn btn-sm btn-primary ml-auto"
            onClick={() => usageContextLoader.reloadContent()}
          >
            <FaArrowRotateLeft />
            Regenerate
          </button>
        </div>
      )}
    </div>
  );
}
