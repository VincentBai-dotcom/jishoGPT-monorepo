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
    <div className="grid grid-cols-6">
      <div
        className="col-span-6 grid grid-cols-4 bg-cover bg-center"
        style={{
          backgroundImage: `url(${homeBackground.src})`,
        }}
      >
        <div className="col-start-1 col-span-4 row-start-1 bg-neutral bg-opacity-50"></div>
        <div className="col-start-2 col-span-2 row-start-1 text-center z-20 py-10">
          <h1 className="mb-5 text-5xl font-bold text-neutral-content">
            JishoGPT
          </h1>
          <SearchBar />
        </div>
      </div>
      <div className="col-start-2 col-end-6">
        {searchResults.map((wordEntry, index) => {
          return <WordEntryListElement wordEntry={wordEntry} key={index} />;
        })}
      </div>
    </div>
  );
}
