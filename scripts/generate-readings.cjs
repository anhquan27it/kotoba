const fs = require("node:fs");
const path = require("node:path");
const ts = require("typescript");
const kuromoji = require("kuromoji");
const { load } = require("./ts-loader.cjs");
const { lessonSources } = load("data/lessons/index.ts");
const { hasKanji, toHiragana, splitReading } = load("lib/furigana.ts");
const overrides = require("../data/reading-overrides.json");
const root = path.resolve(__dirname, "..");
const texts = new Set();
const explicit = new Map(Object.entries(overrides));

function collect(value) {
  if (typeof value === "string" && hasKanji(value)) texts.add(value);
  else if (Array.isArray(value)) value.forEach(collect);
  else if (value && typeof value === "object")
    Object.values(value).forEach(collect);
}
collect(lessonSources);
for (const lesson of lessonSources) {
  for (const question of lesson.questions)
    collect(question.answer.split("|").join(" / "));
  for (const word of lesson.vocabulary) explicit.set(word.word, word.reading);
  for (const item of [
    ...lesson.vocabulary,
    ...lesson.kanji,
    ...lesson.grammar,
  ]) {
    for (const example of item.examples)
      if (example.reading) explicit.set(example.jp, example.reading);
  }
}
// Include fixed Japanese interface labels as well as lesson content.
function scan(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const filename = path.join(directory, entry.name);
    if (entry.isDirectory()) scan(filename);
    else if (/\.tsx?$/.test(entry.name)) {
      const source = ts.createSourceFile(
        filename,
        fs.readFileSync(filename, "utf8"),
        ts.ScriptTarget.Latest,
        true,
        ts.ScriptKind.TSX,
      );
      function visit(node) {
        if (
          ts.isStringLiteral(node) ||
          ts.isJsxText(node) ||
          ts.isNoSubstitutionTemplateLiteral(node)
        )
          collect(node.text.trim());
        ts.forEachChild(node, visit);
      }
      visit(source);
    }
  }
}
scan(path.join(root, "components"));
scan(path.join(root, "app"));

kuromoji
  .builder({ dicPath: path.join(root, "node_modules/kuromoji/dict") })
  .build((error, tokenizer) => {
    if (error) throw error;
    const unknown = new Set();
    const map = {};
    // Match explicit words before tokenization, including counters and proper names.
    const customWords = [...explicit.keys()]
      .filter((word) => hasKanji(word) && word.length > 1)
      .sort((a, b) => b.length - a.length);
    const pattern = new RegExp(
      customWords
        .map((word) => {
          const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
          // A verified 1日 must not match the tail of 11日, for example.
          return /^[0-9０-９]/u.test(word)
            ? `(?<![0-9０-９])${escaped}`
            : escaped;
        })
        .join("|"),
      "gu",
    );
    function automatic(text) {
      const result = [];
      let offset = 0;
      for (const token of tokenizer.tokenize(text)) {
        const start = text.indexOf(token.surface_form, offset);
        if (start > offset) result.push({ text: text.slice(offset, start) });
        // Single-kanji headings give one reference reading (日: にち).
        // They must not override that character's contextual reading in prose.
        const reading =
          (token.surface_form.length > 1 && explicit.get(token.surface_form)) ||
          token.reading;
        if (hasKanji(token.surface_form) && !reading)
          unknown.add(token.surface_form);
        result.push(
          ...(reading
            ? splitReading(token.surface_form, reading)
            : [{ text: token.surface_form }]),
        );
        offset = start + token.surface_form.length;
      }
      if (offset < text.length) result.push({ text: text.slice(offset) });
      return result;
    }
    for (const text of [...texts].sort()) {
      if (explicit.has(text)) {
        map[text] = splitReading(text, explicit.get(text));
        continue;
      }
      const parts = [];
      let offset = 0;
      for (const match of text.matchAll(pattern)) {
        parts.push(
          ...automatic(text.slice(offset, match.index)),
          ...splitReading(match[0], explicit.get(match[0])),
        );
        offset = match.index + match[0].length;
      }
      parts.push(...automatic(text.slice(offset)));
      if (parts.map((part) => part.text).join("") !== text)
        throw new Error(`Reading changed the source: ${text}`);
      map[text] = parts.reduce((merged, part) => {
        const last = merged[merged.length - 1];
        if (!part.reading && last && !last.reading) last.text += part.text;
        else merged.push(part);
        return merged;
      }, []);
    }
    if (unknown.size)
      throw new Error(
        `Add verified readings to data/reading-overrides.json: ${[...unknown].join(", ")}`,
      );
    const output = path.join(root, "data/readings.json");
    const json = JSON.stringify(map, null, 2) + "\n";
    if (!fs.existsSync(output) || fs.readFileSync(output, "utf8") !== json)
      fs.writeFileSync(output, json);
    console.log(
      `Furigana prepared for ${texts.size} Japanese/mixed text entries. Dictionary stays out of the browser.`,
    );
  });
