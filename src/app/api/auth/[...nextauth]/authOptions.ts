import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // logic login
        return { id: "1", name: "Nam", email: credentials?.email || "" };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
};
