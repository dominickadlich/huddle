import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import Okta from "next-auth/providers/okta";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import bcrypt from "bcrypt";
import { getServiceSupabase } from "./lib/supabase-server";
import { error } from "console";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      // const isLoggedIn = !!auth?.user;
      // const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");

      // if (isOnDashboard) {
      //   if (isLoggedIn) return true;
      //   return false; // Redirect unauthenticated users to login page
      // } else if (isLoggedIn) {
      //   // Return true and let the redirect happen via the session callback
      //   // or handle redirect in middleware
      //   return true
      // }
      return true;
    },
    async signIn({ user, account, profile }) {
      console.log("User signed in:", user);
      return true;
    },
    async session({ session, token }) {
      if (token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Handle redirects after sign in
      // Ig the url is relative, make it absolute
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      // If url is on the same origin, allow it
      else if (new URL(url).origin === baseUrl) return url;
      // Otherwise redirect to dashboard
      return `${baseUrl}/dashboard`;
    },
  },
  providers: [
    Okta({
      clientId: process.env.OKTA_CLIENT_ID!,
      clientSecret: process.env.OKTA_CLIENT_SECRET!,
      issuer: process.env.OKTA_ISSUER!,
    }),

    Credentials({
      async authorize(credentials) {
        try {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) {
          console.log("Validation failed:", parsedCredentials.error);
          return null 
        }

        const { email, password } = parsedCredentials.data;

        const supabase = getServiceSupabase();
        const { data: user } = await supabase
          .from("users")
          .select("*")
          .eq("email", email)
          .single();

          if (error) {
            console.error("Database error:", error);
            return null;
          }

          if (!user) {
            console.log("User not found", email);
            return null;
          }

          const passwordMatch = await bcrypt.compare(password, user.password);

          if (passwordMatch) {
            return {
              id: user.id,
              email: user.email,
              name: user.name,
            };
          }

          console.log("Password mismatch for user:", email);
          return null;
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
  ],
  trustHost: true,
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
