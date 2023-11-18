"use client";

import { IWordEntry } from "../../../models/WordEntry";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { useGeneratedContentLoader } from "@/lib/hooks/useGeneratedContentLoader";

export default function VerbConjugationLoader({
  wordEntry,
}: {
  wordEntry: IWordEntry;
}) {
  const isVerbLodaer = useGeneratedContentLoader<"isVerb">(
    wordEntry.isVerb,
    "isVerb",
    wordEntry._id
  );

  return (
    <div>
      {isVerbLodaer.content && <VerbConjugationLoader wordEntry={wordEntry} />}
    </div>
  );
}
