import ContentDetail from "@/components/ContentDetail";
import { kanji, legacyIdMap, contentRouteId } from "@/lib/catalog";
export function generateStaticParams() {
  const ids = new Set(kanji.map((item) => item.id));
  return [
    ...ids,
    ...Object.keys(legacyIdMap).filter((id) => ids.has(legacyIdMap[id])),
  ].map((id) => ({ id: contentRouteId(id) }));
}
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ContentDetail id={id} type="kanji" />;
}
