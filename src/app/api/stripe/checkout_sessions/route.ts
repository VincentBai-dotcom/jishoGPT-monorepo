import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
export async function POST(req: Request) {
  try {
    const { priceID } = await req.json();
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
      success_url: `http://localhost:3000`,
      cancel_url: `http://localhost:3000/pricing`,
      automatic_tax: { enabled: true },
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
