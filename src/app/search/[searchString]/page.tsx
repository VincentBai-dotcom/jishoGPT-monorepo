import { notFound } from "next/navigation";

async function getSearchResults(searchString: string) {
  const res = await fetch(process.env.API_PATH + "/api/dict/search", {
    method: "POST",
    body: JSON.stringify({
      searchString: searchString,
    }),
  });

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
  const normalizedSearchString = decodeURIComponent(params.searchString);
  console.log(`SeachString: ${normalizedSearchString}`);
  const searchResults = await getSearchResults(normalizedSearchString);
  console.log(searchResults[0]["definitions"]);
  return <h1>Search Page</h1>;
}
