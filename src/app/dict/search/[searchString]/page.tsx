import WordEntryListElement from "@/components/WordEntryListElement";
import { notFound } from "next/navigation";
import { IWordEntry } from "../../../../../models/WordEntry";
async function getSearchResults(searchString: string) {
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

export default async function Page({
  params,
}: {
  params: { searchString: string };
}) {
  const normalizedSearchString = decodeURIComponent(
    params.searchString
  ).toLowerCase();
  console.log(`SeachString: ${normalizedSearchString}`);
  const searchResults: [IWordEntry] = await getSearchResults(
    normalizedSearchString
  );
  return (
    <div>
      {searchResults.map((wordEntry, index) => {
        return <WordEntryListElement wordEntry={wordEntry} key={index} />;
      })}
    </div>
  );
}
