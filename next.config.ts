import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Standalone output creates a minimal self-contained server bundle
  // This is the recommended approach for deploying Next.js on non-Vercel platforms
  output: "standalone",
};

export default nextConfig;
