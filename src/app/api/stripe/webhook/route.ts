import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: Request) {
  const payload = await req.text();
  console.log("Start provisioning payment");
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
      console.log("checkout completed");
      break;
    case "invoice.paid":
      break;
    case "invoice.payment_failed":
      break;
  }
  return Response.json({});
}
