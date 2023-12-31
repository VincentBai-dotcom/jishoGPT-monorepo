"use client";

import { priceIDs, productInfo } from "@/lib/payment/productInfo";
import PriceCard from "@/components/payment/PriceCard";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { loadStripe } from "@stripe/stripe-js";
import { notFound } from "next/navigation";
import ToastMessageWraper from "@/components/toastsMessage/ToastMessageWraper";

export default function PriceCards() {
  const [rateOfPayment, setRateOfPayment] = useState<"monthly" | "yearly">(
    "monthly"
  );
  const { data: session, status } = useSession();

  const priceCardOnSubmit = (tier?: "starterTier" | "proTier") => {
    if (status === "unauthenticated") {
      return () => {
        (
          document.getElementById("registrationModal") as HTMLDialogElement
        )?.showModal();
      };
    } else if (status === "authenticated" && tier) {
      return async () => {
        const priceID = priceIDs[tier][rateOfPayment];
        try {
          const stripe = await loadStripe(
            process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "placeholder"
          );
          const res = await fetch(
            process.env.NEXT_PUBLIC_API_PATH + "stripe/checkout_sessions",
            {
              method: "POST",
              body: JSON.stringify({
                priceID,
                subscriptionInfo: {
                  userID: session.user?.id,
                  tier,
                },
              }),
            }
          );
          const { sessionId } = await res.json();
          console.log(sessionId);
          const stripeError = await stripe?.redirectToCheckout({ sessionId });

          if (stripeError) {
            console.error(stripeError);
            notFound();
          }
        } catch (err) {
          console.log(err);
          notFound();
        }
      };
    }

    return () => {};
  };

  const priceCards = () => {
    return (
      <div className="flex gap-10">
        <ToastMessageWraper
          params={[
            {
              searchParam: "subscription_success",
              successMessage: "Subscribed successfully",
              failureMessage: "Subscription failed",
            },
          ]}
        />
        <PriceCard
          params={{
            ...productInfo["basicTier"],
            onSubmit: priceCardOnSubmit(),
            isButtonDisabled: status === "authenticated",
          }}
        />
        <PriceCard
          params={{
            ...productInfo["starterTier"][rateOfPayment],
            onSubmit: priceCardOnSubmit("starterTier"),
          }}
        />
        <PriceCard
          params={{
            ...productInfo["proTier"][rateOfPayment],
            onSubmit: priceCardOnSubmit("proTier"),
          }}
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center gap-16 relative overflow-hidden">
      <h1 className=" font-bold text-5xl mt-20 z-10 ">Our Pricing</h1>
      <div role="tablist" className="tabs tabs-boxed shadow-md">
        <a
          role="tab"
          className={`tab ${
            rateOfPayment === "monthly" ? "tab-active font-semibold" : ""
          }`}
          onClick={() => setRateOfPayment("monthly")}
        >
          Monthly
        </a>
        <a
          role="tab"
          className={`tab ${
            rateOfPayment === "yearly" ? "tab-active font-semibold" : ""
          }`}
          onClick={() => setRateOfPayment("yearly")}
        >
          Yearly
        </a>
      </div>

      {priceCards()}
    </div>
  );
}
