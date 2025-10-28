import NextAuth from "next-auth";
import { authConfig } from "./app/auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { User } from "./app/lib/definitions";
import bcrypt from "bcrypt";
import { createClient } from "@supabase/supabase-js";
import { upsertUser } from "./app/lib/actions";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

interface OIDCUserProfile {
  sub: string;
  email: string;
  name?: string;
  given_name?: string;
  family_name?: string;
}

async function getUser(email: string): Promise<User | undefined> {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,

  debug: true,

  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) return user;
        }

        console.log("Invalid Credentials");
        return null;
      },
    }),
    {
      id: "duosso",
      name: "Duo SSO",
      type: "oidc",

      clientId: process.env.DUO_CLIENT_ID!,
      clientSecret: process.env.DUO_CLIENT_SECRET!,
      issuer: process.env.DUO_ISSUER!,

      // Standard OIDC configuration
      authorization: {
        params: {
          scope: "openid email profile",
        },
      },

      // Map Duo's user claims to NextAuth format
      profile(profile) {
        console.log("Profile received from Duo:", profile);
        return {
          id: profile.sub,
          name: profile.name || `${profile.given_name} ${profile.family_name}`,
          display_name: profile.display_name,
          email: profile.email,
          given_name: profile.given_name,
          family_name: profile.family_name,
        };
      },
    },
  ],

  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === 'duosso' && profile && 'sub' in profile && 'email' in profile) {
        await upsertUser(profile as OIDCUserProfile);
      }
      return true;
    },

    async jwt({ token, account, profile }) {
      if (account && profile) {
        console.log("Account:", account);
        console.log("Profile in JWT callback:", profile);

        token.id = profile.sub;
        token.email = profile.email

        token.accessToken = account.access_token;
        token.id = profile?.sub;
      }
      return token;
    },
    
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      // @ts-ignore - Adding custom property
      session.accessToken = token.accessToken as string;
      return session;
    },
  },
});
