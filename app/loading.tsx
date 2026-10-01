export default function Loading() {
  return (
    <div className="loading-view" aria-label="Đang mở bài học" role="status">
      <div className="loading-line" />
      <div className="loading-line short" />
      <div className="loading-panel" />
      <span className="sr-only">Đang tải nội dung…</span>
    </div>
  );
}
