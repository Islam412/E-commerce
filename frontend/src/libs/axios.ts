import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

type LoginResponse = {
  token?: string;
  access_token?: string;
  user?: any;
  data?: any;
};

const API = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "");

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },

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
        if (!email || !password || !API) return null;

        // 1) LOGIN
        const loginRes = await fetch(`${API}/login/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        if (!loginRes.ok) return null;

        const loginData: LoginResponse = await loginRes.json();
        const accessToken = loginData.token || loginData.access_token;
        if (!accessToken) return null;

        // 2) USER DATA
        let userData = loginData.user || loginData.data || null;

        if (!userData) {
          const meRes = await fetch(`${API}/me/`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          });

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
      (session as any).user = (token as any).user ?? null;
      return session;
    },
  },

  pages: {
    signIn: "/login", // ✅ ظبطها حسب صفحتك
  },

  secret: process.env.NEXTAUTH_SECRET,
};
