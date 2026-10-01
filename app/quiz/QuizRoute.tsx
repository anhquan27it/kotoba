"use client";
import { useSearchParams } from "next/navigation";
import QuizSetup from "@/components/QuizSetup";

export default function QuizRoute() {
  const query = useSearchParams();
  const lesson = query.get("lesson") ?? undefined;
  const category = query.get("category") ?? undefined;
  const mode = query.get("mode");
  return (
    <QuizSetup
      key={`${lesson}:${category}:${mode}`}
      initialLesson={lesson}
      initialCategory={category}
      initialWrong={mode === "wrong"}
    />
  );
}
