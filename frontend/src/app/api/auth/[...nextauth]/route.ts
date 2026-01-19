// Third-party Imports
import { authOptions } from "@/libs/axios";
import NextAuth from "next-auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
