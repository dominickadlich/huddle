"use client";

import { SignInButton } from "./ui/global/auth-buttons";
import Image from "next/image";

export default function Page() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
  {/* Left - Content */}
  {/* <div className="hidden lg:block relative">
    <div className="absolute inset-0 flex items-center justify-center p-8">
     <Image 
      src="/dashboard-screenshot.png" 
      alt="Dashboard preview"
      fill  // This makes it fill the parent container
      className="object-cover"  // Cover maintains aspect ratio while filling
      priority
    />
    </div>
  </div> */}
  
  {/* Right - Dashboard Preview */}
   <div className="flex flex-col justify-center items-center p-12 space-y-6">
    <h1 className="text-5xl font-bold">Pharmacy Huddle</h1>
    <p className="text-xl text-gray-400">
      Daily operations dashboard for Central Pharmacy
    </p>
    <SignInButton />
  </div>
  
</div>
  )
}
