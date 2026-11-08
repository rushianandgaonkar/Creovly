export type NicheCategory =
  | 'all'
  | 'gaming'
  | 'tech'
  | 'vlogs'
  | 'finance'
  | 'education'
  | 'entertainment'
  | 'fitness'
  | 'creative';

export type StyleArchetype = 'modern' | 'classic' | 'creative' | 'minimal';

export type NameLength = 'all' | 'short' | 'medium';

export interface GeneratedChannelName {
  id: string;
  name: string;
  handle: string;
  charCount: number;
  wordCount: number;
  style: StyleArchetype;
  niche: NicheCategory;
}

export interface ChannelNameGeneratorOptions {
  keyword?: string;
  niche?: NicheCategory;
  style?: StyleArchetype;
  length?: NameLength;
  seed?: number;
}

const NICHE_KEYWORDS: Record<NicheCategory, string[]> = {
  all: [
    'Creator', 'Pulse', 'Studio', 'Vision', 'Scope', 'Spark', 'Focus', 'Forge',
    'Nexus', 'Venture', 'Craft', 'Lab', 'Vibe', 'Spotlight', 'Sphere', 'Orbit',
  ],
  gaming: [
    'Pixel', 'Respawn', 'Glitch', 'Quest', 'Arcade', 'Loot', 'Raid', 'Nexus',
    'Level', 'Boss', 'Gamer', 'Clutch', 'Stealth', 'Combo', 'Joystick', 'Trigger',
  ],
  tech: [
    'Byte', 'Code', 'Binary', 'Algor', 'Silicon', 'Dev', 'Stack', 'Cyber',
    'Logic', 'Terminal', 'Node', 'Vector', 'Circuit', 'Kernel', 'Flux', 'Data',
  ],
  vlogs: [
    'Daily', 'Journeys', 'Echo', 'Vibe', 'Moments', 'Horizon', 'Wander', 'Story',
    'Haven', 'Drift', 'Avenue', 'Roam', 'Canvas', 'Diaries', 'Chronicle', 'Passage',
  ],
  finance: [
    'Capital', 'Yield', 'Ledger', 'Equity', 'Asset', 'Wealth', 'Venture', 'Dividend',
    'Market', 'Alpha', 'Portfolio', 'Compound', 'Metric', 'Scale', 'Summit', 'Vault',
  ],
  education: [
    'Curious', 'Insight', 'Academy', 'Scholar', 'Explain', 'Mind', 'Concept', 'Think',
    'Blueprint', 'Thesis', 'Factor', 'Wisdom', 'Decode', 'Primer', 'Syllabus', 'Theory',
  ],
  entertainment: [
    'Cinema', 'Pop', 'Show', 'Encore', 'Spotlight', 'Reel', 'Laugh', 'Stage',
    'Cast', 'Scene', 'Binge', 'Vaudeville', 'Plot', 'Fable', 'Buzz', 'Mania',
  ],
  fitness: [
    'Iron', 'Fit', 'Pulse', 'Forge', 'Apex', 'Endure', 'Stride', 'Lift',
    'Grit', 'Tempo', 'Peak', 'Flex', 'Agile', 'Hydra', 'Vigor', 'Barbell',
  ],
  creative: [
    'Design', 'Palette', 'Atelier', 'Craft', 'Canvas', 'Form', 'Prism', 'Ink',
    'Draft', 'Visual', 'Aesthetic', 'Hue', 'Mosaic', 'Sculpt', 'Texture', 'Motif',
  ],
};

const MODERN_PREFIXES = [
  'Nova', 'Apex', 'Hyper', 'Neo', 'Next', 'Prime', 'Ultra', 'Sync', 'Shift', 'Core', 'Velo', 'Aero',
];

const MODERN_SUFFIXES = [
  'Lab', 'HQ', 'Pulse', 'Sync', 'Forge', 'Craft', 'Hub', 'Grid', 'Flow', 'Wave', 'Zone', 'Sphere',
];

const CLASSIC_PREFIXES = [
  'The', 'Master', 'Royal', 'Grand', 'True', 'Heritage', 'Beacon', 'Summit', 'Premier', 'Foundry',
];

const CLASSIC_SUFFIXES = [
  'Chronicles', 'Institute', 'Blueprint', 'Standard', 'Digest', 'Academy', 'Authority', 'Review', 'Journal', 'Society',
];

const CREATIVE_WORDS = [
  'Curious', 'Velvet', 'Whimsical', 'Offbeat', 'Wander', 'Electric', 'Rustic', 'Paper', 'Cosmic', 'Midnight', 'Analog', 'Neon',
];

const MINIMAL_PREFIXES = [
  'Mono', 'Form', 'Kroma', 'Voxel', 'Base', 'Pure', 'Zero', 'Sub', 'Alt', 'Arch',
];

const MINIMAL_SUFFIXES = [
  'OS', 'One', 'Studio', 'Co', 'Dept', 'Space', 'Room', 'Desk', 'Point', 'Box',
];

function cleanKeyword(input: string): string[] {
  return input
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
}

function generateHandle(name: string): string {
  const sanitized = name.replace(/[^a-zA-Z0-9]/g, '');
  return `@${sanitized}`;
}

export function generateChannelNames(
  options: ChannelNameGeneratorOptions = {}
): GeneratedChannelName[] {
  const {
    keyword = '',
    niche = 'all',
    style = 'modern',
    length = 'all',
  } = options;

  const rawKeywords = cleanKeyword(keyword);
  const nichePool = NICHE_KEYWORDS[niche] || NICHE_KEYWORDS.all;

  // Primary keyword or pick from niche pool
  const primaryWord =
    rawKeywords.length > 0 ? rawKeywords.join('') : nichePool[Math.floor(Math.random() * nichePool.length)];
  const secondaryWord =
    rawKeywords.length > 1 ? rawKeywords[1] : nichePool[(nichePool.indexOf(primaryWord) + 1) % nichePool.length];

  const candidateNames = new Set<string>();

  // Helper to add
  const addName = (n: string) => {
    const trimmed = n.trim();
    if (trimmed && !candidateNames.has(trimmed)) {
      candidateNames.add(trimmed);
    }
  };

  // Generate candidate pools based on style and cross-style variations
  if (style === 'modern') {
    MODERN_PREFIXES.forEach((pre) => addName(`${pre}${primaryWord}`));
    MODERN_SUFFIXES.forEach((suf) => addName(`${primaryWord} ${suf}`));
    MODERN_SUFFIXES.forEach((suf) => addName(`${preRandom(MODERN_PREFIXES)} ${primaryWord}`));
    addName(`${primaryWord}HQ`);
    addName(`Next ${primaryWord}`);
    addName(`ZeroTo${primaryWord}`);
    addName(`${primaryWord} Matrix`);
    addName(`${primaryWord} Sprint`);
    addName(`${primaryWord} Sphere`);
    addName(`${primaryWord} Engine`);
    addName(`${primaryWord} Dynamic`);
    if (secondaryWord) {
      addName(`${primaryWord} & ${secondaryWord}`);
      addName(`${primaryWord}${secondaryWord}`);
    }
  } else if (style === 'classic') {
    CLASSIC_SUFFIXES.forEach((suf) => addName(`The ${primaryWord} ${suf}`));
    CLASSIC_SUFFIXES.forEach((suf) => addName(`${primaryWord} ${suf}`));
    CLASSIC_PREFIXES.forEach((pre) => addName(`${pre} ${primaryWord}`));
    addName(`Mastering ${primaryWord}`);
    addName(`Inside ${primaryWord}`);
    addName(`The ${primaryWord} Protocol`);
    addName(`The ${primaryWord} Gazette`);
    addName(`${primaryWord} Heritage`);
    addName(`The ${primaryWord} Standard`);
    if (secondaryWord) {
      addName(`${primaryWord} & ${secondaryWord} Society`);
    }
  } else if (style === 'creative') {
    CREATIVE_WORDS.forEach((adj) => addName(`${adj} ${primaryWord}`));
    CREATIVE_WORDS.forEach((adj) => addName(`${primaryWord} & ${adj}`));
    addName(`The ${primaryWord} Theory`);
    addName(`${primaryWord} Odyssey`);
    addName(`Parallel ${primaryWord}`);
    addName(`Velvet ${primaryWord}`);
    addName(`Curious ${primaryWord}`);
    addName(`The Daily ${primaryWord}`);
    addName(`Project ${primaryWord}`);
    addName(`${primaryWord} Alchemy`);
    addName(`Wander & ${primaryWord}`);
    if (secondaryWord) {
      addName(`${primaryWord} & ${secondaryWord}`);
    }
  } else if (style === 'minimal') {
    MINIMAL_PREFIXES.forEach((pre) => addName(`${pre}${primaryWord}`));
    MINIMAL_SUFFIXES.forEach((suf) => addName(`${primaryWord} ${suf}`));
    addName(`${primaryWord}OS`);
    addName(`${primaryWord} One`);
    addName(`Simply ${primaryWord}`);
    addName(`Studio ${primaryWord}`);
    addName(`Base ${primaryWord}`);
    addName(`Form ${primaryWord}`);
    addName(`Mono ${primaryWord}`);
    if (secondaryWord) {
      addName(`${primaryWord}${secondaryWord}`);
    }
  }

  // Cross-pollinate a few extra niche-driven ideas
  nichePool.slice(0, 10).forEach((w) => {
    if (w !== primaryWord) {
      if (style === 'modern') addName(`${w}${primaryWord}`);
      else if (style === 'classic') addName(`${w} & ${primaryWord} Review`);
      else if (style === 'creative') addName(`${w} of ${primaryWord}`);
      else if (style === 'minimal') addName(`${primaryWord} ${w}`);
    }
  });

  // Convert set to array and filter by length
  let results: GeneratedChannelName[] = Array.from(candidateNames).map((name, index) => {
    const words = name.split(/\s+/).length;
    return {
      id: `gen-${index}-${name.toLowerCase().replace(/[^a-z0-9]/g, '')}`,
      name,
      handle: generateHandle(name),
      charCount: name.length,
      wordCount: words,
      style,
      niche,
    };
  });

  if (length === 'short') {
    results = results.filter((r) => r.wordCount <= 2 && r.charCount <= 18);
  } else if (length === 'medium') {
    results = results.filter((r) => r.wordCount >= 2);
  }

  // Shuffle and take top 20
  results = shuffleArray(results).slice(0, 20);

  return results;
}

function preRandom(arr: string[]): string {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffleArray<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

