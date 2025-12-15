import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  output: 'export',
  basePath: '/Resume',
  assetPrefix: '/Resume/',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
