import { PrismaAdapter } from "@auth/prisma-adapter"; // npm i @auth/prisma-adapter
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: { username: {}, password: {} },
      async authorize(creds) {
        if (!creds?.username || !creds?.password) return null;

        const user = await prisma.user.findFirst({
          where: {
            OR: [{ email: creds.username }, { username: creds.username }],
          },
        });
        if (!user?.passwordHash) return null;

        const ok = await bcrypt.compare(creds.password, user.passwordHash);
        return ok ? user : null;
      },
    }),
    Google({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
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
      if (session?.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: { signIn: "/login" },
};
