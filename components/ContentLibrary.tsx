"use client";
import { useState } from "react";
import { labels, lessons } from "@/lib/catalog";
import type { DeckType } from "@/lib/types";
import { normalizeAnswer } from "@/lib/practice";
import ContentCard from "./ContentCard";
import Icon from "./Icon";
export default function ContentLibrary({ type }: { type: DeckType }) {
  const [lessonId, setLessonId] = useState("all");
  const [search, setSearch] = useState("");
  const entries = lessons
    .filter((lesson) => lessonId === "all" || lesson.id === lessonId)
    .flatMap((lesson) => lesson[type].map((item) => ({ item, lesson })))
    .filter(({ item }) =>
      normalizeAnswer(
        Object.values(item)
          .filter((value) => typeof value === "string")
          .join(" "),
      ).includes(normalizeAnswer(search)),
    );
  return (
    <>
      <div className="page-heading">
        <span className="eyebrow">SỔ TAY CỦA BẠN</span>
        <h1>{labels[type]}</h1>
        <p>
          Tra cứu kiến thức từ các bài học, xem ví dụ và thêm vào phiên ôn tập.
        </p>
      </div>
      <div className="filter-row">
        <label className="search-box">
          <span className="sr-only">Tìm {labels[type]}</span>
          <Icon name="search" size={18} />
          <input
            className="input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm bằng tiếng Nhật, cách đọc hoặc nghĩa…"
          />
        </label>
        <label className="field">
          <span>Bài học</span>
          <select
            className="input"
            value={lessonId}
            onChange={(e) => setLessonId(e.target.value)}
          >
            <option value="all">Tất cả bài học</option>
            {lessons.map((lesson) => (
              <option key={lesson.id} value={lesson.id}>
                {lesson.level} · Bài {lesson.number}
              </option>
            ))}
          </select>
        </label>
      </div>
      <p className="small muted" style={{ marginBottom: 15 }}>
        {entries.length} mục · Nhấn vào để mở nội dung
      </p>
      <div className={`content-grid ${type === "grammar" ? "single" : ""}`}>
        {entries.map(({ item, lesson }) => (
          <ContentCard key={item.id} item={item} lesson={lesson} type={type} />
        ))}
      </div>
      {!entries.length && (
        <div className="empty-state">
          <h2>Chưa tìm thấy nội dung</h2>
          <p>Thử một từ khóa khác hoặc chọn tất cả bài học.</p>
        </div>
      )}
    </>
  );
}
