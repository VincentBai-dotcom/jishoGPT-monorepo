import Stripe from "stripe";
import User from "../../../../../models/User";
import connectToDB from "@/lib/db";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

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
      try {
        const metadata = event.data.object.metadata;
        const subscription = await stripe.subscriptions.retrieve(
          event.data.object.subscription as string
        );
        await connectToDB();
        await User.updateOne(
          { _id: metadata?.userID },
          {
            tier: metadata?.tier,
            subscriptionEndDate: new Date(
              subscription.current_period_end * 1000
            ),
            isSubscribed: true,
          }
        );
      } catch (err) {
        console.log(err);
      }
      break;
    case "invoice.paid":
      break;
    case "invoice.payment_failed":
      break;
  }
  return Response.json({});
}