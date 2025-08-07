import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "./lib/prisma";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session:{
    strategy: "jwt"
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const email = credentials.email as string | undefined;
        const password = credentials.password as string | undefined;

        if (!email || !password) return null;

        const admin = await prisma.user.findUnique({
          where: { email: email },
        });

        if (!admin) return null;

        const isValid = bcrypt.compare(password, admin.password!);

        if (!isValid) return null;

        return {
          id: admin.id,
          email: admin.email,
          name: admin.name,
        };
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  callbacks:{
    async jwt({token, user}){
      if(user){
        token.id = user.id
      }
      return token
    },
    async session({session, token}){
      session.user.id = token.id as string
      return session
    }
  }
});
