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
    // next/image does not auto-prefix basePath onto public-folder src under
    // `output: export` + `unoptimized`, so expose it for manual prefixing.
    env: { NEXT_PUBLIC_BASE_PATH: `/${repo}` },
  }),
};

export default nextConfig;
