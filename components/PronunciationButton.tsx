"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  createPronunciationPlayer,
  type PronunciationState,
} from "@/lib/pronunciation";
import { pronunciationAudioUrl } from "@/lib/pronunciation-audio";
import Icon from "./Icon";

let player: ReturnType<typeof createPronunciationPlayer> | undefined;
function getPlayer() {
  if (typeof window === "undefined" || !("Audio" in window)) return;
  player ??= createPronunciationPlayer((src) => new Audio(src));
  return player;
}

export default function PronunciationButton({
  text,
  reading,
}: {
  text: string;
  reading: string;
}) {
  const [state, setState] = useState<PronunciationState>({ status: "idle" });
  const stop = useRef<(() => void) | undefined>(undefined);
  const messageId = useId();
  const playing = state.status === "playing" || state.status === "loading";

  useEffect(() => {
    return () => stop.current?.();
  }, [text, reading]);

  return (
    <span className="pronunciation-control">
      <button
        type="button"
        className={`pronunciation-button${playing ? " is-playing" : ""}`}
        aria-label={`${playing ? "Dừng phát âm" : "Nghe phát âm"}: ${text}`}
        aria-pressed={playing}
        aria-describedby={state.status === "error" ? messageId : undefined}
        title="Phát âm bằng giọng tổng hợp tiếng Nhật"
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          if (playing) {
            stop.current?.();
            return;
          }
          const src = pronunciationAudioUrl(text, reading);
          const currentPlayer = getPlayer();
          if (!src || !currentPlayer) {
            setState({
              status: "error",
              message:
                "Âm thanh của từ này chưa sẵn sàng. Hãy tải lại trang rồi thử lại.",
            });
            return;
          }
          stop.current = currentPlayer.play(src, setState);
        }}
      >
        <Icon name={playing ? "stop" : "speaker"} size={18} />
        <span>
          {state.status === "loading" ? "Đang tải" : playing ? "Dừng" : "Nghe"}
        </span>
      </button>
      {state.status === "error" && (
        <span id={messageId} className="pronunciation-message" role="status">
          {state.message}
        </span>
      )}
    </span>
  );
}
