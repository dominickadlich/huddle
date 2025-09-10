'use client'

import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import HuddleLogo from './huddle-logo'
import { useState } from 'react'
import Link from 'next/link'
import NavLinks from './nav-links'
import { signOut, useSession } from 'next-auth/react' // Add useSession

export default function NavBar({  }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    
    // Use NextAuth session instead of local state
    const { data: session, status } = useSession()
    const isAuthenticated = !!session?.user

    const handleSignOut = async () => {
      await signOut({ callbackUrl: '/' })
    }

    return (
    <header className="absolute inset-x-0 top-0 z-50">
        <nav aria-label="Global" className="flex rounded-lg items-center justify-between p-6 lg:px-8 bg-indigo-500">
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <HuddleLogo />
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-gray-200"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            <NavLinks />
          </div>

          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            {status === 'loading' ? (
              <span className="text-sm/6 font-semibold text-gray-900 dark:text-white">Loading...</span>
            ) : isAuthenticated ? (
                <button 
                  onClick={handleSignOut}
                  className="text-sm/6 font-semibold text-gray-900 dark:text-white">
                  Sign out <span aria-hidden="true">→</span>
                </button>
            ) : (
               <Link href="/login" className="text-sm/6 font-semibold text-gray-900 dark:text-white">
                  Log in <span aria-hidden="true">→</span>
              </Link>
            )}
          </div>
        </nav>

        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 dark:bg-gray-900 dark:sm:ring-gray-100/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <HuddleLogo />
                {/* Note: Remove duplicate images or fix the paths */}
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-gray-200"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10 dark:divide-white/10">
                <div className="space-y-2 py-6">
                  <NavLinks />
                </div>
                <div className="py-6">
                  {isAuthenticated ? (
                    <button 
                      onClick={handleSignOut}
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-white/5">
                      Sign out
                    </button>
                  ) : (
                    <Link
                      href="/login"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-white/5"
                    >
                      Log in
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>
    )
}