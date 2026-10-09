import { decodeImage } from './image-compression';
export interface Margins { top: number; bottom: number; left: number; right: number }
export interface ContentBox { x: number; y: number; width: number; height: number }
export const starterMargins: Margins = { top: 10, bottom: 25, left: 5, right: 18 };
export const starterBox: ContentBox = { x: 15, y: 25, width: 50, height: 30 };
export function checkShortsGuide(margins: Margins, box?: ContentBox) {
  if (!Object.values(margins).every((n) => Number.isFinite(n) && n >= 0 && n < 100) || margins.left + margins.right >= 100 || margins.top + margins.bottom >= 100) throw new Error('Margins must leave a visible central area.');
  const center = { x: margins.left, y: margins.top, width: 100 - margins.left - margins.right, height: 100 - margins.top - margins.bottom };
  const overlaps: string[] = [];
  if (box) {
    if (![box.x, box.y, box.width, box.height].every(Number.isFinite) || box.x < 0 || box.y < 0 || box.width <= 0 || box.height <= 0 || box.x + box.width > 100 || box.y + box.height > 100) throw new Error('Keep the content box within the frame.');
    if (box.x < center.x) overlaps.push('left');
    if (box.y < center.y) overlaps.push('top');
    if (box.x + box.width > 100 - margins.right) overlaps.push('right');
    if (box.y + box.height > 100 - margins.bottom) overlaps.push('bottom');
  }
  return { center, overlaps };
}

export async function exportShortsGuide(file: File, margins: Margins, box?: ContentBox, signal?: AbortSignal) {
  const { center } = checkShortsGuide(margins, box);
  const checkAbort = () => { if (signal?.aborted) throw new DOMException('Cancelled', 'AbortError'); };
  checkAbort(); const bitmap = await decodeImage(file);
  const canvas = document.createElement('canvas');
  try {
    checkAbort(); canvas.width = 1080; canvas.height = 1920;
    const ctx = canvas.getContext('2d'); if (!ctx) throw new Error('Could not create a canvas. Try another browser.');
    ctx.fillStyle = '#111111'; ctx.fillRect(0, 0, 1080, 1920);
    const scale = Math.min(1080 / bitmap.width, 1920 / bitmap.height);
    ctx.drawImage(bitmap, (1080 - bitmap.width * scale) / 2, (1920 - bitmap.height * scale) / 2, bitmap.width * scale, bitmap.height * scale);
    const x = center.x * 10.8; const y = center.y * 19.2; const w = center.width * 10.8; const h = center.height * 19.2;
    ctx.fillStyle = 'rgba(220,38,38,0.35)';
    ctx.fillRect(0, 0, 1080, y); ctx.fillRect(0, y + h, 1080, 1920 - y - h); ctx.fillRect(0, y, x, h); ctx.fillRect(x + w, y, 1080 - x - w, h);
    ctx.strokeStyle = '#4ade80'; ctx.lineWidth = 6; ctx.strokeRect(x, y, w, h);
    if (box) { ctx.strokeStyle = '#facc15'; ctx.setLineDash([16, 10]); ctx.strokeRect(box.x * 10.8, box.y * 19.2, box.width * 10.8, box.height * 19.2); ctx.setLineDash([]); }
    ctx.fillStyle = '#111111'; ctx.fillRect(0, 0, 1080, 100); ctx.fillStyle = '#ffffff'; ctx.font = '26px sans-serif'; ctx.fillText('CREOVLY · MANUAL PLANNING GUIDE · NOT AN OFFICIAL SAFE ZONE', 24, 58);
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'));
    checkAbort(); if (!blob) throw new Error('Could not export the guide. Try again.'); return blob;
  } finally { bitmap.close(); canvas.width = 0; canvas.height = 0; }
}
