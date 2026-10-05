import { toHiragana } from "./furigana";

// Pronounce optional parts, omitting the textbook's formatting and placeholders.
export function pronunciationText(reading: string): string {
  return toHiragana(reading).replace(/[()~〜～・\s]/gu, "");
}

export function pronunciationKey(text: string, reading: string): string {
  return JSON.stringify([text.normalize("NFKC"), pronunciationText(reading)]);
}

export type PronunciationState =
  | { status: "idle" | "loading" | "playing" }
  | { status: "error"; message: string };

type AudioClip = Pick<
  HTMLAudioElement,
  "preload" | "play" | "pause" | "onended" | "onerror" | "onplaying" | "onpause"
>;

// One player for all buttons. Only create/load audio after a user click, and
// ignore late events or rejected play promises from a clip already replaced.
export function createPronunciationPlayer(
  createAudio: (src: string) => AudioClip,
) {
  type Playback = {
    audio: AudioClip;
    report: (state: PronunciationState) => void;
    started: boolean;
    timeout?: ReturnType<typeof setTimeout>;
  };
  let active: Playback | undefined;

  function finish(playback: Playback, state: PronunciationState) {
    if (active !== playback) return;
    active = undefined;
    clearTimeout(playback.timeout);
    playback.audio.onended = null;
    playback.audio.onerror = null;
    playback.audio.onplaying = null;
    playback.audio.onpause = null;
    playback.report(state);
  }

  function cancel() {
    if (!active) return;
    const playback = active;
    finish(playback, { status: "idle" });
    playback.audio.pause();
  }

  function play(src: string, report: (state: PronunciationState) => void) {
    cancel();
    const audio = createAudio(src);
    audio.preload = "none";
    const playback: Playback = { audio, report, started: false };
    active = playback;
    const started = () => {
      if (active !== playback || playback.started) return;
      playback.started = true;
      report({ status: "playing" });
    };
    const failed = (error?: { name?: string }) => {
      if (active !== playback) return;
      finish(playback, {
        status: "error",
        message:
          error?.name === "NotAllowedError"
            ? "Trình duyệt đang chặn âm thanh. Hãy nhấn Nghe lại để bắt đầu phát."
            : "Không tải được âm thanh. Hãy kiểm tra kết nối mạng rồi nhấn Nghe lại.",
      });
      audio.pause();
    };
    audio.onplaying = started;
    audio.onended = () => finish(playback, { status: "idle" });
    audio.onpause = () => finish(playback, { status: "idle" });
    audio.onerror = () => failed();
    report({ status: "loading" });
    playback.timeout = setTimeout(() => failed(), 15000);
    try {
      // Invoke synchronously inside the click handler for mobile autoplay rules.
      void audio.play().then(started, failed);
    } catch {
      failed();
    }
    return () => {
      if (active === playback) cancel();
    };
  }

  return { play, cancel };
}
