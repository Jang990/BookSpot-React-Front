import { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    backendToken?: string;
    expiresAt?: number;
    user: {
      id: string;
      role?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId?: string;
    backendToken?: string;
    userRole?: string;
    error?: string;

    // exp는 초단위(next-auth에서 내부적으로 쓰는 값)
    expiresAtMs?: number; // backendExpiresAt은 ms단위. Date와 호환.
  }
}
