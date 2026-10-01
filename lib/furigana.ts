export interface ReadingSegment {
  text: string;
  reading?: string;
}

export const hasKanji = (text: string) => /[\u3400-\u9fff々]/u.test(text);

export function toHiragana(text: string): string {
  return text
    .normalize("NFKC")
    .replace(/[\u30a1-\u30f6]/g, (char) =>
      String.fromCharCode(char.charCodeAt(0) - 0x60),
    );
}

// Keep kana outside ruby: 食べ物 -> 食(た) + べ + 物(もの).
// If a reading cannot be divided reliably, annotate the complete word.
export function splitReading(
  text: string,
  rawReading: string,
): ReadingSegment[] {
  const reading = toHiragana(rawReading);
  if (!hasKanji(text) || !reading) return [{ text }];
  const parts = text.match(/[\u3400-\u9fff々]+|[^\u3400-\u9fff々]+/gu) ?? [
    text,
  ];
  function align(index: number, offset: number): ReadingSegment[] | undefined {
    if (index === parts.length)
      return offset === reading.length ? [] : undefined;
    const part = parts[index];
    if (!hasKanji(part)) {
      const kana = toHiragana(part);
      if (!reading.startsWith(kana, offset)) return;
      const rest = align(index + 1, offset + kana.length);
      return rest && [{ text: part }, ...rest];
    }
    for (let end = offset + 1; end <= reading.length; end++) {
      const rest = align(index + 1, end);
      if (rest)
        return [{ text: part, reading: reading.slice(offset, end) }, ...rest];
    }
  }
  return align(0, 0) ?? [{ text, reading }];
}
