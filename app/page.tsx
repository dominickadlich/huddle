"use client";

import { SignInButton } from "./ui/auth/auth-buttons";
import Image from "next/image";

export default function Page() {
  return (
    <div className="mx-auto max-w-auto lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
      <div className="px-6 lg:col-span-7 lg:px-0 xl:col-span-6 flex items-center min-h-screen">
        <div className="mx-auto max-w-auto lg:mx-0">
          <div className="hidden sm:mt-32 sm:flex lg:mt-16"></div>
          <h1 className="mt-24 text-5xl font-semibold tracking-tight text-pretty text-gray-900 sm:mt-10 sm:text-7xl dark:text-white">
            Pharmacy Huddle
          </h1>
          <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8 dark:text-gray-400">
            Daily Operations Dashboard for Central Pharmacy
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <SignInButton />
          </div>
        </div>
      </div>
      <div className="relative lg:col-span-5 xl:absolute xl:inset-0 xl:left-1/2">
        <div className="relative h-full w-full">
          <Image
            alt="Dashboard preview"
            src="/dashboard-screenshot.png"
            fill
            className="object-cover object-left"
            quality={100} // Reduces blur
            priority
          />
        </div>
      </div>
    </div>
  );
}
