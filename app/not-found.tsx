import Link from "next/link";
export default function NotFound() {
  return (
    <div className="empty-state">
      <span className="eyebrow">404</span>
      <h2 style={{ marginTop: 15 }}>Trang này chưa có nội dung</h2>
      <p>Hãy quay lại thư viện để chọn một bài học đang có.</p>
      <Link className="btn btn-primary" href="/lessons">
        Về thư viện bài học
      </Link>
    </div>
  );
}
