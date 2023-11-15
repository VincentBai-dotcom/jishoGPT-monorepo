import { notFound } from "next/navigation";
import { IWordEntry } from "../../../../../models/WordEntry";
import WordDescriptionLoader from "@/components/dict/WordDescriptionLoader";
import WordDefinitionsBody from "@/components/dict/WordDefinitionsBody";

async function getWordEntryInfo(wordID: string) {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_PATH +
      "/api/dict/word/get?" +
      new URLSearchParams({
        wordID,
      }),
    {
      method: "GET",
      next: {
        tags: ["wordEntryInfo"],
      },
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
      <article className="prose lg:prose-lg mt-4 max-w-none prose-h3:m-0 prose-p:my-2 prose-li:my-0">
        <h3>{wordEntry.pronunciation}</h3>
        <h1 style={{ margin: "0" }}>{wordEntry.word}</h1>
        <div className="divider"></div>
        <WordDescriptionLoader wordEntry={wordEntry} />
        <div className="divider"></div>
        <WordDefinitionsBody wordEntry={wordEntry} />
      </article>
    </div>
  );
}
