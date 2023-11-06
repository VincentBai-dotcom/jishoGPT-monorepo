import connectToDB from "@/lib/db";
import User from "../../../../../models/User";

export async function POST(request: Request) {
  try {
    await connectToDB();
    console.log("### Registering...");
    const { email, username, password } = await request.json();
    console.log("### Checking if user exists");
    const isUserExist = await fetch(
      "http://localhost:3000/api/auth/user-exists"
    ).then(async (res) => await res.json());

    if (isUserExist["userFound"]) {
      console.log("Registration failed");
      return Response.json(
        {
          message: "User with the same username or email already exists",
        },
        { status: 400 }
      );
    }

    return Response.json({ userFound: true });
  } catch (err) {
    console.log("Registration failed");
    return Response.json(err);
  }
}
