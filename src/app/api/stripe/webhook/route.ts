const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(req: Request) {
  const payload = await req.json();
  console.log(payload);

  return Response.json({});
}
