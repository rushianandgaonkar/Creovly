const VIDEO_ID = /^[A-Za-z0-9_-]{11}$/;
const CHANNEL_ID = /^UC[A-Za-z0-9_-]{22}$/;
const HANDLE = /^[\p{L}\p{M}\p{N}._·-]{3,30}$/u;
const YOUTUBE_HOST = /^(?:www\.|m\.|music\.)?youtube(?:-nocookie)?\.com$/i;

function toUrl(input: string): URL | null {
  try {
    return new URL(/^[a-z][a-z\d+.-]*:\/\//i.test(input) ? input : `https://${input}`);
  } catch {
    return null;
  }
}

function decode(segment: string): string {
  try {
    return decodeURIComponent(segment);
  } catch {
    return segment;
  }
}

/** Extracts the 11-character video ID from watch, youtu.be, Shorts, live, embed and mobile URLs. */
export function parseVideoId(input: string): string | null {
  const raw = input.trim();
  if (VIDEO_ID.test(raw)) return raw;
  const url = toUrl(raw);
  if (!url) return null;
  const host = url.hostname.toLowerCase();
  let id: string | null | undefined;
  if (host === 'youtu.be' || host === 'www.youtu.be') id = url.pathname.split('/')[1];
  else if (YOUTUBE_HOST.test(host)) {
    id = url.pathname.replace(/\/+$/, '') === '/watch'
      ? url.searchParams.get('v')
      : url.pathname.match(/^\/(?:shorts|live|embed|v)\/([^/]+)/)?.[1];
  }
  return id && VIDEO_ID.test(id) ? id : null;
}

export type TimestampResult = { seconds: number } | { error: 'empty' | 'negative' | 'invalid' };

/** Accepts 90, 90s, 1:30, 01:30, 1:02:03 or 1h2m3s and returns whole seconds. */
export function parseTimestamp(input: string): TimestampResult {
  const raw = input.trim().toLowerCase().replace(/\s+/g, '');
  if (!raw) return { error: 'empty' };
  if (raw.startsWith('-')) return { error: 'negative' };
  if (/^\d+(?:\.\d+)?s?$/.test(raw)) return { seconds: Math.floor(parseFloat(raw)) };

  const colon = raw.match(/^(\d+):(\d{1,2})(?::(\d{1,2}))?$/);
  if (colon) {
    const parts = colon.slice(1).filter((part) => part !== undefined).map(Number);
    if (parts.slice(1).some((part) => part >= 60)) return { error: 'invalid' };
    return { seconds: parts.reduce((total, part) => total * 60 + part, 0) };
  }

  const units = raw.match(/^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/);
  if (units && (units[1] || units[2] || units[3])) {
    const [hours, minutes, seconds] = units.slice(1).map((part) => Number(part ?? 0));
    return { seconds: hours * 3600 + minutes * 60 + seconds };
  }
  return { error: 'invalid' };
}

/** 90 → "1:30", 3723 → "1:02:03" */
export function formatTimestamp(total: number): string {
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = String(total % 60).padStart(2, '0');
  return hours ? `${hours}:${String(minutes).padStart(2, '0')}:${seconds}` : `${minutes}:${seconds}`;
}

// Links are rebuilt from the video ID, so any t= or start= in the pasted URL is dropped.
export function timestampLinks(id: string, seconds: number) {
  return {
    short: `https://youtu.be/${id}?t=${seconds}`,
    full: `https://www.youtube.com/watch?v=${id}&t=${seconds}s`,
    embed: `<iframe width="560" height="315" src="https://www.youtube.com/embed/${id}?start=${seconds}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
  };
}

export interface ChannelRef {
  kind: 'handle' | 'channel' | 'c' | 'user';
  id: string;
}

/** Accepts @handle, a UC… channel ID, or youtube.com/@handle, /channel/UC…, /c/name and /user/name URLs. */
export function parseChannel(input: string): ChannelRef | null {
  const raw = input.trim();
  if (!raw) return null;
  if (raw.startsWith('@')) return HANDLE.test(raw.slice(1)) ? { kind: 'handle', id: raw.slice(1) } : null;
  if (CHANNEL_ID.test(raw)) return { kind: 'channel', id: raw };

  const url = toUrl(raw);
  if (!url || !YOUTUBE_HOST.test(url.hostname)) return null;
  const [first = '', second = ''] = url.pathname.split('/').filter(Boolean).map(decode);
  if (first.startsWith('@')) return HANDLE.test(first.slice(1)) ? { kind: 'handle', id: first.slice(1) } : null;
  if (first === 'channel') return CHANNEL_ID.test(second) ? { kind: 'channel', id: second } : null;
  // /c/ and /user/ names can't be resolved to a channel ID without a YouTube API call, so they are kept as given.
  if ((first === 'c' || first === 'user') && second) return { kind: first, id: second };
  return null;
}

export function subscribeLink(channel: ChannelRef): string {
  const path = channel.kind === 'handle' ? `@${channel.id}` : `${channel.kind}/${channel.id}`;
  return `https://www.youtube.com/${path}?sub_confirmation=1`;
}
