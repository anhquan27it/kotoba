// Định nghĩa kiểu dữ liệu dùng chung cho toàn bộ ứng dụng

export interface Example {
  /** Câu tiếng Nhật (hoặc từ ghép kanji) */
  jp: string;
  /** Cách đọc (furigana / yomikata) — tùy chọn */
  reading?: string;
  /** Nghĩa tiếng Việt */
  vi: string;
}

export interface VocabularyWord {
  id: string;
  /** Dạng chữ kanji */
  word: string;
  /** Cách đọc (hiragana) */
  reading: string;
  /** Nghĩa tiếng Việt */
  meaning: string;
  /** Loại từ: Danh từ, Tính từ い, Động từ nhóm I... */
  pos: string;
  /** Chương: 15A / 15B */
  chapter: string;
  examples: Example[];
}

export interface KanjiEntry {
  id: string;
  /** Chữ Hán */
  char: string;
  /** Âm Hán Việt */
  hanViet: string;
  /** Nghĩa tiếng Việt */
  meaning: string;
  kunyomi: string[];
  onyomi: string[];
  chapter: string;
  /** Từ ghép ví dụ */
  examples: Example[];
}

export interface GrammarPattern {
  id: string;
  /** Mẫu câu, ví dụ: ～でしょう / ～だろう */
  pattern: string;
  /** Nghĩa tiếng Việt */
  meaning: string;
  /** Giải thích chi tiết */
  explanation: string;
  chapter: string;
  /** Các lưu ý sử dụng (bullet points) */
  usage?: string[];
  examples: Example[];
  connections?: { type: string; form: string; example: string }[];
  situations?: string[];
  contrasts?: string[];
  mistakes?: { wrong: string; correct: string; reason: string }[];
}

export type QuestionCategory = "vocabulary" | "grammar" | "kanji" | "reading";
export type QuestionKind = "mcq" | "fill";

export interface Question {
  id: string;
  category: QuestionCategory;
  kind: QuestionKind;
  chapter: string;
  /** Đề bài / câu hỏi */
  prompt: string;
  /** Các lựa chọn (chỉ dùng cho loại mcq) */
  options?: string[];
  /** Đáp án đúng (với fill là chuỗi chấp nhận, phân tách bởi dấu |) */
  answer: string;
  explanation: string;
  passageId?: string;
  targetIds?: string[];
  optionExplanations?: Record<string, string>;
}

export type DeckType = "vocabulary" | "kanji" | "grammar";

export type Level = "N5" | "N4" | "N3" | "N2" | "N1";
export type LessonTab =
  "overview" | "vocabulary" | "kanji" | "grammar" | "reading";

export interface ReadingPassage {
  id: string;
  title: string;
  paragraphs: string[];
  translation?: string[];
}

export interface ReferenceTable {
  title: string;
  resultLabel?: string;
  rows: { tense: string; type: string; polite: string; plain: string }[];
}

/** One content file per lesson. IDs within a lesson must remain stable. */
export interface Lesson {
  id: string;
  level: Level;
  course: string;
  number: number;
  title: string;
  description: string;
  goals: string[];
  source: { title: string; note?: string };
  vocabulary: VocabularyWord[];
  kanji: KanjiEntry[];
  grammar: GrammarPattern[];
  passages: ReadingPassage[];
  questions: Question[];
  referenceTables?: ReferenceTable[];
}
