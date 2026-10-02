"use client";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function QuizRoute() {
  const query = useSearchParams();
  const router = useRouter();
  const next = new URLSearchParams();
  const lesson = query.get("lesson");
  const category = query.get("category");
  if (lesson) next.set("lesson", lesson);
  if (category && ["vocabulary", "kanji", "grammar"].includes(category))
    next.set("deck", category);
  const href = `/review${next.size ? `?${next.toString()}` : ""}`;
  useEffect(() => {
    router.replace(href);
  }, [href, router]);
  return (
    <p role="status">
      Đang chuyển sang <Link href={href}>ôn tập thẻ</Link>…
    </p>
  );
}
