"use client";
import { useState } from "react";
import type { ReadingPassage } from "@/lib/types";
import Furigana from "./Furigana";
export default function ReadingCard({
  passage,
  compact = false,
}: {
  passage: ReadingPassage;
  compact?: boolean;
}) {
  const [translated, setTranslated] = useState(false);
  return (
    <section className={`reading-passage ${compact ? "compact" : ""}`}>
      <div className="section-label">
        <span>Đoạn đọc · {passage.title}</span>
        {passage.translation && (
          <button
            className="text-button"
            onClick={() => setTranslated(!translated)}
            aria-pressed={translated}
          >
            {translated ? "Ẩn bản dịch" : "Xem bản dịch"}
          </button>
        )}
      </div>
      <div className="reading-body" lang="ja">
        {passage.paragraphs.map((text, i) => (
          <p className="jp" key={i}>
            <Furigana text={text} />
          </p>
        ))}
      </div>
      {translated && (
        <div className="reading-translation">
          {passage.translation?.map((text, i) => (
            <p key={i}>{text}</p>
          ))}
        </div>
      )}
    </section>
  );
}
