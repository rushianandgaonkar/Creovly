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
  /** Shorter <title> for search results (≤50 chars; layout adds " | Creovly"). */
  seoTitle?: string;
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
    seoTitle: 'YouTube Thumbnail Size, Limits & CTR Guide',
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
        heading: '1. YouTube thumbnail size and dimensions: 1280×720',
        body: 'According to official YouTube platform specifications, the standard YouTube thumbnail size is 1280×720 pixels with a 16:9 aspect ratio and a minimum width of 640 pixels. Supported file formats include JPG, GIF, and PNG (with JPEG or PNG officially recommended). A critical distinction exists regarding upload file size: mobile video thumbnail uploads enforce a strict 2 MB ceiling, whereas desktop web uploads accommodate files up to 50 MB. For YouTube Shorts, thumbnails use a 9:16 vertical aspect ratio (1080×1920); custom uploads cannot be added after publishing, so you must select your preferred frame during mobile upload. To update existing videos, see our walkthrough on how to change a YouTube thumbnail.',
        keyTakeaway: 'Standardize on a YouTube thumbnail size of 1280×720 (16:9) in JPEG or PNG, keeping file weight under 2 MB for universal mobile and desktop upload compatibility.',
      },
      {
        heading: '2. YouTube thumbnail aspect ratio and framing standards',
        body: 'The standard YouTube thumbnail aspect ratio is 16:9 widescreen. Maintaining this exact proportion prevents YouTube from adding black pillarbox bars on the sides or letterbox bars on the top and bottom. While desktop displays render large previews, mobile search results and suggestion feeds shrink this 16:9 canvas down to roughly 150 to 220 pixels wide. By contrast, Shorts feeds require a 9:16 vertical framing where key subjects should remain centered.',
        keyTakeaway: 'Stick strictly to a 16:9 aspect ratio for long-form video thumbnails to avoid letterboxing and distortion across platforms.',
      },
      {
        heading: '3. Mobile-First Legibility & The Small-Scale Test',
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
    seoTitle: 'YouTube RPM Explained: How Creators Get Paid',
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
    seoTitle: 'Shorts Safe Zones: Keep Subtitles & Faces Clear',
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
  {
    slug: 'youtube-banner-size',
    title: 'YouTube Banner Size: Dimensions, Safe Area & Template',
    seoTitle: 'YouTube Banner Size: Dimensions & Safe Area',
    category: 'Channel Branding',
    readTime: '5 min read',
    description:
      'Verified YouTube banner size guidelines: 2560×1440 resolution, 1235×338 central safe area for mobile and desktop, 6 MB file limit, and templates.',
    lastVerified: 'November 2026',
    officialSources: [
      {
        label: 'YouTube Help: Manage your channel branding',
        url: 'https://support.google.com/youtube/answer/2972003?hl=en',
        description:
          'Official platform specifications for banner image dimensions, minimum safe area for text and logos, supported image file formats, and upload limits.',
      },
    ],
    contentSections: [
      {
        heading: '1. Recommended YouTube banner size and dimensions: 2560×1440',
        body: 'According to official YouTube platform specifications, the standard YouTube banner size is 2560 × 1440 pixels with a 16:9 aspect ratio. The minimum upload dimensions are 2048 × 1152 pixels. Uploading at the full 2560 × 1440 resolution guarantees sharp visual clarity on high-DPI desktop screens and 4K smart TVs without pixelation.',
        keyTakeaway: 'Standardize on a 2560 × 1440 canvas (16:9) with at least 2048 × 1152 pixels for upload acceptance.',
      },
      {
        heading: '2. Central safe area for text and logos: 1235×338',
        body: 'Because YouTube displays channel banners across mobile phones, tablets, desktops, and television screens, the image is cropped differently depending on the viewer’s device. To prevent channel names, slogans, social handles, or faces from being cut off, keep all vital content inside the central 1235 × 338 pixel safe area (centered both horizontally and vertically). Outer canvas areas will be cropped on mobile devices.',
        keyTakeaway: 'Place all critical typography, logos, and focal elements strictly within the central 1235 × 338 safe zone.',
      },
      {
        heading: '3. Maximum file size and supported formats',
        body: 'YouTube enforces a strict 6 MB maximum file size for channel banners. Supported formats include JPG, PNG, BMP, and non-animated GIF. For photographic channel art, an optimized JPEG delivers the best balance of file weight and image quality. If your artwork consists of clean vector graphics and text, use PNG. If your file exceeds 6 MB, compress it before uploading.',
        keyTakeaway: 'Keep files at or below 6 MB in JPG or PNG format to ensure upload acceptance in YouTube Studio.',
      },
      {
        heading: '4. Formatting your banner with Creovly’s resizer template',
        body: 'You can test and format your channel art using Creovly’s YouTube Thumbnail Resizer. The built-in 2560 × 1440 banner preset includes an interactive visual guide showing the 1235 × 338 central safe area, allowing you to preview how your design frames before uploading to YouTube Studio.',
        keyTakeaway: 'Use the 2560 × 1440 preset in the resizer tool to inspect mobile and desktop crop boundaries.',
      },
    ],
    workedExample: {
      title: 'Centering Channel Header Art to Prevent Mobile Clipping',
      scenario: 'A creator designs a 2560×1440 channel banner. When viewed on mobile, their logo and upload schedule are partially cropped off because the graphics were positioned outside the central safe area.',
      steps: [
        'Identify mobile crop boundaries: The YouTube mobile app displays only the central 1235 × 338 strip of the 2560 × 1440 image.',
        'Re-position text and logos: Move channel branding and release schedule into the central 1235 × 338 boundary.',
        'Preserve full-canvas background: Extend textures and graphics across the full 2560 × 1440 canvas so television displays see a complete image.',
        'Compress under 6 MB: Export the final image as an optimized JPEG under 6 MB using Creovly image utilities.',
      ],
      conclusion: 'The banner displays key text and logos crisply across mobile devices while expanding gracefully on desktop browsers and TVs.',
    },
    checklist: [
      {
        title: 'Master Canvas Size',
        detail: 'Set canvas resolution to 2560 × 1440 pixels (minimum 2048 × 1152 pixels).',
      },
      {
        title: 'Central Safe Area',
        detail: 'Confine all text, logos, and critical graphics within the 1235 × 338 pixel center zone.',
      },
      {
        title: 'File Weight Ceiling',
        detail: 'Ensure the exported image is strictly 6 MB or smaller in JPG or PNG format.',
      },
      {
        title: 'Multi-Screen Review',
        detail: 'Check channel display in both the YouTube mobile app and desktop browser after uploading.',
      },
    ],
    relatedToolIds: [
      'youtube-thumbnail-resizer',
      'youtube-thumbnail-compressor',
      'logo-background-remover',
    ],
  },
  {
    slug: 'youtube-monetization-requirements',
    title: 'YouTube Monetization Requirements Explained',
    seoTitle: 'YouTube Monetization Requirements Explained',
    category: 'Monetization',
    readTime: '7 min read',
    description:
      'Clear breakdown of YouTube monetization requirements: 500 & 1,000 subscriber tiers, 4,000 watch hours, 10M Shorts views, and YPP eligibility policies.',
    lastVerified: 'November 2026',
    officialSources: [
      {
        label: 'YouTube Help: YouTube Partner Program overview & eligibility',
        url: 'https://support.google.com/youtube/answer/72851?hl=en',
        description:
          'Official criteria for joining the YouTube Partner Program, subscriber and watch-hour milestones, and channel monetization policies.',
      },
      {
        label: 'YouTube Help: Monetize on YouTube Shorts',
        url: 'https://support.google.com/youtube/answer/12504220?hl=en',
        description:
          'Official platform guidelines for pooled creator revenue sharing from vertical video in the YouTube Shorts feed.',
      },
    ],
    contentSections: [
      {
        heading: '1. The two YouTube Partner Program eligibility tiers',
        body: 'YouTube offers two tiers of the YouTube Partner Program (YPP). The introductory tier (expanded access for fan funding) unlocks Super Thanks, Super Chat, Super Stickers, channel memberships, and YouTube Shopping. The requirements are: 500 subscribers, 3 valid public uploads in the last 90 days, AND either 3,000 valid public watch hours in the past 12 months OR 3 million public Shorts views in the past 90 days. The full revenue sharing tier unlocks ad revenue on long-form watch pages and Shorts feed ads. The requirements are: 1,000 subscribers, AND either 4,000 valid public watch hours in the past 12 months OR 10 million public Shorts views in the past 90 days. Note that availability for the 500-subscriber tier varies by country and region.',
        keyTakeaway: 'You can start earning from fan funding at 500 subscribers and 3,000 watch hours, while full ad revenue sharing requires 1,000 subscribers and 4,000 watch hours.',
      },
      {
        heading: '2. Valid public watch hours vs invalid watch time',
        body: 'Only valid public watch hours from long-form video count toward the 4,000-hour requirement. Watch time from the YouTube Shorts feed does NOT count toward the 4,000-hour threshold (Shorts qualify through the separate 10M Shorts views pathway). In addition, private videos, unlisted videos, deleted videos, and views generated through Google Ads promotional campaigns do not count toward your monetization watch-hour total.',
        keyTakeaway: 'Watch hours must come from public, non-Shorts videos viewed organically within a rolling 365-day calendar window.',
      },
      {
        heading: '3. Essential account and compliance prerequisites',
        body: 'In addition to subscriber and view thresholds, creators must satisfy strict channel compliance requirements: 2-Step Verification enabled on your Google Account, an active linked Google AdSense account, and zero active Community Guidelines strikes on your channel. Your content must also adhere to YouTube channel monetization policies, including advertiser-friendly content guidelines, original content standards, and copyright rules.',
        keyTakeaway: 'Secure your channel with 2-Step Verification, link an AdSense account, and keep your channel free of active policy strikes.',
      },
      {
        heading: '4. Tracking your progress with Creovly calculators',
        body: 'Track your timeline to 4,000 hours with our YouTube Watch Hours Calculator based on your average view duration. When planning revenue streams, use our YouTube Monetization Calculator to project combined income from ads, memberships, and brand deals.',
        keyTakeaway: 'Use dedicated milestone calculators to model required view velocity rather than relying on rough estimates.',
      },
    ],
    workedExample: {
      title: 'Planning the Milestone Trajectory to 4,000 Watch Hours',
      scenario: 'A creator has 850 subscribers and 2,400 public watch hours. They want to calculate how many views they need to complete the remaining 1,600 watch hours before their oldest hours begin expiring on the rolling 12-month window.',
      steps: [
        'Calculate remaining hours: 4,000 goal − 2,400 current = 1,600 watch hours needed.',
        'Determine view requirements: With an average view duration of 4 minutes, each view yields 0.067 hours. 1,600 ÷ 0.067 = 24,000 views required.',
        'Set publishing pace: Releasing 2 videos per week averaging 2,000 views each produces 16,000 views (approx. 1,067 hours) per month.',
        'Audit account readiness: Verify that 2-Step Verification is active and no Community Guidelines strikes exist in YouTube Studio.',
      ],
      conclusion: 'At this production pace, the creator will reach the 4,000-hour threshold in approximately 6 to 7 weeks, qualifying for full YPP ad revenue sharing.',
    },
    checklist: [
      {
        title: 'Subscriber Threshold',
        detail: 'Reach 500 subscribers (for fan funding) or 1,000 subscribers (for ad revenue sharing).',
      },
      {
        title: 'Watch Hours or Shorts Views',
        detail: 'Accumulate 4,000 public watch hours in 12 months OR 10 million public Shorts views in 90 days.',
      },
      {
        title: '2-Step Verification',
        detail: 'Turn on 2-Step Verification for the Google Account associated with your YouTube channel.',
      },
      {
        title: 'Linked AdSense Account',
        detail: 'Link an approved, active Google AdSense account for payment distribution.',
      },
      {
        title: 'Clean Community Standing',
        detail: 'Ensure your channel has zero active Community Guidelines strikes.',
      },
    ],
    relatedToolIds: [
      'youtube-watch-hours-calculator',
      'youtube-monetization-calculator',
      'youtube-revenue-calculator',
    ],
  },
  {
    slug: 'how-to-change-youtube-thumbnail',
    title: 'How to Change a YouTube Thumbnail, Step by Step',
    seoTitle: 'How to Change a YouTube Thumbnail (Step by Step)',
    category: 'Visual Packaging',
    readTime: '5 min read',
    description:
      'Step-by-step tutorial on how to change a thumbnail on YouTube: desktop Studio, mobile app, account phone verification, and Shorts thumbnail selection.',
    lastVerified: 'November 2026',
    officialSources: [
      {
        label: 'YouTube Help: Add or change video thumbnails',
        url: 'https://support.google.com/youtube/answer/72431?hl=en',
        description:
          'Official platform documentation for uploading, changing, and selecting custom video thumbnails on desktop and mobile.',
      },
    ],
    contentSections: [
      {
        heading: '1. Phone verification: unlocking custom thumbnail uploads',
        body: 'Before you can upload a custom thumbnail to YouTube, your channel must have verified phone status. If your account is not verified, YouTube will only allow you to pick from three automatically generated freeze frames. To unlock custom thumbnails, go to YouTube Studio settings, select Channel > Feature eligibility, and complete phone number verification under Intermediate features.',
        keyTakeaway: 'Complete standard phone verification in YouTube Studio settings to unlock custom thumbnail uploads.',
      },
      {
        heading: '2. How to change a thumbnail on desktop in YouTube Studio',
        body: 'To change a thumbnail on a computer, sign in to YouTube Studio. Click "Content" from the left menu and click on the video you want to edit. Under the "Thumbnail" section on the Video Details page, hover over your current thumbnail, click the Options icon (three vertical dots), and select "Change". Select your new 1280 × 720 image file and click "Save" in the top-right corner.',
        keyTakeaway: 'In YouTube Studio > Content > Video Details, click the three dots on the thumbnail box and select "Change".',
      },
      {
        heading: '3. How to change a thumbnail on the YouTube Studio mobile app',
        body: 'Open the YouTube Studio app on iOS or Android. Tap "Content" in the bottom navigation bar and select the video. Tap the Edit icon (pencil) at the top of the screen, then tap the pencil icon in the upper-left corner of the thumbnail preview. Tap "Change" to select a new image from your device photos, crop if prompted, tap "Done", and select "Save". Remember that mobile uploads strictly enforce a 2 MB file limit.',
        keyTakeaway: 'Tap the pencil edit icon in the YouTube Studio mobile app to replace your thumbnail on the go.',
      },
      {
        heading: '4. How to select or change a YouTube Shorts thumbnail',
        body: 'YouTube Shorts handle thumbnails differently than long-form videos. Currently, custom thumbnail uploads from desktop are not supported for published Shorts. Instead, you must select your thumbnail frame during the initial upload process in the YouTube mobile app. On the final upload screen, tap the pencil icon on your video preview and drag the frame selector to your desired moment. Once published, this frame serves as your Shorts thumbnail.',
        keyTakeaway: 'Choose your Shorts thumbnail frame during mobile upload; desktop custom thumbnail replacement is not currently supported for published Shorts.',
      },
      {
        heading: '5. Technical preparation: dimensions and compression',
        body: 'For optimal visual quality, prepare your image to 1280 × 720 resolution (16:9 aspect ratio) using Creovly’s YouTube Thumbnail Resizer. Ensure the file weight is under 2 MB with our YouTube Thumbnail Compressor to avoid mobile upload rejections. For full CTR optimization strategies, read The YouTube Thumbnail Blueprint.',
        keyTakeaway: 'Format thumbnails to 1280 × 720 and compress below 2 MB before uploading to ensure fast processing and zero upload errors.',
      },
    ],
    workedExample: {
      title: 'Replacing an Underperforming Thumbnail to Boost CTR',
      scenario: 'A creator notices that a video published 48 hours ago has a 2.1% click-through rate. They design a higher-contrast thumbnail with clearer focal text and need to replace the live image without losing views or analytics.',
      steps: [
        'Format new artwork: Export the revised thumbnail at 1280 × 720 pixels in JPG format.',
        'Compress under 2 MB: Run the file through Creovly Thumbnail Compressor, reducing size to 510 KB.',
        'Open YouTube Studio: Navigate to Content, click the video, and locate the Thumbnail panel.',
        'Execute replacement: Click the three-dot menu on the existing thumbnail, select "Change", upload the new file, and click "Save".',
        'Monitor response: Track Impressions click-through rate in YouTube Studio analytics over the following 72 hours.',
      ],
      conclusion: 'The replacement thumbnail goes live immediately across YouTube search and recommendations without resetting video view counts or comments.',
    },
    checklist: [
      {
        title: 'Account Verification',
        detail: 'Confirm phone verification is completed in YouTube Studio Channel Settings.',
      },
      {
        title: 'Recommended Dimensions',
        detail: 'Format image to 1280 × 720 pixels with a 16:9 aspect ratio.',
      },
      {
        title: 'File Size Compliance',
        detail: 'Ensure file is under 2 MB for mobile Studio compatibility.',
      },
      {
        title: 'Format Selection',
        detail: 'Use JPEG or PNG format with an sRGB color profile.',
      },
      {
        title: 'Save Confirmation',
        detail: 'Click Save in YouTube Studio and verify the thumbnail renders on the public watch page.',
      },
    ],
    relatedToolIds: [
      'youtube-thumbnail-resizer',
      'youtube-thumbnail-compressor',
      'youtube-shorts-safe-zone',
    ],
  },
];

const GUIDE_OG_IMAGES: Record<string, string> = {
  'youtube-thumbnail-blueprint': '/og/youtube-thumbnail-blueprint.png',
  'decoding-youtube-rpm': '/og/decoding-youtube-rpm.png',
  'youtube-shorts-safe-zone': '/og/guide-youtube-shorts-safe-zone.png',
};

export function getGuideOgImage(slug: string): string {
  return GUIDE_OG_IMAGES[slug] || '/og-image.png';
}

export function getGuideBySlug(slug: string): GuideItem | undefined {
  return guides.find((guide) => guide.slug === slug);
}
