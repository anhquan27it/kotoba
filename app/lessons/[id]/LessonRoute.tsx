"use client";
import { useSearchParams } from "next/navigation";
import LessonWorkspace from "@/components/LessonWorkspace";
import { labels } from "@/lib/catalog";
import type { Lesson, LessonTab } from "@/lib/types";

export default function LessonRoute({ lesson }: { lesson: Lesson }) {
  const query = useSearchParams();
  const requested = query.get("tab");
  const tab: LessonTab =
    requested && Object.hasOwn(labels, requested)
      ? (requested as LessonTab)
      : "overview";
  return <LessonWorkspace lesson={lesson} tab={tab} />;
}
