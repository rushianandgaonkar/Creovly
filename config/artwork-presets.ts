import type { OutputFormat } from '@/lib/image-compression';
import type { FitMode } from '@/lib/image-resize';

export type ArtworkPreset = {
  id: string; label: string; width: number; height: number; description: string;
  format: OutputFormat; fit: FitMode; background: 'white' | 'transparent';
  primary?: boolean;
};

export const artworkPresets: ArtworkPreset[] = [
  { id: 'thumbnail', label: 'Thumbnail', width: 1280, height: 720, description: 'A familiar 16:9 canvas for your next video.', format: 'image/jpeg', fit: 'cover', background: 'white', primary: true },
  { id: 'banner', label: 'Channel banner', width: 2560, height: 1440, description: 'Keep your name and logo inside the central guide. YouTube crops banners differently across devices.', format: 'image/jpeg', fit: 'cover', background: 'white', primary: true },
  { id: 'profile', label: 'Profile picture', width: 800, height: 800, description: 'A Creovly square preset with a circular framing preview. Leave space around your face or logo.', format: 'image/png', fit: 'cover', background: 'transparent', primary: true },
  { id: 'watermark', label: 'Watermark asset', width: 150, height: 150, description: 'Prepare a square channel watermark. Transparent padding preserves an existing cutout; this does not remove its background.', format: 'image/png', fit: 'contain', background: 'transparent', primary: true },
  { id: 'full-hd', label: 'Full HD', width: 1920, height: 1080, description: 'A larger 16:9 canvas.', format: 'image/jpeg', fit: 'cover', background: 'white' },
  { id: '4k', label: '4K UHD', width: 3840, height: 2160, description: 'A high-resolution 16:9 canvas. Enlarging cannot restore lost detail.', format: 'image/jpeg', fit: 'cover', background: 'white' },
  { id: 'shorts', label: 'Vertical artwork', width: 1080, height: 1920, description: 'A 9:16 canvas for vertical artwork. This does not set a Shorts thumbnail on YouTube.', format: 'image/jpeg', fit: 'cover', background: 'white' },
];

// YouTube publishes 1235×338 at its minimum banner canvas of 2048×1152.
// Ratios keep the preview consistent on the recommended 2560×1440 canvas.
export function artworkGuide(id: string) {
  if (id === 'banner') {
    const width = 1235 / 2048 * 100, height = 338 / 1152 * 100;
    return { shape: 'rectangle' as const, width, height, left: (100 - width) / 2, top: (100 - height) / 2 };
  }
  if (id === 'profile') return { shape: 'circle' as const, width: 100, height: 100, left: 0, top: 0 };
  return undefined;
}

export function artworkWarnings(id: string, bytes: number, format: string): string[] {
  const warnings: string[] = [];
  if (id === 'banner' && bytes > 6_000_000) warnings.push('This banner exceeds 6 MB. Compress it before uploading to YouTube.');
  if (id === 'watermark' && bytes >= 1_000_000) warnings.push('YouTube requires a watermark smaller than 1 MB. Compress this output before uploading.');
  if (['banner', 'profile', 'watermark'].includes(id) && format === 'image/webp') warnings.push('Choose JPEG or PNG for this YouTube artwork upload. WebP remains available for other uses.');
  return warnings;
}
