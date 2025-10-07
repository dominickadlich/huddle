"use client";

import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
  PlusCircleIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { AddNewUserButton, Button, SSOButton } from "@/app/ui/button";
import { useActionState } from "react";
import { authenticate } from "@/app/lib/actions";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

  const handleOktaSignIn = async () => {
    await signIn("okta", { callbackUrl });
  };

  return (

    <form action={formAction} className="border rounded-lg">
      <div className="flex-1 rounded-lg px-6 pb-4 pt-8">
        <h1 className="flex justify-center items-center text-2xl text-white mb-5">
          Please log in
        </h1>
        <div className="w-full">
          <div className="">
            <label
              className="flex items-center text-sm/6 font-medium text-gray-900 dark:text-white"
              htmlFor="email"
            >
              <AtSymbolIcon className="pointer-events-none h-[18px] w-[18px] text-gray-900 dark:text-white mr-2" />
              Email
            </label>
            <div className="mt-2">
              <input
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
            </div>
          </div>
          <div className="mt-10">
            <label
              className="flex items-center text-sm/6 font-medium text-gray-900 dark:text-white"
              htmlFor="password"
            >
              <KeyIcon className="pointer-events-none h-[18px] w-[18px] text-gray-900 dark:text-white mr-2" />
              Password
            </label>
            <div className="mt-2">
              <input
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={6}
              />
            </div>
          </div>
        </div>
        
        {errorMessage && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}

        <div className="flex justify-between gap-4">
          <input type="hidden" name="redirectTo" value={callbackUrl} />
          <AddNewUserButton className=" mt-10 sm:col-span-4" aria-disabled={isPending}>
            New User <PlusIcon className="ml-1 h-5 w-5 text-gray-50" />
          </AddNewUserButton>
          <Button className=" mt-10 sm:col-span-4" aria-disabled={isPending}>
            Log in <ArrowRightIcon className="ml-1 h-5 w-5 text-gray-50" />
          </Button>
        </div>
        {/* Divider */}
      {/* <div className="mt-6 mb-6 relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-gray-900 text-gray-400">Or</span>
        </div>
        </div> */}

        {/* Okta SSO button */}
        {/* <SSOButton 
        onClick={handleOktaSignIn}
          type="button"
          className="mb-6 w-full flex items-center justify-center"
        >
          Sign in with SSO
        </SSOButton> */}
      </div>
    </form>


    
  );
}
