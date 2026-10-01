const { test } = require("node:test");
const assert = require("node:assert/strict");
const { load } = require("../scripts/ts-loader.cjs");
const { lessonSources } = load("data/lessons");
const catalog = load("lib/catalog");
const { validateLessons } = load("lib/validate-content");
const { shuffle, prepareQuestions, checkAnswer, requeueAgain } =
  load("lib/practice");
const { defaultSrs, schedule, DAY_MS } = load("lib/srs");
const storage = load("lib/storage");
const { hasKanji, splitReading, toHiragana } = load("lib/furigana");
const readings = require("../data/readings.json");

test("exported detail URLs work as Windows paths without changing progress IDs", () => {
  const ids = [...catalog.cardIds, "bài:日本語:50%~x.*"];
  for (const id of ids) {
    const routeId = catalog.contentRouteId(id);
    assert.doesNotMatch(routeId, /[<>:"/\\|?*%]/);
    assert.equal(catalog.contentIdFromRoute(routeId), id);
  }
  for (const id of catalog.cardIds)
    assert.equal(
      catalog.findContent(
        catalog.contentIdFromRoute(catalog.contentRouteId(id)),
      ).item.id,
      id,
    );
  for (const [id, scoped] of Object.entries(catalog.legacyIdMap))
    assert.equal(catalog.contentIdFromRoute(catalog.contentRouteId(id)), id);
  assert.equal(
    catalog.contentIdFromRoute(catalog.cardIds[0]),
    catalog.cardIds[0],
  );
});

test("furigana aligns kana, converts katakana, and covers every kanji in lesson content", () => {
  assert.deepEqual(splitReading("食べ物", "タベモノ"), [
    { text: "食", reading: "た" },
    { text: "べ" },
    { text: "物", reading: "もの" },
  ]);
  assert.deepEqual(splitReading("厳しい", "きびしい"), [
    { text: "厳", reading: "きび" },
    { text: "しい" },
  ]);
  assert.equal(toHiragana("ガクシュウ"), "がくしゅう");
  function check(value) {
    if (typeof value === "string" && hasKanji(value)) {
      assert.ok(readings[value], `Missing reading: ${value}`);
      assert.equal(readings[value].map((part) => part.text).join(""), value);
      for (const part of readings[value])
        if (hasKanji(part.text)) {
          assert.ok(part.reading, `Unannotated kanji: ${value}`);
          assert.equal(hasKanji(part.reading), false);
          assert.equal(/[\u30a1-\u30f6]/u.test(part.reading), false);
        }
    } else if (Array.isArray(value)) value.forEach(check);
    else if (value && typeof value === "object")
      Object.values(value).forEach(check);
  }
  check(lessonSources);
});

test("lesson content has valid answers, complete reading passages and resolvable knowledge references", () => {
  assert.deepEqual(validateLessons(lessonSources), []);
  for (const q of catalog.questions) {
    if (q.passageId)
      assert.ok(
        catalog.lessons.some((lesson) =>
          lesson.passages.some((p) => p.id === q.passageId),
        ),
      );
    for (const target of q.targetIds || [])
      assert.ok(catalog.findContent(target));
  }
});
test("future lessons scope IDs independently even when local item IDs overlap", () => {
  assert.notEqual(
    catalog.contentId("n4-15", "vocabulary", "v-01"),
    catalog.contentId("n4-16", "vocabulary", "v-01"),
  );
  const duplicate = structuredClone(lessonSources[0]);
  assert.ok(
    validateLessons([lessonSources[0], duplicate]).some((error) =>
      error.includes("Trùng ID bài học"),
    ),
  );
});
test("validator rejects missing reading context and invalid answers", () => {
  const lesson = structuredClone(lessonSources[0]);
  lesson.questions.find((q) => q.category === "reading").passageId = "missing";
  lesson.questions.find((q) => q.kind === "mcq").answer = "missing";
  const errors = validateLessons([lesson]);
  assert.ok(errors.some((error) => error.includes("đoạn đọc không tồn tại")));
  assert.ok(errors.some((error) => error.includes("đáp án không có")));
});
test("shuffling preserves question IDs, accepted answers and source data", () => {
  const source = structuredClone(catalog.questions);
  const prepared = prepareQuestions(source, source.length);
  assert.deepEqual(source, catalog.questions);
  for (const q of prepared)
    if (q.kind === "mcq")
      assert.ok(q.options.some((option) => checkAnswer(q, option)));
  const moved = shuffle(["a", "b", "c", "d"], () => 0);
  assert.notDeepEqual(moved, ["a", "b", "c", "d"]);
  assert.deepEqual([...moved].sort(), ["a", "b", "c", "d"]);
});
test("Japanese full-width characters and accepted aliases normalize without removing Vietnamese accents", () => {
  assert.equal(
    checkAnswer({ answer: "ロック・スター|ロックスター" }, " ﾛｯｸ･ｽﾀｰ "),
    true,
  );
  assert.equal(checkAnswer({ answer: "có lẽ|biết đâu" }, " CÓ LẼ "), true);
  assert.equal(checkAnswer({ answer: "có lẽ" }, "co le"), false);
  assert.equal(checkAnswer({ answer: "かぜ" }, "がぜ"), false);
});
test("Again repeats after three other cards and never drops the final forgotten card", () => {
  assert.deepEqual(requeueAgain(["a", "b", "c", "d", "e"], 0), [
    "a",
    "b",
    "c",
    "d",
    "a",
    "e",
  ]);
  assert.deepEqual(requeueAgain(["a"], 0), ["a", "a"]);
});
test("SRS schedules forgotten cards immediately and known cards in the future", () => {
  const now = 1000000;
  const failed = schedule(defaultSrs(), "again", now);
  assert.equal(failed.due, now);
  assert.equal(failed.lapses, 1);
  assert.equal(schedule(defaultSrs(), "good", now).due, now + DAY_MS);
  assert.equal(schedule(defaultSrs(), "easy", now).due, now + 3 * DAY_MS);
});
test("old browser progress migrates to scoped IDs and survives export/import", () => {
  const data = new Map();
  global.window = {
    localStorage: {
      getItem: (key) => data.get(key) ?? null,
      setItem: (key, value) => data.set(key, value),
    },
    dispatchEvent: () => {},
  };
  const known = schedule(defaultSrs(), "good", 1000);
  data.set("jlpt-n4:progress", JSON.stringify({ "v15a-01": known }));
  data.set("jlpt-n4:wrong", JSON.stringify(["q-g-05"]));
  const migrated = storage.getStudy();
  assert.deepEqual(migrated.progress[catalog.legacyIdMap["v15a-01"]], known);
  assert.ok(migrated.wrong.includes(catalog.legacyIdMap["q-g-05"]));
  storage.saveStudy(migrated);
  storage.importStudy(JSON.stringify(migrated));
  assert.deepEqual(storage.getStudy(), migrated);
  storage.resetProgress();
  assert.deepEqual(storage.getStudy(), storage.emptyStudy());
  delete global.window;
});
test("import validation rejects corrupted states instead of replacing saved progress", () => {
  const invalid = storage.emptyStudy();
  invalid.progress["bad"] = {
    reps: 0,
    ease: 2.5,
    interval: -1,
    due: 0,
    lapses: 0,
  };
  assert.equal(storage.validateStudy(invalid), false);
  assert.throws(() => storage.importStudy(JSON.stringify(invalid)));
  assert.equal(
    storage.validateStudy({ ...storage.emptyStudy(), wrong: "bad" }),
    false,
  );
});
