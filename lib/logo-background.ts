import { decodeImage } from './image-compression';

export const MAX_LOGO_PIXELS = 8_000_000;
export function validateLogoSize(width: number, height: number) {
  if (!Number.isInteger(width) || !Number.isInteger(height) || width < 1 || height < 1 || width > 8192 || height > 8192 || width * height > MAX_LOGO_PIXELS) throw new Error('Use a logo under 8 megapixels and 8,192 pixels per side.');
}
const checkAbort = (signal?: AbortSignal) => { if (signal?.aborted) throw new DOMException('Cancelled', 'AbortError'); };

/** Remove only matching pixels reachable from the image border, using four-way connectivity. */
export async function eraseLogoBackground(data: Uint8ClampedArray, width: number, height: number, color: string, tolerance: number, signal?: AbortSignal) {
  validateLogoSize(width, height);
  if (data.length !== width * height * 4 || !/^#[\da-f]{6}$/i.test(color) || !Number.isFinite(tolerance) || tolerance < 0 || tolerance > 100) throw new Error('Check the background color, tolerance, and image data.');
  checkAbort(signal);
  const rgb = [1, 3, 5].map((offset) => parseInt(color.slice(offset, offset + 2), 16));
  const threshold = tolerance * 255 / 100;
  const seen = new Uint8Array(width * height);
  const queue = new Uint32Array(width * height);
  let head = 0; let tail = 0; let removed = 0;
  const add = (pixel: number) => {
    if (seen[pixel]) return;
    seen[pixel] = 1;
    const at = pixel * 4;
    if (data[at + 3] === 0 || Math.max(Math.abs(data[at] - rgb[0]), Math.abs(data[at + 1] - rgb[1]), Math.abs(data[at + 2] - rgb[2])) <= threshold) queue[tail++] = pixel;
  };
  for (let x = 0; x < width; x++) { add(x); add((height - 1) * width + x); }
  for (let y = 0; y < height; y++) { add(y * width); add(y * width + width - 1); }
  while (head < tail) {
    const pixel = queue[head++]; const at = pixel * 4;
    if (data[at + 3] > 0) removed++;
    data[at + 3] = 0;
    const x = pixel % width;
    if (x > 0) add(pixel - 1);
    if (x < width - 1) add(pixel + 1);
    if (pixel >= width) add(pixel - width);
    if (pixel < width * (height - 1)) add(pixel + width);
    if (head % 65536 === 0) { await new Promise<void>((resolve) => setTimeout(resolve, 0)); checkAbort(signal); }
  }
  checkAbort(signal);
  return removed;
}

export async function readLogo(file: File) {
  const bitmap = await decodeImage(file);
  try {
    validateLogoSize(bitmap.width, bitmap.height);
    const canvas = document.createElement('canvas'); canvas.width = bitmap.width; canvas.height = bitmap.height;
    try {
      const context = canvas.getContext('2d');
      if (!context) throw new Error('Your browser could not create an image canvas.');
      context.drawImage(bitmap, 0, 0);
      const pixel = context.getImageData(0, 0, 1, 1).data;
      return { width: bitmap.width, height: bitmap.height, color: pixel[3] === 0 ? '#ffffff' : '#' + Array.from(pixel.slice(0, 3)).map((v) => v.toString(16).padStart(2, '0')).join('') };
    } finally { canvas.width = 0; canvas.height = 0; }
  } finally { bitmap.close(); }
}

export async function removeLogoBackground(file: File, color: string, tolerance: number, signal?: AbortSignal) {
  checkAbort(signal);
  const bitmap = await decodeImage(file);
  const canvas = document.createElement('canvas');
  try {
    validateLogoSize(bitmap.width, bitmap.height); checkAbort(signal);
    canvas.width = bitmap.width; canvas.height = bitmap.height;
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Your browser could not create an image canvas.');
    context.drawImage(bitmap, 0, 0);
    const pixels = context.getImageData(0, 0, bitmap.width, bitmap.height);
    const removed = await eraseLogoBackground(pixels.data, bitmap.width, bitmap.height, color, tolerance, signal);
    context.putImageData(pixels, 0, 0);
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'));
    checkAbort(signal);
    if (!blob || blob.type !== 'image/png') throw new Error('PNG export failed. Please try another browser.');
    return { blob, width: bitmap.width, height: bitmap.height, removed };
  } finally { bitmap.close(); canvas.width = 0; canvas.height = 0; }
}
