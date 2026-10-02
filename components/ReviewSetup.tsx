"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { labels, lessons, lessonHref } from "@/lib/catalog";
import { useStudy } from "@/lib/use-study";
import { rateCard } from "@/lib/storage";
import type { DeckType } from "@/lib/types";
import {
  advanceReviewSession,
  createReviewSession,
  selectReviewCards,
  type ReviewDirection,
  type ReviewMode,
  type ReviewRating,
} from "@/lib/review";
import Flashcard from "./Flashcard";
import Icon from "./Icon";
import Furigana from "./Furigana";
import type { StudyItem } from "./ContentCard";

interface Card {
  id: string;
  item: StudyItem;
  lessonId: string;
}
function japanese(item: StudyItem) {
  return "word" in item ? item.word : "char" in item ? item.char : item.pattern;
}
function CardFront({
  item,
  direction,
}: {
  item: StudyItem;
  direction: ReviewDirection;
}) {
  return (
    <div>
      <h2
        className={`flashcard-front ${direction === "vi-ja" ? "flashcard-meaning" : `jp ${"char" in item ? "flashcard-kanji" : "pattern" in item ? "flashcard-grammar" : ""}`}`}
        lang={direction === "ja-vi" ? "ja" : "vi"}
      >
        {direction === "ja-vi" ? (
          <Furigana
            text={japanese(item)}
            reading={"word" in item ? item.reading : undefined}
          />
        ) : (
          item.meaning
        )}
      </h2>
      <p className="flashcard-prompt">
        {direction === "vi-ja"
          ? "Nhớ cách viết và cách đọc tiếng Nhật"
          : "char" in item
            ? "Nhớ nghĩa, âm Hán Việt và cách đọc"
            : "Nhớ cách đọc và ý nghĩa"}
      </p>
    </div>
  );
}
function CardBack({
  item,
  direction,
}: {
  item: StudyItem;
  direction: ReviewDirection;
}) {
  const examples = item.examples.slice(0, "char" in item ? 3 : 1);
  return (
    <div className="flashcard-back">
      <h2
        className={
          direction === "vi-ja"
            ? "jp flashcard-answer-jp"
            : "flashcard-answer-meaning"
        }
        lang={direction === "vi-ja" ? "ja" : "vi"}
      >
        {direction === "vi-ja" ? (
          <Furigana
            text={japanese(item)}
            reading={"word" in item ? item.reading : undefined}
          />
        ) : (
          item.meaning
        )}
      </h2>
      {direction === "ja-vi" && (
        <p className="flashcard-answer-word jp" lang="ja">
          <Furigana
            text={japanese(item)}
            reading={"word" in item ? item.reading : undefined}
          />
        </p>
      )}
      {"reading" in item && (
        <p className="reading jp" lang="ja">
          {item.reading}
        </p>
      )}
      {direction === "vi-ja" && (
        <p className="flashcard-answer-translation">{item.meaning}</p>
      )}
      {"hanViet" in item && (
        <p className="flashcard-hanviet">
          Hán Việt · <strong>{item.hanViet}</strong>
        </p>
      )}
      {"char" in item && (
        <dl className="flashcard-readings">
          <div>
            <dt>Âm Kun</dt>
            <dd lang="ja">{item.kunyomi.join("、") || "—"}</dd>
          </div>
          <div>
            <dt>Âm On</dt>
            <dd lang="ja">{item.onyomi.join("、") || "—"}</dd>
          </div>
        </dl>
      )}
      {"pattern" in item && (
        <p className="flashcard-explanation">
          <Furigana text={item.explanation} />
        </p>
      )}
      {!!examples.length && (
        <div
          className={`flashcard-examples ${"char" in item ? "is-kanji" : ""}`}
        >
          {examples.map((example, index) => (
            <div className="example" key={index}>
              <p className="jp" lang="ja">
                <Furigana text={example.jp} reading={example.reading} />
              </p>
              {example.reading && "char" in item && (
                <p className="flashcard-compound-reading jp" lang="ja">
                  {example.reading}
                </p>
              )}
              <p className="translation">{example.vi}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ReviewSetup({
  initialLesson,
  initialDeck,
  initialCard,
}: {
  initialLesson?: string;
  initialDeck?: string;
  initialCard?: string;
}) {
  const [lessonId, setLessonId] = useState(
    lessons.some((lesson) => lesson.id === initialLesson)
      ? initialLesson!
      : "all",
  );
  const [deck, setDeck] = useState<DeckType>(
    ["vocabulary", "kanji", "grammar"].includes(initialDeck ?? "")
      ? (initialDeck as DeckType)
      : "vocabulary",
  );
  const [mode, setMode] = useState<ReviewMode>("scheduled");
  const [direction, setDirection] = useState<ReviewDirection>("ja-vi");
  const [randomize, setRandomize] = useState(true);
  const [newLimit, setNewLimit] = useState(10);
  const [session, setSession] = useState(() => createReviewSession<Card>([]));
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const advancing = useRef(false);
  useEffect(() => {
    advancing.current = false;
    if (started) window.scrollTo({ top: 0, behavior: "instant" });
  }, [session.answers, started]);
  const { state, ready, now } = useStudy();
  const selectedLessons = lessons.filter(
    (lesson) => lessonId === "all" || lesson.id === lessonId,
  );
  const cards = selectedLessons.flatMap((lesson) =>
    lesson[deck].map((item) => ({ id: item.id, item, lessonId: lesson.id })),
  );
  const due = cards.filter(
    (card) => state.progress[card.id]?.due <= now,
  ).length;
  const fresh = cards.filter((card) => !state.progress[card.id]).length;
  const unknown = cards.filter((card) => !state.progress[card.id]?.reps).length;
  const specific = cards.find((card) => card.id === initialCard);
  const selectedCount =
    mode === "all"
      ? cards.length
      : mode === "unknown"
        ? unknown
        : due + Math.min(newLimit, fresh);
  function start(single = false) {
    const selected =
      single && specific
        ? [specific]
        : selectReviewCards(
            cards,
            state.progress,
            [...state.enrolled, ...state.learned],
            mode,
            newLimit,
            Date.now(),
            randomize,
          );
    if (!ready || !selected.length) return;
    setSession(createReviewSession(selected));
    setStarted(true);
    setFinished(false);
  }
  function handleRate(rating: ReviewRating) {
    if (advancing.current || !session.queue.length) return;
    advancing.current = true;
    rateCard(session.queue[0].id, rating);
    const next = advanceReviewSession(session, rating);
    setSession(next);
    if (!next.queue.length) {
      setStarted(false);
      setFinished(true);
    }
  }
  if (finished)
    return (
      <div className="panel review-summary">
        <div className="result-header">
          <div className="result-symbol">
            <Icon name="check" size={32} />
          </div>
          <span className="eyebrow">ĐÃ XONG PHIÊN ÔN THẺ</span>
          <h2>
            Bạn đã thuộc {session.known}/{session.total} thẻ trong phiên này
          </h2>
          <p>
            {session.answers} lượt ôn · {session.againCount} lượt chọn “Chưa
            thuộc”.
          </p>
          <p className="review-summary-note">
            Lịch ôn đã được lưu sau từng thẻ. Tiếp tục ôn vào những ngày tới để
            nhớ lâu hơn.
          </p>
        </div>
        <div className="button-row">
          <button
            className="btn btn-primary"
            onClick={() => setFinished(false)}
          >
            Chọn bộ thẻ tiếp theo
          </button>
          <Link
            className="btn btn-secondary"
            href={lessonId === "all" ? "/lessons" : lessonHref(lessonId)}
          >
            Về bài học
          </Link>
        </div>
      </div>
    );
  if (started) {
    const card = session.queue[0];
    const lesson = lessons.find((entry) => entry.id === card.lessonId)!;
    const progress = Math.round((session.known / session.total) * 100);
    return (
      <section
        className="review-session"
        aria-label={`Ôn thẻ ${labels[deck].toLowerCase()}`}
      >
        <div className="review-session-heading">
          <div>
            <span className="eyebrow">ÔN TẬP THẺ</span>
            <h1>{labels[deck]}</h1>
          </div>
          <button
            className="btn btn-secondary btn-small"
            onClick={() => {
              setStarted(false);
              setFinished(false);
            }}
          >
            Đổi bộ thẻ
          </button>
        </div>
        <div className="session-header" aria-live="polite">
          <span>
            {lesson.level} · Bài {lesson.number} · Phần {card.item.chapter}
          </span>
          <strong>
            {session.known}/{session.total} thẻ thuộc
          </strong>
        </div>
        <div
          className="progress-track session-progress"
          role="progressbar"
          aria-label="Thẻ đã thuộc trong phiên"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <span style={{ width: `${progress}%` }} />
        </div>
        <Flashcard
          key={`${card.id}:${session.answers}`}
          front={<CardFront item={card.item} direction={direction} />}
          back={<CardBack item={card.item} direction={direction} />}
          frontLabel={direction === "ja-vi" ? "TIẾNG NHẬT" : "NGHĨA TIẾNG VIỆT"}
          onRate={handleRate}
        />
        <p className="review-remaining">
          {session.queue.length} thẻ còn lại · {session.answers} lượt đã ôn
        </p>
      </section>
    );
  }
  return (
    <>
      <div className="page-heading">
        <span className="eyebrow">LẬT THẺ. NHỚ TỪ. HỌC ĐỀU.</span>
        <h1>Ôn tập thẻ</h1>
        <p>
          Chọn bộ từ vựng hoặc kanji, thử nhớ rồi lật thẻ. Chỉ cần chọn “Thuộc”
          hoặc “Chưa thuộc”.
        </p>
      </div>
      <div className="setup-grid review-setup">
        <section className="panel">
          <label className="field">
            <span>Phạm vi bài học</span>
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
            <h2>Chọn bộ thẻ</h2>
            <div className="review-decks">
              {(["vocabulary", "kanji", "grammar"] as DeckType[]).map(
                (type) => (
                  <button
                    key={type}
                    className={`review-deck ${deck === type ? "active" : ""}`}
                    aria-pressed={deck === type}
                    onClick={() => setDeck(type)}
                  >
                    <Icon
                      name={
                        type === "grammar"
                          ? "spark"
                          : type === "kanji"
                            ? "cards"
                            : "book"
                      }
                      size={24}
                    />
                    <strong>{labels[type]}</strong>
                    <span>
                      {selectedLessons.reduce(
                        (count, lesson) => count + lesson[type].length,
                        0,
                      )}{" "}
                      thẻ
                    </span>
                  </button>
                ),
              )}
            </div>
          </div>
          <div className="setup-section">
            <h2>Bạn muốn ôn thẻ nào?</h2>
            <div className="chips">
              {(
                [
                  { key: "scheduled", label: "Đến hạn & thẻ mới" },
                  { key: "unknown", label: "Chưa thuộc" },
                  { key: "all", label: "Tất cả thẻ" },
                ] as const
              ).map((option) => (
                <button
                  key={option.key}
                  className={`chip ${mode === option.key ? "active" : ""}`}
                  aria-pressed={mode === option.key}
                  onClick={() => setMode(option.key)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
          {mode === "scheduled" && (
            <div className="setup-section">
              <h2>Số thẻ mới mỗi phiên</h2>
              <div className="chips">
                {[5, 10, 20].map((limit) => (
                  <button
                    key={limit}
                    className={`chip ${newLimit === limit ? "active" : ""}`}
                    aria-pressed={newLimit === limit}
                    onClick={() => setNewLimit(limit)}
                  >
                    {limit} thẻ
                  </button>
                ))}
              </div>
            </div>
          )}
          <div className="setup-section">
            <h2>Mặt trước của thẻ</h2>
            <div className="chips">
              {(
                [
                  { key: "ja-vi", label: "Tiếng Nhật → Nghĩa" },
                  { key: "vi-ja", label: "Nghĩa → Tiếng Nhật" },
                ] as const
              ).map((option) => (
                <button
                  key={option.key}
                  className={`chip ${direction === option.key ? "active" : ""}`}
                  aria-pressed={direction === option.key}
                  onClick={() => setDirection(option.key)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
          <label className="review-shuffle">
            <input
              type="checkbox"
              checked={randomize}
              onChange={(e) => setRandomize(e.target.checked)}
            />
            Xáo trộn thẻ trong phiên
          </label>
          <div className="setup-count" role="status">
            {ready
              ? `${cards.length} thẻ trong bộ · ${due} đến hạn · ${fresh} thẻ mới`
              : "Đang tải tiến độ…"}
          </div>
          <div className="button-row">
            <button
              className="btn btn-primary"
              disabled={!ready || !selectedCount}
              onClick={() => start()}
            >
              Bắt đầu ôn {ready ? `(${selectedCount} thẻ)` : ""}
              <Icon name="arrow" size={18} />
            </button>
            {specific && (
              <button
                className="btn btn-secondary"
                disabled={!ready}
                onClick={() => start(true)}
              >
                Ôn thẻ vừa chọn
              </button>
            )}
          </div>
          {ready && !selectedCount && (
            <p className="review-empty">
              {cards.length
                ? "Bạn đã ôn xong nhóm này. Chọn “Tất cả thẻ” để ôn thêm bất cứ lúc nào."
                : "Bài học này chưa có thẻ trong bộ đã chọn."}
            </p>
          )}
        </section>
        <aside className="setup-description review-guide">
          <Icon name="cards" size={32} />
          <h2>Mỗi thẻ, một điều nhớ thêm.</h2>
          <p>
            Thẻ lớn, chữ rõ. Tập trung vào cách đọc và ý nghĩa trước khi xem đáp
            án.
          </p>
          <ol>
            <li>
              <strong>Nhìn mặt trước.</strong> Tự nhớ từ hoặc kanji. Dùng nút
              Ẩn/Hiện cách đọc ở đầu trang để bật hoặc tắt hiragana trên thẻ.
            </li>
            <li>
              <strong>Chạm để lật.</strong> Xem cách đọc, nghĩa và ví dụ. Thẻ
              kanji có âm Kun, âm On và từ ghép.
            </li>
            <li>
              <strong>Chọn Thuộc / Chưa thuộc.</strong> Thẻ chưa thuộc sẽ quay
              lại sau vài thẻ khác.
            </li>
          </ol>
          <p>
            Nhóm “Chưa thuộc” gồm thẻ mới và thẻ bạn chưa nhớ ở lần ôn gần nhất.
            Tiến độ được lưu sau mỗi lượt; bạn có thể đổi bộ thẻ bất cứ lúc nào.
          </p>
        </aside>
      </div>
    </>
  );
}
