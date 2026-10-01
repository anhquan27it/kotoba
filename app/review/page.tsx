import { Suspense } from "react";
import ReviewRoute from "./ReviewRoute";
export const metadata = { title: "Ôn tập thẻ" };
export default function Page() {
  return (
    <Suspense fallback={<p role="status">Đang mở thẻ ôn tập…</p>}>
      <ReviewRoute />
    </Suspense>
  );
}
