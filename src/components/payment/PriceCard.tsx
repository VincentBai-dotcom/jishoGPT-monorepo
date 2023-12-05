export default function PriceCard({
  params,
}: {
  params: {
    productName: string;
    price: string;
    description: string;
    details: string[];
    onSubmit: () => void;
    showUnit?: boolean;
    buttonText?: string;
    isButtonDisabled?: boolean;
  };
}) {
  return (
    <div className="rounded-2xl relative flex flex-col w-96 bg-base-100 shadow-xl gap-5 p-8 text-base">
      <h1 className="text-2xl font-semibold mb-3">{params.productName}</h1>
      <div className="flex items-center gap-2">
        <span className="text-5xl font-extrabold">{params.price}</span>
        {params.showUnit === undefined || params.showUnit ? (
          <span className="text">
            <div className="flex flex-col">
              <p>per</p>
              <p>month</p>
            </div>
          </span>
        ) : (
          <></>
        )}
      </div>
      <button
        className={`btn btn-primary w-full text-base ${
          params.isButtonDisabled ? "btn-disabled" : ""
        }`}
        onClick={params.onSubmit}
      >
        {params.buttonText || "Subscribe"}
      </button>
      <h2 className="text-lg font-semibold">{params.description}</h2>
      <ul className="flex flex-col gap-0 text-base font-medium list-disc">
        {params.details.map((detail, index) => {
          return <li key={index}>{detail}</li>;
        })}
      </ul>
    </div>
  );
}
