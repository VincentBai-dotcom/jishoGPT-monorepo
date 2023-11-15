import WordSearchResults from "@/components/dict/WordSearchResults";

export default async function Page({
  params,
}: {
  params: { searchString: string };
}) {
  const normalizedSearchString = decodeURIComponent(
    params.searchString
  ).toLowerCase();
  console.log(`SearchString: ${normalizedSearchString}`);

  return (
    <div className="col-start-3 col-end-11">
      <WordSearchResults searchString={normalizedSearchString} />
    </div>
  );
}
