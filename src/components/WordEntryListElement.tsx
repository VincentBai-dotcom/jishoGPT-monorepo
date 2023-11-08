import { IWordEntry } from "../../models/WordEntry";
import Link from "next/link";

export default function WordEntryListElement(wordEntry: IWordEntry) {
  return <Link href={`/word/${wordEntry.word}`}></Link>;
}
