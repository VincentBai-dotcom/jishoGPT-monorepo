import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
export async function POST(req: Request) {
  try {
    const { priceID, subscriptionInfo } = await req.json();
    console.log("start payment");
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: priceID,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}?subscription_success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}pricing`,
      automatic_tax: { enabled: true },
      metadata: {
        ...subscriptionInfo,
      },
    });
    return Response.json({
      sessionId: session.id,
    });
  } catch (err) {
    console.log(err);
    return Response.json(err, {
      status: 500,
    });
  }
}
