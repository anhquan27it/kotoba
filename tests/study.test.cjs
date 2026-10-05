const { test } = require("node:test");
const assert = require("node:assert/strict");
const { load } = require("../scripts/ts-loader.cjs");
const { lessonSources } = load("data/lessons");
const catalog = load("lib/catalog");
const { validateLessons } = load("lib/validate-content");
const { shuffle, prepareQuestions, checkAnswer, requeueAgain } =
  load("lib/practice");
const { defaultSrs, schedule, DAY_MS } = load("lib/srs");
const { selectReviewCards, createReviewSession, advanceReviewSession } =
  load("lib/review");
const storage = load("lib/storage");
const { hasKanji, splitReading, toHiragana } = load("lib/furigana");
const readings = require("../data/readings.json");
const { pronunciationText, pronunciationKey, createPronunciationPlayer } =
  load("lib/pronunciation");
const { pronunciationAudioUrl } = load("lib/pronunciation-audio");
const audioManifest = require("../data/pronunciation-audio.json");
const { checkAudio } = require("../scripts/check-audio.cjs");

test("pronunciation uses verified kana for every vocabulary word and kanji example", () => {
  assert.equal(pronunciationText("（お）はなみ"), "おはなみ");
  assert.equal(pronunciationText("ゆうしょう（する）"), "ゆうしょうする");
  assert.equal(pronunciationText("～し"), "し");
  assert.equal(pronunciationText("～えんする"), "えんする");
  assert.equal(pronunciationText("エイプリル・フール"), "えいぷりるふーる");
  assert.equal(pronunciationText("ｶﾞｿﾘﾝ"), "がそりん");
  for (const lesson of lessonSources) {
    const entries = [
      ...lesson.vocabulary,
      ...lesson.kanji.flatMap((kanji) => kanji.examples),
    ];
    for (const entry of entries) {
      assert.ok(
        entry.reading,
        `Missing pronunciation: ${entry.word || entry.jp}`,
      );
      assert.match(pronunciationText(entry.reading), /^[ぁ-ゖー]+$/u);
    }
  }
});

test("all vocabulary and kanji examples have intact static MP3 files", () => {
  assert.deepEqual(checkAudio(lessonSources, audioManifest), []);
  assert.ok(checkAudio(lessonSources, { clips: {} }).length);
  const [key, clip] = Object.entries(audioManifest.clips)[0];
  const corrupt = {
    ...audioManifest,
    clips: { ...audioManifest.clips, [key]: { ...clip, sha256: "invalid" } },
  };
  assert.ok(
    checkAudio(lessonSources, corrupt).some((error) => /Corrupt/.test(error)),
  );
});

test("audio URLs work at the domain root and under a GitHub Pages base path", () => {
  const [key, clip] = Object.entries(audioManifest.clips)[0];
  assert.equal(pronunciationKey(clip.text, clip.reading), key);
  assert.equal(
    pronunciationAudioUrl(clip.text, clip.reading, ""),
    `/audio/pronunciation/${clip.file}`,
  );
  assert.equal(
    pronunciationAudioUrl(clip.text, clip.reading, "/kotoba"),
    `/kotoba/audio/pronunciation/${clip.file}`,
  );
  assert.equal(pronunciationAudioUrl("未登録", "みとうろく"), undefined);
  assert.notEqual(
    pronunciationKey("橋", "はし"),
    pronunciationKey("箸", "はし"),
  );
});

function mockAudio() {
  const clips = [];
  const player = createPronunciationPlayer((src) => {
    let resolve, reject;
    const ready = new Promise((yes, no) => {
      resolve = yes;
      reject = no;
    });
    const clip = {
      src,
      pauses: 0,
      resolve: () => resolve(),
      reject: (error) => reject(error),
      play: () => ready,
      pause() {
        this.pauses++;
        this.onpause?.();
      },
    };
    clips.push(clip);
    return clip;
  });
  return { player, clips };
}

test("MP3 playback replaces previous clips and ignores late events and old cleanup", async () => {
  const audio = mockAudio();
  const first = [],
    second = [];
  const stopFirst = audio.player.play("/first.mp3", (state) =>
    first.push(state),
  );
  assert.equal(audio.clips[0].src, "/first.mp3");
  assert.equal(audio.clips[0].preload, "none");
  assert.equal(first.at(-1).status, "loading");
  audio.clips[0].resolve();
  await Promise.resolve();
  assert.equal(first.at(-1).status, "playing");
  const lateError = audio.clips[0].onerror;
  const lateEnd = audio.clips[0].onended;
  const stopSecond = audio.player.play("/second.mp3", (state) =>
    second.push(state),
  );
  assert.equal(audio.clips[0].pauses, 1);
  assert.deepEqual(
    first.map((state) => state.status),
    ["loading", "playing", "idle"],
  );
  lateError();
  lateEnd();
  stopFirst();
  assert.equal(audio.clips[1].pauses, 0);
  assert.deepEqual(
    second.map((state) => state.status),
    ["loading"],
  );
  stopSecond();
  audio.clips[1].reject({ name: "AbortError" });
  await Promise.resolve();
  assert.deepEqual(
    second.map((state) => state.status),
    ["loading", "idle"],
  );
});

test("MP3 playback reports completion, rejected play and network failure", async () => {
  const audio = mockAudio();
  const finished = [];
  audio.player.play("/first.mp3", (state) => finished.push(state));
  audio.clips[0].onplaying();
  audio.clips[0].resolve();
  await Promise.resolve();
  audio.clips[0].onended();
  assert.deepEqual(
    finished.map((state) => state.status),
    ["loading", "playing", "idle"],
  );
  const blocked = [];
  audio.player.play("/second.mp3", (state) => blocked.push(state));
  audio.clips[1].reject({ name: "NotAllowedError" });
  await Promise.resolve();
  assert.equal(blocked.at(-1).status, "error");
  assert.match(blocked.at(-1).message, /chặn âm thanh/);
  assert.equal(audio.clips[1].pauses, 1);
  const failed = [];
  audio.player.play("/third.mp3", (state) => failed.push(state));
  audio.clips[2].onerror();
  audio.clips[2].reject({ name: "NotSupportedError" });
  await Promise.resolve();
  assert.deepEqual(
    failed.map((state) => state.status),
    ["loading", "error"],
  );
  assert.equal(audio.clips[2].pauses, 1);
});

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
test("verified compound and contextual furigana survive sentence tokenization", () => {
  const kana = (text) => {
    assert.ok(readings[text], `Missing reading: ${text}`);
    return readings[text].map((part) => part.reading || part.text).join("");
  };
  const cases = [
    ["洗濯物が乾きました。", "せんたくものがかわきました。"],
    ["留守の間に電話がありました。", "るすのあいだにでんわがありました。"],
    [
      "昼ご飯の後で、少し昼寝をしました。",
      "ひるごはんのあとで、すこしひるねをしました。",
    ],
    [
      "先生、今お時間よろしいですか。",
      "せんせい、いまおじかんよろしいですか。",
    ],
    ["カットだけで１万円もします。", "カットだけでいちまんえんもします。"],
  ];
  for (const [text, expected] of cases) assert.equal(kana(text), expected);
  const lesson16 = lessonSources.find((lesson) => lesson.id === "n4-16");
  const email = lesson16.passages.find((p) => p.id === "farewell-email");
  assert.match(kana(email.paragraphs[3]), /ひまなひ/);
  assert.match(kana(email.paragraphs[3]), /さんかできるひ/);
  assert.equal(kana("日"), "にち"); // A reference reading stays valid on the heading.
  const lesson15 = lessonSources.find((lesson) => lesson.id === "n4-15");
  const bus = lesson15.grammar.find((g) => g.id === "g-15-05");
  assert.match(kana(bus.examples[3].jp), /いちにちにごほん/);
  const ramen = lesson15.passages.find((p) => p.id === "ramen");
  assert.match(kana(ramen.paragraphs[1]), /ほかのラーメン/);
  const movieQuestion = lessonSources
    .find((lesson) => lesson.id === "n4-17")
    .questions.find((q) => q.id === "q-r-17-01");
  assert.match(kana(movieQuestion.prompt), /^ふたりが/);
});

test("chapter 15 compatibility exports cannot drift from its canonical lesson", () => {
  const lesson15 = lessonSources.find((lesson) => lesson.id === "n4-15");
  assert.strictEqual(load("data/vocabulary").vocabulary, lesson15.vocabulary);
  assert.strictEqual(load("data/kanji").kanji, lesson15.kanji);
  assert.strictEqual(load("data/grammar").grammar, lesson15.grammar);
  assert.strictEqual(
    load("data/grammar").plainFormTables,
    lesson15.referenceTables,
  );
  assert.strictEqual(load("data/questions").questions, lesson15.questions);
});

test("validator rejects missing or blank paragraph translations when provided", () => {
  const lesson = structuredClone(lessonSources[0]);
  lesson.passages[0].translation = [];
  assert.ok(validateLessons([lesson]).some((e) => e.includes("bản dịch")));
  lesson.passages[0].translation = [" "];
  assert.ok(validateLessons([lesson]).some((e) => e.includes("bản dịch")));
  delete lesson.passages[0].translation;
  assert.deepEqual(validateLessons([lesson]), []);
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

test("flashcard sessions repeat unknown cards without growing the queue or reducing progress", () => {
  const original = ["a", "b", "c", "d", "e"];
  const initial = createReviewSession(original);
  let session = advanceReviewSession(initial, "again");
  assert.deepEqual(session.queue, ["b", "c", "d", "a", "e"]);
  assert.deepEqual(initial.queue, original);
  assert.equal(session.known, 0);
  assert.equal(session.total, 5);
  session = advanceReviewSession(session, "good");
  const known = session.known;
  session = advanceReviewSession(session, "again");
  assert.equal(session.known, known);
  assert.equal(session.queue.length, session.total - session.known);
  while (session.queue.length) session = advanceReviewSession(session, "good");
  assert.equal(session.known, 5);
  assert.equal(session.answers, 7);
  assert.equal(session.againCount, 2);
  assert.equal(advanceReviewSession(session, "again"), session);
});

test("the last unknown flashcard stays available until it is marked known", () => {
  let session = createReviewSession(["last"]);
  for (let index = 0; index < 10; index++) {
    session = advanceReviewSession(session, "again");
    assert.deepEqual(session.queue, ["last"]);
    assert.equal(session.known, 0);
  }
  session = advanceReviewSession(session, "good");
  assert.deepEqual(session.queue, []);
  assert.equal(session.known, 1);
  assert.equal(session.againCount, 10);
});

test("scheduled flashcards prioritize overdue cards and enrolled new cards within the new-card limit", () => {
  const cards = ["fresh", "later", "due", "enrolled", "oldest"].map((id) => ({
    id,
  }));
  const progress = {
    due: { ...defaultSrs(), due: 90 },
    oldest: { ...defaultSrs(), due: 10 },
    later: { ...defaultSrs(), reps: 2, due: 500 },
  };
  const selected = selectReviewCards(
    cards,
    progress,
    ["enrolled"],
    "scheduled",
    1,
    100,
    false,
  );
  assert.deepEqual(
    selected.map((card) => card.id),
    ["oldest", "due", "enrolled"],
  );
  assert.deepEqual(
    selectReviewCards(cards, progress, [], "scheduled", 0, 100, false).map(
      (card) => card.id,
    ),
    ["oldest", "due"],
  );
  assert.equal(cards.length, 5);
});

test("unknown and full flashcard decks include the correct cards regardless of the review date", () => {
  const cards = ["fresh", "forgotten", "known"].map((id) => ({ id }));
  const progress = {
    forgotten: schedule(defaultSrs(), "again", 100),
    known: schedule(defaultSrs(), "good", 100),
  };
  assert.deepEqual(
    selectReviewCards(cards, progress, [], "unknown", 1, 200, false).map(
      (card) => card.id,
    ),
    ["fresh", "forgotten"],
  );
  const all = selectReviewCards(cards, progress, [], "all", 1, 200, true);
  assert.deepEqual(all.map((card) => card.id).sort(), [
    "forgotten",
    "fresh",
    "known",
  ]);
  assert.deepEqual(
    selectReviewCards([], {}, [], "scheduled", 10, 200, true),
    [],
  );
});

test("binary flashcard ratings preserve existing progress, legacy history and backup compatibility", () => {
  const data = new Map();
  global.window = {
    localStorage: {
      getItem: (key) => data.get(key) ?? null,
      setItem: (key, value) => data.set(key, value),
    },
    dispatchEvent: () => {},
  };
  try {
    const saved = storage.emptyStudy();
    const [first, second] = catalog.cardIds;
    saved.progress[first] = schedule(defaultSrs(), "easy", 100);
    saved.progress[second] = schedule(defaultSrs(), "hard", 100);
    saved.learned = [first];
    saved.wrong = [catalog.questions[0].id];
    saved.quizHistory = [
      { lessonId: "n4-15", correct: 2, total: 3, date: 100 },
    ];
    storage.saveStudy(saved);
    storage.rateCard(first, "again");
    let next = storage.getStudy();
    assert.equal(next.progress[first].reps, 0);
    assert.equal(next.progress[first].lapses, 1);
    assert.deepEqual(next.progress[second], saved.progress[second]);
    assert.deepEqual(next.learned, saved.learned);
    assert.deepEqual(next.wrong, saved.wrong);
    assert.deepEqual(next.quizHistory, saved.quizHistory);
    storage.rateCard(first, "good");
    next = storage.getStudy();
    assert.equal(next.progress[first].reps, 1);
    assert.equal(next.progress[first].interval, 1);
    assert.equal(next.enrolled.filter((id) => id === first).length, 1);
    storage.importStudy(JSON.stringify(next));
    assert.deepEqual(storage.getStudy(), next);
  } finally {
    delete global.window;
  }
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
