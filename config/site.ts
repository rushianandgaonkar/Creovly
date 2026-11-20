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
        { name: 'Thumbnail Downloader', href: '/tools/youtube-thumbnail-downloader' },
        { name: 'Thumbnail Tester & Preview', href: '/tools/youtube-thumbnail-tester' },
        { name: 'Shorts Safe Zone', href: '/tools/youtube-shorts-safe-zone' },
        { name: 'Thumbnail Size Checker', href: '/tools/youtube-thumbnail-size' },
        { name: 'Banner Maker', href: '/tools/youtube-banner-maker' },
      ],
    },
    {
      title: 'Title Tools',
      items: [
        { name: 'Channel Name Generator', href: '/tools/youtube-channel-name-generator' },
        { name: 'Tag Generator', href: '/tools/youtube-tag-generator' },
        { name: 'Hashtag Generator', href: '/tools/youtube-hashtag-generator' },
        { name: 'Best Time to Post', href: '/tools/best-time-to-post-on-youtube' },
        { name: 'Description Generator', href: '/tools/youtube-description-generator' },
        { name: 'Link Generator', href: '/tools/youtube-link-generator' },
        { name: 'Chapters & Timestamp Generator', href: '/tools/youtube-timestamp-generator' },
        { name: 'Words to Minutes Calculator', href: '/tools/words-to-minutes-calculator' },
        { name: 'Title Checker & Analyzer', href: '/tools/youtube-title-checker' },
        { name: 'Pre-Publish Checklist', href: '/checklist' },
      ],
    },
    {
      title: 'Money & Growth',
      items: [
        { name: 'Money Calculator', href: '/tools/youtube-revenue-calculator' },
        { name: 'RPM Calculator', href: '/tools/youtube-rpm-calculator' },
        { name: 'CPM Calculator', href: '/tools/youtube-cpm-calculator' },
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
      "Resize any image to a YouTube thumbnail size: 1280x720 or the recommended 3840x2160, both 16:9. Preview the framing and download it free in your browser.",
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
    seoTitle: 'Title Checker: Free YouTube Title Length, Hook & Truncation Analyzer',
    slug: 'youtube-title-checker',
    href: '/tools/youtube-title-checker',
    category: 'title',
    categoryLabel: 'Title Tools',
    description:
      'Free title checker and YouTube headline analyzer. Check title length, 50-character mobile truncation cutoff, keyword hooks, and CTR preview before you publish.',
    status: 'available',
    seoTarget: 'Title Checker',
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
  {
    id: 'youtube-thumbnail-downloader',
    title: 'YouTube Thumbnail Downloader',
    seoTitle: 'YouTube Thumbnail Downloader – Save HD & Max Res Images',
    slug: 'youtube-thumbnail-downloader',
    href: '/tools/youtube-thumbnail-downloader',
    category: 'thumbnail',
    categoryLabel: 'Thumbnail Tools',
    description:
      'Download any YouTube video thumbnail in max resolution (1280 × 720), SD, HQ and smaller sizes. Paste a video, Shorts or youtu.be link. Free, no sign-up.',
    status: 'available',
    seoTarget: 'YouTube Thumbnail Downloader',
    applicationCategory: 'MultimediaApplication',
  },
  {
    id: 'youtube-thumbnail-tester',
    title: 'YouTube Thumbnail Tester & Preview',
    seoTitle: 'YouTube Thumbnail Tester – Preview Home, Search & Mobile',
    slug: 'youtube-thumbnail-tester',
    href: '/tools/youtube-thumbnail-tester',
    category: 'thumbnail',
    categoryLabel: 'Thumbnail Tools',
    description:
      'Preview your YouTube thumbnail in the home feed, search, suggested and mobile layouts, in light and dark mode. Compare two versions. Free, nothing is uploaded.',
    status: 'available',
    seoTarget: 'YouTube Thumbnail Tester',
    applicationCategory: 'MultimediaApplication',
  },
  {
    id: 'youtube-timestamp-generator',
    heroTone: 'indigo',
    title: 'YouTube Chapters & Timestamp Generator',
    seoTitle: 'YouTube Timestamp Generator – Make & Check Chapters',
    slug: 'youtube-timestamp-generator',
    href: '/tools/youtube-timestamp-generator',
    category: 'title',
    categoryLabel: 'Title Tools',
    description:
      'Make YouTube chapters from your notes: check the 0:00, 3-chapter and 10-second rules, see each chapter’s length and copy a clean timestamp list. Free, in your browser.',
    status: 'available',
    seoTarget: 'YouTube Timestamp Generator',
  },
  {
    id: 'words-to-minutes-calculator',
    heroTone: 'indigo',
    title: 'Words to Minutes Calculator',
    seoTitle: 'Words to Minutes Calculator – Script Length for Videos',
    slug: 'words-to-minutes-calculator',
    href: '/tools/words-to-minutes-calculator',
    category: 'title',
    categoryLabel: 'Title Tools',
    description:
      'Find out how long your script takes to read aloud. Paste text or enter a word count, pick a speaking pace, and see how many words a 5- or 10-minute video needs.',
    status: 'available',
    seoTarget: 'Words to Minutes Calculator',
  },
  {
    id: 'youtube-banner-maker',
    title: 'YouTube Banner Maker',
    seoTitle: 'Free YouTube Banner Maker (2560 x 1440)',
    slug: 'youtube-banner-maker',
    href: '/tools/youtube-banner-maker',
    category: 'thumbnail',
    categoryLabel: 'Thumbnail Tools',
    description:
      'Make a YouTube banner in your browser: add your channel name, tagline, colours or a photo, preview TV, desktop and phone crops, and download a 2560 x 1440 image.',
    status: 'available',
    seoTarget: 'YouTube Banner Maker',
    applicationCategory: 'MultimediaApplication',
  },
  {
    id: 'youtube-thumbnail-size',
    title: 'YouTube Thumbnail Size Checker',
    seoTitle: 'YouTube Thumbnail Size 2026: Specs & Checker',
    slug: 'youtube-thumbnail-size',
    href: '/tools/youtube-thumbnail-size',
    category: 'thumbnail',
    categoryLabel: 'Thumbnail Tools',
    description:
      'The YouTube thumbnail size, ratio, file size and formats in one place. Drop in your image to check it against YouTube’s rules, right in your browser.',
    status: 'available',
    seoTarget: 'YouTube Thumbnail Size',
    applicationCategory: 'MultimediaApplication',
  },
  {
    id: 'best-time-to-post-on-youtube',
    heroTone: 'indigo',
    title: 'Best Time to Post on YouTube',
    seoTitle: 'Best Time to Post on YouTube: Planner',
    slug: 'best-time-to-post-on-youtube',
    href: '/tools/best-time-to-post-on-youtube',
    category: 'title',
    categoryLabel: 'Title Tools',
    description:
      'Find your best time to post on YouTube from your audience’s peak hour. See when to publish each day this week, in your time zone and theirs.',
    status: 'available',
    seoTarget: 'Best Time to Post on YouTube',
  },
  {
    id: 'youtube-hashtag-generator',
    title: 'YouTube Hashtag Generator',
    seoTitle: 'Free YouTube Hashtag Generator',
    slug: 'youtube-hashtag-generator',
    href: '/tools/youtube-hashtag-generator',
    category: 'title',
    categoryLabel: 'Title Tools',
    description:
      'Turn your video topic into YouTube hashtags with no spaces, no duplicates and a sensible limit. Pick the ones you want and copy them into your description.',
    status: 'available',
    seoTarget: 'YouTube Hashtag Generator',
  },
  {
    id: 'youtube-cpm-calculator',
    title: 'YouTube CPM Calculator',
    seoTitle: 'YouTube CPM Calculator: Ad Earnings from CPM',
    slug: 'youtube-cpm-calculator',
    href: '/tools/youtube-cpm-calculator',
    category: 'money-growth',
    categoryLabel: 'Money & Growth',
    description:
      'Estimate YouTube ad earnings from your views, monetized playback rate and playback-based CPM, after the creator revenue share. Free, in your browser.',
    status: 'available',
    seoTarget: 'YouTube CPM Calculator',
  },
];

// Alias for backwards compatibility if needed
export const plannedTools = toolRegistry;


