import type { SiteConfig, NavItem, ToolDefinition } from '@/types';

export const siteConfig: SiteConfig = {
  name: 'Creovly',
  domain: 'creovly.com',
  url: 'https://creovly.com',
  tagline: 'Create smarter. Publish better.',
  description:
    'Prepare thumbnails, check title drafts and Shorts framing, and calculate creator income scenarios locally. Explore Publish Studio and use the publishing checklist.',
  flagship: {
    name: 'Creovly Publish Studio',
    tagline: 'The unified pre-publish command center for creators',
    path: '/studio',
  },
  links: {
    twitter: 'https://twitter.com/creovly',
    github: 'https://github.com/creovly',
  },
};

export const toolCategories = [
  { id: 'thumbnail', label: 'Thumbnails & Shorts' },
  { id: 'title', label: 'Titles' },
  { id: 'money-growth', label: 'Money & Growth' },
] as const;

export const navItems: NavItem[] = [
  { name: 'Tools', href: '/tools' },
  { name: 'Checklist', href: '/checklist' },
];

export const secondaryNavItems: NavItem[] = [
  { name: 'Publish Studio', href: '/studio', badge: 'Preview' },
  { name: 'Creator Guides', href: '/guides', badge: 'Preview' },
];

export const footerNavigation = {
  categories: [
    {
      title: 'Thumbnail Tools',
      items: [
        { name: 'Thumbnail Compressor', href: '/tools/youtube-thumbnail-compressor' },
        { name: 'Thumbnail Resizer', href: '/tools/youtube-thumbnail-resizer' },
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
  company: [] as NavItem[],
};

export const toolRegistry: ToolDefinition[] = [
  {
    id: 'youtube-thumbnail-compressor',
    title: 'YouTube Thumbnail Compressor',
    slug: 'youtube-thumbnail-compressor',
    href: '/tools/youtube-thumbnail-compressor',
    category: 'thumbnail',
    categoryLabel: 'Thumbnail Tools',
    description:
      'Compress JPEG, PNG, and WebP thumbnails in your browser. Choose a target size, compare the result, and download your image.',
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
      'Resize thumbnails locally with custom dimensions, adjustable cropping, padding, and JPEG, PNG, or WebP downloads.',
    status: 'available',
    seoTarget: 'YouTube Thumbnail Resizer',
  },
  {
    id: 'youtube-shorts-safe-zone',
    title: 'YouTube Shorts Safe Zone Checker',
    slug: 'youtube-shorts-safe-zone',
    href: '/tools/youtube-shorts-safe-zone',
    category: 'thumbnail',
    categoryLabel: 'Thumbnail Tools',
    description:
      'Check a still frame against adjustable planning margins, mark important content, and export an annotated Shorts guide.',
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
      'Check title length, punctuation, whitespace, and topic phrase placement with an illustrative wrapping preview.',
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
      'Model monthly and annual creator revenue from your views and an RPM range you supply.',
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
      'Calculate revenue per 1,000 views from creator revenue and views in the same period.',
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
      'Calculate hours remaining, additional views, and a constant-pace timeline toward your chosen watch-hours goal.',
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
      'Combine platform income, sponsorships, affiliates, and other income, then subtract costs for a monthly scenario.',
    status: 'available',
    seoTarget: 'YouTube Monetization Calculator',
  },
];

// Alias for backwards compatibility if needed
export const plannedTools = toolRegistry;


