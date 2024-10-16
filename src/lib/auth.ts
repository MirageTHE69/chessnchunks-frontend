import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "email@example.com",
        },
        password: { label: "Password", type: "password" },
        code: { label: "Code", type: "text" },
        isWithOTP: { label: "Login with OTP", type: "text" },
      },
      async authorize(credentials) {
        const isWithOTP = credentials?.isWithOTP === "true";

        let res;
        if (isWithOTP) {
          res = await fetch("http://localhost:5000/api/v1/auth/verify-login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials?.email,
              code: credentials?.code,
            }),
          });
        } else {
          res = await fetch(
            "http://localhost:5000/api/v1/auth/login-with-password",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: credentials?.email,
                password: credentials?.password,
              }),
            }
          );
        }

        const data = await res.json();

        if (res.ok && data) {
          return {
            id: data.user.id,
            name: `${data.user.profile.firstName} ${data.user.profile.lastName}`,
            email: data.user.email,
            accessToken: data.token,
          };
        } else {
          throw new Error(data.message || "Login failed");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      if (token && session.user) {
        session.user = token.user;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
};
