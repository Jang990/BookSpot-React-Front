import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // reactStrictMode: false,
  images: {
    domains: ["contents.kyobobook.co.kr"],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path((?!auth).*)",
        destination: process.env.NEXT_PUBLIC_API_SERVER_URL + "/api/:path*",
      },
    ];
  },
};

export default nextConfig;
