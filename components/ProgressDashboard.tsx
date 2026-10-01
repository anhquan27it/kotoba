"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import { useStudy } from "@/lib/use-study";
import { getStreak, getStudy, importStudy, resetProgress } from "@/lib/storage";
import { cardIds, lessons, lessonHref, questions } from "@/lib/catalog";
import Icon from "./Icon";
export default function ProgressDashboard() {
  const { state, ready, now } = useStudy();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const input = useRef<HTMLInputElement>(null);
  const learned = cardIds.filter((id) => state.learned.includes(id)).length;
  const due = cardIds.filter((id) => state.progress[id]?.due <= now).length;
  const wrong = questions.filter((q) => state.wrong.includes(q.id)).length;
  function exportProgress() {
    const blob = new Blob([JSON.stringify(getStudy(), null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `kotoba-tien-do-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    setMessage(
      "Đã xuất bản sao tiến độ. Bạn có thể nhập tệp này trên thiết bị khác.",
    );
    setError("");
  }
  async function importProgress(file: File) {
    try {
      if (file.size > 5_000_000)
        throw new Error("Tệp quá lớn. Hãy chọn bản sao tiến độ dưới 5 MB.");
      const raw = await file.text();
      if (
        !window.confirm(
          "Nhập bản sao này sẽ thay thế tiến độ đang lưu trên thiết bị. Tiếp tục?",
        )
      )
        return;
      importStudy(raw);
      setMessage("Đã khôi phục tiến độ từ bản sao.");
      setError("");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Không đọc được tệp tiến độ.",
      );
      setMessage("");
    } finally {
      if (input.current) input.current.value = "";
    }
  }
  const days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(now || Date.now());
    date.setDate(date.getDate() - 6 + i);
    return {
      label: date.toLocaleDateString("vi-VN", { weekday: "short" }),
      count: state.activity[date.toDateString()] ?? 0,
    };
  });
  return (
    <>
      <div className="page-heading">
        <span className="eyebrow">TỪNG BƯỚC TIẾN CỦA BẠN</span>
        <h1>Một hành trình đang lớn lên</h1>
        <p>
          Theo dõi những gì đã học, xem lại kết quả và giữ một bản sao tiến độ
          của mình.
        </p>
      </div>
      <div className="stats-grid">
        {[
          { icon: "book", value: learned, label: "Mục đã đánh dấu học" },
          { icon: "cards", value: due, label: "Thẻ đang đến hạn" },
          {
            icon: "fire",
            value: getStreak(state),
            label: "Ngày học liên tiếp",
          },
          { icon: "reset", value: wrong, label: "Câu cần luyện lại" },
        ].map((stat) => (
          <div className="stat-card" key={stat.label}>
            <span className="stat-icon">
              <Icon name={stat.icon} />
            </span>
            <div>
              <div className="stat-value">{ready ? stat.value : "—"}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="dashboard-columns">
        <section className="panel">
          <h2 className="section-title">Tiến độ từng bài</h2>
          <div className="history-list">
            {lessons.map((lesson) => {
              const ids = [
                ...lesson.vocabulary,
                ...lesson.kanji,
                ...lesson.grammar,
              ].map((item) => item.id);
              const done = ids.filter((id) =>
                state.learned.includes(id),
              ).length;
              return (
                <div key={lesson.id}>
                  <div className="history-item" style={{ border: 0 }}>
                    <div>
                      <Link href={lessonHref(lesson.id)}>
                        <strong>
                          {lesson.level} · Bài {lesson.number} · {lesson.title}
                        </strong>
                      </Link>
                      <p>
                        {done}/{ids.length} mục đã học
                      </p>
                    </div>
                    <span>
                      {ids.length ? Math.round((done / ids.length) * 100) : 0}%
                    </span>
                  </div>
                  <div className="progress-track">
                    <span
                      style={{
                        width: `${ids.length ? (done / ids.length) * 100 : 0}%`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="divider" />
          <h3 style={{ fontSize: 14 }}>Hoạt động 7 ngày gần đây</h3>
          <p className="small muted" style={{ marginTop: 6 }}>
            Mỗi lần học một mục mới, trả lời câu hỏi hoặc đánh giá thẻ là một
            lượt hoạt động.
          </p>
          <div className="activity-strip">
            {days.map((day, i) => (
              <div
                className={`activity-day ${day.count ? "active" : ""}`}
                key={i}
              >
                <strong>{ready ? day.count : "—"}</strong>
                {ready ? day.label : "…"}
              </div>
            ))}
          </div>
        </section>
        <section className="panel">
          <h2 className="section-title">Phiên luyện tập gần đây</h2>
          {state.quizHistory.length ? (
            <div className="history-list">
              {state.quizHistory
                .slice(-5)
                .reverse()
                .map((entry, i) => (
                  <div className="history-item" key={`${entry.date}:${i}`}>
                    <div>
                      <strong>
                        {entry.lessonId === "all"
                          ? "Luyện tập tổng hợp"
                          : `${lessons.find((l) => l.id === entry.lessonId)?.level ?? ""} · Bài ${lessons.find((l) => l.id === entry.lessonId)?.number ?? "đã lưu"}`}
                      </strong>
                      <p>{new Date(entry.date).toLocaleDateString("vi-VN")}</p>
                    </div>
                    <span>
                      {entry.correct}/{entry.total}
                    </span>
                  </div>
                ))}
            </div>
          ) : (
            <p className="muted small">
              Hoàn thành một phiên luyện tập để xem kết quả tại đây.
            </p>
          )}
          <Link
            className="btn btn-soft btn-small"
            style={{ marginTop: 22 }}
            href="/quiz"
          >
            Luyện tập ngay
            <Icon name="arrow" size={16} />
          </Link>
        </section>
      </div>
      <section className="panel progress-settings">
        <h2 className="section-title">Giữ lại hành trình của bạn</h2>
        <p>
          Tiến độ lưu trong trình duyệt trên thiết bị này. Xuất bản sao để
          chuyển sang thiết bị khác hoặc khôi phục khi cần.
        </p>
        <div className="button-row">
          <button
            className="btn btn-primary"
            disabled={!ready}
            onClick={exportProgress}
          >
            <Icon name="download" size={17} />
            Xuất bản sao tiến độ
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => input.current?.click()}
          >
            Nhập bản sao
          </button>
          <input
            type="file"
            accept=".json,application/json"
            ref={input}
            style={{ display: "none" }}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) void importProgress(file);
            }}
          />
          <button
            className="btn btn-ghost danger-button"
            onClick={() => {
              if (
                window.confirm(
                  "Xóa toàn bộ tiến độ, lịch ôn và kết quả trên thiết bị này? Bạn nên xuất bản sao trước khi xóa.",
                )
              ) {
                resetProgress();
                setMessage("Đã đặt lại tiến độ.");
                setError("");
              }
            }}
          >
            <Icon name="reset" size={17} />
            Đặt lại tiến độ
          </button>
        </div>
        {message && (
          <p className="save-message" role="status">
            {message}
          </p>
        )}
        {error && (
          <p className="error-message" role="alert">
            {error}
          </p>
        )}
      </section>
    </>
  );
}
