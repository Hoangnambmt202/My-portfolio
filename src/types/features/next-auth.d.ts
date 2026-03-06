import { DefaultSession, DefaultJWT } from "next-auth";

export type Role = "ADMIN" | "USER" | "GUEST" | "DEVELOPER";
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      role: Role;
    } & DefaultSession["user"];
  }

  interface User {
    id?: string;
    role: Role;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id?: string;
    role: Role;
  }
}
