import type {
  DeckType,
  GrammarPattern,
  KanjiEntry,
  Lesson,
  VocabularyWord,
} from "@/lib/types";
import Icon from "./Icon";
import Examples from "./Examples";
import StudyActions from "./StudyActions";
import Furigana from "./Furigana";
import PronunciationButton from "./PronunciationButton";

export type StudyItem = VocabularyWord | KanjiEntry | GrammarPattern;

export function ContentHeading({ item }: { item: StudyItem }) {
  if ("word" in item)
    return (
      <div>
        <span className="pos-tag">{item.pos.split("(")[0].trim()}</span>
        <div className="pronunciation-row">
          <h3 className="word-heading jp" lang="ja">
            <Furigana text={item.word} reading={item.reading} />
          </h3>
          <PronunciationButton text={item.word} reading={item.reading} />
        </div>
        <p className="word-meaning">{item.meaning}</p>
      </div>
    );
  if ("char" in item)
    return (
      <div className="kanji-heading">
        <span className="kanji-tile jp" lang="ja">
          <Furigana text={item.char} />
        </span>
        <div>
          <h3>{item.hanViet}</h3>
          <p className="word-meaning">{item.meaning}</p>
        </div>
      </div>
    );
  return (
    <div>
      <h3 className="grammar-title jp" lang="ja">
        <Furigana text={item.pattern} />
      </h3>
      <p className="word-meaning">{item.meaning}</p>
    </div>
  );
}

export function ContentBody({
  item,
  lesson,
  type,
}: {
  item: StudyItem;
  lesson: Lesson;
  type: DeckType;
}) {
  return (
    <>
      {"char" in item && (
        <dl className="kunon">
          <div>
            <dt>
              ÂM KUN · <Furigana text="訓読み" />
            </dt>
            <dd lang="ja">{item.kunyomi.join("、") || "—"}</dd>
          </div>
          <div>
            <dt>
              ÂM ON · <Furigana text="音読み" />
            </dt>
            <dd lang="ja">{item.onyomi.join("、") || "—"}</dd>
          </div>
        </dl>
      )}
      {"pattern" in item && (
        <>
          <p>
            <Furigana text={item.explanation} />
          </p>
          {!!item.situations?.length && (
            <>
              <div className="section-label">Dùng trong tình huống nào?</div>
              <ul className="grammar-notes">
                {item.situations.map((text) => (
                  <li key={text}>
                    <Furigana text={text} />
                  </li>
                ))}
              </ul>
            </>
          )}
          {!!item.connections?.length && (
            <>
              <div className="section-label">Cách kết hợp</div>
              <div className="data-table-wrap">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Loại từ</th>
                      <th>Kết hợp</th>
                      <th>Ví dụ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {item.connections.map((row) => (
                      <tr key={row.type}>
                        <td>
                          <Furigana text={row.type} />
                        </td>
                        <td>
                          <Furigana text={row.form} />
                        </td>
                        <td className="jp" lang="ja">
                          <Furigana text={row.example} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
          {!!item.usage?.length && (
            <>
              <div className="section-label">Ghi nhớ</div>
              <ul className="grammar-notes">
                {item.usage.map((text) => (
                  <li key={text}>
                    <Furigana text={text} />
                  </li>
                ))}
              </ul>
            </>
          )}
          {!!item.contrasts?.length && (
            <>
              <div className="section-label">Phân biệt mẫu dễ nhầm</div>
              {item.contrasts.map((text) => (
                <p className="contrast-note" key={text}>
                  <Furigana text={text} />
                </p>
              ))}
            </>
          )}
          {!!item.mistakes?.length && (
            <>
              <div className="section-label">Lỗi thường gặp</div>
              {item.mistakes.map((mistake) => (
                <div className="mistake" key={mistake.wrong}>
                  <p className="jp wrong" lang="ja">
                    × <Furigana text={mistake.wrong} />
                  </p>
                  <p className="jp correct" lang="ja">
                    ✓ <Furigana text={mistake.correct} />
                  </p>
                  <small>
                    <Furigana text={mistake.reason} />
                  </small>
                </div>
              ))}
            </>
          )}
        </>
      )}
      <Examples examples={item.examples} pronunciation={"char" in item} />
      <StudyActions id={item.id} lessonId={lesson.id} type={type} />
    </>
  );
}

export default function ContentCard({
  item,
  lesson,
  type,
}: {
  item: StudyItem;
  lesson: Lesson;
  type: DeckType;
}) {
  return (
    <details className="content-card" id={item.id}>
      <summary>
        <ContentHeading item={item} />
        <Icon name="chevron" size={18} />
      </summary>
      <div className="content-card-body">
        <ContentBody item={item} lesson={lesson} type={type} />
      </div>
    </details>
  );
}
