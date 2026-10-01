"use client";
import { useEffect, useState } from "react";
import { schedule, type Rating, type SrsState } from "@/lib/srs";
import Icon from "./Icon";
const ratings: { key: Rating; label: string }[] = [
  { key: "again", label: "Chưa nhớ" },
  { key: "hard", label: "Khó" },
  { key: "good", label: "Nhớ" },
  { key: "easy", label: "Rất dễ" },
];
export default function Flashcard({
  front,
  back,
  srs,
  onRate,
}: {
  front: React.ReactNode;
  back: React.ReactNode;
  srs: SrsState;
  onRate: (rating: Rating) => void;
}) {
  const [flipped, setFlipped] = useState(false);
  useEffect(() => {
    const handle = (event: KeyboardEvent) => {
      if (
        event.target instanceof HTMLElement &&
        (event.target.closest("input,textarea,select,button,a") ||
          event.target.isContentEditable)
      )
        return;
      if (event.code === "Space") {
        event.preventDefault();
        setFlipped((current) => !current);
      }
      if (flipped && /^[1-4]$/.test(event.key) && !event.repeat) {
        event.preventDefault();
        onRate(ratings[Number(event.key) - 1].key);
      }
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [flipped, onRate]);
  return (
    <>
      <div className="flashcard">
        <span className="flashcard-label">
          {flipped ? "ĐÁP ÁN & NGỮ CẢNH" : "THỬ NHỚ TRƯỚC KHI XEM"}
        </span>
        <div className="flashcard-content" key={String(flipped)}>
          {flipped ? back : front}
        </div>
        <button
          className={`btn ${flipped ? "btn-ghost btn-small" : "btn-primary"}`}
          onClick={() => setFlipped((current) => !current)}
        >
          {flipped ? "Xem lại mặt trước" : "Xem đáp án"}
          <Icon name={flipped ? "reset" : "arrow"} size={16} />
        </button>
      </div>
      {flipped ? (
        <div className="ratings">
          {ratings.map((rating, i) => {
            const next = schedule(srs, rating.key);
            return (
              <button
                key={rating.key}
                className={`rating-button rating-${rating.key}`}
                onClick={() => onRate(rating.key)}
              >
                <strong>{rating.label}</strong>
                <span>
                  {rating.key === "again"
                    ? "Lặp lại trong phiên"
                    : `${next.interval} ngày nữa`}{" "}
                  · {i + 1}
                </span>
              </button>
            );
          })}
        </div>
      ) : (
        <p className="flashcard-help">
          Tự nhớ cách đọc và ý nghĩa, rồi mới mở đáp án.
        </p>
      )}
      <p className="flashcard-help">
        Phím Space để lật thẻ · 1–4 để đánh giá sau khi xem đáp án
      </p>
    </>
  );
}
