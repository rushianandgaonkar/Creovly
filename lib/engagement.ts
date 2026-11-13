export type Platform = 'youtube' | 'instagram' | 'tiktok';
export type EngagementField = 'views' | 'likes' | 'comments' | 'shares' | 'saves' | 'followers' | 'reach';
export type Basis = 'views' | 'followers' | 'reach';
export type EngagementInput = Partial<Record<EngagementField, string>>;

export const platformFields: Record<Platform, { key: EngagementField; optional?: true }[]> = {
  youtube: [{ key: 'views' }, { key: 'likes' }, { key: 'comments' }, { key: 'shares', optional: true }, { key: 'followers', optional: true }],
  instagram: [{ key: 'followers' }, { key: 'likes' }, { key: 'comments' }, { key: 'saves', optional: true }, { key: 'shares', optional: true }, { key: 'reach', optional: true }],
  tiktok: [{ key: 'views' }, { key: 'likes' }, { key: 'comments' }, { key: 'shares' }, { key: 'saves', optional: true }, { key: 'followers', optional: true }],
};

/** First entry is the platform default. */
export const platformBases: Record<Platform, Basis[]> = {
  youtube: ['views', 'followers'],
  instagram: ['followers', 'reach'],
  tiktok: ['views', 'followers'],
};

const INTERACTIONS: EngagementField[] = ['likes', 'comments', 'shares', 'saves'];
export const MAX_ROWS = 20;

export interface EngagementResult {
  rate: number;
  total: number;
  divisor: number;
  basis: Basis;
  parts: { key: EngagementField; value: number; share: number | null }[];
  commentsPer100Likes: number | null;
}

export type EngagementOutcome =
  | { ok: true; result: EngagementResult }
  | { ok: false; error: 'missing' | 'invalid' | 'zero'; fields: EngagementField[] };

/** Blank → null, whole number ≥ 0 → number, anything else → NaN. */
export function parseCount(raw: string | undefined): number | null {
  const text = (raw ?? '').trim();
  if (!text) return null;
  return /^\d+$/.test(text) ? Number(text) : NaN;
}

/** (likes + comments + shares + saves) ÷ basis × 100. Blank optional fields count as 0. */
export function calculateEngagement(platform: Platform, basis: Basis, input: EngagementInput): EngagementOutcome {
  const fields = platformFields[platform];
  const values: Partial<Record<EngagementField, number>> = {};
  const missing: EngagementField[] = [];
  const invalid: EngagementField[] = [];
  for (const { key, optional } of fields) {
    const value = parseCount(input[key]);
    if (value === null) {
      if (!optional) missing.push(key);
      values[key] = 0;
    } else if (Number.isNaN(value)) invalid.push(key);
    else values[key] = value;
  }
  if (invalid.length) return { ok: false, error: 'invalid', fields: invalid };
  if (missing.length) return { ok: false, error: 'missing', fields: missing };

  const divisor = values[basis] ?? 0;
  if (!divisor) return { ok: false, error: 'zero', fields: [basis] };

  const counted = fields.filter((field) => INTERACTIONS.includes(field.key)).map(({ key }) => ({ key, value: values[key] ?? 0 }));
  const total = counted.reduce((sum, part) => sum + part.value, 0);
  return {
    ok: true,
    result: {
      rate: (total / divisor) * 100,
      total,
      divisor,
      basis,
      parts: counted.map((part) => ({ ...part, share: total ? (part.value / total) * 100 : null })),
      commentsPer100Likes: values.likes ? ((values.comments ?? 0) / values.likes) * 100 : null,
    },
  };
}

// Spreadsheet pastes keep empty cells; otherwise split on semicolons, whitespace, then commas.
function splitRow(line: string): string[] {
  if (line.includes('\t')) return line.split('\t');
  if (line.includes(';')) return line.split(';');
  if (/\s/.test(line.trim())) return line.trim().split(/\s+/);
  return line.split(',');
}

export interface AverageResult {
  count: number;
  skipped: number[];
  truncated: boolean;
  /** Mean of each post's rate. */
  rate: number | null;
  /** Pooled totals across counted posts, used for the interaction breakdown. */
  summary: EngagementResult | null;
}

/** One post per line, columns in platformFields order. Counts may use thousands separators. */
export function calculateAverage(platform: Platform, basis: Basis, text: string): AverageResult {
  const lines = text.split(/\r?\n/).filter((line) => line.trim());
  const keys = platformFields[platform].map((field) => field.key);
  const rates: number[] = [];
  const skipped: number[] = [];
  const sums: Partial<Record<EngagementField, number>> = {};

  lines.slice(0, MAX_ROWS).forEach((line, index) => {
    const cells = splitRow(line).map((cell) => cell.replace(/[\s.,'’_]/g, ''));
    const input: EngagementInput = Object.fromEntries(keys.map((key, i) => [key, cells[i] === '-' ? '' : cells[i] ?? '']));
    const outcome = calculateEngagement(platform, basis, input);
    if (!outcome.ok) {
      skipped.push(index + 1);
      return;
    }
    rates.push(outcome.result.rate);
    for (const key of keys) sums[key] = (sums[key] ?? 0) + (parseCount(input[key]) ?? 0);
  });

  const pooled = rates.length
    ? calculateEngagement(platform, basis, Object.fromEntries(Object.entries(sums).map(([key, value]) => [key, String(value)])))
    : null;
  return {
    count: rates.length,
    skipped,
    truncated: lines.length > MAX_ROWS,
    rate: rates.length ? rates.reduce((sum, rate) => sum + rate, 0) / rates.length : null,
    summary: pooled?.ok ? pooled.result : null,
  };
}
