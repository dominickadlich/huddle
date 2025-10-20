"use client";

import NavBar from "./ui/navbar";
import Link from "next/link";
import { SparklesIcon } from "@heroicons/react/24/outline";
import HomePageCardWrapper from "./ui/homepage-card";
import { SignInButton } from "./ui/test-sso/auth-buttons";

export default function Example() {
  return (
    <>
      <NavBar />

      {/* Hero Section with Gradient Background */}
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-slate-900">
        {/* Animated Gradient Orbs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500/15 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />

        {/* Content Container */}
        <div className="relative isolate px-6 lg:px-8">
          <div className="mx-auto max-w-4xl sm:py-34 lg:py-54 animate-fade-in">
            {/* Badge with Glow */}
            <div className="hidden sm:mb-8 sm:flex sm:justify-center">
              <div className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium border border-indigo-500/30 bg-indigo-500/10 backdrop-blur-sm text-gray-200 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all duration-300 hover:scale-105">
                <SparklesIcon className="h-5 w-5 text-indigo-400" />
                <span>The Smart Way to Stay Informed</span>
              </div>
            </div>

            {/* Main Heading with Gradient Text */}
            <div className="text-center">
              <h1 className="text-5xl font-bold tracking-tight sm:text-7xl bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                Transform Your Team Communication
              </h1>

              {/* Subtitle */}
              <p className="mt-8 text-lg font-medium text-gray-300 sm:text-xl leading-relaxed max-w-3xl mx-auto ">
                Stop juggling spreadsheets, missed messages, and scattered
                updates.
                <br />
                <span className="text-gray-400">
                  Run seamless daily huddles that keep your entire pharmacy team
                  aligned, informed, and ready to deliver exceptional patient
                  care.
                </span>
              </p>

              {/* CTA Buttons */}
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <SignInButton />

                {/* <Link href="/login">
                  <button className="group relative px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-105 transition-all duration-300">
                    <span className="relative z-10">Get Started</span>
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 blur transition-opacity duration-300" />
                  </button>
                </Link> */}

                {/* <a
                  href="#"
                  className="group px-8 py-3.5 font-semibold text-gray-200 border border-gray-600 rounded-lg hover:border-gray-500 hover:bg-gray-800/50 backdrop-blur-sm transition-all duration-300 hover:scale-105"
                >
                  Learn more
                  <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-1 duration-300"> →</span>
                </a> */}
              </div>
            </div>

            <div className="mt-10">
              <HomePageCardWrapper />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </>
  );
}
