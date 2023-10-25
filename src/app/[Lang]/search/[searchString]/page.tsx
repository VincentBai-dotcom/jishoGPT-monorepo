import { Locale } from "../../../../../i18n.config";
import { getDictionary } from "@/lib/dictionaries";
import SearchBar from "@/components/searchBar";
import homeBackground from "/public/homeBackground.jpg";

export default async function Home({
  params,
}: {
  params: { searchString: string; lang: Locale };
}) {
  const dict = await getDictionary(params.lang);
  return <main className=" bg-base-300 min-h-screen"></main>;
}
