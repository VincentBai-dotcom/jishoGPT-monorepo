import connectToDB from "@/lib/db";
import User from "../../../../../models/User";

export async function POST(request: Request) {
  try {
    await connectToDB();
    const { email, username } = await request.json();
    console.log("### Checking if user exists");
    const user = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (user) {
      return Response.json({ userFound: false });
    }

    return Response.json({ userFound: true });
  } catch (err) {
    return Response.json(err);
  }
}
