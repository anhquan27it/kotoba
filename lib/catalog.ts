import { lessonSources } from "@/data/lessons";
import type { DeckType, Lesson, LessonTab } from "./types";

export const levels = ["N5", "N4", "N3", "N2", "N1"] as const;
export const labels: Record<LessonTab, string> = {
  overview: "Tổng quan",
  vocabulary: "Từ vựng",
  kanji: "Kanji",
  grammar: "Ngữ pháp",
  reading: "Đọc hiểu",
};
export function contentId(lessonId: string, type: string, id: string) {
  return `${lessonId}:${type}:${id}`;
}

// Keep stored item IDs unchanged while making detail URLs safe to export as
// filenames on Windows. Percent escapes use '~' to avoid a second URL decode.
export function contentRouteId(id: string) {
  return encodeURIComponent(id)
    .replace(
      /[.!'()*~]/g,
      (char) => `%${char.charCodeAt(0).toString(16).toUpperCase()}`,
    )
    .replaceAll("%", "~");
}
export function contentIdFromRoute(routeId: string) {
  try {
    return decodeURIComponent(routeId.replaceAll("~", "%"));
  } catch {
    return routeId;
  }
}
export const contentHref = (type: DeckType, id: string) =>
  `/${type}/${contentRouteId(id)}`;

function scopeLesson(lesson: Lesson): Lesson {
  const id = (kind: string, raw: string) => contentId(lesson.id, kind, raw);
  return {
    ...lesson,
    vocabulary: lesson.vocabulary.map((v) => ({
      ...v,
      id: id("vocabulary", v.id),
    })),
    kanji: lesson.kanji.map((k) => ({ ...k, id: id("kanji", k.id) })),
    grammar: lesson.grammar.map((g) => ({ ...g, id: id("grammar", g.id) })),
    passages: lesson.passages.map((p) => ({ ...p, id: id("reading", p.id) })),
    questions: lesson.questions.map((q) => ({
      ...q,
      id: id("question", q.id),
      passageId: q.passageId ? id("reading", q.passageId) : undefined,
      targetIds: q.targetIds?.filter(Boolean).map((target) => {
        const kind = lesson.vocabulary.some((v) => v.id === target)
          ? "vocabulary"
          : lesson.kanji.some((k) => k.id === target)
            ? "kanji"
            : "grammar";
        return id(kind, target);
      }),
    })),
  };
}

export const lessons = lessonSources
  .map(scopeLesson)
  .sort(
    (a, b) =>
      levels.indexOf(a.level) - levels.indexOf(b.level) || a.number - b.number,
  );
export const getLesson = (id: string | undefined) =>
  lessons.find((lesson) => lesson.id === id);
export const vocabulary = lessons.flatMap((lesson) => lesson.vocabulary);
export const kanji = lessons.flatMap((lesson) => lesson.kanji);
export const grammar = lessons.flatMap((lesson) => lesson.grammar);
export const questions = lessons.flatMap((lesson) => lesson.questions);
export const cardIds = lessons.flatMap((lesson) =>
  [...lesson.vocabulary, ...lesson.kanji, ...lesson.grammar].map((v) => v.id),
);

export function findContent(id: string) {
  for (const lesson of lessons) {
    for (const type of ["vocabulary", "kanji", "grammar"] as DeckType[]) {
      const item = lesson[type].find((entry) => entry.id === id);
      if (item) return { lesson, type, item };
    }
  }
  return undefined;
}

/** Keep old detail links and browser progress working after the redesign. */
export const legacyIdMap: Record<string, string> = Object.fromEntries(
  lessonSources
    .filter((lesson) => lesson.id === "n4-15")
    .flatMap((lesson) =>
      (["vocabulary", "kanji", "grammar", "questions"] as const).flatMap(
        (type) =>
          lesson[type].map((item) => [
            item.id,
            contentId(
              lesson.id,
              type === "questions" ? "question" : type,
              item.id,
            ),
          ]),
      ),
    ),
);

export const lessonHref = (lessonId: string, tab: LessonTab = "overview") =>
  `/lessons/${lessonId}${tab === "overview" ? "" : `?tab=${tab}`}`;
