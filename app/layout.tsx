import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./ui/global.css";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import NavBar from "./ui/global/navbar";

export const metadata: Metadata = {
  title: {
    template: "%s | Pharmacy Huddle",
    default: "Pharmacy Huddle",
  },
  description:
    "SStop juggling spreadsheets, missed messages, and scattered tools. Centralize your pharmacy operations with real-time insights, seamless communication, and data-driven workflows that keep your entire team aligned and ready to deliver exceptional patient care.",
  metadataBase: new URL("https://huddle-lime-gamma.vercel.app/"),
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({ 
  subsets: ["latin"] 
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <SessionProvider>
          <div className="flex h-screen flex-col md:flex-row md:overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-slate-900">
            {/* Animated Gradient Orbs */}
            {/* <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" /> */}
            {/* <div
              className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500/15 rounded-full blur-3xl animate-pulse"
              style={{ animationDelay: "1s" }}
            /> */}
            <div className="w-full flex-none md:w-2">
              <NavBar />
            </div>
            <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
              {children}
            </div>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
