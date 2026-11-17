export type CountUnit = 'words' | 'characters';
export type PaceKey = 'slow' | 'average' | 'fast' | 'reading';

/**
 * Common planning estimates, not measurements of any one speaker.
 * Words per minute for space-separated languages; characters per minute for Japanese, Chinese and Korean scripts.
 */
export const PACES: Record<CountUnit, Partial<Record<PaceKey, number>>> = {
  words: { slow: 120, average: 150, fast: 180, reading: 238 },
  characters: { slow: 250, average: 300, fast: 350 },
};

const CJK = /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]/gu;
const LETTER = /[\p{L}\p{N}]/gu;

export function countWords(text: string): number {
  return text.split(/\s+/).filter((token) => /[\p{L}\p{N}]/u.test(token)).length;
}

/** Characters excluding spaces and line breaks, the usual count for Japanese and Korean scripts. */
export function countCharacters(text: string): number {
  return text.replace(/\s/g, '').length;
}

export function countParagraphs(text: string): number {
  return text.split(/\n\s*\n/).filter((block) => block.trim()).length;
}

/** Japanese, Chinese and Korean scripts are timed by characters; most other languages by words. */
export function detectUnit(text: string): CountUnit {
  const letters = text.match(LETTER)?.length ?? 0;
  const cjk = text.match(CJK)?.length ?? 0;
  return letters > 0 && cjk / letters >= 0.3 ? 'characters' : 'words';
}

/** Seconds to read `count` units aloud at `perMinute`, plus optional pauses between paragraphs. */
export function speakingSeconds(count: number, perMinute: number, paragraphs = 0, pauseSeconds = 0): number {
  if (count <= 0 || perMinute <= 0) return 0;
  return Math.round((count / perMinute) * 60 + Math.max(paragraphs - 1, 0) * Math.max(pauseSeconds, 0));
}

/** Units needed to fill `targetSeconds` at `perMinute`. */
export function countForDuration(targetSeconds: number, perMinute: number): number {
  if (targetSeconds <= 0 || perMinute <= 0) return 0;
  return Math.round((targetSeconds / 60) * perMinute);
}

/** 75 → "1:15", 3723 → "1:02:03" */
export function formatDuration(totalSeconds: number): string {
  const total = Math.max(Math.round(totalSeconds), 0);
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = String(total % 60).padStart(2, '0');
  return hours ? `${hours}:${String(minutes).padStart(2, '0')}:${seconds}` : `${minutes}:${seconds}`;
}
