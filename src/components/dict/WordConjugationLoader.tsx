"use client";

import { IWordEntry } from "../../../models/WordEntry";
import { useGeneratedContentLoader } from "@/lib/hooks/useGeneratedContentLoader";
import VerbConjugationLoader from "./VerbConjugationLoader";

export default function WordConjugationLoader({
  wordEntry,
}: {
  wordEntry: IWordEntry;
}) {
  const isVerbLoadaer = useGeneratedContentLoader<"isVerb">(
    wordEntry.isVerb,
    "isVerb",
    wordEntry._id
  );
  console.log(wordEntry.isVerb);

  return (
    <div>
      {isVerbLoadaer.content === true && (
        <>
          <div className="divider"></div>
          <VerbConjugationLoader wordEntry={wordEntry} />
        </>
      )}
    </div>
  );
}
