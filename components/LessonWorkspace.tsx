"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { DeckType, Lesson, LessonTab } from "@/lib/types";
import { labels, lessonHref } from "@/lib/catalog";
import { normalizeAnswer } from "@/lib/practice";
import { rememberLesson } from "@/lib/storage";
import { useStudy } from "@/lib/use-study";
import Icon from "./Icon";
import Furigana from "./Furigana";
import ContentCard from "./ContentCard";
import ReadingCard from "./ReadingCard";

export default function LessonWorkspace({
  lesson,
  tab,
}: {
  lesson: Lesson;
  tab: LessonTab;
}) {
  const [search, setSearch] = useState("");
  const [chapter, setChapter] = useState("all");
  const { state } = useStudy();
  useEffect(() => {
    rememberLesson(lesson.id);
  }, [lesson.id]);
  useEffect(() => {
    setSearch("");
    setChapter("all");
  }, [lesson.id, tab]);
  const ids = [...lesson.vocabulary, ...lesson.kanji, ...lesson.grammar].map(
    (item) => item.id,
  );
  const done = ids.filter((id) => state.learned.includes(id)).length;
  const progress = ids.length ? Math.round((done / ids.length) * 100) : 0;
  const tabs: LessonTab[] = [
    "overview",
    "vocabulary",
    "kanji",
    "grammar",
    "reading",
  ];
  const count = (key: LessonTab) =>
    key === "overview"
      ? null
      : key === "reading"
        ? lesson.passages.length
        : lesson[key].length;
  const items =
    tab === "vocabulary" || tab === "kanji" || tab === "grammar"
      ? lesson[tab]
      : [];
  const chapters = Array.from(new Set(items.map((item) => item.chapter)));
  const shown = items.filter(
    (item) =>
      (chapter === "all" ||
        item.chapter === chapter ||
        !chapters.includes(chapter)) &&
      normalizeAnswer(
        Object.values(item)
          .filter((value) => typeof value === "string")
          .join(" "),
      ).includes(normalizeAnswer(search)),
  );
  return (
    <>
      <div className="breadcrumb">
        <Link href="/lessons">Bài học</Link>
        <Icon name="chevron" size={12} />
        <span>{lesson.level}</span>
        <Icon name="chevron" size={12} />
        <span>Bài {lesson.number}</span>
      </div>
      <div className="lesson-header">
        <div>
          <span className="pill">
            {lesson.level} · {lesson.course}
          </span>
          <h1>{lesson.title}</h1>
          <p>{lesson.description}</p>
          <div className="lesson-metadata">
            <span>Bài {lesson.number}</span>
            <span>
              {done}/{ids.length} mục đã học
            </span>
            <span>{progress}% hoàn thành nội dung</span>
          </div>
        </div>
        <div className="lesson-number">{lesson.number}</div>
      </div>
      <nav className="lesson-tabs" aria-label="Các phần bài học">
        {tabs.map((key) => (
          <Link
            key={key}
            href={lessonHref(lesson.id, key)}
            scroll={false}
            className={`lesson-tab ${tab === key ? "active" : ""}`}
            aria-current={tab === key ? "page" : undefined}
          >
            {labels[key]}
            {count(key) !== null && <small>{count(key)}</small>}
          </Link>
        ))}
      </nav>
      {tab === "overview" ? (
        <>
          <div className="overview-grid">
            <section className="panel">
              <span className="eyebrow">SAU BÀI HỌC NÀY</span>
              <h2 style={{ fontSize: 23, marginTop: 10 }}>
                Bạn sẽ làm được gì?
              </h2>
              <ul className="goal-list">
                {lesson.goals.map((goal) => (
                  <li key={goal}>
                    <Icon name="check" size={18} />
                    <span>
                      <Furigana text={goal} />
                    </span>
                  </li>
                ))}
              </ul>
              <div className="divider" />
              <div className="section-label" style={{ marginTop: 0 }}>
                <span>Nội dung đã học</span>
                <span>{progress}%</span>
              </div>
              <div className="progress-track">
                <span style={{ width: `${progress}%` }} />
              </div>
              <p className="small muted" style={{ marginTop: 10 }}>
                Đọc, thử hiểu ví dụ rồi đánh dấu từng mục đã học.
              </p>
              <div className="button-row" style={{ marginTop: 22 }}>
                <Link
                  className="btn btn-primary"
                  href={lessonHref(lesson.id, "vocabulary")}
                >
                  Học từ vựng
                  <Icon name="arrow" size={16} />
                </Link>
                <Link
                  className="btn btn-secondary"
                  href={`/review?lesson=${lesson.id}&deck=vocabulary`}
                >
                  Ôn từ vựng bằng thẻ
                </Link>
              </div>
            </section>
            <section className="panel">
              <h2 className="section-title">Từng phần một</h2>
              <div className="overview-path">
                {(
                  ["vocabulary", "kanji", "grammar", "reading"] as LessonTab[]
                ).map((key, i) => (
                  <Link
                    className="path-link"
                    key={key}
                    href={lessonHref(lesson.id, key)}
                  >
                    <span className="step-number">{i + 1}</span>
                    <div>
                      <strong>{labels[key]}</strong>
                      <small>
                        {count(key)}{" "}
                        {key === "reading"
                          ? "đoạn đọc"
                          : key === "grammar"
                            ? "mẫu câu"
                            : key === "kanji"
                              ? "chữ"
                              : "từ"}
                      </small>
                    </div>
                    <Icon name="chevron" size={16} />
                  </Link>
                ))}
              </div>
              <Link
                className="btn btn-soft"
                style={{ width: "100%", marginTop: 18 }}
                href={`/review?lesson=${lesson.id}`}
              >
                <Icon name="cards" size={17} />
                Ôn tập bài {lesson.number}
              </Link>
            </section>
          </div>
          <p className="source-note">
            <strong>{lesson.source.title}</strong>
            <br />
            {lesson.source.note}
          </p>
        </>
      ) : tab === "reading" ? (
        <>
          <p className="muted small" style={{ marginBottom: 20 }}>
            Đọc và thử hiểu từng đoạn trước khi xem bản dịch.
          </p>
          {lesson.passages.map((passage) => (
            <ReadingCard passage={passage} key={passage.id} />
          ))}
          {!lesson.passages.length && (
            <div className="empty-state">
              <h2>Chưa có đoạn đọc trong bài này</h2>
            </div>
          )}
        </>
      ) : (
        <>
          <div className="filter-row">
            <label className="search-box">
              <span className="sr-only">Tìm trong {labels[tab]}</span>
              <Icon name="search" size={18} />
              <input
                className="input"
                placeholder={`Tìm trong ${labels[tab].toLowerCase()}…`}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </label>
            {chapters.length > 1 && (
              <label className="field">
                <span>Phần học</span>
                <select
                  className="input"
                  value={chapters.includes(chapter) ? chapter : "all"}
                  onChange={(e) => setChapter(e.target.value)}
                >
                  <option value="all">Tất cả các phần</option>
                  {chapters.map((part) => (
                    <option key={part} value={part}>
                      Phần {part}
                    </option>
                  ))}
                </select>
              </label>
            )}
          </div>
          <div className={`content-grid ${tab === "grammar" ? "single" : ""}`}>
            {shown.map((item) => (
              <ContentCard
                key={item.id}
                item={item}
                lesson={lesson}
                type={tab as DeckType}
              />
            ))}
          </div>
          {!shown.length && (
            <div className="empty-state">
              <h2>Chưa tìm thấy nội dung</h2>
              <p>Thử từ khóa hoặc phần học khác.</p>
            </div>
          )}
          {tab === "grammar" && !!lesson.referenceTables?.length && (
            <details className="reference-section">
              <summary>Tra cứu nhanh · Bảng kết hợp</summary>
              <div className="reference-tables">
                {lesson.referenceTables.map((table) => (
                  <div key={table.title}>
                    <h3>
                      <Furigana text={table.title} />
                    </h3>
                    <div className="data-table-wrap">
                      <table className="data-table">
                        <thead>
                          <tr>
                            <th>Thời</th>
                            <th>Dạng</th>
                            <th>Lịch sự</th>
                            <th>
                              <Furigana
                                text={table.resultLabel || "Thể thường"}
                              />
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {table.rows.map((row, i) => (
                            <tr key={i}>
                              <td>{row.tense}</td>
                              <td>{row.type}</td>
                              <td className="jp" lang="ja">
                                <Furigana text={row.polite} />
                              </td>
                              <td className="jp" lang="ja">
                                <Furigana text={row.plain} />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            </details>
          )}
          <div className="button-row" style={{ marginTop: 25 }}>
            <Link
              className="btn btn-primary"
              href={`/review?lesson=${lesson.id}&deck=${tab}`}
            >
              <Icon name="cards" size={17} />
              Ôn bằng thẻ
            </Link>
          </div>
        </>
      )}
    </>
  );
}
