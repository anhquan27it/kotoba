import lesson15 from "@/data/lessons/n4-15";

// Compatibility export; never keep a second set of grammar rules or tables.
export const grammar = lesson15.grammar;
export const plainFormTables = lesson15.referenceTables!;
export const grammarChapters = [
  ...new Set(grammar.map((item) => item.chapter)),
];
