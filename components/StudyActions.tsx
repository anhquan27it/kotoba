"use client";
import Link from "next/link";
import Icon from "./Icon";
import { enrollCard, markLearned } from "@/lib/storage";
import { useStudy } from "@/lib/use-study";
import type { DeckType } from "@/lib/types";

export default function StudyActions({
  id,
  lessonId,
  type,
}: {
  id: string;
  lessonId: string;
  type: DeckType;
}) {
  const { state } = useStudy();
  const learned = state.learned.includes(id);
  const enrolled = state.enrolled.includes(id);
  return (
    <div className="study-actions">
      <button
        className={`btn btn-small ${learned ? "btn-soft" : "btn-secondary"}`}
        onClick={() => markLearned(id, lessonId)}
        disabled={learned}
      >
        <Icon name="check" size={16} />
        {learned ? "Đã học" : "Đánh dấu đã học"}
      </button>
      {enrolled ? (
        <Link
          className="btn btn-ghost btn-small"
          href={`/review?lesson=${lessonId}&deck=${type}&card=${encodeURIComponent(id)}`}
        >
          Ôn thẻ này <Icon name="arrow" size={16} />
        </Link>
      ) : (
        <button
          className="btn btn-ghost btn-small"
          onClick={() => enrollCard(id)}
        >
          <Icon name="cards" size={16} />
          Thêm vào ôn tập
        </button>
      )}
    </div>
  );
}
