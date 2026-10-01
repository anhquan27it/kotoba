"use client";
import { useState } from "react";
import type { Example } from "@/lib/types";
import Furigana from "./Furigana";

export default function Examples({ examples }: { examples: Example[] }) {
  const [showTranslation, setShowTranslation] = useState(true);
  return (
    <div className="examples">
      <div className="section-label">
        <span>Ví dụ trong ngữ cảnh</span>
        <button
          className="text-button"
          aria-pressed={showTranslation}
          onClick={() => setShowTranslation(!showTranslation)}
        >
          {showTranslation ? "Ẩn bản dịch" : "Hiện bản dịch"}
        </button>
      </div>
      {examples.map((example, i) => (
        <div className="example" key={i}>
          <p className="jp" lang="ja">
            <Furigana text={example.jp} reading={example.reading} />
          </p>
          {showTranslation && (
            <p className="translation">
              <Furigana text={example.vi} />
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
