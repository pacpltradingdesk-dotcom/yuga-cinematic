/** @type {import('next').NextConfig} */

// GitHub Pages project site lives under /<repo>. The deploy workflow sets
// GITHUB_PAGES=true so local dev/build stay at the root with no basePath.
const isPages = process.env.GITHUB_PAGES === "true";
const repo = "yuga-cinematic";

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error"] } : false,
  },
  ...(isPages && {
    output: "export",
    basePath: `/${repo}`,
    trailingSlash: true,
    images: { unoptimized: true },
  }),
};

export default nextConfig;
