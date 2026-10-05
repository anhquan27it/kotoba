import manifest from "@/data/pronunciation-audio.json";
import { pronunciationKey } from "./pronunciation";

export interface PronunciationClip {
  text: string;
  reading: string;
  file: string;
  durationMs: number;
  bytes: number;
  sha256: string;
}

export const pronunciationClips = manifest.clips as Record<
  string,
  PronunciationClip
>;

export function pronunciationAudioUrl(
  text: string,
  reading: string,
  basePath = process.env.NEXT_PUBLIC_KOTOBA_BASE_PATH || "",
): string | undefined {
  const clip = pronunciationClips[pronunciationKey(text, reading)];
  return clip ? `${basePath}/audio/pronunciation/${clip.file}` : undefined;
}
