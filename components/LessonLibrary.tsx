"use client";
import Link from "next/link";
import { useState } from "react";
import { lessons, levels, lessonHref } from "@/lib/catalog";
import { useStudy } from "@/lib/use-study";
import { normalizeAnswer } from "@/lib/practice";
import Icon from "./Icon";
import Furigana from "./Furigana";

export default function LessonLibrary() {
  const [level, setLevel] = useState<string>("all");
  const [search, setSearch] = useState("");
  const { state } = useStudy();
  const filtered = lessons.filter(
    (lesson) =>
      (level === "all" || lesson.level === level) &&
      normalizeAnswer(
        `${lesson.number} ${lesson.title} ${lesson.course} ${lesson.level}`,
      ).includes(normalizeAnswer(search)),
  );
  return (
    <>
      <div className="page-heading">
        <span className="eyebrow">HÀNH TRÌNH CỦA BẠN</span>
        <h1>Thư viện bài học</h1>
        <p>Chọn một bài, học từng phần và quay lại bất cứ khi nào bạn cần.</p>
      </div>
      <div className="library-toolbar">
        <div className="chips" aria-label="Lọc cấp độ">
          {["all", ...levels].map((item) => (
            <button
              className={`chip ${level === item ? "active" : ""}`}
              key={item}
              onClick={() => setLevel(item)}
              aria-pressed={level === item}
            >
              {item === "all" ? "Tất cả" : item}
            </button>
          ))}
        </div>
        <label className="search-box">
          <span className="sr-only">Tìm bài học</span>
          <Icon name="search" size={18} />
          <input
            className="input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm bài học…"
          />
        </label>
      </div>
      <div className="lesson-grid">
        {filtered.map((lesson) => {
          const ids = [
            ...lesson.vocabulary,
            ...lesson.kanji,
            ...lesson.grammar,
          ].map((item) => item.id);
          const done = ids.filter((id) => state.learned.includes(id)).length;
          const percent = ids.length
            ? Math.round((done / ids.length) * 100)
            : 0;
          return (
            <article className="lesson-card" key={lesson.id}>
              <div className="lesson-card-banner">
                <span className="eyebrow">
                  {lesson.course} · BÀI {lesson.number}
                </span>
                <span className="jp" lang="ja">
                  <Furigana text="学" />
                </span>
                <div style={{ marginTop: 28 }}>
                  <span className="pill">{lesson.level}</span>
                </div>
              </div>
              <div className="lesson-card-body">
                <h2>{lesson.title}</h2>
                <p>{lesson.description}</p>
                <div className="lesson-metadata">
                  <span>{lesson.vocabulary.length} từ vựng</span>
                  <span>{lesson.kanji.length} kanji</span>
                  <span>
                    {lesson.vocabulary.length +
                      lesson.kanji.length +
                      lesson.grammar.length}{" "}
                    thẻ ôn tập
                  </span>
                </div>
                <div className="progress-track">
                  <span style={{ width: `${percent}%` }} />
                </div>
                <p className="small muted">
                  {done}/{ids.length} mục đã học · {percent}%
                </p>
                <div className="lesson-card-bottom">
                  <span className="pill neutral">
                    {done ? "Đang học" : "Sẵn sàng để học"}
                  </span>
                  <Link
                    className="btn btn-primary btn-small"
                    href={lessonHref(lesson.id)}
                  >
                    Vào bài học
                    <Icon name="arrow" size={16} />
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
      {!filtered.length && (
        <div className="empty-state">
          <Icon name="book" size={32} />
          <h2>
            {search ? "Chưa tìm thấy bài học" : `Chưa có bài học ${level}`}
          </h2>
          <p>
            {search
              ? "Thử một từ khóa khác hoặc chọn tất cả cấp độ."
              : "Bài học sẽ xuất hiện tại đây khi có nội dung mới."}
          </p>
          <button
            className="btn btn-secondary"
            onClick={() => {
              setLevel("all");
              setSearch("");
            }}
          >
            Xem các bài đang có
          </button>
        </div>
      )}
    </>
  );
}
