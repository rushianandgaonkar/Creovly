export const MAX_INPUT_BYTES = 20_000_000;
export const MAX_PIXELS = 24_000_000;
export type OutputFormat = 'image/jpeg' | 'image/png' | 'image/webp';
export interface CompressionOptions { format: OutputFormat; targetBytes: number; maxQuality: number }
export interface CompressionResult {
  blob: Blob; width: number; height: number; quality: number | null;
  targetMet: boolean; originalUsed: boolean;
}

function checkDimensions(width: number, height: number) {
  if (!width || !height || width > 8192 || height > 8192 || width * height > MAX_PIXELS) {
    throw new Error('This image is too large to process safely. Use an image under 24 megapixels and 8,192 pixels on either side.');
  }
}

// Read signatures and dimensions before allocating a decoded image.
export async function validateImage(file: File): Promise<OutputFormat> {
  if (!file.size) throw new Error('This file is empty. Choose a JPEG, PNG, or WebP image.');
  if (file.size > MAX_INPUT_BYTES) throw new Error('Choose an image under 20 MB.');
  const bytes = new Uint8Array(await file.arrayBuffer());
  const view = new DataView(bytes.buffer);
  const text = (offset: number, length: number) => String.fromCharCode(...bytes.subarray(offset, offset + length));
  if (bytes.length >= 24 && [137, 80, 78, 71, 13, 10, 26, 10].every((byte, index) => bytes[index] === byte) && text(12, 4) === 'IHDR') {
    checkDimensions(view.getUint32(16), view.getUint32(20));
    for (let offset = 8; offset + 12 <= bytes.length;) {
      if (text(offset + 4, 4) === 'acTL') throw new Error('Animated images are not supported. Export a still frame first.');
      offset += view.getUint32(offset) + 12;
    }
    return 'image/png';
  }
  if (bytes.length >= 30 && text(0, 4) === 'RIFF' && text(8, 4) === 'WEBP') {
    for (let offset = 12; offset + 8 <= bytes.length;) {
      const type = text(offset, 4); const size = view.getUint32(offset + 4, true);
      if (type === 'ANIM' || type === 'ANMF' || (type === 'VP8X' && (bytes[offset + 8] & 2))) {
        throw new Error('Animated images are not supported. Export a still frame first.');
      }
      if (type === 'VP8X' && size >= 10 && offset + 18 <= bytes.length) {
        const read24 = (at: number) => bytes[at] + (bytes[at + 1] << 8) + (bytes[at + 2] << 16);
        checkDimensions(read24(offset + 12) + 1, read24(offset + 15) + 1);
      } else if (type === 'VP8 ' && size >= 10 && offset + 18 <= bytes.length) {
        checkDimensions(view.getUint16(offset + 14, true) & 0x3fff, view.getUint16(offset + 16, true) & 0x3fff);
      } else if (type === 'VP8L' && size >= 5 && offset + 13 <= bytes.length) {
        const bits = view.getUint32(offset + 9, true);
        checkDimensions((bits & 0x3fff) + 1, ((bits >>> 14) & 0x3fff) + 1);
      }
      offset += 8 + size + (size % 2);
    }
    return 'image/webp';
  }
  if (bytes.length >= 4 && bytes[0] === 255 && bytes[1] === 216) {
    let found = false;
    for (let offset = 2; offset + 4 < bytes.length;) {
      if (bytes[offset] !== 255) break;
      while (bytes[offset] === 255) offset++;
      const marker = bytes[offset++];
      if (marker === 0xda || marker === 0xd9) break;
      if (marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) continue;
      if (offset + 2 > bytes.length) break;
      const length = view.getUint16(offset);
      if (length < 2 || offset + length > bytes.length) break;
      if ([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf].includes(marker) && length >= 7) {
        checkDimensions(view.getUint16(offset + 5), view.getUint16(offset + 3)); found = true; break;
      }
      offset += length;
    }
    if (!found) throw new Error('This JPEG appears damaged. Export it again and try another file.');
    return 'image/jpeg';
  }
  throw new Error('Unsupported or damaged file. Choose a still JPEG, PNG, or WebP image.');
}

async function decodeValidatedImage(file: File): Promise<ImageBitmap> {
  let bitmap: ImageBitmap;
  try { bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' }); }
  catch { throw new Error('This image could not be opened. Try exporting it again as JPEG, PNG, or WebP.'); }
  try { checkDimensions(bitmap.width, bitmap.height); }
  catch (error) { bitmap.close(); throw error; }
  return bitmap;
}

export async function decodeImage(file: File): Promise<ImageBitmap> {
  await validateImage(file);
  return decodeValidatedImage(file);
}

export async function compressImage(file: File, options: CompressionOptions, signal?: AbortSignal): Promise<CompressionResult> {
  if (!Number.isFinite(options.targetBytes) || options.targetBytes < 10_000 || options.targetBytes > MAX_INPUT_BYTES) throw new Error('Choose a target between 10 KB and 20 MB.');
  if (!Number.isFinite(options.maxQuality) || options.maxQuality < 0.25 || options.maxQuality > 0.95) throw new Error('Choose a quality between 25% and 95%.');
  const checkAbort = () => { if (signal?.aborted) throw new DOMException('Cancelled', 'AbortError'); };
  checkAbort();
  const sourceFormat = await validateImage(file);
  const bitmap = await decodeValidatedImage(file);
  const canvas = document.createElement('canvas');
  const width = bitmap.width; const height = bitmap.height;
  canvas.width = width; canvas.height = height;
  try {
    checkAbort();
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Your browser could not create an image canvas. Try another browser.');
    if (options.format === 'image/jpeg') { context.fillStyle = '#ffffff'; context.fillRect(0, 0, width, height); }
    context.drawImage(bitmap, 0, 0);
    const encode = async (quality: number): Promise<Blob> => {
      checkAbort();
      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, options.format, quality));
      checkAbort();
      if (!blob || blob.type !== options.format) throw new Error('Your browser cannot export this format. Choose JPEG or PNG instead.');
      return blob;
    };
    let quality: number | null = options.format === 'image/png' ? null : options.maxQuality;
    let blob = await encode(options.maxQuality);
    if (blob.size > options.targetBytes && options.format !== 'image/png') {
      let low = 0.25; let high = options.maxQuality;
      const minimum = await encode(low);
      blob = minimum; quality = low;
      if (minimum.size <= options.targetBytes) {
        for (let i = 0; i < 8; i++) {
          const candidateQuality = (low + high) / 2;
          const candidate = await encode(candidateQuality);
          if (candidate.size <= options.targetBytes) { low = candidateQuality; blob = candidate; quality = candidateQuality; }
          else high = candidateQuality;
        }
      }
    }
    // Never replace a smaller original with a larger file of the same format.
    const originalUsed = sourceFormat === options.format && file.size <= blob.size;
    if (originalUsed) { blob = new Blob([file], { type: sourceFormat }); quality = null; }
    return { blob, width, height, quality, targetMet: blob.size <= options.targetBytes, originalUsed };
  } finally { bitmap.close(); canvas.width = 0; canvas.height = 0; }
}

export const formatBytes = (bytes: number) => bytes >= 1_000_000 ? `${(bytes / 1_000_000).toFixed(2)} MB` : `${(bytes / 1_000).toFixed(1)} KB`;
export const formatLabel = (type: string) => ({ 'image/jpeg': 'JPEG', 'image/png': 'PNG', 'image/webp': 'WebP' }[type] ?? 'Image');
export const downloadName = (name: string, format: OutputFormat) => `${name.replace(/\.[^.]+$/, '').replace(/[^\p{L}\p{N}_-]/gu, '-').slice(0, 80) || 'thumbnail'}-compressed.${format === 'image/jpeg' ? 'jpg' : format.split('/')[1]}`;
