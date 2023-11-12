import WordSearchResults from "@/components/WordSearchResults";

export default async function Page({
  params,
}: {
  params: { searchString: string };
}) {
  const normalizedSearchString = decodeURIComponent(
    params.searchString
  ).toLowerCase();
  console.log(`SeachString: ${normalizedSearchString}`);

  return (
    <div>
      <WordSearchResults searchString={normalizedSearchString} />
    </div>
  );
}
