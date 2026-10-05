const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const { load } = require("./ts-loader.cjs");
const { pronunciationKey, pronunciationText } = load("lib/pronunciation");

function checkAudio(lessons, manifest, root = path.resolve(__dirname, "..")) {
  const errors = [];
  const checked = new Set();
  for (const lesson of lessons) {
    for (const entry of [
      ...lesson.vocabulary,
      ...lesson.kanji.flatMap((kanji) => kanji.examples),
    ]) {
      const text = entry.word || entry.jp;
      const reading = pronunciationText(entry.reading || "");
      const key = pronunciationKey(text, reading);
      const clip = manifest.clips?.[key];
      if (!clip || clip.reading !== reading || !/^[ぁ-ゖー]+$/u.test(reading)) {
        errors.push(`${lesson.id}: Missing verified audio for ${text}`);
        continue;
      }
      if (checked.has(key)) continue;
      checked.add(key);
      if (!/^[a-f0-9]{24}\.mp3$/.test(clip.file)) {
        errors.push(`Invalid MP3 filename for ${text}`);
        continue;
      }
      try {
        const data = fs.readFileSync(
          path.join(root, "public", "audio", "pronunciation", clip.file),
        );
        const hash = crypto.createHash("sha256").update(data).digest("hex");
        if (
          data.length !== clip.bytes ||
          hash !== clip.sha256 ||
          clip.durationMs < 250 ||
          clip.durationMs > 10000
        )
          errors.push(`Corrupt or invalid MP3 for ${text}`);
      } catch {
        errors.push(`Missing MP3 file for ${text}`);
      }
    }
  }
  return errors;
}

module.exports = { checkAudio };
