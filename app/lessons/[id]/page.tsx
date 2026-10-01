import { notFound } from "next/navigation";
import { getLesson, lessons } from "@/lib/catalog";
import { Suspense } from "react";
import LessonRoute from "./LessonRoute";
export const dynamicParams = false;
type Props = {
  params: Promise<{ id: string }>;
};
export function generateStaticParams() {
  return lessons.map((lesson) => ({ id: lesson.id }));
}
export async function generateMetadata({ params }: Pick<Props, "params">) {
  const { id } = await params;
  const lesson = getLesson(id);
  return {
    title: lesson ? `${lesson.level} · Bài ${lesson.number}` : "Bài học",
  };
}
export default async function LessonPage({ params }: Props) {
  const { id } = await params;
  const lesson = getLesson(id);
  if (!lesson) notFound();
  return (
    <Suspense fallback={<p role="status">Đang mở bài học…</p>}>
      <LessonRoute lesson={lesson} />
    </Suspense>
  );
}
