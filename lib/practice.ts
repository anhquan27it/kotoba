import type { Question } from "./types";

export function shuffle<T>(
  items: T[],
  random: () => number = Math.random,
): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
export function prepareQuestions(items: Question[], limit: number) {
  return shuffle(items)
    .slice(0, limit)
    .map((q) => ({
      ...q,
      options: q.options ? shuffle(q.options) : undefined,
    }));
}
export function normalizeAnswer(value: string) {
  return value
    .normalize("NFKC")
    .trim()
    .toLocaleLowerCase("vi")
    .replace(/\s+/g, " ");
}
export function checkAnswer(question: Question, value: string) {
  return question.answer
    .split("|")
    .some((answer) => normalizeAnswer(answer) === normalizeAnswer(value));
}
export function requeueAgain<T>(queue: T[], index: number): T[] {
  const next = [...queue];
  next.splice(Math.min(index + 4, next.length), 0, queue[index]);
  return next;
}
