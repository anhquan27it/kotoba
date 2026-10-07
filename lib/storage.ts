"use client";
import { defaultSrs, schedule, type Rating, type SrsState } from "./srs";
import { legacyIdMap } from "./catalog";
const KEY = "kotoba:study:v2";
export const STUDY_EVENT = "kotoba:study-change";
export interface StudyState {
  version: 2;
  progress: Record<string, SrsState>;
  learned: string[];
  enrolled: string[];
  wrong: string[];
  streak: { last: string; count: number };
  activity: Record<string, number>;
  lastLesson: string | null;
  quizHistory: {
    lessonId: string;
    correct: number;
    total: number;
    date: number;
  }[];
}
export function emptyStudy(): StudyState {
  return {
    version: 2,
    progress: {},
    learned: [],
    enrolled: [],
    wrong: [],
    streak: { last: "", count: 0 },
    activity: {},
    lastLesson: null,
    quizHistory: [],
  };
}
function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    return JSON.parse(window.localStorage.getItem(key) ?? "null") ?? fallback;
  } catch {
    return fallback;
  }
}
const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);
const stringList = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((item) => typeof item === "string");
const finiteNonnegative = (value: unknown): value is number =>
  typeof value === "number" && Number.isFinite(value) && value >= 0;
function validSrs(value: unknown): value is SrsState {
  return (
    isObject(value) &&
    [value.reps, value.interval, value.due, value.lapses].every(
      finiteNonnegative,
    ) &&
    typeof value.ease === "number" &&
    Number.isFinite(value.ease) &&
    value.ease >= 1.3 &&
    value.ease <= 3
  );
}
export function validateStudy(value: unknown): value is StudyState {
  if (
    !isObject(value) ||
    value.version !== 2 ||
    !isObject(value.progress) ||
    !Object.values(value.progress).every(validSrs)
  )
    return false;
  if (
    ![value.learned, value.enrolled, value.wrong].every(stringList) ||
    !isObject(value.streak) ||
    typeof value.streak.last !== "string" ||
    !finiteNonnegative(value.streak.count)
  )
    return false;
  if (
    !isObject(value.activity) ||
    !Object.values(value.activity).every(finiteNonnegative) ||
    (value.lastLesson !== null && typeof value.lastLesson !== "string")
  )
    return false;
  return (
    Array.isArray(value.quizHistory) &&
    value.quizHistory.every(
      (entry) =>
        isObject(entry) &&
        typeof entry.lessonId === "string" &&
        finiteNonnegative(entry.correct) &&
        finiteNonnegative(entry.total) &&
        entry.correct <= entry.total &&
        finiteNonnegative(entry.date),
    )
  );
}
export function getStudy(): StudyState {
  const current = read<unknown>(KEY, null);
  if (validateStudy(current)) return current;
  const state = emptyStudy();
  const old = read<Record<string, unknown>>("jlpt-n4:progress", {});
  if (isObject(old))
    for (const [id, entry] of Object.entries(old)) {
      if (validSrs(entry) && legacyIdMap[id]) {
        const nextId = legacyIdMap[id];
        state.progress[nextId] = entry;
        state.enrolled.push(nextId);
        state.learned.push(nextId);
      }
    }
  const wrong = read<unknown>("jlpt-n4:wrong", []);
  if (stringList(wrong))
    state.wrong = wrong.map((id) => legacyIdMap[id]).filter(Boolean);
  const streak = read<{ last: string; count: number }>(
    "jlpt-n4:streak",
    state.streak,
  );
  if (
    isObject(streak) &&
    typeof streak.last === "string" &&
    finiteNonnegative(streak.count)
  )
    state.streak = streak;
  return state;
}
export function saveStudy(state: StudyState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(state));
  window.dispatchEvent(new Event(STUDY_EVENT));
}
function update(mutation: (state: StudyState) => void) {
  const state = getStudy();
  mutation(state);
  try {
    saveStudy(state);
  } catch {
    window.dispatchEvent(new CustomEvent("kotoba:storage-error"));
  }
  return state;
}
function day(date = new Date()) {
  return date.toDateString();
}
function yesterday() {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return day(date);
}
function activity(state: StudyState) {
  const today = day();
  if (state.streak.last !== today)
    state.streak = {
      last: today,
      count: state.streak.last === yesterday() ? state.streak.count + 1 : 1,
    };
  state.activity[today] = (state.activity[today] ?? 0) + 1;
}
export function getStreak(state = getStudy()) {
  return state.streak.last === day() || state.streak.last === yesterday()
    ? state.streak.count
    : 0;
}
export const getProgress = () => getStudy().progress;
export const getSrsState = (id: string) =>
  getStudy().progress[id] ?? defaultSrs();
export const getWrongIds = () => getStudy().wrong;
export const filterDue = (ids: string[], now = Date.now()) => {
  const progress = getProgress();
  return ids.filter((id) => progress[id] && progress[id].due <= now);
};
export const countDue = (ids: string[]) => filterDue(ids).length;
export function rateCard(id: string, rating: Rating) {
  const state = update((state) => {
    state.progress[id] = schedule(state.progress[id] ?? defaultSrs(), rating);
    if (!state.enrolled.includes(id)) state.enrolled.push(id);
    activity(state);
  });
  return state.progress[id];
}
export function markLearned(id: string, lessonId: string) {
  update((state) => {
    state.lastLesson = lessonId;
    if (!state.learned.includes(id)) {
      state.learned.push(id);
      activity(state);
    }
  });
}
export function enrollCard(id: string) {
  update((state) => {
    if (!state.enrolled.includes(id)) state.enrolled.push(id);
  });
}
export function rememberLesson(id: string) {
  update((state) => {
    state.lastLesson = id;
  });
}
export function recordAnswer(id: string, correct: boolean) {
  update((state) => {
    state.wrong = state.wrong.filter((item) => item !== id);
    if (!correct) state.wrong.push(id);
    activity(state);
  });
}
export function recordQuiz(lessonId: string, correct: number, total: number) {
  update((state) => {
    state.quizHistory = [
      ...state.quizHistory,
      { lessonId, correct, total, date: Date.now() },
    ].slice(-100);
  });
}
export function resetProgress() {
  try {
    saveStudy(emptyStudy());
  } catch {
    window.dispatchEvent(new CustomEvent("kotoba:storage-error"));
  }
}
export function importStudy(raw: string) {
  const state: unknown = JSON.parse(raw);
  if (!validateStudy(state))
    throw new Error("Tệp không đúng định dạng bản sao tiến độ LearnNova.");
  saveStudy(state);
}
