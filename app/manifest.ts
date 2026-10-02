import type { MetadataRoute } from "next";
export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  const basePath = process.env.NEXT_PUBLIC_KOTOBA_BASE_PATH || "";
  return {
    name: "Kotoba · Góc học tiếng Nhật",
    short_name: "Kotoba",
    description: "Học tiếng Nhật theo bài và ôn từ vựng, kanji bằng flashcard.",
    lang: "vi",
    start_url: `${basePath}/`,
    scope: `${basePath}/`,
    display: "standalone",
    background_color: "#fffdf4",
    theme_color: "#396953",
    icons: [
      {
        src: `${basePath}/icons/kotoba-192.png`,
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: `${basePath}/icons/kotoba-512.png`,
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
