'use client'

import { signIn, signOut } from "next-auth/react"

export function SignInButton() {
  return (
    <button 
      onClick={() => signIn('duosso')}
      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
    >
      Sign in with Duo SSO
    </button>
  )
}

export function SignOutButton() {
  return (
    <button 
      onClick={() => signOut()}
      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
    >
      Sign Out
    </button>
  )
}