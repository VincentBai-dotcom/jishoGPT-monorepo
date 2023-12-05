"use client";

import PriceCard from "@/components/payment/PriceCard";
import { useState } from "react";
export default function Page() {
  const [rateOfPayment, setRateOfPayment] = useState<"monthly" | "yearly">(
    "monthly"
  );
  return (
    <div className="min-h-screen flex flex-col items-center gap-10">
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
    </div>
  );
}
