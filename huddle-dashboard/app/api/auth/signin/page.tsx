import Link from "next/link";
import HuddleLogo from "@/app/ui/huddle-logo";
import LoginForm from "@/app/ui/login-form";
import { Suspense } from "react";
import NavBar from "@/app/ui/navbar";

export default function LoginPage() {
  return (
    <main className="mt-10 flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <Link
          href="/"
          className="flex h-20 w-full justify-center items-center rounded-lg bg-indigo-500 "
        >
          <HuddleLogo />
        </Link>
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}
