"use client";

import { notFound } from "next/navigation";
import { useSession } from "next-auth/react";
import { loadStripe } from "@stripe/stripe-js";
export default function Page() {
  const { data: session, status } = useSession();
  const submitPayment = () => {
    if (status === "unauthenticated") {
      return () => {
        (
          document.getElementById("registrationModal") as HTMLDialogElement
        )?.showModal();
      };
    } else if (session) {
      return async () => {
        try {
          const stripe = await loadStripe(
            process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "placeholder"
          );
          const res = await fetch(
            process.env.NEXT_PUBLIC_API_PATH +
              "stripe/checkout_sessions/search_credit",
            {
              method: "POST",
              body: JSON.stringify({
                priceID: "price_1OKtUrGsQl5mNBHeQsFe18dJ",
                userID: session.user?.id,
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
    } else {
      return () => {};
    }
  };
  return (
    <button className="btn" onClick={submitPayment()}>
      Add search credit
    </button>
  );
}
