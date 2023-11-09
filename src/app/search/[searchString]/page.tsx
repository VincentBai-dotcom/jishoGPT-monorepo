import SearchBar from "@/components/SearchBar";
import WordEntryListElement from "@/components/WordEntryListElement";
import { notFound } from "next/navigation";
import { IWordEntry } from "../../../../models/WordEntry";
import homeBackground from "/public/homeBackground.jpg";
import Image from "next/image";

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
    <div className="grid grid-cols-10">
      <div className="col-span-10 flex justify-center">
        <div className=" w-2/3">
          <SearchBar />
        </div>
      </div>
      <div className="col-start-3 col-end-7">
        {searchResults.map((wordEntry, index) => {
          return <WordEntryListElement wordEntry={wordEntry} key={index} />;
        })}
      </div>
    </div>
  );
}
