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
        { name: 'Banner Size & Safe Zone', href: '/tools/youtube-banner-size' },
        { name: 'Remove Background from Logo', href: '/tools/logo-background-remover' },
        { name: 'Profile Picture Resizer', href: '/tools/youtube-profile-picture-resizer' },
        { name: 'Shorts Safe Zone', href: '/tools/youtube-shorts-safe-zone' },
      ],
    },
    {
      title: 'Title Tools',
      items: [
        { name: 'Channel Name Generator', href: '/tools/youtube-channel-name-generator' },
        { name: 'Tag Generator', href: '/tools/youtube-tag-generator' },
        { name: 'Description Generator', href: '/tools/youtube-description-generator' },
        { name: 'Link Generator', href: '/tools/youtube-link-generator' },
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
        { name: 'Engagement Rate Calculator', href: '/tools/engagement-rate-calculator' },
      ],
    },
    {
      title: 'Publishing Tools',
      items: [
        { name: 'Publish Studio', href: '/studio' },
        { name: 'Pre-Publish Checklist', href: '/checklist' },
        { name: 'Creator Guides', href: '/guides' },
        { name: 'Pay per 1,000 Views Guide', href: '/guides/how-much-does-youtube-pay-per-1000-views' },
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
    seoTitle: 'YouTube Thumbnail Compressor: Get Under 2 MB',
    slug: 'youtube-thumbnail-compressor',
    href: '/tools/youtube-thumbnail-compressor',
    category: 'thumbnail',
    categoryLabel: 'Thumbnail Tools',
    description:
      'Thumbnail file too big? Compress your YouTube thumbnail under the 2 MB size limit in your browser, compare before and after, and download the smaller file.',
    status: 'available',
    seoTarget: 'YouTube Thumbnail Compressor',
  },
  {
    id: 'youtube-thumbnail-resizer',
    title: 'YouTube Thumbnail Resizer',
    seoTitle: 'Free YouTube Thumbnail Resizer: Resize to 1280x720',
    slug: 'youtube-thumbnail-resizer',
    href: '/tools/youtube-thumbnail-resizer',
    category: 'thumbnail',
    categoryLabel: 'Thumbnail Tools',
    description:
      'YouTube thumbnail size is 1280x720 pixels (16:9, under 2 MB). Use this free thumbnail resizer to fit any image to that size, preview framing, and download it.',
    status: 'available',
    seoTarget: 'YouTube Thumbnail Resizer',
  },
  {
    id: 'youtube-banner-size',
    heroTone: 'blue',
    title: 'YouTube Banner Size Checker & Resizer',
    seoTitle: 'YouTube Banner Size Checker, Resizer & Template',
    slug: 'youtube-banner-size',
    href: '/tools/youtube-banner-size',
    category: 'thumbnail',
    categoryLabel: 'Thumbnail Tools',
    description:
      'YouTube banner size checker and resizer: 2560x1440 px, 1546x423 px safe area, 6 MB max. Preview TV, desktop and mobile crops and get a free overlay template.',
    status: 'available',
    seoTarget: 'YouTube Banner Size',
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
    id: 'youtube-channel-name-generator',
    heroTone: 'indigo',
    title: 'YouTube Channel Name Generator',
    seoTitle: 'Free YouTube Channel Name Generator',
    slug: 'youtube-channel-name-generator',
    href: '/tools/youtube-channel-name-generator',
    category: 'title',
    categoryLabel: 'Title Tools',
    description:
      'Generate catchy YouTube channel names for gaming, vlogs, tech, and business. Free channel name generator that runs 100% in your browser.',
    status: 'available',
    seoTarget: 'YouTube Channel Name Generator',
  },
  {
    id: 'youtube-tag-generator',
    heroTone: 'indigo',
    title: 'YouTube Tag Generator',
    seoTitle: 'Free YouTube Tag Generator (SEO & Clusters)',
    slug: 'youtube-tag-generator',
    href: '/tools/youtube-tag-generator',
    category: 'title',
    categoryLabel: 'Title Tools',
    description:
      'Generate optimized YouTube tags and keyword clusters within the 500-character limit. Free rule-based tag generator with instant comma-separated copy.',
    status: 'available',
    seoTarget: 'YouTube Tag Generator',
  },
  {
    id: 'youtube-description-generator',
    heroTone: 'indigo',
    title: 'YouTube Description Generator',
    seoTitle: 'Free YouTube Description Generator',
    slug: 'youtube-description-generator',
    href: '/tools/youtube-description-generator',
    category: 'title',
    categoryLabel: 'Title Tools',
    description:
      'Generate optimized YouTube video descriptions with timestamps, above-the-fold hooks, and social links. Free video description generator that runs in your browser.',
    status: 'available',
    seoTarget: 'YouTube Description Generator',
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
    title: 'YouTube Money & Revenue Calculator',
    seoTitle: 'YouTube Money Calculator & Revenue Calculator',
    slug: 'youtube-revenue-calculator',
    href: '/tools/youtube-revenue-calculator',
    category: 'money-growth',
    categoryLabel: 'Money & Growth',
    description:
      'YouTube money calculator and revenue calculator: estimate monthly and yearly earnings from your views and an RPM range, right in your browser.',
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
  {
    id: 'youtube-link-generator',
    heroTone: 'indigo',
    title: 'YouTube Link Generator',
    seoTitle: 'YouTube Timestamp Link & Subscribe Link Generator',
    slug: 'youtube-link-generator',
    href: '/tools/youtube-link-generator',
    category: 'title',
    categoryLabel: 'Title Tools',
    description:
      'Make a YouTube timestamp link that starts at the exact second, or a subscribe link with ?sub_confirmation=1 and a QR code. Free, in your browser.',
    status: 'available',
    seoTarget: 'YouTube Timestamp Link',
  },
  {
    id: 'youtube-profile-picture-resizer',
    title: 'YouTube Profile Picture Resizer',
    seoTitle: 'YouTube Profile Picture Size 2026 – Free 800×800 Resizer',
    slug: 'youtube-profile-picture-resizer',
    href: '/tools/youtube-profile-picture-resizer',
    category: 'thumbnail',
    categoryLabel: 'Thumbnail Tools',
    description:
      'YouTube profile picture size: 800 × 800 px, 1:1, up to 4 MB, shown as a circle. Crop, preview the circle in light and dark mode, and export for free.',
    status: 'available',
    seoTarget: 'YouTube Profile Picture Size',
    applicationCategory: 'MultimediaApplication',
  },
  {
    id: 'engagement-rate-calculator',
    title: 'Engagement Rate Calculator',
    seoTitle: 'Engagement Rate Calculator – YouTube, Instagram, TikTok',
    slug: 'engagement-rate-calculator',
    href: '/tools/engagement-rate-calculator',
    category: 'money-growth',
    categoryLabel: 'Money & Growth',
    description:
      'Free engagement rate calculator for YouTube, Instagram and TikTok. Calculate by views, followers or reach, see the formula, and average up to 20 posts.',
    status: 'available',
    seoTarget: 'Engagement Rate Calculator',
  },
];

// Alias for backwards compatibility if needed
export const plannedTools = toolRegistry;


