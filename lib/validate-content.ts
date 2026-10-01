import type { Lesson } from "./types";

/** Verify references before new lesson content reaches the learning screens. */
export function validateLessons(lessons: Lesson[]): string[] {
  const errors: string[] = [];
  const lessonIds = new Set<string>();
  for (const lesson of lessons) {
    const prefix = `${lesson.id}: `;
    const error = (message: string) => errors.push(prefix + message);
    if (!/^[a-z0-9-]+$/.test(lesson.id))
      error("ID bài học chỉ được dùng chữ thường, số và dấu gạch ngang.");
    if (lessonIds.has(lesson.id)) error("Trùng ID bài học.");
    lessonIds.add(lesson.id);
    if (!["N5", "N4", "N3", "N2", "N1"].includes(lesson.level))
      error("Cấp độ không hợp lệ.");
    if (!Number.isInteger(lesson.number) || lesson.number < 1)
      error("Số bài học không hợp lệ.");
    if (
      !lesson.title.trim() ||
      !lesson.description.trim() ||
      !lesson.course.trim()
    )
      error("Thiếu tên, mô tả hoặc giáo trình.");
    if (!lesson.goals.length || lesson.goals.some((goal) => !goal.trim()))
      error("Thiếu mục tiêu học.");
    if (!lesson.source.title.trim()) error("Thiếu nguồn nội dung.");
    const content = [...lesson.vocabulary, ...lesson.kanji, ...lesson.grammar];
    const rawIds = new Set<string>();
    for (const item of content) {
      if (!item.id || item.id.includes(":"))
        error(`ID nội dung không hợp lệ: ${item.id}`);
      if (rawIds.has(item.id)) error(`Trùng ID nội dung: ${item.id}`);
      rawIds.add(item.id);
      if (!item.meaning.trim() || !item.chapter.trim())
        error(`${item.id}: thiếu nghĩa hoặc phần học.`);
      if (
        !item.examples.length ||
        item.examples.some(
          (example) => !example.jp.trim() || !example.vi.trim(),
        )
      )
        error(`${item.id}: thiếu ví dụ Nhật / Việt.`);
      if (
        "word" in item &&
        (!item.word.trim() || !item.reading.trim() || !item.pos.trim())
      )
        error(`${item.id}: thiếu từ, cách đọc hoặc loại từ.`);
      if ("char" in item && (!item.char.trim() || !item.hanViet.trim()))
        error(`${item.id}: thiếu kanji hoặc âm Hán Việt.`);
      if (
        "pattern" in item &&
        (!item.pattern.trim() || !item.explanation.trim())
      )
        error(`${item.id}: thiếu mẫu câu hoặc giải thích.`);
    }
    const passages = new Set<string>();
    for (const passage of lesson.passages) {
      if (passages.has(passage.id)) error(`Trùng ID đoạn đọc: ${passage.id}`);
      passages.add(passage.id);
      if (
        !passage.title.trim() ||
        !passage.paragraphs.length ||
        passage.paragraphs.some((text) => !text.trim())
      )
        error(`${passage.id}: đoạn đọc thiếu nội dung.`);
    }
    const questions = new Set<string>();
    for (const question of lesson.questions) {
      if (questions.has(question.id)) error(`Trùng ID câu hỏi: ${question.id}`);
      questions.add(question.id);
      if (!question.id || question.id.includes(":"))
        error(`ID câu hỏi không hợp lệ: ${question.id}`);
      if (
        !question.prompt.trim() ||
        !question.answer.trim() ||
        !question.explanation?.trim()
      )
        error(`${question.id}: thiếu đề, đáp án hoặc giải thích.`);
      if (question.kind === "mcq") {
        if (
          !question.options ||
          question.options.length < 2 ||
          new Set(question.options).size !== question.options.length
        )
          error(`${question.id}: lựa chọn bị thiếu hoặc trùng.`);
        if (
          question.answer
            .split("|")
            .some((answer) => !question.options?.includes(answer))
        )
          error(`${question.id}: đáp án không có trong lựa chọn.`);
      }
      if (question.category === "reading" && !question.passageId)
        error(`${question.id}: câu đọc thiếu liên kết đoạn văn.`);
      if (question.passageId && !passages.has(question.passageId))
        error(`${question.id}: đoạn đọc không tồn tại.`);
      if (question.targetIds?.some((id) => !rawIds.has(id)))
        error(`${question.id}: kiến thức được tham chiếu không tồn tại.`);
    }
  }
  return errors;
}
