import type { Lesson } from "@/lib/types";

/** Copy into data/lessons, fill from the supplied lesson, then register in index.ts. */
const lesson: Lesson = {
  id: "n4-16",
  level: "N4",
  course: "Dũng Mori",
  number: 16,
  title: "Điền tên bài từ tài liệu",
  description: "Điền mô tả ngắn về kiến thức trong bài.",
  goals: ["Điền mục tiêu có thể kiểm tra được sau bài học."],
  source: {
    title: "Điền tên và chương tài liệu",
    note: "Ghi rõ nội dung gốc và ví dụ được bổ sung.",
  },
  vocabulary: [],
  kanji: [],
  grammar: [],
  passages: [],
  questions: [],
  referenceTables: [],
};
export default lesson;
