"use client";
import { useEffect, useState } from "react";
import { notFound } from "next/navigation";

async function getWordEntryInfo(searchString: string) {
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

export default function Page({ params }: { params: { wordID: string } }) {
  const wordEntry = getWordEntryInfo(params.wordID);

  return (
    <article className="prose lg:prose-xl">
      <h1></h1>
    </article>
  );
}
