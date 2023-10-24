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
      <div className="flex min-h-max justify-center items-start relative py-12">
        <Image
          src={homeBackground}
          alt="homeBackground"
          layout="fill"
          objectFit="cover"
          className=" opacity-50 overflow-hidden "
        />
        <div className="max-w-screen-md text-center z-10">
          <h1 className="mb-5 text-5xl font-bold text-neutral">JishoGPT</h1>
          <p className="mb-5 text-neutral">
            Get the most informative definitions for Japanese vocabulary
          </p>
          <SearchBar />
        </div>
      </div>
    </main>
  );
}
