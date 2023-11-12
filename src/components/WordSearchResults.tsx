import { notFound } from "next/navigation";
import { IWordEntry } from "../../models/WordEntry";
import WordEntryListElement from "./WordEntryListElement";

async function getWordSearchResults(searchString: string) {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_PATH + "/api/dict/search",
    {
      method: "POST",
      body: JSON.stringify({
        searchString: searchString,
      }),
    }
  );

  if (res.ok) {
    return res.json();
  } else {
    return notFound();
  }
}

export default async function WordSearchResults({
  searchString,
}: {
  searchString: string;
}) {
  const searchResults: [IWordEntry] = await getWordSearchResults(searchString);
  return (
    <div className="flex flex-col gap-4 mt-4">
      {searchResults.map((wordEntry, index) => {
        return <WordEntryListElement wordEntry={wordEntry} key={index} />;
      })}
    </div>
  );
}