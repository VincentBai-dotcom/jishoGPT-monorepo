import connectToDB from "@/lib/db";
import User from "../../../../../models/User";

export async function POST(request: Request) {
  try {
    await connectToDB();
    const { email, username } = await request.json();
    console.log("### Checking if user exists");
    const user = await User.findOne({
      $or: [{ email: email }, { username: username }],
    });

    if (user) {
      console.log("User exists");
      return Response.json({ userFound: false });
    }
    console.log("User does not exist");
    return Response.json({ userFound: true });
  } catch (err) {
    console.log(err);
    return Response.json(err);
  }
}
