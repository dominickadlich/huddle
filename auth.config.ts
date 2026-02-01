import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  // pages: {
  //   signIn: 'api/auth/signin',
  // },

  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;

      const protectedRoutes = [
        "/dashboard",
        "/directory",
        "/docs",
        "/WDIP",
        "/schedule",
      ];

      const isProtectedRoute = protectedRoutes.some((route) =>
        nextUrl.pathname.startsWith(route),
      );

      if (!isLoggedIn && isProtectedRoute) {
        return false; // Redirect unauthenticated users to login page
      }

      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
