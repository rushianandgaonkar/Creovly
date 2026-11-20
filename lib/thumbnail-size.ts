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
export interface ThumbnailCheck { id: 'minimum' | 'ratio' | 'resolution' | 'format' | 'size'; label: string; level: CheckLevel; detail: string }

export const formatBytes = (bytes: number) =>
  bytes >= 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(2)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`;

/** Reduced ratio such as "16:9", or decimal "1.60:1" when it does not reduce to small numbers. */
export function describeRatio(width: number, height: number): string {
  const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);
  const d = gcd(width, height);
  const w = width / d; const h = height / d;
  return w <= 32 && h <= 32 ? `${w}:${h}` : `${(width / height).toFixed(2)}:1`;
}

export function checkThumbnail(image: { width: number; height: number; bytes: number; type: string }, mode: ThumbnailMode): ThumbnailCheck[] {
  const spec = THUMBNAIL_SPECS[mode];
  const { width, height, bytes, type } = image;
  const side = spec.minSide === 'width' ? width : height;
  const target = spec.width / spec.height;
  const off = Math.abs(width / height - target) / target;
  const checks: ThumbnailCheck[] = [];

  checks.push(side >= THUMBNAIL_SPECS.minPixels
    ? { id: 'minimum', label: 'Minimum size', level: 'pass', detail: `${side} px ${spec.minSide} meets the 640 px minimum.` }
    : { id: 'minimum', label: 'Minimum size', level: 'fail', detail: `${side} px ${spec.minSide} is below YouTube’s 640 px minimum. Use a larger image.` });

  checks.push(off <= 0.01
    ? { id: 'ratio', label: 'Aspect ratio', level: 'pass', detail: `${describeRatio(width, height)} matches ${spec.ratio}.` }
    : { id: 'ratio', label: 'Aspect ratio', level: 'warn', detail: `${describeRatio(width, height)} is not ${spec.ratio}, so it will not fill the frame exactly. Crop or pad it to ${spec.ratio}.` });

  checks.push(width >= spec.width && height >= spec.height
    ? { id: 'resolution', label: 'Resolution', level: 'pass', detail: `At or above the recommended ${spec.width} × ${spec.height}.` }
    : { id: 'resolution', label: 'Resolution', level: 'info', detail: `YouTube recommends ${spec.width} × ${spec.height}. Smaller images still upload if they meet the minimum.` });

  checks.push(THUMBNAIL_SPECS.formats.includes(type)
    ? { id: 'format', label: 'File format', level: 'pass', detail: `${type === 'image/png' ? 'PNG' : 'JPG'} is a format YouTube lists.` }
    : { id: 'format', label: 'File format', level: 'warn', detail: 'YouTube’s help page lists JPG and PNG. Convert the file before uploading.' });

  checks.push(bytes <= THUMBNAIL_SPECS.mobileMaxBytes
    ? { id: 'size', label: 'File size', level: 'pass', detail: `${formatBytes(bytes)} is under the 2 MB mobile limit.` }
    : bytes <= THUMBNAIL_SPECS.desktopMaxBytes
      ? { id: 'size', label: 'File size', level: 'warn', detail: `${formatBytes(bytes)} is over the 2 MB limit in the mobile app. It is under the 50 MB desktop limit.` }
      : { id: 'size', label: 'File size', level: 'fail', detail: `${formatBytes(bytes)} is over the 50 MB desktop limit.` });

  return checks;
}
