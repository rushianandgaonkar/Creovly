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
        { name: 'Logo Background Remover', href: '/tools/logo-background-remover' },
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
        { name: 'Revenue Calculator', href: '/tools/youtube-revenue-calculator' },
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
    id: 'logo-background-remover', title: 'Logo Background Remover', slug: 'logo-background-remover',
    href: '/tools/logo-background-remover', category: 'thumbnail', categoryLabel: 'Thumbnail Tools',
    description: "Remove solid-color backgrounds from logos online for free. Preview the result and download a transparent PNG with Creovly's browser-based logo remover.",
    status: 'available', seoTarget: 'Logo Background Remover',
  },
  {
    id: 'youtube-thumbnail-compressor',
    title: 'YouTube Thumbnail Compressor',
    slug: 'youtube-thumbnail-compressor',
    href: '/tools/youtube-thumbnail-compressor',
    category: 'thumbnail',
    categoryLabel: 'Thumbnail Tools',
    description:
      'Compress YouTube thumbnails online for free. Reduce JPEG, PNG and WebP file sizes in your browser, compare results and download optimized images.',
    status: 'available',
    seoTarget: 'YouTube Thumbnail Compressor',
  },
  {
    id: 'youtube-thumbnail-resizer',
    title: 'YouTube Thumbnail Resizer',
    slug: 'youtube-thumbnail-resizer',
    href: '/tools/youtube-thumbnail-resizer',
    category: 'thumbnail',
    categoryLabel: 'Thumbnail Tools',
    description:
      'Resize YouTube thumbnails online for free. Adjust images to 1280x720 or custom dimensions, preview framing and download ready-to-use files.',
    status: 'available',
    seoTarget: 'YouTube Thumbnail Resizer',
  },
  {
    id: 'youtube-shorts-safe-zone',
    heroTone: 'rose',
    title: 'YouTube Shorts Safe Zone Checker',
    slug: 'youtube-shorts-safe-zone',
    href: '/tools/youtube-shorts-safe-zone',
    category: 'thumbnail',
    categoryLabel: 'Thumbnail Tools',
    description:
      'Check YouTube Shorts safe zones before publishing. Preview placement guides, keep important content clear of overlays and export an annotated guide.',
    status: 'available',
    seoTarget: 'YouTube Shorts Safe Zone',
  },
  {
    id: 'youtube-title-checker',
    title: 'YouTube Title Checker & Analyzer',
    slug: 'youtube-title-checker',
    href: '/tools/youtube-title-checker',
    category: 'title',
    categoryLabel: 'Title Tools',
    description:
      'Check YouTube video titles for free. Analyze title length, punctuation, keyword placement and mobile text wrapping before publishing your next video.',
    status: 'available',
    seoTarget: 'YouTube Title Checker',
  },
  {
    id: 'youtube-revenue-calculator',
    title: 'YouTube Revenue Calculator',
    slug: 'youtube-revenue-calculator',
    href: '/tools/youtube-revenue-calculator',
    category: 'money-growth',
    categoryLabel: 'Money & Growth',
    description:
      'Estimate YouTube earnings with a free revenue calculator. Enter monthly views and RPM ranges to model potential monthly and yearly creator income.',
    status: 'available',
    seoTarget: 'YouTube Revenue Calculator',
  },
  {
    id: 'youtube-rpm-calculator',
    title: 'YouTube RPM Calculator',
    slug: 'youtube-rpm-calculator',
    href: '/tools/youtube-rpm-calculator',
    category: 'money-growth',
    categoryLabel: 'Money & Growth',
    description:
      'Calculate YouTube RPM for free. Enter your total revenue and video views to find earnings per 1,000 views and better understand channel performance.',
    status: 'available',
    seoTarget: 'YouTube RPM Calculator',
  },
  {
    id: 'youtube-watch-hours-calculator',
    title: 'YouTube Watch Hours Calculator',
    slug: 'youtube-watch-hours-calculator',
    href: '/tools/youtube-watch-hours-calculator',
    category: 'money-growth',
    categoryLabel: 'Money & Growth',
    description:
      'Calculate YouTube watch hours and estimate views needed to reach your goal. Track remaining hours using average view duration and viewing pace.',
    status: 'available',
    seoTarget: 'YouTube Watch Hours Calculator',
  },
  {
    id: 'youtube-monetization-calculator',
    title: 'YouTube Monetization Calculator',
    slug: 'youtube-monetization-calculator',
    href: '/tools/youtube-monetization-calculator',
    category: 'money-growth',
    categoryLabel: 'Money & Growth',
    description:
      'Estimate YouTube creator income from ads, sponsorships, affiliates and other sources. Subtract expenses to model your potential monthly earnings.',
    status: 'available',
    seoTarget: 'YouTube Monetization Calculator',
  },
];

// Alias for backwards compatibility if needed
export const plannedTools = toolRegistry;


