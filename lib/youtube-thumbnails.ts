export type ThumbnailSizeKey = 'maxresdefault' | 'sddefault' | 'hqdefault' | 'mqdefault' | 'default';

export interface ThumbnailSize {
  key: ThumbnailSizeKey;
  width: number;
  height: number;
}

/** Image sizes YouTube publishes for every video, largest first. maxres and sd exist only for some videos. */
export const THUMBNAIL_SIZES: ThumbnailSize[] = [
  { key: 'maxresdefault', width: 1280, height: 720 },
  { key: 'sddefault', width: 640, height: 480 },
  { key: 'hqdefault', width: 480, height: 360 },
  { key: 'mqdefault', width: 320, height: 180 },
  { key: 'default', width: 120, height: 90 },
];

export function thumbnailUrl(videoId: string, key: ThumbnailSizeKey): string {
  return `https://i.ytimg.com/vi/${videoId}/${key}.jpg`;
}

export function thumbnailFileName(videoId: string, key: ThumbnailSizeKey): string {
  return `youtube-thumbnail-${videoId}-${key}.jpg`;
}

/** When a size does not exist, YouTube answers with a 120 × 90 grey placeholder instead of an error. */
export function isPlaceholderImage(key: ThumbnailSizeKey, naturalWidth: number): boolean {
  return key !== 'default' && naturalWidth > 0 && naturalWidth <= 120;
}

/** True when width:height is within 2% of 16:9. */
export function isSixteenByNine(width: number, height: number): boolean {
  if (!width || !height) return false;
  return Math.abs(width / height / (16 / 9) - 1) <= 0.02;
}
