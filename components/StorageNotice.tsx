"use client";
import { useEffect, useState } from "react";
export default function StorageNotice() {
  const [error, setError] = useState(false);
  useEffect(() => {
    const show = () => setError(true);
    window.addEventListener("kotoba:storage-error", show);
    return () => window.removeEventListener("kotoba:storage-error", show);
  }, []);
  if (!error) return null;
  return (
    <div className="storage-notice" role="alert">
      Trình duyệt chưa lưu được tiến độ. Hãy kiểm tra quyền lưu trữ hoặc dung
      lượng trống.
      <button onClick={() => setError(false)} aria-label="Đóng thông báo">
        ×
      </button>
    </div>
  );
}
