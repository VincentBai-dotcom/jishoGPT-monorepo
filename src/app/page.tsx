import SearchBar from "@/components/SearchBar";
import homeBackground from "/public/homeBackground.jpg";

export default async function Home() {
  return (
    <main className="">
      <div
        className="hero min-h-screen"
        style={{ backgroundImage: `url(${homeBackground.src})` }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center ">
          <div className=" max-w-3xl">
            <h1 className="mb-5 text-5xl font-bold text-neutral-content">
              JishoGPT
            </h1>
            <p className="mb-5 text-lg text-neutral-content">
              Unlock the full potential of Japanese language exploration with
              our online dictionary. Empowered by the intelligence of ChatGPT to
              deliver in-depth definitions.
            </p>
            <SearchBar />
          </div>
        </div>
      </div>
    </main>
  );
}
