// Builds YouTube hashtags from the creator's own words. No lookup, no AI.
const STOP_WORDS = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from', 'how', 'in', 'is', 'it', 'my', 'of',
  'on', 'or', 'the', 'this', 'that', 'to', 'vs', 'with', 'your', 'you', 'what', 'why', 'when',
]);

/** YouTube ignores every hashtag on a video that has more than 60. */
export const YOUTUBE_HASHTAG_LIMIT = 60;
/** Creovly's own cap so the list stays short and specific. */
export const DEFAULT_MAX_HASHTAGS = 15;

const capitalise = (word: string) =>
  word === word.toLocaleLowerCase() ? word.charAt(0).toLocaleUpperCase() + word.slice(1) : word;

/** "home workout" -> "#HomeWorkout". Returns null when nothing usable remains or the tag is only digits. */
export function toHashtag(phrase: string): string | null {
  const words = phrase.normalize('NFKC').split(/[^\p{L}\p{N}]+/u).filter(Boolean);
  if (!words.length) return null;
  const body = words.map(capitalise).join('');
  if (/^\p{N}+$/u.test(body)) return null;
  return `#${body}`;
}

export interface HashtagResult {
  hashtags: string[];
  /** Candidates left out because of the cap. */
  dropped: number;
}

export function generateHashtags(input: string, options: { shorts?: boolean; max?: number } = {}): HashtagResult {
  const max = options.max ?? DEFAULT_MAX_HASHTAGS;
  const phrases = input.split(/[,;\n#]+/).map((part) => part.trim()).filter(Boolean);
  const candidates: string[] = [];
  // Whole phrases first, then the meaningful single words inside multi-word phrases.
  for (const phrase of phrases) candidates.push(phrase);
  for (const phrase of phrases) {
    const words = phrase.split(/[^\p{L}\p{N}]+/u).filter(Boolean);
    if (words.length < 2) continue;
    for (const word of words) {
      if (word.length >= 3 && !STOP_WORDS.has(word.toLocaleLowerCase())) candidates.push(word);
    }
  }
  if (options.shorts) candidates.push('Shorts');

  const seen = new Set<string>();
  const all: string[] = [];
  for (const candidate of candidates) {
    const tag = toHashtag(candidate);
    if (!tag) continue;
    const key = tag.toLocaleLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    all.push(tag);
  }
  // Keep #Shorts even when the cap trims the list.
  const shortsTag = options.shorts ? all.find((tag) => tag.toLocaleLowerCase() === '#shorts') : undefined;
  const rest = all.filter((tag) => tag !== shortsTag);
  const room = shortsTag ? max - 1 : max;
  const hashtags = [...rest.slice(0, Math.max(0, room)), ...(shortsTag ? [shortsTag] : [])];
  return { hashtags, dropped: all.length - hashtags.length };
}
