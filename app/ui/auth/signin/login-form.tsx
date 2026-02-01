"use client";

import { useActionState } from "react";
import { authenticate } from "@/app/lib/actions";
import { useSearchParams } from "next/navigation";
import { SignInButton } from "../../test-sso/auth-buttons";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

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
