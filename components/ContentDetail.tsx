import Link from "next/link";
import { notFound } from "next/navigation";
import {
  findContent,
  legacyIdMap,
  lessonHref,
  labels,
  contentIdFromRoute,
} from "@/lib/catalog";
import type { DeckType } from "@/lib/types";
import { ContentBody, ContentHeading } from "./ContentCard";
import Icon from "./Icon";
export default function ContentDetail({
  id,
  type,
}: {
  id: string;
  type: DeckType;
}) {
  const sourceId = contentIdFromRoute(id);
  const entry = findContent(legacyIdMap[sourceId] ?? sourceId);
  if (!entry || entry.type !== type) notFound();
  return (
    <>
      <div className="breadcrumb">
        <Link href={lessonHref(entry.lesson.id, type)}>
          {entry.lesson.level} · Bài {entry.lesson.number}
        </Link>
        <Icon name="chevron" size={12} />
        <span>{labels[type]}</span>
      </div>
      <div className="panel detail-panel">
        <ContentHeading item={entry.item} />
        <div
          className="content-card-body"
          style={{ padding: 0, marginTop: 20 }}
        >
          <ContentBody item={entry.item} lesson={entry.lesson} type={type} />
        </div>
      </div>
      <Link
        className="btn btn-secondary"
        style={{ marginTop: 22 }}
        href={lessonHref(entry.lesson.id, type)}
      >
        ← Quay lại bài học
      </Link>
    </>
  );
}
