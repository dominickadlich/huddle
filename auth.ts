import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { upsertUser } from "./app/lib/actions/auth";
import { OIDCUserProfile } from "./app/lib/definitions";


export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,

  debug: true,

  providers: [
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
    async signIn({ profile }) {
      if (!profile) return false;

      const success = await upsertUser(profile as OIDCUserProfile);
      return success
    },


    async jwt({ token, account, profile }) {
      if (account && profile) {
        console.log("Account:", account);
        console.log("Profile in JWT callback:", profile);

        token.id = profile.sub;
        token.email = profile.email;

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
