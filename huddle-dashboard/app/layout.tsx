import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./ui/global.css";
import { inter, lusitana } from "./ui/fonts";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: {
    template: "Pharmacy Huddle | %s",
    default: "Pharmacy Huddle",
  },
  description: "The official dashboard for central pharmacies",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
