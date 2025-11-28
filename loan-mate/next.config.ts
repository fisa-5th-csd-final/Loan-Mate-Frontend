import type { NextConfig } from "next";
import withPWA from "@ducanh2912/next-pwa";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  // env: {
  //   NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  // },
  outputFileTracingRoot: path.join(__dirname, "./"),
};

export default withPWA({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  disable: process.env.NODE_ENV === "development",
  workboxOptions: {
    disableDevLogs: true,
  },
})(nextConfig);
