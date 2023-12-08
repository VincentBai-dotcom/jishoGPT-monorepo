import type { DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: DefaultUser & {
      id: string;
      tier: string;
      searchCredit: number;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userID: string;
  }
}
