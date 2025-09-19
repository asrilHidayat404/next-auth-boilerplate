import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    userId: string,
    user: {
      id: string;
      email?: string | null;
      name?: string | null;
      avatar?: string;
      role: string;   // 🔥 tambahin role
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    role: string;    // 🔥 tambahin role
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;    // 🔥 tambahin role
  }
}
