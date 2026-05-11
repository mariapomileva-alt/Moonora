import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /** Monorepo-style parent folder has another lockfile; pin Turbopack root to this app */
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
