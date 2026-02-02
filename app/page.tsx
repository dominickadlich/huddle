"use client";

import NavBar from "./ui/navbar";
import Link from "next/link";
import { SparklesIcon } from "@heroicons/react/24/outline";
import HomePageCardWrapper from "./ui/homepage-card";
import { SignInButton } from "./ui/auth-buttons";

export default function Example() {
  return (
    <>
      <NavBar />

      {/* Hero Section with Gradient Background */}
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-slate-900">
        {/* Content Container */}
        <div className="relative isolate px-6 lg:px-8">
          <div className="mx-auto max-w-4xl py-[8vh] sm:py-[12vh] lg:py-[16vh] animate-fade-in">
            {/* Badge with Glow */}
            <div className="hidden sm:mb-8 sm:flex sm:justify-center">
              <div className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium border border-indigo-500/30 bg-indigo-500/10 backdrop-blur-sm text-gray-200 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all duration-300 hover:scale-105">
                <SparklesIcon className="h-5 w-5 text-indigo-400" />
                <span>Your Central Hub for Pharmacy Operations</span>
              </div>
            </div>

            {/* Main Heading with Gradient Text */}
            <div className="text-center">
              <h1 className="text-5xl font-bold tracking-tight sm:text-7xl bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                Transform Your Pharmacy Operations
              </h1>

              {/* Subtitle */}
              <p className="mt-8 text-lg font-medium text-gray-300 sm:text-xl leading-relaxed max-w-3xl mx-auto ">
                Stop juggling spreadsheets, missed messages, and scattered
                tools.
                <br />
                <span className="text-gray-400">
                  Centralize your pharmacy operations with real-time insights,
                  seamless communication, and data-driven workflows that keep
                  your entire team aligned and ready to deliver exceptional
                  patient care.
                </span>
              </p>

              {/* CTA Buttons */}
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <SignInButton />
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
