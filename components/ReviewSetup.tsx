"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { cardIds, labels, lessons, lessonHref } from "@/lib/catalog";
import { useStudy } from "@/lib/use-study";
import { getSrsState, rateCard } from "@/lib/storage";
import type { DeckType } from "@/lib/types";
import type { Rating } from "@/lib/srs";
import { requeueAgain, shuffle } from "@/lib/practice";
import Flashcard from "./Flashcard";
import Icon from "./Icon";
import Furigana from "./Furigana";
import type { StudyItem } from "./ContentCard";

interface Card {
  id: string;
  item: StudyItem;
  lessonId: string;
}
function CardFront({ item }: { item: StudyItem }) {
  return (
    <div>
      <h2
        className={`jp flashcard-front ${"pattern" in item ? "flashcard-grammar" : ""}`}
        lang="ja"
      >
        <Furigana
          text={
            "word" in item
              ? item.word
              : "char" in item
                ? item.char
                : item.pattern
          }
          reading={"word" in item ? item.reading : undefined}
        />
      </h2>
      <p className="muted small" style={{ marginTop: 12 }}>
        {"word" in item
          ? "Cách đọc & ý nghĩa"
          : "char" in item
            ? "Ý nghĩa & cách đọc qua từ ghép"
            : "Ý nghĩa & cách dùng trong ngữ cảnh"}
      </p>
    </div>
  );
}
function CardBack({ item }: { item: StudyItem }) {
  const first = item.examples[0];
  return (
    <div className="flashcard-back">
      <h2 className="jp" lang="ja">
        <Furigana
          text={
            "word" in item
              ? item.word
              : "char" in item
                ? item.char
                : item.pattern
          }
          reading={"word" in item ? item.reading : undefined}
        />
      </h2>
      {"reading" in item && (
        <p className="reading jp" lang="ja">
          {item.reading}
        </p>
      )}
      <p>
        {"hanViet" in item ? `${item.hanViet} · ` : ""}
        {item.meaning}
      </p>
      {"char" in item && (
        <p className="small muted jp">
          Kun: {item.kunyomi.join("、") || "—"} · On:{" "}
          {item.onyomi.join("、") || "—"}
        </p>
      )}
      {"pattern" in item && (
        <p className="small muted" style={{ fontSize: 15, lineHeight: 1.9 }}>
          <Furigana text={item.explanation} />
        </p>
      )}
      {first && (
        <div
          className="example"
          style={{
            background: "#f5f8ef",
            borderRadius: 12,
            padding: 16,
            marginTop: 20,
          }}
        >
          <p className="jp" lang="ja">
            <Furigana text={first.jp} reading={first.reading} />
          </p>
          <p className="translation">{first.vi}</p>
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
  const [newLimit, setNewLimit] = useState(10);
  const [queue, setQueue] = useState<Card[]>([]);
  const [index, setIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState(0);
  const [againCount, setAgainCount] = useState(0);
  const [passed, setPassed] = useState<string[]>([]);
  const advancing = useRef(false);
  useEffect(() => {
    advancing.current = false;
  }, [index, started]);
  const { state, ready, now } = useStudy();
  const cards = lessons
    .filter((lesson) => lessonId === "all" || lesson.id === lessonId)
    .flatMap((lesson) =>
      lesson[deck].map((item) => ({ id: item.id, item, lessonId: lesson.id })),
    );
  const due = cards
    .filter(
      (card) => state.progress[card.id] && state.progress[card.id].due <= now,
    )
    .sort((a, b) => state.progress[a.id].due - state.progress[b.id].due);
  const fresh = cards
    .filter((card) => !state.progress[card.id])
    .sort(
      (a, b) =>
        Number(state.enrolled.includes(b.id) || state.learned.includes(b.id)) -
        Number(state.enrolled.includes(a.id) || state.learned.includes(a.id)),
    );
  const specific = cards.find((card) => card.id === initialCard);
  function start(mode: "scheduled" | "all" | "card") {
    const selected =
      mode === "card" && specific
        ? [specific]
        : mode === "all"
          ? shuffle(cards)
          : [...due, ...fresh.slice(0, newLimit)];
    if (!selected.length) return;
    setQueue(selected);
    setIndex(0);
    setAnswers(0);
    setAgainCount(0);
    setPassed([]);
    setStarted(true);
    setFinished(false);
  }
  function handleRate(rating: Rating) {
    if (advancing.current) return;
    advancing.current = true;
    const card = queue[index];
    rateCard(card.id, rating);
    setAnswers((value) => value + 1);
    if (rating === "again") {
      setQueue((current) => requeueAgain(current, index));
      setAgainCount((value) => value + 1);
      setPassed((current) => current.filter((id) => id !== card.id));
      setIndex((value) => value + 1);
    } else {
      setPassed((current) =>
        current.includes(card.id) ? current : [...current, card.id],
      );
      if (index + 1 >= queue.length) {
        setStarted(false);
        setFinished(true);
      } else setIndex((value) => value + 1);
    }
  }
  if (finished)
    return (
      <div className="panel review-summary">
        <div className="result-header">
          <div className="result-symbol">
            <Icon name="check" size={32} />
          </div>
          <span className="eyebrow">ĐÃ XONG PHIÊN ÔN TẬP</span>
          <h2 style={{ marginTop: 18 }}>
            Thêm một chút kiến thức được giữ lại.
          </h2>
          <p>
            {answers} lượt ôn · {passed.length} thẻ đã nhớ · {againCount} lượt
            cần lặp lại.
          </p>
          <p style={{ marginTop: 12 }}>
            Lịch ôn đã được cập nhật theo đánh giá của bạn. Quay lại khi các thẻ
            đến hạn nhé.
          </p>
        </div>
        <div className="button-row" style={{ justifyContent: "center" }}>
          <button
            className="btn btn-primary"
            onClick={() => setFinished(false)}
          >
            Chọn phiên tiếp theo
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
    const card = queue[index];
    return (
      <div className="practice-container" style={{ maxWidth: 690 }}>
        <div className="session-header">
          <span>
            {answers} lượt đã ôn · {queue.length - index} thẻ còn lại
          </span>
          <button
            className="text-button"
            onClick={() => {
              setStarted(false);
              setFinished(false);
            }}
          >
            Kết thúc phiên
          </button>
        </div>
        <div className="progress-track session-progress">
          <span style={{ width: `${(index / queue.length) * 100}%` }} />
        </div>
        <Flashcard
          key={`${card.id}:${index}`}
          front={<CardFront item={card.item} />}
          back={<CardBack item={card.item} />}
          srs={getSrsState(card.id)}
          onRate={handleRate}
        />
      </div>
    );
  }
  return (
    <>
      <div className="page-heading">
        <span className="eyebrow">NHỚ LẠI, RỒI NHỚ LÂU HƠN</span>
        <h1>Ôn tập một chút hôm nay</h1>
        <p>
          Ưu tiên thẻ đến hạn, thêm một ít thẻ mới và tự đánh giá sau khi xem
          đáp án.
        </p>
      </div>
      <div className="setup-grid">
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
            <h2>Bộ thẻ</h2>
            <div className="chips">
              {(["vocabulary", "kanji", "grammar"] as DeckType[]).map(
                (type) => (
                  <button
                    key={type}
                    className={`chip ${deck === type ? "active" : ""}`}
                    aria-pressed={deck === type}
                    onClick={() => setDeck(type)}
                  >
                    {labels[type]}
                  </button>
                ),
              )}
            </div>
          </div>
          <div className="setup-section">
            <h2>Tối đa thẻ mới trong phiên</h2>
            <div className="chips">
              {[5, 10, 20].map((n) => (
                <button
                  key={n}
                  className={`chip ${newLimit === n ? "active" : ""}`}
                  aria-pressed={newLimit === n}
                  onClick={() => setNewLimit(n)}
                >
                  {n} thẻ
                </button>
              ))}
            </div>
          </div>
          <div className="setup-count">
            {ready
              ? `${due.length} thẻ đến hạn · ${fresh.length} thẻ mới · ${cards.length} thẻ trong bộ`
              : "Đang tải tiến độ…"}
          </div>
          {specific && (
            <div className="button-row" style={{ marginBottom: 12 }}>
              <button
                className="btn btn-soft"
                onClick={() => start("card")}
                disabled={!ready}
              >
                Ôn thẻ vừa chọn
                <Icon name="cards" size={17} />
              </button>
            </div>
          )}
          <div className="button-row">
            <button
              className="btn btn-primary"
              disabled={!ready || (!due.length && !fresh.length)}
              onClick={() => start("scheduled")}
            >
              Bắt đầu ({due.length + Math.min(newLimit, fresh.length)} thẻ)
              <Icon name="arrow" size={17} />
            </button>
            <button
              className="btn btn-secondary"
              disabled={!ready || !cards.length}
              onClick={() => start("all")}
            >
              Ôn cả bộ
            </button>
          </div>
          {ready && !due.length && !fresh.length && (
            <p className="muted small" style={{ marginTop: 15 }}>
              Bạn đã ôn xong các thẻ đến hạn. Lịch ôn tiếp theo đã được lưu.
            </p>
          )}
        </section>
        <aside className="setup-description">
          <Icon name="cards" size={30} />
          <h2>
            Thử nhớ trước.
            <br />
            Mở đáp án sau.
          </h2>
          <p>
            Đánh giá theo khả năng nhớ thật của bạn. Thẻ “Chưa nhớ” sẽ quay lại
            sau vài thẻ khác trong chính phiên này.
          </p>
          <ul>
            <li>Thẻ đã thêm vào ôn tập được ưu tiên trong nhóm thẻ mới.</li>
            <li>“Khó”, “Nhớ” và “Rất dễ” có lịch ôn khác nhau.</li>
            <li>Tiến độ được lưu sau mỗi lượt đánh giá.</li>
          </ul>
        </aside>
      </div>
    </>
  );
}
