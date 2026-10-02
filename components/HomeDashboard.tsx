"use client";
import Link from "next/link";
import Icon from "./Icon";
import Furigana from "./Furigana";
import { cardIds, lessons, lessonHref } from "@/lib/catalog";
import { useStudy } from "@/lib/use-study";
import { getStreak } from "@/lib/storage";

export default function HomeDashboard() {
  const { state, ready, now } = useStudy();
  const current =
    lessons.find((lesson) => lesson.id === state.lastLesson) ?? lessons[0];
  const due = cardIds.filter((id) => state.progress[id]?.due <= now).length;
  const learned = cardIds.filter((id) => state.learned.includes(id)).length;
  const known = cardIds.filter((id) => state.progress[id]?.reps > 0).length;
  const currentIds = current
    ? [...current.vocabulary, ...current.kanji, ...current.grammar].map(
        (item) => item.id,
      )
    : [];
  const completed = currentIds.filter((id) =>
    state.learned.includes(id),
  ).length;
  const percent = currentIds.length
    ? Math.round((completed / currentIds.length) * 100)
    : 0;
  const stats = [
    {
      value: due,
      label: "Thẻ đến hạn hôm nay",
      icon: "cards",
      href: "/review",
    },
    {
      value: learned,
      label: "Mục kiến thức đã học",
      icon: "book",
      href: "/progress",
    },
    {
      value: getStreak(state),
      label: "Ngày học liên tiếp",
      icon: "fire",
      href: "/progress",
    },
    {
      value: known,
      label: "Thẻ thuộc ở lần ôn gần nhất",
      icon: "check",
      href: "/review",
    },
  ];
  return (
    <>
      <div className="dashboard-greeting">
        <div>
          <h1>Góc học tập của bạn</h1>
          <p className="muted small">
            Chào bạn, hôm nay mình cùng tiến thêm một chút nhé.
          </p>
        </div>
        <span className="dashboard-date">
          <Icon name="leaf" size={16} />
          Tự học theo nhịp của bạn
        </span>
      </div>
      <section className="hero">
        <div>
          <span className="eyebrow">
            <Furigana text="小さな一歩" /> · MỘT BƯỚC NHỎ MỖI NGÀY
          </span>
          <h2>
            Mỗi ngày một chút.
            <br />
            Tiếng Nhật gần hơn.
          </h2>
          <p>
            Học từ vựng, nhớ kanji và ôn lại bằng thẻ mỗi ngày. Một không gian
            yên tĩnh cho hành trình của bạn.
          </p>
          <div className="button-row">
            <Link
              className="btn btn-primary"
              href={current ? lessonHref(current.id) : "/lessons"}
            >
              {completed ? "Tiếp tục học" : "Bắt đầu học"}
              <Icon name="arrow" size={17} />
            </Link>
            <Link className="btn btn-secondary" href="/review">
              <Icon name="cards" size={17} />
              Ôn tập hôm nay
            </Link>
          </div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <span className="art-ring" />
          <Icon className="hero-leaf" name="leaf" size={38} />
          <div className="art-card back">
            <span>
              <Furigana text="学" />
            </span>
            <small>GAKU</small>
          </div>
          <div className="art-card front">
            <span>
              <Furigana text="日" />
            </span>
            <small>NICHI</small>
          </div>
          <span className="art-stamp">
            <strong>
              <Furigana text="一歩" />
            </strong>
            MỘT BƯỚC
          </span>
        </div>
      </section>
      <section className="stats-grid" aria-label="Tiến độ học tập">
        {stats.map((stat) => (
          <Link className="stat-card" key={stat.label} href={stat.href}>
            <span className="stat-icon">
              <Icon name={stat.icon} size={21} />
            </span>
            <div>
              <div className="stat-value">{ready ? stat.value : "—"}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          </Link>
        ))}
      </section>
      <div className="dashboard-columns">
        <section className="panel">
          <div className="panel-heading">
            <h2>Lộ trình của bạn</h2>
            <Link className="text-button" href="/lessons">
              Tất cả bài học →
            </Link>
          </div>
          {current ? (
            <div className="lesson-feature">
              <div className="lesson-feature-top">
                <span className="pill">
                  {current.level} · BÀI {current.number}
                </span>
                <span className="small muted">{current.course}</span>
              </div>
              <h3>{current.title}</h3>
              <p>{current.description}</p>
              <div className="lesson-metadata">
                <span>{current.vocabulary.length} từ vựng</span>
                <span>{current.kanji.length} kanji</span>
                <span>{current.grammar.length} ngữ pháp</span>
              </div>
              <div
                className="progress-track"
                role="progressbar"
                aria-label="Kiến thức đã đánh dấu học"
                aria-valuenow={percent}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <span style={{ width: `${percent}%` }} />
              </div>
              <div className="lesson-feature-footer">
                <span>
                  {completed}/{currentIds.length} mục đã học
                </span>
                <strong>{percent}%</strong>
              </div>
              <div className="lesson-feature-footer">
                <Link
                  className="btn btn-primary btn-small"
                  href={lessonHref(current.id)}
                >
                  {completed ? "Tiếp tục bài học" : "Khám phá bài học"}
                  <Icon name="arrow" size={16} />
                </Link>
                <span>Học từng phần, theo nhịp riêng</span>
              </div>
            </div>
          ) : (
            <p className="muted">Bài học đầu tiên sẽ xuất hiện tại đây.</p>
          )}
        </section>
        <section className="panel">
          <div className="panel-heading">
            <h2>Một phiên học nhỏ</h2>
            <Icon name="spark" size={19} style={{ color: "#b59b67" }} />
          </div>
          {[
            {
              title: "Ôn lại điều đã học",
              desc: due
                ? `${due} thẻ đang chờ bạn ôn lại.`
                : "Bắt đầu với vài thẻ, nhớ lại trước khi xem đáp án.",
            },
            {
              title: "Khám phá một phần mới",
              desc: "Đọc ví dụ và tự thử hiểu trước khi xem bản dịch.",
            },
            {
              title: "Nhớ từ vựng và kanji",
              desc: "Lật thẻ, chọn Thuộc hoặc Chưa thuộc rồi ôn lại thẻ còn vướng.",
            },
          ].map((step, i) => (
            <div className="session-step" key={step.title}>
              <span className="step-number">0{i + 1}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            </div>
          ))}
          <p className="session-footnote">
            Đều đặn quan trọng hơn học thật nhiều trong một ngày.
          </p>
        </section>
      </div>
      <div className="quick-grid">
        {[
          {
            href: "/vocabulary",
            icon: "book",
            title: "Sổ từ vựng",
            desc: "Tìm từ, cách đọc và ví dụ",
          },
          {
            href: "/grammar",
            icon: "spark",
            title: "Gỡ rối ngữ pháp",
            desc: "Cách dùng & các mẫu dễ nhầm",
          },
          {
            href: "/review?deck=kanji",
            icon: "cards",
            title: "Nhớ kanji bằng thẻ",
            desc: "Ôn mặt chữ, cách đọc và từ ghép",
          },
        ].map((item) => (
          <Link className="quick-link" href={item.href} key={item.href}>
            <Icon name={item.icon} />
            <div>
              <strong>{item.title}</strong>
              <small>{item.desc}</small>
            </div>
            <Icon name="chevron" size={17} />
          </Link>
        ))}
      </div>
    </>
  );
}
