"use client";

import { IWordEntry } from "../../../models/WordEntry";
import WordConjugationLoader from "./WordConjugationLoader";
import { useGenerativeIdentifier } from "@/lib/hooks/useGenerativeIdentifier";

export default function WordConjugationInvoker({
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
          <WordConjugationLoader wordEntry={wordEntry} />
        </>
      )}
    </div>
  );
}
