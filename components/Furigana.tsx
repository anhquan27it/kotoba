"use client";
import { createContext, useContext, useEffect, useState } from "react";
import readings from "@/data/readings.json";
import { splitReading, type ReadingSegment } from "@/lib/furigana";

const ReadingContext = createContext({ visible: true, toggle: () => {} });
const preferenceKey = "kotoba:furigana";
export function FuriganaProvider({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    try {
      setVisible(localStorage.getItem(preferenceKey) !== "hidden");
    } catch {
      /* Display works without storage. */
    }
    const sync = (event: StorageEvent) => {
      if (event.key === preferenceKey) setVisible(event.newValue !== "hidden");
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);
  function toggle() {
    try {
      localStorage.setItem(preferenceKey, visible ? "hidden" : "visible");
    } catch {
      /* Preference is optional. */
    }
    setVisible(!visible);
  }
  return (
    <ReadingContext.Provider value={{ visible, toggle }}>
      {children}
    </ReadingContext.Provider>
  );
}

export function FuriganaToggle() {
  const { visible, toggle } = useContext(ReadingContext);
  return (
    <button
      className="furigana-toggle"
      aria-pressed={visible}
      onClick={toggle}
      title="Bật hoặc tắt hiragana trên kanji trong toàn bộ web"
    >
      <span lang="ja">あ</span>
      {visible ? "Ẩn cách đọc" : "Hiện cách đọc"}
    </button>
  );
}

export default function Furigana({
  text,
  reading,
}: {
  text: string;
  reading?: string;
}) {
  const { visible } = useContext(ReadingContext);
  if (!visible) return <>{text}</>;
  const parts: ReadingSegment[] = reading
    ? splitReading(text, reading)
    : ((readings as Record<string, ReadingSegment[]>)[text] ?? [{ text }]);
  return (
    <span className="ruby-text">
      {parts.map((part, index) =>
        part.reading ? (
          <ruby lang="ja" key={index}>
            {part.text}
            <rt>{part.reading}</rt>
          </ruby>
        ) : (
          <span key={index}>{part.text}</span>
        ),
      )}
    </span>
  );
}
