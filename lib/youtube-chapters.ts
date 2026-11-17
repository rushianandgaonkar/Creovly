/** YouTube's chapter rules: the first timestamp is 0:00, there are at least 3, they ascend, and each chapter lasts 10 s or more. */
export const MIN_CHAPTERS = 3;
export const MIN_CHAPTER_SECONDS = 10;

export interface Chapter {
  /** 1-based line number in the pasted text. */
  line: number;
  seconds: number;
  title: string;
}

export interface ParsedChapters {
  chapters: Chapter[];
  /** Non-empty lines without a timestamp. */
  skipped: number[];
}

export type ChapterIssue =
  | { kind: 'first-not-zero' }
  | { kind: 'too-few'; count: number }
  | { kind: 'not-ascending'; line: number }
  | { kind: 'too-short'; line: number; seconds: number }
  | { kind: 'past-end'; line: number }
  | { kind: 'empty-title'; line: number };

// 1:02:03, 01:02:03, 12:34, 2:05 — with an optional surrounding bracket.
const TIME = /(^|[\s([])((?:\d{1,2}:)?\d{1,3}:\d{2})(?=$|[\s)\]\-–—|:.,])/;
const EDGE_SEPARATORS = /^[\s\-–—|:.,)\]]+|[\s\-–—|:,([]+$/g;

function toSeconds(stamp: string): number | null {
  const parts = stamp.split(':').map(Number);
  if (parts.some((part) => !Number.isFinite(part))) return null;
  if (parts.slice(1).some((part) => part >= 60)) return null;
  return parts.reduce((total, part) => total * 60 + part, 0);
}

/** Reads one chapter per line; the timestamp may sit before or after the title. */
export function parseChapters(text: string): ParsedChapters {
  const chapters: Chapter[] = [];
  const skipped: number[] = [];
  text.split(/\r?\n/).forEach((raw, index) => {
    const line = raw.trim();
    if (!line) return;
    const match = line.match(TIME);
    const seconds = match ? toSeconds(match[2]) : null;
    if (!match || seconds === null) {
      skipped.push(index + 1);
      return;
    }
    const start = (match.index ?? 0) + match[1].length;
    const title = (line.slice(0, start) + ' ' + line.slice(start + match[2].length))
      .replace(/[([]\s*[)\]]/g, '')
      .replace(EDGE_SEPARATORS, '')
      .replace(/\s{2,}/g, ' ')
      .trim();
    chapters.push({ line: index + 1, seconds, title });
  });
  return { chapters, skipped };
}

export function validateChapters(chapters: Chapter[], videoSeconds?: number): ChapterIssue[] {
  const issues: ChapterIssue[] = [];
  if (!chapters.length) return issues;
  if (chapters[0].seconds !== 0) issues.push({ kind: 'first-not-zero' });
  if (chapters.length < MIN_CHAPTERS) issues.push({ kind: 'too-few', count: chapters.length });
  chapters.forEach((chapter, index) => {
    if (!chapter.title) issues.push({ kind: 'empty-title', line: chapter.line });
    if (videoSeconds && chapter.seconds >= videoSeconds) issues.push({ kind: 'past-end', line: chapter.line });
    const previous = chapters[index - 1];
    if (previous && chapter.seconds <= previous.seconds) {
      issues.push({ kind: 'not-ascending', line: chapter.line });
      return;
    }
    const next = chapters[index + 1];
    const end = next ? next.seconds : videoSeconds;
    if (end !== undefined && end > chapter.seconds && end - chapter.seconds < MIN_CHAPTER_SECONDS) {
      issues.push({ kind: 'too-short', line: chapter.line, seconds: end - chapter.seconds });
    }
  });
  return issues;
}

export function sortChapters(chapters: Chapter[]): Chapter[] {
  return [...chapters].sort((a, b) => a.seconds - b.seconds);
}

/** Formats seconds as m:ss, or h:mm:ss when hours are needed; `padded` gives 00:00 and 00:00:00. */
export function formatChapterTime(seconds: number, useHours: boolean, padded: boolean): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = String(seconds % 60).padStart(2, '0');
  if (useHours) return `${padded ? String(hours).padStart(2, '0') : hours}:${String(minutes).padStart(2, '0')}:${secs}`;
  return `${padded ? String(minutes).padStart(2, '0') : minutes}:${secs}`;
}

export type ChapterSeparator = ' ' | ' - ' | ' | ' | ' – ';

export function formatChapters(chapters: Chapter[], separator: ChapterSeparator, padded: boolean): string {
  const useHours = chapters.some((chapter) => chapter.seconds >= 3600);
  return chapters
    .map((chapter) => `${formatChapterTime(chapter.seconds, useHours, padded)}${separator}${chapter.title}`.trimEnd())
    .join('\n');
}

/** Length of each chapter in seconds; the last one is only known when the video length is given. */
export function chapterDurations(chapters: Chapter[], videoSeconds?: number): (number | null)[] {
  return chapters.map((chapter, index) => {
    const end = chapters[index + 1]?.seconds ?? videoSeconds;
    return end !== undefined && end > chapter.seconds ? end - chapter.seconds : null;
  });
}
