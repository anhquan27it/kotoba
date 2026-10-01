const path = require("node:path");
const { spawnSync } = require("node:child_process");
const root = path.resolve(__dirname, "..");
const githubPages = process.argv.includes("--github-pages");
const repository = process.env.GITHUB_REPOSITORY?.split("/").pop() || "kotoba";
const basePath =
  process.env.NEXT_PUBLIC_KOTOBA_BASE_PATH ??
  (githubPages && !repository.endsWith(".github.io") ? `/${repository}` : "");
console.log(`Building Kotoba for ${basePath || "/"}`);
for (const args of [
  [path.join(__dirname, "generate-readings.cjs")],
  [path.join(root, "node_modules/next/dist/bin/next"), "build", root],
]) {
  const result = spawnSync(process.execPath, args, {
    cwd: root,
    stdio: "inherit",
    env: {
      ...process.env,
      KOTOBA_EXPORT: "1",
      KOTOBA_DIST_DIR: ".next",
      NEXT_PUBLIC_KOTOBA_BASE_PATH: basePath,
    },
  });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status || 1);
}
