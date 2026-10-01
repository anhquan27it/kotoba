# Đưa Kotoba lên GitHub Pages

GitHub Pages phục vụ bản web tĩnh, nên điện thoại mở được ở mọi nơi và máy tính có thể tắt. Với GitHub Free, dùng kho **Public** để không mất phí hosting. Mã web và nội dung bài học trong kho sẽ công khai; tiến độ của bạn vẫn lưu riêng trong trình duyệt.

## Triển khai lần đầu

1. Tạo kho công khai `kotoba` trong tài khoản GitHub của bạn.
2. Đưa mã nguồn dự án vào nhánh `main`, gồm cả `.github/workflows/pages.yml`. Không đưa PDF gốc, tệp tiến độ, `.env`, thư viện, bản dựng hoặc nhật ký lên kho.
3. Trong kho, mở **Settings → Pages → Build and deployment → Source**, chọn **GitHub Actions**.
4. Mở **Actions → Publish Kotoba → Run workflow** nếu lần đẩy mã ban đầu diễn ra trước khi bật Pages.
5. Khi workflow hoàn tất, mở địa chỉ được ghi ở bước triển khai hoặc trang **Settings → Pages**. Với kho `kotoba`, địa chỉ có dạng `https://<tài-khoản>.github.io/kotoba/`.

Không cần mua tên miền, nhập thông tin thanh toán hoặc bật máy tính. Kho `<tài-khoản>.github.io` dùng địa chỉ ở gốc; các kho khác dùng đường dẫn theo tên kho. Workflow tự lấy đường dẫn từ GitHub Pages để phông chữ, biểu tượng, liên kết và chức năng thêm vào màn hình chính hoạt động đúng.

## Cập nhật bài mới

Thêm bài theo `docs/ADDING_LESSONS.md`, kiểm tra rồi đẩy thay đổi lên `main`. Workflow tự dựng lại toàn bộ trang từ danh sách bài học và triển khai cùng địa chỉ. Giữ nguyên ID bài học và mục kiến thức để tiến độ cũ tiếp tục dùng được.

## Kiểm tra trên máy

```bash
npm run build:github
```

Bản dựng thử mặc định dùng `/kotoba/`. Có thể đặt biến môi trường `GITHUB_REPOSITORY` theo dạng `tài-khoản/tên-kho`, hoặc `NEXT_PUBLIC_KOTOBA_BASE_PATH` là `/tên-kho` (chuỗi rỗng nếu dùng gốc tên miền). Đây là cấu hình khi dựng web; cần dựng lại khi thay đường dẫn.

Sau khi dựng bản online, chạy `npm run build` để dùng lại shortcut hoặc máy chủ Next.js trên máy tính.

## Tiến độ trên điện thoại

Ở bản cũ, vào **Tiến độ của tôi → Xuất bản sao tiến độ**. Chuyển tệp JSON sang điện thoại rồi **Nhập bản sao** trên web mới. Tiến độ lưu theo thiết bị và địa chỉ web; chưa tự đồng bộ giữa điện thoại với máy tính, chưa có chế độ ngoại tuyến.

## Tài liệu chính thức

- [GitHub Pages và các gói hỗ trợ](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)
- [Triển khai bằng GitHub Actions](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
