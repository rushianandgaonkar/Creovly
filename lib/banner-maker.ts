// Layout and drawing for the YouTube banner maker. Canvas sizes follow YouTube's banner guidance.
export const BANNER = { width: 2560, height: 1440, maxBytes: 6 * 1024 * 1024 };
/** Visible on every device. */
export const SAFE_AREA = { width: 1546, height: 423 };
/** Desktop shows the full width, same height as the safe area. */
export const DESKTOP_AREA = { width: 2560, height: 423 };

export interface Rect { x: number; y: number; width: number; height: number }

export const centeredRect = (width: number, height: number): Rect =>
  ({ x: (BANNER.width - width) / 2, y: (BANNER.height - height) / 2, width, height });

/** Scale an image to cover the banner, centred, like CSS object-fit: cover. */
export function coverRect(imageWidth: number, imageHeight: number, target: Rect = centeredRect(BANNER.width, BANNER.height)): Rect {
  const scale = Math.max(target.width / imageWidth, target.height / imageHeight);
  const width = imageWidth * scale; const height = imageHeight * scale;
  return { x: target.x + (target.width - width) / 2, y: target.y + (target.height - height) / 2, width, height };
}

/** Largest size from `start` down to `min` whose measured width fits `maxWidth`. */
export function fitFontSize(measure: (size: number) => number, maxWidth: number, start: number, min = 24): number {
  let size = start;
  while (size > min && measure(size) > maxWidth) size -= 2;
  return size;
}

export type BannerAlign = 'left' | 'center' | 'right';
export type BannerFont = 'display' | 'sans' | 'serif' | 'mono';

export interface BannerDesign {
  background: string;
  textColor: string;
  title: string;
  tagline: string;
  font: BannerFont;
  align: BannerAlign;
  /** 0 to 0.7: black layer over a photo so text stays readable. */
  dim: number;
}

// Default artwork colours: user content drawn on the canvas, not interface styling.
export const DEFAULT_DESIGN: BannerDesign = {
  background: '#1A1714', textColor: '#F5F3EE', title: 'Your Channel Name', tagline: 'New videos every week', font: 'display', align: 'center', dim: 0.35,
};

const PAD = 48;

/** Where the title and tagline sit: inside the safe area, vertically centred as a block. */
export function textLayout(design: BannerDesign, measure: (text: string, size: number, weight: number) => number) {
  const safe = centeredRect(SAFE_AREA.width, SAFE_AREA.height);
  const maxWidth = safe.width - PAD * 2;
  const titleSize = design.title ? fitFontSize((s) => measure(design.title, s, 700), maxWidth, 150) : 0;
  const taglineSize = design.tagline ? fitFontSize((s) => measure(design.tagline, s, 500), maxWidth, 56) : 0;
  const gap = titleSize && taglineSize ? 28 : 0;
  const blockHeight = titleSize + gap + taglineSize;
  const top = BANNER.height / 2 - blockHeight / 2;
  const x = design.align === 'left' ? safe.x + PAD : design.align === 'right' ? safe.x + safe.width - PAD : BANNER.width / 2;
  return { x, titleSize, taglineSize, titleY: top, taglineY: top + titleSize + gap, maxWidth };
}

export function drawBanner(ctx: CanvasRenderingContext2D, design: BannerDesign, families: Record<BannerFont, string>, image?: { source: CanvasImageSource; width: number; height: number }) {
  ctx.clearRect(0, 0, BANNER.width, BANNER.height);
  ctx.fillStyle = design.background;
  ctx.fillRect(0, 0, BANNER.width, BANNER.height);
  if (image) {
    const r = coverRect(image.width, image.height);
    ctx.drawImage(image.source, r.x, r.y, r.width, r.height);
    if (design.dim > 0) {
      ctx.fillStyle = `rgba(0, 0, 0, ${Math.min(0.7, design.dim)})`;
      ctx.fillRect(0, 0, BANNER.width, BANNER.height);
    }
  }
  const family = families[design.font];
  const measure = (text: string, size: number, weight: number) => { ctx.font = `${weight} ${size}px ${family}`; return ctx.measureText(text).width; };
  const layout = textLayout(design, measure);
  ctx.fillStyle = design.textColor;
  ctx.textAlign = design.align;
  ctx.textBaseline = 'top';
  if (layout.titleSize) { ctx.font = `700 ${layout.titleSize}px ${family}`; ctx.fillText(design.title, layout.x, layout.titleY); }
  if (layout.taglineSize) { ctx.font = `500 ${layout.taglineSize}px ${family}`; ctx.fillText(design.tagline, layout.x, layout.taglineY); }
}
