import ContentDetail from "@/components/ContentDetail";
import { grammar, legacyIdMap, contentRouteId } from "@/lib/catalog";
export function generateStaticParams() {
  const ids = new Set(grammar.map((item) => item.id));
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
  return <ContentDetail id={id} type="grammar" />;
}
