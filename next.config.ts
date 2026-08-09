import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // Emit each route as <route>/index.html rather than a flat <route>.html.
  // Extensionless URLs like /robot-arm then resolve on any static host
  // without relying on host-specific ".html" fallback behaviour.
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
