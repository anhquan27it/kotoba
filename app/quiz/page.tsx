import { Suspense } from "react";
import QuizRoute from "./QuizRoute";
export const metadata = { title: "Luyện tập" };
export default function Page() {
  return (
    <Suspense fallback={<p role="status">Đang mở bài tập…</p>}>
      <QuizRoute />
    </Suspense>
  );
}
