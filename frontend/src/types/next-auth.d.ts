import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken: string;
    user: AppUser;
  }

  interface User {
    token: string;
    userData: AppUser;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    user: AppUser;
  }
}
