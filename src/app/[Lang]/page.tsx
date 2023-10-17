import Image from "next/image";
import SearchBar from "@/components/searchBar";
import { Locale } from "../../../i18n.config";
import { getDictionary } from "@/lib/dictionaries";
export default async function Home({ params }: { params: { lang: Locale } }) {
  const dict = await getDictionary(params.lang);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <article className="prose lg:prose-xl">
        <h1>{dict.navigation.upgrade}</h1>
        <SearchBar />
      </article>
    </main>
  );
}
