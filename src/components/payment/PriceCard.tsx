export default function PriceCard() {
  return (
    <div className="rounded-2xl relative flex flex-col w-96 bg-base-100 shadow-xl gap-5 p-8 text-base">
      <h1 className="text-2xl font-semibold mb-3">{"Basic Tier"}</h1>
      <div className="flex items-center gap-2">
        <span className="text-5xl font-extrabold">{"$10"}</span>
        <span className="text">
          <div className="flex flex-col">
            <p>per</p>
            <p>month</p>
          </div>
        </span>
      </div>
      <button className="btn btn-primary w-full text-base">Subscribe</button>
      <h2 className="text-lg font-semibold">Try out JishoGPT for free</h2>
      <ul className="flex flex-col gap-0 text-base font-medium list-disc">
        <li>30 Search per day</li>
        <li>30 Search per day</li>
      </ul>
    </div>
  );
}
