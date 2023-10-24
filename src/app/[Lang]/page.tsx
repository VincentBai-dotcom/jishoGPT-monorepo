import Image from "next/image";
import { Locale } from "../../../i18n.config";
import { getDictionary } from "@/lib/dictionaries";
import SearchBar from "@/components/searchBar";
import homeBackground from "/public/homeBackground.jpg";
export default async function Home({ params }: { params: { lang: Locale } }) {
  const dict = await getDictionary(params.lang);
  return (
    <main className="">
      {/* <Image
        src={homeBackground}
        alt="Cartoon graduates jump with happiness"
        layout="fill"
      /> */}

      <div className=" max-w-screen-md">
        <h1 className="mb-5 text-5xl font-bold text-neutral-content">
          Hello there
        </h1>
        <p className="mb-5 text-neutral-content">
          Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
          excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a
          id nisi.
        </p>
        <SearchBar />
      </div>
    </main>
  );
}
