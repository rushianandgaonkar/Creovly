import type { SiteConfig, NavItem, ToolDefinition, ToolCategory, HeroTone } from '@/types';

export const categoryHeroTones: Record<ToolCategory, HeroTone> = {
  thumbnail: 'blue', title: 'violet', 'money-growth': 'teal', shorts: 'rose', publishing: 'indigo',
};

export const siteConfig: SiteConfig = {
  name: 'Creovly',
  domain: 'creovly.com',
  url: 'https://creovly.com',
  tagline: 'Create smarter. Publish better.',
  description:
    'Creovly is a private, in-browser workspace for YouTube creators. Compress thumbnails, check title hooks, verify Shorts safe zones, and model revenue locally.',
  flagship: {
    name: 'Creovly Publish Studio',
    tagline: 'The unified pre-publish command center for creators',
    path: '/studio',
  },
  links: {
    github: 'https://github.com/rushianandgaonkar/Creovly',
  },
  ogImage: '/og-image.png',
};

export const toolCategories = [
  { id: 'thumbnail', label: 'Thumbnails & Shorts' },
  { id: 'title', label: 'Titles' },
  { id: 'money-growth', label: 'Money & Growth' },
] as const;

export const navItems: NavItem[] = [
  { name: 'Tools', href: '/tools' },
  { name: 'Publish Studio', href: '/studio' },
  { name: 'Checklist', href: '/checklist' },
];

export const secondaryNavItems: NavItem[] = [
  { name: 'Publish Studio', href: '/studio' },
  { name: 'Creator Guides', href: '/guides' },
];

export const footerNavigation = {
  categories: [
    {
      title: 'Thumbnail Tools',
      items: [
        { name: 'Thumbnail Compressor', href: '/tools/youtube-thumbnail-compressor' },
        { name: 'Thumbnail Resizer', href: '/tools/youtube-thumbnail-resizer' },
        { name: 'Remove Background from Logo', href: '/tools/logo-background-remover' },
        { name: 'Shorts Safe Zone', href: '/tools/youtube-shorts-safe-zone' },
      ],
    },
    {
      title: 'Title Tools',
      items: [
        { name: 'Title Checker & Analyzer', href: '/tools/youtube-title-checker' },
        { name: 'Pre-Publish Checklist', href: '/checklist' },
      ],
    },
    {
      title: 'Money & Growth',
      items: [
        { name: 'Money Calculator', href: '/tools/youtube-revenue-calculator' },
        { name: 'RPM Calculator', href: '/tools/youtube-rpm-calculator' },
        { name: 'Watch Hours Calculator', href: '/tools/youtube-watch-hours-calculator' },
        { name: 'Monetization Calculator', href: '/tools/youtube-monetization-calculator' },
      ],
    },
    {
      title: 'Publishing Tools',
      items: [
        { name: 'Publish Studio', href: '/studio' },
        { name: 'Pre-Publish Checklist', href: '/checklist' },
        { name: 'Creator Guides', href: '/guides' },
      ],
    },
  ],
  company: [
    { name: 'About Creovly / Press', href: '/about' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ],
};

export const toolRegistry: ToolDefinition[] = [
  {
    id: 'logo-background-remover',
    title: 'Remove Background from Logo',
    seoTitle: 'Remove Background from Logo (Free PNG)',
    slug: 'logo-background-remover',
    href: '/tools/logo-background-remover',
    category: 'thumbnail',
    categoryLabel: 'Thumbnail Tools',
    description:
      'Remove the background from any logo for free. Upload your logo, select the background color, and download a transparent PNG with Creovly in your browser.',
    status: 'available',
    seoTarget: 'Remove Background from Logo',
  },
  {
    id: 'youtube-thumbnail-compressor',
    title: 'YouTube Thumbnail Compressor',
    seoTitle: 'Free YouTube Thumbnail Compressor (Under 2 MB)',
    slug: 'youtube-thumbnail-compressor',
    href: '/tools/youtube-thumbnail-compressor',
    category: 'thumbnail',
    categoryLabel: 'Thumbnail Tools',
    description:
      'Free YouTube thumbnail compressor. Compress JPEG, PNG and WebP thumbnails under 2 MB in your browser, compare results and download optimized images.',
    status: 'available',
    seoTarget: 'YouTube Thumbnail Compressor',
  },
  {
    id: 'youtube-thumbnail-resizer',
    title: 'YouTube Thumbnail Resizer',
    seoTitle: 'Free YouTube Thumbnail Resizer: 1280x720',
    slug: 'youtube-thumbnail-resizer',
    href: '/tools/youtube-thumbnail-resizer',
    category: 'thumbnail',
    categoryLabel: 'Thumbnail Tools',
    description:
      'Free YouTube thumbnail resizer and size converter. Adjust images to 1280x720 or custom sizes, preview framing, and download ready-to-use files.',
    status: 'available',
    seoTarget: 'YouTube Thumbnail Resizer',
  },
  {
    id: 'youtube-shorts-safe-zone',
    heroTone: 'rose',
    title: 'YouTube Shorts Safe Zone Checker',
    seoTitle: 'YouTube Shorts Safe Zone Checker & Template',
    slug: 'youtube-shorts-safe-zone',
    href: '/tools/youtube-shorts-safe-zone',
    category: 'thumbnail',
    categoryLabel: 'Thumbnail Tools',
    description:
      'Check YouTube Shorts safe zones before publishing. Preview guides, keep content clear of player buttons, and download the free transparent PNG template.',
    status: 'available',
    seoTarget: 'YouTube Shorts Safe Zone',
  },
  {
    id: 'youtube-title-checker',
    title: 'YouTube Title Checker & Analyzer',
    seoTitle: 'Free YouTube Title Checker: Length and Truncation',
    slug: 'youtube-title-checker',
    href: '/tools/youtube-title-checker',
    category: 'title',
    categoryLabel: 'Title Tools',
    description:
      'Free YouTube title checker. Analyze title length, punctuation, keyword placement and mobile truncation before you publish your next video.',
    status: 'available',
    seoTarget: 'YouTube Title Checker',
  },
  {
    id: 'youtube-revenue-calculator',
    title: 'YouTube Money Calculator',
    seoTitle: 'YouTube Money Calculator: Views to Revenue',
    slug: 'youtube-revenue-calculator',
    href: '/tools/youtube-revenue-calculator',
    category: 'money-growth',
    categoryLabel: 'Money & Growth',
    description:
      'YouTube money calculator: estimate monthly and yearly YouTube earnings from monthly views and RPM assumptions in your browser.',
    status: 'available',
    seoTarget: 'YouTube Money Calculator',
  },
  {
    id: 'youtube-rpm-calculator',
    title: 'YouTube RPM Calculator',
    seoTitle: 'YouTube RPM Calculator: Earnings per 1,000 Views',
    slug: 'youtube-rpm-calculator',
    href: '/tools/youtube-rpm-calculator',
    category: 'money-growth',
    categoryLabel: 'Money & Growth',
    description:
      'Calculate YouTube RPM to find earnings per 1,000 views from your own revenue and views. Free, private, in-browser calculator for YouTube creators.',
    status: 'available',
    seoTarget: 'YouTube RPM Calculator',
  },
  {
    id: 'youtube-watch-hours-calculator',
    title: 'YouTube Watch Hours Calculator',
    seoTitle: 'YouTube Watch Hours Calculator: 4,000-Hour Goal',
    slug: 'youtube-watch-hours-calculator',
    href: '/tools/youtube-watch-hours-calculator',
    category: 'money-growth',
    categoryLabel: 'Money & Growth',
    description:
      'Calculate YouTube watch hours and estimate views needed to reach the 4,000-hour Partner Program goal. Track remaining hours using average view duration.',
    status: 'available',
    seoTarget: 'YouTube Watch Hours Calculator',
  },
  {
    id: 'youtube-monetization-calculator',
    title: 'YouTube Monetization Calculator',
    seoTitle: 'YouTube Monetization Calculator: Ads and Sponsors',
    slug: 'youtube-monetization-calculator',
    href: '/tools/youtube-monetization-calculator',
    category: 'money-growth',
    categoryLabel: 'Money & Growth',
    description:
      'Calculate YouTube channel earnings across all income streams (ads, sponsors, affiliates) minus expenses for true monthly creator earnings.',
    status: 'available',
    seoTarget: 'YouTube Monetization Calculator',
  },
];

// Alias for backwards compatibility if needed
export const plannedTools = toolRegistry;


