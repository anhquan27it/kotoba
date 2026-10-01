const fs = require("node:fs");
const path = require("node:path");
const ts = require("typescript");
const cache = new Map();
const root = path.resolve(__dirname, "..");
function load(relativePath) {
  let filename = path.resolve(root, relativePath);
  if (!path.extname(filename))
    filename = fs.existsSync(filename + ".ts")
      ? filename + ".ts"
      : path.join(filename, "index.ts");
  if (cache.has(filename)) return cache.get(filename).exports;
  const module = { exports: {} };
  cache.set(filename, module);
  const compiled = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
  });
  const localRequire = (request) =>
    request.startsWith("@/")
      ? load(request.slice(2))
      : request.startsWith(".")
        ? load(path.resolve(path.dirname(filename), request))
        : require(request);
  new Function("require", "module", "exports", compiled.outputText)(
    localRequire,
    module,
    module.exports,
  );
  return module.exports;
}
module.exports = { load };
