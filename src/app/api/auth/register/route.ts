import connectToDB from "@/lib/db";
import User from "../../../../../models/User";
import generateRandomSalt from "@/lib/auth/generateRandomSalt";
import hashPassword from "@/lib/auth/hashPassword";
import { Errors } from "../../../../../errors";

export async function POST(request: Request) {
  try {
    await connectToDB();
    console.log("### Registering...");
    const { email, username, password } = await request.json();
    console.log("### Checking if user exists");

    const emailValidationPromise = User.findOne({ email }).then((user) => {
      if (user) {
        return Promise.reject(Errors.duplicativeEmailError);
      }
    });

    const usernameValidationPromise = User.findOne({ username }).then(
      (user) => {
        if (user) {
          return Promise.reject(Errors.duplicativeUsernameError);
        }
      }
    );

    await Promise.all([emailValidationPromise, usernameValidationPromise]);

    const salt = generateRandomSalt();
    const userInfo = await User.create({
      email,
      username,
      authInfo: {
        salt,
        password: hashPassword(password, salt),
      },
    });
    console.log("Registration success");
    return Response.json(userInfo);
  } catch (err) {
    console.log(err);
    console.log("Registration failed");
    return Response.json(err, {
      status: 400,
    });
  }
}
