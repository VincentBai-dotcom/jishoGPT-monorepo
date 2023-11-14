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
    <div className="col-start-4 col-end-10">
      <article className="prose lg:prose-lg mt-4 max-w-none">
        <h3 style={{ margin: "0" }}>{wordEntry.pronunciation}</h3>
        <h1 style={{ margin: "0" }}>{wordEntry.word}</h1>
        <div className="divider"></div>
        <h3 style={{ marginTop: "0" }}>Description</h3>
      </article>
    </div>
  );
}
