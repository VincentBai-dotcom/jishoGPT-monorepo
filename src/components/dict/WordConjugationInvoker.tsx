"use client";

import { IWordEntry } from "../../../models/WordEntry";
import { useGeneratedContentLoader } from "@/lib/hooks/useGeneratedContentLoader";
import VerbConjugationLoader from "./VerbConjugationLoader";
import { useGenerativeIdentifier } from "@/lib/hooks/useGenerativeIdentifier";

export default function WordConjugationLoader({
  wordEntry,
}: {
  wordEntry: IWordEntry;
}) {
  const verbIdentifier = useGenerativeIdentifier(
    wordEntry.isVerb,
    "isVerb",
    wordEntry._id
  );
  return (
    <div>
      {verbIdentifier.identification === true && (
        <>
          <div className="divider"></div>
          <VerbConjugationLoader wordEntry={wordEntry} />
        </>
      )}
    </div>
  );
}
