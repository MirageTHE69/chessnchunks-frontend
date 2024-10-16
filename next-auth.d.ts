import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user?: {
      id: string;
      name: string;
      email: string;
      role?: "student" | "coach";
    };
  }

  interface User {
    id: string;
    name: string;
    email: string;
    accessToken?: string;
    role?: "student" | "coach";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    user?: {
      id: string;
      name: string;
      email: string;
      role?: "student" | "coach";
    };
  }
}
