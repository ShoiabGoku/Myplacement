import type { NextConfig } from "next";

// Static export for GitHub Pages. The site is served from
// https://shoiabgoku.github.io/Myplacement, so the basePath must match the
// repo name in production builds. Dev server runs at the root.
const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd ? "/Myplacement" : "",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
