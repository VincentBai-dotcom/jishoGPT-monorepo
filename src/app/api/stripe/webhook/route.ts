import Stripe from "stripe";
import User from "../../../../../models/User";
import connectToDB from "@/lib/db";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const processSubscription = async (session: Stripe.Checkout.Session) => {
  try {
    const metadata = session.metadata;
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );
    await connectToDB();
    await User.updateOne(
      { _id: metadata?.userID },
      {
        tier: metadata?.tier,
        subscriptionEndDate: new Date(subscription.current_period_end * 1000),
        isSubscribed: true,
      }
    );
  } catch (err) {
    console.log(err);
  }
};

const processSearchCredit = async (session: Stripe.Checkout.Session) => {
  console.log("start handling search credit");
  console.log(session.amount_subtotal);
  try {
    const userID = session.metadata?.userID;
    await connectToDB();
    await User.updateOne(
      { _id: userID },
      {
        $inc: { searchCredit: session.amount_subtotal },
      }
    );
  } catch (err) {
    console.log(err);
  }
};

export async function POST(req: Request) {
  const payload = await req.text();
  const sig = req.headers.get("stripe-signature") as string;

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      payload,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET_LOCAL as string
    );
  } catch (err) {
    return Response.json({ err }, { status: 400 });
  }
  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object;
      const lineItems = await stripe.checkout.sessions.listLineItems(
        session.id
      );
      if (lineItems.data[0].price?.id === "price_1OKtUrGsQl5mNBHeQsFe18dJ") {
        await processSearchCredit(session);
      } else {
        await processSubscription(session);
      }
      break;
    case "invoice.paid":
      break;
    case "invoice.payment_failed":
      break;
  }
  return Response.json({});
}
