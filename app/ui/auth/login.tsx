"use client";

import { SignInButton } from "../global/auth-buttons";

export default function LoginForm() {
  return (
    <>
      <div className="flex-1 rounded-lg px-6 pb-4 pt-8">
        <h1 className="flex justify-center items-center text-2xl text-white mb-5">
          Please log in
        </h1>

        <div className="mt-10 flex justify-center">
          <SignInButton />
        </div>
      </div>
    </>
  );
}
