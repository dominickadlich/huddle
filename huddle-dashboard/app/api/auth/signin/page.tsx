import Link from "next/link";
import HuddleLogo from "@/app/ui/huddle-logo";
import LoginForm from "@/app/ui/api/auth/signin/login-form";
import { Suspense } from "react";
import NavBar from "@/app/ui/navbar";

export default function LoginPage() {
  return (
    <main className="mt-10 flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}
