import type { NextAuthConfig } from "next-auth";

// Edge-safe config (no Prisma/bcrypt) — used by middleware to check session
// cookies. The Credentials provider with DB access is added on top of this
// in `auth.ts`, which only runs in the Node.js runtime.
export default {
  session: { strategy: "jwt" },
  pages: { signIn: "/admin/login" },
  providers: [],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    session({ session, token }) {
      if (session.user) session.user.id = token.id as string;
      return session;
    },
  },
} satisfies NextAuthConfig;
