import CredentialsProvider from "next-auth/providers/credentials";
import User from "../../../../../models/User";
import connectToDB from "@/lib/db";
import hashPassword from "@/lib/auth/hashPassword";
import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
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
          console.log("### Authorizing...");
          await connectToDB();
          const user = await User.findOne({
            $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
          }).select("+authInfo.salt +authInfo.password");

          if (!user) {
            console.log("Email or Username not found in database");
            return null;
          }

          const expectedPassword = hashPassword(password, user.authInfo.salt);
          if (expectedPassword !== user.authInfo.password) {
            return null;
          }
          console.log("Authorization Success");
          return user;
        } catch (err) {
          console.log("Authorization failed");
          console.log(err);
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    session: async ({ session, token }) => {
      if (!session.user) {
        return session;
      }
      session.user.id = token.userID;
      await connectToDB();
      const user = await User.findOne({ _id: token.userID });
      if (user) {
        session.user.searchCredit = user.searchCredit;
        session.user.tier = user.tier;
      }
      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.userID = user.id;
      }
      return token;
    },
  },
};
