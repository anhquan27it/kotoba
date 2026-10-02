"use client";
import { useEffect, useId, useState } from "react";
import type { ReviewRating } from "@/lib/review";
import Icon from "./Icon";

export default function Flashcard({
  front,
  back,
  frontLabel,
  onRate,
}: {
  front: React.ReactNode;
  back: React.ReactNode;
  frontLabel: string;
  onRate: (rating: ReviewRating) => void;
}) {
  const [flipped, setFlipped] = useState(false);
  const contentId = useId();
  useEffect(() => {
    const handle = (event: KeyboardEvent) => {
      if (
        event.repeat ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        (event.target instanceof HTMLElement &&
          (event.target.closest("input,textarea,select,a") ||
            event.target.isContentEditable))
      )
        return;
      if (event.code === "Space") {
        // Focused buttons already support Space through their native click.
        if (
          event.target instanceof HTMLElement &&
          event.target.closest("button")
        )
          return;
        event.preventDefault();
        setFlipped((current) => !current);
      }
      if (
        flipped &&
        ["1", "2", "ArrowLeft", "ArrowRight"].includes(event.key)
      ) {
        if (
          event.target instanceof HTMLElement &&
          event.target.closest("button") &&
          !event.target.closest(".flashcard-flip,.rating-button")
        )
          return;
        event.preventDefault();
        onRate(
          event.key === "1" || event.key === "ArrowLeft" ? "again" : "good",
        );
      }
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [flipped, onRate]);
  return (
    <>
      <div className={`flashcard ${flipped ? "is-flipped" : ""}`}>
        <span className="flashcard-label">
          {flipped ? "ĐÁP ÁN" : frontLabel}
        </span>
        <div
          id={contentId}
          className="flashcard-content"
          key={String(flipped)}
          aria-live="polite"
        >
          {flipped ? back : front}
        </div>
        <span className="flashcard-flip-hint" aria-hidden="true">
          <Icon name="reset" size={18} />
          {flipped ? "Chạm để xem lại mặt trước" : "Chạm vào thẻ để lật"}
        </span>
        <button
          className="flashcard-flip"
          aria-label={
            flipped ? "Lật thẻ về mặt trước" : "Lật thẻ để xem đáp án"
          }
          aria-describedby={contentId}
          aria-keyshortcuts="Space"
          onClick={() => setFlipped((current) => !current)}
        />
      </div>
      <div className="ratings" aria-label="Tự đánh giá sau khi xem đáp án">
        <button
          className="rating-button rating-again"
          disabled={!flipped}
          onClick={() => onRate("again")}
          aria-keyshortcuts="ArrowLeft 1"
        >
          <Icon name="close" size={24} />
          <strong>Chưa thuộc</strong>
          <kbd>←</kbd>
        </button>
        <button
          className="rating-button rating-good"
          disabled={!flipped}
          onClick={() => onRate("good")}
          aria-keyshortcuts="ArrowRight 2"
        >
          <Icon name="check" size={24} />
          <strong>Thuộc</strong>
          <kbd>→</kbd>
        </button>
      </div>
      <p className="flashcard-help">
        {flipped
          ? "Chưa thuộc: thẻ sẽ quay lại sau vài thẻ khác."
          : "Lật thẻ trước khi chọn Thuộc hoặc Chưa thuộc."}
      </p>
      <p className="flashcard-shortcuts">
        <kbd>Space</kbd> Lật thẻ · <kbd>←</kbd> Chưa thuộc · <kbd>→</kbd> Thuộc
      </p>
    </>
  );
}
