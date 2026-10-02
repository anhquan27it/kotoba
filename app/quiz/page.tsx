import { Suspense } from "react";
import QuizRoute from "./QuizRoute";
export const metadata = { title: "Ôn tập thẻ" };
export default function Page() {
  return (
    <Suspense fallback={<p role="status">Đang mở ôn tập thẻ…</p>}>
      <QuizRoute />
    </Suspense>
  );
}
