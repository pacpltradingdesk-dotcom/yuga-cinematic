/** @type {import('next').NextConfig} */

// Production deploy is a static export served at the ROOT of the custom domain
// (yuga-pmc.in) via GitHub Pages, so there is no basePath. The deploy workflow
// sets GITHUB_PAGES=true; local dev/build stay a normal Next.js app.
const isPages = process.env.GITHUB_PAGES === "true";

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error"] } : false,
  },
  ...(isPages && {
    output: "export",
    trailingSlash: true,
    images: { unoptimized: true },
    // Custom domain serves at root, so no path prefix. Media.tsx reads this
    // (empty → no prefix), which is correct for an apex-domain deploy.
    env: { NEXT_PUBLIC_BASE_PATH: "" },
  }),
};

export default nextConfig;
