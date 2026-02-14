"use client";

import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import HuddleLogo from "./huddle-logo";
import { useState } from "react";
import Link from "next/link";
import NavLinks from "./nav-links";
import { signOut, useSession } from "next-auth/react"; // Add useSession
import { SignInNavBar, SignOutNavBar } from "../auth/auth-buttons";

export default function NavBar({}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Use NextAuth session instead of local state
  const { data: session } = useSession();
  const isAuthenticated = !!session?.user;

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav
        aria-label="Global"
        className="flex items-center justify-between p-4 lg:px-8 rounded-2xl border border-indigo-500/50 bg-indigo-500/90 backdrop-blur-md shadow-lg shadow-indigo-500/20"
      >
        {/* Logo Section */}
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Pharmacy Huddle</span>
            <HuddleLogo />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="group -m-2.5 inline-flex items-center justify-center rounded-lg p-2.5 text-white transition-all duration-300"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon
              aria-hidden="true"
              className="h-6 w-6 group-hover:scale-110 transition-transform duration-300"
            />
          </button>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex lg:gap-x-8">
          <NavLinks />
        </div>

        {/* Auth Button */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {isAuthenticated ? <SignOutNavBar /> : <SignInNavBar />}
        </div>
      </nav>

      {/* Mobile Menu Dialog */}
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-50 bg-gray-900/80 backdrop-blur-sm" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6 sm:max-w-sm border-l border-gray-700/50 shadow-2xl">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Pharmacy Huddle</span>
              <HuddleLogo />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="group -m-2.5 rounded-lg p-2.5 text-gray-300 hover:bg-white/10 transition-all duration-300"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon
                aria-hidden="true"
                className="h-6 w-6 group-hover:rotate-90 transition-transform duration-300"
              />
            </button>
          </div>

          {/* Mobile Menu Content */}
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-700/50">
              <div className="space-y-2 py-6">
                <NavLinks />
              </div>
              <div className="py-6">
                {isAuthenticated ? (
                  <button
                    onClick={handleSignOut}
                    className="group -mx-3 flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-base font-semibold text-white hover:bg-white/10 transition-all duration-300 border border-transparent hover:border-indigo-500/30"
                  >
                    Sign out
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </button>
                ) : (
                  <Link
                    href="/login"
                    className="group -mx-3 flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-base font-semibold text-white hover:bg-white/10 transition-all duration-300 border border-transparent hover:border-indigo-500/30"
                  >
                    Log in
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
