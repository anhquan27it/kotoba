// Windows static packager. Validate the export and normalize the Sites manifest
// to the same dist/ layout used by its Bash packager.
const fs = require("node:fs");
const path = require("node:path");
const { spawnSync } = require("node:child_process");
const root = path.resolve(__dirname, "..");
const output = path.join(root, "out");
const manifest = JSON.parse(
  fs.readFileSync(path.join(root, ".openai/hosting.json"), "utf8"),
);
if (
  manifest.static?.directory !== "out" ||
  !fs.statSync(path.join(output, "index.html")).isFile()
)
  throw new Error("Build the Kotoba static export before packaging.");
function validateTree(filename) {
  const stat = fs.lstatSync(filename);
  if (stat.isDirectory()) {
    for (const name of fs.readdirSync(filename))
      validateTree(path.join(filename, name));
  } else if (!stat.isFile())
    throw new Error("The export contains a symlink or special file.");
}
validateTree(output);
const runtime = path.join(root, ".sites-runtime");
fs.mkdirSync(runtime, { recursive: true });
const stage = fs.mkdtempSync(path.join(runtime, "package-"));
const archive = path.join(runtime, "kotoba-online.tar.gz");
function run(executable, args) {
  const result = spawnSync(executable, args, { cwd: root, encoding: "utf8" });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(result.stderr || "Packaging failed");
  return result.stdout.trim();
}
try {
  const destination = path.join(stage, "dist");
  fs.cpSync(output, destination, { recursive: true });
  fs.mkdirSync(path.join(destination, ".openai"), { recursive: true });
  fs.writeFileSync(
    path.join(destination, ".openai/hosting.json"),
    JSON.stringify({
      ...manifest,
      static: { ...manifest.static, directory: "dist" },
    }) + "\n",
  );
  run("tar.exe", ["-czf", archive, "-C", stage, "dist"]);
  const entries = run("tar.exe", ["-tzf", archive]).split(/\r?\n/);
  for (const required of ["dist/index.html", "dist/.openai/hosting.json"])
    if (!entries.includes(required)) throw new Error(`Missing ${required}`);
  console.log(JSON.stringify({ archive, files: entries.length }));
} finally {
  const relative = path.relative(runtime, fs.realpathSync(stage));
  if (!relative || relative.startsWith("..") || path.isAbsolute(relative))
    throw new Error(
      "Refusing to remove a staging folder outside the workspace",
    );
  fs.rmSync(stage, { recursive: true, force: true });
}
