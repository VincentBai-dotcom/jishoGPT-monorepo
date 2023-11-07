import connectToDB from "@/lib/db";
import User from "../../../../../models/User";
import generateRandomSalt from "@/lib/auth/generateRandomSalt";
import hashPassword from "@/lib/auth/hashPassword";

export async function POST(request: Request) {
  try {
    await connectToDB();
    console.log("### Registering...");
    const { email, username, password } = await request.json();
    console.log("### Checking if user exists");
    const isUserExist = await fetch("api/auth/user-exists").then(
      async (res) => await res.json()
    );

    if (isUserExist["userFound"]) {
      console.log("Registration failed");
      return Response.json(
        {
          message: "User with the same username or email already exists",
        },
        { status: 400 }
      );
    }

    const salt = generateRandomSalt();
    const userInfo = await User.create({
      email,
      username,
      authInfo: {
        salt,
        password: hashPassword(password, salt),
      },
    });
    return Response.json(userInfo);
  } catch (err) {
    console.log("Registration failed");
    return Response.json(err);
  }
}
