import { decodeImage, MAX_PIXELS, type OutputFormat } from './image-compression';

export type FitMode = 'cover' | 'contain';
export interface ResizeOptions {
  width: number; height: number; fit: FitMode; x: number; y: number;
  background: 'white' | 'black' | 'transparent'; format: OutputFormat; quality: number;
}

export function validateResize(options: ResizeOptions) {
  const { width, height, x, y, quality } = options;
  if (![width, height].every((n) => Number.isInteger(n) && n >= 1 && n <= 8192) || width * height > MAX_PIXELS) {
    throw new Error('Enter whole-number dimensions from 1 to 8,192 pixels, up to 24 megapixels total.');
  }
  if (![x, y].every((n) => Number.isFinite(n) && n >= 0 && n <= 100)) throw new Error('Choose a crop position between 0 and 100.');
  if (!Number.isFinite(quality) || quality < .25 || quality > .95) throw new Error('Choose a quality between 25% and 95%.');
  if (!['cover', 'contain'].includes(options.fit) || !['white', 'black', 'transparent'].includes(options.background) || !['image/jpeg', 'image/png', 'image/webp'].includes(options.format)) throw new Error('Choose valid resize settings.');
}

// Position is a percentage of the available crop travel, not of the source image.
export function resizeGeometry(sourceWidth: number, sourceHeight: number, width: number, height: number, fit: FitMode, x = 50, y = 50) {
  const scale = fit === 'cover' ? Math.max(width / sourceWidth, height / sourceHeight) : Math.min(width / sourceWidth, height / sourceHeight);
  const drawWidth = sourceWidth * scale; const drawHeight = sourceHeight * scale;
  return { scale, drawWidth, drawHeight, left: (width - drawWidth) * (fit === 'cover' ? x / 100 : .5), top: (height - drawHeight) * (fit === 'cover' ? y / 100 : .5) };
}

export async function resizeImage(file: File, options: ResizeOptions, signal?: AbortSignal) {
  validateResize(options);
  const checkAbort = () => { if (signal?.aborted) throw new DOMException('Cancelled', 'AbortError'); };
  checkAbort();
  const bitmap = await decodeImage(file);
  const canvas = document.createElement('canvas');
  try {
    checkAbort();
    canvas.width = options.width; canvas.height = options.height;
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Your browser could not create an image canvas. Try another browser.');
    const background = options.background === 'transparent' && options.format === 'image/jpeg' ? 'white' : options.background;
    if (background !== 'transparent') { context.fillStyle = background === 'white' ? '#ffffff' : '#000000'; context.fillRect(0, 0, canvas.width, canvas.height); }
    context.imageSmoothingEnabled = true; context.imageSmoothingQuality = 'high';
    const geometry = resizeGeometry(bitmap.width, bitmap.height, options.width, options.height, options.fit, options.x, options.y);
    context.drawImage(bitmap, geometry.left, geometry.top, geometry.drawWidth, geometry.drawHeight);
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, options.format, options.quality));
    checkAbort();
    if (!blob || blob.type !== options.format) throw new Error('Your browser cannot export this format. Choose JPEG or PNG.');
    return { blob, width: canvas.width, height: canvas.height, upscaled: geometry.scale > 1 };
  } finally { bitmap.close(); canvas.width = 0; canvas.height = 0; }
}
