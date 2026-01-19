import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

type LoginResponse = {
  token?: string;
  access_token?: string;
  user?: any;
  data?: any;
};

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const email = credentials?.email;
        const password = credentials?.password;

        if (!email || !password) return null;

        // 1️⃣ LOGIN
        const loginRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}login/`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          }
        );

        if (!loginRes.ok) return null;

        const loginData: LoginResponse = await loginRes.json();

        const accessToken = loginData.token || loginData.access_token;
        if (!accessToken) return null;

        // 2️⃣ USER DATA
        let userData = loginData.user || loginData.data || null;

        // لو الـ login مش بيرجع user
        if (!userData) {
          const meRes = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}me/`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (!meRes.ok) return null;
          userData = await meRes.json();
        }

        return {
          id: String(userData?.id ?? "0"),
          token: accessToken,
          userData,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = (user as any).token;
        token.user = (user as any).userData ?? null;
      }
      return token;
    },

    async session({ session, token }) {
      (session as any).accessToken = token.accessToken as string;
      session.user = ((token as any).user ?? null) as any;
      return session;
    },
  },

  pages: {
    signIn: "/auth/signin",
  },

  secret: process.env.NEXTAUTH_SECRET,
};
