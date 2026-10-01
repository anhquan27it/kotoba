"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Question } from "@/lib/types";
import { checkAnswer } from "@/lib/practice";
import { recordAnswer, recordQuiz } from "@/lib/storage";
import { findContent, lessons, lessonHref, contentHref } from "@/lib/catalog";
import Icon from "./Icon";
import Furigana from "./Furigana";
import ReadingCard from "./ReadingCard";

const categoryLabel: Record<string, string> = {
  vocabulary: "Từ vựng",
  grammar: "Ngữ pháp",
  kanji: "Kanji",
  reading: "Đọc hiểu",
};
interface Result {
  question: Question;
  selected: string;
  correct: boolean;
}
export default function Quiz({
  questions,
  lessonId,
  onRestart,
  onRetryWrong,
}: {
  questions: Question[];
  lessonId: string;
  onRestart: () => void;
  onRetryWrong: (ids: string[]) => void;
}) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState("");
  const [checked, setChecked] = useState(false);
  const [results, setResults] = useState<Result[]>([]);
  const [finished, setFinished] = useState(false);
  const submitted = useRef(false);
  const advancing = useRef(false);
  useEffect(() => {
    advancing.current = false;
  }, [index]);
  const q = questions[index];
  const total = questions.length;
  const score = results.filter((result) => result.correct).length;
  function submit() {
    if (submitted.current || !selected.trim() || !q) return;
    submitted.current = true;
    const correct = checkAnswer(q, selected);
    setResults((current) => [...current, { question: q, selected, correct }]);
    recordAnswer(q.id, correct);
    setChecked(true);
  }
  function next() {
    if (advancing.current || !checked) return;
    advancing.current = true;
    if (index + 1 >= total) {
      recordQuiz(lessonId, score, total);
      setFinished(true);
      return;
    }
    setIndex((current) => current + 1);
    setSelected("");
    setChecked(false);
    submitted.current = false;
  }
  if (!total)
    return (
      <div className="empty-state">
        <h2>Chưa có câu hỏi phù hợp</h2>
        <button className="btn btn-secondary" onClick={onRestart}>
          Chọn lại
        </button>
      </div>
    );
  if (finished) {
    const wrong = results.filter((result) => !result.correct);
    return (
      <div className="panel">
        <div className="result-header">
          <div className="result-symbol">
            <Icon name={wrong.length ? "leaf" : "check"} size={32} />
          </div>
          <span className="eyebrow">HOÀN THÀNH PHIÊN LUYỆN TẬP</span>
          <div className="result-score">
            {score}
            <span className="muted" style={{ fontSize: 24 }}>
              {" "}
              / {total}
            </span>
          </div>
          <h2>
            {wrong.length
              ? "Mỗi câu sai là một chỗ để hiểu thêm."
              : "Bạn đã hoàn thành rất tốt phiên này."}
          </h2>
          <p>
            Kết quả phản ánh những câu vừa làm. Tiếp tục thử ví dụ mới và ôn lại
            sau một khoảng thời gian để kiểm tra khả năng nhớ.
          </p>
        </div>
        {!!wrong.length && (
          <>
            <div className="section-label">Những câu cần xem lại</div>
            <div className="result-list">
              {wrong.map((result) => (
                <div className="result-item" key={result.question.id}>
                  <span className="pill gold">
                    {categoryLabel[result.question.category]}
                  </span>
                  <p className="jp" lang="ja">
                    <Furigana text={result.question.prompt} />
                  </p>
                  <p className="small muted">
                    Bạn trả lời: <Furigana text={result.selected} />
                  </p>
                  <p>
                    Đáp án:{" "}
                    <strong>
                      <Furigana
                        text={result.question.answer.split("|").join(" / ")}
                      />
                    </strong>
                  </p>
                  <p className="small muted">
                    <Furigana text={result.question.explanation} />
                  </p>
                  {result.question.passageId && (
                    <details>
                      <summary className="text-button">
                        Xem lại đoạn đọc
                      </summary>
                      <ReadingCard
                        compact
                        passage={lessons
                          .flatMap((lesson) => lesson.passages)
                          .find((p) => p.id === result.question.passageId)!}
                      />
                    </details>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
        <div
          className="button-row"
          style={{ justifyContent: "center", marginTop: 22 }}
        >
          {!!wrong.length && (
            <button
              className="btn btn-primary"
              onClick={() =>
                onRetryWrong(wrong.map((result) => result.question.id))
              }
            >
              Thử lại {wrong.length} câu sai
              <Icon name="reset" size={17} />
            </button>
          )}
          <button className="btn btn-secondary" onClick={onRestart}>
            Phiên luyện tập mới
          </button>
          <Link
            className="btn btn-ghost"
            href={lessonId === "all" ? "/lessons" : lessonHref(lessonId)}
          >
            Về bài học
          </Link>
        </div>
      </div>
    );
  }
  const correct = checked && checkAnswer(q, selected);
  const passage = q.passageId
    ? lessons
        .flatMap((lesson) => lesson.passages)
        .find((p) => p.id === q.passageId)
    : undefined;
  const target = q.targetIds?.map((id) => findContent(id)).find(Boolean);
  return (
    <>
      <div className="session-header">
        <span>
          Câu {index + 1}/{total}
        </span>
        <span>{score} câu đúng</span>
      </div>
      <div className="progress-track session-progress">
        <span
          style={{ width: `${((index + (checked ? 1 : 0)) / total) * 100}%` }}
        />
      </div>
      {passage && <ReadingCard compact passage={passage} />}
      <section className="panel quiz-panel" aria-label={`Câu hỏi ${index + 1}`}>
        <span className="pill">
          {categoryLabel[q.category]} · Phần {q.chapter}
        </span>
        <h2 className="quiz-question jp" lang="ja">
          <Furigana text={q.prompt} />
        </h2>
        {q.kind === "mcq" ? (
          <div className="quiz-options">
            {q.options?.map((option, i) => (
              <button
                key={option}
                className={`quiz-option ${selected === option ? "selected" : ""} ${checked && checkAnswer(q, option) ? "correct" : ""} ${checked && selected === option && !correct ? "incorrect" : ""}`}
                onClick={() => setSelected(option)}
                disabled={checked}
                aria-pressed={selected === option}
              >
                <span className="option-letter">
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="jp">
                  <Furigana text={option} />
                </span>
                {checked && checkAnswer(q, option) && (
                  <Icon name="check" size={18} style={{ marginLeft: "auto" }} />
                )}
              </button>
            ))}
          </div>
        ) : (
          <form
            className="fill-form"
            onSubmit={(event) => {
              event.preventDefault();
              submit();
            }}
          >
            <label className="sr-only" htmlFor="fill-answer">
              Câu trả lời
            </label>
            <input
              id="fill-answer"
              className="input"
              placeholder="Nhập câu trả lời…"
              value={selected}
              disabled={checked}
              autoComplete="off"
              onChange={(e) => setSelected(e.target.value)}
              onKeyDown={(e) => {
                if (
                  e.key === "Enter" &&
                  (e.nativeEvent.isComposing || e.keyCode === 229)
                )
                  e.preventDefault();
              }}
            />
            <button
              className="btn btn-primary"
              disabled={checked || !selected.trim()}
            >
              Kiểm tra
            </button>
          </form>
        )}
        {q.kind === "mcq" && !checked && (
          <div
            className="button-row"
            style={{ justifyContent: "flex-end", marginTop: 22 }}
          >
            <button
              className="btn btn-primary"
              disabled={!selected}
              onClick={submit}
            >
              Kiểm tra đáp án
              <Icon name="check" size={16} />
            </button>
          </div>
        )}
        {checked && (
          <div
            className={`answer-feedback ${correct ? "" : "error"}`}
            role="status"
          >
            <h3>
              <Icon name={correct ? "check" : "leaf"} size={18} />
              {correct ? "Chính xác!" : "Mình cùng xem lại nhé."}
            </h3>
            {!correct && (
              <p>
                Đáp án:{" "}
                <strong className="jp">
                  <Furigana text={q.answer.split("|").join(" / ")} />
                </strong>
              </p>
            )}
            <p>
              <Furigana text={q.explanation} />
            </p>
            {!correct && q.optionExplanations?.[selected] && (
              <p style={{ marginTop: 8 }}>
                <strong>Vì sao lựa chọn này chưa phù hợp? </strong>
                <Furigana text={q.optionExplanations[selected]} />
              </p>
            )}
            <div className="button-row">
              <button className="btn btn-primary btn-small" onClick={next}>
                {index + 1 === total ? "Xem kết quả" : "Câu tiếp theo"}
                <Icon name="arrow" size={16} />
              </button>
              {target && (
                <Link
                  className="btn btn-ghost btn-small"
                  href={contentHref(target.type, target.item.id)}
                >
                  Xem lại kiến thức
                </Link>
              )}
            </div>
          </div>
        )}
      </section>
    </>
  );
}
