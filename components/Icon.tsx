import type { CSSProperties } from "react";
const paths: Record<string, React.ReactNode> = {
  home: (
    <>
      <path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Z" />
      <path d="M9 21v-8h6v8" />
    </>
  ),
  book: (
    <>
      <path d="M12 5v16M3 4c4-1 7 0 9 2 2-2 5-3 9-2v15c-4-1-7 0-9 2-2-2-5-3-9-2Z" />
    </>
  ),
  cards: (
    <>
      <rect x="7" y="3" width="14" height="17" rx="3" />
      <path d="M4 7H3v13a2 2 0 0 0 2 2h12M11 9h6M11 13h4" />
    </>
  ),
  check: <path d="m5 12 4 4L19 6" />,
  quiz: (
    <>
      <rect x="5" y="4" width="14" height="18" rx="3" />
      <path d="M9 4V2h6v2M9 10h6M9 14h6M9 18h3" />
    </>
  ),
  chart: (
    <>
      <path d="M4 3v18h17M8 16v-4M13 16V8M18 16V5" />
    </>
  ),
  arrow: <path d="M4 12h16m-6-6 6 6-6 6" />,
  chevron: <path d="m9 5 7 7-7 7" />,
  search: (
    <>
      <circle cx="10" cy="10" r="6" />
      <path d="m15 15 6 6" />
    </>
  ),
  spark: <path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5Z" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  fire: (
    <path d="M12 2c1 5-3 6-3 9 0 1 1 2 2 2 3 0 4-3 4-5 3 3 5 6 4 9-1 3-4 5-7 5-5 0-8-3-8-7 0-4 4-6 4-10 2 1 3 2 4 4Z" />
  ),
  leaf: (
    <>
      <path d="M20 3C8 2 3 7 4 13c1 6 8 9 13 3 3-4 3-8 3-13Z" />
      <path d="m4 21 10-10" />
    </>
  ),
  reset: (
    <>
      <path d="M3 10a9 9 0 1 1 2 8M3 4v6h6" />
    </>
  ),
  download: (
    <>
      <path d="M12 3v12m-5-5 5 5 5-5M4 17v4h16v-4" />
    </>
  ),
  close: <path d="m6 6 12 12M18 6 6 18" />,
  menu: <path d="M4 6h16M4 12h16M4 18h16" />,
  speaker: (
    <>
      <path d="m11 4-6 5H2v6h3l6 5Z" />
      <path d="M15 8a6 6 0 0 1 0 8M18 5a10 10 0 0 1 0 14" />
    </>
  ),
  stop: <rect x="6" y="6" width="12" height="12" rx="2" />,
};
export default function Icon({
  name,
  size = 20,
  className,
  style,
}: {
  name: string;
  size?: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      style={style}
    >
      {paths[name] ?? paths.book}
    </svg>
  );
}
