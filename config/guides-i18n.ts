import type { Locale } from './i18n';

export interface LocalizedGuideSection {
  heading: string;
  body: string;
  keyTakeaway?: string;
}

export interface LocalizedWorkedExample {
  title: string;
  scenario: string;
  steps: string[];
  conclusion: string;
}

export interface LocalizedChecklistItem {
  title: string;
  detail: string;
}

export interface LocalizedOfficialSource {
  label: string;
  description: string;
}

export interface LocalizedFaqItem {
  question: string;
  answer: string;
}

export interface LocalizedGuideData {
  title: string;
  /** Shorter <title> for search results (≤50 chars; layout adds " | Creovly"). */
  seoTitle?: string;
  category: string;
  readTime: string;
  description: string;
  officialSources: LocalizedOfficialSource[];
  contentSections: LocalizedGuideSection[];
  workedExample: LocalizedWorkedExample;
  checklist: LocalizedChecklistItem[];
  faqs: LocalizedFaqItem[];
}

export const localizedGuides: Record<Locale, Record<string, LocalizedGuideData>> = {
  en: {
    'youtube-thumbnail-blueprint': {
      title: 'The YouTube Thumbnail Blueprint: File Limits, Dimensions & CTR',
      seoTitle: 'YouTube Thumbnail Size, Limits & CTR Guide',
      category: 'Visual Packaging',
      readTime: '6 min read',
      description: 'Verified platform guidelines for 1280×720 aspect ratios, 2 MB mobile upload limits, and mobile-first legibility to maximize visual clarity.',
      officialSources: [
        {
          label: 'YouTube Help: Add video thumbnails',
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
          heading: '4. Interface Dead Zones & The Timestamp Overlay',
          body: 'Every YouTube thumbnail is overlaid with native player interface elements when displayed in browse, search, and channel feeds. The most critical obstruction is the video duration badge in the bottom-right corner (e.g., "14:28"). If you place faces, primary hook text, branding logos, or punchline visual cues in the lower-right 20% width and 15% height of your canvas, YouTube will inevitably cover them with the timestamp box. Similarly, keep essential visual markers slightly inset from the extreme edges to prevent awkward clipping on various device border radiuses.',
          keyTakeaway: 'Keep the bottom-right 20% width and 15% height completely clear of text, faces, or essential storytelling details.',
        },
      ],
      workedExample: {
        title: 'Resolving the Mobile Upload Failure Trap',
        scenario: 'A gaming creator designs a high-detail 1440p thumbnail in Photoshop. The uncompressed PNG weighs 4.8 MB. When attempting to upload the thumbnail via the YouTube Studio mobile app on iOS while traveling, the upload continuously fails with a generic error code.',
        steps: [
          'Identify the root cause: The YouTube Studio mobile app strictly enforces a 2 MB ceiling on thumbnail uploads, even though desktop web uploads allow up to 50 MB.',
          'Downscale the canvas from 2560×1440 down to the platform standard 1280×720 (16:9), eliminating unnecessary pixel overhead without visual fidelity loss on retina screens.',
          'Pass the graphic through local client-side WebAssembly compression, exporting as an optimized JPEG with 85% quality encoding to reduce the file payload to 420 KB.',
        ],
        conclusion: 'By exporting at native 1280×720 instead of 1440p and optimizing compression, the file size dropped from 4.8 MB to 420 KB (a 91% reduction), ensuring instant, error-free uploads across both mobile and desktop platforms.',
      },
      checklist: [
        { title: 'Verify Canvas Resolution', detail: 'Ensure your canvas is precisely 1280×720 pixels (16:9 aspect ratio) with a minimum width of 640px.' },
        { title: 'Enforce the 2 MB Ceiling', detail: 'Compress your final image file below 2 MB to guarantee seamless mobile Studio app uploads.' },
        { title: 'Clear the Timestamp Dead Zone', detail: 'Audit the bottom-right 20% width and 15% height to ensure no critical text, faces, or logos are obscured by the duration overlay.' },
        { title: 'Pass the 15% Mobile Zoom Test', detail: 'Zoom out to 15% scale on your monitor to verify that focal silhouettes and primary typography remain instantly legible.' },
      ],
      faqs: [
        {
          question: 'What size is a YouTube thumbnail?',
          answer: 'The recommended YouTube thumbnail size is 1280 × 720 pixels with a 16:9 aspect ratio and a minimum width of 640 pixels. Files must remain under 2 MB for mobile Studio uploads and under 50 MB on desktop, formatted as JPG, PNG, or GIF.',
        },
        {
          question: "What are YouTube's official thumbnail dimensions and file size limits?",
          answer: "YouTube recommends a 16:9 aspect ratio with 1280×720 pixels (minimum width 640px) in JPG, PNG, or WebP format. Mobile uploads enforce a strict 2 MB ceiling, while desktop web uploads allow up to 50 MB.",
        },
        {
          question: "Where is the thumbnail timestamp dead zone?",
          answer: "The video duration badge occupies the bottom-right 20% width and 15% height of the thumbnail. Keep faces, logos, and critical hook text away from this area.",
        },
        {
          question: "Why should thumbnails be tested at mobile rendering size?",
          answer: "Mobile YouTube home feeds display thumbnails at roughly 150 to 220 pixels wide. Designs must use high-contrast silhouettes and bold text readable at 15% zoom.",
        },
      ],
    },
    'decoding-youtube-rpm': {
      title: 'Decoding YouTube RPM: How Creators Actually Get Paid in 2026',
      seoTitle: 'YouTube RPM Explained: How Creators Get Paid',
      category: 'Monetization',
      readTime: '8 min read',
      description: 'A mathematical analysis of creator RPM vs advertiser CPM, geographic audience tiers, platform revenue shares, and net earnings calculation.',
      officialSources: [
        {
          label: 'YouTube Help: Understand your revenue metrics (RPM & CPM)',
          description: 'Official YouTube Creator documentation distinguishing net creator RPM from advertiser gross CPM.',
        },
      ],
      contentSections: [
        {
          heading: '1. RPM vs CPM: The Crucial Structural Distinction',
          body: 'Many creators confuse CPM (Cost Per Mille) with RPM (Revenue Per Mille). CPM is what advertisers pay to buy 1,000 ad impressions on YouTube before platform revenue cuts. In contrast, RPM measures your actual take-home revenue per 1,000 total video views, after YouTube takes its 45% revenue share on long-form content. Crucially, RPM includes views where no ads were served, and also aggregates earnings from YouTube Premium subscriptions, channel memberships, and Super Chat tips.',
          keyTakeaway: 'CPM is what advertisers pay YouTube; RPM is what lands in your creator bank account per 1,000 views.',
        },
        {
          heading: '2. The Revenue Mix: What Flows Into Creator RPM',
          body: 'Unlike CPM which only tracks monetized ad impressions, your RPM reflects your blended channel monetization efficiency. If 40% of your viewers use ad blockers or view from geographic regions with low ad inventory, your CPM might remain high while your RPM drops significantly. Conversely, strong channel membership adoption and Super Thanks contributions lift your RPM well above baseline ad payouts.',
          keyTakeaway: 'Maximize RPM by diversifying revenue streams beyond ad impressions into memberships, affiliate integrations, and Super Thanks.',
        },
        {
          heading: '3. Platform Deductions & The Double-Counting Trap',
          body: 'A widespread error when estimating channel income is subtracting YouTube’s 45% platform cut from the RPM reported in YouTube Studio. The RPM figure in your YouTube Studio analytics is already your net take-home metric. Deducting 45% again will underestimate your true financial yield by almost half. Furthermore, Shorts monetization follows a completely different pooled allocation model where creator payouts are based on your channel’s share of total nationwide Shorts views rather than direct per-video ad bidding.',
          keyTakeaway: 'Never subtract 45% from YouTube Studio RPM; it has already been deducted by the platform.',
        },
      ],
      workedExample: {
        title: 'Accurately Calculating Take-Home Channel Revenue',
        scenario: 'A technology review channel accumulates 250,000 monthly views. YouTube Studio displays a reported RPM of $4.80 and a playback-based CPM of $11.50.',
        steps: [
          'Recognize that playback-based CPM ($11.50) is advertiser gross spend, while Studio RPM ($4.80) is the creator’s net earnings metric per 1,000 total views.',
          'Avoid the double deduction trap: do not subtract 45% from the $4.80 RPM metric.',
          'Multiply total monthly views by net RPM: (250,000 / 1,000) × $4.80 = $1,200. Add supplemental revenue (e.g., $425 in channel memberships) for total take-home revenue of $1,625.',
        ],
        conclusion: 'The creator earns $1,625 net ad and membership income. Deducting 45% by mistake would have artificially deflated their estimated ad earnings to $660.',
      },
      checklist: [
        { title: 'Isolate Long-Form from Shorts Metrics', detail: 'Evaluate long-form videos and Shorts separately due to distinct monetization mechanics.' },
        { title: 'Verify Deductions Have Occurred', detail: 'Confirm that calculations use net Studio RPM rather than applying redundant platform revenue cuts.' },
        { title: 'Audit Geographic View Distribution', detail: 'Review your audience geography report; high Tier 1 percentages (US, UK, CA, AU) substantially increase RPM.' },
        { title: 'Calculate Multi-Stream Blended RPM', detail: 'Sum ad earnings, memberships, and viewer tipping to establish your true blended channel RPM.' },
      ],
      faqs: [
        {
          question: "What is the difference between CPM and RPM on YouTube?",
          answer: "CPM (Cost Per Mille) is what advertisers pay per 1,000 ad impressions before YouTube takes its 45% cut. RPM (Revenue Per Mille) is your net take-home earnings per 1,000 total video views.",
        },
        {
          question: "Should creators deduct 45% from their YouTube Studio RPM?",
          answer: "No. YouTube Studio RPM already has the platform revenue share deducted. Subtracting 45% again will underestimate your actual earnings by nearly half.",
        },
        {
          question: "How do YouTube Shorts payouts differ from long-form video ad revenue?",
          answer: "Long-form gives creators 55% of direct ad revenue on their video. Shorts pool ad revenue nationwide into a Creator Pool, distributing 45% based on relative view volume.",
        },
      ],
    },
    'youtube-shorts-safe-zone': {
      title: 'Shorts Safe Zones: Keeping Subtitles & Faces Unobscured',
      seoTitle: 'Shorts Safe Zones: Keep Subtitles & Faces Clear',
      category: 'Shorts & Vertical Video',
      readTime: '5 min read',
      description: 'Technical dimensions and UI overlay margins for 9:16 vertical video. Prevent engagement buttons and title tags from blocking your hook.',
      officialSources: [
        {
          label: 'YouTube Creator Portal: Create YouTube Shorts',
          description: 'Official YouTube guidance for vertical video production, mobile framing margins, and interactive engagement overlays.',
        },
      ],
      contentSections: [
        {
          heading: '1. The 9:16 Canvas & Native UI Obstruction Zones',
          body: 'YouTube Shorts use a 9:16 aspect ratio (typically 1080×1920 pixels). Unlike full-screen landscape video, the mobile Shorts interface covers substantial portions of your footage with interactive player overlays. The top ~15% (approx. Y=0 to Y=288px) houses the sound picker, search icon, and camera controls. The bottom ~28% (approx. Y=1380 to Y=1920px) displays channel avatar, subscribe button, audio title, and caption text. The right edge (~18% width, X=885 to X=1080px) holds vertical engagement icons for like, dislike, comments, and sharing.',
          keyTakeaway: 'The central 57% of screen height is your primary safe zone where faces, core action, and subtitles must reside.',
        },
        {
          heading: '2. Title Wrapping & Variable Margin Penetration',
          body: 'The exact height of the bottom UI overlay is dynamic. If your video title is under 30 characters, the bottom overlay remains compact. However, longer titles wrap across two or three lines on narrower mobile screens, pushing the clickable channel card up to 100 pixels higher into your frame. Designing with conservative margins ensures your content remains fully visible even when titles wrap.',
          keyTakeaway: 'Keep key text and facial expressions at least 450 pixels above the bottom edge to account for multi-line title wrapping.',
        },
        {
          heading: '3. The Recommended Caption & Subtitle Corridor',
          body: 'Burned-in captions are vital for viewer retention in sound-off mobile environments. Position subtitle graphics in the safe corridor between 40% and 65% of screen height (approx. Y=770px to Y=1250px), centered horizontally with at least 180px clearance from the right-hand icon rail. Placing subtitles in the lower third inevitably causes collisions with the audio attribution marquee or channel handle.',
          keyTakeaway: 'Center subtitles in the 40% to 65% vertical corridor with a minimum 180px right-side margin.',
        },
      ],
      workedExample: {
        title: 'Re-framing a Talking-Head Short to Preserve Subtitles',
        scenario: 'An educator films a vertical short with burned-in captions located at the bottom of the screen (Y=1750px). After uploading, viewers complain that the subscribe button and audio title completely obscure the subtitles.',
        steps: [
          'Audit the frame against the mobile Shorts overlay layout: the bottom 28% of the vertical canvas is designated for channel metadata and player controls.',
          'Shift the caption track upward into the recommended safe corridor between Y=850px and Y=1200px.',
          'Inset right-aligned graphics by at least 180px to prevent obstruction by the vertical like and comment column.',
        ],
        conclusion: 'Positioning captions at Y=900px centered with 180px right padding restored 100% subtitle legibility across all mobile device screen sizes.',
      },
      checklist: [
        { title: 'Clear the Top Action Header', detail: 'Leave the top 15% (top 288px) free of critical graphics or headlines.' },
        { title: 'Protect the Bottom 28% Description Area', detail: 'Keep primary subjects and subtitles above Y=1380px to avoid collisions with channel titles and controls.' },
        { title: 'Inset from the Right Engagement Column', detail: 'Ensure graphics maintain at least 180px clearance from the right canvas edge.' },
        { title: 'Check Multi-Line Title Collision', detail: 'Simulate 2-line title wrapping to ensure dynamic bottom metadata does not overlap key elements.' },
      ],
      faqs: [
        {
          question: "What are the safe zone dimensions for YouTube Shorts?",
          answer: "YouTube Shorts use a 9:16 vertical canvas (1080×1920 pixels). Interactive overlays occupy approximately 15% at the top, 28% at the bottom, and 18% on the right.",
        },
        {
          question: "Where is the best corridor to place subtitles in YouTube Shorts?",
          answer: "Place burned-in subtitles in the central vertical corridor between 40% and 65% of screen height (approx. Y=770px to Y=1250px), centered horizontally with at least 180px right-side clearance.",
        },
        {
          question: "How does video title length affect Shorts overlay coverage?",
          answer: "Titles with 60 or more characters wrap into multiple lines on mobile screens, raising the clickable bottom metadata overlay further up into your video content.",
        },
      ],
    },
    'youtube-banner-size': {
      title: 'YouTube Banner Size: Dimensions, Safe Area & Template',
      seoTitle: 'YouTube Banner Size: Dimensions & Safe Area',
      category: 'Channel Branding',
      readTime: '5 min read',
      description: 'Verified YouTube banner size guidelines: 2560×1440 resolution, 1235×338 central safe area for mobile and desktop, 6 MB file limit, and templates.',
      officialSources: [
        {
          label: 'YouTube Help: Manage your channel branding',
          description: 'Official platform specifications for banner image dimensions, minimum safe area for text and logos, supported image file formats, and upload limits.',
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
      faqs: [
        {
          question: 'What is the recommended YouTube banner size?',
          answer: 'The official recommended YouTube banner size is 2560 × 1440 pixels with a 16:9 aspect ratio and a minimum size of 2048 × 1152 pixels.',
        },
        {
          question: 'What is the YouTube banner safe area?',
          answer: 'The safe area for text and logos is 1235 × 338 pixels centered horizontally and vertically. Any content inside this area will be visible across mobile phones, tablets, desktops, and TVs.',
        },
        {
          question: 'What is the maximum file size for a YouTube banner?',
          answer: 'YouTube channel banner image files must be 6 MB or smaller in JPG, PNG, BMP, or non-animated GIF format.',
        },
      ],
    },
    'youtube-monetization-requirements': {
      title: 'YouTube Monetization Requirements Explained',
      seoTitle: 'YouTube Monetization Requirements Explained',
      category: 'Monetization',
      readTime: '7 min read',
      description: 'Clear breakdown of YouTube monetization requirements: 500 & 1,000 subscriber tiers, 4,000 watch hours, 10M Shorts views, and YPP eligibility policies.',
      officialSources: [
        {
          label: 'YouTube Help: YouTube Partner Program overview & eligibility',
          description: 'Official criteria for joining the YouTube Partner Program, subscriber and watch-hour milestones, and channel monetization policies.',
        },
        {
          label: 'YouTube Help: Monetize on YouTube Shorts',
          description: 'Official platform guidelines for pooled creator revenue sharing from vertical video in the YouTube Shorts feed.',
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
      faqs: [
        {
          question: 'What are the requirements to get monetized on YouTube?',
          answer: 'For full ad revenue sharing, you need 1,000 subscribers and either 4,000 valid public watch hours in the past 12 months or 10 million public Shorts views in the past 90 days. An introductory fan-funding tier is available at 500 subscribers and 3,000 watch hours.',
        },
        {
          question: 'Do YouTube Shorts watch hours count toward the 4,000 hours?',
          answer: 'No, watch time from the YouTube Shorts feed does not count toward the 4,000 public watch hours requirement. Shorts views qualify through the separate threshold of 10 million views in 90 days.',
        },
        {
          question: 'How long do you have to get 4,000 watch hours?',
          answer: 'The 4,000 public watch hours must be accumulated within a rolling 365-day window. Any hours earned more than 365 days ago expire from your eligibility count.',
        },
      ],
    },
    'how-to-change-youtube-thumbnail': {
      title: 'How to Change a YouTube Thumbnail, Step by Step',
      seoTitle: 'How to Change a YouTube Thumbnail (Step by Step)',
      category: 'Visual Packaging',
      readTime: '5 min read',
      description: 'Step-by-step tutorial on how to change a thumbnail on YouTube: desktop Studio, mobile app, account phone verification, and Shorts thumbnail selection.',
      officialSources: [
        {
          label: 'YouTube Help: Add or change video thumbnails',
          description: 'Official platform documentation for uploading, changing, and selecting custom video thumbnails on desktop and mobile.',
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
      faqs: [
        {
          question: 'How do you change a YouTube thumbnail after uploading?',
          answer: 'Sign in to YouTube Studio, click Content, and select your video. Under the Thumbnail section on the Details page, click the three-dot menu on your existing thumbnail, choose Change, select your new image, and click Save.',
        },
        {
          question: 'Can you change a YouTube Shorts thumbnail after publishing?',
          answer: 'Currently, custom thumbnail uploads from desktop are not supported for published Shorts. You must choose your thumbnail frame from the mobile app during the initial upload.',
        },
        {
          question: "Why can't I upload custom thumbnails on YouTube?",
          answer: 'Custom thumbnail uploads require phone number verification under Intermediate Features in YouTube Studio Channel Settings. Unverified channels can only select auto-generated video stills.',
        },
      ],
    },
  },

  es: {
    'youtube-thumbnail-blueprint': {
      title: 'Guía técnica de miniaturas de YouTube: Límites, dimensiones y CTR',
      seoTitle: 'Miniaturas de YouTube: tamaño, límites y CTR',
      category: 'Presentación visual',
      readTime: '6 min de lectura',
      description: 'Pautas oficiales de la plataforma para proporciones 16:9, límite de 2 MB en móviles y legibilidad móvil para maximizar el CTR.',
      officialSources: [
        {
          label: 'Ayuda de YouTube: Añadir miniaturas de vídeo',
          description: 'Especificaciones oficiales de YouTube sobre resolución, relación de aspecto, formatos y tamaño máximo de archivo.',
        },
      ],
      contentSections: [
        {
          heading: '1. Dimensiones oficiales y límites de tamaño de archivo',
          body: 'Según la documentación oficial de YouTube, las miniaturas personalizadas deben utilizar una relación de aspecto 16:9 con una resolución recomendada de 1280×720 píxeles y un ancho mínimo de 640 píxeles. Los formatos admitidos son JPG, GIF y PNG. Para subidas, YouTube recomienda JPEG o PNG. Existe una distinción operativa crucial respecto al tamaño: la subida desde la aplicación móvil YouTube Studio impone un límite estricto de 2 MB, mientras que desde la web de escritorio se admiten archivos de hasta 50 MB. Mantener tus exportaciones por debajo de 2 MB con perfil sRGB garantiza la compatibilidad universal en cualquier dispositivo.',
          keyTakeaway: 'Estandariza en resolución 1280×720 (16:9) en formato JPEG o PNG, manteniéndote por debajo de 2 MB para compatibilidad universal.',
        },
        {
          heading: '2. Legibilidad pensada para móvil y prueba a escala reducida',
          body: 'Los dispositivos móviles concentran la mayor parte de las visualizaciones en YouTube. En la pantalla de un móvil, una miniatura de 1280×720 se muestra físicamente a unos 150-220 píxeles de ancho. Texturas complejas o tipografías finas se convierten en ruido visual incomprensible. Prioriza una composición clara de tres elementos: una silueta nítida del sujeto, un fondo contrastado y no más de tres o cuatro palabras en negrita de lectura inmediata. Previsualiza siempre tu diseño al 15% de zoom antes de publicarlo.',
          keyTakeaway: 'Diseña pensando en un ancho móvil de 180 píxeles con siluetas de alto contraste y tipografía bold legible a pequeña escala.',
        },
        {
          heading: '3. Zonas ciegas de la interfaz y la marca de duración',
          body: 'Cada miniatura de YouTube queda parcialmente cubierta por elementos de la interfaz del reproductor. El obstáculo principal es la etiqueta de duración del vídeo en la esquina inferior derecha (por ejemplo, "14:28"). Si sitúas caras, textos clave o logotipos en el 20% inferior derecho de ancho y el 15% de alto, YouTube los tapará por completo.',
          keyTakeaway: 'Mantén el 20% de ancho y 15% de alto de la esquina inferior derecha totalmente despejado de texto o caras.',
        },
      ],
      workedExample: {
        title: 'Solución del error de subida en la app móvil',
        scenario: 'Un creador diseña una miniatura en 1440p en Photoshop con un archivo PNG de 4,8 MB. Al intentar subirla desde la aplicación móvil de YouTube Studio, la subida falla repetidamente con un error genérico.',
        steps: [
          'Identificar la causa: la aplicación móvil YouTube Studio exige un límite estricto de 2 MB, a diferencia de la versión de escritorio que admite hasta 50 MB.',
          'Redimensionar el lienzo de 2560×1440 al estándar de plataforma de 1280×720 (16:9) sin pérdida visual perceptible.',
          'Comprimir mediante WebAssembly local exportando en JPEG con calidad al 85% para reducir el archivo a 420 KB.',
        ],
        conclusion: 'Al exportar a 1280×720 y optimizar la compresión, el tamaño bajó de 4,8 MB a 420 KB (reducción del 91%), garantizando subidas instantáneas y sin errores.',
      },
      checklist: [
        { title: 'Verificar resolución del lienzo', detail: 'Asegúrate de que el lienzo mide exactamente 1280×720 píxeles (relación 16:9) con un mínimo de 640px.' },
        { title: 'Cumplir el límite de 2 MB', detail: 'Comprime el archivo final por debajo de 2 MB para evitar rechazos en la app de YouTube Studio móvil.' },
        { title: 'Despejar la zona de duración', detail: 'Comprueba que no hay textos ni rostros clave en el 20% inferior derecho de la miniatura.' },
        { title: 'Comprobar zoom al 15%', detail: 'Reduce la vista al 15% en tu monitor para verificar que el sujeto y el texto son legibles a tamaño de móvil.' },
      ],
      faqs: [
        {
          question: "¿Cuáles son las dimensiones y límites de peso oficiales para miniaturas de YouTube?",
          answer: "YouTube recomienda una relación 16:9 con resolución de 1280×720 píxeles (mínimo 640px) en formato JPG, PNG o WebP. Las subidas móviles exigen un límite estricto de 2 MB, mientras que en escritorio se admiten hasta 50 MB.",
        },
        {
          question: "¿Dónde está la zona muerta de la marca de tiempo en la miniatura?",
          answer: "La insignia de duración del vídeo cubre el 20% inferior de ancho y el 15% de alto en la esquina inferior derecha. Mantén textos, caras y logotipos alejados de esa zona.",
        },
        {
          question: "¿Por qué deben probarse las miniaturas al tamaño de pantalla móvil?",
          answer: "El feed de inicio de YouTube en móviles muestra las miniaturas a unos 150-220 píxeles de ancho. Los diseños deben usar siluetas contrastadas y texto en negrita legible al 15% de escala.",
        },
      ],
    },
    'decoding-youtube-rpm': {
      title: 'Descifrando el RPM de YouTube: Cómo cobran realmente los creadores en 2026',
      seoTitle: 'RPM de YouTube: cómo cobran los creadores',
      category: 'Monetización',
      readTime: '8 min de lectura',
      description: 'Análisis matemático de RPM frente a CPM, distribución geográfica de audiencia, comisión de YouTube y cálculo de ganancias netas.',
      officialSources: [
        {
          label: 'Ayuda de YouTube: Métricas de ingresos (RPM y CPM)',
          description: 'Documentación oficial que distingue el RPM neto del creador frente al CPM publicitario bruto.',
        },
      ],
      contentSections: [
        {
          heading: '1. RPM frente a CPM: La distinción fundamental',
          body: 'Muchos creadores confunden el CPM (Coste por Mil) con el RPM (Ingresos por Mil). El CPM es lo que pagan los anunciantes por cada 1.000 impresiones de anuncios antes del reparto de ingresos. En cambio, el RPM mide tus ingresos reales netos por cada 1.000 visualizaciones totales de vídeo, tras aplicar la retención del 45% de YouTube en vídeos largos.',
          keyTakeaway: 'El CPM es lo que los anunciantes pagan a YouTube; el RPM es lo que llega a tu cuenta bancaria por cada 1.000 visitas.',
        },
        {
          heading: '2. Composición de ingresos: Qué incluye el RPM del creador',
          body: 'A diferencia del CPM que solo contabiliza impresiones monetizadas, el RPM refleja el rendimiento global de tu canal. Si el 40% de tu audiencia usa bloqueadores de anuncios o proviene de países con bajo inventario, tu CPM puede ser alto pero tu RPM descenderá. Por el contrario, membresías y Super Thanks elevan tu RPM neto.',
          keyTakeaway: 'Aumenta tu RPM diversificando con membresías de canal, integraciones y Super Thanks además de la publicidad clásica.',
        },
        {
          heading: '3. Descuentos de plataforma y el error de deducción doble',
          body: 'Un error frecuente es restar el 45% de YouTube a la cifra de RPM mostrada en YouTube Studio. El RPM de YouTube Studio ya es un dato neto con la comisión deducida. Si restas de nuevo el 45%, infravalorarás tus ingresos reales a casi la mitad.',
          keyTakeaway: 'Nunca restes el 45% al RPM de YouTube Studio: la plataforma ya lo ha descontado.',
        },
      ],
      workedExample: {
        title: 'Cálculo exacto de ingresos netos del canal',
        scenario: 'Un canal de tecnología acumula 250.000 visitas al mes. YouTube Studio muestra un RPM de 4,80 $ y un CPM de reproducción de 11,50 $.',
        steps: [
          'Distinguir que el CPM (11,50 $) es el coste publicitario bruto y el RPM (4,80 $) son los ingresos netos por 1.000 visitas.',
          'Evitar la deducción duplicada: no restar el 45% al RPM de 4,80 $.',
          'Multiplicar visitas mensuales por RPM neto: (250.000 / 1.000) × 4,80 $ = 1.200 $. Sumar ingresos adicionales (425 $ en membresías) para un total neto de 1.625 $.',
        ],
        conclusion: 'El creador ingresa 1.625 $ netos. Restar el 45% por error habría reducido falsamente la estimación publicitaria a 660 $.',
      },
      checklist: [
        { title: 'Separar métricas de vídeos largos y Shorts', detail: 'Analiza vídeos largos y Shorts por separado debido a sus modelos de reparto diferentes.' },
        { title: 'Confirmar deducciones aplicadas', detail: 'Verifica que utilizas el RPM neto de Studio sin aplicar descuentos redundantes.' },
        { title: 'Auditar la procedencia geográfica', detail: 'Revisa la audiencia por países: porcentajes altos en países Tier 1 incrementan el RPM notablemente.' },
        { title: 'Calcular el RPM combinado', detail: 'Suma anuncios, suscripciones y aportaciones para obtener el RPM real de tu canal.' },
      ],
      faqs: [
        {
          question: "¿Cuál es la diferencia entre CPM y RPM en YouTube?",
          answer: "El CPM es lo que pagan los anunciantes por cada 1.000 impresiones de anuncios antes del 45% de YouTube. El RPM son tus ingresos netos reales por cada 1.000 visualizaciones totales del vídeo.",
        },
        {
          question: "¿Deben los creadores restar el 45% al RPM de YouTube Studio?",
          answer: "No. El RPM de YouTube Studio ya tiene deducida la comisión de la plataforma. Restar el 45% de nuevo infravalorará tus ingresos a la mitad.",
        },
        {
          question: "¿En qué se diferencia el pago de Shorts de los vídeos largos?",
          answer: "Los vídeos largos entregan al creador el 55% de los anuncios directos. En Shorts, los ingresos se agrupan en un fondo nacional y se distribuye el 45% en función del volumen relativo de visualizaciones.",
        },
      ],
    },
    'youtube-shorts-safe-zone': {
      title: 'Zonas seguras en Shorts: Mantener subtítulos y rostros visibles',
      seoTitle: 'Zonas seguras en Shorts: subtítulos y rostros',
      category: 'Shorts y vídeo vertical',
      readTime: '5 min de lectura',
      description: 'Medidas técnicas y márgenes de interfaz para formato vertical 9:16. Evita que los botones de interacción tapen tu gancho.',
      officialSources: [
        {
          label: 'Portal de creadores de YouTube: Crear Shorts',
          description: 'Instrucciones oficiales de YouTube para producción vertical, márgenes de pantalla y superposiciones interactivas.',
        },
      ],
      contentSections: [
        {
          heading: '1. El lienzo 9:16 y las zonas de obstrucción de la interfaz',
          body: 'Los Shorts de YouTube utilizan una relación 9:16 (habitualmente 1080×1920 píxeles). La interfaz móvil cubre una parte sustancial del contenido con botones y textos. El 15% superior (Y=0 a 288px) contiene controles de cámara y sonido. El 28% inferior (Y=1380 a 1920px) aloja el avatar, botón de suscribirse y título. El lateral derecho (18% de ancho) aloja los botones de me gusta, comentarios y compartir.',
          keyTakeaway: 'El 57% central de la altura de pantalla es la zona segura principal donde deben situarse caras y subtítulos.',
        },
        {
          heading: '2. Ajuste de títulos largos y margen dinámico',
          body: 'La altura de la zona inferior es variable. Un título largo se divide en dos o tres líneas en pantallas estrechas, elevando los botones interactivos hasta 100 píxeles adicionales sobre tu imagen.',
          keyTakeaway: 'Mantén los elementos clave al menos a 450 píxeles por encima del borde inferior para evitar solapamientos con títulos de dos líneas.',
        },
        {
          heading: '3. El pasillo recomendado para subtítulos y rótulos',
          body: 'Los subtítulos son indispensables para retener espectadores que ven vídeos sin sonido. Sitúa los textos en el pasillo seguro entre el 40% y el 65% de la altura de pantalla (aprox. Y=770px a Y=1250px), centrados horizontalmente y con al menos 180px de margen respecto al lateral derecho.',
          keyTakeaway: 'Centra los subtítulos en el rango del 40% al 65% vertical con al menos 180px de separación en el margen derecho.',
        },
      ],
      workedExample: {
        title: 'Reencuadre de un Short educativo para proteger subtítulos',
        scenario: 'Un creador publica un Short con subtítulos grabados en la parte inferior (Y=1750px). Tras subirlo, comprueba que el botón de suscribirse y el título del audio tapan las frases.',
        steps: [
          'Comprobar el encuadre contra el esquema oficial: el 28% inferior del lienzo está reservado a controles de usuario.',
          'Desplazar la pista de subtítulos hacia el pasillo seguro recomendado entre Y=850px e Y=1200px.',
          'Aplicar un margen derecho de al menos 180px para evitar el solapamiento con los iconos de me gusta y comentarios.',
        ],
        conclusion: 'Reubicar los subtítulos en Y=900px centrados con 180px de margen derecho devolvió el 100% de legibilidad en todos los dispositivos móviles.',
      },
      checklist: [
        { title: 'Despejar el encabezado superior', detail: 'Deja el 15% superior (288px) libre de gráficos o titulares.' },
        { title: 'Proteger el 28% inferior', detail: 'Mantén los subtítulos y rostros por encima de Y=1380px para evitar colisiones con la descripción.' },
        { title: 'Separar del margen derecho', detail: 'Deja un espacio mínimo de 180px respecto al borde derecho de la pantalla.' },
        { title: 'Probar títulos de dos líneas', detail: 'Simula el ajuste de títulos largos para confirmar que la interfaz no invade tu encuadre.' },
      ],
      faqs: [
        {
          question: "¿Cuáles son las medidas de las zonas seguras en YouTube Shorts?",
          answer: "YouTube Shorts utiliza formato 9:16 vertical (1080×1920 píxeles). La interfaz cubre aproximadamente el 15% superior, el 28% inferior y el 18% del margen derecho.",
        },
        {
          question: "¿Dónde es mejor ubicar los subtítulos en YouTube Shorts?",
          answer: "Coloca los subtítulos en el pasillo central entre el 40% y el 65% de altura (Y=770px a Y=1250px), centrados horizontalmente con al menos 180px de margen derecho.",
        },
        {
          question: "¿Cómo afecta la longitud del título a los márgenes del Short?",
          answer: "Títulos de 60 o más caracteres se dividen en varias líneas en móviles, empujando la superposición inferior más arriba hacia tu contenido visual.",
        },
      ],
    },
  },

  ja: {
    'youtube-thumbnail-blueprint': {
      title: 'YouTubeサムネイル設計図：容量制限・推奨解像度・CTR最大化',
      category: 'ビジュアル設計',
      readTime: '読了目安 6分',
      description: 'アスペクト比16:9、解像度1280×720、モバイル2MB上限、スマホ画面での視認性向上に関する公式ガイドライン。',
      officialSources: [
        {
          label: 'YouTubeヘルプ：動画のサムネイルを追加する',
          description: '解像度、アスペクト比、サポート形式、アップロード容量上限に関するYouTube公式規定。',
        },
      ],
      contentSections: [
        {
          heading: '1. 公式解像度とファイルサイズ上限の原則',
          body: 'YouTubeの公式規定によると、カスタムサムネイルはアスペクト比16:9、推奨解像度1280×720ピクセル（最小幅640ピクセル）を使用する必要があります。対応形式はJPG、GIF、PNGです。運用上の重要事項として、YouTube Studioモバイルアプリからのアップロードでは厳格な2MB上限が適用されます（デスクトップWebは最大50MB）。2MB以下かつsRGBエンコーディングを保つことが、あらゆる環境で失敗しない基準です。',
          keyTakeaway: '解像度1280×720（16:9）、JPEGまたはPNG形式、ファイルサイズ2MB以下を徹底します。',
        },
        {
          heading: '2. モバイルファーストの視認性と縮小表示テスト',
          body: 'YouTube視聴の大半はスマートフォンで行われます。モバイルのフィードでは、1280×720のサムネイルは幅約150〜220ピクセル程度に縮小表示されます。細かい文字や複雑な背景は視覚ノイズになります。明確な被写体シルエット1点、高コントラストな背景、太字で3〜4単語以内のテキストという3要素構成を徹底し、必ず15%縮小表示で確認してください。',
          keyTakeaway: '幅180ピクセルのスマホ表示を基準に設計し、高コントラストと太字フォントで視認性を確保します。',
        },
        {
          heading: '3. 画面UIのデッドゾーンと再生時間バッジ',
          body: 'サムネイルの右下には動画の再生時間バッジ（例：「14:28」）が必ず被さります。右下の幅20%・高さ15%のエリアに顔や重要なテキストを配置すると完全に隠れてしまいます。重要な要素は必ず内側に収めてください。',
          keyTakeaway: '右下の幅20%・高さ15%の領域には文字や顔を配置しないようにします。',
        },
      ],
      workedExample: {
        title: 'スマホアプリでのアップロード失敗の解消',
        scenario: '1440pで作成した4.8MBのPNGサムネイルを、YouTube Studioモバイルアプリからアップロードしようとしたところ、エラーで拒否される事態が発生。',
        steps: [
          '原因を特定：モバイルアプリはデスクトップと異なり、厳格な2MBファイル上限が存在します。',
          'キャンバスを公式推奨の1280×720（16:9）にリサイズし、過剰なピクセルを削減。',
          'ブラウザ内のWebAssemblyでJPEG品質85%に最適化圧縮し、ファイル容量を420KBに圧縮。',
        ],
        conclusion: '1280×720への最適化により4.8MBから420KB（91%削減）へ縮小され、モバイル・PC双方で即時アップロードが可能になりました。',
      },
      checklist: [
        { title: 'キャンバス解像度を確認', detail: '1280×720ピクセル（16:9、最小幅640px）に設定されているか確認します。' },
        { title: '2MB制限を遵守', detail: 'モバイルアプリでの拒否を防ぐため、容量を2MB以下に圧縮します。' },
        { title: '再生時間バッジの死角を回避', detail: '右下の幅20%・高さ15%に重要な文字や被写体がないか確認します。' },
        { title: '15%縮小プレビューを実施', detail: 'モニター上で15%に縮小し、スマホ画面でも一瞬で内容が伝わるか検証します。' },
      ],
      faqs: [
        {
          question: "YouTubeサムネイルの公式推奨サイズとファイル容量上限は？",
          answer: "推奨解像度は1280×720ピクセル（16:9、最小幅640px）、形式はJPG・PNG・WebPです。モバイルアプリ経由は2MB上限、PCブラウザは最大50MBまで対応しています。",
        },
        {
          question: "サムネイルの右下デッドゾーンとは何ですか？",
          answer: "動画の再生時間バッジが右下の幅約20%、高さ約15%を覆います。この領域には重要な文字やロゴ、顔を配置しないでください。",
        },
        {
          question: "なぜスマホサイズでの縮小プレビューが必要ですか？",
          answer: "スマホのホームフィードでは幅150〜220px程度に縮小表示されます。15%縮小でも一目で判別できる高コントラストな設計が不可欠です。",
        },
      ],
    },
    'decoding-youtube-rpm': {
      title: 'YouTubeのRPM完全解説：2026年のクリエイター収益の仕組み',
      category: '収益化',
      readTime: '読了目安 8分',
      description: 'RPMとCPMの違い、視聴者地域の階層、プラットフォーム取り分、純収益計算の数学的解説。',
      officialSources: [
        {
          label: 'YouTubeヘルプ：収益指標（RPMとCPM）の概要',
          description: 'クリエイターの手取りRPMと広告主の総支払CPMの違いに関する公式解説。',
        },
      ],
      contentSections: [
        {
          heading: '1. RPMとCPMの決定的な構造的相違点',
          body: 'CPM（インプレッション単価）は広告主が1,000回表示ごとに支払う金額であり、プラットフォームの分配前の数値です。一方、RPM（インプレッション収益）は長編動画でのYouTube取り分45%を差し引いた後、動画全体の1,000回再生あたりでクリエイターの手元に残る純収益です。Premium収益やメンバーシップ、投げ銭も含まれます。',
          keyTakeaway: 'CPMは広告主が支払う総額、RPMは1,000回再生ごとにクリエイターの口座に入る手取り額です。',
        },
        {
          heading: '2. 収益の内訳：RPMを構成する要素',
          body: '広告ブロック利用者や広告需要の低い地域からの視聴が多いと、CPMが高くてもRPMは下がります。逆にチャンネルメンバーシップやSuper Thanksが多いチャンネルは、広告単価以上の高いRPMを実現できます。',
          keyTakeaway: 'メンバーシップや投げ銭など広告以外の収益源を組み合わせることでRPMを最大化できます。',
        },
        {
          heading: '3. 手数料の二重控除という典型的な誤解',
          body: 'YouTube Studioに表示されるRPMから、さらに45%を差し引いて計算してしまうクリエイターが少なくありません。StudioのRPMはすでに45%が引かれた後の純額です。二重に控除すると実際の収益を約半分と誤認してしまいます。',
          keyTakeaway: 'YouTube StudioのRPMから45%を引かないでください。すでに控除済みです。',
        },
      ],
      workedExample: {
        title: 'チャンネル手取り収益の正確な計算例',
        scenario: '月間250,000回再生のテック系チャンネル。YouTube Studio上のRPMが4.80ドル、CPMが11.50ドルと表示されている場合。',
        steps: [
          'CPM（11.50ドル）は広告主の支出総額であり、手取り計算にはStudioのRPM（4.80ドル）を使用。',
          '二重控除を行わず、4.80ドルの数値をそのまま適用。',
          '（250,000 ÷ 1,000）× 4.80ドル ＝ 1,200ドル。メンバーシップ収益425ドルを加え、合計1,625ドルの手取りと算出。',
        ],
        conclusion: '広告とメンバーシップ合計で手取り1,625ドルとなります。誤って45%を二重控除すると推定額が660ドルまで過小評価されます。',
      },
      checklist: [
        { title: '長編とShortsの指標を分離', detail: 'Shortsはプール分配方式のため、長編動画と分けて分析します。' },
        { title: '控除済みであることを確認', detail: 'StudioのRPMはすでに手数料控除後の純手取り指標であることを確認します。' },
        { title: '視聴者の地域構成を分析', detail: 'Tier 1国（アメリカ、イギリス等）の視聴割合が高いほどRPMは高くなります。' },
        { title: '複合RPMを算出', detail: '広告、メンバーシップ、Super Thanksを合算して真のRPMを把握します。' },
      ],
      faqs: [
        {
          question: "YouTubeにおけるCPMとRPMの違いは何ですか？",
          answer: "CPMは広告主が1,000回表示ごとに支払う総額です。RPMはYouTubeの手数料45%が差し引かれた後、総再生数1,000回あたりでクリエイターの手元に入る純収益です。",
        },
        {
          question: "YouTube StudioのRPMからさらに45%を引く必要がありますか？",
          answer: "いいえ。YouTube StudioのRPMはすでにプラットフォーム手数料が引かれた後の数値です。再度引くと実際の収益を半分と誤認してしまいます。",
        },
        {
          question: "Shortsの収益分配は長編動画とどのように異なりますか？",
          answer: "長編は動画単体の広告費の55%を受け取ります。Shortsは国ごとのクリエイタープールに集約され、再生割合に応じて全体の45%が分配されます。",
        },
      ],
    },
    'youtube-shorts-safe-zone': {
      title: 'Shortsセーフゾーン設計：字幕と顔をUIの被りから守る方法',
      category: 'Shorts・縦型動画',
      readTime: '読了目安 5分',
      description: '縦型9:16動画のサイズと画面UIマージン。登録ボタンやタイトルが重要箇所を遮らないための実務ガイド。',
      officialSources: [
        {
          label: 'YouTubeクリエイターポータル：YouTubeショートの作成',
          description: '縦型動画制作、モバイル画面のマージン、操作UIに関する公式案内。',
        },
      ],
      contentSections: [
        {
          heading: '1. 9:16キャンバスと画面UIの遮蔽ゾーン',
          body: 'YouTube Shortsはアスペクト比9:16（1080×1920ピクセル）を採用しています。画面上部約15%（Y=0〜288px）にはサウンド選択やカメラアイコン、下部約28%（Y=1380〜1920px）にはチャンネルアイコン、登録ボタン、タイトルが表示されます。右側約18%には高評価やコメントの縦並びアイコンが配置されます。',
          keyTakeaway: '画面中央の高さ57%の領域が、顔やアクション、字幕を配置すべきメインのセーフゾーンです。',
        },
        {
          heading: '2. タイトルの折り返しと動的マージン',
          body: 'タイトルが60文字以上になるとスマホ画面で2〜3行に折り返され、下部UIが通常より最大100ピクセル程度上方に押し上げられます。',
          keyTakeaway: '複数行のタイトル表示を想定し、重要なテロップは下端から450ピクセル以上離して配置します。',
        },
        {
          heading: '3. 字幕・テロップの推奨配置コリドー',
          body: '音声オフで視聴されることが多いShortsでは字幕が必須です。字幕は画面高さ40%〜65%の安全な中央コリドー（Y=770px〜1250px）に配置し、右端からは180ピクセル以上の余白を確保してください。',
          keyTakeaway: '字幕は画面中央（高さ40%〜65%）に配置し、右端アイコン列から180px離します。',
        },
      ],
      workedExample: {
        title: '解説動画のテロップ位置修正による視認性回復',
        scenario: '下端（Y=1750px）に字幕を焼き込んだ縦型Shortsを公開したところ、登録ボタンと音源タイトルに字幕が完全に覆われてしまう問題が発生。',
        steps: [
          'スマホUIのレイアウトと照合：画面下部28%はチャンネル情報と操作ボタンで塞がれることを確認。',
          '字幕トラックを推奨セーフコリドー（Y=850px〜1200px）まで上方に移動。',
          '右端のいいね・コメント列との重なりを防ぐため、右マージンを180px以上確保。',
        ],
        conclusion: '字幕をY=900px中央・右マージン180pxに再配置したことで、すべてのスマホ画面で文字が100%読める状態に改善しました。',
      },
      checklist: [
        { title: '上部15%ヘッダーをクリア', detail: '上部288pxには重要なテロップや見出しを配置しないようにします。' },
        { title: '下部28%の説明エリアを保護', detail: '字幕や人物の顔はY=1380pxより上に保ち、UIとの重なりを防ぎます。' },
        { title: '右端アイコン列の余白を確保', detail: '右端から180px以上のクリアランスを保ちます。' },
        { title: 'タイトル2行表示時の重なりを確認', detail: 'タイトルが折り返された場合でも重要な要素が隠れないか確認します。' },
      ],
      faqs: [
        {
          question: "YouTube Shortsのセーフゾーンの推奨サイズは？",
          answer: "1080×1920ピクセル（9:16）の縦型画面において、上部約15%、下部約28%、右側約18%がUIと重なるため、中央57%が安全領域となります。",
        },
        {
          question: "YouTube Shortsで字幕を入れる最適な位置はどこですか？",
          answer: "画面の高さ40%〜65%（Y=770px〜1250px）の中央コリドーに配置し、右端から最低180pxの余白を設けるのが最適です。",
        },
        {
          question: "動画タイトルの長さはShortsの表示領域にどう影響しますか？",
          answer: "タイトルが長くなると複数行に折り返され、下部のUIオーバーレイがさらに上へとせり出して映像領域を覆います。",
        },
      ],
    },
  },

  fr: {
    'youtube-thumbnail-blueprint': {
      title: 'Le guide des miniatures YouTube : dimensions, limites et CTR',
      seoTitle: 'Miniatures YouTube : dimensions, limites et CTR',
      category: 'Packaging visuel',
      readTime: '6 min de lecture',
      description: 'Spécifications officielles pour le ratio 16:9, la limite de 2 Mo sur mobile et la lisibilité smartphone afin de maximiser le taux de clics.',
      officialSources: [
        {
          label: 'Aide YouTube : Ajouter des miniatures vidéo',
          description: 'Spécifications officielles de YouTube pour la résolution, le format d’image et les limites de taille.',
        },
      ],
      contentSections: [
        {
          heading: '1. Dimensions officielles et limites de taille de fichier',
          body: 'Selon la documentation officielle de YouTube, les miniatures personnalisées doivent utiliser un format 16:9 avec une résolution recommandée de 1280×720 pixels et une largeur minimale de 640 pixels. Les formats pris en charge sont JPG, GIF et PNG. Un point critique concerne le poids : l’application mobile YouTube Studio impose une limite stricte de 2 Mo, alors que la version web pour ordinateur accepte jusqu’à 50 Mo. Conservez vos fichiers sous 2 Mo en sRGB pour une compatibilité universelle.',
          keyTakeaway: 'Adoptez une résolution de 1280×720 (16:9) en JPEG ou PNG sous 2 Mo pour garantir la compatibilité mobile et ordinateur.',
        },
        {
          heading: '2. Lisibilité mobile et test à échelle réduite',
          body: 'La majorité des vues sur YouTube proviennent d’appareils mobiles. Sur un écran de smartphone, une miniature de 1280×720 s’affiche à une largeur réelle de 150 à 220 pixels. Les textures fines et polices manuscrites deviennent illisibles. Privilégiez une structure en trois éléments : une silhouette nette, un arrière-plan contrasté et un texte court en gras (3 à 4 mots max). Prévisualisez toujours à 15% de zoom avant publication.',
          keyTakeaway: 'Concevez pour une largeur mobile de 180 pixels avec des silhouettes à fort contraste et une typographie grasse lisible en miniature.',
        },
        {
          heading: '3. Zones masquées et badge de durée de la vidéo',
          body: 'L’interface de YouTube recouvre certaines parties de la miniature. Le blocage le plus critique est le badge de durée situé dans le coin inférieur droit (ex. "14:28"). Si vous y placez des visages ou des textes clés sur les 20% en largeur et 15% en hauteur inférieurs droits, ils seront masqués.',
          keyTakeaway: 'Laissez les 20% inférieurs droits en largeur et 15% en hauteur totalement vierges de textes ou de visages.',
        },
      ],
      workedExample: {
        title: 'Résolution de l’erreur de téléversement sur l’application mobile',
        scenario: 'Un créateur conçoit une miniature 1440p de 4,8 Mo dans Photoshop. Lors de la mise en ligne via l’application mobile YouTube Studio, le téléversement échoue systématiquement.',
        steps: [
          'Identifier la cause : l’application mobile YouTube Studio impose un plafond strict de 2 Mo, contrairement au web de bureau qui accepte 50 Mo.',
          'Redimensionner le plan de travail à 1280×720 (16:9), éliminant les pixels superflus sans perte de qualité perçue.',
          'Compresser en local via WebAssembly au format JPEG à 85% de qualité pour ramener le fichier à 420 Ko.',
        ],
        conclusion: 'En exportant en 1280×720 et en optimisant la compression, le fichier est passé de 4,8 Mo à 420 Ko (-91%), assurant un téléversement immédiat.',
      },
      checklist: [
        { title: 'Vérifier la résolution', detail: 'Assurez-vous que l’image mesure 1280×720 pixels (16:9) avec une largeur minimale de 640px.' },
        { title: 'Respecter le plafond de 2 Mo', detail: 'Compressez le fichier sous 2 Mo pour éviter les rejets sur l’app mobile YouTube Studio.' },
        { title: 'Dégager la zone du minuteur', detail: 'Vérifiez qu’aucun texte ou visage ne se trouve dans les 20% en largeur et 15% en hauteur inférieurs droits.' },
        { title: 'Effectuer le test à 15%', detail: 'Dézoomez à 15% pour vous assurer que le sujet principal et le texte restent lisibles sur mobile.' },
      ],
      faqs: [
        {
          question: "Quelles sont les dimensions et limites de taille officielles pour une miniature YouTube ?",
          answer: "YouTube recommande un ratio 16:9 avec 1280×720 pixels (largeur minimale 640px) en JPG, PNG ou WebP. Les imports mobiles imposent une limite stricte de 2 Mo, tandis que le bureau autorise jusqu'à 50 Mo.",
        },
        {
          question: "Où se trouve la zone masquée par le minuteur sur la miniature ?",
          answer: "Le badge de durée occupe le coin inférieur droit sur environ 20% de la largeur et 15% de la hauteur. Gardez les visages et textes hors de cet espace.",
        },
        {
          question: "Pourquoi tester les miniatures à l'échelle mobile ?",
          answer: "Le fil YouTube mobile affiche les miniatures entre 150 et 220 pixels de large. Les visuels doivent utiliser des contrastes nets et des polices grasses visibles à 15% de zoom.",
        },
      ],
    },
    'decoding-youtube-rpm': {
      title: 'Comprendre le RPM YouTube : la vraie rémunération des créateurs en 2026',
      seoTitle: 'RPM YouTube : comment les créateurs sont payés',
      category: 'Monétisation',
      readTime: '8 min de lecture',
      description: 'Analyse mathématique du RPM créateur par rapport au CPM annonceur, répartition géographique et calcul des revenus nets.',
      officialSources: [
        {
          label: 'Aide YouTube : Comprendre les métriques de revenus (RPM et CPM)',
          description: 'Documentation officielle différenciant le RPM net du créateur du CPM brut de l’annonceur.',
        },
      ],
      contentSections: [
        {
          heading: '1. RPM vs CPM : la distinction structurelle essentielle',
          body: 'Beaucoup confondent CPM (Coût Pour Mille) et RPM (Revenu Pour Mille). Le CPM est le montant payé par les annonceurs pour 1 000 impressions publicitaires avant la commission de YouTube. Le RPM représente votre revenu réel net perçu pour 1 000 vues totales, après déduction de la part de 45% de YouTube sur les vidéos longues.',
          keyTakeaway: 'Le CPM est ce que les annonceurs paient à YouTube ; le RPM est ce qui arrive sur votre compte bancaire pour 1 000 vues.',
        },
        {
          heading: '2. La composition des revenus : ce qui alimente le RPM',
          body: 'Le RPM englobe l’ensemble de la rentabilité de votre chaîne. Si une part importante de votre public utilise des bloqueurs de publicité ou réside dans des pays à faible pouvoir d’achat, votre RPM diminue même si le CPM reste correct. À l’inverse, les souscriptions et Super Thanks augmentent fortement votre RPM.',
          keyTakeaway: 'Diversifiez vos sources de revenus (abonnements, pourboires) pour maximiser votre RPM global au-delà de la publicité.',
        },
        {
          heading: '3. Déductions de plateforme et piège de la double déduction',
          body: 'Une erreur classique consiste à déduire 45% du RPM affiché dans YouTube Studio. Ce chiffre est déjà net de commission. Retirer à nouveau 45% vous amènerait à sous-estimer vos revenus réels de près de la moitié.',
          keyTakeaway: 'Ne soustrayez jamais 45% du RPM indiqué dans YouTube Studio : la plateforme l’a déjà fait.',
        },
      ],
      workedExample: {
        title: 'Calcul précis des revenus nets d’une chaîne',
        scenario: 'Une chaîne tech totalise 250 000 vues mensuelles. YouTube Studio affiche un RPM de 4,80 $ et un CPM basé sur les lectures de 11,50 $.',
        steps: [
          'Le CPM (11,50 $) représente la dépense brute des annonceurs, tandis que le RPM (4,80 $) indique le revenu net par 1 000 vues.',
          'Éviter la double déduction : ne pas soustraire 45% du RPM de 4,80 $.',
          'Multiplier les vues par le RPM net : (250 000 / 1 000) × 4,80 $ = 1 200 $. Ajouter 425 $ de souscriptions pour un total net de 1 625 $.',
        ],
        conclusion: 'Le créateur perçoit 1 625 $ nets. Une déduction erronée de 45% aurait fait chuter l’estimation publicitaire à 660 $.',
      },
      checklist: [
        { title: 'Séparer vidéos longues et Shorts', detail: 'Analysez les deux formats séparément car leurs modèles de rémunération diffèrent.' },
        { title: 'Vérifier la déduction des parts', detail: 'Assurez-vous d’utiliser le RPM net de Studio sans déduction supplémentaire redondante.' },
        { title: 'Examiner la géographie de l’audience', detail: 'Une forte proportion d’audience Tier 1 (US, FR, UK, etc.) élève significativement le RPM.' },
        { title: 'Calculer le RPM composite', detail: 'Additionnez pub, abonnements et dons pour déterminer votre RPM global effectif.' },
      ],
      faqs: [
        {
          question: "Quelle est la différence entre le CPM et le RPM sur YouTube ?",
          answer: "Le CPM est le coût payé par les annonceurs pour 1 000 impressions publicitaires. Le RPM est votre gain net réel pour 1 000 vues totales après la part de 45% de YouTube.",
        },
        {
          question: "Doit-on déduire 45% du RPM indiqué dans YouTube Studio ?",
          answer: "Non. Le RPM affiché dans YouTube Studio est déjà net de commission. Enlever 45% supplémentaire sous-estimerait vos revenus de moitié.",
        },
        {
          question: "Comment diffère la rémunération des Shorts par rapport aux vidéos longues ?",
          answer: "Les vidéos longues reversent 55% des revenus directs des annonces. Pour les Shorts, les revenus sont mis en commun et 45% sont redistribués selon la part de vues du créateur.",
        },
      ],
    },
    'youtube-shorts-safe-zone': {
      title: 'Zones sécurisées Shorts : protéger sous-titres et visages des boutons UI',
      seoTitle: 'Zones sécurisées Shorts : sous-titres et visages',
      category: 'Shorts & vidéo verticale',
      readTime: '5 min de lecture',
      description: 'Dimensions et marges d’interface pour la vidéo verticale 9:16. Empêchez les boutons d’interaction de masquer vos accroches.',
      officialSources: [
        {
          label: 'Portail des créateurs YouTube : Créer des Shorts',
          description: 'Directives officielles de YouTube sur le cadrage mobile et les éléments interactifs des Shorts.',
        },
      ],
      contentSections: [
        {
          heading: '1. Le format 9:16 et les zones d’obstruction de l’interface',
          body: 'Les Shorts utilisent un ratio 9:16 (1080×1920 pixels). Sur mobile, l’interface recouvre une grande partie de l’image. Les 15% supérieurs (Y=0 à 288px) abritent les sélecteurs de son et la recherche. Les 28% inférieurs (Y=1380 à 1920px) contiennent l’avatar, le bouton s’abonner et le titre. Le bord droit (18% de largeur) accueille les boutons j’aime, commentaires et partage.',
          keyTakeaway: 'Les 57% centraux en hauteur constituent la zone sécurisée où doivent se trouver visages et sous-titres.',
        },
        {
          heading: '2. Enjambement des titres longs et marge variable',
          body: 'La hauteur de l’interface inférieure varie : un titre de plus de 60 caractères se répartit sur deux ou trois lignes sur smartphone, rehaussant les boutons interactifs jusqu’à 100 pixels supplémentaires dans votre cadre.',
          keyTakeaway: 'Conservez les éléments clés à au moins 450 pixels du bas pour anticiper les titres sur plusieurs lignes.',
        },
        {
          heading: '3. Le couloir recommandé pour les sous-titres',
          body: 'Les sous-titres intégrés sont capitaux pour capter les utilisateurs sans le son. Placez-les dans le couloir sécurisé entre 40% et 65% de la hauteur de l’écran (Y=770px à Y=1250px), centrés horizontalement avec 180px de marge à droite.',
          keyTakeaway: 'Centrez vos sous-titres entre 40% et 65% de la hauteur d’écran avec 180px d’espace sur le bord droit.',
        },
      ],
      workedExample: {
        title: 'Recadrage d’un Short éducatif pour dégager les sous-titres',
        scenario: 'Un créateur diffuse un Short avec des sous-titres placés en bas de l’écran (Y=1750px). Après mise en ligne, le bouton d’abonnement et le titre audio masquent le texte.',
        steps: [
          'Vérifier la disposition par rapport au schéma officiel : les 28% inférieurs sont réservés aux métadonnées et boutons.',
          'Déplacer la piste de sous-titres vers le couloir recommandé entre Y=850px et Y=1200px.',
          'Conserver une marge minimale de 180px à droite pour éviter la colonne des boutons d’interaction.',
        ],
        conclusion: 'Le repositionnement des sous-titres à Y=900px centré avec 180px d’espace à droite a rétabli une lisibilité parfaite sur tous les smartphones.',
      },
      checklist: [
        { title: 'Dégager l’en-tête supérieur', detail: 'Laissez les 15% du haut (288px) libres de tout texte ou élément clé.' },
        { title: 'Protéger les 28% inférieurs', detail: 'Maintenez les sous-titres au-dessus de Y=1380px pour éviter la collision avec le titre.' },
        { title: 'Réserver la marge droite', detail: 'Conservez un espace d’au moins 180px par rapport au bord droit.' },
        { title: 'Tester les titres sur 2 lignes', detail: 'Vérifiez que les titres longs ne viennent pas empiéter sur votre contenu visuel.' },
      ],
      faqs: [
        {
          question: "Quelles sont les dimensions de la zone sécurisée des YouTube Shorts ?",
          answer: "Sur un format 9:16 (1080×1920 pixels), les éléments interactifs recouvrent environ 15% en haut, 28% en bas et 18% sur le côté droit. Les 57% centraux sont la zone sûre.",
        },
        {
          question: "Où positionner au mieux les sous-titres dans un YouTube Short ?",
          answer: "Placez les sous-titres dans le tiers central entre 40% et 65% de la hauteur (Y=770px à Y=1250px), centrés avec au moins 180px de marge à droite.",
        },
        {
          question: "Comment la longueur du titre impacte-t-elle l'affichage du Short ?",
          answer: "Un titre long s'affiche sur plusieurs lignes sur mobile, ce qui pousse les éléments d'interface du bas encore plus haut sur votre vidéo.",
        },
      ],
    },
  },

  de: {
    'youtube-thumbnail-blueprint': {
      title: 'Der YouTube-Thumbnail-Leitfaden: Dateilimits, Maße & Klickrate',
      seoTitle: 'YouTube-Thumbnails: Maße, Limits & Klickrate',
      category: 'Visuelle Gestaltung',
      readTime: '6 Min. Lesezeit',
      description: 'Offizielle Plattform-Richtlinien für 16:9-Format, 1280×720 Pixel, 2-MB-Upload-Limit auf Mobilgeräten und Lesbarkeit auf Smartphones.',
      officialSources: [
        {
          label: 'YouTube-Hilfe: Benutzerdefinierte Video-Thumbnails hinzufügen',
          description: 'Offizielle YouTube-Spezifikationen für Auflösung, Seitenverhältnis, unterstützte Dateiformate und Upload-Dateigrößen.',
        },
      ],
      contentSections: [
        {
          heading: '1. Offizielle Abmessungen und Upload-Dateigrößen',
          body: 'Laut offizieller YouTube-Dokumentation sollten benutzerdefinierte Thumbnails ein Seitenverhältnis von 16:9 mit einer empfohlenen Auflösung von 1280×720 Pixeln und einer Mindestbreite von 640 Pixeln aufweisen. Als Dateiformate werden JPG, GIF und PNG unterstützt. Ein entscheidender Unterschied besteht bei der Dateigröße: Uploads über die YouTube Studio App auf Mobilgeräten erzwingen ein striktes Limit von 2 MB, während Desktop-Uploads bis zu 50 MB erlauben. Ein Export unter 2 MB mit sRGB-Farbprofil gewährleistet universelle Kompatibilität.',
          keyTakeaway: '1280×720 Pixel (16:9) in JPEG oder PNG unter 2 MB ist der Standard für reibungslose Uploads auf Desktop und Smartphone.',
        },
        {
          heading: '2. Mobile-First-Lesbarkeit und Verkleinerungstest',
          body: 'Der Großteil der YouTube-Aufrufe erfolgt über mobile Endgeräte. Auf Smartphones wird ein Thumbnail von 1280×720 Pixeln oft nur 150 bis 220 Pixel breit dargestellt. Komplexe Hintergründe oder feine Schreibschriften wirken dort unlesbar. Konzentrieren Sie sich auf drei Kernelemente: eine klare Silhouette des Hauptmotivs, einen kontrastreichen Hintergrund und maximal 3 bis 4 fettgedruckte Wörter. Prüfen Sie Ihr Design vor Veröffentlichung stets bei 15 % Skalierung.',
          keyTakeaway: 'Für eine 180-Pixel-Mobilansicht entwerfen: Hohe Kontraste und fette Typografie sichern Klicks in der mobilen Ansicht.',
        },
        {
          heading: '3. Toter Winkel der Benutzeroberfläche und Zeitstempel',
          body: 'Jedes Thumbnail wird in der YouTube-App von UI-Elementen überlagert. Die größte Verdeckung bildet die Zeitanzeige in der unteren rechten Ecke (z. B. "14:28"). Wenn Sie Gesichter, Kernbotschaften oder Logos in den unteren rechten 20 % der Breite und 15 % der Höhe platzieren, werden diese unweigerlich verdeckt.',
          keyTakeaway: 'Halten Sie die unteren rechten 20 % der Breite und 15 % der Höhe komplett frei von Texten und Gesichtern.',
        },
      ],
      workedExample: {
        title: 'Behebung von Upload-Fehlern in der YouTube Studio App',
        scenario: 'Ein Gaming-Creator erstellt ein 1440p-Thumbnail mit 4,8 MB in Photoshop. Beim Upload über die YouTube Studio App schlägt der Vorgang mit einer Fehlermeldung fehl.',
        steps: [
          'Ursache analysieren: Die YouTube Studio App auf Mobilgeräten setzt ein striktes Limit von 2 MB durch, anders als der Desktop-Browser.',
          'Die Arbeitsfläche von 2560×1440 auf den Plattformstandard 1280×720 (16:9) verkleinern.',
          'Mittels lokaler WebAssembly-Komprimierung als JPEG mit 85 % Qualität exportieren, um die Dateigröße auf 420 KB zu senken.',
        ],
        conclusion: 'Durch 1280×720 und optimierte Komprimierung sank die Dateigröße von 4,8 MB auf 420 KB (-91 %), was fehlerfreie Uploads auf allen Geräten sicherstellte.',
      },
      checklist: [
        { title: 'Auflösung prüfen', detail: 'Stellen Sie sicher, dass die Datei exakt 1280×720 Pixel (16:9) bei mindestens 640px Breite misst.' },
        { title: '2-MB-Grenze einhalten', detail: 'Komprimieren Sie die finale Datei auf unter 2 MB für fehlerfreie Uploads in der Mobil-App.' },
        { title: 'Zeitstempel-Bereich freihalten', detail: 'Prüfen Sie, dass die unteren rechten 20 % Breite und 15 % Höhe frei von wichtigen Elementen sind.' },
        { title: '15-%-Verkleinerungstest bestehen', detail: 'Zoomen Sie auf 15 % heraus, um sicherzustellen, dass Schrift und Motiv auf Smartphones sofort erfassbar sind.' },
      ],
      faqs: [
        {
          question: "Welche Maße und Dateigrößen gelten offiziell für YouTube-Thumbnails?",
          answer: "YouTube empfiehlt ein 16:9-Format mit 1280×720 Pixeln (Mindestbreite 640px) in JPG, PNG oder WebP. Mobile Uploads sind auf maximal 2 MB beschränkt, im Desktop-Browser auf 50 MB.",
        },
        {
          question: "Wo befindet sich der tote Winkel durch den Zeitstempel?",
          answer: "Die Daueranzeige belegt die unteren rechten 20 % der Breite und 15 % der Höhe des Thumbnails. Halten Sie Gesichter und Kerntexte von dort fern.",
        },
        {
          question: "Warum sollten Thumbnails in Smartphone-Größe getestet werden?",
          answer: "Im mobilen Feed werden Thumbnails nur ca. 150 bis 220 Pixel breit gerendert. Designs müssen kontraststark und bei 15 % Zoom sofort lesbar sein.",
        },
      ],
    },
    'decoding-youtube-rpm': {
      title: 'YouTube-RPM erklärt: Wie Creator 2026 tatsächlich bezahlt werden',
      seoTitle: 'YouTube-RPM erklärt: So verdienen Creator',
      category: 'Monetarisierung',
      readTime: '8 Min. Lesezeit',
      description: 'Mathematische Analyse von Creator-RPM gegenüber Werbetreibenden-CPM, Länder-Tiers und Netto-Einnahmenberechnung.',
      officialSources: [
        {
          label: 'YouTube-Hilfe: Umsatzkennzahlen verstehen (RPM & CPM)',
          description: 'Offizielle Erläuterung zur Unterscheidung zwischen dem Netto-RPM für Creator und dem Brutto-CPM für Werbetreibende.',
        },
      ],
      contentSections: [
        {
          heading: '1. RPM vs. CPM: Der fundamentale Unterschied',
          body: 'Viele verwechseln CPM (Kosten pro 1.000 Impressionen) mit RPM (Umsatz pro 1.000 Aufrufe). Der CPM ist der Betrag, den Werbetreibende vor Abzug des Plattformanteils an YouTube zahlen. Der RPM hingegen misst Ihre tatsächlichen Nettoeinnahmen pro 1.000 Gesamtaufrufe nach Abzug der 45 % YouTube-Beteiligung bei langen Videos.',
          keyTakeaway: 'CPM ist, was Werbekunden an YouTube zahlen; RPM ist, was pro 1.000 Aufrufe auf Ihrem Konto landet.',
        },
        {
          heading: '2. Zusammensetzung: Was in den Creator-RPM einfließt',
          body: 'Der RPM bildet die gesamte Monetarisierungsleistung Ihres Kanals ab. Nutzen viele Zuschauer Werbeblocker, kann der CPM hoch sein, während der RPM sinkt. Umgekehrt heben Kanalmitgliedschaften und Super Thanks den RPM deutlich über das reine Werbeniveau.',
          keyTakeaway: 'Steigern Sie Ihren RPM durch Mitgliedschaften und Trinkgelder ergänzend zu klassischen Videoanzeigen.',
        },
        {
          heading: '3. Plattformabzüge und der doppelte Abzugsfalle',
          body: 'Ein häufiger Fehler ist das nachträgliche Abziehen von 45 % vom in YouTube Studio angezeigten RPM. Der Studio-RPM ist bereits ein Nettowert. Wer erneut 45 % abzieht, unterschätzt seine tatsächlichen Einnahmen um fast die Hälfte.',
          keyTakeaway: 'Niemals 45 % vom YouTube Studio RPM abziehen – die Plattform hat dies bereits erledigt.',
        },
      ],
      workedExample: {
        title: 'Präzise Berechnung des monatlichen Netto-Einkommens',
        scenario: 'Ein Technik-Kanal erzielt 250.000 monatliche Aufrufe. YouTube Studio meldet einen RPM von 4,80 $ und einen CPM von 11,50 $.',
        steps: [
          'Verstehen, dass der CPM (11,50 $) die Bruttoausgaben der Werbekunden darstellt, während der RPM (4,80 $) die Nettoeinnahmen pro 1.000 Aufrufe beziffert.',
          'Keinen doppelten Abzug vornehmen: Die 4,80 $ RPM werden direkt verwendet.',
          'Berechnung: (250.000 / 1.000) × 4,80 $ = 1.200 $. Zuzüglich 425 $ aus Mitgliedschaften ergibt 1.625 $ Nettoeinkommen.',
        ],
        conclusion: 'Der Creator verdient 1.625 $ netto. Ein doppelter Abzug von 45 % hätte die Werbeeinnahmen fälschlicherweise auf 660 $ minimiert.',
      },
      checklist: [
        { title: 'Lange Videos und Shorts trennen', detail: 'Analysieren Sie beide Formate getrennt, da Shorts einem anderen Pool-Modell unterliegen.' },
        { title: 'Plattformabzug prüfen', detail: 'Verwenden Sie stets den Studio-Netto-RPM ohne überflüssige Zweitabzüge.' },
        { title: 'Zuschauerländer auswerten', detail: 'Hohe Anteile an Zuschauern aus Tier-1-Ländern (USA, DE, UK) steigern den RPM beträchtlich.' },
        { title: 'Gemischten RPM berechnen', detail: 'Werbung, Mitgliedschaften und Spenden zusammenrechnen, um den echten Gesamt-RPM zu ermitteln.' },
      ],
      faqs: [
        {
          question: "Was ist der Unterschied zwischen CPM und RPM auf YouTube?",
          answer: "CPM sind die Kosten, die Werbekunden für 1.000 Werbeeinblendungen vor dem YouTube-Anteil zahlen. RPM ist Ihr tatsächlicher Nettoerlös pro 1.000 Gesamtaufrufe nach Abzug der 45 % Plattformgebühr.",
        },
        {
          question: "Müssen Creator 45 % vom YouTube Studio RPM abziehen?",
          answer: "Nein. Der RPM in YouTube Studio ist bereits ein Nettowert mit abgezogener Plattformprovision. Ein erneuter Abzug halbiert fälschlicherweise die Einnahmenprognose.",
        },
        {
          question: "Wie unterscheidet sich die Shorts-Auszahlung von langen Videos?",
          answer: "Bei langen Videos erhalten Creator 55 % der direkten Werbeeinnahmen ihres Videos. Bei Shorts fließen Werbegelder in einen Creator Pool, aus dem 45 % nach relativen Aufrufanteilen ausgeschüttet werden.",
        },
      ],
    },
    'youtube-shorts-safe-zone': {
      title: 'Shorts-Safe-Zones: Untertitel und Gesichter vor UI-Elementen schützen',
      seoTitle: 'Shorts-Safe-Zones: Untertitel & Gesichter',
      category: 'Shorts & Vertikalvideo',
      readTime: '5 Min. Lesezeit',
      description: 'Technische Maße und UI-Überlagerungsgrenzen für 9:16-Vertikalvideos. Verhindern Sie, dass Abo-Buttons wichtige Bildinhalte verdecken.',
      officialSources: [
        {
          label: 'YouTube Creator Portal: YouTube Shorts erstellen',
          description: 'Offizielle Leitlinien für die vertikale Videoproduktion und UI-Überlagerungen auf Mobilgeräten.',
        },
      ],
      contentSections: [
        {
          heading: '1. Das 9:16-Format und die Überlagerungszonen der App',
          body: 'YouTube Shorts nutzen das 9:16-Verhältnis (1080×1920 Pixel). Auf Smartphones überdecken App-Elemente weite Teile des Videos. Die oberen ca. 15 % (Y=0 bis 288px) enthalten Audio-Auswahl und Suche. Die unteren ca. 28 % (Y=1380 bis 1920px) zeigen Kanal-Icon, Abonnieren-Button und Titel. Am rechten Rand (ca. 18 % Breite) liegen Like-, Kommentar- und Teilen-Buttons.',
          keyTakeaway: 'Die mittleren 57 % der Bildschirmhöhe sind die primäre Safe Zone für Gesichter, Aktionen und Untertitel.',
        },
        {
          heading: '2. Mehrzeilige Titel und variable Ränder',
          body: 'Die Höhe des unteren Bereichs variiert dynamisch: Titel mit mehr als 60 Zeichen brechen auf Smartphones in zwei bis drei Zeilen um und schieben die Interaktionselemente bis zu 100 Pixel weiter nach oben ins Bild.',
          keyTakeaway: 'Halten Sie Kerninhalte mindestens 450 Pixel vom unteren Rand entfernt, um mehrzeilige Titel zu kompensieren.',
        },
        {
          heading: '3. Der empfohlene Korridor für Untertitel',
          body: 'Eingebettete Untertitel sind unverzichtbar für mobile Nutzer ohne Ton. Platzieren Sie Untertitel im sicheren Korridor zwischen 40 % und 65 % der Bildhöhe (ca. Y=770px bis Y=1250px) zentriert mit mindestens 180 Pixeln Abstand zur rechten Leiste.',
          keyTakeaway: 'Untertitel im Bereich 40 % bis 65 % der Höhe zentrieren und mindestens 180px Abstand zum rechten Rand halten.',
        },
      ],
      workedExample: {
        title: 'Neuausrichtung eines Shorts zur Rettung der Untertitel',
        scenario: 'Ein Bildungsvideo wird mit Untertiteln am unteren Bildschirmrand (Y=1750px) veröffentlicht. Nach dem Upload verdecken Abo-Button und Titel die Schrift vollständig.',
        steps: [
          'Vergleich mit dem offiziellen Layout: Die unteren 28 % der Bildhöhe sind für Kanalinformationen reserviert.',
          'Verschieben der Untertitelspur in den empfohlenen Korridor zwischen Y=850px und Y=1200px.',
          'Sicherstellen eines Mindestabstands von 180px zum rechten Rand, um Interaktions-Icons auszuweichen.',
        ],
        conclusion: 'Durch die Neupositionierung bei Y=900px mit 180px rechtem Abstand wurde die Lesbarkeit auf allen Smartphones vollständig wiederhergestellt.',
      },
      checklist: [
        { title: 'Oberen Header freihalten', detail: 'Die oberen 15 % (288px) frei von Grafiken und Kerntexten halten.' },
        { title: 'Untere 28 % schützen', detail: 'Untertitel und Gesichter oberhalb von Y=1380px platzieren, um Überlappungen mit dem Titel zu vermeiden.' },
        { title: 'Rechten Rand einhalten', detail: 'Mindestens 180px Abstand zur rechten Außenkante einhalten.' },
        { title: 'Mehrzeiligen Titel simulieren', detail: 'Prüfen, ob bei 2-zeiligem Titel wichtige Inhalte im Video verdeckt werden.' },
      ],
      faqs: [
        {
          question: "Welche Maße hat die Safe Zone bei YouTube Shorts?",
          answer: "Im 9:16-Format (1080×1920 Pixel) belegen App-Elemente ca. 15 % oben, 28 % unten und 18 % rechts. Der sichere Bereich liegt in den mittleren 57 % der Höhe.",
        },
        {
          question: "Wo platziert man Untertitel in YouTube Shorts am besten?",
          answer: "Im zentralen Höhenbereich zwischen 40 % und 65 % (Y=770px bis Y=1250px), zentriert mit mindestens 180px Abstand zum rechten Rand.",
        },
        {
          question: "Wie beeinflusst die Titellänge die Shorts-Benutzeroberfläche?",
          answer: "Lange Titel brechen in mehrere Zeilen um und schieben die unteren Bedienelemente weiter nach oben in das eigentliche Videobild.",
        },
      ],
    },
  },

  pt: {
    'youtube-thumbnail-blueprint': {
      title: 'Guia definitivo de miniaturas do YouTube: limites, dimensões e CTR',
      seoTitle: 'Miniaturas do YouTube: tamanho, limites e CTR',
      category: 'Identidade visual',
      readTime: '6 min de leitura',
      description: 'Diretrizes oficiais da plataforma para proporção 16:9, limite de 2 MB no celular e legibilidade móvel para maximizar sua taxa de cliques.',
      officialSources: [
        {
          label: 'Ajuda do YouTube: Adicionar miniaturas de vídeo',
          description: 'Especificações oficiais do YouTube sobre resolução, proporção de tela, formatos e limites de tamanho.',
        },
      ],
      contentSections: [
        {
          heading: '1. Dimensões oficiais e limites de tamanho de upload',
          body: 'De acordo com as normas oficiais do YouTube, as miniaturas personalizadas devem ter proporção 16:9 com resolução recomendada de 1280×720 pixels e largura mínima de 640 pixels nos formatos JPG, GIF ou PNG. Uma distinção crítica: o app YouTube Studio para celular restringe envios a no máximo 2 MB, enquanto o navegador para desktop aceita até 50 MB. Manter suas imagens abaixo de 2 MB em sRGB garante envios confiáveis em qualquer dispositivo.',
          keyTakeaway: 'Exporte em 1280×720 (16:9) em JPEG ou PNG abaixo de 2 MB para compatibilidade universal.',
        },
        {
          heading: '2. Foco em dispositivos móveis e teste em escala reduzida',
          body: 'A maior parte dos acessos ao YouTube acontece em smartphones, onde uma imagem de 1280×720 é exibida com apenas 150 a 220 pixels de largura. Detalhes minuciosos viram ruído visual. Priorize três elementos: uma silhueta clara do tema central, um fundo com bom contraste e no máximo 3 ou 4 palavras em destaque. Reduza a visualização para 15% antes de publicar para testar a legibilidade.',
          keyTakeaway: 'Projete para uma largura de 180 pixels no celular com silhuetas de alto contraste e fontes em negrito fáceis de ler.',
        },
        {
          heading: '3. Áreas obstruídas da interface e marcador de duração',
          body: 'No canto inferior direito de toda miniatura é sobreposta a etiqueta de duração do vídeo (ex.: "14:28"). Se colocar rostos, logotipos ou frases nos 20% inferiores direitos de largura e 15% de altura, o YouTube irá cobri-los integralmente.',
          keyTakeaway: 'Mantenha os 20% da largura e 15% da altura no canto inferior direito totalmente livres.',
        },
      ],
      workedExample: {
        title: 'Solução do erro de envio no aplicativo móvel',
        scenario: 'Um criador exporta uma miniatura de 1440p com 4,8 MB no Photoshop. Ao tentar enviá-la pelo app móvel do YouTube Studio, o upload falha com mensagem genérica.',
        steps: [
          'Identificar a causa: o app YouTube Studio no celular impõe um limite estrito de 2 MB, ao contrário do desktop que permite até 50 MB.',
          'Redimensionar o arquivo para 1280×720 (16:9), reduzindo a quantidade de pixels sem perder qualidade percebida.',
          'Comprimir em JPEG com 85% de qualidade no navegador via WebAssembly para reduzir o peso para 420 KB.',
        ],
        conclusion: 'Com 1280×720 e compressão otimizada, o tamanho caiu de 4,8 MB para 420 KB (-91%), viabilizando o upload imediato no app móvel.',
      },
      checklist: [
        { title: 'Verificar resolução da imagem', detail: 'Garanta que a imagem tenha 1280×720 pixels (16:9) com largura mínima de 640px.' },
        { title: 'Respeitar o limite de 2 MB', detail: 'Comprima abaixo de 2 MB para evitar erros de upload no app YouTube Studio móvel.' },
        { title: 'Liberar a área de duração', detail: 'Evite textos ou rostos nos 20% de largura e 15% de altura do canto inferior direito.' },
        { title: 'Fazer o teste de zoom a 15%', detail: 'Diminua o zoom para 15% na tela e confirme se o texto e o elemento principal continuam nítidos.' },
      ],
      faqs: [
        {
          question: "Quais são as dimensões e limites de tamanho oficiais para miniaturas do YouTube?",
          answer: "O YouTube recomenda proporção 16:9 com 1280×720 pixels (mínimo de 640px) em JPG, PNG ou WebP. Uploads via app móvel têm limite estrito de 2 MB, enquanto no desktop o limite é de 50 MB.",
        },
        {
          question: "Onde fica a zona morta do marcador de tempo na miniatura?",
          answer: "O selo de duração ocupa o canto inferior direito em cerca de 20% da largura e 15% da altura. Não posicione textos essenciais ou rostos nessa região.",
        },
        {
          question: "Por que testar as miniaturas em tamanho de tela de celular?",
          answer: "No feed do app móvel, as miniaturas são renderizadas com cerca de 150 a 220 pixels de largura. Os designs precisam de alto contraste e fontes em negrito legíveis com 15% de zoom.",
        },
      ],
    },
    'decoding-youtube-rpm': {
      title: 'Decodificando o RPM do YouTube: como os criadores são pagos em 2026',
      seoTitle: 'RPM do YouTube: como os criadores são pagos',
      category: 'Monetização',
      readTime: '8 min de leitura',
      description: 'Análise matemática de RPM frente a CPM, faixas geográficas de audiência e cálculo exato de ganhos líquidos.',
      officialSources: [
        {
          label: 'Ajuda do YouTube: Métricas de receita (RPM e CPM)',
          description: 'Documentação oficial diferenciando o RPM líquido do criador do CPM bruto dos anunciantes.',
        },
      ],
      contentSections: [
        {
          heading: '1. RPM vs CPM: a distinção estrutural decisiva',
          body: 'O CPM (Custo por Mil) é o valor pago pelos anunciantes por 1.000 impressões de anúncios antes da comissão da plataforma. O RPM (Receita por Mil) mede seu ganho líquido real por 1.000 visualizações totais do vídeo, após a retenção de 45% do YouTube em vídeos longos.',
          keyTakeaway: 'CPM é o que os anunciantes pagam ao YouTube; RPM é o valor líquido que cai na conta do criador a cada 1.000 visualizações.',
        },
        {
          heading: '2. Composição de ganhos: o que integra o RPM do canal',
          body: 'O RPM expressa o rendimento total do canal. Se muitos espectadores usam bloqueadores de anúncio ou estão em regiões com anúncios de menor valor, o CPM pode ser alto enquanto o RPM cai. Em contrapartida, membros do canal e Super Thanks aumentam seu RPM líquido.',
          keyTakeaway: 'Combine clubes de membros e doações à receita de anúncios para elevar seu RPM médio.',
        },
        {
          heading: '3. Deduções da plataforma e o erro da dedução duplicada',
          body: 'Muitos criadores cometem o engano de subtrair 45% do RPM exibido no YouTube Studio. Esse número já é um valor líquido. Deduzir 45% novamente fará você subestimar sua renda real quase pela metade.',
          keyTakeaway: 'Nunca deduza 45% do RPM do YouTube Studio: a plataforma já fez essa retenção.',
        },
      ],
      workedExample: {
        title: 'Cálculo correto da receita líquida mensal',
        scenario: 'Um canal de tecnologia atinge 250.000 visualizações no mês com RPM de US$ 4,80 e CPM de US$ 11,50 no YouTube Studio.',
        steps: [
          'Identificar que o CPM (US$ 11,50) reflete o custo bruto do anunciante e o RPM (US$ 4,80) representa a receita líquida por 1.000 visualizações.',
          'Não subtrair 45% novamente do RPM de US$ 4,80.',
          'Multiplicar visualizações por RPM: (250.000 / 1.000) × US$ 4,80 = US$ 1.200. Somar US$ 425 em membros para um total de US$ 1.625.',
        ],
        conclusion: 'O criador ganha US$ 1.625 líquidos. Se deduzisse 45% por engano, a estimativa cairia incorretamente para US$ 660.',
      },
      checklist: [
        { title: 'Separar vídeos longos de Shorts', detail: 'Analise os formatos separadamente devido às diferenças no repasse de receita.' },
        { title: 'Confirmar deduções da plataforma', detail: 'Use sempre o RPM líquido do Studio sem aplicar descontos adicionais desnecessários.' },
        { title: 'Analisar países da audiência', detail: 'Países do grupo Tier 1 aumentam substancialmente o valor do RPM.' },
        { title: 'Calcular o RPM composto', detail: 'Some anúncios, membros e doações para conhecer o RPM real por visualização.' },
      ],
      faqs: [
        {
          question: "Qual a diferença entre CPM e RPM no YouTube?",
          answer: "O CPM é o valor que anunciantes pagam por 1.000 impressões de anúncios antes da fatia de 45% do YouTube. O RPM é o que o criador realmente recebe por 1.000 visualizações totais.",
        },
        {
          question: "Os criadores devem deduzir 45% do RPM do YouTube Studio?",
          answer: "Não. O RPM exibido no YouTube Studio já traz os 45% descontados pela plataforma. Subtrair de novo reduzirá artificialmente sua receita pela metade.",
        },
        {
          question: "Como os pagamentos de Shorts diferem dos vídeos normais?",
          answer: "Em vídeos longos o criador recebe 55% dos anúncios do próprio vídeo. Em Shorts, a receita é somada em um fundo nacional e 45% é distribuído conforme sua fatia de visualizações.",
        },
      ],
    },
    'youtube-shorts-safe-zone': {
      title: 'Zonas seguras no Shorts: mantendo legendas e rostos desobstruídos',
      seoTitle: 'Zonas seguras no Shorts: legendas e rostos',
      category: 'Shorts e vídeo vertical',
      readTime: '5 min de leitura',
      description: 'Dimensões técnicas e margens da interface para vídeos verticais 9:16. Evite que botões e títulos cubram seu conteúdo.',
      officialSources: [
        {
          label: 'Portal de Criadores do YouTube: Criar YouTube Shorts',
          description: 'Orientações oficiais do YouTube para enquadramento e sobreposições em vídeos verticais.',
        },
      ],
      contentSections: [
        {
          heading: '1. O formato 9:16 e as áreas de obstrução da interface',
          body: 'O YouTube Shorts utiliza a proporção 9:16 (1080×1920 pixels). No celular, elementos do app cobrem boa parte do vídeo. Os 15% superiores (Y=0 a 288px) contêm busca e áudio. Os 28% inferiores (Y=1380 a 1920px) abrigam avatar, botão de inscrição e título. A lateral direita (18% de largura) traz os botões de curtir, comentar e compartilhar.',
          keyTakeaway: 'Os 57% centrais da altura da tela formam a área segura onde devem estar rostos e legendas.',
        },
        {
          heading: '2. Quebra de títulos longos e margem dinâmica',
          body: 'A altura da área inferior varia: títulos com mais de 60 caracteres quebram em duas ou três linhas no smartphone, empurrando a área de botões em até 100 pixels a mais para dentro do vídeo.',
          keyTakeaway: 'Mantenha textos essenciais a pelo menos 450 pixels da borda inferior para acomodar títulos longos.',
        },
        {
          heading: '3. A faixa recomendada para legendas e textos',
          body: 'Legendas fixas são fundamentais para retenção em vídeos sem som. Posicione-as entre 40% e 65% da altura da tela (Y=770px a Y=1250px), centralizadas na horizontal e com 180px de distância da barra de ícones da direita.',
          keyTakeaway: 'Centralize legendas entre 40% e 65% da altura com 180px de margem em relação à lateral direita.',
        },
      ],
      workedExample: {
        title: 'Reenquadramento de Short educativo para proteger legendas',
        scenario: 'Um criador grava um Short com legendas inseridas na base da tela (Y=1750px). Após o envio, o botão de inscrição e o título do áudio cobrem completamente o texto.',
        steps: [
          'Analisar contra o layout oficial: os 28% inferiores do vídeo são ocupados pela interface.',
          'Mover a faixa de legendas para o corredor recomendado entre Y=850px e Y=1200px.',
          'Garantir uma margem mínima de 180px na borda direita para não encavalar nos ícones de curtir e comentar.',
        ],
        conclusion: 'O reposicionamento das legendas em Y=900px centralizado com 180px de recuo à direita garantiu 100% de leitura em todos os celulares.',
      },
      checklist: [
        { title: 'Desimpedir o topo da tela', detail: 'Deixe os 15% superiores (288px) sem textos ou elementos de destaque.' },
        { title: 'Preservar os 28% inferiores', detail: 'Posicione legendas acima de Y=1380px para evitar conflito com a descrição.' },
        { title: 'Manter recuo na margem direita', detail: 'Mantenha ao menos 180px de espaço livre da borda direita da tela.' },
        { title: 'Testar com título de 2 linhas', detail: 'Confirme se títulos mais longos não invadem pontos cruciais do seu vídeo.' },
      ],
      faqs: [
        {
          question: "Quais são as dimensões da safe zone no YouTube Shorts?",
          answer: "Em vídeos 9:16 (1080×1920 pixels), os botões e títulos ocupam cerca de 15% no topo, 28% na base e 18% na direita. A área central de 57% é a zona segura recomendada.",
        },
        {
          question: "Onde é melhor colocar legendas no YouTube Shorts?",
          answer: "No corredor central entre 40% e 65% da altura da tela (Y=770px a Y=1250px), centralizado com pelo menos 180px de folga na margem direita.",
        },
        {
          question: "Como o tamanho do título afeta a interface do Shorts?",
          answer: "Títulos longos com mais de 60 caracteres quebram em várias linhas no celular, empurrando os botões da base ainda mais para cima do seu vídeo.",
        },
      ],
    },
  },

  ko: {
    'youtube-thumbnail-blueprint': {
      title: '유튜브 썸네일 완벽 가이드: 용량 한도, 해상도 및 CTR 최적화',
      category: '비주얼 패키징',
      readTime: '6분 분량',
      description: '16:9 화면비, 1280×720 권장 해상도, 모바일 2MB 업로드 한도 및 모바일 가독성 향상을 위한 유튜브 공식 기준 가이드.',
      officialSources: [
        {
          label: 'YouTube 고객센터: 동영상 썸네일 추가',
          description: '해상도, 화면비, 지원 형식 및 업로드 용량 한도에 관한 YouTube 공식 규격.',
        },
      ],
      contentSections: [
        {
          heading: '1. 공식 해상도 및 파일 용량 제한 기준',
          body: '유튜브 공식 규정에 따르면 맞춤 썸네일은 16:9 화면비, 권장 해상도 1280×720 픽셀(최소 너비 640픽셀)을 사용해야 합니다. 지원 파일 형식은 JPG, GIF, PNG입니다. 실무에서 가장 중요한 차이는 용량입니다: 모바일 YouTube Studio 앱을 통한 업로드는 2MB 이하로 엄격히 제한되며, 데스크톱 웹에서는 최대 50MB까지 허용됩니다. sRGB 색상 프로필과 함께 2MB 이하로 저장하는 것이 모든 환경에서 업로드 실패를 방지하는 표준입니다.',
          keyTakeaway: '해상도 1280×720(16:9), JPEG 또는 PNG 형식, 용량 2MB 이하를 유지하여 모든 기기에서 안정적으로 업로드하세요.',
        },
        {
          heading: '2. 모바일 중심 가독성과 15% 축소 테스트',
          body: '유튜브 시청의 대부분은 스마트폰에서 이루어집니다. 모바일 홈 피드에서 1280×720 썸네일은 너비 약 150~220픽셀 크기로 축소 표시됩니다. 복잡한 배경이나 얇은 글씨는 모바일에서 뭉개집니다. 명확한 피사체 실루엣 1개, 고대비 배경, 3~4단어 이내의 굵은 텍스트라는 3요소 원칙을 지키고, 게시 전 모니터에서 15%로 축소하여 가독성을 확인하세요.',
          keyTakeaway: '너비 180픽셀 모바일 화면을 기준으로 고대비 실루엣과 굵은 폰트를 적용해 작은 크기에서도 눈에 띄게 디자인하세요.',
        },
        {
          heading: '3. 인터페이스 데드존과 재생시간 표시 배지',
          body: '유튜브 썸네일의 우측 하단에는 동영상 재생시간 배지(예: "14:28")가 오버레이됩니다. 우측 하단 가로 20%, 세로 15% 영역에 얼굴, 핵심 텍스트, 로고를 배치하면 시간 표시에 완전히 가려집니다.',
          keyTakeaway: '우측 하단 가로 20%, 세로 15% 영역에는 텍스트나 얼굴을 배치하지 마세요.',
        },
      ],
      workedExample: {
        title: '모바일 스튜디오 앱 업로드 오류 해결 사례',
        scenario: '포토샵에서 1440p 해상도의 4.8MB PNG 썸네일을 제작한 크리에이터가 모바일 YouTube Studio 앱에서 업로드를 시도했으나 오류가 발생함.',
        steps: [
          '원인 분석: 데스크톱과 달리 모바일 YouTube Studio 앱은 2MB 용량 제한을 엄격하게 적용함.',
          '캔버스 크기를 플랫폼 표준인 1280×720(16:9)으로 조정하여 불필요한 고해상도 픽셀 제거.',
          '브라우저 로컬 WebAssembly 압축을 통해 85% 품질의 JPEG로 변환하여 파일 용량을 420KB로 축소.',
        ],
        conclusion: '1280×720 해상도 조정과 최적화 압축으로 파일 크기를 4.8MB에서 420KB(91% 감소)로 줄여 모바일과 PC 모두에서 즉시 업로드에 성공했습니다.',
      },
      checklist: [
        { title: '캔버스 해상도 확인', detail: '캔버스 크기가 정확히 1280×720 픽셀(16:9, 최소 너비 640px)인지 확인합니다.' },
        { title: '2MB 이하 용량 준수', detail: '모바일 스튜디오 앱의 거부를 막기 위해 최종 이미지 크기를 2MB 이하로 압축합니다.' },
        { title: '우측 하단 데드존 여백 확보', detail: '우측 하단 가로 20%, 세로 15% 영역에 텍스트나 얼굴이 없는지 확인합니다.' },
        { title: '15% 축소 테스트 수행', detail: '모니터에서 15% 배율로 축소하여 스마트폰 화면에서도 문구와 피사체가 선명한지 점검합니다.' },
      ],
      faqs: [
        {
          question: "유튜브 썸네일 공식 권장 해상도와 파일 용량 한도는?",
          answer: "유튜브는 16:9 화면비의 1280×720 픽셀(최소 너비 640px), JPG/PNG/WebP 형식을 권장합니다. 모바일 앱 업로드는 2MB 이하로 엄격히 제한되며 데스크톱 웹은 최대 50MB까지 가능합니다.",
        },
        {
          question: "썸네일 우측 하단 데드존이란 무엇인가요?",
          answer: "동영상 재생시간 배지가 썸네일 우측 하단 약 20% 너비와 15% 높이를 덮습니다. 이 영역에는 핵심 텍스트나 얼굴을 배치하지 않아야 합니다.",
        },
        {
          question: "왜 썸네일을 모바일 크기로 축소해서 테스트해야 하나요?",
          answer: "스마트폰 홈 피드에서는 썸네일이 너비 150~220px 크기로 작게 표시됩니다. 15% 축소 상태에서도 한눈에 의미가 전달되는 고대비 디자인이 필수적입니다.",
        },
      ],
    },
    'decoding-youtube-rpm': {
      title: '유튜브 RPM 완벽 분석: 2026년 크리에이터 정산 수익의 진실',
      category: '수익화',
      readTime: '8분 분량',
      description: '크리에이터 RPM과 광고주 CPM의 차이, 시청자 지역 티어, 플랫폼 수수료 및 순수익 계산에 대한 수학적 분석.',
      officialSources: [
        {
          label: 'YouTube 고객센터: 수익 지표 이해하기(RPM 및 CPM)',
          description: '크리에이터 실수령 RPM과 광고주 지출 총액 CPM을 구분하는 YouTube 공식 안내.',
        },
      ],
      contentSections: [
        {
          heading: '1. RPM과 CPM의 구조적 차이점',
          body: '많은 크리에이터가 CPM(1,000회 노출당 비용)과 RPM(1,000회 시청당 수익)을 혼동합니다. CPM은 광고주가 플랫폼 수수료 공제 전에 1,000회 광고 노출당 지불하는 금액입니다. 반면 RPM은 롱폼 영상 기준 유튜브의 45% 수수료가 차감된 후, 전체 1,000회 조회수당 크리에이터 통장에 들어오는 실제 실수령액입니다. 프리미엄 수익, 멤버십, 슈퍼챗도 포함됩니다.',
          keyTakeaway: 'CPM은 광고주가 유튜브에 내는 돈이며, RPM은 1,000회 조회수당 크리에이터가 실제로 받는 정산금입니다.',
        },
        {
          heading: '2. 채널 수익 믹스와 RPM 구성 요소',
          body: 'RPM은 채널의 종합적인 수익성을 보여줍니다. 광고 차단 프로그램을 쓰거나 단가가 낮은 국가의 시청자가 많다면 CPM이 높아도 RPM은 낮아질 수 있습니다. 반대로 채널 멤버십과 슈퍼챗이 활성화되면 RPM은 광고 단가 이상으로 상승합니다.',
          keyTakeaway: '멤버십과 후원 등 광고 외 수익원을 결합하여 채널의 종합 RPM을 극대화하세요.',
        },
        {
          heading: '3. 플랫폼 수수료 중복 공제의 함정',
          body: 'YouTube Studio에 표시된 RPM에서 유튜브 수수료 45%를 또 빼서 계산하는 실수가 흔히 발생합니다. 스튜디오에 나타나는 RPM은 이미 45% 수수료가 공제된 순수익 지표입니다. 다시 45%를 빼면 실제 수익을 절반 가까이 과소평가하게 됩니다.',
          keyTakeaway: 'YouTube Studio RPM에서 45%를 다시 차감하지 마세요. 이미 정산된 금액입니다.',
        },
      ],
      workedExample: {
        title: '월간 채널 순수익의 정확한 산출법',
        scenario: '월 250,000회 조회를 기록하는 IT 채널. YouTube Studio에 RPM $4.80, 재생 기반 CPM $11.50이 표시된 경우.',
        steps: [
          'CPM($11.50)은 광고주의 총 지출이며 실수령 계산에는 Studio RPM($4.80)을 적용해야 함을 인식.',
          '수수료 45%를 다시 빼지 않고 $4.80 수치를 그대로 사용.',
          '(250,000 ÷ 1,000) × $4.80 = $1,200. 여기에 멤버십 수익 $425를 더해 총 $1,625의 실수령액 계산.',
        ],
        conclusion: '크리에이터는 광고와 멤버십으로 총 $1,625의 순수익을 얻습니다. 45%를 중복 공제했다면 광고 수익을 $660로 왜곡할 뻔했습니다.',
      },
      checklist: [
        { title: '롱폼과 쇼츠 지표 분리', detail: '쇼츠는 크리에이터 풀 분배 방식이므로 롱폼과 분리하여 분석합니다.' },
        { title: '수수료 공제 여부 확인', detail: 'Studio의 RPM은 이미 플랫폼 몫이 차감된 순수익임을 확인합니다.' },
        { title: '시청자 국가 분포 점검', detail: '미국, 영국 등 Tier 1 국가 시청 비율이 높을수록 RPM이 크게 증가합니다.' },
        { title: '복합 RPM 산출', detail: '광고, 멤버십, 슈퍼챗을 합산하여 진정한 채널 단가를 계산합니다.' },
      ],
      faqs: [
        {
          question: "유튜브에서 CPM과 RPM의 차이는 무엇인가요?",
          answer: "CPM은 광고주가 1,000회 광고 노출당 지불하는 금액입니다. RPM은 유튜브의 45% 수수료 차감 후 전체 1,000회 조회수당 크리에이터가 정산받는 순수익입니다.",
        },
        {
          question: "YouTube Studio에 나오는 RPM에서 45%를 또 빼야 하나요?",
          answer: "아닙니다. YouTube Studio에 표시되는 RPM은 이미 45% 수수료가 차감된 순수익입니다. 다시 차감하면 수익이 절반으로 왜곡됩니다.",
        },
        {
          question: "쇼츠 수익 정산은 일반 롱폼 영상과 어떻게 다른가요?",
          answer: "롱폼은 영상 광고비의 55%를 크리에이터가 직접 가져가지만, 쇼츠는 국가별 크리에이터 풀로 모인 뒤 조회수 비중에 따라 45%를 배분받습니다.",
        },
      ],
    },
    'youtube-shorts-safe-zone': {
      title: '쇼츠 세이프존 설계: 자막과 얼굴이 UI에 가려지지 않게 하는 법',
      category: '쇼츠 & 세로 영상',
      readTime: '5분 분량',
      description: '9:16 세로 영상 규격 및 모바일 인터페이스 오버레이 가이드. 구독 버튼과 타이틀이 핵심 요소를 가리지 않도록 배치하는 방법.',
      officialSources: [
        {
          label: 'YouTube 크리에이터 포털: YouTube Shorts 제작',
          description: '세로 영상 제작, 모바일 화면 여백 및 대화형 UI 요소에 대한 YouTube 공식 지침.',
        },
      ],
      contentSections: [
        {
          heading: '1. 9:16 화면비와 앱 인터페이스 방해 영역',
          body: '유튜브 쇼츠는 9:16 화면비(1080×1920 픽셀)를 사용합니다. 모바일에서는 화면 상당 부분이 앱 UI로 덮입니다. 상단 약 15%(Y=0~288px)는 사운드 선택과 검색 아이콘, 하단 약 28%(Y=1380~1920px)는 프로필, 구독 버튼, 제목이 차지합니다. 우측 약 18%에는 좋아요, 댓글, 공유 아이콘이 세로로 배열됩니다.',
          keyTakeaway: '화면 높이 중앙의 57% 영역이 얼굴과 핵심 행동, 자막을 배치해야 하는 세이프존입니다.',
        },
        {
          heading: '2. 긴 제목 줄바꿈과 하단 마진 침범',
          body: '하단 UI 높이는 가변적입니다. 제목이 60자 이상이면 스마트폰 화면에서 2~3줄로 줄바꿈되어 하단 오버레이가 영상 쪽으로 최대 100픽셀 더 밀고 올라옵니다.',
          keyTakeaway: '제목 줄바꿈을 대비해 핵심 요소는 화면 하단에서 최소 450픽셀 이상 띄워 배치하세요.',
        },
        {
          heading: '3. 자막 배치를 위한 권장 세이프 코리더',
          body: '음소거 상태로 시청하는 사용자를 위해 자막은 필수적입니다. 자막은 화면 높이 40%~65% 사이의 중앙 통로(Y=770px~1250px)에 중앙 정렬로 배치하고, 우측 아이콘 열과 180픽셀 이상의 여백을 확보하세요.',
          keyTakeaway: '자막은 화면 중앙(높이 40%~65%)에 배치하고 우측 테두리에서 최소 180px 띄우세요.',
        },
      ],
      workedExample: {
        title: '교육용 쇼츠 자막 위치 조정을 통한 가독성 복구',
        scenario: '크리에이터가 화면 맨 아래(Y=1750px)에 자막을 넣은 쇼츠를 게시했으나, 구독 버튼과 오디오 제목에 자막이 완전히 가려지는 문제 발생.',
        steps: [
          '공식 레이아웃 확인: 캔버스 하단 28%는 채널 정보와 재생 컨트롤로 채워짐.',
          '자막 트랙을 권장 안전 통로인 Y=850px~1200px 구간으로 상향 이동.',
          '우측 좋아요/댓글 아이콘 열과의 충돌을 피하기 위해 우측 마진을 최소 180px 확보.',
        ],
        conclusion: '자막을 Y=900px 중앙 정렬, 우측 180px 여백으로 재배치하여 모든 기기에서 100% 정상 가독성을 확보했습니다.',
      },
      checklist: [
        { title: '상단 15% 영역 비우기', detail: '상단 288px에는 주요 텍스트나 헤드라인을 배치하지 않습니다.' },
        { title: '하단 28% 설명 영역 보호', detail: '제목과의 겹침을 방지하기 위해 자막과 얼굴을 Y=1380px 위쪽에 둡니다.' },
        { title: '우측 여백 180px 확보', detail: '우측 가장자리로부터 최소 180px 이상 거리를 둡니다.' },
        { title: '제목 2줄 줄바꿈 테스트', detail: '긴 제목이 두 줄로 표시되어도 화면 내 핵심 요소가 가려지지 않는지 확인합니다.' },
      ],
      faqs: [
        {
          question: "유튜브 쇼츠의 세이프존 권장 규격은 어떻게 되나요?",
          answer: "1080×1920 픽셀(9:16) 화면에서 상단 15%, 하단 28%, 우측 18%를 UI가 차지하므로, 중앙 57% 높이 영역이 핵심 안전지대입니다.",
        },
        {
          question: "쇼츠 영상에서 자막을 넣기 가장 좋은 위치는 어디인가요?",
          answer: "화면 높이 40%~65% 사이(Y=770px~1250px) 중앙 통로에 배치하고 우측 아이콘 열과 최소 180px 간격을 두는 것이 이상적입니다.",
        },
        {
          question: "영상 제목 길이는 쇼츠 화면에 어떤 영향을 주나요?",
          answer: "제목이 길어지면 스마트폰에서 여러 줄로 줄바꿈되어 하단 UI 오버레이가 영상 위쪽으로 더 넓게 침범합니다.",
        },
      ],
    },
  },

  it: {
    'youtube-thumbnail-blueprint': {
      title: 'Guida definitiva alle miniature YouTube: limiti, dimensioni e CTR',
      seoTitle: 'Miniature YouTube: dimensioni, limiti e CTR',
      category: 'Packaging visivo',
      readTime: '6 min di lettura',
      description: 'Linee guida ufficiali della piattaforma per proporzioni 16:9, limite di 2 MB su mobile e leggibilità su smartphone per massimizzare il CTR.',
      officialSources: [
        {
          label: 'Guida di YouTube: Aggiungere miniature dei video',
          description: 'Specifiche ufficiali di YouTube su risoluzione, proporzioni, formati supportati e limiti di caricamento.',
        },
      ],
      contentSections: [
        {
          heading: '1. Dimensioni ufficiali e limiti di peso dei file',
          body: 'Secondo le specifiche ufficiali di YouTube, le miniature personalizzate devono adottare un rapporto 16:9 con risoluzione raccomandata di 1280×720 pixel e larghezza minima di 640 pixel. I formati supportati sono JPG, GIF e PNG. Esiste una distinzione operativa determinante per il peso: l’app mobile YouTube Studio impone un limite rigido di 2 MB, mentre il caricamento da desktop consente fino a 50 MB. Mantenere l’esportazione sotto i 2 MB con spazio colore sRGB garantisce il caricamento immediato su ogni dispositivo.',
          keyTakeaway: 'Adotta la risoluzione 1280×720 (16:9) in formato JPEG o PNG sotto i 2 MB per una compatibilità universale su PC e smartphone.',
        },
        {
          heading: '2. Leggibilità mobile e test in scala ridotta',
          body: 'La maggioranza delle visualizzazioni su YouTube avviene su dispositivi mobili. Su uno smartphone, una miniatura da 1280×720 pixel viene visualizzata con una larghezza di appena 150-220 pixel. Trame complesse e font calligrafici diventano illeggibili. Struttura l’immagine su tre elementi chiari: una sagoma definita del soggetto, uno sfondo contrastato e non più di 3 o 4 parole in grassetto. Verifica sempre l’immagine ridotta al 15% prima della pubblicazione.',
          keyTakeaway: 'Progetta per una larghezza mobile di 180 pixel con sagome ad alto contrasto e caratteri spessi e leggibili anche in miniatura.',
        },
        {
          heading: '3. Angoli ciechi dell’interfaccia e badge della durata',
          body: 'L’interfaccia di YouTube sovrappone elementi grafici alla miniatura. L’ostacolo principale è il badge con la durata del video nell’angolo in basso a destra (es. "14:28"). Se inserisci volti, testi chiave o loghi nel 20% di larghezza e 15% di altezza in basso a destra, YouTube li coprirà integralmente.',
          keyTakeaway: 'Lascia il 20% di larghezza e 15% di altezza in basso a destra totalmente privo di testi, volti o dettagli narrativi.',
        },
      ],
      workedExample: {
        title: 'Risoluzione dell’errore di caricamento su app mobile',
        scenario: 'Un creator realizza una miniatura 1440p da 4,8 MB in Photoshop. Tentando di caricarla dall’app mobile YouTube Studio, l’operazione fallisce sistematicamente.',
        steps: [
          'Individuare la causa: l’app YouTube Studio per smartphone applica un tetto rigido di 2 MB, a differenza della versione desktop che accetta fino a 50 MB.',
          'Ridimensionare l’area di lavoro a 1280×720 (16:9), eliminando i pixel in eccesso senza perdita di qualità visiva percepibile.',
          'Comprimere in locale con WebAssembly in formato JPEG con qualità all’85%, riducendo il file a 420 KB.',
        ],
        conclusion: 'Esportando a 1280×720 e ottimizzando la compressione, il peso è sceso da 4,8 MB a 420 KB (-91%), consentendo l’upload immediato su mobile e PC.',
      },
      checklist: [
        { title: 'Verificare la risoluzione', detail: 'Assicurati che l’immagine misuri esattamente 1280×720 pixel (16:9) con larghezza minima di 640px.' },
        { title: 'Rispettare il tetto dei 2 MB', detail: 'Comprimi il file sotto i 2 MB per evitare il rifiuto dell’app YouTube Studio mobile.' },
        { title: 'Liberare l’area della durata', detail: 'Controlla che non vi siano testi o volti nel 20% di larghezza e 15% di altezza in basso a destra.' },
        { title: 'Superare il test zoom al 15%', detail: 'Riduci la vista al 15% per verificare che soggetto e testo rimangano chiari su schermi piccoli.' },
      ],
      faqs: [
        {
          question: "Quali sono le dimensioni e i limiti di peso ufficiali per le miniature di YouTube?",
          answer: "YouTube consiglia un rapporto 16:9 con risoluzione di 1280×720 pixel (larghezza minima 640px) in formato JPG, PNG o WebP. Da mobile il limite è di 2 MB, mentre da desktop si arriva fino a 50 MB.",
        },
        {
          question: "Dove si trova la zona d'ombra del minutaggio sulla miniatura?",
          answer: "Il badge con la durata occupa l'angolo inferiore destro per circa il 20% di larghezza e il 15% di altezza. Tieni volti e testi fuori da questa zona.",
        },
        {
          question: "Perché è fondamentale testare le miniature su scala smartphone?",
          answer: "Nel feed mobile le miniature appaiono larghe circa 150-220 pixel. I design devono avere un contrasto elevato e font in grassetto comprensibili anche al 15% di zoom.",
        },
      ],
    },
    'decoding-youtube-rpm': {
      title: 'Decodifica dell’RPM di YouTube: come vengono pagati i creator nel 2026',
      seoTitle: 'RPM di YouTube: come vengono pagati i creator',
      category: 'Monetizzazione',
      readTime: '8 min di lettura',
      description: 'Analisi matematica di RPM rispetto al CPM degli inserzionisti, fasce geografiche di pubblico e calcolo dei guadagni netti.',
      officialSources: [
        {
          label: 'Guida di YouTube: Informazioni sulle metriche delle entrate (RPM e CPM)',
          description: 'Documentazione ufficiale che distingue l’RPM netto del creator dal CPM lordo degli inserzionisti.',
        },
      ],
      contentSections: [
        {
          heading: '1. RPM vs CPM: la differenza strutturale fondamentale',
          body: 'Molti confondono il CPM (Costo per mille) con l’RPM (Entrate per mille). Il CPM è quanto pagano gli inserzionisti per 1.000 impressioni pubblicitarie prima della commissione di YouTube. L’RPM misura invece le entrate nette effettive per 1.000 visualizzazioni complessive, dopo la trattenuta del 45% di YouTube sui video lunghi.',
          keyTakeaway: 'Il CPM è ciò che gli inserzionisti versano a YouTube; l’RPM è quanto entra effettivamente sul conto del creator per 1.000 visualizzazioni.',
        },
        {
          heading: '2. Composizione delle entrate: cosa include l’RPM',
          body: 'L’RPM riflette l’efficienza economica complessiva del canale. Se molti spettatori usano adblocker o risiedono in paesi a basso investimento pubblicitario, il CPM può restare alto ma l’RPM scenderà. Al contrario, abbonamenti al canale e Super Grazie alzano notevolmente l’RPM effettivo.',
          keyTakeaway: 'Massimizza l’RPM diversificando con abbonamenti al canale e donazioni oltre alla sola pubblicità.',
        },
        {
          heading: '3. Trattenute della piattaforma e l’errore della doppia detrazione',
          body: 'Un errore molto diffuso è sottrarre un ulteriore 45% all’RPM mostrato in YouTube Studio. La cifra in YouTube Studio è già un valore netto con la commissione dedotta. Sottrarre di nuovo il 45% fa sottovalutare i propri guadagni quasi della metà.',
          keyTakeaway: 'Non sottrarre mai il 45% dall’RPM di YouTube Studio: è già stato dedotto dalla piattaforma.',
        },
      ],
      workedExample: {
        title: 'Calcolo accurato delle entrate nette mensili',
        scenario: 'Un canale tech totalizza 250.000 visualizzazioni al mese. YouTube Studio mostra un RPM di 4,80 $ e un CPM basato sulle riproduzioni di 11,50 $.',
        steps: [
          'Riconoscere che il CPM (11,50 $) è la spesa lorda pubblicitaria e l’RPM (4,80 $) è il guadagno netto per 1.000 visualizzazioni.',
          'Evitare la doppia detrazione: applicare direttamente i 4,80 $ di RPM.',
          'Moltiplicare le visualizzazioni per l’RPM: (250.000 / 1.000) × 4,80 $ = 1.200 $. Aggiungere 425 $ di abbonamenti per un totale netto di 1.625 $.',
        ],
        conclusion: 'Il creator guadagna 1.625 $ netti. Sottrarre il 45% per errore avrebbe fatto crollare la stima pubblicitaria a 660 $.',
      },
      checklist: [
        { title: 'Separare video lunghi e Shorts', detail: 'Analizza i due formati separatamente a causa delle diverse dinamiche di ripartizione.' },
        { title: 'Verificare le trattenute applicate', detail: 'Usa l’RPM netto di Studio senza applicare detrazioni percentuali ridondanti.' },
        { title: 'Controllare la provenienza geografica', detail: 'Pubblici dei paesi Tier 1 aumentano sensibilmente il valore medio dell’RPM.' },
        { title: 'Calcolare l’RPM complessivo', detail: 'Somma pubblicità, abbonamenti e donazioni per conoscere l’RPM globale effettivo.' },
      ],
      faqs: [
        {
          question: "Qual è la differenza tra CPM e RPM su YouTube?",
          answer: "Il CPM è quanto spendono gli inserzionisti per 1.000 impressioni di annunci prima della quota di YouTube. L'RPM è il guadagno netto reale per 1.000 visualizzazioni totali dopo la detrazione del 45%.",
        },
        {
          question: "I creator devono sottrarre il 45% dall'RPM mostrato in YouTube Studio?",
          answer: "No. L'RPM in YouTube Studio è già al netto della quota trattenuta dalla piattaforma. Sottrarre di nuovo il 45% dimezza erroneamente la stima dei guadagni.",
        },
        {
          question: "In che modo il compenso per gli Shorts si differenzia dai video lunghi?",
          answer: "Nei video lunghi i creator ricevono il 55% degli annunci diretti del video. Negli Shorts i ricavi confluiscono in un Creator Pool nazionale e il 45% viene distribuito in base alla quota di visualizzazioni.",
        },
      ],
    },
    'youtube-shorts-safe-zone': {
      title: 'Zone sicure negli Shorts: proteggere sottotitoli e volti dai pulsanti UI',
      seoTitle: 'Zone sicure negli Shorts: sottotitoli e volti',
      category: 'Shorts e video verticali',
      readTime: '5 min di lettura',
      description: 'Dimensioni tecniche e margini dell’interfaccia per video verticali 9:16. Evita che i pulsanti di interazione coprano i punti salienti del video.',
      officialSources: [
        {
          label: 'Portale dei Creator di YouTube: Creare YouTube Shorts',
          description: 'Indicazioni ufficiali di YouTube sull’inquadratura e gli elementi interattivi nei video verticali.',
        },
      ],
      contentSections: [
        {
          heading: '1. Il formato 9:16 e le zone di ingombro dell’interfaccia',
          body: 'Gli Shorts di YouTube utilizzano il formato 9:16 (1080×1920 pixel). Su smartphone, gli elementi dell’applicazione coprono un’ampia porzione del video. Il 15% superiore (Y=0 a 288px) contiene i controlli audio e la ricerca. Il 28% inferiore (Y=1380 a 1920px) ospita avatar, pulsante iscriviti e titolo. Il bordo destro (18% di larghezza) accoglie i pulsanti mi piace, commenti e condividi.',
          keyTakeaway: 'Il 57% centrale dell’altezza dello schermo è l’area sicura principale in cui devono risiedere volti, azioni e sottotitoli.',
        },
        {
          heading: '2. Titoli su più righe e margini variabili',
          body: 'L’altezza dell’area inferiore varia in base al titolo: testi con più di 60 caratteri vanno a capo su due o tre righe su smartphone, alzando i comandi interattivi fino a 100 pixel in più verso il centro del video.',
          keyTakeaway: 'Mantieni i contenuti essenziali ad almeno 450 pixel dal fondo per evitare collisioni con titoli lunghi.',
        },
        {
          heading: '3. La fascia consigliata per sottotitoli e testi',
          body: 'I sottotitoli impressi a video sono indispensabili per catturare chi guarda senza audio. Posizionali nella fascia protetta tra il 40% e il 65% dell’altezza (Y=770px a Y=1250px), centrati con almeno 180px di margine dalla colonna di icone a destra.',
          keyTakeaway: 'Centra i sottotitoli tra il 40% e il 65% dell’altezza lasciando almeno 180px di spazio dal bordo destro.',
        },
      ],
      workedExample: {
        title: 'Riposizionamento dei sottotitoli di uno Short educativo',
        scenario: 'Un creator pubblica uno Short con sottotitoli posizionati in basso (Y=1750px). Una volta pubblicato, il pulsante iscriviti e il titolo del brano coprono il testo.',
        steps: [
          'Verificare la schermata rispetto al layout ufficiale: il 28% inferiore è riservato ai comandi di riproduzione e all’account.',
          'Spostare la traccia dei sottotitoli nella fascia sicura tra Y=850px e Y=1200px.',
          'Mantenere una distanza minima di 180px dal bordo destro per non interferire con i pulsanti mi piace e commenti.',
        ],
        conclusion: 'Spostando i sottotitoli a Y=900px centrati con 180px di margine a destra, la leggibilità è tornata perfetta su ogni modello di smartphone.',
      },
      checklist: [
        { title: 'Liberare l’intestazione superiore', detail: 'Lascia il 15% superiore (288px) libero da testi o elementi fondamentali.' },
        { title: 'Tutelare il 28% inferiore', detail: 'Posiziona sottotitoli e volti sopra Y=1380px per evitare sovrapposizioni con la descrizione.' },
        { title: 'Rispettare il margine destro', detail: 'Conserva almeno 180px di spazio libero dal bordo destro dello schermo.' },
        { title: 'Simulare titoli su due righe', detail: 'Verifica che titoli più lunghi non coprano parti essenziali del tuo video.' },
      ],
      faqs: [
        {
          question: "Quali sono le dimensioni della safe zone nei YouTube Shorts?",
          answer: "Nei video verticali 9:16 (1080×1920 pixel), l'interfaccia copre circa il 15% in alto, il 28% in basso e il 18% a destra. Il 57% centrale in altezza è la zona sicura.",
        },
        {
          question: "Qual è la posizione migliore per i sottotitoli nei YouTube Shorts?",
          answer: "Nella fascia centrale tra il 40% e il 65% dell'altezza (Y=770px a Y=1250px), centrati e con almeno 180px di margine dal bordo destro.",
        },
        {
          question: "Come influisce la lunghezza del titolo sui margini dello Short?",
          answer: "I titoli con oltre 60 caratteri vanno a capo su più righe negli schermi mobile, spingendo la grafica inferiore ancora più in alto sui contenuti del video.",
        },
      ],
    },
  },
};

export function getLocalizedGuide(slug: string, locale: Locale): LocalizedGuideData | undefined {
  return localizedGuides[locale]?.[slug] || localizedGuides.en[slug];
}

