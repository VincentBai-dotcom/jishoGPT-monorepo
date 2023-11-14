import { IWordEntry } from "../../../models/WordEntry";
import Link from "next/link";
import WordDefinitionViewShort from "./WordDefinitionViewShort";

export default function WordEntryListElement({
  wordEntry,
}: {
  wordEntry: IWordEntry;
}) {
  return (
    <Link
      href={`/dict/word/${wordEntry._id}`}
      className="rounded-2xl relative flex flex-col w-full bg-base-100 hover:bg-base-200 active:bg-base-300 shadow-xl"
    >
      <div className="card-body p-4">
        <h2 className="card-title">{wordEntry.word}</h2>
        <h5 className="card-title">{wordEntry.pronunciation}</h5>
        <div className="flex flex-col gap-2">
          {wordEntry.definitions.slice(0, 3).map((definition, index) => {
            return (
              <WordDefinitionViewShort definition={definition} key={index} />
            );
          })}
        </div>
      </div>
    </Link>
  );
}
