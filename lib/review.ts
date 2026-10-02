import type { SrsState } from "./srs";
import { shuffle } from "./practice";

export type ReviewRating = "again" | "good";
export type ReviewMode = "scheduled" | "all" | "unknown";
export type ReviewDirection = "ja-vi" | "vi-ja";

export function selectReviewCards<T extends { id: string }>(
  cards: T[],
  progress: Record<string, SrsState>,
  enrolled: string[],
  mode: ReviewMode,
  newLimit: number,
  now: number,
  randomize: boolean,
): T[] {
  const ordered = randomize ? shuffle(cards) : [...cards];
  if (mode === "all") return ordered;
  if (mode === "unknown")
    return ordered.filter((card) => !progress[card.id]?.reps);
  const due = ordered
    .filter((card) => progress[card.id] && progress[card.id].due <= now)
    .sort((a, b) => progress[a.id].due - progress[b.id].due);
  const fresh = ordered
    .filter((card) => !progress[card.id])
    .sort(
      (a, b) =>
        Number(enrolled.includes(b.id)) - Number(enrolled.includes(a.id)),
    );
  return [...due, ...fresh.slice(0, newLimit)];
}

export interface ReviewSession<T> {
  queue: T[];
  total: number;
  known: number;
  answers: number;
  againCount: number;
}

export function createReviewSession<T>(cards: T[]): ReviewSession<T> {
  return {
    queue: [...cards],
    total: cards.length,
    known: 0,
    answers: 0,
    againCount: 0,
  };
}

export function advanceReviewSession<T>(
  session: ReviewSession<T>,
  rating: ReviewRating,
): ReviewSession<T> {
  if (!session.queue.length) return session;
  const [card, ...queue] = session.queue;
  if (rating === "again") queue.splice(Math.min(3, queue.length), 0, card);
  return {
    ...session,
    queue,
    known: session.known + Number(rating === "good"),
    answers: session.answers + 1,
    againCount: session.againCount + Number(rating === "again"),
  };
}
