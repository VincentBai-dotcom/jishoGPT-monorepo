import PriceCard from "@/components/payment/PriceCard";
import Script from "next/script";

export default async function Page() {
  return (
    <div className="min-h-screen">
      <Script src="https://js.stripe.com/v3/pricing-table.js" />
      <stripe-pricing-table
        pricing-table-id="prctbl_1OINT0GsQl5mNBHeSQHD2U89"
        publishable-key="pk_live_51OHeyzGsQl5mNBHehd7kJKK2yu25ZzWFKeuLPlIN2fKBpZhTrrFuK2EVIYEgjCdOzFzeg4vQi57G7Mb0kF5szPoy00zoUjntJL"
      ></stripe-pricing-table>
      <PriceCard />
    </div>
  );
}
