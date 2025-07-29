import { PrismaAdapter } from "@auth/prisma-adapter"
import { type NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "./prisma"
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId:"30266348323-3muo206aiujp853uick91oehi6vtcoq9.apps.googleusercontent.com",
      clientSecret: "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"
    }),
    CredentialsProvider({
      credentials: {
        email: { },
        password: { },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const admin = await prisma.admin.findUnique({
          where: { email: credentials.email },
        })

        if (!admin) return null

        const isValid = bcrypt.compare(credentials.password, admin.password!)
        if (!isValid) return null

        return {
          id: admin.id,
          email: admin.email,
          name: admin.firstName,
        }
      },
    }),
  ],
  pages: {
    signIn: "/admin/auth/signin",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (session?.user && token.sub) {
        session.user.id = token.sub
      }
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}satisfies NextAuthOptions
