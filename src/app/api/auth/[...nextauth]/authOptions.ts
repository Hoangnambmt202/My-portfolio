import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const { email } = parsed.data;

        // giả lập user
        return {
          id: "1",
          name: "Nam",
          email, // 👈 chắc chắn là string
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
};
