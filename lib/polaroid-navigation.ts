export function clampCard(index: number, count: number) {
  return Math.max(0, Math.min(index, count - 1));
}

export function nearestCard(scroll: number, offsets: number[]) {
  return offsets.reduce((best, offset, index) => Math.abs(offset - scroll) < Math.abs(offsets[best] - scroll) ? index : best, 0);
}

/** Adapted from the supplied hanging Polaroid reference's centered string curve. */
export function stringY(x: number, width: number, sag: number) {
  if (width <= 0) return 0;
  const t = Math.max(0, Math.min(1, x / width));
  return 4 * sag * t * (1 - t);
}
