# Kotoba · Góc học tiếng Nhật

Ứng dụng tự học cá nhân xây bằng Next.js 15, React 19 và TypeScript. Học theo cấp độ và từng bài: từ vựng, kanji, ngữ pháp, đọc hiểu và flashcard. Hiện có các bài N4 số 15, 16 và 17; phần nghe được để sau.

## Chạy web

Trên Windows, nhấp đúp **Mở Kotoba.lnk** ngay trong thư mục dự án. Shortcut chạy trực tiếp bằng Node.js đã cài trên máy. Một cửa sổ khởi động hiện lên và tự đóng khi web đã mở trong trình duyệt mặc định; máy chủ tiếp tục chạy nền. Nếu đã chạy, nút dùng lại phiên hiện tại. Nhấp **Dừng Kotoba.lnk** khi muốn tắt máy chủ; tiến độ vẫn được giữ trong trình duyệt.

Lần đầu hoặc sau khi cập nhật nội dung, nút mở tự chuẩn bị bản tối ưu nên có thể cần chờ một chút. Node.js và các thư viện phải được cài sẵn. Nếu khởi động thất bại, cửa sổ giữ lại thông báo để đọc; nhấn Enter để đóng. Nhật ký khởi động nằm trong `.kotoba/`. Sau khi chuyển cả folder sang vị trí khác, chạy `node scripts/create-shortcuts.cjs` để tạo lại hai shortcut.

Nếu bản shortcut cũ bị Smart App Control chặn, chạy `node scripts/create-shortcuts.cjs` rồi mở shortcut ngay trong thư mục này. Bản hiện tại không dùng `kotoba.vbs`; không cần thay đổi cài đặt bảo vệ Windows. Có thể mở bằng terminal với `node scripts/open-kotoba.cjs` và dừng bằng `node scripts/open-kotoba.cjs --stop`.

Cần Node.js 20 trở lên.

```bash
npm install
npm run dev
```

Mở http://localhost:3000. Để chạy bản tối ưu:

```bash
npm run build
npm start
```

## Học trên điện thoại

Kotoba đã được cấu hình để triển khai miễn phí bằng GitHub Pages, với địa chỉ dạng `https://<tài-khoản>.github.io/kotoba/`. Địa chỉ thật chỉ hoạt động sau khi GitHub báo triển khai thành công. Ai có đường dẫn đều có thể mở bằng trình duyệt, không cần đăng nhập; máy tính không cần bật.

GitHub Pages miễn phí trên kho công khai với GitHub Free. Mã web và nội dung bài học trong kho cũng công khai. Xem `docs/GITHUB_PAGES.md` để triển khai và cập nhật; không cần mua hosting hoặc tên miền.

Bạn có thể thêm Kotoba vào màn hình chính: trên iPhone mở bằng Safari, chọn **Chia sẻ → Thêm vào Màn hình chính**; trên Android mở menu trình duyệt và chọn **Thêm vào màn hình chính** hoặc **Cài đặt ứng dụng** nếu có.

Tiến độ lưu riêng theo thiết bị và địa chỉ web. Để chuyển từ bản máy tính sang điện thoại, vào **Tiến độ của tôi → Xuất bản sao tiến độ** ở bản cũ, chuyển tệp JSON sang điện thoại rồi **Nhập bản sao** trên bản online. Chưa có đồng bộ tự động hoặc chế độ học ngoại tuyến.

`npm run build:github` tạo bản tĩnh trong `out/` với đường dẫn `/kotoba/`. Trên GitHub Actions, đường dẫn lấy tự động từ cấu hình Pages nên có thể dùng tên kho khác hoặc kho `<tài-khoản>.github.io`. `npm run build:online` tạo bản tĩnh ở gốc tên miền. Các trang chi tiết được tạo từ danh mục bài học, gồm cả đường dẫn cũ. Khi thêm bài và đẩy lên nhánh `main`, GitHub Actions kiểm tra nội dung, dựng và cập nhật web tự động. Sau khi dựng bản online, chạy `npm run build` nếu muốn tiếp tục dùng máy chủ Next.js trên máy tính.

## Những gì đã có

- Giao diện thích ứng với máy tính và điện thoại, tông kem/xanh dịu, hỗ trợ bàn phím và giảm chuyển động.
- Phông Noto Sans cho tiếng Việt và Noto Sans JP cho tiếng Nhật lưu ngay trong dự án. Phông Nhật chia theo vùng Unicode để trình duyệt chỉ tải phần cần dùng. Giấy phép OFL ở `public/fonts/`.
- Cỡ chữ học lớn, hiragana phía trên kanji khi học nội dung và xem ví dụ. Nút **Ẩn/Hiện cách đọc** ở đầu trang áp dụng cả hai mặt flashcard và nhớ lựa chọn trên thiết bị.
- Thư viện theo cấp độ, tìm bài và tra cứu kiến thức.
- Mỗi bài có mục tiêu, từ vựng, kanji, ngữ pháp và đoạn đọc. Ngữ pháp có bảng kết hợp, cách phân biệt và lỗi thường gặp.
- Đánh dấu nội dung đã học; thêm riêng thẻ vào ôn tập; bản dịch có thể ẩn/hiện.
- Flashcard lớn với hai lựa chọn **Thuộc / Chưa thuộc**. Ôn theo lịch, riêng thẻ mới/chưa thuộc hoặc cả bộ; đổi chiều Nhật → Việt / Việt → Nhật và bật/tắt xáo trộn. Thẻ chưa thuộc quay lại sau tối đa ba thẻ khác; tiến độ tính theo số thẻ đã thuộc trong phiên.
- **Space** hoặc chạm để lật thẻ; **← / 1** chọn Chưa thuộc, **→ / 2** chọn Thuộc sau khi xem đáp án. Thẻ kanji có âm Hán Việt, âm Kun/On và tối đa ba từ ghép từ bài học.
- Đã bỏ giao diện luyện tập trắc nghiệm. Đường dẫn `/quiz` cũ chuyển sang ôn thẻ, giữ bài học và bộ thẻ nếu có. Kết quả cũ vẫn được giữ trong dữ liệu tiến độ và bản sao JSON.
- Đoạn đọc hiển thị đầy đủ, có thể mở bản dịch sau khi tự đọc.
- Tiến độ, chuỗi ngày học, lịch sử và xuất/nhập bản sao JSON. Tiến độ cũ từ phiên bản N4 trước được đọc và chuyển sang ID mới; dữ liệu gốc cũ được giữ lại.

## Thêm bài tiếp theo

Xem `docs/ADDING_LESSONS.md` và `templates/lesson.template.ts`. Mỗi bài có một tệp nội dung, đăng ký tại `data/lessons/index.ts`. Giao diện và các bộ lọc tự cập nhật từ danh sách này.

Bài 16 có 39 mục từ vựng, 10 kanji, 6 mẫu ngữ pháp và 3 đoạn đọc. Bài 17 có 34 mục từ vựng, 11 kanji, 7 mẫu ngữ pháp, bảng kết hợp với んです và 3 đoạn đọc. Nội dung lấy từ hai PDF chương 16–17 do người học cung cấp; nguồn từng bài ghi rõ các phần biên soạn bổ sung.

Khi có PDF hoặc nội dung bài tiếp theo, chỉ cần nhập nội dung theo mẫu; không cần tạo thêm trang hay viết lại logic học.

## Cấu trúc

```text
app/                   Các tuyến trang, layout và giao diện nền
components/            Thành phần bài học, flashcard, ôn tập, tiến độ
lib/types.ts           Kiểu nội dung bài học
lib/catalog.ts         Danh mục và ID có phạm vi theo bài
lib/storage.ts         Tiến độ, chuyển dữ liệu cũ, sao lưu
lib/srs.ts             Lịch ôn
lib/review.ts          Chọn bộ thẻ và lặp lại thẻ chưa thuộc trong phiên
lib/practice.ts        Xáo trộn, chuẩn hóa tìm kiếm, tiện ích câu hỏi cũ
lib/validate-content.ts Kiểm tra chất lượng cấu trúc dữ liệu
 data/lessons/           Mỗi tệp là một bài học
 data/vocabulary.ts     Dữ liệu gốc của bài 15, giữ tương thích
 data/kanji.ts
 data/grammar.ts
 data/questions.ts
 templates/             Mẫu thêm bài
 docs/                  Hướng dẫn nhập bài
 tests/                 Kiểm tra logic học và dữ liệu
 public/fonts/          Phông chữ tự lưu và giấy phép
```

## Kiểm tra dự án

```bash
npm run typecheck
npm run generate:readings
npm run check:content
npm test
npm run build
```

`npm run lint` chạy kiểm tra TypeScript và dữ liệu, không yêu cầu cài ESLint. Nội dung tiếng Nhật và tính hợp lý của các lựa chọn vẫn cần được đối chiếu với tài liệu, ngoài các kiểm tra tự động.

`dev` và `build` tự tạo `data/readings.json` bằng từ điển Kuromoji ở máy phát triển; trình duyệt chỉ tải cách đọc đã tạo sẵn. Cách đọc có trong bài được ưu tiên. Tên riêng, số đếm và từ nhiều cách đọc có thể hiệu chỉnh ở `data/reading-overrides.json`; kiểm tra lại theo ngữ cảnh khi nhập bài mới.

## Lưu tiến độ

Tiến độ lưu ở trình duyệt, không tự đồng bộ giữa các thiết bị. Vào **Tiến độ của tôi → Xuất bản sao tiến độ**, rồi nhập tệp JSON trên thiết bị khác. Chỉ số “đã học” là số mục người học chủ động đánh dấu; số thẻ “thuộc” phản ánh đánh giá ở lần ôn gần nhất.
