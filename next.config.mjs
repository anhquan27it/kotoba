/** @type {import('next').NextConfig} */
const basePath = process.env.NEXT_PUBLIC_KOTOBA_BASE_PATH || "";
if (
  basePath &&
  (!/^\/[A-Za-z0-9._-]+$/.test(basePath) || ["/.", "/.."].includes(basePath))
) {
  throw new Error(
    "Kotoba base path must be empty or a GitHub repository path such as /kotoba",
  );
}
const nextConfig = {
  reactStrictMode: true,
  basePath,
  distDir: process.env.KOTOBA_DIST_DIR || ".next",
  ...(process.env.KOTOBA_EXPORT === "1"
    ? { output: "export", trailingSlash: true }
    : {}),
};

export default nextConfig;
