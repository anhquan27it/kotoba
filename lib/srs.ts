// Thuật toán lặp lại ngắt quãng (Spaced Repetition) kiểu SM-2 đơn giản.
// Mỗi mục học (từ vựng / kanji / ngữ pháp) có một trạng thái SRS riêng.

export type Rating = "again" | "hard" | "good" | "easy";

export interface SrsState {
  /** Số lần đã ôn liên tiếp đạt "good/easy" */
  reps: number;
  /** Hệ số dễ (ease factor), bắt đầu từ 2.5 */
  ease: number;
  /** Khoảng cách (ngày) tới lần ôn tiếp theo */
  interval: number;
  /** Thời điểm đến hạn ôn (epoch ms) */
  due: number;
  /** Số lần trả lời sai (again) */
  lapses: number;
}

export const DAY_MS = 24 * 60 * 60 * 1000;

export function defaultSrs(): SrsState {
  return {
    reps: 0,
    ease: 2.5,
    interval: 0,
    due: 0,
    lapses: 0,
  };
}

const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

export function schedule(
  current: SrsState,
  rating: Rating,
  now: number = Date.now(),
): SrsState {
  const next: SrsState = { ...current };
  let interval: number;

  switch (rating) {
    case "again":
      next.reps = 0;
      next.lapses += 1;
      next.ease = clamp(next.ease - 0.2, 1.3, 3.0);
      interval = 0; // ôn lại trong phiên này
      break;
    case "hard":
      next.reps += 1;
      next.ease = clamp(next.ease - 0.15, 1.3, 3.0);
      interval =
        current.interval === 0 ? 1 : Math.round(current.interval * 1.2);
      break;
    case "good":
      next.reps += 1;
      interval =
        current.interval === 0
          ? 1
          : Math.round(current.interval * current.ease);
      break;
    case "easy":
      next.reps += 1;
      next.ease = clamp(next.ease + 0.15, 1.3, 3.0);
      interval =
        current.interval === 0
          ? 3
          : Math.round(current.interval * current.ease * 1.3);
      break;
    default:
      interval = current.interval;
  }

  next.interval = interval;
  next.due = interval === 0 ? now : now + interval * DAY_MS;
  return next;
}

export function isDue(state: SrsState, now: number = Date.now()): boolean {
  return state.due <= now;
}

/** Ước tính "độ thành thạo" 0..100 từ trạng thái SRS, để hiển thị tiến độ. */
export function mastery(state: SrsState | undefined): number {
  if (!state || state.reps === 0) return 0;
  return Math.min(100, Math.round(state.reps * 20 + state.ease * 10));
}
