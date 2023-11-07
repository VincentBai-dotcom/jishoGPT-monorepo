import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "../../../../../models/User";
import connectToDB from "@/lib/db";
import hashPassword from "@/lib/auth/hashPassword";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        emailOrUsername: { label: "EmailOrUsername", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.emailOrUsername || !credentials?.password) {
          return null;
        }
        const { emailOrUsername, password } = credentials;
        try {
          await connectToDB();
          const user = await User.findOne({
            $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
          }).select("+authInfo.salt +authInfo.password");

          if (!user) {
            return null;
          }

          const expectedPassword = hashPassword(password, user.authInfo.salt);

          if (expectedPassword !== user.authInfo.salt) {
            return null;
          }
          return user;
        } catch (err) {
          console.log("### Authorization failed");
          console.log(err);
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
