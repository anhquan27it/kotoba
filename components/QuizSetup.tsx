"use client";
import { useState } from "react";
import { lessons, questions } from "@/lib/catalog";
import type { Question, QuestionCategory } from "@/lib/types";
import { prepareQuestions } from "@/lib/practice";
import { useStudy } from "@/lib/use-study";
import Quiz from "./Quiz";
import Icon from "./Icon";
const categories: { key: QuestionCategory | "all"; label: string }[] = [
  { key: "all", label: "Tổng hợp" },
  { key: "vocabulary", label: "Từ vựng" },
  { key: "kanji", label: "Kanji" },
  { key: "grammar", label: "Ngữ pháp" },
  { key: "reading", label: "Đọc hiểu" },
];
export default function QuizSetup({
  initialLesson,
  initialCategory,
  initialWrong,
}: {
  initialLesson?: string;
  initialCategory?: string;
  initialWrong?: boolean;
}) {
  const [lessonId, setLessonId] = useState(
    lessons.some((lesson) => lesson.id === initialLesson)
      ? initialLesson!
      : "all",
  );
  const [category, setCategory] = useState(
    categories.some((item) => item.key === initialCategory)
      ? initialCategory!
      : "all",
  );
  const [wrongOnly, setWrongOnly] = useState(!!initialWrong);
  const [limit, setLimit] = useState(10);
  const [session, setSession] = useState<Question[] | null>(null);
  const [sessionKey, setSessionKey] = useState(0);
  const { state, ready } = useStudy();
  const pool = (
    lessonId === "all"
      ? questions
      : lessons.find((lesson) => lesson.id === lessonId)!.questions
  ).filter(
    (q) =>
      (category === "all" || q.category === category) &&
      (!wrongOnly || state.wrong.includes(q.id)),
  );
  const start = (items = pool) => {
    setSession(prepareQuestions(items, limit));
    setSessionKey((key) => key + 1);
  };
  if (session)
    return (
      <div className="practice-container">
        <div className="session-header">
          <button className="text-button" onClick={() => setSession(null)}>
            ← Chọn lại phiên luyện tập
          </button>
          <span>
            {lessonId === "all"
              ? "Tất cả bài học"
              : `${lessons.find((lesson) => lesson.id === lessonId)?.level} · Bài ${lessons.find((lesson) => lesson.id === lessonId)?.number}`}
          </span>
        </div>
        <Quiz
          key={sessionKey}
          questions={session}
          lessonId={lessonId}
          onRestart={() => setSession(null)}
          onRetryWrong={(ids) =>
            start(questions.filter((q) => ids.includes(q.id)))
          }
        />
      </div>
    );
  return (
    <>
      <div className="page-heading">
        <span className="eyebrow">HIỂU QUA TỪNG CÂU HỎI</span>
        <h1>Luyện tập theo cách của bạn</h1>
        <p>
          Chọn bài học và chủ đề. Mỗi câu đều có đáp án và giải thích để bạn
          hiểu sâu hơn.
        </p>
      </div>
      <div className="setup-grid">
        <section className="panel">
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
                  {lesson.level} · Bài {lesson.number} · {lesson.title}
                </option>
              ))}
            </select>
          </label>
          <div className="setup-section">
            <h2>Bạn muốn luyện phần nào?</h2>
            <div className="chips">
              {categories.map((item) => (
                <button
                  className={`chip ${category === item.key ? "active" : ""}`}
                  key={item.key}
                  aria-pressed={category === item.key}
                  onClick={() => setCategory(item.key)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          <div className="setup-section">
            <h2>Chế độ luyện tập</h2>
            <div className="chips">
              <button
                className={`chip ${!wrongOnly ? "active" : ""}`}
                onClick={() => setWrongOnly(false)}
                aria-pressed={!wrongOnly}
              >
                Tất cả câu hỏi
              </button>
              <button
                className={`chip ${wrongOnly ? "active" : ""}`}
                onClick={() => setWrongOnly(true)}
                aria-pressed={wrongOnly}
              >
                Chỉ luyện câu sai
              </button>
            </div>
          </div>
          <div className="setup-section">
            <h2>Số câu trong phiên</h2>
            <div className="chips">
              {[5, 10, 20].map((n) => (
                <button
                  key={n}
                  className={`chip ${limit === n ? "active" : ""}`}
                  onClick={() => setLimit(n)}
                  aria-pressed={limit === n}
                >
                  {n} câu
                </button>
              ))}
            </div>
          </div>
          <div className="setup-count">
            {ready
              ? `${pool.length} câu phù hợp · Phiên này gồm ${Math.min(limit, pool.length)} câu`
              : "Đang tải tiến độ…"}
          </div>
          <button
            className="btn btn-primary"
            disabled={!ready || !pool.length}
            onClick={() => start()}
          >
            Bắt đầu luyện tập
            <Icon name="arrow" size={17} />
          </button>
          {ready && !pool.length && (
            <p className="muted small" style={{ marginTop: 15 }}>
              {wrongOnly
                ? "Bạn chưa có câu sai trong phạm vi đã chọn. Hãy thử chế độ tất cả câu hỏi."
                : "Chưa có câu hỏi trong phần này. Hãy chọn một phần khác."}
            </p>
          )}
        </section>
        <aside className="setup-description">
          <Icon name="quiz" size={30} />
          <h2>
            Làm chậm một chút.
            <br />
            Hiểu rõ hơn một chút.
          </h2>
          <p>
            Chọn đáp án rồi nhấn kiểm tra. Khi chưa đúng, đọc giải thích và thử
            liên hệ lại với ví dụ trong bài.
          </p>
          <ul>
            <li>
              Dùng nút Ẩn cách đọc ở đầu trang khi muốn tự kiểm tra cách đọc
              kanji.
            </li>
            <li>Đáp án được xáo trộn mỗi phiên.</li>
            <li>Đoạn đọc luôn hiển thị cùng câu hỏi.</li>
            <li>Câu sai được lưu để bạn luyện lại.</li>
          </ul>
        </aside>
      </div>
    </>
  );
}
