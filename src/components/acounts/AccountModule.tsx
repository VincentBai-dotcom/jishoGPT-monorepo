"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaCircleUser } from "react-icons/fa6";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { notFound } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";

export default function AccountModule() {
  const router = useRouter();
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
    <>
      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn mx-1">
          <FaCircleUser />
          Account
        </label>
        <ul
          tabIndex={0}
          className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52"
        >
          <div className="stats">
            <div className="stat">
              <div className="stat-title">Search Credit</div>
              <div className="stat-value">
                ${Math.round(session?.user?.searchCredit as number) / 100}
              </div>
            </div>
          </div>
          <li>
            <button onClick={submitPayment()}>
              <FaMoneyCheckDollar />
              Add funds
            </button>
            <button
              onClick={() => {
                signOut();
                router.refresh();
              }}
            >
              <FaArrowRightFromBracket />
              Log Out
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}
