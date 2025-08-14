// lib/auth.js
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export const authOptions = {
  adapter: undefined, // PrismaAdapter(prisma) istifadə edirsənsə əlavə et
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: { username: {}, password: {} },
      async authorize(creds) {
        if (!creds?.username || !creds?.password) return null;
        const user = await prisma.user.findFirst({
          where: {
            OR: [{ username: creds.username }, { email: creds.username }],
          },
        });
        if (!user?.passwordHash) return null;
        const ok = await bcrypt.compare(creds.password, user.passwordHash);
        return ok ? user : null;
      },
    }),
    Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: { signIn: "/login" },
};
