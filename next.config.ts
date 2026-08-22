import type { NextConfig } from "next";
/** @type {import('next').NextConfig} */
 

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
    staleTimes: {
      dynamic: 0,
    }
  },
};

export default nextConfig;
