import lesson15 from "@/data/lessons/n4-15";

// Compatibility export; chapter 15 is maintained in one lesson file.
export const vocabulary = lesson15.vocabulary;
export const vocabularyChapters = [
  ...new Set(vocabulary.map((item) => item.chapter)),
];
