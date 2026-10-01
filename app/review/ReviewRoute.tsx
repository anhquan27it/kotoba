"use client";
import { useSearchParams } from "next/navigation";
import ReviewSetup from "@/components/ReviewSetup";

export default function ReviewRoute() {
  const query = useSearchParams();
  const lesson = query.get("lesson") ?? undefined;
  const deck = query.get("deck") ?? undefined;
  const card = query.get("card") ?? undefined;
  return (
    <ReviewSetup
      key={`${lesson}:${deck}:${card}`}
      initialLesson={lesson}
      initialDeck={deck}
      initialCard={card}
    />
  );
}
