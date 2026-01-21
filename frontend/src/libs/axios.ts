import { LoginResponse } from "@/types/auth/AppUser";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";



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
      
        const loginRes = await fetch(`${API}/user/api/login/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
      
        if (!loginRes.ok) return null;
      
        const data = (await loginRes.json()) as LoginResponse;
      
        const access = data.access;
        const userData = data.user;
      
        if (!access || !userData) return null;
      
        return {
          id: String(userData.id),
          token: access,
          userData,
        };
      }
      ,
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

