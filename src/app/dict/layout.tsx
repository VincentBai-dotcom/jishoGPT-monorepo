import homeBackground from "/public/homeBackground.jpg";
import SearchBar from "@/components/SearchBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-12 bg-base-100 pb-10 min-h-screen auto-rows-min">
      <div
        className=" col-span-full grid grid-cols-4 bg-cover bg-center"
        style={{
          backgroundImage: `url(${homeBackground.src})`,
        }}
      >
        <div className="col-start-1 col-span-4 row-start-1 bg-neutral bg-opacity-50"></div>
        <div className="col-start-2 col-span-2 row-start-1 text-center z-20 py-10">
          <h1 className="mb-5 text-5xl font-bold text-neutral-content">
            JishoGPT
          </h1>
          <SearchBar />
        </div>
      </div>
      {children}
    </div>
  );
}
