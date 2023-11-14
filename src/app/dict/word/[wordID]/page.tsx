import { notFound } from "next/navigation";
import { IWordEntry } from "../../../../../models/WordEntry";

async function getWordEntryInfo(wordID: string) {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_PATH +
      "/api/dict/word/get?" +
      new URLSearchParams({
        wordID,
      }),
    {
      method: "GET",
    }
  );
  if (res.ok) {
    return res.json();
  } else {
    return notFound();
  }
}

export default async function Page({ params }: { params: { wordID: string } }) {
  const wordEntry: IWordEntry = await getWordEntryInfo(params.wordID);

  return (
    <div>
      <article className="prose lg:prose-xl ">
        <h1>{wordEntry.word}</h1>
        <h2>{wordEntry.pronunciation}</h2>
      </article>
    </div>
  );
}
