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
    <div className="col-start-3 col-end-11">
      <WordSearchResults searchString={normalizedSearchString} />
    </div>
  );
}
