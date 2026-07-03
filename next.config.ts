import type { NextConfig } from "next";
/** @type {import('next').NextConfig} */
 

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
};

export default nextConfig;
