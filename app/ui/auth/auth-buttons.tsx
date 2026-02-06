"use client"

import { signIn, signOut } from "next-auth/react";

export function SignInButton() {
  return (
    <>
      <button
        onClick={() => signIn("duosso")}
        className="group relative px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-105 transition-all duration-300"
      >
        Sign in with DUO
      </button>
    </>
  );
}

export function SignOutButton() {
  return (
    <button
      onClick={() => signOut()}
      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
    >
      Sign Out
    </button>
  );
}

export function SignInNavBar() {
  return (
    <button
      onClick={() => signIn("duosso")}
      className="group relative px-5 py-2 rounded-lg bg-white/10 border border-white/20 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/20 hover:border-white/30 hover:shadow-white/10"
    >
      Log in
      <span
        aria-hidden="true"
        className="inline-block ml-1 transition-transform duration-300 group-hover:translate-x-1"
      >
        →
      </span>
    </button>
  );
}

export function SignOutNavBar() {
  return (
    <button
      onClick={() => signOut()}
      className="group relative px-5 py-2 rounded-lg bg-white/10 border border-white/20 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/20 hover:border-white/30 hover:shadow-white/10"
    >
      Sign out
      <span
        aria-hidden="true"
        className="inline-block ml-1 transition-transform duration-300 group-hover:translate-x-1"
      >
        →
      </span>
    </button>
  );
}
