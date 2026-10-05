# Thêm bài 16, 17 và các cấp độ tiếp theo

Khi có bài tiếp theo, gửi PDF, ảnh rõ hoặc nội dung bài. Cấu trúc web đã có sẵn; không cần thiết kế lại trang hoặc viết một bộ flashcard mới.

## Quy trình

1. Sao chép `templates/lesson.template.ts` vào `data/lessons/n4-16.ts`.
2. Điền nội dung và nguồn tài liệu; giữ `id` bài học ổn định, ví dụ `n4-16`.
3. Thêm từ vựng, kanji, ngữ pháp, đoạn đọc và câu hỏi vào cùng tệp.
4. Import bài và thêm vào `lessonSources` trong `data/lessons/index.ts`.
5. Chạy kiểm tra dữ liệu, TypeScript và các kiểm tra logic. Mở bài để kiểm tra cách trình bày.

Thư viện, bộ lọc, số lượng nội dung, trang bài học, tra cứu và flashcard tự đọc danh sách này. Đổi `level` thành N5, N3, N2 hoặc N1 khi có nội dung tương ứng. Không thêm các bài chưa có tài liệu vào danh sách bài đang học.

## Thông tin mỗi bài

```ts
const lesson: Lesson = {
  id: "n4-16",
  level: "N4",
  course: "Dũng Mori",
  number: 16,
  title: "Tên bài học",
  description: "Mô tả ngắn",
  goals: ["Sau bài này, người học làm được gì?"],
  source: {
    title: "Tên tài liệu, chương",
    note: "Ghi rõ phần biên soạn bổ sung",
  },
  vocabulary: [],
  kanji: [],
  grammar: [],
  passages: [],
  questions: [],
};
```

## Mẫu nội dung

Từ vựng:

```ts
{
  id: "v-001", word: "返す", reading: "かえす", meaning: "trả lại",
  pos: "Động từ nhóm I (tha động từ)", chapter: "16A",
  examples: [{ jp: "本を図書館に返しました。", vi: "Tôi đã trả sách cho thư viện." }],
}
```

Mẫu trên chỉ minh họa định dạng, không xác định nội dung thực tế của bài 16. Câu ví dụ cần tự nhiên và phù hợp kiến thức người học đã có. `reading` trong ví dụ là tùy chọn: nếu tài liệu cung cấp cách đọc, điền để ưu tiên cách đọc đó khi tạo furigana.

Riêng các từ mẫu trong `kanji[].examples`, luôn điền `reading` đã đối chiếu. Nút **Nghe** ở từ vựng, từ mẫu kanji và flashcard phát file MP3 tạo từ cách đọc này, tránh chọn nhầm âm của kanji. Người học không phải cài giọng đọc. Dấu ngoặc chỉ phần tùy chọn được bỏ khi phát âm nhưng vẫn đọc phần bên trong, ví dụ `ゆうしょう（する）` đọc thành `ゆうしょうする`; dấu `～` chỉ chỗ trống nên không được đọc.

### File phát âm

Khi thêm hoặc sửa từ vựng/từ mẫu kanji, chạy `npm run generate:audio` để tạo file còn thiếu, rồi chạy `npm run check:content`. Chỉ người bảo trì cần Python và các thư viện tạo âm thanh:

```bash
python -m pip install --target .tmp_pip/tts edge-tts==7.2.8 mutagen==1.48.1
npm run generate:audio
```

Có thể chỉ định Python bằng `npm run generate:audio -- --python=<đường-dẫn-python>` hoặc biến `KOTOBA_PYTHON`. Lệnh tạo âm thanh dùng [edge-tts](https://github.com/rany2/edge-tts) và cần mạng; build/CI chỉ kiểm tra và đóng gói file đã tạo. File MP3 nằm trong `public/audio/pronunciation/`, ánh xạ và thông tin giọng đọc ở `data/pronunciation-audio.json`. Đưa cả hai vào kho cùng nội dung bài học. Mục có cùng chữ viết và cách đọc dùng chung file; các từ khác chữ viết vẫn có ánh xạ riêng. Kiểm tra nội dung sẽ phát hiện thiếu file hoặc file bị thay đổi/hỏng.

Nghe thử các từ mới, nhất là số đếm và từ có nhiều âm. Âm thanh là giọng tổng hợp tiếng Nhật `ja-JP-NanamiNeural`, không phải bản ghi âm do giáo trình cung cấp. Có thể thay clip bằng bản thu đã được kiểm chứng, đồng thời cập nhật thông tin và mã SHA-256 trong ánh xạ.

### Hiragana trên kanji

`npm run dev` và `npm run build` tự tạo cách đọc cho nội dung mới. Khi đang chạy web và vừa sửa dữ liệu, chạy `npm run generate:readings` để cập nhật. Bộ từ điển chỉ dùng ở bước này, không đưa vào trình duyệt.

Đối chiếu tên riêng, số đếm và từ có nhiều cách đọc. Thêm cách đọc đã xác nhận vào `data/reading-overrides.json`, ví dụ `"一人": "ひとり"`. Nếu từ điển không biết một từ, lệnh tạo cách đọc sẽ báo từ cần bổ sung, thay vì lặng lẽ để kanji thiếu hiragana. Chữ kanji đơn có nhiều âm: furigana ở tiêu đề là một âm tham khảo; xem đầy đủ âm Kun/On và từ ghép trong nội dung.

Ngữ pháp có các trường cơ bản `id`, `pattern`, `meaning`, `chapter`, `explanation`, `examples`, cùng các trường giúp học dễ hơn:

- `connections`: bảng `{ type, form, example }` cho động từ, tính từ い, tính từ な và danh từ.
- `situations`: bối cảnh sử dụng.
- `usage`: lưu ý.
- `contrasts`: phân biệt các mẫu gần nghĩa.
- `mistakes`: `{ wrong, correct, reason }`.

Đoạn đọc:

```ts
{
  id: "reading-001",
  title: "Tên đoạn đọc",
  paragraphs: ["Nội dung tiếng Nhật đầy đủ…"],
  translation: ["Bản dịch tương ứng, có thể bỏ nếu chưa có."],
}
```

Câu hỏi:

```ts
{
  id: "q-001", category: "reading", kind: "mcq", chapter: "16",
  passageId: "reading-001",
  prompt: "Câu hỏi dựa trên đoạn đọc",
  options: ["Lựa chọn 1", "Lựa chọn 2", "Lựa chọn 3", "Lựa chọn 4"],
  answer: "Lựa chọn 2",
  explanation: "Nêu bằng chứng trong đoạn đọc và giải thích cách tìm đáp án.",
  optionExplanations: { "Lựa chọn 1": "Vì sao lựa chọn này không phù hợp…" },
}
```

`category` là `vocabulary`, `kanji`, `grammar` hoặc `reading`. Với câu điền từ, dùng `kind: "fill"`, bỏ `options`; các đáp án tương đương được nối bằng `|`. Chuẩn hóa hỗ trợ ký tự Nhật nửa chiều rộng và toàn chiều rộng; vẫn giữ khác biệt về dấu tiếng Việt và dakuten.

`targetIds` liên kết câu hỏi với ID kiến thức trong cùng bài. Khi làm sai, người học có thể mở lại mục đó. Các câu đọc phải có `passageId` và đoạn văn đầy đủ, kể cả khi câu được chọn riêng trong phiên ngẫu nhiên.

## ID và tiến độ

ID cục bộ như `v-001`, `g-001`, `q-001` được tự thêm phạm vi: `n4-16:vocabulary:v-001`. Có thể dùng lại ID cục bộ ở bài khác. Không đổi ID của một mục đã có hoặc tái sử dụng ID cũ cho kiến thức khác, vì lịch ôn sẽ gắn với ID đó.

## Kiểm tra

```bash
npm run typecheck
npm run generate:readings
npm run check:content
npm test
npm run build
```

Kiểm tra tự động phát hiện ID trùng, đáp án không thuộc lựa chọn, ví dụ thiếu nội dung và tham chiếu bị đứt. Vẫn cần đọc lại để kiểm tra tiếng Nhật, bản dịch, tính tự nhiên và khả năng có nhiều đáp án hợp lệ. Không dùng tỷ lệ đúng của một phiên để khẳng định người học đã thành thạo cả bài.
