"use client";
import { productInfo } from "@/lib/payment/productInfo";
import PriceCard from "@/components/payment/PriceCard";
import { useState } from "react";
export default function Page() {
  const [rateOfPayment, setRateOfPayment] = useState<"monthly" | "yearly">(
    "monthly"
  );

  const priceCards = () => {
    return (
      <div className="flex gap-10">
        <PriceCard params={productInfo["basicTier"]} />
        <PriceCard params={productInfo["starterTier"][rateOfPayment]} />
        <PriceCard params={productInfo["proTier"][rateOfPayment]} />
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center gap-16 mt-20">
      <h1 className=" font-bold text-5xl">Our Pricing</h1>
      <div role="tablist" className="tabs tabs-boxed">
        <a
          role="tab"
          className={`tab ${rateOfPayment === "monthly" ? "tab-active" : ""}`}
          onClick={() => setRateOfPayment("monthly")}
        >
          Monthly
        </a>
        <a
          role="tab"
          className={`tab ${rateOfPayment === "yearly" ? "tab-active" : ""}`}
          onClick={() => setRateOfPayment("yearly")}
        >
          Yearly
        </a>
      </div>

      {priceCards()}
    </div>
  );
}
