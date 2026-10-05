import lesson15 from "@/data/lessons/n4-15";

// Compatibility export; chapter 15 is maintained in one lesson file.
export const kanji = lesson15.kanji;
export const kanjiChapters = [...new Set(kanji.map((item) => item.chapter))];
