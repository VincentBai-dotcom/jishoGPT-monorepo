import { IWordEntry } from "../../models/WordEntry";
import Link from "next/link";

export default function WordEntryListElement({
  wordEntry,
}: {
  wordEntry: IWordEntry;
}) {
  return (
    <Link
      href={`/dict/word/${wordEntry.word}`}
      className="rounded-2xl relative flex flex-col w-full bg-base-100 shadow-xl"
    >
      <div className="card-body">
        <h2 className="card-title">{wordEntry.word}</h2>
        <h5 className="card-title">{wordEntry.pronunciation}</h5>
        {wordEntry.definitions.map((definition, index) => {
          return <div key={index}>{definition.definition.join(",")}</div>;
        })}
      </div>
    </Link>
  );
}
