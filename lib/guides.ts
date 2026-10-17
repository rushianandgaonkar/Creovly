export interface OfficialSource {
  label: string;
  url: string;
  description: string;
}

export interface WorkedExample {
  title: string;
  scenario: string;
  steps: string[];
  conclusion: string;
}

export interface GuideChecklistItem {
  title: string;
  detail: string;
}

export interface ContentSection {
  heading: string;
  body: string;
  keyTakeaway?: string;
}

export interface GuideItem {
  slug: string;
  title: string;
  category: string;
  readTime: string;
  description: string;
  lastVerified: string;
  officialSources: OfficialSource[];
  contentSections: ContentSection[];
  workedExample: WorkedExample;
  checklist: GuideChecklistItem[];
  relatedToolIds: string[];
}

export const guides: GuideItem[] = [
  {
    slug: 'youtube-thumbnail-blueprint',
    title: 'The YouTube Thumbnail Blueprint: File Limits, Dimensions & CTR',
    category: 'Visual Packaging',
    readTime: '6 min read',
    description:
      'Verified platform guidelines for 1280×720 aspect ratios, 2 MB mobile upload limits, and mobile-first legibility to maximize visual clarity.',
    lastVerified: 'October 2026',
    officialSources: [
      {
        label: 'YouTube Help: Add video thumbnails',
        url: 'https://support.google.com/youtube/answer/72431?hl=en',
        description: 'Official YouTube specifications for thumbnail resolution, aspect ratio, supported file types, and upload size caps.',
      },
    ],
    contentSections: [
      {
        heading: '1. Official Dimensions & Upload Size Guardrails',
        body: 'According to official YouTube platform documentation, custom thumbnails should use a 16:9 aspect ratio with a recommended resolution of 1280×720 pixels and a minimum width of 640 pixels. Supported file formats include JPG, GIF, and PNG. For uploads, YouTube recommends JPEG or PNG formats. A critical distinction exists regarding upload file size: mobile video thumbnail uploads enforce a strict 2 MB limit, whereas desktop web uploads accommodate files up to 50 MB. To ensure your thumbnail uploads reliably across both mobile Studio and desktop browsers, keeping your output under 2 MB with standard sRGB color encoding is the safest operational standard.',
        keyTakeaway: 'Standardize on 1280×720 resolution (16:9) in JPEG or PNG format, targeting under 2 MB for universal desktop and mobile upload compatibility.',
      },
      {
        heading: '2. Mobile-First Legibility & The Small-Scale Test',
        body: 'Mobile devices represent a major portion of YouTube viewing environments. When a viewer scrolls through a mobile home feed or search results, a 1280×720 thumbnail is physically rendered at roughly 150 to 220 pixels wide on screen. Intricate background textures, fine handwriting scripts, and subtle gradients that look impressive on a 27-inch 4K monitor frequently collapse into indistinguishable visual noise on a phone. Prioritize a three-element focal structure: one clear subject silhouette, one high-contrast background element, and no more than three or four bold, easily readable words. Always preview your design zoomed out to 15% scale before publishing.',
        keyTakeaway: 'Design for 180-pixel mobile rendered width. Use high-contrast silhouettes and bold typography that remain legible at thumbnail scale.',
      },
      {
        heading: '3. Interface Dead Zones & The Timestamp Overlay',
        body: 'Every YouTube thumbnail is overlaid with native player interface elements when displayed in browse, search, and channel feeds. The most critical obstruction is the video duration badge in the bottom-right corner (e.g., "14:28"). If you place faces, primary hook text, branding logos, or punchline visual cues in the lower-right 20% width and 15% height of your canvas, YouTube will inevitably cover them with the timestamp box. Similarly, keep essential visual markers slightly inset from the extreme edges to prevent awkward clipping on various device border radiuses.',
        keyTakeaway: 'Keep the bottom-right 20% width and 15% height completely clear of text, faces, or essential storytelling details.',
      },
      {
        heading: '4. Compression Without Visual Artifacts',
        body: 'Large PNG exports from graphic design tools frequently reach 3 MB to 5 MB due to uncompressed photographic layers. Instead of downscaling your dimensions below 1280×720, use client-side lossy Canvas compression with high-efficiency JPEG encoding. Quality settings between 82% and 90% typically reduce file sizes by 60% to 80% with zero visible artifacting at standard viewing distances, easily clearing YouTube mobile upload caps.',
        keyTakeaway: 'Preserve full 1280×720 dimensions and achieve sub-2 MB file sizes through controlled JPEG encoder quality rather than canvas downscaling.',
      },
    ],
    workedExample: {
      title: 'Preparing a 4.2 MB PNG Thumbnail for Mobile Upload',
      scenario: 'A creator exports a 1920×1080 thumbnail as an uncompressed PNG weighing 4.2 MB. They need to upload the video via the YouTube Studio mobile app, which rejects files over 2 MB.',
      steps: [
        'Input check: Original image is 1920×1080 (16:9 aspect ratio) with PNG format at 4.2 MB.',
        'Dimension adjustment: Downscale the canvas to YouTube standard 1280×720 HD using a proportional bilinear resizer.',
        'Compression run: Re-encode as a JPEG with encoder quality set to 88% using Creovly Thumbnail Compressor.',
        'Output verification: Resulting file size is 642 KB (an 84.7% reduction), well under the 2 MB mobile ceiling.',
        'Dead-zone audit: Verified that the host face is left-aligned and text is centered, leaving the bottom-right timestamp zone completely unobstructed.',
      ],
      conclusion: 'The thumbnail maintains crisp focal details, satisfies YouTube 16:9 specifications, and uploads without mobile rejection errors.',
    },
    checklist: [
      {
        title: 'Canvas Resolution & Ratio',
        detail: 'Set exact 16:9 aspect ratio with 1280×720 resolution (minimum 640px width).',
      },
      {
        title: 'Universal File Size Cap',
        detail: 'Ensure file is strictly under 2 MB for mobile upload compliance (or up to 50 MB on desktop).',
      },
      {
        title: 'Recommended Format',
        detail: 'Export as JPEG or PNG with an sRGB color space profile.',
      },
      {
        title: 'Timestamp Overlay Clearance',
        detail: 'Keep bottom-right quadrant free of text, logos, and critical subject details.',
      },
      {
        title: 'Small-Scale Legibility Audit',
        detail: 'Confirm text and primary subject remain instantly recognizable at 150–200px rendered width.',
      },
    ],
    relatedToolIds: [
      'youtube-thumbnail-compressor',
      'youtube-thumbnail-resizer',
      'logo-background-remover',
      'youtube-shorts-safe-zone',
    ],
  },
  {
    slug: 'decoding-youtube-rpm',
    title: 'Decoding YouTube RPM: How Creators Actually Get Paid in 2026',
    category: 'Monetization',
    readTime: '8 min read',
    description:
      'The mathematical reality of creator RPM vs. advertiser CPM, included revenue streams, Shorts pooled payouts, and avoiding double revenue deductions.',
    lastVerified: 'October 2026',
    officialSources: [
      {
        label: 'YouTube Help: Understand Revenue per mille (RPM)',
        url: 'https://support.google.com/youtube/answer/9314357?hl=en',
        description: 'Official YouTube documentation detailing how RPM is calculated, what revenue it includes, and how it differs from CPM.',
      },
      {
        label: 'YouTube Help: YouTube Partner Program overview',
        url: 'https://support.google.com/youtube/answer/72851?hl=en',
        description: 'Platform requirements for eligibility, commercial monetization features, and partner revenue sharing.',
      },
      {
        label: 'YouTube Help: YouTube Shorts monetization policies',
        url: 'https://support.google.com/youtube/answer/12504220?hl=en',
        description: 'Official breakdown of the pooled Creator Pool revenue model for YouTube Shorts.',
      },
    ],
    contentSections: [
      {
        heading: '1. The Mathematical Reality: CPM vs. RPM',
        body: 'Many creators misunderstand YouTube earnings by conflating gross CPM with take-home RPM. CPM (Cost Per Mille) measures what advertisers pay for every 1,000 ad impressions served on your video before YouTube takes its 45% platform share. In contrast, RPM (Revenue Per Mille) is a creator-focused metric measuring your actual net earnings per 1,000 total video views. The official platform formula is: RPM = (Estimated Total Revenue / Total Views) × 1,000. Because not every view triggers an ad impression, your RPM will virtually always be lower than your playback-based CPM.',
        keyTakeaway: 'CPM measures gross advertiser ad spend; RPM measures your net take-home earnings per 1,000 total views.',
      },
      {
        heading: '2. Avoiding the Double-Deduction Modeling Error',
        body: 'A frequent error when modeling channel financials in spreadsheets or third-party tools is applying an additional 45% revenue cut to reported RPM figures. YouTube Studio RPM already has the platform revenue share deducted. When Studio reports an RPM of $4.50, that entire $4.50 belongs to your estimated earnings before local business taxes. Do not subtract 45% again from your RPM, or your financial forecasts will underestimate actual deposits by nearly half.',
        keyTakeaway: 'Never deduct 45% from your YouTube Studio RPM; platform revenue share is already accounted for in that number.',
      },
      {
        heading: '3. What Revenue is Included in Your RPM?',
        body: 'Unlike advertiser CPM, which only tracks in-stream ads, RPM reflects your blended creator earnings across multiple native monetization features. This includes in-stream video ads, YouTube Premium subscription revenue allocations, Channel Memberships, Super Chat, Super Stickers, and Super Thanks. However, RPM excludes external business revenue such as direct brand sponsorships, affiliate marketing links, and merchandise sold through off-platform storefronts.',
        keyTakeaway: 'RPM aggregates all native YouTube monetization (Ads, Premium, Memberships, Super Thanks) into one metric per 1,000 views.',
      },
      {
        heading: '4. Long-Form vs. Shorts Revenue Mechanics',
        body: 'Long-form videos and YouTube Shorts operate on fundamentally different monetization models. For standard long-form videos, revenue is tied directly to ad auctions on your specific video, with creators receiving 55% of net ad revenue. In YouTube Shorts, ad revenue from the Shorts Feed is aggregated into a pooled Creator Pool by country or territory. A portion of the pool pays music licensing fees, and the remaining Creator Pool allocates 45% of revenue to creators based on their proportion of total Shorts views. Because Shorts views accumulate at massive volumes with minimal ad density per swipe, Shorts RPMs typically range significantly lower than long-form RPMs.',
        keyTakeaway: 'Long-form yields 55% of direct ad revenue; Shorts distributes 45% from a pooled creator fund based on total relative views.',
      },
      {
        heading: '5. Four Primary Drivers That Shift Your Channel RPM',
        body: 'Four variables determine your channel RPM: audience geographic distribution (Tier 1 regions command higher ad rates than emerging markets), content niche commercial intent (finance, software, and real estate attract higher advertiser bidding than general gaming or entertainment), seasonal ad spend cycles (advertisers surge budgets in Q4 holidays and reset in January), and average percentage viewed (longer watch duration creates mid-roll ad opportunities).',
        keyTakeaway: 'Audience location, topic intent, seasonal auction cycles, and video length dictate your realized RPM.',
      },
    ],
    workedExample: {
      title: 'Comparing Long-Form vs. Shorts Scenario Modeling',
      scenario: 'A channel produces both long-form educational tutorials and short-form clips, generating 250,000 long-form views and 2,000,000 Shorts views in a single month.',
      steps: [
        'Analyze long-form performance: 250,000 views with an observed Studio net RPM of $6.20.',
        'Calculate long-form earnings: 250,000 × ($6.20 / 1,000) = $1,550.00 net.',
        'Analyze Shorts performance: 2,000,000 views from the Shorts pooled feed with an observed RPM of $0.08.',
        'Calculate Shorts earnings: 2,000,000 × ($0.08 / 1,000) = $160.00 net.',
        'Add channel memberships: $240.00 from 50 recurring channel members.',
        'Total take-home revenue: $1,550.00 + $160.00 + $240.00 = $1,950.00 (no double platform deduction).',
      ],
      conclusion: 'Separating long-form and Shorts models ensures realistic expectations: long-form drives core ad income while Shorts expands reach.',
    },
    checklist: [
      {
        title: 'Model Using Net RPM',
        detail: 'Base cash flow forecasts on verified net RPM rather than gross advertiser CPM.',
      },
      {
        title: 'Avoid Double Deduction',
        detail: 'Do not subtract the 45% platform split from Studio RPM values; it is already deducted.',
      },
      {
        title: 'Separate Long-Form from Shorts',
        detail: 'Never combine long-form and Shorts views into a single average RPM expectation.',
      },
      {
        title: 'Account for Geographic Blends',
        detail: 'Review Studio geography reports to understand how viewer country mix impacts blended RPM.',
      },
      {
        title: 'Plan for Seasonality Swings',
        detail: 'Anticipate lower RPMs in January and February following peak Q4 holiday ad demand.',
      },
    ],
    relatedToolIds: [
      'youtube-rpm-calculator',
      'youtube-revenue-calculator',
      'youtube-monetization-calculator',
      'youtube-watch-hours-calculator',
    ],
  },
  {
    slug: 'youtube-shorts-safe-zone',
    title: 'Shorts Safe Zones: Keeping Subtitles & Faces Unobscured',
    category: 'Shorts',
    readTime: '5 min read',
    description:
      'Practical layout recommendations for 9:16 vertical video, understanding interactive UI overlays, and accounting for device aspect ratio variations.',
    lastVerified: 'October 2026',
    officialSources: [
      {
        label: 'YouTube Help: Create YouTube Shorts',
        url: 'https://support.google.com/youtube/answer/10059070?hl=en',
        description: 'Official YouTube guidance for vertical video creation, camera tools, and Shorts formats.',
      },
      {
        label: 'YouTube Help: Video specifications',
        url: 'https://support.google.com/youtube/answer/72431?hl=en',
        description: 'Platform standards for video aspect ratios, frame sizes, and container standards.',
      },
    ],
    contentSections: [
      {
        heading: '1. The 9:16 Canvas & Native Interface Overlays',
        body: 'YouTube Shorts use a standard vertical 9:16 aspect ratio (1080×1920 pixels). However, unlike traditional widescreen video where the entire frame is unobstructed, the YouTube Shorts mobile player renders numerous interactive UI controls directly over top of your video content. These persistent overlays include the right-hand interaction rail, bottom metadata panel, top header icons, and the bottom progress bar.',
        keyTakeaway: 'The full 1080×1920 canvas is recorded, but a substantial perimeter is occupied by interactive mobile interface elements.',
      },
      {
        heading: '2. Anatomy of the Obstruction Zones',
        body: 'The active interface divides into four critical danger areas: (1) The Right Interaction Stack houses the Like button, Dislike button, Comments counter, Share icon, Remix button, and spinning audio disc. (2) The Bottom Metadata Zone contains the channel avatar, handle, Subscribe button, video title, and sound track title. (3) The Top Header contains feed navigation tabs, search, and camera shortcuts. (4) The Bottom Edge holds the scrubbable progress bar.',
        keyTakeaway: 'The right margin and lower third contain the densest interactive elements and highest risk of text obstruction.',
      },
      {
        heading: '3. Practical Recommendations vs. Device Variance',
        body: 'It is essential to understand that safe zone margins are practical design recommendations and planning aids, not guaranteed exact platform borders. Mobile phone screens vary widely in physical aspect ratio, ranging from older 16:9 displays to modern 19.5:9 and 20:9 tall screens (e.g., iPhone 15/16 and Samsung Galaxy devices). Furthermore, video titles with 60 or more characters wrap into two or three lines of text, raising the bottom metadata overlay substantially higher up the screen. Recommended starting margins are roughly 15% top, 28% bottom, 18% right, and 5% left.',
        keyTakeaway: 'Margins are practical planning guidelines. Screen aspect ratios and multi-line titles shift overlay bounds dynamically.',
      },
      {
        heading: '4. The Central Safe Corridor for Subtitles & Focal Action',
        body: 'To ensure speech captions, instructional callouts, and key human expressions remain visible across all mobile devices, position burned-in subtitles strictly within the central vertical corridor between 40% and 65% of screen height (approx. Y=770px to Y=1250px). Horizontally, center your captions and leave at least 200 pixels of clearance from the right screen edge to avoid collision with the Like and Comment buttons.',
        keyTakeaway: 'Anchor subtitles and key action in the central 40%–65% vertical corridor, centered horizontally with safe side margins.',
      },
    ],
    workedExample: {
      title: 'Placing Subtitles and Face on a 1080×1920 Tutorial Short',
      scenario: 'A creator edits a 45-second vertical tutorial with automated animated captions, a 70-character video title, and a talking head presenter.',
      steps: [
        'Canvas setup: Master timeline rendered at 1080×1920 pixels (9:16 vertical orientation).',
        'Title expansion check: The 70-character title wraps across two lines on mobile, expanding bottom overlay height to roughly 480 pixels.',
        'Subtitle positioning: Burned-in captions are set at Y=1120px (approx. 58% down the screen), safely above the 480px bottom metadata zone.',
        'Right rail clearance: Subtitle width is capped at 720px and centered horizontally, maintaining 180px clearance from both left and right edges.',
        'Presenter framing: The speaker face is framed in the upper-middle sector (Y=300px to Y=700px), below top search icons and above captions.',
      ],
      conclusion: 'When played in the mobile YouTube Shorts player, neither the subtitle text nor the presenter face collides with comments or player controls.',
    },
    checklist: [
      {
        title: 'Master Aspect Ratio',
        detail: 'Render strictly in 9:16 vertical resolution (1080×1920 recommended).',
      },
      {
        title: 'Central Subtitle Corridor',
        detail: 'Place burned-in captions between 40% and 65% of total canvas height.',
      },
      {
        title: 'Right-Side Rail Buffer',
        detail: 'Keep critical text and graphics at least 18% (approx. 200px) away from the right edge.',
      },
      {
        title: 'Bottom Metadata Allowance',
        detail: 'Reserve the lower 25%–30% of canvas height for channel handle, title, and sound details.',
      },
      {
        title: 'Title Length Awareness',
        detail: 'Recognize that longer titles push the clickable bottom overlay further up the screen.',
      },
    ],
    relatedToolIds: [
      'youtube-shorts-safe-zone',
      'youtube-title-checker',
      'youtube-thumbnail-resizer',
      'youtube-thumbnail-compressor',
    ],
  },
];

export function getGuideBySlug(slug: string): GuideItem | undefined {
  return guides.find((guide) => guide.slug === slug);
}
