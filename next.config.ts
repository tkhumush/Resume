import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  output: 'export',
  basePath: isProd ? '/Resume' : undefined,
  assetPrefix: isProd ? '/Resume/' : undefined,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
