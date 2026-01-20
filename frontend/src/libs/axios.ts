import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

type LoginResponse = {
  access?: string;
  refresh?: string;
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

        const loginRes = await fetch(`${API}/api/token/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        if (!loginRes.ok) return null;

        const { access } = (await loginRes.json()) as LoginResponse;
        if (!access) return null;

        const meRes = await fetch(`${API}/user/api/account/me/`, {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        });

        if (!meRes.ok) return null;
        const userData = await meRes.json();

        return {
          id: String(userData.id),
          token: access,
          userData,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token;
        token.user = user.userData;
      }
      return token;
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user = token.user;
      return session;
    },
  },

  pages: { signIn: "/login" },
  secret: process.env.NEXTAUTH_SECRET,
};

