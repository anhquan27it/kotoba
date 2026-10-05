const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const { spawnSync } = require("node:child_process");
const { load } = require("./ts-loader.cjs");
const { lessonSources } = load("data/lessons");
const { pronunciationKey, pronunciationText } = load("lib/pronunciation");

const root = path.resolve(__dirname, "..");
const voice = "ja-JP-NanamiNeural";
const rate = "-10%";
const entries = new Map();
let total = 0;
for (const lesson of lessonSources) {
  for (const entry of [
    ...lesson.vocabulary,
    ...lesson.kanji.flatMap((kanji) => kanji.examples),
  ]) {
    total++;
    const text = entry.word || entry.jp;
    const reading = pronunciationText(entry.reading || "");
    if (!/^[ぁ-ゖー]+$/u.test(reading))
      throw new Error(`Missing verified kana for ${lesson.id}: ${text}`);
    const key = pronunciationKey(text, reading);
    const hash = crypto
      .createHash("sha256")
      .update(JSON.stringify([key, voice, rate]))
      .digest("hex")
      .slice(0, 24);
    entries.set(key, { key, text, reading, file: `${hash}.mp3` });
  }
}
const planFile = path.join(root, "artifacts", "pronunciation", "plan.json");
fs.mkdirSync(path.dirname(planFile), { recursive: true });
fs.writeFileSync(
  planFile,
  JSON.stringify(
    { voice, rate, total, entries: [...entries.values()] },
    null,
    2,
  ),
);
console.log(`${total} learning entries; ${entries.size} unique audio clips.`);
if (!process.argv.includes("--plan-only")) {
  const pythonArg = process.argv.find((arg) => arg.startsWith("--python="));
  const python =
    pythonArg?.slice("--python=".length) ||
    process.env.KOTOBA_PYTHON ||
    "python";
  const result = spawnSync(
    python,
    [path.join(__dirname, "generate-audio.py"), planFile],
    {
      cwd: root,
      stdio: "inherit",
      windowsHide: true,
    },
  );
  if (result.error) throw result.error;
  process.exitCode = result.status ?? 1;
}
