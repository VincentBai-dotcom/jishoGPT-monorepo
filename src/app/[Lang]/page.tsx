import Image from "next/image";
import SearchBar from "@/components/searchBar";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <article className="prose lg:prose-xl">
        <h1>fdsa</h1>
        <SearchBar />
      </article>
    </main>
  );
}
