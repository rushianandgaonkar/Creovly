export type DescriptionTemplate =
  | 'tutorial'
  | 'review'
  | 'vlog'
  | 'gaming'
  | 'podcast'
  | 'educational';

export interface DescriptionOptions {
  template: DescriptionTemplate;
  videoTitle: string;
  hookSummary: string;
  keyPoints: string[];
  timestamps: string;
  websiteUrl?: string;
  gearLinks?: string;
  channelHandle?: string;
  twitterHandle?: string;
  instagramHandle?: string;
  discordLink?: string;
  hashtags?: string;
  includeDisclaimer?: boolean;
}

export interface GeneratedDescription {
  fullText: string;
  aboveTheFoldText: string;
  totalChars: number;
  aboveTheFoldChars: number;
  isOverLimit: boolean;
}

export const TEMPLATE_DEFAULTS: Record<DescriptionTemplate, DescriptionOptions> = {
  tutorial: {
    template: 'tutorial',
    videoTitle: 'Master Next.js 15 in 2026: Complete Step-by-Step Guide',
    hookSummary:
      'Learn Next.js 15 from scratch with this comprehensive, practical tutorial. We cover App Router, Server Actions, caching architecture, and deploy a live project.',
    keyPoints: [
      'Next.js 15 App Router architecture',
      'Async Request APIs & React 19 features',
      'Server Actions & mutation handling',
      'Production deployment and Core Web Vitals',
    ],
    timestamps:
      '00:00 - Introduction & Roadmap\n01:45 - Project Setup & Tailwind CSS\n05:20 - App Router Layouts & Pages\n12:40 - Server Actions & Data Fetching\n21:15 - Production Optimization & Deploy',
    websiteUrl: 'https://github.com/example/nextjs-15-mastery',
    gearLinks: 'VS Code, Cursor, Mac Studio M2',
    channelHandle: 'CreovlyCreator',
    twitterHandle: '@CreovlyApp',
    instagramHandle: '@creovly',
    discordLink: 'https://discord.gg/creovly',
    hashtags: '#NextJS #WebDevelopment #Programming',
    includeDisclaimer: true,
  },
  review: {
    template: 'review',
    videoTitle: 'Sony A7 IV Review After 1 Year: Is It Still Worth Buying?',
    hookSummary:
      'In this 1-year long-term review of the Sony A7 IV, we break down real-world autofocus performance, low-light image quality, ergonomics, and whether it beats newer rivals.',
    keyPoints: [
      '33MP BSI Sensor real-world dynamic range',
      '4K 60p crop factor & overheating test',
      'Autofocus tracking for YouTube creators',
      'Final verdict: buy now or wait?',
    ],
    timestamps:
      '00:00 - 1-Year Reality Check\n02:10 - Sensor & Color Science\n06:45 - 4K 60p Overheating Tests\n11:30 - Low Light & High ISO\n16:00 - Pros & Cons Summary\n18:20 - Final Verdict',
    websiteUrl: 'https://example.com/camera-sample-raws',
    gearLinks: 'Sony A7 IV, 24-70mm GM II, Rode Wireless PRO',
    channelHandle: 'TechGearReviews',
    twitterHandle: '@TechReviews',
    instagramHandle: '@techgear',
    discordLink: '',
    hashtags: '#SonyA7IV #CameraReview #Filmmaking',
    includeDisclaimer: true,
  },
  vlog: {
    template: 'vlog',
    videoTitle: '48 Hours in Tokyo: Hidden Izakayas & Night Photography',
    hookSummary:
      'Join us for 48 hours exploring the back alleys of Tokyo, Japan. From 3am Tsukiji street food to rooftop night photography in Shinjuku, this was an unforgettable weekend.',
    keyPoints: [
      'Secret standing ramen bar in Yurakucho',
      'Omoide Yokocho golden-hour photography spots',
      'Capsule hotel tour & budget tips',
      'Day trip to Kamakura coastal shrines',
    ],
    timestamps:
      '00:00 - Landing at Haneda\n02:30 - Tokyo Station Ramen Street\n07:15 - Neon Night Photography\n13:40 - Morning Fish Market Tour\n19:00 - Sunset at Shibuya Sky',
    websiteUrl: 'https://example.com/tokyo-itinerary-pdf',
    gearLinks: 'Sony FX3, 24mm f/1.4 GM, DJI Osmo Pocket 3',
    channelHandle: 'WanderlustJourneys',
    twitterHandle: '',
    instagramHandle: '@wanderlust_vlogs',
    discordLink: '',
    hashtags: '#TokyoTravel #JapanVlog #TravelDiaries',
    includeDisclaimer: false,
  },
  gaming: {
    template: 'gaming',
    videoTitle: 'Minecraft Hardcore 100 Days Survival: The Ultimate Mega Base',
    hookSummary:
      'I survived 100 days in Minecraft 1.21 Hardcore mode and constructed an ancient mega-citadel. Watch how close I came to losing everything on Day 74.',
    keyPoints: [
      'Day 1–20: Early game iron farms and diamond armor',
      'Day 40: Conquering the Nether Fortress & Bastion',
      'Day 74: The near-death Warden encounter',
      'Day 100: Final Mega Base reveal & world download',
    ],
    timestamps:
      '00:00 - The 100 Days Challenge Begins\n03:20 - Days 1-25: Early Survival\n08:50 - Days 26-50: Ancient Debris Mining\n15:10 - Days 51-75: Near-Fatal Warden Fight\n24:00 - Days 76-100: The Mega Base Reveal',
    websiteUrl: 'https://example.com/world-download-day100',
    gearLinks: 'Custom PC (RTX 4090 / i9-14900K), Shure SM7B',
    channelHandle: 'BlockMasterHardcore',
    twitterHandle: '@BlockMasterYT',
    instagramHandle: '',
    discordLink: 'https://discord.gg/blockmaster',
    hashtags: '#Minecraft #100Days #MinecraftHardcore',
    includeDisclaimer: false,
  },
  podcast: {
    template: 'podcast',
    videoTitle: 'Building a $10M SaaS as a Solo Founder | The Creator Economy Show #42',
    hookSummary:
      'In this episode, we sit down with bootstrapper Alex Rivera to unpack how he built a profitable AI SaaS with zero venture funding, 2 team members, and organic YouTube marketing.',
    keyPoints: [
      'Finding zero-competition B2B micro-niches',
      'Pricing software from $29/mo to $499/mo',
      'The exact tech stack powering $10M ARR',
      'Navigating churn and scaling customer support',
    ],
    timestamps:
      '00:00 - Guest Introduction & Background\n04:15 - Bootstrapping vs VC Funding\n12:30 - How Alex Acquired the First 100 Customers\n28:45 - The Tech Stack (Next.js & Supabase)\n45:10 - Advice for Solo Developers in 2026',
    websiteUrl: 'https://thecreatoreconomyshow.com/ep42',
    gearLinks: 'Rodecaster Pro II, Shure SM7B, Sony FX30',
    channelHandle: 'CreatorEconomyShow',
    twitterHandle: '@CreatorEconShow',
    instagramHandle: '@creatoreconomyshow',
    discordLink: 'https://discord.gg/creatoreconomy',
    hashtags: '#SaaS #SoloFounder #Entrepreneurship',
    includeDisclaimer: true,
  },
  educational: {
    template: 'educational',
    videoTitle: 'How Quantum Computers Actually Work (Without the Hype)',
    hookSummary:
      'Quantum computing explained clearly. We break down qubits, superposition, and quantum entanglement using visual analogies without misleading corporate hype.',
    keyPoints: [
      'Classical bits vs quantum qubits',
      'Superposition and probability amplitudes',
      'Why quantum supremacy benchmarks are misunderstood',
      'Real-world timeline for cryptographic threats',
    ],
    timestamps:
      '00:00 - The Quantum Myth vs Reality\n03:15 - The Physics of a Qubit\n08:40 - Superposition Visualized\n14:20 - Quantum Gates & Algorithms\n22:10 - When Will It Break Encryption?',
    websiteUrl: 'https://example.com/quantum-interactive-notes',
    gearLinks: '',
    channelHandle: 'CuriousMindsDoc',
    twitterHandle: '@CuriousMindsDoc',
    instagramHandle: '',
    discordLink: '',
    hashtags: '#QuantumComputing #Physics #ScienceExplained',
    includeDisclaimer: false,
  },
};

/**
 * Clean and normalize multi-line strings or lists.
 */
function cleanLines(raw: string[]): string[] {
  return raw.map((l) => l.trim()).filter((l) => l.length > 0);
}

/**
 * Format a complete YouTube description based on creator options.
 */
export function buildDescription(options: DescriptionOptions): GeneratedDescription {
  const sections: string[] = [];

  // 1. Hook / Above the fold (first 150-200 chars)
  const hook = options.hookSummary.trim();
  if (hook) {
    sections.push(hook);
  }

  // 2. Key Highlights / Takeaways
  const points = cleanLines(options.keyPoints);
  if (points.length > 0) {
    const formattedPoints = points
      .map((p) => (p.startsWith('-') || p.startsWith('•') ? p : `• ${p}`))
      .join('\n');
    sections.push(`📌 In this video, we cover:\n${formattedPoints}`);
  }

  // 3. Timestamps / Chapters
  const timestamps = options.timestamps.trim();
  if (timestamps) {
    sections.push(`⏱️ TIMESTAMPS:\n${timestamps}`);
  }

  // 4. Resources & Links
  const linksBlock: string[] = [];
  if (options.websiteUrl?.trim()) {
    linksBlock.push(`🔗 Website / Project: ${options.websiteUrl.trim()}`);
  }
  if (options.gearLinks?.trim()) {
    linksBlock.push(`🎥 Gear & Equipment Used: ${options.gearLinks.trim()}`);
  }
  if (linksBlock.length > 0) {
    sections.push(`RESOURCES & LINKS:\n${linksBlock.join('\n')}`);
  }

  // 5. Channel Subscription Call-to-action
  if (options.channelHandle?.trim()) {
    const handle = options.channelHandle.replace('@', '').trim();
    sections.push(
      `🔔 SUBSCRIBE FOR MORE VIDEOS:\nhttps://youtube.com/@${handle}?sub_confirmation=1`,
    );
  }

  // 6. Socials & Community
  const socialsBlock: string[] = [];
  if (options.twitterHandle?.trim()) {
    socialsBlock.push(`Twitter / X: https://x.com/${options.twitterHandle.replace('@', '').trim()}`);
  }
  if (options.instagramHandle?.trim()) {
    socialsBlock.push(`Instagram: https://instagram.com/${options.instagramHandle.replace('@', '').trim()}`);
  }
  if (options.discordLink?.trim()) {
    socialsBlock.push(`Discord: ${options.discordLink.trim()}`);
  }
  if (socialsBlock.length > 0) {
    sections.push(`CONNECT WITH ME:\n${socialsBlock.join('\n')}`);
  }

  // 7. Disclaimer
  if (options.includeDisclaimer) {
    sections.push(
      `⚖️ DISCLAIMER: Some of the links above may be affiliate links, meaning I may earn a small commission at no additional cost to you if you make a purchase. Thank you for supporting the channel!`,
    );
  }

  // 8. Hashtags
  if (options.hashtags?.trim()) {
    sections.push(options.hashtags.trim());
  }

  const fullText = sections.join('\n\n');
  const totalChars = fullText.length;
  const isOverLimit = totalChars > 5000;

  // The first ~180 characters represent what's visible above the fold before "...more"
  const foldCutoff = Math.min(180, fullText.length);
  const aboveTheFoldText = fullText.slice(0, foldCutoff);
  const aboveTheFoldChars = aboveTheFoldText.length;

  return {
    fullText,
    aboveTheFoldText,
    totalChars,
    aboveTheFoldChars,
    isOverLimit,
  };
}
