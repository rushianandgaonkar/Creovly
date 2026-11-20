// YouTube custom thumbnail rules, from support.google.com/youtube/answer/72431 (checked 2026-11-20).
export const THUMBNAIL_SPECS = {
  video: { width: 3840, height: 2160, ratio: '16:9', minSide: 'width' as const },
  shorts: { width: 2160, height: 3840, ratio: '9:16', minSide: 'height' as const },
  minPixels: 640,
  mobileMaxBytes: 2 * 1024 * 1024,
  desktopMaxBytes: 50 * 1024 * 1024,
  formats: ['image/jpeg', 'image/png'],
};

export type ThumbnailMode = 'video' | 'shorts';
export type CheckLevel = 'pass' | 'info' | 'warn' | 'fail';
export interface ThumbnailCheck {
  id: 'minimum' | 'ratio' | 'resolution' | 'format' | 'size';
  level: CheckLevel;
  side?: number;
  minSide?: 'width' | 'height';
  actualRatio?: string;
  targetRatio?: string;
  targetWidth?: number;
  targetHeight?: number;
  format?: string;
  bytes?: number;
}

export const formatBytes = (bytes: number) =>
  bytes >= 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(2)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`;

/** Reduced ratio such as "16:9", or decimal "1.60:1" when it does not reduce to small numbers. */
export function describeRatio(width: number, height: number): string {
  const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);
  const d = gcd(width, height);
  const w = width / d; const h = height / d;
  return w <= 32 && h <= 32 ? `${w}:${h}` : `${(width / height).toFixed(2)}:1`;
}

export function checkThumbnail(
  image: { width: number; height: number; bytes: number; type: string },
  mode: ThumbnailMode
): ThumbnailCheck[] {
  const spec = THUMBNAIL_SPECS[mode];
  const { width, height, bytes, type } = image;
  const side = spec.minSide === 'width' ? width : height;
  const target = spec.width / spec.height;
  const off = Math.abs(width / height - target) / target;
  const checks: ThumbnailCheck[] = [];

  checks.push({
    id: 'minimum',
    level: side >= THUMBNAIL_SPECS.minPixels ? 'pass' : 'fail',
    side,
    minSide: spec.minSide,
  });

  checks.push({
    id: 'ratio',
    level: off <= 0.01 ? 'pass' : 'warn',
    actualRatio: describeRatio(width, height),
    targetRatio: spec.ratio,
  });

  checks.push({
    id: 'resolution',
    level: width >= spec.width && height >= spec.height ? 'pass' : 'info',
    targetWidth: spec.width,
    targetHeight: spec.height,
  });

  checks.push({
    id: 'format',
    level: THUMBNAIL_SPECS.formats.includes(type) ? 'pass' : 'warn',
    format: type === 'image/png' ? 'PNG' : 'JPG',
  });

  checks.push({
    id: 'size',
    level:
      bytes <= THUMBNAIL_SPECS.mobileMaxBytes
        ? 'pass'
        : bytes <= THUMBNAIL_SPECS.desktopMaxBytes
          ? 'warn'
          : 'fail',
    bytes,
  });

  return checks;
}
