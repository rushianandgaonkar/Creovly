import { MAX_INPUT_BYTES, MAX_PIXELS, validateImage } from './image-compression';
import { resizeGeometry } from './image-resize';

export const PROFILE_SIZE = 800;
export const MAX_PROFILE_BYTES = 4_000_000;
export type ProfileFormat = 'image/png' | 'image/jpeg';
export interface ProfileCrop { x: number; y: number; zoom: number }

export class ProfileError extends Error {
  constructor(public code: 'unsupported' | 'tooLarge' | 'open' | 'export') {
    super(code);
  }
}

/** Walks GIF blocks and counts image descriptors; more than one means the GIF is animated. */
export function countGifFrames(bytes: Uint8Array): number {
  if (bytes.length < 13) return 0;
  let offset = 13;
  if (bytes[10] & 0x80) offset += 3 * 2 ** ((bytes[10] & 7) + 1);
  const skipSubBlocks = () => {
    while (offset < bytes.length && bytes[offset] !== 0) offset += bytes[offset] + 1;
    offset++;
  };
  let frames = 0;
  while (offset < bytes.length) {
    const block = bytes[offset++];
    if (block === 0x21) {
      offset++;
      skipSubBlocks();
    } else if (block === 0x2c) {
      frames++;
      const flags = bytes[offset + 8];
      offset += 9;
      if (flags & 0x80) offset += 3 * 2 ** ((flags & 7) + 1);
      offset++;
      skipSubBlocks();
    } else break;
  }
  return frames;
}

function checkSize(width: number, height: number) {
  if (!width || !height || width > 8192 || height > 8192 || width * height > MAX_PIXELS) throw new ProfileError('tooLarge');
}

async function decode(file: File): Promise<ImageBitmap> {
  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' });
  } catch {
    throw new ProfileError('open');
  }
  try {
    checkSize(bitmap.width, bitmap.height);
  } catch (error) {
    bitmap.close();
    throw error;
  }
  return bitmap;
}

/** Accepts JPEG, PNG and WebP (checked by validateImage) plus GIF and BMP. Animated GIFs decode to their first frame. */
export async function inspectProfileImage(file: File) {
  if (!file.size) throw new ProfileError('unsupported');
  if (file.size > MAX_INPUT_BYTES) throw new ProfileError('tooLarge');
  const bytes = new Uint8Array(await file.arrayBuffer());
  const view = new DataView(bytes.buffer);
  const signature = String.fromCharCode(...bytes.subarray(0, 6));
  let frames = 1;
  if (signature === 'GIF87a' || signature === 'GIF89a') {
    checkSize(view.getUint16(6, true), view.getUint16(8, true));
    frames = countGifFrames(bytes);
  } else if (signature.startsWith('BM') && bytes.length >= 26) {
    checkSize(Math.abs(view.getInt32(18, true)), Math.abs(view.getInt32(22, true)));
  } else {
    await validateImage(file);
  }
  const bitmap = await decode(file);
  const { width, height } = bitmap;
  bitmap.close();
  return { width, height, frames };
}

/** Draws the square crop onto an 800 × 800 canvas; JPEG quality steps down until the file fits 4 MB. */
export async function exportProfilePicture(file: File, crop: ProfileCrop, format: ProfileFormat, fill: string | null) {
  const bitmap = await decode(file);
  const canvas = document.createElement('canvas');
  canvas.width = PROFILE_SIZE;
  canvas.height = PROFILE_SIZE;
  try {
    const context = canvas.getContext('2d');
    if (!context) throw new ProfileError('export');
    const background = fill ?? (format === 'image/jpeg' ? '#ffffff' : null);
    if (background) {
      context.fillStyle = background;
      context.fillRect(0, 0, PROFILE_SIZE, PROFILE_SIZE);
    }
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = 'high';
    const g = resizeGeometry(bitmap.width, bitmap.height, PROFILE_SIZE, PROFILE_SIZE, 'cover', crop.x, crop.y, crop.zoom);
    context.drawImage(bitmap, g.left, g.top, g.drawWidth, g.drawHeight);

    const encode = (quality?: number) =>
      new Promise<Blob>((resolve, reject) =>
        canvas.toBlob((blob) => (blob && blob.type === format ? resolve(blob) : reject(new ProfileError('export'))), format, quality)
      );
    // An 800 × 800 RGBA PNG stays under ~2.6 MB, so only JPEG needs the size loop.
    if (format === 'image/png') return { blob: await encode(), quality: null };
    let quality = 0.92;
    let blob = await encode(quality);
    while (blob.size > MAX_PROFILE_BYTES && quality > 0.3) {
      quality = Math.round((quality - 0.1) * 100) / 100;
      blob = await encode(quality);
    }
    return { blob, quality };
  } finally {
    bitmap.close();
    canvas.width = 0;
    canvas.height = 0;
  }
}
