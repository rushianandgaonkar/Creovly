export type NicheCategory =
  | 'general'
  | 'gaming'
  | 'tech'
  | 'education'
  | 'vlogs'
  | 'finance'
  | 'entertainment'
  | 'fitness'
  | 'creative';

export interface TagClusterItem {
  id: string;
  text: string;
  charCount: number;
}

export interface TagClusterGroup {
  id: 'primary' | 'secondary' | 'longTail' | 'broad' | 'misspellings';
  tags: TagClusterItem[];
}

export interface TagGenerationResult {
  clusters: TagClusterGroup[];
  allTags: TagClusterItem[];
  defaultSelectedIds: string[];
}

const NICHE_BROAD_KEYWORDS: Record<NicheCategory, string[]> = {
  general: ['guide', 'tutorial', 'tips and tricks', 'how to', 'review', 'best practices', 'trending', '2026'],
  gaming: ['gaming', 'gameplay', 'lets play', 'walkthrough', 'game review', 'pro tips', 'easter eggs', 'secrets'],
  tech: ['technology', 'tech review', 'software', 'gadgets', 'hardware', 'tutorial', 'setup guide', 'tech tips'],
  education: ['tutorial', 'how to', 'course', 'learn online', 'explained', 'study guide', 'educational', 'for beginners'],
  vlogs: ['vlog', 'daily vlog', 'lifestyle', 'day in the life', 'travel vlog', 'routine', 'storytime', 'weekly vlog'],
  finance: ['personal finance', 'investing', 'money', 'crypto', 'stocks', 'passive income', 'wealth building', 'budgeting'],
  entertainment: ['entertainment', 'funny', 'reaction', 'comedy', 'humor', 'skit', 'compilation', 'viral'],
  fitness: ['fitness', 'workout', 'exercise', 'health', 'training', 'weight loss', 'muscle building', 'diet tips'],
  creative: ['creative', 'graphic design', 'art tutorial', 'digital art', 'photography', 'video editing', 'workflow', 'speedart'],
};

const COMMON_MISSPELLINGS_DICT: Record<string, string[]> = {
  beginner: ['beginer', 'begginer'],
  beginners: ['beginers', 'begginers'],
  tutorial: ['tutoriel', 'tutoral', 'tutorail'],
  review: ['revue', 'reivew', 'reveiw'],
  guide: ['gaide', 'giude'],
  youtube: ['you tube', 'yt', 'yotube', 'youtub'],
  minecraft: ['mine craft', 'mincraft'],
  gaming: ['gamin', 'gameing'],
  recipe: ['recipie', 'receipe'],
  recipes: ['recipies', 'receipes'],
  setup: ['set up', 'set-up'],
  walkthrough: ['walktrough', 'walktrough'],
  strategy: ['stratergy', 'stratagy'],
  explained: ['explaned', 'explened'],
  comparison: ['comparision', 'comparson'],
  maintenance: ['maintainance', 'maintanence'],
  camera: ['camra', 'camer'],
  budget: ['buget', 'budjet'],
  crypto: ['cripto', 'criptomoeda'],
};

/**
 * Clean and normalize a keyword input string.
 */
function sanitizeInput(raw: string): string {
  return raw
    .toLowerCase()
    .replace(/[#@!$%^&*()_+=\[\]{};':"\\|,.<>\/?]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Remove duplicate strings while preserving order.
 */
function dedupe(arr: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const item of arr) {
    const clean = item.trim().toLowerCase();
    if (clean && !seen.has(clean)) {
      seen.add(clean);
      out.push(clean);
    }
  }
  return out;
}

/**
 * Generate 5 organized keyword clusters tailored for YouTube video tagging.
 */
export function generateTagClusters(rawInput: string, niche: NicheCategory = 'general'): TagGenerationResult {
  const query = sanitizeInput(rawInput);
  if (!query) {
    return { clusters: [], allTags: [], defaultSelectedIds: [] };
  }

  const words = query.split(' ').filter((w) => w.length > 0);
  const currentYear = new Date().getFullYear().toString();
  const nextYear = (new Date().getFullYear() + 1).toString();

  // 1. PRIMARY & EXACT MATCH CLUSTER
  const primaryRaw: string[] = [
    query,
    words.length > 2 ? words.slice(0, 2).join(' ') : '',
    words.length > 3 ? words.slice(0, 3).join(' ') : '',
    words.length > 1 ? words.join('') : '', // spaceless version (e.g. iphone16)
  ].filter(Boolean);

  // 2. SECONDARY & SYNONYMS CLUSTER
  const secondaryRaw: string[] = [
    `${query} tutorial`,
    `${query} review`,
    `${query} guide`,
    `best ${query}`,
    `${query} for beginners`,
    `${query} tips`,
    `${query} ${currentYear}`,
    `${query} ${nextYear}`,
    `${query} explained`,
    `${query} walkthrough`,
  ];

  // 3. LONG-TAIL & QUESTIONS CLUSTER
  const longTailRaw: string[] = [
    `how to ${query}`,
    `how does ${query} work`,
    `is ${query} worth it`,
    `best ${query} for beginners`,
    `how to use ${query}`,
    `${query} step by step`,
    `${query} pros and cons`,
    `${query} common mistakes`,
    `why is ${query} so good`,
  ];

  // 4. BROAD TOPIC CLUSTER
  const nicheKeywords = NICHE_BROAD_KEYWORDS[niche] || NICHE_BROAD_KEYWORDS.general;
  const broadRaw: string[] = [
    ...nicheKeywords,
    words[0], // first root noun
    words.length > 1 ? words[words.length - 1] : '', // last noun/verb
  ].filter(Boolean);

  // 5. COMMON MISSPELLINGS CLUSTER
  // YouTube officially recommends tags specifically for commonly misspelled words.
  const misspellingsRaw: string[] = [];

  // Check known typos in dictionary
  for (const word of words) {
    if (COMMON_MISSPELLINGS_DICT[word]) {
      for (const typo of COMMON_MISSPELLINGS_DICT[word]) {
        misspellingsRaw.push(typo);
        if (words.length > 1) {
          misspellingsRaw.push(query.replace(word, typo));
        }
      }
    }
  }

  // Common phonetic / procedural permutations
  if (query.includes(' ')) {
    misspellingsRaw.push(query.replace(/\s+/g, '')); // no spaces
  }
  if (query.includes('how to')) {
    misspellingsRaw.push(query.replace('how to', 'howto'));
  }
  if (words.length >= 2) {
    // Transposed first two words
    misspellingsRaw.push([words[1], words[0], ...words.slice(2)].join(' '));
  }

  // Deduplicate across groups while keeping priority
  const usedTags = new Set<string>();

  function createItems(rawList: string[], prefix: string): TagClusterItem[] {
    const deduped = dedupe(rawList);
    const items: TagClusterItem[] = [];
    let idx = 0;
    for (const text of deduped) {
      if (!usedTags.has(text)) {
        usedTags.add(text);
        items.push({
          id: `${prefix}-${idx++}`,
          text,
          charCount: text.length,
        });
      }
    }
    return items;
  }

  const primaryItems = createItems(primaryRaw, 'prim');
  const secondaryItems = createItems(secondaryRaw, 'sec');
  const longTailItems = createItems(longTailRaw, 'long');
  const broadItems = createItems(broadRaw, 'broad');
  const misspellingItems = createItems(misspellingsRaw, 'typo');

  const rawClusters: TagClusterGroup[] = [
    { id: 'primary', tags: primaryItems },
    { id: 'secondary', tags: secondaryItems },
    { id: 'longTail', tags: longTailItems },
    { id: 'broad', tags: broadItems },
    { id: 'misspellings', tags: misspellingItems },
  ];
  const clusters: TagClusterGroup[] = rawClusters.filter((c) => c.tags.length > 0);

  const allTags = clusters.flatMap((c) => c.tags);

  // Automatically select high-priority tags up to ~450 characters (leaving comfortable headroom below 500)
  const defaultSelectedIds: string[] = [];
  let accumulatedChars = 0;

  for (const item of allTags) {
    const additionalCost = item.charCount + (defaultSelectedIds.length > 0 ? 1 : 0); // +1 for comma
    if (accumulatedChars + additionalCost <= 460) {
      defaultSelectedIds.push(item.id);
      accumulatedChars += additionalCost;
    }
  }

  return {
    clusters,
    allTags,
    defaultSelectedIds,
  };
}

/**
 * Calculate total characters in a list of tags when joined as comma-separated values.
 * YouTube Studio counts every character in each tag plus the separating comma.
 */
export function calculateTagCharacters(tags: string[]): number {
  if (tags.length === 0) return 0;
  return tags.join(',').length;
}

/**
 * Format tags ready for direct paste into YouTube Studio's tag box.
 */
export function formatTagsForClipboard(tags: string[]): string {
  return tags.join(', ');
}

