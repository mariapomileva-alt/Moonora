import type { NextConfig } from "next";

/** GitHub project Pages: https://<user>.github.io/Moonora/ — assets must use this prefix in CI */
const repo = "Moonora";
const onGithubActions = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  output: "export",

  ...(onGithubActions
    ? {
        basePath: `/${repo}`,
        assetPrefix: `/${repo}/`,
      }
    : {}),

  images: {
    unoptimized: true,
  },

  /** Monorepo-style parent folder has another lockfile; pin Turbopack root to this app */
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
