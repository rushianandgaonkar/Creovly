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
      title: 'YouTube Thumbnail Size: 1280×720 Dimensions, 2 MB Limit & CTR Tips',
      seoTitle: 'YouTube Thumbnail Size, Limits & CTR Guide',
      category: 'Visual Packaging',
      readTime: '6 min read',
      description: 'YouTube thumbnail size is 1280×720 pixels at 16:9, under 2 MB, in JPG, PNG or GIF. See the official limits, safe zones and how to resize or compress yours.',
      officialSources: [
        {
          label: 'YouTube Help: Add video thumbnails',
          description: 'Official YouTube specifications for thumbnail resolution, aspect ratio, supported file types, and upload size caps.',
        },
      ],
      contentSections: [
        {
          heading: '1. YouTube thumbnail size in 2026: 1280×720 pixels, 16:9, under 2 MB',
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
          question: "What is RPM on YouTube?",
          answer: "RPM (Revenue Per Mille) on YouTube is the metric showing how much net money a creator earns per 1,000 total video views across all monetization sources (ads, YouTube Premium, Channel Memberships, Super Chats) after YouTube's 45% platform cut. The official formula is: RPM = (Estimated Total Revenue / Total Views) × 1,000.",
        },
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
    'how-much-does-youtube-pay-per-1000-views': {
      title: 'How Much Does YouTube Pay Per 1,000 Views? (2026 Earnings Rates)',
      seoTitle: 'How Much Does YouTube Pay Per 1,000 Views?',
      category: 'Monetization & Economics',
      readTime: '7 min read',
      description:
        'Discover how much YouTube pays per 1,000 views across niches, long-form vs Shorts, CPM vs RPM take-home rates, and calculate your channel earnings.',
      officialSources: [
        {
          label: 'YouTube Help: Understand YouTube Analytics metrics: Revenue per mille (RPM)',
          description:
            'Official definition and calculation breakdown of creator RPM, monetized playbacks, and take-home earnings.',
        },
        {
          label: 'YouTube Help: YouTube Partner Program overview & monetization policies',
          description:
            'Official documentation on YouTube ad revenue sharing terms, YPP eligibility thresholds, and revenue splits.',
        },
      ],
      contentSections: [
        {
          heading: '1. How much does YouTube pay per 1,000 views on average?',
          body: 'On average, YouTube pays creators between $2.00 and $12.00 per 1,000 views for standard long-form videos in tier-1 geographic markets (such as the United States, United Kingdom, Canada, Australia, and Germany). This metric is known as your net Revenue Per Mille (RPM). Earnings vary widely by content niche: competitive commercial categories like personal finance, business software, real estate, and investing can achieve RPMs ranging from $15.00 to over $35.00 per 1,000 views. Conversely, broad entertainment, vlogs, and gaming channels typically earn between $1.50 and $4.50 per 1,000 views. For YouTube Shorts, monetization operates under a pooled revenue model, yielding significantly lower rates—typically between $0.02 and $0.07 per 1,000 views.',
          keyTakeaway: 'Most long-form channels earn between $2.00 and $12.00 per 1,000 views, whereas YouTube Shorts typically generate $0.02 to $0.07 per 1,000 views.',
        },
        {
          heading: '2. CPM vs. RPM: why advertisers pay more than you receive',
          body: 'Many creators confuse advertiser CPM (Cost Per Mille) with creator RPM (Revenue Per Mille). CPM represents what an advertiser pays YouTube for every 1,000 commercial ad impressions. However, you do not receive that entire amount. First, YouTube retains a 45% platform share on video ads, giving the creator 55%. Second, not every video view serves an ad—viewer ad blockers, regional advertiser inventory limits, and short playbacks mean that ad impressions are lower than total video views. In contrast, RPM measures your actual take-home revenue divided by total views (times 1,000), including YouTube Premium payouts and channel memberships. Use our free YouTube RPM Calculator to calculate your true net earnings per 1,000 views directly from your analytics.',
          keyTakeaway: 'Advertiser CPM is gross spend before platform fees; creator RPM is your actual take-home pay per 1,000 total views. Never subtract 45% from your YouTube Studio RPM twice.',
        },
        {
          heading: '3. Top factors determining your pay per 1,000 views',
          body: 'Five primary factors dictate your channel’s pay per 1,000 views: (1) Audience Geography: Viewers in countries with high advertiser spending (US, UK, Northern Europe) command ad rates 5x to 10x higher than viewers in developing ad markets. (2) Commercial Niche: Niches with high customer lifetime values (investing, B2B tools, legal, tech reviews) attract aggressive advertiser bidding. (3) Video Length & Mid-Rolls: Videos over 8 minutes qualify for mid-roll ads, enabling multiple ad breaks per viewer instead of just pre-roll and post-roll ads. (4) Viewer Demographics: Mature audiences (25–54) with disposable income command higher ad prices than teenage demographics. (5) Seasonality: Advertiser budgets surge during Q4 (October through December) for holiday shopping and contract resets, often doubling creator RPMs compared to January.',
          keyTakeaway: 'Audience location, commercial topic intent, and video lengths over 8 minutes are the strongest levers creators control to maximize pay per 1,000 views.',
        },
        {
          heading: '4. Pay rates by niche: finance, tech, gaming, and lifestyle',
          body: 'Advertiser bidding density varies drastically across content genres. Here are verified typical RPM ranges for long-form content in primary markets: (1) Personal Finance, Crypto & Investing: $12.00 to $35.00+; (2) SaaS, Tech Reviews & Coding: $6.00 to $18.00; (3) Business & Digital Marketing: $7.00 to $22.00; (4) Education, Career & How-To: $4.00 to $10.00; (5) Fitness & Health: $3.00 to $8.00; (6) Lifestyle, Travel & Vlogs: $1.80 to $4.50; (7) Gaming & Esports: $1.20 to $3.50; (8) Comedy & Entertainment: $1.20 to $3.00. You can experiment with different niche RPM assumptions and view scenarios using our interactive YouTube Money Calculator.',
          keyTakeaway: 'Commercial topics with high transaction values earn 5x to 10x more per view than casual entertainment and gaming channels.',
        },
        {
          heading: '5. Projecting your income: from 1,000 to 1,000,000 views',
          body: 'Understanding the mathematical progression from 1,000 views to 1,000,000 views helps creators set realistic milestones: At 1,000 views, expect $2.00 to $12.00 (Long-Form) or $0.02 to $0.07 (Shorts). At 10,000 views, earnings reach $20.00 to $120.00 (Long-Form) or $0.20 to $0.70 (Shorts). At 100,000 views, earnings scale to $200.00 to $1,200.00 (Long-Form) or $2.00 to $7.00 (Shorts). At 1,000,000 views, earnings reach $2,000.00 to $12,000.00+ (Long-Form) or $20.00 to $70.00 (Shorts). To account for total creator income beyond AdSense—including sponsorships, merchandise, and affiliate revenue—model your full financial picture with the YouTube Monetization Calculator.',
          keyTakeaway: '1 million long-form views typically yields $2,000 to $12,000+ in ad revenue, whereas 1 million Shorts views yields approximately $20 to $70.',
        },
      ],
      workedExample: {
        title: 'Comparing Tech Tutorial vs. Gaming Highlight Earnings',
        scenario:
          'Two YouTube creators each upload 12-minute videos that each receive exactly 250,000 views over 30 days. Creator A runs a software tutorial channel with an audience primarily in the United States and Canada. Creator B operates a gaming highlights channel with a broad international audience.',
        steps: [
          'Analyze Creator A (Software Tutorial): High commercial advertiser demand yields a $9.20 net RPM. Total earnings: (250,000 / 1,000) × $9.20 = $2,300.00.',
          'Analyze Creator B (Gaming Highlights): Broad global demographic and lower commercial bidding yield a $2.10 net RPM. Total earnings: (250,000 / 1,000) × $2.10 = $525.00.',
          'Compare the revenue disparity: Despite achieving identical view counts (250,000 views each), Creator A earned $1,775.00 more (over 4.3x higher revenue) due to niche purchasing intent and audience geography.',
        ],
        conclusion:
          'View count is only half of the revenue equation. High commercial intent and tier-1 audience geography dramatically multiply creator earnings per 1,000 views.',
      },
      checklist: [
        {
          title: 'Audit Your Studio 28-Day RPM',
          detail:
            'Open YouTube Studio Analytics > Revenue and review your true 28-day RPM across recent videos rather than relying on external CPM estimates.',
        },
        {
          title: 'Optimize Video Duration for Mid-Rolls',
          detail:
            'Produce long-form content exceeding 8 minutes to unlock manual mid-roll ad placements at natural topic breaks.',
        },
        {
          title: 'Target Commercial Intent Keywords',
          detail:
            'Incorporate software, tool, tutorial, or product comparison keywords that attract high-bidding advertisers.',
        },
        {
          title: 'Differentiate Long-Form from Shorts',
          detail:
            'Use Shorts for audience acquisition and brand discovery, while funneling viewers to long-form videos for sustainable ad revenue.',
        },
        {
          title: 'Model Financial Scenarios Locally',
          detail:
            'Use Creovly’s YouTube Money Calculator and RPM Calculator to project monthly income without uploading personal analytics data.',
        },
      ],
      faqs: [
        {
          question: 'How much does YouTube pay per 1,000 views?',
          answer:
            'Most creators earn between $2.00 and $12.00 per 1,000 views on standard long-form videos in primary markets. High-intent niches like finance can reach $20.00 to $35.00+, while YouTube Shorts pay $0.02 to $0.07 per 1,000 views.',
        },
        {
          question: 'How much does YouTube pay for 1 million views?',
          answer:
            'One million long-form views typically yields between $2,000 and $12,000 in ad revenue. In high-paying commercial categories, 1M views can reach $20,000 to $30,000+. For YouTube Shorts, 1 million views yields roughly $20 to $70.',
        },
        {
          question: 'Why does my YouTube RPM differ from advertiser CPM?',
          answer:
            'Advertiser CPM is what brands pay before YouTube deducts its 45% revenue cut and excludes unmonetized views. RPM is your true net take-home pay per 1,000 total video views, already accounting for all deductions and including YouTube Premium.',
        },
        {
          question: 'Does YouTube pay for every video view?',
          answer:
            'No. YouTube only monetizes playback sessions where an advertisement was served or where a YouTube Premium subscriber watched your video. Across most channels, between 40% and 70% of views are monetized.',
        },
        {
          question: 'How can creators increase their YouTube RPM?',
          answer:
            'Creators can increase their RPM by targeting commercial search intent (software, business, finance), creating videos over 8 minutes with natural mid-roll ads, and building viewership in high-CPM countries like the US, UK, and Canada.',
        },
      ],
    },
  },

  es: {
    'youtube-thumbnail-blueprint': {
      title: 'Tamaño de miniatura de YouTube: 1280×720, límite de 2 MB y CTR',
      seoTitle: 'Miniaturas de YouTube: tamaño, límites y CTR',
      category: 'Presentación visual',
      readTime: '6 min de lectura',
      description: 'El tamaño de miniatura de YouTube es 1280×720 píxeles en 16:9, menos de 2 MB, en JPG, PNG o GIF. Consulta límites oficiales, zonas seguras y cómo redimensionar o comprimir.',
      officialSources: [
        {
          label: 'Ayuda de YouTube: Añadir miniaturas de vídeo',
          description: 'Especificaciones oficiales de YouTube sobre resolución, relación de aspecto, formatos y tamaño máximo de archivo.',
        },
      ],
      contentSections: [
        {
          heading: '1. Tamaño de miniatura de YouTube en 2026: dimensiones oficiales y peso máximo',
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
          question: "¿Qué es el RPM en YouTube?",
          answer: "El RPM (Ingresos por cada mil visitas) en YouTube mide cuánto dinero neto gana un creador por cada 1.000 visualizaciones totales en todas las fuentes de monetización (anuncios, YouTube Premium, Miembros del canal, Super Chat) tras el 45% de YouTube. La fórmula oficial es: RPM = (Ingresos Totales Estimados / Visitas Totales) × 1.000.",
        },
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
    'how-much-does-youtube-pay-per-1000-views': {
      title: '¿Cuánto Paga YouTube por 1.000 Visitas? (Tarifas y Calculadora 2026)',
      seoTitle: '¿Cuánto Paga YouTube por 1.000 Visitas?',
      category: 'Monetización y Economía',
      readTime: '7 min de lectura',
      description:
        'Descubre cuánto paga YouTube por 1.000 visitas según temática, vídeos largos frente a Shorts, RPM neto y cómo calcular tus ingresos de creador.',
      officialSources: [
        {
          label: 'Ayuda de YouTube: Métricas de YouTube Analytics (RPM)',
          description:
            'Definición oficial del RPM de creador, reproducciones monetizadas y desglose de ganancias netas.',
        },
        {
          label: 'Ayuda de YouTube: Resumen y políticas del Programa para Partners de YouTube',
          description:
            'Condiciones oficiales del reparto de ingresos publicitarios, requisitos de acceso y división 55/45.',
        },
      ],
      contentSections: [
        {
          heading: '1. ¿Cuánto paga YouTube por 1.000 visitas de media?',
          body: 'De media, YouTube paga entre 2,00 $ y 12,00 $ por cada 1.000 visitas en vídeos tradicionales de formato largo en mercados de habla inglesa y economías líderes (Estados Unidos, Reino Unido, Canadá, Australia y Alemania). Esta métrica se denomina RPM neto (ingresos por cada mil reproducciones). Los ingresos varían enormemente según la temática: sectores comerciales como finanzas personales, software empresarial e inversión alcanzan RPMs de 15,00 $ a más de 35,00 $ por 1.000 visitas. En cambio, canales de entretenimiento general, vlogs o videojuegos suelen generar entre 1,50 $ y 4,50 $. Para YouTube Shorts, el modelo de fondo compartido produce tarifas sustancialmente menores, entre 0,02 $ y 0,07 $ por cada 1.000 visitas.',
          keyTakeaway: 'La mayoría de vídeos largos generan entre 2 $ y 12 $ por cada 1.000 visitas, mientras que los Shorts producen de 0,02 $ a 0,07 $ por mil.',
        },
        {
          heading: '2. CPM frente a RPM: por qué los anunciantes pagan más de lo que recibes',
          body: 'Muchos creadores confunden el CPM del anunciante con el RPM del creador. El CPM representa lo que una marca paga a YouTube por 1.000 impresiones de anuncios. Sin embargo, tú no recibes esa cantidad íntegra: YouTube retiene el 45% de la publicidad y tú te quedas con el 55%. Además, no todas las reproducciones muestran anuncios debido a bloqueadores o falta de inventario publicitario. El RPM mide tus ingresos reales netos por cada 1.000 visualizaciones totales de vídeo, incluyendo suscripciones al canal y YouTube Premium. Utiliza nuestra Calculadora de RPM de YouTube para calcular tu tarifa neta real.',
          keyTakeaway: 'El CPM es el gasto bruto del anunciante; el RPM es tu ganancia neta real por 1.000 visualizaciones totales. No descuentes el 45% dos veces.',
        },
        {
          heading: '3. Factores determinantes en tus ingresos por 1.000 visitas',
          body: 'Cinco factores clave determinan tu RPM: (1) Geografía de la audiencia: Países con mayor inversión publicitaria pagan hasta diez veces más que mercados emergentes. (2) Nicho temático: Audiencias con alta intención de compra (inversión, herramientas B2B, formación) atraen pujas publicitarias agresivas. (3) Duración del vídeo y anuncios intermedios: Los vídeos de más de 8 minutos permiten insertar anuncios mid-roll a lo largo del vídeo. (4) Demografía del público: Espectadores adultos (25–54 años) con poder adquisitivo generan mayores pujas que menores de edad. (5) Estacionalidad: El cuarto trimestre (octubre a diciembre) suele duplicar las tarifas habituales por la campaña navideña.',
          keyTakeaway: 'La ubicación geográfica del espectador, la temática comercial y vídeos de más de 8 minutos son las mayores palancas para maximizar tus ingresos.',
        },
        {
          heading: '4. Tarifas estimadas por temática: finanzas, tecnología, videojuegos y vlogs',
          body: 'La inversión publicitaria varía de manera drástica según la categoría del contenido: (1) Finanzas personales, cripto e inversión: 12,00 $ a 35,00 $+; (2) Software, tutoriales y desarrollo: 6,00 $ a 18,00 $; (3) Negocios y marketing digital: 7,00 $ a 22,00 $; (4) Educación y tutoriales: 4,00 $ a 10,00 $; (5) Salud y fitness: 3,00 $ a 8,00 $; (6) Vlogs y estilo de vida: 1,80 $ a 4,50 $; (7) Gaming y videojuegos: 1,20 $ a 3,50 $; (8) Humor y comedia: 1,20 $ a 3,00 $. Puedes experimentar con distintas proyecciones usando nuestra Calculadora de Ingresos de YouTube.',
          keyTakeaway: 'Los temas comerciales y técnicos generan de 5 a 10 veces más ingresos por visita que el entretenimiento informal.',
        },
        {
          heading: '5. Proyección de ingresos: de 1.000 a 1.000.000 de visitas',
          body: 'Comprender la escala matemática ayuda a planificar hitos reales: Con 1.000 visitas obtendrás entre 2,00 $ y 12,00 $ (vídeos largos) o 0,02 $ a 0,07 $ (Shorts). Con 10.000 visitas, de 20,00 $ a 120,00 $ (largos) o 0,20 $ a 0,70 $ (Shorts). Con 100.000 visitas, de 200,00 $ a 1.200,00 $ (largos) o 2,00 $ a 7,00 $ (Shorts). Con 1.000.000 de visitas, entre 2.000,00 $ y 12.000,00 $+ (largos) o de 20,00 $ a 70,00 $ (Shorts). Para calcular ingresos totales incluyendo patrocinios y membresías, modela tu escenario completo con la Calculadora de Monetización de YouTube.',
          keyTakeaway: '1 millón de visitas en formato largo suele reportar de 2.000 $ a 12.000 $+ netos, frente a apenas 20 $ a 70 $ en Shorts.',
        },
      ],
      workedExample: {
        title: 'Comparativa de ingresos: Tutorial técnico vs. Jugadas de videojuegos',
        scenario:
          'Dos creadores publican vídeos de 12 minutos que reciben exactamente 250.000 visitas en 30 días. El Creador A gestiona un canal de tutoriales de programación con público en España y Estados Unidos. El Creador B administra un canal de resúmenes de videojuegos con audiencia global diversa.',
        steps: [
          'Analizar Creador A (Tutoriales de código): La fuerte demanda de anunciantes de software produce un RPM neto de 9,20 $. Ganancias: (250.000 / 1.000) × 9,20 $ = 2.300,00 $.',
          'Analizar Creador B (Resúmenes de videojuegos): Una audiencia más joven y menor puja comercial rinden un RPM de 2,10 $. Ganancias: (250.000 / 1.000) × 2,10 $ = 525,00 $.',
          'Comparar el diferencial: Pese a registrar exactamente las mismas visitas (250.000 cada uno), el Creador A generó 1.775,00 $ más (4,3 veces más dinero) debido al nicho y al perfil económico de su audiencia.',
        ],
        conclusion:
          'El número de visualizaciones es solo una parte de la ecuación. La intención comercial de la temática y la geografía multiplican el rendimiento económico de cada visita.',
      },
      checklist: [
        {
          title: 'Audita el RPM real en YouTube Studio',
          detail:
            'Consulta YouTube Studio > Analíticas > Ingresos y revisa el RPM de los últimos 28 días en lugar de fiarte de estimaciones externas genéricas.',
        },
        {
          title: 'Optimiza la duración para pausas intermedias',
          detail:
            'Produce vídeos largos de más de 8 minutos para habilitar la colocación estratégica de pausas publicitarias intermedias.',
        },
        {
          title: 'Elige palabras clave de intención comercial',
          detail:
            'Integra términos sobre software, comparativas, productos y servicios que atraigan a anunciantes con presupuestos elevados.',
        },
        {
          title: 'Diferencia el papel de Shorts y vídeos largos',
          detail:
            'Aprovecha los Shorts para captar nueva audiencia y canaliza a esos espectadores hacia vídeos largos para obtener ingresos sostenibles.',
        },
        {
          title: 'Modela tus escenarios en local',
          detail:
            'Usa las calculadoras de Creovly para proyectar tus metas de ingresos con total privacidad sin subir datos personales a la nube.',
        },
      ],
      faqs: [
        {
          question: '¿Cuánto paga YouTube por 1.000 visitas?',
          answer:
            'La mayoría de los creadores ganan entre 2,00 $ y 12,00 $ por cada 1.000 visitas en vídeos largos tradicionales. En nichos de alta intención como finanzas puede superar los 20,00 $, mientras que los Shorts pagan entre 0,02 $ y 0,07 $ por mil.',
        },
        {
          question: '¿Cuánto se gana por 1 millón de visitas en YouTube?',
          answer:
            'Un millón de visitas en vídeos largos suele generar entre 2.000 $ y 12.000 $ en publicidad. En sectores de alta rentabilidad puede superar los 20.000 $. En YouTube Shorts, 1 millón de visitas genera entre 20 $ y 70 $.',
        },
        {
          question: '¿Por qué mi RPM es diferente del CPM en YouTube?',
          answer:
            'El CPM es lo que pagan los anunciantes antes del 45% que retiene YouTube y excluye reproducciones sin anuncios. El RPM es tu ganancia neta real por cada 1.000 visitas totales, incluyendo YouTube Premium.',
        },
        {
          question: '¿YouTube paga por absolutamente todas las visitas?',
          answer:
            'No. YouTube solo remunera las visitas monetizadas donde efectivamente se mostró un anuncio o donde el espectador cuenta con una suscripción activa a YouTube Premium.',
        },
        {
          question: '¿Cómo puedo aumentar el RPM de mi canal de YouTube?',
          answer:
            'Puedes aumentar tu RPM orientando tu contenido hacia temas comerciales (finanzas, tecnología, empresa), creando vídeos de más de 8 minutos con mid-rolls y atrayendo audiencia de países con alto poder adquisitivo.',
        },
      ],
    },
    'youtube-banner-size': {
        "title": "Tamaño del banner de YouTube: Dimensiones, zona segura y plantilla",
        "seoTitle": "Tamaño del banner de YouTube: Dimensiones y zona segura",
        "category": "Identidad del canal",
        "readTime": "5 min de lectura",
        "description": "Guía verificada del tamaño del banner de YouTube: resolución 2560×1440, zona segura central de 1235×338 para móvil y escritorio, límite de 6 MB y plantillas.",
        "officialSources": [
            {
                "label": "Ayuda de YouTube: Gestionar la imagen de marca de tu canal",
                "description": "Especificaciones oficiales de YouTube sobre dimensiones del banner, zona segura para texto y logotipos, formatos compatibles y límites de subida."
            }
        ],
        "contentSections": [
            {
                "heading": "1. Tamaño y dimensiones recomendadas para el banner: 2560×1440",
                "body": "Según las especificaciones oficiales de YouTube, el tamaño estándar de la cabecera del canal es de 2560 × 1440 píxeles con una relación de aspecto de 16:9. Las dimensiones mínimas de subida son 2048 × 1152 píxeles. Subir la imagen a 2560 × 1440 garantiza máxima nitidez en pantallas de alta densidad y televisores 4K sin pixelación.",
                "keyTakeaway": "Usa un lienzo de 2560 × 1440 (16:9) con al menos 2048 × 1152 píxeles para ser aceptado por YouTube."
            },
            {
                "heading": "2. Zona segura central para textos y logotipos: 1235×338",
                "body": "Debido a que YouTube muestra el banner en móviles, tabletas, ordenadores y televisiones, la imagen se recorta según el dispositivo. Para evitar que el nombre del canal, eslogan, redes o rostros se corten, mantén todo el contenido vital dentro de la zona segura central de 1235 × 338 píxeles (centrada horizontal y verticalmente).",
                "keyTakeaway": "Sitúa toda la tipografía crítica, logotipos y elementos principales dentro de la zona segura de 1235 × 338."
            },
            {
                "heading": "3. Tamaño máximo de archivo y formatos compatibles",
                "body": "YouTube impone un límite máximo de 6 MB para los banners de canal. Los formatos admitidos son JPG, PNG, BMP y GIF sin animación. Para diseños fotográficos, un JPEG optimizado ofrece el mejor equilibrio entre peso y calidad. Para logotipos o gráficos vectoriales, usa PNG.",
                "keyTakeaway": "Mantén los archivos en 6 MB o menos en formato JPG o PNG para subir sin errores en YouTube Studio."
            },
            {
                "heading": "4. Diseña tu cabecera con el redimensionador de Creovly",
                "body": "Puedes comprobar el encuadre de tu cabecera con el Redimensionador de Miniaturas de YouTube de Creovly. La plantilla de banner 2560 × 1440 incluye una guía visual interactiva con la zona segura central de 1235 × 338 para previsualizar antes de publicar.",
                "keyTakeaway": "Usa el ajuste 2560 × 1440 en la herramienta para previsualizar el recorte móvil y de escritorio."
            }
        ],
        "workedExample": {
            "title": "Centrado de la cabecera para evitar cortes en teléfonos móviles",
            "scenario": "Un creador diseña un banner de 2560×1440. En móviles, su logotipo y horario de subida quedan cortados porque se colocaron fuera de la zona segura central.",
            "steps": [
                "Identificar el área de recorte móvil: La app móvil de YouTube solo muestra la franja central de 1235 × 338 píxeles.",
                "Reubicar textos y logotipos: Mueve la marca y el horario dentro del límite central de 1235 × 338.",
                "Mantener el fondo completo: Extiende texturas y degradados por todo el lienzo de 2560 × 1440 para que en televisiones se vea completo.",
                "Comprimir por debajo de 6 MB: Exporta la imagen en JPG optimizado por debajo de 6 MB con las herramientas de Creovly."
            ],
            "conclusion": "El banner muestra los textos y logotipos clave con total claridad en móviles y se expande con elegancia en ordenadores y televisores."
        },
        "checklist": [
            {
                "title": "Tamaño del lienzo maestro",
                "detail": "Configura la resolución a 2560 × 1440 píxeles (mínimo 2048 × 1152)."
            },
            {
                "title": "Zona segura central",
                "detail": "Mantén texto, logos y elementos clave dentro de los 1235 × 338 píxeles centrales."
            },
            {
                "title": "Límite de peso del archivo",
                "detail": "Verifica que la imagen pese estrictamente 6 MB o menos en JPG o PNG."
            },
            {
                "title": "Revisión multidispositivo",
                "detail": "Comprueba el banner tanto en la app móvil de YouTube como en el navegador web tras subirlo."
            }
        ],
        "faqs": [
            {
                "question": "¿Cuál es el tamaño recomendado del banner de YouTube?",
                "answer": "El tamaño oficial recomendado es de 2560 × 1440 píxeles con una relación de aspecto de 16:9 y unas dimensiones mínimas de 2048 × 1152 píxeles."
            },
            {
                "question": "¿Cuál es la zona segura del banner de YouTube?",
                "answer": "La zona segura para texto y logotipos es de 1235 × 338 píxeles centrada vertical y horizontalmente. Cualquier elemento dentro de esta área se verá en móviles, tabletas, ordenadores y televisores."
            },
            {
                "question": "¿Cuál es el tamaño máximo de archivo para el banner de YouTube?",
                "answer": "Los archivos de banner deben pesar 6 MB o menos y estar en formato JPG, PNG, BMP o GIF no animado."
            }
        ]
    },
    'youtube-monetization-requirements': {
        "title": "Requisitos para monetizar en YouTube explicados",
        "seoTitle": "Requisitos para monetizar en YouTube explicados",
        "category": "Monetización",
        "readTime": "7 min de lectura",
        "description": "Desglose detallado de los requisitos de monetización de YouTube: niveles de 500 y 1.000 suscriptores, 4.000 horas de visualización, 10M de vistas en Shorts y políticas del YPP.",
        "officialSources": [
            {
                "label": "Ayuda de YouTube: Resumen y requisitos del Programa de socios de YouTube",
                "description": "Criterios oficiales para unirse al YPP, hitos de suscriptores y horas de visualización, y políticas de monetización del canal."
            },
            {
                "label": "Ayuda de YouTube: Monetizar con YouTube Shorts",
                "description": "Pautas oficiales de la plataforma sobre el fondo común para creadores de Shorts y reparto de ingresos."
            }
        ],
        "contentSections": [
            {
                "heading": "1. Los dos niveles del Programa de socios de YouTube (YPP)",
                "body": "YouTube cuenta con dos niveles de acceso al YPP. El nivel inicial (financiación de fans) desbloquea Super Thanks, Super Chat, Super Stickers, miembros del canal y YouTube Shopping. Exige: 500 suscriptores, 3 vídeos públicos válidos en los últimos 90 días, y 3.000 horas de visualización en 12 meses o 3 millones de vistas en Shorts en 90 días. El nivel completo desbloquea anuncios en vídeos largos y Shorts. Exige: 1.000 suscriptores y 4.000 horas públicas en 12 meses o 10 millones de vistas en Shorts en 90 días.",
                "keyTakeaway": "Puedes comenzar a ganar con donaciones de fans a los 500 suscriptores y 3.000 horas; el reparto publicitario completo requiere 1.000 suscriptores y 4.000 horas."
            },
            {
                "heading": "2. Horas públicas válidas frente a tiempo no computable",
                "body": "Solo cuentan las horas públicas de vídeos de formato largo. El tiempo de visualización de los Shorts en el feed vertical NO cuenta para las 4.000 horas (los Shorts se evalúan por la vía separada de 10M de visualizaciones). Además, vídeos privados, ocultos, eliminados o campañas de Google Ads no computan.",
                "keyTakeaway": "Las horas deben proceder de vídeos públicos de formato largo vistos de forma orgánica en un periodo móvil de 365 días."
            },
            {
                "heading": "3. Requisitos técnicos y de cumplimiento normativo",
                "body": "Además de suscriptores y horas, los creadores deben activar la verificación en dos pasos en su cuenta de Google, vincular una cuenta activa de Google AdSense y no tener advertencias activas por faltas a las Normas de la Comunidad.",
                "keyTakeaway": "Protege tu canal con verificación en dos pasos, vincula AdSense y mantén tu canal limpio de sanciones de políticas."
            },
            {
                "heading": "4. Seguimiento de objetivos con los calculadores de Creovly",
                "body": "Calcula cuánto te falta para las 4.000 horas con nuestra Calculadora de Horas de Visualización según tu duración media. Usa la Calculadora de Monetización de YouTube para proyectar ingresos de anuncios, membresías y marcas.",
                "keyTakeaway": "Utiliza calculadoras especializadas para modelar el ritmo de publicación y visualizaciones necesarias."
            }
        ],
        "workedExample": {
            "title": "Planificación para alcanzar el hito de las 4.000 horas de visualización",
            "scenario": "Un creador tiene 850 suscriptores y 2.400 horas públicas. Desea calcular cuántas visitas necesita para las 1.600 horas restantes antes de que las horas más antiguas comiencen a vencer en el periodo móvil de 12 meses.",
            "steps": [
                "Calcular horas restantes: 4.000 objetivo − 2.400 actuales = 1.600 horas necesarias.",
                "Determinar visualizaciones: Con 4 minutos de retención media por visita, cada visita genera 0,067 horas. 1.600 ÷ 0,067 = 24.000 visitas requeridas.",
                "Fijar ritmo de publicación: 2 vídeos por semana con 2.000 visitas de media generan 16.000 visitas (aprox. 1.067 horas) al mes.",
                "Verificar estado de cuenta: Confirmar verificación en dos pasos activa y cero infracciones de normas."
            ],
            "conclusion": "Con este ritmo de producción, el creador alcanzará el umbral de 4.000 horas en 6–7 semanas, accediendo a la monetización publicitaria completa."
        },
        "checklist": [
            {
                "title": "Umbral de suscriptores",
                "detail": "Alcanza 500 suscriptores (apoyo de fans) o 1.000 suscriptores (ingresos publicitarios)."
            },
            {
                "title": "Horas o visitas de Shorts",
                "detail": "Acumula 4.000 horas públicas en 12 meses o 10 millones de vistas en Shorts en 90 días."
            },
            {
                "title": "Verificación en dos pasos",
                "detail": "Activa la verificación en dos pasos en tu cuenta de Google."
            },
            {
                "title": "Cuenta de AdSense vinculada",
                "detail": "Vincula una cuenta de Google AdSense aprobada para recibir los pagos."
            },
            {
                "title": "Canal sin infracciones",
                "detail": "Asegúrate de no tener faltas activas a las Normas de la Comunidad."
            }
        ],
        "faqs": [
            {
                "question": "¿Cuáles son los requisitos para monetizar un canal de YouTube?",
                "answer": "Para monetización completa con anuncios se necesitan 1.000 suscriptores y 4.000 horas públicas de visualización en 12 meses, o 10 millones de vistas en Shorts en 90 días. Hay un nivel inicial de donaciones a los 500 suscriptores y 3.000 horas."
            },
            {
                "question": "¿Las horas de YouTube Shorts cuentan para las 4.000 horas?",
                "answer": "No, las horas del feed de Shorts no computan para el requisito de 4.000 horas. Los Shorts tienen su propia vía de 10 millones de vistas en 90 días."
            },
            {
                "question": "¿Cuánto tiempo tienes para conseguir las 4.000 horas?",
                "answer": "Las 4.000 horas deben conseguirse en una ventana móvil de los últimos 365 días consecutivos. Las horas generadas hace más de un año van caducando del cómputo."
            }
        ]
    },
    'how-to-change-youtube-thumbnail': {
        "title": "Cómo cambiar la miniatura de YouTube paso a paso",
        "seoTitle": "Cómo cambiar la miniatura de YouTube (Paso a paso)",
        "category": "Identidad visual",
        "readTime": "5 min de lectura",
        "description": "Tutorial paso a paso para cambiar la miniatura en YouTube: desde YouTube Studio en PC, app móvil, verificación de cuenta telefónica y miniaturas en Shorts.",
        "officialSources": [
            {
                "label": "Ayuda de YouTube: Añadir o cambiar miniaturas de vídeos",
                "description": "Documentación oficial de YouTube sobre cómo subir, cambiar y seleccionar miniaturas personalizadas en ordenador y móviles."
            }
        ],
        "contentSections": [
            {
                "heading": "1. Verificación telefónica: desbloqueo de miniaturas personalizadas",
                "body": "Para poder subir miniaturas personalizadas en YouTube, tu canal debe tener el estado de teléfono verificado. Si no está verificado, YouTube solo te permitirá elegir entre tres fotogramas automáticos. Para desbloquearlas, ve a Configuración en YouTube Studio > Canal > Funciones intermedias y completa la verificación telefónica.",
                "keyTakeaway": "Completa la verificación telefónica en YouTube Studio para habilitar la subida de miniaturas personalizadas."
            },
            {
                "heading": "2. Cómo cambiar la miniatura en ordenador (YouTube Studio)",
                "body": "Para cambiar la miniatura desde tu PC, entra en YouTube Studio. Haz clic en \"Contenido\", selecciona el vídeo, sitúate sobre la miniatura actual, pulsa en Opciones (tres puntos verticales) y elige \"Cambiar\". Selecciona tu nueva imagen 1280 × 720 y pulsa \"Guardar\".",
                "keyTakeaway": "En YouTube Studio > Contenido > Detalles, pulsa los tres puntos en la miniatura y selecciona \"Cambiar\"."
            },
            {
                "heading": "3. Cómo cambiar la miniatura en la app móvil de YouTube Studio",
                "body": "Abre la app YouTube Studio en iOS o Android. Ve a \"Contenido\", selecciona el vídeo y pulsa el icono de lápiz (Editar). Luego pulsa el icono de lápiz sobre la miniatura, toca \"Cambiar\", selecciona la imagen de tu galería y guarda los cambios. Recuerda que el límite en móvil es de 2 MB.",
                "keyTakeaway": "Usa el icono del lápiz en la app móvil de YouTube Studio para cambiar miniaturas estés donde estés."
            },
            {
                "heading": "4. Cómo seleccionar o cambiar la miniatura en YouTube Shorts",
                "body": "Los Shorts gestionan las miniaturas de forma distinta. Actualmente no es posible subir una miniatura personalizada desde ordenador para Shorts ya publicados. Debes elegir el fotograma durante el proceso de subida en la app móvil de YouTube tocando el lápiz en la vista previa del vídeo.",
                "keyTakeaway": "Elige el fotograma de tu miniatura de Shorts durante la subida móvil; actualmente no se puede sustituir desde PC en Shorts ya publicados."
            },
            {
                "heading": "5. Preparación técnica: dimensiones y compresión",
                "body": "Para una visualización nítida, prepara tu imagen a 1280 × 720 (16:9) usando el Redimensionador de Miniaturas de Creovly. Asegúrate de que pese menos de 2 MB con nuestro Compresor de Miniaturas para evitar errores de subida en móviles.",
                "keyTakeaway": "Configura las miniaturas en 1280 × 720 y comprímelas por debajo de 2 MB antes de subirlas."
            }
        ],
        "workedExample": {
            "title": "Sustitución de una miniatura con bajo rendimiento para subir el CTR",
            "scenario": "Un creador nota que un vídeo publicado hace 48 horas tiene un CTR bajo del 2,1%. Diseña una miniatura con mayor contraste y texto focal y desea cambiarla sin perder visitas ni estadísticas.",
            "steps": [
                "Preparar el archivo: Exportar la nueva miniatura en 1280 × 720 píxeles en formato JPG.",
                "Comprimir a menos de 2 MB: Pasar la imagen por el Compresor de Creovly, reduciendo el peso a 510 KB.",
                "Abrir YouTube Studio: Ir a Contenido, seleccionar el vídeo y localizar el panel de Miniatura.",
                "Efectuar el cambio: Pulsar en Opciones de la miniatura, elegir \"Cambiar\", subir la imagen y hacer clic en \"Guardar\".",
                "Supervisar resultados: Revisar el CTR en YouTube Studio Analytics en las siguientes 72 horas."
            ],
            "conclusion": "La nueva miniatura entra en vigor al instante en búsquedas y recomendaciones sin reiniciar estadísticas de visitas ni comentarios."
        },
        "checklist": [
            {
                "title": "Verificación de cuenta",
                "detail": "Confirma la verificación telefónica en las opciones de canal de YouTube Studio."
            },
            {
                "title": "Dimensiones recomendadas",
                "detail": "Ajusta la imagen a 1280 × 720 píxeles con relación 16:9."
            },
            {
                "title": "Límite de tamaño de archivo",
                "detail": "Asegura que el archivo pese menos de 2 MB para admitir subidas móviles."
            },
            {
                "title": "Formato admitido",
                "detail": "Utiliza formato JPG o PNG con perfil de color sRGB."
            },
            {
                "title": "Comprobar guardado",
                "detail": "Haz clic en Guardar y comprueba la visualización en la página pública del vídeo."
            }
        ],
        "faqs": [
            {
                "question": "¿Cómo cambiar la miniatura de un vídeo de YouTube tras publicarlo?",
                "answer": "Inicia sesión en YouTube Studio, ve a Contenido y selecciona el vídeo. En la sección Miniatura, haz clic en el menú de tres puntos, selecciona Cambiar, sube la nueva imagen y pulsa Guardar."
            },
            {
                "question": "¿Se puede cambiar la miniatura de un YouTube Short ya publicado?",
                "answer": "Actualmente no se pueden subir miniaturas personalizadas desde ordenador para Shorts publicados. El fotograma debe seleccionarse desde la app móvil durante la subida."
            },
            {
                "question": "¿Por qué no puedo subir miniaturas personalizadas en YouTube?",
                "answer": "La subida de miniaturas personalizadas requiere completar la verificación por teléfono en las funciones intermedias de YouTube Studio. Los canales sin verificar solo pueden elegir fotogramas automáticos."
            }
        ]
    },

  },

  ja: {
    'youtube-thumbnail-blueprint': {
      title: 'YouTubeサムネイルのサイズ：1280×720、2MB制限とCTRのコツ',
      category: 'ビジュアル設計',
      readTime: '読了目安 6分',
      description: 'YouTubeサムネイルのサイズは1280×720ピクセル、比率16:9、2MB未満、JPG・PNG・GIF形式。公式の制限、セーフゾーン、リサイズと圧縮の方法を解説します。',
      officialSources: [
        {
          label: 'YouTubeヘルプ：動画のサムネイルを追加する',
          description: '解像度、アスペクト比、サポート形式、アップロード容量上限に関するYouTube公式規定。',
        },
      ],
      contentSections: [
        {
          heading: '1. 2026年のYouTubeサムネイルサイズ：公式解像度とファイルサイズ上限',
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
          question: "YouTubeにおけるRPMとは何ですか？",
          answer: "YouTubeのRPM（1,000回再生あたりの収益）は、YouTubeの45%の手数料控除後に、広告、YouTube Premium、メンバーシップ、Super Chatなどのすべての収益源からクリエイターが1,000回再生あたりに得る実際の純収益を示す指標です。公式の計算式は「RPM = (推定総収益 / 総再生回数) × 1,000」です。",
        },
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
    'how-much-does-youtube-pay-per-1000-views': {
      title: 'YouTubeの1,000回再生でいくら稼げる？（2026年最新単価・相場）',
      seoTitle: 'YouTubeの1,000回再生の収益・単価',
      category: '収益化と経済',
      readTime: '読了目安 7分',
      description:
        'YouTubeの1,000回再生あたりの収益相場を解説。ジャンル別RPM、Shortsとの違い、CPMとの差、実際のクリエイター手取り計算方法を網羅。',
      officialSources: [
        {
          label: 'YouTube ヘルプ：YouTube アナリティクスの指標（RPM）',
          description:
            'クリエイターの純手取り指標であるRPM、再生回数、および収益分配に関する公式定義。',
        },
        {
          label: 'YouTube ヘルプ：YouTube パートナー プログラムの概要と収益化ポリシー',
          description:
            '広告収益の55/45分配比率、YPP参加要件、および規約に関する公式ドキュメント。',
        },
      ],
      contentSections: [
        {
          heading: '1. YouTubeの1,000回再生あたりの平均収益相場',
          body: '一般的な長編動画の場合、YouTubeの1,000回再生あたりのクリエイター手取り収益（RPM）は平均して200円〜1,500円（約2.00〜12.00ドル）程度です。動画ジャンルによってこの金額は大きく異なり、金融・投資・ビジネス・専門ソフトウェアなどの高単価分野では1,000回再生あたり2,000円〜5,000円以上（15〜35ドル以上）に達することもあります。一方、一般的なエンタメ、日常Vlog、ゲーム実況などは150円〜500円前後にとどまる傾向があります。なお、YouTube Shorts（ショート動画）はクリエイタープール方式で分配されるため単価が大幅に低く、1,000回再生あたり約3円〜10円（0.02〜0.07ドル）程度となります。',
          keyTakeaway: '長編動画の多くは1,000回あたり200円〜1,500円前後、ショート動画は3円〜10円程度が相場です。',
        },
        {
          heading: '2. CPMとRPMの違い：広告主の出稿額とクリエイターの手取り',
          body: '多くの配信者がCPM（インプレッション単価）とRPM（インプレッション収益）を混同しがちです。CPMは広告主がYouTubeに支払う1,000回表示あたりの出稿金額ですが、そこからYouTubeのプラットフォーム手数料（45%）が差し引かれます。また、広告ブロッカーの使用や再生環境により、すべての再生で広告が表示されるわけではありません。これに対しRPMは、Premium収益やメンバーシップを含め、動画全体の再生回数1,000回あたりで実際にクリエイターの口座に振り込まれる「真の手取り金額」を示します。',
          keyTakeaway: 'CPMは広告主の支払総額、RPMはクリエイターの純手取りです。YouTube StudioのRPMから二重に45%を引かないよう注意してください。',
        },
        {
          heading: '3. 1,000回再生あたりの収益単価を左右する重要要素',
          body: '主に次の5つの要因がRPMを左右します。(1) 視聴者の居住地域：広告出稿予算の潤沢な国（アメリカ、イギリス、日本など）の視聴者は、新興国の視聴者に比べて単価が数倍〜10倍高くなります。(2) コンテンツの商業的価値：購買力の高い視聴者が集まる分野（投資、ビジネス、ITツール）は広告主の入札が激化します。(3) 動画の長さとミッドロール広告：8分以上の動画は動画の途中に広告を追加できるため、1再生あたりの広告表示回数が増加します。(4) 視聴者層の年齢：可処分所得の多い20代〜50代をターゲットにすると単価が上昇します。(5) 季節要因：企業の決算やクリスマス商戦が重なる第4四半期（10〜12月）はRPMが跳ね上がります。',
          keyTakeaway: '視聴者の国籍・地域、商業性の高いテーマ、8分以上の動画構成がRPMを高める最大のレバーです。',
        },
        {
          heading: '4. ジャンル別RPM目安：金融・IT・ゲーム・Vlogの比較',
          body: '広告主の入札意欲はジャンルごとに明確な差があります：(1) 個人財務・資産運用・暗号資産：1,500円〜4,500円以上；(2) プログラミング・IT製品・SaaS：800円〜2,500円；(3) ビジネス・起業・マーケティング：900円〜3,000円；(4) 教育・ノウハウ・学習：500円〜1,300円；(5) フィットネス・健康：400円〜1,000円；(6) 暮らし・旅行・日常Vlog：200円〜600円；(7) ゲーム実況・eスポーツ：150円〜450円；(8) お笑い・バラエティ：150円〜400円。CreovlyのYouTube収益計算ツールを使うと、想定再生数に応じた手取り月収をシミュレーションできます。',
          keyTakeaway: '高額商品やビジネスに関連する専門ジャンルは、娯楽系ジャンルの5〜10倍の収益単価を誇ります。',
        },
        {
          heading: '5. 再生数ごとの収益目安：1,000回から100万回再生まで',
          body: '再生規模に応じた現実的な収益目標：1,000回再生＝200円〜1,500円（長編）／約3円〜10円（Shorts）。1万回再生＝2,000円〜15,000円（長編）／約30円〜100円（Shorts）。10万回再生＝20,000円〜150,000円（長編）／約300円〜1,000円（Shorts）。100万回再生＝200,000円〜1,500,000円以上（長編）／約3,000円〜10,000円（Shorts）。広告だけでなくスポンサー契約やメンバーシップを含めた総収益を把握するには、YouTube収益化計算ツールを活用してください。',
          keyTakeaway: '長編動画の100万回再生は20万〜150万円以上の手取りになりますが、Shortsの100万回再生は数千円〜1万円程度です。',
        },
      ],
      workedExample: {
        title: '収益比較：ITプログラミング講座 vs ゲーム実況ハイライト',
        scenario:
          '2人のクリエイターがそれぞれ12分の動画を投稿し、公開後30日間でともに25万回再生を達成しました。クリエイターAは日本のビジネスマン向けにプログラミングチュートリアルを配信し、クリエイターBは幅広い若年層向けにゲーム実況を配信しています。',
        steps: [
          'クリエイターA（IT解説）の分析：ソフトウェア広告主の高額入札によりRPMは1,200円（約9.20ドル）。総収益：(250,000 / 1,000) × 1,200円 = 300,000円。',
          'クリエイターB（ゲーム実況）の分析：若年層中心の視聴者層でRPMは280円（約2.10ドル）。総収益：(250,000 / 1,000) × 280円 = 70,000円。',
          '格差の検証：再生回数は同じ25万回でも、購入意欲の高い視聴者層をターゲットにしたクリエイターAの方が230,000円（約4.3倍）多く稼ぎました。',
        ],
        conclusion:
          '再生回数だけでなく、視聴者の購買意欲やジャンル特性が1,000回あたりの収益単価を決定づけます。',
      },
      checklist: [
        {
          title: 'YouTube Studioで過去28日間のRPMを確認',
          detail: '大まかな推測ではなく、アナリティクスの「収益」タブで実際の動画別RPM実績を確認します。',
        },
        {
          title: '動画の長さを8分以上に設定',
          detail: '自然なチャプターの切れ目にミッドロール広告を挿入できるよう、動画構成を最適化します。',
        },
        {
          title: '商業的価値の高いキーワードを取り入れる',
          detail: 'ツール比較やノウハウ解説など、スポンサー入札が活発なテーマを企画に組み込みます。',
        },
        {
          title: '長編動画とShortsの役割を分担する',
          detail: 'Shortsで新規認知を獲得し、安定した広告収益を生む長編動画へと視聴者を誘導します。',
        },
        {
          title: 'ブラウザ上で安全に収益試算を行う',
          detail: 'Creovlyの各種計算ツールを活用し、個人データを外部送信することなく目標収益を試算します。',
        },
      ],
      faqs: [
        {
          question: 'YouTubeの1,000回再生でいくら稼げますか？',
          answer:
            '一般的な長編動画では1,000回再生あたり約200円〜1,500円（2〜12ドル）程度です。金融やITなどの高単価ジャンルでは2,000円〜4,000円以上になることもあります。Shortsは約3円〜10円です。',
        },
        {
          question: 'YouTubeで100万回再生されるといくらになりますか？',
          answer:
            '長編動画の場合、100万回再生でおよそ20万円〜150万円以上の広告手取り収入になります。Shortsの場合は約3,000円〜10,000円程度にとどまります。',
        },
        {
          question: 'YouTubeのRPMとCPMの違いは何ですか？',
          answer:
            'CPMは広告主が1,000回広告表示に対して支払う総額（手数料控除前）です。RPMはYouTubeの手数料45%が引かれ、Premium収益等も含めたクリエイターの純手取り単価です。',
        },
        {
          question: 'YouTubeはすべての再生回数にお金を支払ってくれますか？',
          answer:
            'いいえ。広告が実際に配信された「収益化対象の再生」またはYouTube Premium会員による視聴のみが収益対象となります。通常、全再生の40%〜70%程度です。',
        },
        {
          question: 'YouTubeのRPM単価を上げるにはどうすればいいですか？',
          answer:
            '高単価な商業テーマ（ビジネス・金融・専門技術）を扱い、8分以上の動画でミッドロール広告を挿入し、購買力の高い大人の視聴者を増やすことが有効です。',
        },
      ],
    },
    'youtube-banner-size': {
        "title": "YouTubeバナーサイズ：推奨寸法・セーフゾーン・テンプレート",
        "seoTitle": "YouTubeバナーサイズ：寸法とセーフゾーン",
        "category": "チャンネルブランディング",
        "readTime": "読了目安 5分",
        "description": "YouTubeバナー推奨サイズ公式解説：2560×1440解像度、スマホ・PC共通の中央セーフゾーン1235×338、ファイル容量6MB制限とテンプレート。",
        "officialSources": [
            {
                "label": "YouTube ヘルプ: チャンネルのブランディングの管理",
                "description": "バナー画像の推奨サイズ、テキストやロゴの最小セーフエリア、対応ファイル形式、アップロード容量制限に関する公式仕様。"
            }
        ],
        "contentSections": [
            {
                "heading": "1. 推奨YouTubeバナーサイズと寸法：2560×1440",
                "body": "YouTube公式仕様によると、チャンネルヘッダーの標準バナーサイズは2560 × 1440ピクセル（アスペクト比16:9）です。アップロード可能な最小解像度は2048 × 1152ピクセルです。2560 × 1440のフル解像度で作成することで、高解像度ディスプレイや4KスマートTVでも粗くならず鮮明に表示されます。",
                "keyTakeaway": "2560 × 1440（16:9）のキャンバスサイズで作成し、最低2048 × 1152ピクセル以上を確保します。"
            },
            {
                "heading": "2. テキストとロゴの中央セーフエリア：1235×338",
                "body": "YouTubeはスマホ、タブレット、PC、テレビなど多様な機器で閲覧されるため、機器に応じてバナーの外側が切り取られます。チャンネル名、キャッチコピー、アイコン、顔写真などの重要要素が見切れないよう、中央の1235 × 338ピクセルのセーフエリア内に配置してください。",
                "keyTakeaway": "重要な文字、ロゴ、デザイン要素は中央1235 × 338ピクセルのセーフゾーン内に収めます。"
            },
            {
                "heading": "3. 最大ファイル容量と対応画像形式：6MB以下",
                "body": "YouTubeバナーのファイル容量制限は最大6MBです。対応形式はJPG、PNG、BMP、静止GIFです。写真主体のヘッダー画像には最適化されたJPEG、ロゴや文字主体のデザインにはエッジがにじまないPNGが推奨されます。",
                "keyTakeaway": "ファイルサイズを6MB以下に抑え、JPGまたはPNG形式で書き出してください。"
            },
            {
                "heading": "4. Creovlyのリサイズツールでバナーを整える",
                "body": "CreovlyのYouTubeサムネイルリサイズツールを使えば、バナーの切り取り枠をリアルタイムでシミュレーションできます。2560 × 1440プリセットには1235 × 338のセーフエリア枠が表示され、アップロード前に見切れをチェックできます。",
                "keyTakeaway": "リサイズツールの2560 × 1440プリセットを活用して、スマホとPCでの見え方を確認します。"
            }
        ],
        "workedExample": {
            "title": "スマホ表示での見切れを防ぐ中央セーフゾーン配置",
            "scenario": "2560×1440でバナーを作成したクリエイターが、スマホアプリで確認したところ、ロゴと更新スケジュールが左右で見切れてしまっていた事例。",
            "steps": [
                "スマホの切り取り範囲を確認：スマホ版YouTubeアプリでは中央の1235 × 338ピクセルのみが表示されます。",
                "文字とロゴを中央へ移動：チャンネルロゴや告知テキストを中央1235 × 338の枠内に再配置します。",
                "キャンバス全体に背景を配置：テレビ画面で全体が見えるよう、背景のテクスチャやグラデーションは2560 × 1440全体に拡張します。",
                "6MB以下に圧縮：Creovlyの圧縮ツールで品質を保ったまま容量を6MB以下に落とします。"
            ],
            "conclusion": "スマホでも文字やロゴが欠けず、PCやテレビでは迫力あるフル画面ヘッダーとして表示されるようになりました。"
        },
        "checklist": [
            {
                "title": "マスターキャンバス解像度",
                "detail": "2560 × 1440ピクセル（最小2048 × 1152）で設定。"
            },
            {
                "title": "中央セーフエリアの遵守",
                "detail": "文字やロゴを中央の1235 × 338ピクセル内に配置。"
            },
            {
                "title": "ファイル容量6MB上限",
                "detail": "書き出し画像が確実に6MB以下であることを確認。"
            },
            {
                "title": "実機での複数デバイス確認",
                "detail": "公開後にYouTubeアプリとPCブラウザの双方で表示を確認。"
            }
        ],
        "faqs": [
            {
                "question": "YouTubeバナーの推奨サイズは何ピクセルですか？",
                "answer": "公式の推奨サイズは2560 × 1440ピクセル（アスペクト比16:9）、最小アップロードサイズは2048 × 1152ピクセルです。"
            },
            {
                "question": "YouTubeバナーのセーフエリアとは？",
                "answer": "セーフエリアとは、中央の1235 × 338ピクセルの領域です。この中に配置された文字やロゴは、スマホ、タブレット、PC、テレビの全端末で確実に表示されます。"
            },
            {
                "question": "YouTubeバナーの最大ファイル容量は？",
                "answer": "最大ファイル容量は6MBです。JPG、PNG、BMP、非アニメーションGIF形式に対応しています。"
            }
        ]
    },
    'youtube-monetization-requirements': {
        "title": "YouTube収益化条件の完全解説（登録者数・総再生時間・Shorts）",
        "seoTitle": "YouTube収益化条件の解説",
        "category": "収益化",
        "readTime": "読了目安 7分",
        "description": "YouTubeパートナープログラム(YPP)の収益化条件を分かりやすく解説：500人＆1,000人の登録者基準、4,000時間、Shorts1,000万回再生、審査ポリシー。",
        "officialSources": [
            {
                "label": "YouTube ヘルプ: YouTube パートナー プログラムの概要と利用資格",
                "description": "YPP参加要件、チャンネル収益化基準、登録者数・総再生時間マイルストーンに関する公式案内。"
            },
            {
                "label": "YouTube ヘルプ: YouTube ショートで収益を得る",
                "description": "縦型動画ショートフィード広告のクリエイタープール分配に関する公式基準。"
            }
        ],
        "contentSections": [
            {
                "heading": "1. YouTubeパートナープログラム（YPP）の2つの参加基準",
                "body": "YouTubeには2段階の収益化基準があります。第1段階（ファンファンディング早期解放）では、Super Thanks、Super Chat、メンバーシップ、YouTubeショッピングが利用可能になります。条件は「チャンネル登録者500人」「過去90日間で公開動画3本以上」「過去12か月で有効な公開再生時間3,000時間、または過去90日間でショート1,000万回再生」です。第2段階（広告収益の完全解放）では、長編動画とショートフィードの広告収益を受け取れるようになります。条件は「登録者1,000人」かつ「公開再生時間4,000時間またはショート1,000万回再生」です。",
                "keyTakeaway": "登録者500人・3,000時間で投げ銭機能が解放され、広告収益分配には登録者1,000人・4,000時間が必要です。"
            },
            {
                "heading": "2. カウント対象となる有効な公開再生時間と対象外の時間",
                "body": "4,000時間の基準にカウントされるのは、長編動画の「有効な公開総再生時間」のみです。Shortsフィードでの再生時間は4,000時間にはカウントされません（Shortsは90日間で1,000万回再生の別枠で判定されます）。また、非公開動画、限定公開動画、削除済み動画、Google広告キャンペーンによる再生時間も対象外です。",
                "keyTakeaway": "過去365日間のローリング期間内に、オーガニックに再生された公開長編動画の時間のみが加算されます。"
            },
            {
                "heading": "3. アカウントセキュリティと規約遵守の必須前提条件",
                "body": "登録者数や再生時間に加え、Googleアカウントの「2段階認証プロセスの有効化」、有効な「Google AdSenseアカウントのリンク」、およびチャンネルに「コミュニティガイドラインの有効な警告がないこと」が必須条件です。",
                "keyTakeaway": "2段階認証をオンにし、AdSenseを連携させ、ガイドライン違反の警告を受けない健全な運営を維持してください。"
            },
            {
                "heading": "4. Creovlyの計算ツールで収益化進捗をシミュレーション",
                "body": "平均視聴維持時間に基づいて4,000時間達成までの期間をCreovlyの「YouTube総再生時間計算ツール」で試算できます。また、広告やメンバーシップの推定月収は「YouTube収益計算ツール」でモデル化できます。",
                "keyTakeaway": "感覚値ではなく計算ツールを用いて、必要な投稿頻度と再生ペースを逆算しましょう。"
            }
        ],
        "workedExample": {
            "title": "公開再生時間4,000時間達成に向けた投稿計画シミュレーション",
            "scenario": "現在登録者850人、総再生時間2,400時間のクリエイター。12か月のローリング期限切れで古い時間が消える前に、残り1,600時間を達成するための必要再生数を算出する事例。",
            "steps": [
                "残り時間を計算：目標4,000時間 − 現在2,400時間 = 残り1,600時間。",
                "必要再生回数を逆算：平均視聴時間4分の場合、1再生あたり0.067時間。1,600 ÷ 0.067 = 約24,000回の総再生数が必要。",
                "週間投稿ペースを設定：平均2,000再生の動画を週2本投稿すれば、月間16,000再生（約1,067時間）を蓄積可能。",
                "アカウントの前提条件確認：2段階認証が有効でコミュニティ警告が0件であることをStudioで確認。"
            ],
            "conclusion": "このペースを維持すれば約6〜7週間で4,000時間に到達し、YPP広告収益化の申請資格を満たすことができます。"
        },
        "checklist": [
            {
                "title": "チャンネル登録者基準",
                "detail": "500人（ファン支援）または1,000人（広告収益）を達成。"
            },
            {
                "title": "再生時間またはShorts再生数",
                "detail": "直近12か月で4,000時間、または直近90日でShorts 1,000万回再生。"
            },
            {
                "title": "2段階認証の有効化",
                "detail": "Googleアカウントで2段階認証プロセスを設定。"
            },
            {
                "title": "Google AdSense連携",
                "detail": "収益受け取り用の有効なAdSenseアカウントをリンク。"
            },
            {
                "title": "コミュニティガイドライン違反なし",
                "detail": "チャンネルに有効な警告が1件もないことを確認。"
            }
        ],
        "faqs": [
            {
                "question": "YouTubeの収益化条件は何ですか？",
                "answer": "広告収益を得るには「チャンネル登録者1,000人」と「過去12か月間で4,000時間の公開総再生時間（または過去90日間でショート1,000万回再生）」が必要です。登録者500人・3,000時間でのファン支援早期アクセスも存在します。"
            },
            {
                "question": "YouTubeショートの再生時間は4,000時間に含まれますか？",
                "answer": "いいえ、ショートフィードでの再生時間は4,000時間には含まれません。ショートは「90日間で1,000万回再生」という独立した条件枠で判定されます。"
            },
            {
                "question": "4,000時間はいつからいつまでの期間で計算されますか？",
                "answer": "常に「直近365日間」のローリング期間で計算されます。365日より前の過去の再生時間は順次カウント対象から外れていきます。"
            }
        ]
    },
    'how-to-change-youtube-thumbnail': {
        "title": "YouTubeサムネイルの変更方法・設定手順（PC＆スマホ対応）",
        "seoTitle": "YouTubeサムネイル変更方法（ステップ解説）",
        "category": "ビジュアルパッケージング",
        "readTime": "読了目安 5分",
        "description": "YouTubeサムネイルの変更・設定手順を初心者向けに解説：PC版YouTube Studio、スマホアプリ、電話番号認証によるカスタムサムネイル解放、Shortsの仕様。",
        "officialSources": [
            {
                "label": "YouTube ヘルプ: 動画のサムネイルの追加と変更",
                "description": "PCおよびモバイルでのカスタムサムネイルのアップロード、変更、選択に関する公式ヘルプ。"
            }
        ],
        "contentSections": [
            {
                "heading": "1. 電話番号認証：カスタムサムネイル機能の解放",
                "body": "自作のカスタムサムネイルを設定するには、チャンネルの「電話番号確認（中級機能）」が完了している必要があります。未認証の場合、動画から自動抽出された3枚のスチル画像からしか選べません。YouTube Studioの「設定」>「チャンネル」>「機能の利用資格」からSMS認証を完了させてください。",
                "keyTakeaway": "YouTube Studioのチャンネル設定から電話番号認証を済ませることで、自作サムネイルのアップロードが解放されます。"
            },
            {
                "heading": "2. パソコン（YouTube Studio）でサムネイルを変更する手順",
                "body": "PCから変更する場合、YouTube Studioにログインし、左メニューの「コンテンツ」をクリックして対象動画を選択します。「動画の詳細」画面の「サムネイル」欄にマウスを合わせ、縦の3点リーダーアイコンから「変更」をクリックし、新しい1280×720画像を選択して右上の「保存」を押します。",
                "keyTakeaway": "YouTube Studio > コンテンツ > 動画の詳細画面で、サムネイル枠の3点メニューから「変更」を選択します。"
            },
            {
                "heading": "3. スマホアプリ（YouTube Studio）でサムネイルを変更する手順",
                "body": "iOSまたはAndroidの「YouTube Studioアプリ」を開きます。「コンテンツ」から該当動画をタップし、画面上部の鉛筆アイコン（編集）を押します。さらにサムネイル左上の鉛筆アイコンをタップし、「変更」からスマホ内の画像を選択して「完了」>「保存」をタップします。スマホからのアップロードは2MB制限が厳格に適用されます。",
                "keyTakeaway": "スマホのYouTube Studioアプリで鉛筆アイコンをタップすれば、外出先でもサムネイルを差し替え可能です。"
            },
            {
                "heading": "4. YouTubeショート動画のサムネイル変更・指定方法",
                "body": "YouTube Shortsは通常の動画と仕様が異なります。現在、公開済みのショート動画に対してPCからカスタム画像を差し替えることはできません。スマホアプリからの初回動画アップロード時に、動画プレビュー上の鉛筆アイコンをタップしてベストなコマ（フレーム）を指定する必要があります。",
                "keyTakeaway": "ショート動画のサムネイルは初回アップロード時にアプリ内で指定します（公開後のPC差し替えは現在非対応）。"
            },
            {
                "heading": "5. 技術仕様：解像度1280×720とファイル容量2MBの事前準備",
                "body": "高画質な表示のために、Creovlyのサムネイルリサイズツールで1280 × 720（16:9）に整え、Creovlyのサムネイル圧縮ツールで2MB以下に圧縮してからアップロードしてください。モバイルアプリでのアップロード失敗を防げます。",
                "keyTakeaway": "1280 × 720ピクセルにリサイズし、2MB以下に圧縮してからアップロードするのが鉄則です。"
            }
        ],
        "workedExample": {
            "title": "クリック率向上のための不振サムネイル差し替え実践例",
            "scenario": "公開後48時間のクリック率が2.1%と低迷していたため、コントラストを高め文字フックを強調した新サムネイルを作成し、再生数やコメントをリセットせずに差し替える事例。",
            "steps": [
                "新画像の作成・書き出し：1280 × 720ピクセル、JPG形式で新サムネイルを書き出し。",
                "2MB以下に圧縮：Creovly圧縮ツールに通し、画質を保ちながらファイル容量を510KBに軽量化。",
                "YouTube Studioを開く：コンテンツ一覧から対象動画を選択し、サムネイルパネルを表示。",
                "差し替えを実行：3点メニューから「変更」を選んで新画像をアップロードし、「保存」をクリック。",
                "効果測定：差し替え後72時間の「インプレッションのクリック率」の変化をStudioアナリティクスで追跡。"
            ],
            "conclusion": "動画の再生回数やコメント、URLを一切損なうことなく、検索やおすすめ欄の表示が即座に新サムネイルに更新されました。"
        },
        "checklist": [
            {
                "title": "チャンネル電話確認の完了",
                "detail": "YouTube Studioの中級機能で電話番号確認が完了していることを確認。"
            },
            {
                "title": "1280×720解像度（16:9）",
                "detail": "サムネイル画像が公式推奨の16:9比率になっているか確認。"
            },
            {
                "title": "ファイル容量2MB以下",
                "detail": "スマホ Studioでのアップロードを想定し、2MB以下に圧縮。"
            },
            {
                "title": "カラープロファイルsRGB",
                "detail": "ブラウザでの色化けを防ぐためsRGBプロファイルのJPGまたはPNGを使用。"
            },
            {
                "title": "保存後の実機表示確認",
                "detail": "保存後に公開動画ページを開き、サムネイルが更新されていることを確認。"
            }
        ],
        "faqs": [
            {
                "question": "公開済みの動画のサムネイルは後から変更できますか？",
                "answer": "はい、いつでも変更可能です。YouTube Studioの動画詳細画面からサムネイル右上の3点メニューをクリックし、「変更」を選んで新しい画像をアップロードして保存するだけです。"
            },
            {
                "question": "公開後のYouTubeショートのサムネイルは変更できますか？",
                "answer": "現在のところ、一度公開されたYouTubeショートのサムネイルをPCからカスタム画像に変更することはできません。アップロード時にスマホアプリ上でフレームを選択する必要があります。"
            },
            {
                "question": "カスタムサムネイルがアップロードできない原因は？",
                "answer": "アカウントの電話番号確認（中級機能）が完了していない場合、自作サムネイルはアップロードできません。また、ファイルサイズが上限（モバイル2MB、PC 50MB）を超えている場合もエラーになります。"
            }
        ]
    },

  },

  fr: {
    'youtube-thumbnail-blueprint': {
      title: 'Taille de miniature YouTube : 1280×720, limite de 2 Mo et CTR',
      seoTitle: 'Miniatures YouTube : dimensions, limites et CTR',
      category: 'Packaging visuel',
      readTime: '6 min de lecture',
      description: 'La taille d’une miniature YouTube est de 1280×720 pixels en 16:9, sous 2 Mo, au format JPG, PNG ou GIF. Limites officielles, zones de sécurité, redimensionnement et compression.',
      officialSources: [
        {
          label: 'Aide YouTube : Ajouter des miniatures vidéo',
          description: 'Spécifications officielles de YouTube pour la résolution, le format d’image et les limites de taille.',
        },
      ],
      contentSections: [
        {
          heading: '1. Taille de miniature YouTube en 2026 : dimensions officielles et poids maximal',
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
          question: "Qu'est-ce que le RPM sur YouTube ?",
          answer: "Le RPM (Revenu pour mille vues) sur YouTube mesure les revenus nets réels qu'un créateur gagne pour 1 000 vues totales, toutes sources de monétisation confondues (annonces, YouTube Premium, souscriptions, Super Chat), après la déduction des 45% de YouTube. La formule officielle est : RPM = (Revenu total estimé / Vues totales) × 1 000.",
        },
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
    'how-much-does-youtube-pay-per-1000-views': {
      title: 'Combien Paye YouTube Pour 1 000 Vues ? (Tarifs et Rémunération 2026)',
      seoTitle: 'Combien Paye YouTube Pour 1 000 Vues ?',
      category: 'Monétisation et Économie',
      readTime: '7 min de lecture',
      description:
        'Découvrez combien paye YouTube pour 1 000 vues selon la thématique, vidéos longues vs Shorts, RPM net et comment calculer vos revenus de créateur.',
      officialSources: [
        {
          label: 'Aide YouTube : Comprendre les statistiques YouTube Analytics (RPM)',
          description:
            'Définition officielle du RPM créateur, lectures monétisées et calcul des revenus nets.',
        },
        {
          label: 'Aide YouTube : Présentation et règles du Programme Partenaire YouTube',
          description:
            'Documentation officielle sur le partage des revenus publicitaires, critères d’éligibilité et répartition 55/45.',
        },
      ],
      contentSections: [
        {
          heading: '1. Combien paye YouTube pour 1 000 vues en moyenne ?',
          body: 'En moyenne, YouTube verse aux créateurs entre 2,00 € et 12,00 € pour 1 000 vues sur les vidéos longues standards dans les pays occidentaux à fort pouvoir d’achat (France, États-Unis, Canada, Allemagne, Royaume-Uni). Cet indicateur est appelé le RPM net (Revenu Pour Mille vues). Ces gains oscillent fortement selon le sujet : les secteurs commerciaux comme la finance personnelle, l’investissement ou les logiciels professionnels atteignent des RPM de 15,00 € à plus de 35,00 € par tranche de 1 000 vues. À l’inverse, le divertissement généraliste, les vlogs et le gaming génèrent plutôt entre 1,50 € et 4,50 €. Sur les YouTube Shorts, le modèle de fonds partagé offre des tarifs nettement inférieurs, compris entre 0,02 € et 0,07 € pour 1 000 vues.',
          keyTakeaway: 'La majorité des vidéos longues rapportent entre 2 € et 12 € pour 1 000 vues, contre seulement 0,02 € à 0,07 € sur les Shorts.',
        },
        {
          heading: '2. CPM vs RPM : pourquoi les marques dépensent plus que vous ne touchez',
          body: 'Beaucoup de vidéastes confondent le CPM (Coût Pour Mille) de l’annonceur avec le RPM (Revenu Pour Mille) du créateur. Le CPM représente ce qu’une entreprise paye à YouTube pour 1 000 impressions de sa publicité. Vous ne touchez pas l’intégralité de cette somme : d’une part, YouTube prélève 45 % de commission sur les annonces vidéo. D’autre part, chaque vue n’affiche pas systématiquement de pub (adblockers, limitations d’inventaire régional). Le RPM mesure ce qui arrive réellement sur votre compte bancaire pour 1 000 vues de vidéo, incluant également YouTube Premium et les souscriptions. Notre Calculateur de RPM YouTube vous permet de calculer ce revenu net exact.',
          keyTakeaway: 'Le CPM est la dépense brute de l’annonceur ; le RPM est votre rémunération nette pour 1 000 vues totales. Ne retranchez pas 45 % deux fois.',
        },
        {
          heading: '3. Les critères qui déterminent votre rémunération pour 1 000 vues',
          body: 'Cinq critères majeurs fixent votre RPM : (1) La zone géographique de votre audience : des spectateurs situés en France, en Suisse ou aux États-Unis rapportent jusqu’à 10 fois plus que des vues issues de pays émergents. (2) La thématique et l’intention d’achat : les sujets financiers ou B2B attirent des enchères d’annonceurs très agressives. (3) La durée de la vidéo : au-delà de 8 minutes, vous pouvez placer des annonces mid-roll au cours du visionnage. (4) L’âge des spectateurs : les 25–54 ans disposant d’un pouvoir d’achat élevé valorisent les espaces publicitaires. (5) La saisonnalité : au 4e trimestre (octobre à décembre), les budgets publicitaires doublent souvent les tarifs par rapport à janvier.',
          keyTakeaway: 'L’origine géographique, la valeur commerciale du sujet et des vidéos de plus de 8 minutes maximisent votre rémunération pour 1 000 vues.',
        },
        {
          heading: '4. Grille de rémunération par thématique : finance, tech, gaming et vlogs',
          body: 'Les enchères publicitaires diffèrent de manière spectaculaire selon la catégorie : (1) Finance personnelle, crypto et investissement : 12,00 € à 35,00 €+ ; (2) Tech, tutoriels informatiques et code : 6,00 € à 18,00 € ; (3) Entrepreneuriat et marketing digital : 7,00 € à 22,00 € ; (4) Éducation et développement personnel : 4,00 € à 10,00 € ; (5) Santé et musculation : 3,00 € à 8,00 € ; (6) Vlogs, voyages et style de vie : 1,80 € à 4,50 € ; (7) Gaming et jeux vidéo : 1,20 € à 3,50 € ; (8) Humour et sketchs : 1,20 € à 3,00 €. Vous pouvez estimer vos gains potentiels avec notre Calculateur d’Argent YouTube.',
          keyTakeaway: 'Les contenus à forte valeur marchande rapportent 5 à 10 fois plus par vue que le divertissement grand public.',
        },
        {
          heading: '5. Projeter vos revenus : de 1 000 à 1 000 000 de vues',
          body: 'Calculer la progression financière permet de fixer des objectifs réalistes : 1 000 vues = 2,00 € à 12,00 € (longs) ou 0,02 € à 0,07 € (Shorts). 10 000 vues = 20,00 € à 120,00 € (longs) ou 0,20 € à 0,70 € (Shorts). 100 000 vues = 200,00 € à 1 200,00 € (longs) ou 2,00 € à 7,00 € (Shorts). 1 000 000 de vues = 2 000,00 € à 12 000,00 €+ (longs) ou 20,00 € à 70,00 € (Shorts). Pour intégrer l’ensemble de vos sources de revenus (sponsors, affiliations, abonnements), utilisez le Calculateur de Monétisation YouTube.',
          keyTakeaway: '1 million de vues sur des vidéos longues rapporte généralement 2 000 € à 12 000 €+, contre seulement 20 € à 70 € pour 1 million de Shorts.',
        },
      ],
      workedExample: {
        title: 'Comparaison de revenus : Tutoriel de programmation vs Vidéo gaming',
        scenario:
          'Deux créateurs publient chacun une vidéo de 12 minutes cumulant exactement 250 000 vues en 30 jours. Le créateur A produit des tutoriels de code pour des développeurs. Le créateur B publie des temps forts de jeux vidéo destinés à une large audience jeune.',
        steps: [
          'Analyse du créateur A (Tutoriel code) : La forte demande des annonceurs de logiciels offre un RPM net de 9,20 €. Rémunération : (250 000 / 1 000) × 9,20 € = 2 300,00 €.',
          'Analyse du créateur B (Gaming) : Un public plus jeune et des annonces génériques génèrent un RPM de 2,10 €. Rémunération : (250 000 / 1 000) × 2,10 € = 525,00 €.',
          'Comparaison de l’écart : Pour un nombre de vues parfaitement égal (250 000 vues), le créateur A a généré 1 775,00 € de plus (soit 4,3 fois plus de revenus) grâce à l’intention d’achat de son audience.',
        ],
        conclusion:
          'Le volume de vues n’est que la moitié de l’équation : le profil économique du public et le sujet multiplient votre rémunération par mille vues.',
      },
      checklist: [
        {
          title: 'Vérifier le RPM dans YouTube Studio',
          detail: 'Consultez YouTube Studio > Données d’analyse > Revenus pour relever votre RPM net sur 28 jours plutôt que des estimations externes.',
        },
        {
          title: 'Allonger les vidéos au-delà de 8 minutes',
          detail: 'Structurez vos contenus longs pour activer l’insertion manuelle d’annonces intermédiaires au cours de la vidéo.',
        },
        {
          title: 'Cibler des mots-clés à forte valeur commerciale',
          detail: 'Traitez d’outils, de logiciels et de guides pratiques attirant des marques prêtes à enchérir lourdement.',
        },
        {
          title: 'Articuler Shorts et vidéos longues',
          detail: 'Utilisez la viralité des Shorts pour acquérir des abonnés, puis convertissez-les en spectateurs de vidéos longues pour un revenu pérenne.',
        },
        {
          title: 'Modéliser vos objectifs en local',
          detail: 'Utilisez les calculateurs gratuits de Creovly pour simuler vos prévisions financières sans partager vos données privées en ligne.',
        },
      ],
      faqs: [
        {
          question: 'Combien paye YouTube pour 1 000 vues ?',
          answer:
            'En moyenne, les créateurs touchent entre 2,00 € et 12,00 € pour 1 000 vues sur des vidéos longues dans les pays francophones et occidentaux. Les niches comme la finance peuvent dépasser 20,00 €, tandis que les Shorts payent entre 0,02 € et 0,07 €.',
        },
        {
          question: 'Combien rapporte 1 million de vues sur YouTube ?',
          answer:
            'Un million de vues sur une vidéo longue rapporte en général entre 2 000 € et 12 000 € net. En finance ou tech, ce montant peut dépasser 20 000 €. Sur les Shorts, 1 million de vues ne rapporte qu’environ 20 € à 70 €.',
        },
        {
          question: 'Quelle est la différence entre CPM et RPM sur YouTube ?',
          answer:
            'Le CPM est le tarif brut payé par l’annonceur avant la commission de 45 % de YouTube. Le RPM est votre gain net par tranche de 1 000 vues globales, commissions déduites et abonnements Premium inclus.',
        },
        {
          question: 'Est-ce que YouTube rémunère absolument chaque vue ?',
          answer:
            'Non. Seules les lectures ayant effectivement diffusé une publicité ou ayant été visionnées par un abonné YouTube Premium sont rémunérées, soit environ 40 % à 70 % des vues totales.',
        },
        {
          question: 'Comment augmenter son RPM sur YouTube ?',
          answer:
            'Vous pouvez augmenter votre RPM en abordant des sujets professionnels ou financiers, en réalisant des vidéos de plus de 8 minutes avec des coupures publicitaires bien placées et en ciblant des pays à fort pouvoir d’achat.',
        },
      ],
    },
    'youtube-banner-size': {
        "title": "Taille Bannière YouTube : Dimensions, Zone Sécurisée & Modèle",
        "seoTitle": "Taille Bannière YouTube : Dimensions & Gabarit",
        "category": "Image de marque",
        "readTime": "5 min de lecture",
        "description": "Guide vérifié de la taille de bannière YouTube : résolution 2560×1440, zone sécurisée centrale 1235×338 pour mobile et ordinateur, limite de 6 Mo et modèles.",
        "officialSources": [
            {
                "label": "Aide YouTube : Gérer les éléments de branding de votre chaîne",
                "description": "Spécifications officielles pour les dimensions de bannière, la zone sécurisée centrale pour textes et logos, les formats compatibles et la limite de poids."
            }
        ],
        "contentSections": [
            {
                "heading": "1. Dimensions recommandées pour la bannière YouTube : 2560×1440",
                "body": "Selon les normes officielles de YouTube, la taille idéale d’une bannière de chaîne est de 2560 × 1440 pixels avec un ratio 16:9. La dimension minimale d’importation est de 2048 × 1152 pixels. Importer votre visuel à 2560 × 1440 garantit une netteté irréprochable sur les écrans haute densité et les téléviseurs 4K sans pixelisation.",
                "keyTakeaway": "Créez votre visuel sur un canevas de 2560 × 1440 (16:9) avec un minimum de 2048 × 1152 pixels."
            },
            {
                "heading": "2. Zone sécurisée centrale pour textes et logos : 1235×338",
                "body": "YouTube affiche votre bannière sur smartphones, tablettes, ordinateurs et téléviseurs. L’image est rognée selon l’appareil. Pour éviter que le nom de votre chaîne, votre slogan ou votre visage ne soient coupés, placez tous les éléments essentiels dans la zone centrale sécurisée de 1235 × 338 pixels.",
                "keyTakeaway": "Concentrez tous les textes, logos et éléments graphiques majeurs dans le rectangle central de 1235 × 338 pixels."
            },
            {
                "heading": "3. Taille maximale de fichier et formats compatibles",
                "body": "YouTube impose un plafond strict de 6 Mo pour les bannières. Les formats acceptés sont le JPG, le PNG, le BMP et le GIF non animé. Pour les photographies, un JPEG optimisé offre le meilleur compromis poids/qualité. Pour les graphismes épurés et typographies, préférez le PNG.",
                "keyTakeaway": "Maintenez vos fichiers sous la barre des 6 Mo en format JPG ou PNG pour un enregistrement sans erreur."
            },
            {
                "heading": "4. Formatez votre bannière avec l’outil de redimensionnement Creovly",
                "body": "Testez le cadrage de votre bannière grâce au Redimensionneur de Miniatures YouTube de Creovly. Le préréglage bannière 2560 × 1440 intègre une grille visuelle affichant la zone sécurisée 1235 × 338 pour valider votre mise en page avant publication.",
                "keyTakeaway": "Utilisez le préréglage 2560 × 1440 pour prévisualiser les bordures de rognage mobile et bureau."
            }
        ],
        "workedExample": {
            "title": "Centrage de la bannière pour éviter la troncature sur smartphone",
            "scenario": "Un créateur conçoit une bannière 2560×1440. Sur mobile, son logo et son calendrier de publication sont coupés car ils ont été positionnés trop près des bords extérieurs.",
            "steps": [
                "Identifier la fenêtre mobile : L’application mobile YouTube n’affiche que la bande centrale de 1235 × 338 pixels.",
                "Recentrer les éléments clés : Déplacer le logo et les textes dans la zone centrale de 1235 × 338.",
                "Conserver un arrière-plan complet : Étendre les textures et visuels sur la totalité des 2560 × 1440 pour l’affichage TV.",
                "Compresser sous 6 Mo : Exporter l’image en JPEG optimisé à moins de 6 Mo avec les outils Creovly."
            ],
            "conclusion": "La bannière présente des textes parfaitement lisibles sur smartphone tout en s’adaptant magnifiquement aux écrans de PC et téléviseurs."
        },
        "checklist": [
            {
                "title": "Résolution du canevas maître",
                "detail": "2560 × 1440 pixels (minimum 2048 × 1152 pixels)."
            },
            {
                "title": "Zone sécurisée centrale",
                "detail": "Textes et logos strictement contenus dans les 1235 × 338 pixels centraux."
            },
            {
                "title": "Poids du fichier sous 6 Mo",
                "detail": "Exportez en JPG ou PNG en vérifiant la taille du fichier."
            },
            {
                "title": "Validation multi-appareils",
                "detail": "Vérifiez le rendu final sur l’application mobile et le site web YouTube."
            }
        ],
        "faqs": [
            {
                "question": "Quelle est la taille recommandée pour une bannière YouTube ?",
                "answer": "La dimension officielle recommandée est de 2560 × 1440 pixels avec un ratio 16:9 et un minimum de 2048 × 1152 pixels."
            },
            {
                "question": "Qu’est-ce que la zone sécurisée d’une bannière YouTube ?",
                "answer": "La zone sécurisée est le rectangle central de 1235 × 338 pixels centré verticalement et horizontalement. Tout élément situé dans cette zone reste visible sur tous les écrans (mobiles, tablettes, ordinateurs, téléviseurs)."
            },
            {
                "question": "Quel est le poids maximal autorisé pour une bannière YouTube ?",
                "answer": "Le fichier ne doit pas dépasser 6 Mo et doit être au format JPG, PNG, BMP ou GIF non animé."
            }
        ]
    },
    'youtube-monetization-requirements': {
        "title": "Conditions de Monétisation YouTube Expliquées",
        "seoTitle": "Conditions de Monétisation YouTube Expliquées",
        "category": "Monétisation",
        "readTime": "7 min de lecture",
        "description": "Synthèse claire des critères d’éligibilité à la monétisation YouTube : paliers 500 et 1 000 abonnés, 4 000 heures de visionnage, 10M de vues Shorts et règles YPP.",
        "officialSources": [
            {
                "label": "Aide YouTube : Présentation et critères d’éligibilité au Programme Partenaire YouTube",
                "description": "Critères officiels pour rejoindre le Programme Partenaire YouTube (YPP), seuils d’abonnés et d’heures, et politiques de monétisation."
            },
            {
                "label": "Aide YouTube : Monétiser des contenus YouTube Shorts",
                "description": "Règles officielles sur le partage des revenus publicitaires issus du flux Shorts."
            }
        ],
        "contentSections": [
            {
                "heading": "1. Les deux paliers du Programme Partenaire YouTube (YPP)",
                "body": "YouTube propose deux paliers d’accès à la monétisation. Le premier palier (financement par les fans) débloque les Super Thanks, Super Chat, souscriptions et YouTube Shopping. Il exige : 500 abonnés, 3 vidéos publiques récentes et 3 000 heures de visionnage sur 12 mois ou 3 millions de vues Shorts sur 90 jours. Le second palier (partage complet des recettes publicitaires) débloque les annonces sur vidéos longues et Shorts. Il requiert : 1 000 abonnés et 4 000 heures de visionnage sur 12 mois ou 10 millions de vues Shorts sur 90 jours.",
                "keyTakeaway": "Débloquez les dons dès 500 abonnés et 3 000 heures ; le partage publicitaire complet s’active à 1 000 abonnés et 4 000 heures."
            },
            {
                "heading": "2. Heures de visionnage publiques valides vs temps non comptabilisé",
                "body": "Seules les heures de visionnage publiques sur des vidéos longues sont comptabilisées pour les 4 000 heures. Le temps passé sur le flux vertical Shorts ne compte PAS pour les 4 000 heures (les Shorts disposent de leur propre critère de 10 millions de vues). Les vidéos privées, non répertoriées ou issues de campagnes Google Ads sont exclues.",
                "keyTakeaway": "Les heures doivent provenir de vidéos longues publiques vues de manière organique au cours des 365 derniers jours."
            },
            {
                "heading": "3. Sécurité du compte et respect des règles communautaires",
                "body": "Au-delà des seuils chiffrés, vous devez activer la validation en deux étapes sur votre compte Google, associer un compte Google AdSense actif et ne faire l’objet d’aucun avertissement pour non-respect des règles de la communauté.",
                "keyTakeaway": "Sécurisez votre compte en 2 étapes, reliez AdSense et maintenez un canal exempt de sanctions."
            },
            {
                "heading": "4. Suivre votre progression avec les calculateurs Creovly",
                "body": "Modélisez votre trajectoire vers les 4 000 heures grâce à notre Calculateur d’Heures de Visionnage YouTube en fonction de votre rétention moyenne. Évaluez vos futurs gains avec le Calculateur de Monétisation YouTube.",
                "keyTakeaway": "Utilisez des simulateurs dédiés pour planifier votre cadence de publication plutôt que des estimations vagues."
            }
        ],
        "workedExample": {
            "title": "Planifier la trajectoire vers le palier des 4 000 heures",
            "scenario": "Un créateur compte 850 abonnés et 2 400 heures publiques. Il souhaite calculer le volume de vues nécessaire pour boucler les 1 600 heures restantes avant l’expiration de ses heures les plus anciennes sur la fenêtre mobile de 12 mois.",
            "steps": [
                "Calculer les heures restantes : 4 000 objectif − 2 400 actuelles = 1 600 heures.",
                "Convertir en vues requises : Avec une durée moyenne de 4 minutes (0,067 h/vue), 1 600 ÷ 0,067 = 24 000 vues requises.",
                "Planifier la publication : Publier 2 vidéos par semaine à 2 000 vues en moyenne génère 16 000 vues (env. 1 067 heures) par mois.",
                "Vérifier les prérequis : Confirmer la double validation Google et l’absence d’avertissements."
            ],
            "conclusion": "À ce rythme, le créateur atteindra le palier des 4 000 heures en environ 6 à 7 semaines."
        },
        "checklist": [
            {
                "title": "Seuil d’abonnés",
                "detail": "500 abonnés (dons des fans) ou 1 000 abonnés (revenus publicitaires)."
            },
            {
                "title": "Heures ou vues Shorts",
                "detail": "4 000 heures publiques sur 12 mois ou 10 millions de vues Shorts sur 90 jours."
            },
            {
                "title": "Validation en 2 étapes",
                "detail": "Activer la validation en deux étapes sur votre compte Google."
            },
            {
                "title": "Compte Google AdSense lié",
                "detail": "Associer un compte AdSense valide pour la perception des revenus."
            },
            {
                "title": "Zéro avertissement actif",
                "detail": "Vérifier la parfaite conformité aux Règles de la Communauté."
            }
        ],
        "faqs": [
            {
                "question": "Quelles sont les conditions pour monétiser une chaîne YouTube ?",
                "answer": "Pour la monétisation publicitaire complète, vous devez réunir 1 000 abonnés et 4 000 heures de visionnage publiques sur 12 mois (ou 10 millions de vues Shorts sur 90 jours). Un palier intermédiaire pour les dons existe dès 500 abonnés et 3 000 heures."
            },
            {
                "question": "Les heures passées sur les Shorts comptent-elles pour les 4 000 heures ?",
                "answer": "Non, les heures de visionnage du flux Shorts ne sont pas comptabilisées dans le seuil des 4 000 heures. Les Shorts sont évalués uniquement sur le critère de 10 millions de vues en 90 jours."
            },
            {
                "question": "Sur quelle période les 4 000 heures sont-elles calculées ?",
                "answer": "Le calcul s’effectue sur une fenêtre glissante des 365 derniers jours consécutifs. Les heures accumulées il y a plus d’un an expirent au fil de l’eau."
            }
        ]
    },
    'how-to-change-youtube-thumbnail': {
        "title": "Comment Changer une Miniature YouTube Pas à Pas",
        "seoTitle": "Changer une Miniature YouTube (Tutoriel Pas à Pas)",
        "category": "Image de marque",
        "readTime": "5 min de lecture",
        "description": "Tutoriel complet pour changer une miniature sur YouTube : depuis YouTube Studio sur ordinateur, l’application mobile, la validation par téléphone et le cas des Shorts.",
        "officialSources": [
            {
                "label": "Aide YouTube : Ajouter ou modifier les miniatures d’une vidéo",
                "description": "Guide officiel sur l’importation, la modification et la sélection de miniatures personnalisées sur PC et mobile."
            }
        ],
        "contentSections": [
            {
                "heading": "1. Validation du compte par téléphone : débloquer les miniatures personnalisées",
                "body": "Pour importer une miniature personnalisée, votre chaîne doit être validée par numéro de téléphone. Sans cela, YouTube vous limite aux 3 images extraites automatiquement de la vidéo. Pour débloquer cette fonction, rendez-vous dans YouTube Studio > Paramètres > Chaîne > Accès aux fonctionnalités et validez les Fonctionnalités intermédiaires par SMS.",
                "keyTakeaway": "Validez votre numéro de téléphone dans YouTube Studio pour autoriser l’import de miniatures personnalisées."
            },
            {
                "heading": "2. Changer une miniature sur ordinateur dans YouTube Studio",
                "body": "Connectez-vous à YouTube Studio sur votre ordinateur. Cliquez sur \"Contenu\", sélectionnez la vidéo puis, dans la section \"Miniature\", survolez l’image actuelle, cliquez sur les 3 points verticaux et sélectionnez \"Modifier\". Choisissez votre fichier 1280 × 720 et cliquez sur \"Enregistrer\" en haut à droite.",
                "keyTakeaway": "Dans YouTube Studio > Contenu > Détails, cliquez sur les 3 points de la miniature et choisissez \"Modifier\"."
            },
            {
                "heading": "3. Changer une miniature sur l’application mobile YouTube Studio",
                "body": "Ouvrez l’application YouTube Studio sur iOS ou Android. Allez dans \"Contenu\", sélectionnez la vidéo, appuyez sur l’icône Crayon (Modifier) en haut, puis à nouveau sur le crayon en haut à gauche de la miniature. Choisissez \"Modifier\", sélectionnez votre image dans votre galerie et validez.",
                "keyTakeaway": "Appuyez sur l’icône Crayon dans l’application mobile YouTube Studio pour mettre à jour votre visuel à tout moment."
            },
            {
                "heading": "4. Sélectionner ou modifier la miniature d’un YouTube Short",
                "body": "Les Shorts fonctionnent différemment : il n’est pas possible d’importer une miniature personnalisée depuis un ordinateur pour un Short déjà publié. Vous devez obligatoirement choisir l’image clé lors de l’importation sur l’application mobile YouTube en appuyant sur le crayon sur la prévisualisation.",
                "keyTakeaway": "Choisissez votre image de Short lors de l’importation mobile ; le remplacement après publication n’est pas supporté sur PC."
            },
            {
                "heading": "5. Caractéristiques techniques : 1280×720 et moins de 2 Mo",
                "body": "Pour un rendu parfait, formatez votre visuel en 1280 × 720 pixels (ratio 16:9) avec le Redimensionneur de Miniatures Creovly. Réduisez le poids sous 2 Mo avec le Compresseur de Miniatures Creovly pour éviter tout blocage sur mobile.",
                "keyTakeaway": "Respectez le format 1280 × 720 et compressez le fichier sous 2 Mo avant importation."
            }
        ],
        "workedExample": {
            "title": "Remplacer une miniature peu performante pour dynamiser le CTR",
            "scenario": "Une vidéo publiée depuis 48 heures enregistre un faible taux de clic de 2,1%. Le créateur réalise une nouvelle miniature plus contrastée avec un texte accrocheur et souhaite la remplacer sans perdre ses vues.",
            "steps": [
                "Exporter la nouvelle image : Format 1280 × 720 en JPEG.",
                "Compresser sous 2 Mo : Utiliser le compresseur Creovly pour réduire le fichier à 510 Ko.",
                "Accéder à YouTube Studio : Ouvrir les détails de la vidéo dans l’onglet Contenu.",
                "Effectuer le remplacement : Cliquer sur le menu 3 points de la miniature, choisir \"Modifier\", importer le fichier et enregistrer.",
                "Analyser les retombées : Suivre l’évolution du taux de clic dans Analytics au cours des 72 heures suivantes."
            ],
            "conclusion": "La nouvelle miniature s’affiche immédiatement sans impacter le nombre de vues ni les commentaires existants."
        },
        "checklist": [
            {
                "title": "Validation téléphonique effectuée",
                "detail": "Valider le compte dans les fonctionnalités intermédiaires de Studio."
            },
            {
                "title": "Résolution recommandée",
                "detail": "1280 × 720 pixels avec ratio 16:9."
            },
            {
                "title": "Poids du fichier sous 2 Mo",
                "detail": "Assurer la compatibilité avec l’application Studio mobile."
            },
            {
                "title": "Format de fichier JPG/PNG",
                "detail": "Utiliser un profil sRGB pour des couleurs fidèles."
            },
            {
                "title": "Confirmation d’enregistrement",
                "detail": "Vérifier la bonne prise en compte sur la page publique de la vidéo."
            }
        ],
        "faqs": [
            {
                "question": "Peut-on changer la miniature d’une vidéo YouTube après sa mise en ligne ?",
                "answer": "Oui, à tout moment. Ouvrez YouTube Studio, accédez aux détails de la vidéo, cliquez sur les trois points de la miniature actuelle, sélectionnez Modifier, chargez le nouveau fichier et enregistrez."
            },
            {
                "question": "Peut-on modifier la miniature d’un YouTube Short déjà publié ?",
                "answer": "Non, les Shorts publiés ne permettent pas le remplacement de miniature depuis un PC. Vous devez sélectionner l’image lors de la mise en ligne initiale sur l’application mobile."
            },
            {
                "question": "Pourquoi l’importation de miniatures personnalisées m’est-elle refusée ?",
                "answer": "L’importation nécessite d’avoir validé son compte par téléphone dans les fonctionnalités intermédiaires de YouTube Studio. Les comptes non vérifiés ne peuvent choisir que des images extraites automatiquement."
            }
        ]
    },

  },

  de: {
    'youtube-thumbnail-blueprint': {
      title: 'YouTube-Thumbnail-Größe: 1280×720, 2-MB-Limit & Klickrate',
      seoTitle: 'YouTube-Thumbnails: Maße, Limits & Klickrate',
      category: 'Visuelle Gestaltung',
      readTime: '6 Min. Lesezeit',
      description: 'Die YouTube-Thumbnail-Größe beträgt 1280×720 Pixel im Format 16:9, unter 2 MB, als JPG, PNG oder GIF. Offizielle Limits, sichere Zonen sowie Verkleinern und Komprimieren.',
      officialSources: [
        {
          label: 'YouTube-Hilfe: Benutzerdefinierte Video-Thumbnails hinzufügen',
          description: 'Offizielle YouTube-Spezifikationen für Auflösung, Seitenverhältnis, unterstützte Dateiformate und Upload-Dateigrößen.',
        },
      ],
      contentSections: [
        {
          heading: '1. YouTube-Thumbnail-Größe 2026: offizielle Abmessungen und Dateigröße',
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
          question: "Was ist die RPM auf YouTube?",
          answer: "Die RPM (Revenue Per Mille / Einnahmen pro 1.000 Aufrufe) auf YouTube ist die Metrik, die angibt, wie viel Nettoeinkommen ein Creator pro 1.000 Gesamtaufrufe über alle Einnahmequellen (Werbung, YouTube Premium, Kanalmitgliedschaften, Super Chat) nach Abzug des 45%-Anteils von YouTube tatsächlich verdient. Die offizielle Formel lautet: RPM = (Geschätzte Gesamteinnahmen / Gesamtaufrufe) × 1.000.",
        },
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
    'how-much-does-youtube-pay-per-1000-views': {
      title: 'Wie Viel Zahlt YouTube Pro 1.000 Aufrufe? (Verdienst & RPM 2026)',
      seoTitle: 'Wie Viel Zahlt YouTube Pro 1.000 Aufrufe?',
      category: 'Monetarisierung & Finanzen',
      readTime: '7 Min. Lesezeit',
      description:
        'Erfahre, wie viel YouTube pro 1.000 Aufrufe zahlt: Nischen-RPM, Shorts vs. Long-Form, Unterschied zu CPM und wie du deine Einnahmen berechnest.',
      officialSources: [
        {
          label: 'YouTube-Hilfe: Metriken in YouTube Analytics verstehen (RPM)',
          description:
            'Offizielle Definition des Creator-RPMs, der monetarisierten Wiedergaben und der Netto-Auszahlungsberechnung.',
        },
        {
          label: 'YouTube-Hilfe: Übersicht über das YouTube-Partnerprogramm',
          description:
            'Offizielle Bedingungen zur Werbeumsatzbeteiligung, YPP-Zugangskriterien und der 55/45-Aufteilung.',
        },
      ],
      contentSections: [
        {
          heading: '1. Wie viel zahlt YouTube pro 1.000 Aufrufe im Durchschnitt?',
          body: 'Im Durchschnitt zahlt YouTube für Standard-Videos im Langformat in wirtschaftsstarken Märkten (wie Deutschland, Österreich, Schweiz, USA und Großbritannien) zwischen 2,00 € und 12,00 € pro 1.000 Aufrufe. Diese Kennzahl wird als Netto-RPM (Revenue Per Mille) bezeichnet. Die Einnahmen variieren stark je nach Thema: Kommerzielle Nischen wie persönliche Finanzen, B2B-Software, Immobilien und Krypto erzielen RPM-Werte von 15,00 € bis über 35,00 € pro 1.000 Views. Kanäle für allgemeine Unterhaltung, Vlogs oder Gaming bewegen sich dagegen meist zwischen 1,50 € und 4,50 €. Bei YouTube Shorts liegt die Vergütung durch das Sammelpool-Modell deutlich niedriger – typischerweise bei nur 0,02 € bis 0,07 € pro 1.000 Aufrufen.',
          keyTakeaway: 'Die meisten Langform-Kanäle erzielen 2 € bis 12 € pro 1.000 Aufrufe, während YouTube Shorts meist nur 0,02 € bis 0,07 € einbringen.',
        },
        {
          heading: '2. CPM vs. RPM: Warum Werbekunden mehr zahlen, als du erhältst',
          body: 'Viele YouTuber verwechseln den Werbekunden-CPM mit dem Creator-RPM. Der CPM ist der Betrag, den ein Werbetreibender an YouTube für 1.000 Werbeeinblendungen zahlt. Davon behält YouTube jedoch 45 % Plattformanteil ein, während der Creator 55 % erhält. Zudem wird nicht bei jedem Aufruf Werbung geschaltet (Adblocker, fehlendes Werbeinventar). Der RPM misst deine tatsächlichen Nettoeinnahmen pro 1.000 Gesamtaufrufe deines Videos – inklusive YouTube Premium-Ausschüttungen und Kanalmitgliedschaften. Mit unserem kostenlosen YouTube-RPM-Rechner ermittelst du deinen exakten Auszahlungsbetrag.',
          keyTakeaway: 'CPM sind die Brutto-Ausgaben des Werbekunden; RPM ist dein tatsächlicher Nettoverdienst pro 1.000 Gesamtaufrufe. Ziehe 45 % nicht doppelt ab.',
        },
        {
          heading: '3. Die wichtigsten Einflussfaktoren auf deine Einnahmen pro 1.000 Aufrufe',
          body: 'Fünf Hauptfaktoren bestimmen deinen RPM: (1) Geografische Lage der Zuschauer: Zuschauer aus kaufkraftstarken Ländern zahlen bis zu 10-mal höhere Werbepreise als Zuschauer aus Schwellenländern. (2) Themenbereich & Kaufabsicht: Themen mit hohem Kundenwert (Finanzen, Software, Business) lösen aggressive Werbegebote aus. (3) Videolänge & Mid-Rolls: Videos über 8 Minuten qualifizieren sich für Mid-Roll-Werbung, wodurch mehrere Werbeunterbrechungen pro Zuschauer geschaltet werden können. (4) Demografie: Ältere Zielgruppen (25–54 Jahre) mit eigenem Einkommen erzielen höhere Werbepreise als minderjährige Zuschauer. (5) Saisonalität: Im 4. Quartal (Oktober bis Dezember) verdoppeln sich Werbebudgets wegen des Weihnachtsgeschäfts oft im Vergleich zum Januar.',
          keyTakeaway: 'Zuschauerherkunft, kaufkräftige Themen und Videolängen über 8 Minuten sind die stärksten Stellschrauben für einen maximalen RPM.',
        },
        {
          heading: '4. Vergütung nach Nische: Finanzen, Tech, Gaming und Vlogs',
          body: 'Die Werbebudgets unterscheiden sich gravierend je nach Genre: (1) Finanzen, Krypto & Geldanlage: 12,00 € bis 35,00 €+; (2) Software, IT & Programmierung: 6,00 € bis 18,00 €; (3) Business & Online-Marketing: 7,00 € bis 22,00 €; (4) Bildung & Tutorials: 4,00 € bis 10,00 €; (5) Fitness & Gesundheit: 3,00 € bis 8,00 €; (6) Lifestyle, Reisen & Vlogs: 1,80 € bis 4,50 €; (7) Gaming & LetsPlays: 1,20 € bis 3,50 €; (8) Comedy & Unterhaltung: 1,20 € bis 3,00 €. Berechne verschiedene Nischen-Szenarien direkt mit unserem YouTube-Geld-Rechner.',
          keyTakeaway: 'Geschäftliche und finanzielle Themen erzielen pro Aufruf das 5- bis 10-fache von reinen Gaming- oder Unterhaltungsvideos.',
        },
        {
          heading: '5. Einnahmen hochrechnen: Von 1.000 bis 1.000.000 Aufrufen',
          body: 'Die rechnerische Skalierung verdeutlicht realistische Meilensteine: 1.000 Aufrufe bringen 2,00 € bis 12,00 € (Langformat) oder 0,02 € bis 0,07 € (Shorts). 10.000 Aufrufe bringen 20,00 € bis 120,00 € (Langformat) oder 0,20 € bis 0,70 € (Shorts). 100.000 Aufrufe bringen 200,00 € bis 1.200,00 € (Langformat) oder 2,00 € bis 7,00 € (Shorts). 1.000.000 Aufrufe bringen 2.000,00 € bis 12.000,00 €+ (Langformat) oder 20,00 € bis 70,00 € (Shorts). Wenn du auch Sponsoring, Affiliate-Links und Mitgliedschaften einbeziehen möchtest, nutze unseren YouTube-Monetarisierungsrechner.',
          keyTakeaway: '1 Million Aufrufe im Langformat bringen typischerweise 2.000 € bis über 12.000 € Nettoerlös, während 1 Million Shorts nur etwa 20 € bis 70 € erzielen.',
        },
      ],
      workedExample: {
        title: 'Verdienstvergleich: Programmier-Tutorial vs. Gaming-Highlights',
        scenario:
          'Zwei Creator veröffentlichen jeweils ein 12-minütiges Video, das innerhalb von 30 Tagen exakt 250.000 Aufrufe erzielt. Creator A betreibt einen Kanal für Programmiertutorials mit Zuschauern aus Deutschland und den USA. Creator B betreibt einen Gaming-Highlight-Kanal mit einer jüngeren, internationalen Zuschauerschaft.',
        steps: [
          'Analyse Creator A (Coding-Tutorial): Hohe Nachfrage von Softwareunternehmen führt zu einem Netto-RPM von 9,20 €. Gesamtertrag: (250.000 / 1.000) × 9,20 € = 2.300,00 €.',
          'Analyse Creator B (Gaming-Highlights): Jüngere Zielgruppe und niedrigere Gebote führen zu einem Netto-RPM von 2,10 €. Gesamtertrag: (250.000 / 1.000) × 2,10 € = 525,00 €.',
          'Vergleich des Unterschieds: Bei exakt gleicher Aufrufzahl (250.000 Views) verdiente Creator A 1.775,00 € mehr (über 4,3-mal so viel) aufgrund der Kaufkraft und Relevanz der Zielgruppe.',
        ],
        conclusion:
          'Die reine Zahl der Aufrufe ist nur die halbe Wahrheit. Die Kaufabsicht der Nische und die Herkunft der Zuschauer multiplizieren deine Einnahmen pro 1.000 Aufrufe.',
      },
      checklist: [
        {
          title: 'Echten 28-Tage-RPM im Studio prüfen',
          detail: 'Prüfe in YouTube Studio > Analytics > Einnahmen deinen tatsächlichen RPM der letzten 28 Tage statt Schätzungen aus dem Internet.',
        },
        {
          title: 'Videolänge für Mid-Roll-Werbung optimieren',
          detail: 'Erstelle Langformat-Inhalte von über 8 Minuten, um manuelle Werbeunterbrechungen an natürlichen Sprechpausen zu platzieren.',
        },
        {
          title: 'Kommerzielle Suchbegriffe einbinden',
          detail: 'Wähle Themen rund um Tools, Software, Vergleiche und Kaufberatung, die werbestarke Unternehmen anziehen.',
        },
        {
          title: 'Shorts und Langformat strategisch trennen',
          detail: 'Nutze Shorts zur Reichweitengewinnung und führe Zuschauer zu Langform-Inhalten für nachhaltige Werbeeinnahmen.',
        },
        {
          title: 'Einnahmen lokal im Browser kalkulieren',
          detail: 'Nutze die Rechner von Creovly, um deine Einkommensziele privat und ohne Cloud-Datenupload zu simulieren.',
        },
      ],
      faqs: [
        {
          question: 'Wie viel zahlt YouTube pro 1.000 Aufrufe?',
          answer:
            'Die meisten Creator verdienen bei regulären Langformat-Videos zwischen 2,00 € und 12,00 € pro 1.000 Aufrufe. In lukrativen Nischen wie Finanzen können es 20,00 € bis 35,00 €+ sein, während Shorts 0,02 € bis 0,07 € zahlen.',
        },
        {
          question: 'Wie viel verdient man mit 1 Million Aufrufen auf YouTube?',
          answer:
            'Eine Million Aufrufe eines Langvideos bringen in der Regel zwischen 2.000 € und 12.000 € Werbeeinnahmen ein. Bei Shorts sind es lediglich etwa 20 € bis 70 € pro Million Views.',
        },
        {
          question: 'Was ist der Unterschied zwischen CPM und RPM bei YouTube?',
          answer:
            'Der CPM ist der Betrag, den Werbetreibende vor Abzug des 45%-Plattformanteils von YouTube zahlen. Der RPM ist dein tatsächlicher Nettoverdienst pro 1.000 Gesamtaufrufe inklusive aller Erlösquellen.',
        },
        {
          question: 'Zahlt YouTube für jeden einzelnen Aufruf?',
          answer:
            'Nein. YouTube bezahlt nur Aufrufe, bei denen tatsächlich eine Werbeanzeige ausgespielt wurde oder die von einem YouTube-Premium-Mitglied angesehen wurden. Das betrifft meist 40 % bis 70 % der Views.',
        },
        {
          question: 'Wie kann ich meinen YouTube-RPM steigern?',
          answer:
            'Steigere deinen RPM, indem du kaufkräftige Nischen bedienst (Finanzen, Software, Business), Videos von über 8 Minuten mit Mid-Rolls produzierst und Zuschauer aus wirtschaftsstarken Ländern anziehst.',
        },
      ],
    },
    'youtube-banner-size': {
        "title": "YouTube-Banner-Größe: Maße, Safe-Zone & Vorlage",
        "seoTitle": "YouTube-Banner-Größe: Maße & Safe-Zone",
        "category": "Kanal-Branding",
        "readTime": "5 Min. Lesezeit",
        "description": "Geprüfter Leitfaden zur YouTube-Banner-Größe: 2560×1440 Auflösung, 1235×338 zentrale Safe-Zone für Smartphone und PC, 6 MB Limit und Vorlagen.",
        "officialSources": [
            {
                "label": "YouTube-Hilfe: Branding für deinen Kanal verwalten",
                "description": "Offizielle Vorgaben für Bannerabmessungen, Safe-Zone für Text und Logos, unterstützte Dateiformate und Upload-Limits."
            }
        ],
        "contentSections": [
            {
                "heading": "1. Empfohlene YouTube-Bannergröße: 2560×1440 Pixel",
                "body": "Laut den offiziellen YouTube-Vorgaben beträgt die ideale Bannergröße 2560 × 1440 Pixel im 16:9-Format. Das Mindestmaß für den Upload liegt bei 2048 × 1152 Pixeln. Ein Upload in voller 2560 × 1440 Auflösung garantiert gestochen scharfe Darstellung auf hochauflösenden Bildschirmen und 4K-Fernsehern.",
                "keyTakeaway": "Erstellen Sie Ihr Banner mit 2560 × 1440 Pixeln (16:9) und mindestens 2048 × 1152 Pixeln."
            },
            {
                "heading": "2. Zentrale Safe-Zone für Text und Logos: 1235×338",
                "body": "Da YouTube-Banner auf Mobilgeräten, Tablets, Desktop-PCs und Fernsehern angezeigt werden, variiert der sichtbare Bildausschnitt. Platzieren Sie Kanalnamen, Slogans und Logos unbedingt im zentralen Bereich von 1235 × 338 Pixeln, damit sie auf Smartphones nicht abgeschnitten werden.",
                "keyTakeaway": "Alle wichtigen Texte und Grafikelemente gehören in die zentrale 1235 × 338 Safe-Zone."
            },
            {
                "heading": "3. Maximale Dateigröße und unterstützte Bildformate",
                "body": "YouTube beschränkt die Dateigröße von Kanalbannern auf maximal 6 MB. Unterstützt werden JPG, PNG, BMP und nicht-animierte GIFs. Für Fotobanner empfiehlt sich optimiertes JPG, für Logos und Grafiken PNG.",
                "keyTakeaway": "Dateien dürfen höchstens 6 MB groß sein und sollten als JPG oder PNG gespeichert werden."
            },
            {
                "heading": "4. Banner formatieren mit dem Creovly Resizer",
                "body": "Testen Sie Ihren Bildausschnitt mit dem YouTube Thumbnail Resizer von Creovly. Die 2560 × 1440 Banner-Vorlage blendet die 1235 × 338 Safe-Zone direkt ein, damit Sie den mobilen Beschnitt vor dem Upload prüfen können.",
                "keyTakeaway": "Nutzen Sie die 2560 × 1440 Vorlage, um Zuschnitte für Mobil- und Desktopgeräte zu visualisieren."
            }
        ],
        "workedExample": {
            "title": "Kanalbanner zentrieren, um mobile Zuschnitte zu verhindern",
            "scenario": "Ein Creator erstellt ein Banner mit 2560×1440. Auf Smartphones werden Logo und Upload-Tage abgeschnitten, weil sie zu nah am Rand platziert wurden.",
            "steps": [
                "Mobilen Anzeigebereich ermitteln: Die YouTube-App zeigt nur den mittleren Streifen von 1235 × 338 Pixeln.",
                "Texte und Logos zentrieren: Alle wichtigen Markenelemente in den 1235 × 338 Bereich verschieben.",
                "Hintergrund vollflächig anlegen: Farben und Texturen über die gesamten 2560 × 1440 Pixel spannen.",
                "Unter 6 MB komprimieren: Mit Creovly-Tools als optimiertes JPG exportieren."
            ],
            "conclusion": "Das Banner ist auf Smartphones perfekt lesbar und entfaltet auf Fernsehern seine volle visuelle Wirkung."
        },
        "checklist": [
            {
                "title": "Master-Auflösung",
                "detail": "2560 × 1440 Pixel (Mindestmaß 2048 × 1152)."
            },
            {
                "title": "Zentrale Safe-Zone",
                "detail": "Alle Texte und Logos strikt innerhalb von 1235 × 338 Pixeln halten."
            },
            {
                "title": "Dateigrößenlimit 6 MB",
                "detail": "Dateigröße unter 6 MB im JPG- oder PNG-Format sicherstellen."
            },
            {
                "title": "Geräteübergreifende Prüfung",
                "detail": "Nach dem Upload auf Smartphone und Desktop-PC kontrollieren."
            }
        ],
        "faqs": [
            {
                "question": "Welche Bannergröße empfiehlt YouTube?",
                "answer": "Die offizielle Empfehlung lautet 2560 × 1440 Pixel im 16:9-Seitenverhältnis mit einem Mindestmaß von 2048 × 1152 Pixeln."
            },
            {
                "question": "Was ist die YouTube-Banner-Safe-Zone?",
                "answer": "Die Safe-Zone ist der zentrale Bereich von 1235 × 338 Pixeln. Inhalte in diesem Bereich sind auf Smartphones, Tablets, Computern und Fernsehern garantiert sichtbar."
            },
            {
                "question": "Wie groß darf die Bannerdatei maximal sein?",
                "answer": "Die Datei darf höchstens 6 MB groß sein und muss im Format JPG, PNG, BMP oder statisches GIF vorliegen."
            }
        ]
    },
    'youtube-monetization-requirements': {
        "title": "YouTube-Monetarisierungsvoraussetzungen im Detail",
        "seoTitle": "YouTube-Monetarisierungsvoraussetzungen im Detail",
        "category": "Monetarisierung",
        "readTime": "7 Min. Lesezeit",
        "description": "Übersicht der YouTube-Monetarisierungsbedingungen: 500 & 1.000 Abonnenten, 4.000 Wiedergabestunden, 10 Mio. Shorts-Aufrufe und YPP-Richtlinien.",
        "officialSources": [
            {
                "label": "YouTube-Hilfe: Übersicht und Teilnahmevoraussetzungen für das YouTube-Partnerprogramm",
                "description": "Offizielle Kriterien für den Beitritt zum YPP, Abonnenten- und Stundenmeilensteine sowie Monetarisierungsrichtlinien."
            },
            {
                "label": "YouTube-Hilfe: Mit YouTube Shorts Geld verdienen",
                "description": "Offizielle Richtlinien zur Beteiligung an den Werbeeinnahmen aus dem Shorts-Feed."
            }
        ],
        "contentSections": [
            {
                "heading": "1. Die zwei Stufen des YouTube-Partnerprogramms (YPP)",
                "body": "YouTube unterscheidet zwei Stufen: Die Einstiegsstufe (Fan-Finanzierung) schaltet Super Thanks, Super Chat, Kanalmitgliedschaften und Shopping frei. Bedingungen: 500 Abonnenten, 3 öffentliche Uploads in 90 Tagen und entweder 3.000 Wiedergabestunden in 12 Monaten oder 3 Mio. Shorts-Aufrufe in 90 Tagen. Die Vollstufe schaltet Werbung auf langen Videos und Shorts frei: 1.000 Abonnenten und entweder 4.000 Wiedergabestunden in 12 Monaten oder 10 Mio. Shorts-Aufrufe in 90 Tagen.",
                "keyTakeaway": "Fan-Finanzierung startet bei 500 Abonnenten und 3.000 Stunden; volle Werbeeinnahmen erfordern 1.000 Abonnenten und 4.000 Stunden."
            },
            {
                "heading": "2. Gültige Wiedergabestunden vs. nicht anrechenbare Zeit",
                "body": "Nur Wiedergabestunden von öffentlichen, langen Videos zählen für die 4.000 Stunden. Watchtime aus dem Shorts-Feed zählt NICHT zu den 4.000 Stunden (hierfür gilt die separate 10-Mio.-Shorts-Aufrufe-Schwelle). Private, ungelistete oder gelöschte Videos sowie Google-Ads-Kampagnen werden nicht gewertet.",
                "keyTakeaway": "Stunden müssen aus regulären, öffentlichen Videos innerhalb eines fortlaufenden 365-Tage-Zeitraums stammen."
            },
            {
                "heading": "3. Kontosicherheit und Richtlinienkonformität",
                "body": "Neben Abonnenten und Watchtime sind die Bestätigung in zwei Schritten für Ihr Google-Konto, ein verknüpftes Google AdSense-Konto und null aktive Verwarnungen wegen Verstoßes gegen die Community-Richtlinien erforderlich.",
                "keyTakeaway": "Aktivieren Sie die 2-Faktor-Authentifizierung, verknüpfen Sie AdSense und halten Sie den Kanal frei von Richtlinienverwarnungen."
            },
            {
                "heading": "4. Fortschritt verfolgen mit Creovly-Rechnern",
                "body": "Berechnen Sie Ihre verbleibende Zeit bis zu 4.000 Stunden mit unserem YouTube Watch Hours Rechner. Nutzen Sie den YouTube Monetization Rechner, um Gesamteinnahmen aus Werbung und Mitgliedschaften zu prognostizieren.",
                "keyTakeaway": "Modellieren Sie die benötigte Upload- und Aufrufgeschwindigkeit gezielt mit passenden Kalkulatoren."
            }
        ],
        "workedExample": {
            "title": "Meilenstein-Planung für 4.000 Wiedergabestunden",
            "scenario": "Ein Creator hat 850 Abonnenten und 2.400 Stunden gesammelt und möchte die fehlenden 1.600 Stunden erreichen, bevor frühere Stunden aus dem 12-Monats-Fenster verfallen.",
            "steps": [
                "Fehlende Stunden berechnen: 4.000 Ziel − 2.400 = 1.600 Stunden benötigt.",
                "Benötigte Aufrufe kalkulieren: Bei 4 Min. durchschnittlicher Wiedergabedauer (0,067 Std./View) werden 1.600 ÷ 0,067 = 24.000 Aufrufe gebraucht.",
                "Upload-Rhythmus festlegen: 2 Videos pro Woche mit je 2.000 Aufrufen ergeben 16.000 Aufrufe (ca. 1.067 Std.) pro Monat.",
                "Kontovoraussetzungen prüfen: 2-Faktor-Authentifizierung aktiv und 0 Verwarnungen in YouTube Studio."
            ],
            "conclusion": "In ca. 6 bis 7 Wochen wird die Schwelle von 4.000 Stunden erreicht und die Vollmonetarisierung freigeschaltet."
        },
        "checklist": [
            {
                "title": "Abonnentenschwelle",
                "detail": "500 Abonnenten (Fan-Support) oder 1.000 Abonnenten (Werbeeinnahmen)."
            },
            {
                "title": "Wiedergabestunden oder Shorts-Views",
                "detail": "4.000 Stunden in 12 Monaten oder 10 Mio. Shorts-Aufrufe in 90 Tagen."
            },
            {
                "title": "Bestätigung in 2 Schritten",
                "detail": "Sicherheitsprüfung im Google-Konto aktivieren."
            },
            {
                "title": "Verknüpftes AdSense-Konto",
                "detail": "Aktives Google AdSense-Konto für Auszahlungen hinterlegen."
            },
            {
                "title": "Keine Verwarnungen",
                "detail": "Null aktive Strikes gegen die Community-Richtlinien."
            }
        ],
        "faqs": [
            {
                "question": "Was sind die Voraussetzungen für die YouTube-Monetarisierung?",
                "answer": "Für reguläre Werbeeinnahmen benötigen Sie 1.000 Abonnenten und 4.000 gültige öffentliche Wiedergabestunden in 12 Monaten (oder 10 Mio. Shorts-Aufrufe in 90 Tagen). Für Fan-Finanzierung reichen 500 Abonnenten und 3.000 Stunden."
            },
            {
                "question": "Zählen YouTube Shorts zu den 4.000 Wiedergabestunden?",
                "answer": "Nein, Wiedergabezeit aus dem Shorts-Feed zählt nicht zu den 4.000 Stunden. Shorts qualifizieren sich ausschließlich über die Schwelle von 10 Millionen Aufrufen in 90 Tagen."
            },
            {
                "question": "In welchem Zeitraum müssen die 4.000 Stunden gesammelt werden?",
                "answer": "Es gilt ein fortlaufender Zeitraum von 365 Tagen. Stunden, die älter als ein Jahr sind, verfallen kontinuierlich aus der Zählung."
            }
        ]
    },
    'how-to-change-youtube-thumbnail': {
        "title": "YouTube-Thumbnail ändern: Schritt-für-Schritt-Anleitung",
        "seoTitle": "YouTube-Thumbnail ändern (Schritt für Schritt)",
        "category": "Kanal-Branding",
        "readTime": "5 Min. Lesezeit",
        "description": "Schritt-für-Schritt-Tutorial zum Ändern von YouTube-Thumbnails: PC-Studio, mobile App, Telefonverifizierung und Shorts-Besonderheiten.",
        "officialSources": [
            {
                "label": "YouTube-Hilfe: Video-Thumbnails hinzufügen oder ändern",
                "description": "Offizielle Anleitung zum Hochladen, Ändern und Auswählen benutzerdefinierter Thumbnails auf Desktop und Mobilgeräten."
            }
        ],
        "contentSections": [
            {
                "heading": "1. Telefonverifizierung: Benutzerdefinierte Thumbnails freischalten",
                "body": "Um eigene Thumbnails hochzuladen, muss Ihr Kanal per Telefonnummer bestätigt sein. Andernfalls können Sie nur aus drei automatisch generierten Standbildern wählen. Öffnen Sie in YouTube Studio die Einstellungen > Kanal > Verfügbarkeit der Funktionen und bestätigen Sie Ihre Telefonnummer bei den Standardfunktionen.",
                "keyTakeaway": "Aktivieren Sie die Telefonverifizierung in YouTube Studio, um individuelle Thumbnails hochladen zu können."
            },
            {
                "heading": "2. Thumbnail am PC in YouTube Studio ändern",
                "body": "Melden Sie sich am Computer in YouTube Studio an. Klicken Sie links auf \"Inhalte\" und wählen Sie das Video aus. Fahren Sie im Bereich \"Thumbnail\" mit der Maus über das aktuelle Bild, klicken Sie auf das Drei-Punkte-Menü und wählen Sie \"Ändern\". Wählen Sie Ihr neues 1280 × 720 Bild aus und klicken Sie oben rechts auf \"Speichern\".",
                "keyTakeaway": "Klicken Sie unter Inhalte > Videodetails auf die drei Punkte am Thumbnail und wählen Sie \"Ändern\"."
            },
            {
                "heading": "3. Thumbnail in der mobilen YouTube Studio App ändern",
                "body": "Öffnen Sie die YouTube Studio App auf iOS oder Android. Tippen Sie auf \"Inhalte\", wählen Sie das Video und tippen Sie oben auf das Stiftsymbol. Tippen Sie auf das Stiftsymbol in der Thumbnail-Vorschau, wählen Sie \"Ändern\", suchen Sie das neue Bild aus Ihrer Galerie aus und tippen Sie auf \"Speichern\". Beachten Sie das mobile 2 MB Dateilimit.",
                "keyTakeaway": "Nutzen Sie das Stiftsymbol in der YouTube Studio App, um Thumbnails unterwegs anzupassen."
            },
            {
                "heading": "4. YouTube Shorts Thumbnails festlegen oder ändern",
                "body": "Für YouTube Shorts gelten andere Regeln: Eigene Thumbnails können für bereits veröffentlichte Shorts am PC nicht hochgeladen werden. Das Titelbild muss beim Hochladen in der mobilen YouTube-App über das Stiftsymbol auf der Videovorschau als Frame ausgewählt werden.",
                "keyTakeaway": "Wählen Sie das Shorts-Vorschaubild beim Upload in der App; am PC ist ein nachträglicher Tausch derzeit nicht möglich."
            },
            {
                "heading": "5. Technische Vorbereitung: 1280×720 und unter 2 MB komprimieren",
                "body": "Bringen Sie Ihr Bild mit dem Creovly YouTube Thumbnail Resizer auf 1280 × 720 Pixel (16:9). Komprimieren Sie die Datei mit dem Creovly Thumbnail Compressor auf unter 2 MB, um Fehler beim mobilen Upload zu vermeiden.",
                "keyTakeaway": "Auf 1280 × 720 formatieren und auf unter 2 MB komprimieren, um Upload-Fehler zu vermeiden."
            }
        ],
        "workedExample": {
            "title": "Ersetzen eines schwachen Thumbnails zur Steigerung der Klickrate",
            "scenario": "Ein vor 48 Stunden veröffentlichtes Video hat eine niedrige Klickrate von 2,1%. Der Creator erstellt ein kontrastreicheres Thumbnail und tauscht es aus, ohne Aufrufe oder Kommentare zu verlieren.",
            "steps": [
                "Neues Thumbnail vorbereiten: 1280 × 720 Pixel im JPG-Format exportieren.",
                "Unter 2 MB komprimieren: Mit dem Creovly-Kompressor auf 510 KB reduzieren.",
                "YouTube Studio öffnen: In den Inhalten die Videodetails aufrufen.",
                "Austausch durchführen: Drei-Punkte-Menü am Thumbnail anklicken, \"Ändern\" wählen, Datei hochladen und speichern.",
                "Klickrate überwachen: Den Verlauf der Impressionen-Klickrate in den Studio Analytics der nächsten 72 Stunden prüfen."
            ],
            "conclusion": "Das neue Thumbnail wird sofort in Suche und Empfehlungen ausgespielt, ohne dass Statistiken zurückgesetzt werden."
        },
        "checklist": [
            {
                "title": "Telefonbestätigung erfolgt",
                "detail": "Prüfen, ob der Kanal für benutzerdefinierte Thumbnails freigeschaltet ist."
            },
            {
                "title": "Empfohlene Auflösung",
                "detail": "1280 × 720 Pixel im Seitenverhältnis 16:9."
            },
            {
                "title": "Dateigröße unter 2 MB",
                "detail": "Kompatibilität mit mobilen Uploads sicherstellen."
            },
            {
                "title": "Format JPG oder PNG",
                "detail": "sRGB-Farbprofil für einheitliche Farbdarstellung verwenden."
            },
            {
                "title": "Erfolgreich gespeichert",
                "detail": "Speichern und die Anzeige auf der öffentlichen Videoseite kontrollieren."
            }
        ],
        "faqs": [
            {
                "question": "Kann man ein YouTube-Thumbnail nach dem Upload noch ändern?",
                "answer": "Ja, jederzeit. Gehen Sie in YouTube Studio auf die Videodetails, klicken Sie am Thumbnail auf das Drei-Punkte-Menü, wählen Sie \"Ändern\", laden Sie das neue Bild hoch und speichern Sie ab."
            },
            {
                "question": "Kann man das Thumbnail eines veröffentlichten Shorts nachträglich ändern?",
                "answer": "Nein, für bereits veröffentlichte Shorts ist ein Austausch am PC derzeit nicht möglich. Das Vorschaubild muss beim Hochladen in der Smartphone-App festgelegt werden."
            },
            {
                "question": "Warum kann ich keine benutzerdefinierten Thumbnails hochladen?",
                "answer": "Dafür muss die Telefonnummernbestätigung in den YouTube Studio Kanaleinstellungen abgeschlossen sein. Unbestätigte Kanäle können nur automatische Standbilder auswählen."
            }
        ]
    },

  },

  pt: {
    'youtube-thumbnail-blueprint': {
      title: 'Tamanho da miniatura do YouTube: 1280×720, limite de 2 MB e CTR',
      seoTitle: 'Miniaturas do YouTube: tamanho, limites e CTR',
      category: 'Identidade visual',
      readTime: '6 min de leitura',
      description: 'O tamanho da miniatura do YouTube é 1280×720 pixels em 16:9, menos de 2 MB, em JPG, PNG ou GIF. Limites oficiais, zonas seguras e como redimensionar ou comprimir.',
      officialSources: [
        {
          label: 'Ajuda do YouTube: Adicionar miniaturas de vídeo',
          description: 'Especificações oficiais do YouTube sobre resolução, proporção de tela, formatos e limites de tamanho.',
        },
      ],
      contentSections: [
        {
          heading: '1. Tamanho da miniatura do YouTube em 2026: dimensões oficiais e limite de upload',
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
          question: "O que é RPM no YouTube?",
          answer: "O RPM (Receita por Mil Visualizações) no YouTube é a métrica que mede quanto dinheiro líquido um criador ganha por 1.000 visualizações totais em todas as fontes de monetização (anúncios, YouTube Premium, Clubes dos canais, Super Chat) após o corte de 45% do YouTube. A fórmula oficial é: RPM = (Receita Total Estimada / Visualizações Totais) × 1.000.",
        },
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
          answer: "Títulos de 60 ou mais caracteres quebram em várias linhas no celular, empurrando os botões da base ainda mais para cima do seu vídeo.",
        },
      ],
    },
    'how-much-does-youtube-pay-per-1000-views': {
      title: 'Quanto o YouTube Paga Por 1.000 Visualizações? (Tabela e RPM 2026)',
      seoTitle: 'Quanto o YouTube Paga Por 1.000 Visualizações?',
      category: 'Monetização e Economia',
      readTime: '7 min de leitura',
      description:
        'Descubra quanto o YouTube paga por 1.000 visualizações por nicho, vídeos longos vs Shorts, RPM líquido e como calcular os ganhos do seu canal.',
      officialSources: [
        {
          label: 'Ajuda do YouTube: Noções básicas sobre métricas do YouTube Analytics (RPM)',
          description:
            'Definição oficial do RPM do criador, reproduções monetizadas e cálculo dos ganhos líquidos.',
        },
        {
          label: 'Ajuda do YouTube: Visão geral e políticas do Programa de Parcerias do YouTube',
          description:
            'Regras oficiais da divisão de receita de anúncios, requisitos de adesão e divisão 55/45.',
        },
      ],
      contentSections: [
        {
          heading: '1. Quanto o YouTube paga por 1.000 visualizações em média?',
          body: 'Em média, o YouTube paga aos criadores entre US$ 2,00 e US$ 12,00 por cada 1.000 visualizações em vídeos longos tradicionais nos principais mercados econômicos (como EUA, Reino Unido, Canadá e Brasil nas faixas locais proporcionais). Essa métrica é conhecida como RPM líquido (Receita Por Mil). Os ganhos variam muito conforme a temática: categorias comerciais como finanças pessoais, softwares para empresas, investimentos e negócios podem alcançar RPMs de US$ 15,00 a mais de US$ 35,00 por mil views. Por outro lado, canais de entretenimento geral, vlogs diários e games costumam ficar entre US$ 1,50 e US$ 4,50. No YouTube Shorts, a remuneração pelo fundo compartilhado é bem menor, variando em média entre US$ 0,02 e US$ 0,07 por 1.000 visualizações.',
          keyTakeaway: 'A maioria dos vídeos longos rende de US$ 2 a US$ 12 por 1.000 visualizações, enquanto os Shorts rendem apenas de US$ 0,02 a US$ 0,07 por mil.',
        },
        {
          heading: '2. CPM vs. RPM: por que as marcas pagam mais do que você recebe',
          body: 'Muitos criadores confundem o CPM do anunciante com o RPM do canal. O CPM representa o valor bruto que a empresa paga ao YouTube por 1.000 impressões de anúncios. Você não recebe esse total: primeiro, o YouTube retém 45% do valor em anúncios de vídeo e repassa 55% ao criador. Segundo, nem toda visualização exibe anúncio (adblockers, falta de anunciantes na região). Já o RPM indica exatamente o seu ganho líquido real por cada 1.000 visualizações totais, incluindo YouTube Premium e assinaturas de membros. Use a nossa Calculadora de RPM do YouTube para saber seu valor real.',
          keyTakeaway: 'O CPM é o investimento bruto da marca; o RPM é o seu salário líquido por 1.000 visualizações totais. Não desconte 45% duas vezes.',
        },
        {
          heading: '3. Fatores que determinam seus ganhos por 1.000 visualizações',
          body: 'Cinco pilares essenciais controlam seu RPM: (1) Localização do público: Espectadores de países com alto poder de compra geram lances até dez vezes maiores. (2) Nicho de conteúdo: Públicos com forte intenção de compra (finanças, tecnologia B2B, cursos) atraem anunciantes com orçamentos vultosos. (3) Duração do vídeo e anúncios intermediários: Vídeos com mais de 8 minutos permitem inserir anúncios no meio da reprodução (mid-rolls). (4) Idade e perfil da audiência: Adultos de 25 a 54 anos com renda própria atraem campanhas mais caras. (5) Sazonalidade: O último trimestre do ano (outubro a dezembro) chega a dobrar as tarifas de anúncios devido à Black Friday e ao Natal.',
          keyTakeaway: 'Origem dos espectadores, conteúdo com intenção comercial e vídeos com mais de 8 minutos são as maiores alavancas para elevar seu RPM.',
        },
        {
          heading: '4. Estimativa de ganhos por nicho: finanças, tech, games e vlogs',
          body: 'O valor pago pelos anunciantes muda drasticamente conforme a categoria: (1) Finanças pessoais, cripto e investimentos: US$ 12,00 a US$ 35,00+; (2) Tecnologia, tutoriais de programação e software: US$ 6,00 a US$ 18,00; (3) Negócios e marketing digital: US$ 7,00 a US$ 22,00; (4) Educação e tutoriais práticos: US$ 4,00 a US$ 10,00; (5) Saúde e fitness: US$ 3,00 a US$ 8,00; (6) Vlogs e estilo de vida: US$ 1,80 a US$ 4,50; (7) Games e e-sports: US$ 1,20 a US$ 3,50; (8) Humor e pegadinhas: US$ 1,20 a US$ 3,00. Faça simulações personalizadas na Calculadora de Dinheiro do YouTube.',
          keyTakeaway: 'Temas corporativos e financeiros rendem de 5 a 10 vezes mais por visualização do que canais puramente de entretenimento.',
        },
        {
          heading: '5. Projeção de ganhos: de 1.000 a 1.000.000 de visualizações',
          body: 'Entender os múltiplos de visualização ajuda a traçar metas sólidas: Com 1.000 views você recebe entre US$ 2,00 e US$ 12,00 (longos) ou US$ 0,02 a US$ 0,07 (Shorts). Com 10.000 views, de US$ 20,00 a US$ 120,00 (longos) ou US$ 0,20 a US$ 0,70 (Shorts). Com 100.000 views, de US$ 200,00 a US$ 1.200,00 (longos) ou US$ 2,00 a US$ 7,00 (Shorts). Com 1.000.000 de views, de US$ 2.000,00 a US$ 12.000,00+ (longos) ou US$ 20,00 a US$ 70,00 (Shorts). Para calcular todas as fontes conjuntas (patrocínios, produtos, afiliados), use a Calculadora de Monetização do YouTube.',
          keyTakeaway: '1 milhão de visualizações em vídeos longos costuma render entre US$ 2.000 e US$ 12.000+, enquanto 1 milhão de Shorts rende cerca de US$ 20 a US$ 70.',
        },
      ],
      workedExample: {
        title: 'Comparativo de ganhos: Tutorial de programação vs. Melhores momentos de games',
        scenario:
          'Dois criadores postam vídeos de 12 minutos que alcançam exatamente 250.000 visualizações em 30 dias. O Criador A publica aulas de programação com público no Brasil e nos EUA. O Criador B mantém um canal de destaques de games com público jovem espalhado pelo mundo.',
        steps: [
          'Análise do Criador A (Tutorial de código): A disputa acirrada de empresas de tecnologia resulta em um RPM líquido de US$ 9,20. Total recebido: (250.000 / 1.000) × US$ 9,20 = US$ 2.300,00.',
          'Análise do Criador B (Gaming): O perfil mais jovem e anúncios comuns resultam em um RPM de US$ 2,10. Total recebido: (250.000 / 1.000) × US$ 2,10 = US$ 525,00.',
          'Diferença comprovada: Mesmo com o mesmo número de visualizações (250.000 cada), o Criador A faturou US$ 1.775,00 a mais (mais de 4,3 vezes) pela intenção de compra do nicho.',
        ],
        conclusion:
          'O total de visualizações é apenas uma parte da conta. A intenção comercial do público multiplica o retorno financeiro por mil views.',
      },
      checklist: [
        {
          title: 'Verifique seu RPM real no YouTube Studio',
          detail: 'Consulte a aba Analytics > Receita para ver o RPM dos últimos 28 dias em vez de confiar em palpites genéricos.',
        },
        {
          title: 'Produza vídeos acima de 8 minutos',
          detail: 'Crie vídeos com duração superior a 8 minutos para habilitar anúncios intermediários nos momentos mais naturais.',
        },
        {
          title: 'Foque em palavras-chave comerciais',
          detail: 'Aborde tutoriais de softwares, ferramentas e análises de produtos que atraiam empresas dispostas a investir pesado.',
        },
        {
          title: 'Separe o papel dos Shorts e dos vídeos longos',
          detail: 'Use os Shorts para atrair novos inscritos e direcione esse público para vídeos longos para gerar receita sustentável.',
        },
        {
          title: 'Calcule seus cenários em modo privado',
          detail: 'Utilize as ferramentas do Creovly para planejar suas metas de forma segura e 100% no seu navegador.',
        },
      ],
      faqs: [
        {
          question: 'Quanto o YouTube paga por 1.000 visualizações?',
          answer:
            'A maioria dos criadores ganha entre US$ 2,00 e US$ 12,00 por 1.000 visualizações em vídeos longos convencionais. Em nichos de alta renda como finanças, pode passar de US$ 20,00, enquanto Shorts pagam de US$ 0,02 a US$ 0,07.',
        },
        {
          question: 'Quanto rende 1 milhão de visualizações no YouTube?',
          answer:
            'Um milhão de visualizações em vídeos longos costuma render de US$ 2.000 a US$ 12.000 em anúncios. Em finanças ou tecnologia, pode ultrapassar US$ 20.000. Já no Shorts, 1 milhão de views rende apenas entre US$ 20 e US$ 70.',
        },
        {
          question: 'Qual é a diferença entre CPM e RPM no YouTube?',
          answer:
            'O CPM é o valor bruto pago pelos anunciantes antes do desconto de 45% do YouTube. O RPM é o valor líquido final que entra no seu bolso por 1.000 visualizações totais, incluindo YouTube Premium.',
        },
        {
          question: 'O YouTube paga por todas as visualizações do vídeo?',
          answer:
            'Não. O YouTube remunera apenas as visualizações monetizadas, onde um anúncio foi de fato exibido, ou visualizações de assinantes do YouTube Premium. Geralmente, isso corresponde a 40% a 70% das visualizações.',
        },
        {
          question: 'Como aumentar o RPM do meu canal do YouTube?',
          answer:
            'Você pode aumentar o RPM escolhendo temas comerciais (finanças, negócios, software), criando vídeos com mais de 8 minutos com anúncios intermediários e atraindo público com maior renda.',
        },
      ],
    },
    'youtube-banner-size': {
        "title": "Tamanho do Banner do YouTube: Dimensões, Área Segura e Molde",
        "seoTitle": "Tamanho do Banner do YouTube: Dimensões & Área Segura",
        "category": "Identidade do canal",
        "readTime": "5 min de leitura",
        "description": "Guia verificado de tamanho de banner do YouTube: resolução 2560×1440, área segura central de 1235×338 para celular e PC, limite de 6 MB e modelos.",
        "officialSources": [
            {
                "label": "Ajuda do YouTube: Gerenciar o branding do canal",
                "description": "Especificações oficiais sobre dimensões da imagem do banner, área segura mínima para textos e logotipos, formatos aceitos e limites de envio."
            }
        ],
        "contentSections": [
            {
                "heading": "1. Tamanho e dimensões recomendadas para o banner: 2560×1440",
                "body": "Conforme as diretrizes oficiais do YouTube, o tamanho padrão da capa do canal é 2560 × 1440 pixels na proporção 16:9. A dimensão mínima aceita é 2048 × 1152 pixels. Usar a resolução completa de 2560 × 1440 garante nitidez máxima em monitores de alta resolução e televisores 4K.",
                "keyTakeaway": "Crie sua arte em 2560 × 1440 (16:9) com pelo menos 2048 × 1152 pixels para upload."
            },
            {
                "heading": "2. Área segura central para textos e logotipos: 1235×338",
                "body": "Como os banners do YouTube são visualizados em celulares, tablets, computadores e televisões, o corte varia conforme o aparelho. Para que nome do canal, slogans, links ou fotos não sejam cortados, mantenha todo o conteúdo fundamental dentro da área segura central de 1235 × 338 pixels.",
                "keyTakeaway": "Concentre tipografia, logotipos e elementos cruciais na área segura de 1235 × 338 pixels."
            },
            {
                "heading": "3. Limite de tamanho de arquivo e formatos aceitos",
                "body": "O YouTube impõe um limite máximo de 6 MB por banner. Os formatos permitidos são JPG, PNG, BMP e GIF não animado. Para fotos, JPEG otimizado oferece o melhor equilíbrio de peso e qualidade. Para ilustrações e textos, utilize PNG.",
                "keyTakeaway": "Mantenha os arquivos com até 6 MB nos formatos JPG ou PNG para evitar erros no envio."
            },
            {
                "heading": "4. Ajuste seu banner com o redimensionador Creovly",
                "body": "Você pode testar e ajustar sua capa com o Redimensionador de Miniaturas do YouTube da Creovly. O modelo 2560 × 1440 inclui uma grade interativa mostrando a área segura central de 1235 × 338 para pré-visualizar antes de publicar.",
                "keyTakeaway": "Use o modelo 2560 × 1440 para verificar o corte no celular e no computador."
            }
        ],
        "workedExample": {
            "title": "Centralização de arte para evitar corte em celulares",
            "scenario": "Um criador fez um banner 2560×1440, mas no celular o logotipo e os dias de novos vídeos foram cortados por estarem fora da área segura.",
            "steps": [
                "Verificar área do celular: O app do YouTube exibe apenas a faixa central de 1235 × 338 pixels.",
                "Mover textos e marcas: Reposicionar logotipo e textos essenciais para dentro do limite de 1235 × 338.",
                "Estender fundo da arte: Preencher toda a tela de 2560 × 1440 com texturas para exibição em TVs.",
                "Comprimir para menos de 6 MB: Exportar o arquivo final em JPG com menos de 6 MB usando Creovly."
            ],
            "conclusion": "O banner agora mantém textos nítidos em celulares e expande perfeitamente em telas de computadores e TVs."
        },
        "checklist": [
            {
                "title": "Tamanho mestre do arquivo",
                "detail": "2560 × 1440 pixels (mínimo de 2048 × 1152)."
            },
            {
                "title": "Área segura central",
                "detail": "Textos e logotipos restritos a 1235 × 338 pixels centrais."
            },
            {
                "title": "Teto de 6 MB",
                "detail": "Certifique-se de que a imagem final tem 6 MB ou menos em JPG/PNG."
            },
            {
                "title": "Revisão em múltiplos aparelhos",
                "detail": "Teste a visualização no app móvel e no navegador do computador."
            }
        ],
        "faqs": [
            {
                "question": "Qual o tamanho recomendado para o banner do YouTube?",
                "answer": "O tamanho oficial recomendado é 2560 × 1440 pixels na proporção 16:9, com dimensões mínimas de 2048 × 1152 pixels."
            },
            {
                "question": "O que é a área segura do banner do YouTube?",
                "answer": "A área segura é o retângulo central de 1235 × 338 pixels. Qualquer conteúdo dentro desse espaço será exibido em celulares, tablets, computadores e televisores."
            },
            {
                "question": "Qual é o tamanho máximo do arquivo de banner?",
                "answer": "O tamanho máximo é 6 MB, nos formatos JPG, PNG, BMP ou GIF estático."
            }
        ]
    },
    'youtube-monetization-requirements': {
        "title": "Requisitos de Monetização do YouTube Explicados",
        "seoTitle": "Requisitos de Monetização do YouTube Explicados",
        "category": "Monetização",
        "readTime": "7 min de leitura",
        "description": "Entenda os requisitos de monetização do YouTube: níveis de 500 e 1.000 inscritos, 4.000 horas de exibição, 10M de visualizações nos Shorts e regras do YPP.",
        "officialSources": [
            {
                "label": "Ajuda do YouTube: Visão geral e qualificação para o Programa de Parcerias do YouTube",
                "description": "Critérios oficiais para entrar no YPP, metas de inscritos e horas de exibição, e políticas de monetização."
            },
            {
                "label": "Ajuda do YouTube: Monetizar nos YouTube Shorts",
                "description": "Regras oficiais para divisão de receita publicitária nos vídeos verticais do feed de Shorts."
            }
        ],
        "contentSections": [
            {
                "heading": "1. Os dois níveis do Programa de Parcerias do YouTube (YPP)",
                "body": "O YouTube oferece dois níveis de qualificação. O nível inicial (financiamento por fãs) desbloqueia Valeu Demais, Super Chat, Clubes dos canais e YouTube Shopping. Exige: 500 inscritos, 3 envios públicos nos últimos 90 dias e 3.000 horas públicas em 12 meses ou 3 milhões de views nos Shorts em 90 dias. O nível completo desbloqueia anúncios nos vídeos longos e Shorts. Exige: 1.000 inscritos e 4.000 horas públicas em 12 meses ou 10 milhões de views nos Shorts em 90 dias.",
                "keyTakeaway": "Você pode começar com apoio de fãs com 500 inscritos e 3.000 horas; a receita de anúncios completa exige 1.000 inscritos e 4.000 horas."
            },
            {
                "heading": "2. Horas públicas válidas vs tempo não contabilizado",
                "body": "Apenas horas públicas de vídeos longos contam para as 4.000 horas. O tempo assistido no feed de Shorts NÃO conta para a meta de 4.000 horas (Shorts se qualificam pela meta separada de 10M de views). Vídeos privados, não listados ou campanhas do Google Ads também não contam.",
                "keyTakeaway": "As horas devem vir de vídeos longos públicos assistidos de forma orgânica em uma janela móvel de 365 dias."
            },
            {
                "heading": "3. Segurança da conta e conformidade com as diretrizes",
                "body": "Além de inscritos e horas, é obrigatório ativar a Verificação em duas etapas na conta Google, vincular uma conta do Google AdSense ativa e ter zero avisos ativos de Diretrizes da Comunidade.",
                "keyTakeaway": "Proteja seu canal com 2 etapas, vincule o AdSense e mantenha o canal sem penalidades ativas."
            },
            {
                "heading": "4. Acompanhe seu progresso com as calculadoras Creovly",
                "body": "Calcule o tempo restante até as 4.000 horas com a Calculadora de Horas do YouTube Creovly com base na sua retenção média. Use a Calculadora de Monetização para estimar receitas combinadas.",
                "keyTakeaway": "Utilize calculadoras dedicadas para planejar sua frequência de postagem com precisão."
            }
        ],
        "workedExample": {
            "title": "Planejamento para atingir as 4.000 horas de exibição",
            "scenario": "Um criador tem 850 inscritos e 2.400 horas públicas e precisa alcançar as 1.600 horas restantes antes que as horas antigas comecem a expirar no prazo de 12 meses.",
            "steps": [
                "Calcular horas restantes: 4.000 meta − 2.400 atuais = 1.600 horas necessárias.",
                "Calcular visualizações: Com duração média de 4 minutos (0,067 h/view), 1.600 ÷ 0,067 = 24.000 visualizações necessárias.",
                "Definir ritmo de postagem: Postar 2 vídeos por semana com média de 2.000 views gera 16.000 views (cerca de 1.067 horas) por mês.",
                "Verificar pré-requisitos: Confirmar verificação em duas etapas e zero avisos no YouTube Studio."
            ],
            "conclusion": "Nesse ritmo, o criador alcançará as 4.000 horas em cerca de 6 a 7 semanas, qualificando-se para o YPP completo."
        },
        "checklist": [
            {
                "title": "Meta de inscritos",
                "detail": "500 inscritos (apoio de fãs) ou 1.000 inscritos (anúncios)."
            },
            {
                "title": "Horas ou views nos Shorts",
                "detail": "4.000 horas públicas em 12 meses ou 10M de views nos Shorts em 90 dias."
            },
            {
                "title": "Verificação em duas etapas",
                "detail": "Ative a segurança em 2 etapas na conta Google associada."
            },
            {
                "title": "Conta do AdSense vinculada",
                "detail": "Vincule uma conta aprovada do Google AdSense para receber pagamentos."
            },
            {
                "title": "Canal sem advertências",
                "detail": "Garanta zero avisos ativos por violação das diretrizes."
            }
        ],
        "faqs": [
            {
                "question": "Quais são os requisitos para monetizar o canal no YouTube?",
                "answer": "Para monetização completa com anúncios, são necessários 1.000 inscritos e 4.000 horas públicas de exibição em 12 meses (ou 10 milhões de views nos Shorts em 90 dias). Existe um nível inicial aos 500 inscritos e 3.000 horas para apoio de fãs."
            },
            {
                "question": "As horas dos YouTube Shorts contam para as 4.000 horas?",
                "answer": "Não, o tempo do feed de Shorts não conta para as 4.000 horas. Os Shorts se qualificam pela meta independente de 10 milhões de visualizações em 90 dias."
            },
            {
                "question": "Quanto tempo tenho para conseguir as 4.000 horas?",
                "answer": "O cálculo considera uma janela móvel de 365 dias consecutivos. As horas acumuladas há mais de um ano expiram continuamente."
            }
        ]
    },
    'how-to-change-youtube-thumbnail': {
        "title": "Como Mudar a Miniatura do YouTube Passo a Passo",
        "seoTitle": "Como Mudar a Miniatura do YouTube (Passo a Passo)",
        "category": "Identidade visual",
        "readTime": "5 min de leitura",
        "description": "Tutorial passo a passo de como mudar a miniatura no YouTube: pelo YouTube Studio no computador, app móvel, verificação por telefone e miniaturas de Shorts.",
        "officialSources": [
            {
                "label": "Ajuda do YouTube: Adicionar ou alterar miniaturas de vídeos",
                "description": "Documentação oficial para enviar, alterar e selecionar miniaturas personalizadas no computador e celular."
            }
        ],
        "contentSections": [
            {
                "heading": "1. Verificação por telefone: desbloqueio de miniaturas personalizadas",
                "body": "Para poder enviar miniaturas personalizadas, seu canal deve ter a verificação por número de telefone concluída. Sem isso, o YouTube só permite escolher entre três imagens automáticas do vídeo. Vá em Configurações no YouTube Studio > Canal > Qualificação para recursos e conclua a verificação por SMS.",
                "keyTakeaway": "Conclua a verificação por telefone no YouTube Studio para liberar o envio de miniaturas personalizadas."
            },
            {
                "heading": "2. Como mudar a miniatura no computador pelo YouTube Studio",
                "body": "Acesse o YouTube Studio no computador. Clique em \"Conteúdo\" no menu lateral e selecione o vídeo. Na seção \"Miniatura\" da página de detalhes, passe o mouse sobre a imagem atual, clique nos três pontos verticais e escolha \"Alterar\". Selecione seu arquivo 1280 × 720 e clique em \"Salvar\".",
                "keyTakeaway": "Em YouTube Studio > Conteúdo > Detalhes, clique nos três pontos da miniatura e escolha \"Alterar\"."
            },
            {
                "heading": "3. Como mudar a miniatura no aplicativo YouTube Studio para celular",
                "body": "Abra o app YouTube Studio no iOS ou Android. Toque em \"Conteúdo\", escolha o vídeo e toque no ícone de lápis (Editar). Toque no lápis no canto da miniatura, escolha \"Alterar\", selecione a foto da sua galeria e toque em \"Salvar\". Lembre-se do limite de 2 MB no celular.",
                "keyTakeaway": "Use o ícone de lápis no aplicativo YouTube Studio para atualizar sua miniatura de qualquer lugar."
            },
            {
                "heading": "4. Como escolher ou mudar a miniatura de YouTube Shorts",
                "body": "Os Shorts funcionam de forma diferente: não é possível enviar miniaturas personalizadas pelo computador para Shorts já publicados. A imagem de capa deve ser escolhida durante o envio no app móvel do YouTube, tocando no ícone de lápis na pré-visualização do vídeo.",
                "keyTakeaway": "Escolha a imagem de capa do Short durante o envio pelo celular; o YouTube não permite alteração via computador após a publicação."
            },
            {
                "heading": "5. Especificações técnicas: 1280×720 e compressão abaixo de 2 MB",
                "body": "Para máxima nitidez, crie sua arte em 1280 × 720 pixels (16:9) usando o Redimensionador de Miniaturas Creovly. Certifique-se de que o arquivo tenha menos de 2 MB com o Compressor de Miniaturas Creovly para evitar falhas no envio móvel.",
                "keyTakeaway": "Formate em 1280 × 720 e comprima abaixo de 2 MB antes do envio."
            }
        ],
        "workedExample": {
            "title": "Troca de miniatura com baixo CTR para aumentar visualizações",
            "scenario": "Um vídeo publicado há 48 horas tem taxa de cliques baixa de 2,1%. O criador faz uma nova capa com maior contraste e texto chamativo e quer substituir a imagem sem perder métricas.",
            "steps": [
                "Exportar nova arte: 1280 × 720 pixels em formato JPG.",
                "Comprimir para menos de 2 MB: Reduzir tamanho para 510 KB usando o compressor Creovly.",
                "Abrir YouTube Studio: Acessar Conteúdo e clicar nos detalhes do vídeo.",
                "Substituir a imagem: Clicar nos três pontos da miniatura, selecionar \"Alterar\", escolher o novo arquivo e salvar.",
                "Acompanhar resultados: Monitorar a taxa de cliques (CTR) no Analytics pelas próximas 72 horas."
            ],
            "conclusion": "A nova miniatura entra no ar imediatamente nas buscas e recomendações sem resetar contagens de visualizações ou comentários."
        },
        "checklist": [
            {
                "title": "Verificação por telefone",
                "detail": "Confirmar recurso intermediário liberado no YouTube Studio."
            },
            {
                "title": "Dimensões recomendadas",
                "detail": "1280 × 720 pixels na proporção 16:9."
            },
            {
                "title": "Arquivo abaixo de 2 MB",
                "detail": "Garantir compatibilidade com o app móvel."
            },
            {
                "title": "Formato JPG ou PNG",
                "detail": "Usar perfil de cores sRGB."
            },
            {
                "title": "Salvar e conferir",
                "detail": "Salvar alterações e checar a exibição na página pública do vídeo."
            }
        ],
        "faqs": [
            {
                "question": "Posso mudar a miniatura de um vídeo do YouTube depois de publicado?",
                "answer": "Sim, a qualquer momento. Entre no YouTube Studio, acerte os detalhes do vídeo, clique no menu de três pontos da miniatura, selecione Alterar, suba o novo arquivo e salve."
            },
            {
                "question": "É possível mudar a miniatura de um Short do YouTube já publicado?",
                "answer": "Atualmente não é possível enviar miniaturas personalizadas pelo computador em Shorts já publicados. A capa deve ser selecionada no app móvel durante o envio."
            },
            {
                "question": "Por que não consigo enviar miniaturas personalizadas no YouTube?",
                "answer": "O envio de miniaturas personalizadas exige a verificação por número de telefone nas configurações do canal. Canais não verificados só podem usar miniaturas automáticas."
            }
        ]
    },

  },

  ko: {
    'youtube-thumbnail-blueprint': {
      title: '유튜브 썸네일 크기: 1280×720, 2MB 제한과 CTR 팁',
      category: '비주얼 패키징',
      readTime: '6분 분량',
      description: '유튜브 썸네일 크기는 1280×720 픽셀, 비율 16:9, 2MB 미만, JPG·PNG·GIF 형식입니다. 공식 제한, 안전 영역, 리사이즈와 압축 방법을 안내합니다.',
      officialSources: [
        {
          label: 'YouTube 고객센터: 동영상 썸네일 추가',
          description: '해상도, 화면비, 지원 형식 및 업로드 용량 한도에 관한 YouTube 공식 규격.',
        },
      ],
      contentSections: [
        {
          heading: '1. 2026년 유튜브 썸네일 크기: 공식 해상도 및 파일 용량 제한',
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
          question: "유튜브에서 RPM이란 무엇인가요?",
          answer: "유튜브 RPM(1,000회 조회당 수익)은 유튜브의 45% 플랫폼 수수료를 공제한 후, 광고, YouTube Premium, 채널 멤버십, Super Chat 등 모든 수익원에서 크리에이터가 1,000회 조회수당 실제로 벌어들이는 순수익을 나타내는 지표입니다. 공식 계산 공식은: RPM = (예상 총 수익 / 총 조회수) × 1,000 입니다.",
        },
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
    'how-much-does-youtube-pay-per-1000-views': {
      title: '유튜브 조회수 1,000회당 수익은 얼마일까? (2026년 단가 분석)',
      seoTitle: '유튜브 조회수 1,000회당 수익 단가 안내',
      category: '수익 창출 및 경제',
      readTime: '7분 읽기',
      description:
        '유튜브 조회수 1,000회당 실제 수익과 단가를 분석합니다. 분야별 RPM 차이, 쇼츠 수익 구조, 광고 CPM과 크리에이터 순수익 계산법.',
      officialSources: [
        {
          label: 'YouTube 고객센터: YouTube 분석 측정항목 이해하기(RPM)',
          description:
            '크리에이터의 실질 순수익 지표인 RPM, 수익 창출 재생 횟수 및 배분 계산에 관한 공식 안내.',
        },
        {
          label: 'YouTube 고객센터: YouTube 파트너 프로그램 개요 및 수익 창출 정책',
          description:
            '광고 수익 55/45 배분 기준, YPP 가입 조건 및 수익 창출 관련 공식 가이드라인.',
        },
      ],
      contentSections: [
        {
          heading: '1. 유튜브 조회수 1,000회당 평균 수익은 얼마인가요?',
          body: '일반적인 롱폼(긴 동영상) 기준, 유튜브 조회수 1,000회당 크리에이터가 실제로 수령하는 순수익(RPM)은 평균 2,500원〜15,000원(약 2.00〜12.00달러) 선입니다. 이 수치는 콘텐츠 주제에 따라 극명하게 달라집니다. 재테크, 주식, 부동산, B2B 소프트웨어 등 금융 및 비즈니스 분야는 1,000회당 20,000원〜50,000원(15〜35달러 이상)까지 치솟기도 합니다. 반면 일반 예능, 일상 브이로그, 게임 하이라이트 등은 1,500원〜5,000원 수준을 형성합니다. 유튜브 쇼츠(Shorts)의 경우 전 세계 풀링 배분 방식으로 인해 단가가 훨씬 낮아 1,000회당 약 25원〜90원(0.02〜0.07달러) 정도에 머뭅니다.',
          keyTakeaway: '대부분의 롱폼 영상은 1,000회당 2,500원〜15,000원, 쇼츠는 25원〜90원 수준의 수익을 창출합니다.',
        },
        {
          heading: '2. 광고주 CPM vs 크리에이터 RPM: 왜 지급액에 차이가 날까요?',
          body: '많은 초보 유튜버들이 광고주의 CPM(1,000회 광고 노출당 비용)과 크리에이터의 RPM(1,000회 영상 조회당 수익)을 혼동합니다. CPM은 기업이 유튜브에 지불하는 총 광고비이며, 여기서 유튜브가 45%의 플랫폼 수수료를 차감하고 남은 55%를 크리에이터에게 지급합니다. 또한 애드블록 사용자나 광고 미노출 시청으로 인해 전체 조회수보다 광고 재생수가 적습니다. 반면 RPM은 YouTube Premium 배분금과 채널 멤버십을 포함해 실제 영상 총 조회수 1,000회당 정산되는 진짜 순수익을 나타냅니다. Creovly의 유튜브 RPM 계산기로 정확한 단가를 계산해 보세요.',
          keyTakeaway: 'CPM은 광고주의 지출 총액이고, RPM은 내 통장에 들어오는 실수령액입니다. 스튜디오 RPM에서 45%를 중복 차감하지 마세요.',
        },
        {
          heading: '3. 1,000회당 수익을 결정짓는 핵심 5대 요소',
          body: '조회수 단가를 결정하는 5대 요소는 다음과 같습니다: (1) 시청자 국적 및 지역: 미국, 영국, 한국 등 광고비 집행이 활발한 국가의 시청자는 개발도상국 대비 몇 배에서 10배 이상 높은 단가를 만듭니다. (2) 콘텐츠의 상업적 가치: 금융, IT 툴 등 구매력이 연결되는 키워드는 광고주 간 입찰 경쟁을 촉발합니다. (3) 영상 길이와 중간 광고(미드롤): 8분 이상의 영상은 영상 중간에 광고를 추가 배치할 수 있어 1회 시청당 광고 노출이 배가됩니다. (4) 시청 연령대: 경제력을 갖춘 20~50대 타깃 영상이 미성년자 타깃 영상보다 단가가 높습니다. (5) 계절성: 연말 소비 시즌인 4분기(10~12월)에는 광고비가 1월 대비 최대 2배까지 상승합니다.',
          keyTakeaway: '시청자 국가, 상업적 키워드 선정, 8분 이상의 동영상 구성이 RPM을 극대화하는 가장 강력한 수단입니다.',
        },
        {
          heading: '4. 분야별 RPM 추정치: 금융, IT, 게임, 일상 브이로그 비교',
          body: '분야별 1,000회당 예상 수익 범위는 다음과 같습니다: (1) 재테크, 주식, 암호화폐: 15,000원〜45,000원 이상; (2) 프로그래밍, IT 리뷰, 개발: 8,000원〜25,000원; (3) 비즈니스, 창업, 마케팅: 9,000원〜30,000원; (4) 어학, 교육, 자기계발: 5,000원〜13,000원; (5) 헬스, 피트니스, 건강: 4,000원〜10,000원; (6) 일상, 브이로그, 여행: 2,000원〜6,000원; (7) 게임 실황, e스포츠: 1,500원〜4,500원; (8) 유머, 엔터테인먼트: 1,500원〜4,000원. Creovly의 유튜브 수익 계산기로 목표 조회수별 월수익을 확인해 보세요.',
          keyTakeaway: '상업적 거래가 수반되는 전문 지식 채널은 단순 오락 채널 대비 조회수당 5~10배 이상의 수익을 냅니다.',
        },
        {
          heading: '5. 조회수 구간별 수익 시뮬레이션: 1천 회부터 100만 회까지',
          body: '조회수 규모별 현실적인 수익 지표: 1,000회＝2,500원〜15,000원(롱폼) / 약 25원〜90원(쇼츠). 1만 회＝25,000원〜150,000원(롱폼) / 약 250원〜900원(쇼츠). 10만 회＝25만 원〜150만 원(롱폼) / 약 2,500원〜9,000원(쇼츠). 100만 회＝250만 원〜1,500만 원 이상(롱폼) / 약 2만 5천 원〜9만 원(쇼츠). 광고 외에도 브랜드 협찬, 제휴 마케팅, 멤버십 등 복합 수익 모델을 설계하려면 유튜브 수익화 계산기를 활용하세요.',
          keyTakeaway: '롱폼 100만 회는 보통 250만~1,500만 원 이상의 수익을 창출하지만, 쇼츠 100만 회는 수만 원대에 그칩니다.',
        },
      ],
      workedExample: {
        title: '수익 비교: 개발 강좌 채널 vs 게임 하이라이트 채널',
        scenario:
          '두 크리에이터가 각각 12분 길이의 영상을 업로드하여 30일 동안 나란히 25만 회 조회를 달성했습니다. 크리에이터 A는 직장인 대상 소프트웨어 튜토리얼을 제작하고, 크리에이터 B는 젊은 층 대상 배틀로얄 게임 하이라이트를 게시했습니다.',
        steps: [
          '크리에이터 A(개발 강의) 분석: IT 소프트웨어 기업들의 높은 광고 입찰가로 순 RPM 12,000원 달성. 총수익: (250,000 / 1,000) × 12,000원 = 3,000,000원.',
          '크리에이터 B(게임 영상) 분석: 폭넓은 저연령층과 범용 광고로 순 RPM 2,800원 기록. 총수익: (250,000 / 1,000) × 2,800원 = 700,000원.',
          '수익 격차 분석: 정확히 같은 25만 조회수를 기록했음에도, 구매력이 높은 타깃층을 보유한 크리에이터 A가 2,300,000원(4.2배 이상)을 더 벌었습니다.',
        ],
        conclusion:
          '단순 조회수보다 시청자의 구매력과 타깃 키워드의 상업성이 1,000회당 실수령액을 극적으로 좌우합니다.',
      },
      checklist: [
        {
          title: '스튜디오의 28일 기준 실제 RPM 확인',
          detail: '단순 추측 대신 유튜브 스튜디오 > 분석 > 수익 탭에서 최근 28일간의 실제 RPM 지표를 확인하세요.',
        },
        {
          title: '중간 광고 삽입을 위해 영상 8분 이상 기획',
          detail: '자연스러운 흐름의 전환점에 수동 미드롤 광고를 배치할 수 있도록 롱폼 콘텐츠를 8분 이상으로 구성하세요.',
        },
        {
          title: '상업적 검색 의도를 지닌 키워드 공략',
          detail: '도구 비교, 소프트웨어 추천, 실전 튜토리얼 등 광고주들이 높은 입찰가를 책정하는 주제를 기획하세요.',
        },
        {
          title: '쇼츠와 롱폼의 전략적 역할 분담',
          detail: '쇼츠로 채널 인지도와 구독자를 끌어모으고, 안정적인 광고 수익은 롱폼 영상으로 전환해 회수하세요.',
        },
        {
          title: '브라우저 환경에서 안전하게 수익 시뮬레이션',
          detail: '개인 분석 데이터를 서버에 업로드하지 않고 Creovly의 로컬 계산기를 통해 안전하게 목표를 계획하세요.',
        },
      ],
      faqs: [
        {
          question: '유튜브 조회수 1,000회당 얼마를 버나요?',
          answer:
            '일반적인 롱폼 영상 기준 1,000회당 약 2,500원〜15,000원(2~12달러) 선입니다. 금융, 재테크, IT 등 고단가 분야는 20,000원~40,000원 이상도 가능하며, 쇼츠는 약 25원~90원 수준입니다.',
        },
        {
          question: '유튜브 조회수 100만 회 수익은 얼마인가요?',
          answer:
            '롱폼 영상 100만 회는 보통 250만 원에서 1,500만 원 이상의 광고 수입을 올립니다. 고수익 분야에서는 2,000만 원을 넘기도 합니다. 반면 쇼츠 100만 회는 약 2만 5천 원~9만 원 선에 그칩니다.',
        },
        {
          question: '유튜브 CPM과 RPM의 차이는 무엇인가요?',
          answer:
            'CPM은 광고주가 1,000회 광고 표시에 지불한 총비용(수수료 차감 전)입니다. RPM은 유튜브 수수료 45%를 제외하고 Premium 수익 등을 더해 크리에이터가 실제로 손에 쥐는 1,000회당 순수익입니다.',
        },
        {
          question: '유튜브는 모든 조회수에 대해 수익을 주나요?',
          answer:
            '아닙니다. 광고가 실제로 송출된 재생이나 YouTube Premium 구독자가 시청한 경우에만 수익이 발생합니다. 보통 전체 조회의 40%~70% 정도가 수익 창출 대상입니다.',
        },
        {
          question: '유튜브 채널의 RPM 단가를 높이려면 어떻게 해야 하나요?',
          answer:
            '재테크, IT, 비즈니스 등 상업적 가치가 높은 주제를 다루고, 8분 이상의 영상으로 미드롤 광고를 배치하며, 구매력 있는 성인 시청자층을 확보해야 합니다.',
        },
      ],
    },
    'youtube-banner-size': {
        "title": "유튜브 배너 사이즈: 권장 규격, 안전 영역 및 템플릿 가이드",
        "seoTitle": "유튜브 배너 사이즈: 권장 규격 및 안전 영역",
        "category": "채널 브랜딩",
        "readTime": "5분 읽기",
        "description": "공식 유튜브 배너 사이즈 완벽 가이드: 2560×1440 해상도, 스마트폰과 PC 공통 1235×338 중앙 안전 영역, 6MB 용량 제한 및 제작 템플릿.",
        "officialSources": [
            {
                "label": "YouTube 고객센터: 채널 브랜딩 관리하기",
                "description": "배너 이미지 권장 규격, 텍스트 및 로고를 위한 최소 안전 영역, 지원 파일 형식, 업로드 용량 한도 공식 사양."
            }
        ],
        "contentSections": [
            {
                "heading": "1. 권장 유튜브 배너 크기 및 해상도: 2560×1440",
                "body": "유튜브 공식 가이드라인에 따른 표준 채널 아트 배너 크기는 2560 × 1440 픽셀(16:9 비율)입니다. 업로드 가능한 최소 크기는 2048 × 1152 픽셀입니다. 전체 2560 × 1440 해상도로 제작해야 고해상도 모니터와 4K 스마트 TV에서도 선명하게 표시됩니다.",
                "keyTakeaway": "2560 × 1440(16:9) 캔버스 크기를 기준으로 작업하며 최소 2048 × 1152 픽셀 이상을 유지하세요."
            },
            {
                "heading": "2. 텍스트와 로고를 위한 중앙 안전 영역: 1235×338",
                "body": "유튜브 배너는 스마트폰, 태블릿, PC, 스마트 TV 등 기기에 따라 외곽이 잘려서 표시됩니다. 채널명, 핵심 문구, 로고, 인물 얼굴이 잘리지 않도록 모든 중요 콘텐츠는 중앙의 1235 × 338 픽셀 안전 영역 안에 배치해야 합니다.",
                "keyTakeaway": "핵심 텍스트와 로고는 반드시 중앙 1235 × 338 픽셀 안전 영역 내에 위치시키세요."
            },
            {
                "heading": "3. 최대 파일 크기 및 지원 이미지 형식: 6MB 이하",
                "body": "유튜브 배너 파일 용량은 최대 6MB로 제한됩니다. 지원 형식은 JPG, PNG, BMP, 정지 GIF입니다. 사진 중심의 배너는 압축된 JPG가 유리하며, 로고와 텍스트 위주의 그래픽은 선명한 PNG 형식을 권장합니다.",
                "keyTakeaway": "JPG 또는 PNG 형식으로 저장하고 파일 크기가 6MB 이하인지 확인하세요."
            },
            {
                "heading": "4. Creovly 리사이즈 도구로 배너 비율 맞추기",
                "body": "Creovly 유튜브 썸네일 리사이즈 도구를 이용하면 1235 × 338 안전 영역 가이드라인이 표시되어 모바일과 PC에서 어떻게 잘리는지 미리 확인하고 제작할 수 있습니다.",
                "keyTakeaway": "2560 × 1440 프리셋을 통해 모바일과 데스크톱 화면 잘림을 사전에 점검하세요."
            }
        ],
        "workedExample": {
            "title": "모바일 화면 잘림을 방지하기 위한 배너 중앙 안전 영역 정렬",
            "scenario": "2560×1440 크기로 배너를 제작했으나 스마트폰 유튜브 앱에서 채널 로고와 업로드 일정이 양옆으로 잘려 보이는 문제 해결.",
            "steps": [
                "모바일 노출 영역 확인: 스마트폰 유튜브 앱에서는 중앙 1235 × 338 픽셀 영역만 노출됩니다.",
                "텍스트 및 로고 재배치: 브랜드 로고와 주요 안내 문구를 중앙 1235 × 338 픽셀 안으로 이동합니다.",
                "전체 캔버스 배경 유지: TV 화면 대응을 위해 배경 패턴과 질감은 2560 × 1440 전체에 유지합니다.",
                "6MB 이하로 압축: Creovly 이미지 도구로 고화질을 유지하며 6MB 이하로 최적화하여 내보냅니다."
            ],
            "conclusion": "스마트폰 화면에서도 텍스트가 잘리지 않고 선명하게 표시되며 PC와 TV에서도 깔끔한 레이아웃을 완성했습니다."
        },
        "checklist": [
            {
                "title": "마스터 해상도 설정",
                "detail": "2560 × 1440 픽셀 (최소 2048 × 1152)."
            },
            {
                "title": "중앙 안전 영역 준수",
                "detail": "텍스트와 로고를 중앙 1235 × 338 픽셀 안에 배치."
            },
            {
                "title": "파일 용량 6MB 한도",
                "detail": "최종 이미지 파일 크기가 6MB 이하인지 확인."
            },
            {
                "title": "기기별 표시 점검",
                "detail": "업로드 후 모바일 앱과 PC 웹 브라우저에서 동시 확인."
            }
        ],
        "faqs": [
            {
                "question": "유튜브 배너의 공식 권장 사이즈는 몇 픽셀인가요?",
                "answer": "공식 권장 사이즈는 16:9 비율의 2560 × 1440 픽셀이며, 최소 업로드 가능 크기는 2048 × 1152 픽셀입니다."
            },
            {
                "question": "유튜브 배너의 안전 영역(Safe Area)이란 무엇인가요?",
                "answer": "안전 영역은 중앙의 1235 × 338 픽셀 공간입니다. 이 영역 안에 들어간 텍스트와 로고는 모바일, 태블릿, PC, TV 등 모든 기기에서 잘리지 않고 표시됩니다."
            },
            {
                "question": "배너 이미지의 최대 파일 크기는 얼마인가요?",
                "answer": "파일 크기는 6MB 이하여야 하며, JPG, PNG, BMP 또는 움직이지 않는 GIF 형식을 지원합니다."
            }
        ]
    },
    'youtube-monetization-requirements': {
        "title": "유튜브 수익 창출 조건 완벽 해설 (구독자·시청 시간·쇼츠)",
        "seoTitle": "유튜브 수익 창출 조건 완벽 해설",
        "category": "수익 창출",
        "readTime": "7분 읽기",
        "description": "유튜브 파트너 프로그램(YPP) 수익 창출 요건 총정리: 500명 및 1,000명 구독자 기준, 시청 시간 4,000시간, 쇼츠 1,000만 회 및 승인 정책.",
        "officialSources": [
            {
                "label": "YouTube 고객센터: YouTube 파트너 프로그램 개요 및 자격 요건",
                "description": "YPP 가입 자격 기준, 구독자 수 및 시청 시간 목표, 채널 수익 창출 정책 공식 안내."
            },
            {
                "label": "YouTube 고객센터: YouTube Shorts로 수익 창출하기",
                "description": "세로형 쇼츠 피드 광고 수익 크리에이터 풀 분배에 관한 공식 정책."
            }
        ],
        "contentSections": [
            {
                "heading": "1. 유튜브 파트너 프로그램(YPP) 2단계 승인 기준",
                "body": "유튜브는 2단계의 YPP 가입 기준을 제공합니다. 1단계(팬 후원 조기 이용)는 Super Thanks, Super Chat, 채널 멤버십, 쇼핑 기능을 지원합니다. 조건은「구독자 500명」「최근 90일간 공개 동영상 3편 이상」「최근 12개월간 공개 시청 시간 3,000시간 또는 최근 90일간 쇼츠 300만 회」입니다. 2단계(광고 수익 완전 개방)는 동영상 및 쇼츠 광고 수익을 제공하며, 조건은「구독자 1,000명」과「공개 시청 시간 4,000시간 또는 쇼츠 1,000만 회」입니다.",
                "keyTakeaway": "500명·3,000시간에서 팬 후원 기능이 열리고, 정규 광고 수익은 1,000명·4,000시간이 필요합니다."
            },
            {
                "heading": "2. 유효한 공개 시청 시간과 제외 대상 시간",
                "body": "4,000시간 기준에는 롱폼 동영상의「유효한 공개 시청 시간」만 반영됩니다. 쇼츠 피드에서 발생한 시청 시간은 4,000시간에 합산되지 않습니다(쇼츠는 90일간 1,000만 회의 별도 경로로 인정). 또한 비공개, 일부 공개, 삭제된 영상 및 Google Ads 광고 유입 시청 시간도 제외됩니다.",
                "keyTakeaway": "최근 365일 연속 기간 동안 자연 발생한 공개 롱폼 동영상의 시청 시간만 인정됩니다."
            },
            {
                "heading": "3. 계정 보안 및 커뮤니티 가이드라인 준수 필수 요건",
                "body": "구독자와 시청 시간 외에도 Google 계정의「2단계 인증 활성화」, 유효한「Google AdSense 계정 연결」, 채널에 활성 상태의「커뮤니티 가이드라인 경고가 없을 것」이 필수 조건입니다.",
                "keyTakeaway": "2단계 인증을 켜고, AdSense를 연결하며, 정책 위반 경고가 없는 채널 상태를 유지하세요."
            },
            {
                "heading": "4. Creovly 계산기로 달성 일정 시뮬레이션하기",
                "body": "평균 시청 지속 시간을 기반으로 4,000시간 도달 예상 시점을 Creovly「유튜브 시청 시간 계산기」로 예측할 수 있습니다. 또한 광고와 멤버십 예상 수입은「유튜브 수익 계산기」로 시뮬레이션할 수 있습니다.",
                "keyTakeaway": "막연한 추측 대신 계산기를 사용하여 필요한 주간 업로드 수와 조회수 목표를 수립하세요."
            }
        ],
        "workedExample": {
            "title": "시청 시간 4,000시간 목표 달성을 위한 업로드 계획",
            "scenario": "구독자 850명, 시청 시간 2,400시간을 보유한 크리에이터가 12개월 경과로 이전 시간이 소멸되기 전에 남은 1,600시간을 달성하기 위한 계획.",
            "steps": [
                "남은 시간 계산: 목표 4,000시간 − 현재 2,400시간 = 필요 시간 1,600시간.",
                "필요 조회수 산출: 영상당 평균 시청 시간이 4분(0.067시간)인 경우, 1,600 ÷ 0.067 = 약 24,000회 조회수 필요.",
                "업로드 속도 수립: 평균 2,000회 조회수를 기록하는 영상을 주 2회 업로드하면 월 16,000회(약 1,067시간) 축적 가능.",
                "계정 조건 점검: 2단계 인증 활성화 및 커뮤니티 경고 0건을 Studio에서 확인."
            ],
            "conclusion": "이 속도를 유지하면 약 6~7주 만에 4,000시간 목표를 달성하여 정규 광고 수익 창출을 신청할 수 있습니다."
        },
        "checklist": [
            {
                "title": "구독자 수 목표",
                "detail": "500명(팬 후원 기능) 또는 1,000명(광고 수익 공유)."
            },
            {
                "title": "시청 시간 또는 쇼츠 조회수",
                "detail": "최근 12개월간 4,000시간 또는 최근 90일간 쇼츠 1,000만 회."
            },
            {
                "title": "Google 계정 2단계 인증",
                "detail": "채널 관리 계정의 보안 2단계 인증 켜기."
            },
            {
                "title": "Google AdSense 계정 연동",
                "detail": "수익 정산을 위한 승인된 AdSense 계정 연결."
            },
            {
                "title": "커뮤니티 경고 0건",
                "detail": "활성 상태의 커뮤니티 가이드라인 경고가 없어야 함."
            }
        ],
        "faqs": [
            {
                "question": "유튜브 수익 창출 자격 요건은 무엇인가요?",
                "answer": "완전한 광고 수익 창출을 위해서는 구독자 1,000명과 최근 12개월간 4,000시간의 유효 공개 시청 시간(또는 90일간 쇼츠 1,000만 회)이 필요합니다. 팬 후원 기능은 500명·3,000시간부터 지원됩니다."
            },
            {
                "question": "유튜브 쇼츠 시청 시간도 4,000시간에 포함되나요?",
                "answer": "아닙니다. 쇼츠 피드의 시청 시간은 4,000시간에 합산되지 않습니다. 쇼츠는 90일간 1,000만 회 조회수라는 독립적인 기준으로 평가됩니다."
            },
            {
                "question": "4,000시간은 언제부터 언제까지의 기록인가요?",
                "answer": "항상 직전 365일 연속 기간을 기준으로 집계됩니다. 1년이 지난 과거 시청 시간은 집계 대상에서 자동으로 제외됩니다."
            }
        ]
    },
    'how-to-change-youtube-thumbnail': {
        "title": "유튜브 썸네일 변경 방법: 단계별 가이드 (PC & 모바일)",
        "seoTitle": "유튜브 썸네일 변경 방법 (단계별 안내)",
        "category": "비ジュアル 패키징",
        "readTime": "5분 읽기",
        "description": "유튜브 썸네일 변경 및 설정 방법 가이드: PC 유튜브 스튜디오, 모바일 앱, 전화번호 인증을 통한 맞춤 썸네일 활성화, 쇼츠 썸네일 지정법.",
        "officialSources": [
            {
                "label": "YouTube 고객센터: 동영상 썸네일 추가 또는 변경하기",
                "description": "PC 및 모바일 기기에서 맞춤 동영상 썸네일을 업로드, 변경 및 선택하는 공식 안내."
            }
        ],
        "contentSections": [
            {
                "heading": "1. 전화번호 인증: 맞춤 썸네일 업로드 기능 활성화",
                "body": "원하는 이미지로 맞춤 썸네일을 업로드하려면 채널의「전화번호 인증(중급 기능)」이 완료되어 있어야 합니다. 미인증 상태에서는 동영상에서 자동 추출된 3장의 스틸컷 중에서만 선택할 수 있습니다. 유튜브 스튜디오 설정 > 채널 > 기능 사용 자격에서 SMS 인증을 진행하세요.",
                "keyTakeaway": "유튜브 스튜디오 설정에서 전화번호 인증을 마쳐야 맞춤 썸네일 등록이 가능합니다."
            },
            {
                "heading": "2. PC 유튜브 스튜디오에서 썸네일 변경하는 방법",
                "body": "컴퓨터에서 유튜브 스튜디오에 접속합니다. 왼쪽 메뉴의「콘텐츠」에서 수정할 영상을 클릭합니다.「동영상 세부정보」페이지의「썸네일」영역에 마우스를 올리고 3점 아이콘을 눌러「변경」을 선택한 뒤, 새 1280×720 이미지를 선택하고 오른쪽 상단의「저장」을 누릅니다.",
                "keyTakeaway": "YouTube Studio > 콘텐츠 > 세부정보에서 썸네일의 3점 메뉴를 눌러「변경」을 선택하세요."
            },
            {
                "heading": "3. 모바일 유튜브 스튜디오 앱에서 썸네일 변경하는 방법",
                "body": "스마트폰에서 YouTube Studio 앱을 실행합니다.「콘텐츠」에서 영상을 탭하고 상단의 연필 아이콘(수정)을 누릅니다. 썸네일 미리보기 좌측 상단의 연필 아이콘을 누른 뒤「변경」을 탭하여 갤러리의 새 이미지를 선택하고 저장합니다. 모바일에서는 2MB 용량 제한이 적용됩니다.",
                "keyTakeaway": "모바일 Studio 앱의 연필 아이콘을 이용하면 이동 중에도 간편하게 썸네일을 교체할 수 있습니다."
            },
            {
                "heading": "4. 유튜브 쇼츠(Shorts) 썸네일 지정 및 변경 방법",
                "body": "쇼츠 영상은 일반 동영상과 방식이 다릅니다. 현재 이미 공개된 쇼츠 영상은 PC에서 맞춤 썸네일로 교체할 수 없습니다. 모바일 유튜브 앱에서 쇼츠를 업로드하는 과정에서 미리보기 화면의 연필 아이콘을 눌러 영상 내 최고의 프레임을 썸네일로 직접 지정해야 합니다.",
                "keyTakeaway": "쇼츠 썸네일은 모바일 앱 업로드 시점에 지정해야 합니다(게시 후 PC 교체 불가)."
            },
            {
                "heading": "5. 기술 사양: 1280×720 규격 및 2MB 이하 압축",
                "body": "선명한 노출을 위해 Creovly 썸네일 리사이즈 도구로 1280 × 720(16:9) 비율을 맞추고, Creovly 썸네일 압축 도구로 2MB 이하로 용량을 줄여 업로드하세요. 모바일 업로드 시 발생할 수 있는 오류를 사전에 차단할 수 있습니다.",
                "keyTakeaway": "1280 × 720 픽셀로 맞추고 2MB 이하로 용량을 압축한 뒤 업로드하세요."
            }
        ],
        "workedExample": {
            "title": "클릭률(CTR) 개선을 위한 부진 썸네일 교체 실전 예시",
            "scenario": "게시 후 48시간 동안 CTR이 2.1%로 저조하여, 대비와 텍스트 전달력을 높인 새 썸네일로 교체하고 통계 손실 없이 노출을 개선하는 사례.",
            "steps": [
                "새 이미지 제작: 1280 × 720 픽셀, JPG 형식으로 새 썸네일 내보내기.",
                "2MB 이하로 압축: Creovly 압축기를 이용해 510KB로 용량 최적화.",
                "YouTube Studio 접속: 콘텐츠 목록에서 해당 영상의 세부정보 열기.",
                "썸네일 교체: 3점 메뉴에서「변경」을 클릭하여 새 이미지 업로드 후 저장.",
                "성과 추적: 교체 후 72시간 동안 Studio 분석에서 노출 클릭률 추이 모니터링."
            ],
            "conclusion": "조회수, 댓글, 영상 링크에 아무런 영향 없이 검색 및 추천 피드에 즉각 새 썸네일이 적용되었습니다."
        },
        "checklist": [
            {
                "title": "전화번호 인증 확인",
                "detail": "YouTube Studio 채널 설정에서 중급 기능 인증 여부 확인."
            },
            {
                "title": "권장 해상도 규격",
                "detail": "16:9 비율의 1280 × 720 픽셀 준수."
            },
            {
                "title": "파일 용량 2MB 이하",
                "detail": "모바일 Studio 업로드 호환성을 위해 2MB 이하로 압축."
            },
            {
                "title": "JPG 또는 PNG 형식",
                "detail": "일관된 색감 표현을 위해 sRGB 색상 프로필 사용."
            },
            {
                "title": "저장 후 노출 확인",
                "detail": "저장 후 실제 영상 시청 페이지에서 썸네일 반영 확인."
            }
        ],
        "faqs": [
            {
                "question": "업로드한 영상의 썸네일을 나중에 바꿀 수 있나요?",
                "answer": "네, 언제든지 변경할 수 있습니다. YouTube Studio 영상 세부정보에서 기존 썸네일의 3점 메뉴를 누르고「변경」을 선택하여 새 이미지를 올린 뒤 저장하면 됩니다."
            },
            {
                "question": "이미 게시된 유튜브 쇼츠의 썸네일도 변경할 수 있나요?",
                "answer": "현재 게시 완료된 쇼츠의 썸네일은 PC에서 교체할 수 없습니다. 업로드 시 스마트폰 앱에서 프레임을 지정해야 합니다."
            },
            {
                "question": "맞춤 썸네일이 업로드되지 않는 이유는 무엇인가요?",
                "answer": "채널의 전화번호 인증(중급 기능)이 완료되지 않은 경우 맞춤 이미지를 등록할 수 없습니다. 또한 파일 용량이 한도(모바일 2MB, PC 50MB)를 초과한 경우에도 등록되지 않습니다."
            }
        ]
    },

  },

  it: {
    'youtube-thumbnail-blueprint': {
      title: 'Dimensioni miniatura YouTube: 1280×720, limite 2 MB e CTR',
      seoTitle: 'Miniature YouTube: dimensioni, limiti e CTR',
      category: 'Packaging visivo',
      readTime: '6 min di lettura',
      description: 'Le dimensioni di una miniatura YouTube sono 1280×720 pixel in 16:9, meno di 2 MB, in JPG, PNG o GIF. Limiti ufficiali, zone sicure e come ridimensionare o comprimere.',
      officialSources: [
        {
          label: 'Guida di YouTube: Aggiungere miniature dei video',
          description: 'Specifiche ufficiali di YouTube su risoluzione, proporzioni, formati supportati e limiti di caricamento.',
        },
      ],
      contentSections: [
        {
          heading: '1. Dimensioni miniatura YouTube nel 2026: misure ufficiali e peso massimo',
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
          question: "Che cos'è l'RPM su YouTube?",
          answer: "L'RPM (Entrate per mille) su YouTube è la metrica che indica quanto guadagno netto reale ottiene un creator per ogni 1.000 visualizzazioni totali attraverso tutte le fonti di monetizzazione (annunci, YouTube Premium, abbonamenti, Super Chat) dopo il 45% di quota trattenuta da YouTube. La formula ufficiale è: RPM = (Entrate Totali Stimate / Visualizzazioni Totali) × 1.000.",
        },
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
    'how-much-does-youtube-pay-per-1000-views': {
      title: 'Quanto Paga YouTube per 1.000 Visualizzazioni? (Guida e RPM 2026)',
      seoTitle: 'Quanto Paga YouTube per 1.000 Visualizzazioni?',
      category: 'Monetizzazione ed Economia',
      readTime: '7 min di lettura',
      description:
        'Scopri quanto paga YouTube per 1.000 visualizzazioni in base alla nicchia, video lunghi vs Shorts, RPM netto e come calcolare le tue entrate.',
      officialSources: [
        {
          label: 'Guida di YouTube: Informazioni sulle metriche di YouTube Analytics (RPM)',
          description:
            'Definizione ufficiale del parametro RPM per i creator, riproduzioni monetizzate e calcolo dei guadagni netti.',
        },
        {
          label: 'Guida di YouTube: Panoramica e norme del Programma partner di YouTube',
          description:
            'Termini ufficiali di ripartizione delle entrate pubblicitarie, soglie di idoneità YPP e split 55/45.',
        },
      ],
      contentSections: [
        {
          heading: '1. Quanto paga YouTube per 1.000 visualizzazioni in media?',
          body: 'In media, YouTube corrisponde ai creator tra 2,00 € e 12,00 € ogni 1.000 visualizzazioni per video lunghi tradizionali nei mercati a forte inserzionismo (come Italia, Germania, Regno Unito e Stati Uniti). Questo parametro è noto come RPM netto (Entrate per mille visualizzazioni). Le cifre variano sensibilmente in base alla categoria: settori commerciali come finanza personale, software B2B, investimenti e immobiliare possono registrare RPM compresi tra 15,00 € e oltre 35,00 € per 1.000 views. Al contrario, canali di intrattenimento, vlog o videogiochi si attestano in genere tra 1,50 € e 4,50 €. Per quanto riguarda i YouTube Shorts, il modello a pool condiviso genera compensi sensibilmente inferiori, compresi tra 0,02 € e 0,07 € per 1.000 visualizzazioni.',
          keyTakeaway: 'La maggior parte dei video lunghi genera tra 2 € e 12 € per 1.000 visualizzazioni, mentre gli Shorts rendono da 0,02 € a 0,07 € ogni mille views.',
        },
        {
          heading: '2. CPM vs RPM: perché gli inserzionisti spendono più di quanto ricevi',
          body: 'Molti creator confondono il CPM dell’inserzionista con l’RPM del creator. Il CPM rappresenta l’importo lordo che un’azienda paga a YouTube per 1.000 impressioni pubblicitarie. Il creator non riceve l’intera cifra: YouTube trattiene il 45% sui video standard e versa il restante 55%. Inoltre, non tutti i passaggi mostrano annunci (adblocker, limiti di inventario locale). L’RPM misura il guadagno netto reale sul tuo conto per ogni 1.000 visualizzazioni totali di video, includendo anche YouTube Premium e gli abbonamenti al canale. Calcola la tua tariffa effettiva con il Calcolatore RPM di YouTube.',
          keyTakeaway: 'Il CPM è la spesa lorda dell’azienda inserzionista; l’RPM è il tuo guadagno netto reale per 1.000 views totali. Non sottrarre il 45% due volte.',
        },
        {
          heading: '3. I principali fattori che determinano il compenso per 1.000 visualizzazioni',
          body: 'Cinque fattori chiave determinano il tuo RPM: (1) Posizione geografica del pubblico: spettatori residenti in nazioni con alta spesa pubblicitaria fruttano fino a dieci volte di più rispetto a mercati emergenti. (2) Nicchia di contenuto e intento d’acquisto: argomenti ad alto valore transazionale (finanza, software professionale, corsi) generano aste pubblicitarie molto competitive. (3) Durata del video e annunci mid-roll: video oltre gli 8 minuti consentono di inserire annunci a metà riproduzione. (4) Fascia d’età della community: utenti adulti (25–54 anni) con reddito disponibile attraggono inserzioni più ricche. (5) Stagionalità: nel quarto trimestre (ottobre-dicembre), i budget pubblicitari raddoppiano spesso le tariffe per il periodo natalizio.',
          keyTakeaway: 'Paese di visione, argomenti ad alta intenzione d’acquisto e video sopra gli 8 minuti sono le leve più decisive per massimizzare l’RPM.',
        },
        {
          heading: '4. Compensi stimati per nicchia: finanza, tecnologia, gaming e vlog',
          body: 'I budget degli inserzionisti cambiano radicalmente tra generi: (1) Finanza personale, crypto e investimenti: 12,00 € a 35,00 €+; (2) Software, recensioni tech e programmazione: 6,00 € a 18,00 €; (3) Business e marketing online: 7,00 € a 22,00 €; (4) Istruzione, carriera e tutorial: 4,00 € a 10,00 €; (5) Fitness e salute: 3,00 € a 8,00 €; (6) Viaggi, lifestyle e vlog: 1,80 € a 4,50 €; (7) Gaming ed esport: 1,20 € a 3,50 €; (8) Comicità e intrattenimento: 1,20 € a 3,00 €. Puoi simulare le tue stime con il nostro Calcolatore di Guadagni YouTube.',
          keyTakeaway: 'I contenuti legati al mondo professionale e finanziario rendono da 5 a 10 volte più per visualizzazione rispetto all’intrattenimento generico.',
        },
        {
          heading: '5. Proiezione dei guadagni: da 1.000 a 1.000.000 di visualizzazioni',
          body: 'Comprendere la progressione matematica aiuta a stabilire traguardi raggiungibili: 1.000 visualizzazioni = 2,00 € a 12,00 € (lunghi) o 0,02 € a 0,07 € (Shorts). 10.000 visualizzazioni = 20,00 € a 120,00 € (lunghi) o 0,20 € a 0,70 € (Shorts). 100.000 visualizzazioni = 200,00 € a 1.200,00 € (lunghi) o 2,00 € a 7,00 € (Shorts). 1.000.000 di visualizzazioni = 2.000,00 € a 12.000,00 €+ (lunghi) o 20,00 € a 70,00 € (Shorts). Per stimare le entrate complessive comprensive di sponsor, affiliazioni e abbonamenti, utilizza il Calcolatore di Monetizzazione YouTube.',
          keyTakeaway: '1 milione di visualizzazioni su video lunghi frutta in genere da 2.000 € a 12.000 €+ netti, contro solo 20 € - 70 € circa su 1 milione di Shorts.',
        },
      ],
      workedExample: {
        title: 'Confronto ricavi: Tutorial di programmazione vs Highlights gaming',
        scenario:
          'Due creator pubblicano ciascuno un video da 12 minuti che ottiene esattamente 250.000 visualizzazioni nell’arco di 30 giorni. Il Creator A realizza tutorial di sviluppo software per professionisti. Il Creator B pubblica sintesi di videogiochi per un vasto pubblico giovane.',
        steps: [
          'Analisi Creator A (Tutorial software): La forte concorrenza tra aziende tech garantisce un RPM netto di 9,20 €. Guadagno complessivo: (250.000 / 1.000) × 9,20 € = 2.300,00 €.',
          'Analisi Creator B (Gaming): Un pubblico molto giovane e inserzioni generiche producono un RPM di 2,10 €. Guadagno complessivo: (250.000 / 1.000) × 2,10 € = 525,00 €.',
          'Confronto del divario: Pur registrando esattamente le medesime visualizzazioni (250.000 ciascuno), il Creator A ha incassato 1.775,00 € in più (oltre 4,3 volte tanto) grazie al valore economico del suo pubblico.',
        ],
        conclusion:
          'Il conteggio grezzo delle visualizzazioni è solo metà del quadro. L’intenzione d’acquisto del settore e il pubblico geografico moltiplicano il rendimento per mille views.',
      },
      checklist: [
        {
          title: 'Verifica l’RPM reale su YouTube Studio',
          detail: 'Apri YouTube Studio > Analytics > Entrate e controlla l’RPM effettivo degli ultimi 28 giorni invece di affidarti a stime generiche.',
        },
        {
          title: 'Struttura video oltre gli 8 minuti',
          detail: 'Pianifica video lunghi superiori a 8 minuti per consentire il posizionamento manuale di annunci mid-roll nelle pause naturali.',
        },
        {
          title: 'Usa parole chiave con intento commerciale',
          detail: 'Tratta recensioni di strumenti, software e guide pratiche che spingono le aziende a fare offerte elevate.',
        },
        {
          title: 'Differenzia la funzione di Shorts e video lunghi',
          detail: 'Usa la viralità degli Shorts per farti scoprire e porta quegli utenti sui video lunghi per generare entrate pubblicitarie solide.',
        },
        {
          title: 'Modella i tuoi scenari in locale',
          detail: 'Utilizza i calcolatori gratuiti di Creovly per pianificare le tue entrate in totale riservatezza senza caricare dati sensibili online.',
        },
      ],
      faqs: [
        {
          question: 'Quanto paga YouTube per 1.000 visualizzazioni?',
          answer:
            'La maggior parte dei creator guadagna tra 2,00 € e 12,00 € ogni 1.000 visualizzazioni sui video lunghi tradizionali. Nelle nicchie ad alto valore come la finanza si possono superare i 20,00 €, mentre gli Shorts pagano tra 0,02 € e 0,07 €.',
        },
        {
          question: 'Quanto si guadagna con 1 milione di visualizzazioni su YouTube?',
          answer:
            'Un milione di visualizzazioni su un video lungo genera solitamente tra 2.000 € e 12.000 € di ricavi pubblicitari netti. Nelle nicchie tech o business può superare i 20.000 €. Con i YouTube Shorts, 1 milione di visualizzazioni frutta solo 20 € - 70 € circa.',
        },
        {
          question: 'Qual è la differenza tra CPM e RPM su YouTube?',
          answer:
            'Il CPM è la spesa lorda pagata dall’inserzionista prima della commissione del 45% di YouTube. L’RPM è il tuo effettivo guadagno netto per 1.000 visualizzazioni totali, comprensivo di YouTube Premium e abbonamenti.',
        },
        {
          question: 'YouTube paga per tutte le visualizzazioni di un video?',
          answer:
            'No. YouTube remunera solo le visualizzazioni monetizzate in cui è stato effettivamente trasmesso un annuncio pubblicitario o quelle effettuate da abbonati a YouTube Premium. Di solito riguarda il 40% - 70% delle visualizzazioni.',
        },
        {
          question: 'Come aumentare il proprio RPM su YouTube?',
          answer:
            'Puoi aumentare il tuo RPM concentrandoti su argomenti commerciali (finanza, software, impresa), realizzando video oltre gli 8 minuti con annunci intermedi e attirando pubblico da Paesi ad alto potere d’acquisto.',
        },
      ],
    },
    'youtube-banner-size': {
        "title": "Dimensioni Banner YouTube: Misure, Safe Area e Modello",
        "seoTitle": "Dimensioni Banner YouTube: Misure e Safe Area",
        "category": "Branding del canale",
        "readTime": "5 min di lettura",
        "description": "Guida verificata alle dimensioni del banner YouTube: risoluzione 2560×1440, safe area centrale di 1235×338 per smartphone e PC, limite di 6 MB e modelli.",
        "officialSources": [
            {
                "label": "Guida di YouTube: Gestire il branding del canale",
                "description": "Specifiche ufficiali di YouTube per le dimensioni dell’immagine del banner, safe area minima per testi e loghi, formati supportati e limiti di caricamento."
            }
        ],
        "contentSections": [
            {
                "heading": "1. Dimensioni consigliate per il banner di YouTube: 2560×1440",
                "body": "In base alle specifiche ufficiali di YouTube, la dimensione standard per la copertina del canale è 2560 × 1440 pixel con proporzioni 16:9. La dimensione minima di caricamento è 2048 × 1152 pixel. Caricare l’immagine a 2560 × 1440 assicura la massima nitidezza sui display ad alta densità e sulle Smart TV 4K senza sgranature.",
                "keyTakeaway": "Usa una tela di 2560 × 1440 pixel (16:9) e almeno 2048 × 1152 pixel per l’accettazione."
            },
            {
                "heading": "2. Safe area centrale per testi e loghi: 1235×338",
                "body": "Poiché YouTube visualizza il banner su smartphone, tablet, computer e TV, l’inquadratura cambia in base al dispositivo. Per evitare che nome del canale, slogan, social o volti vengano tagliati, mantieni tutti i contenuti essenziali all’interno della safe area centrale di 1235 × 338 pixel.",
                "keyTakeaway": "Posiziona tutti i testi critici, i loghi e i punti focali nell’area sicura centrale di 1235 × 338."
            },
            {
                "heading": "3. Dimensione massima del file e formati supportati",
                "body": "YouTube impone un limite massimo di 6 MB per i banner. I formati supportati sono JPG, PNG, BMP e GIF non animate. Per grafiche fotografiche, un JPEG ottimizzato offre il miglior equilibrio tra peso e qualità. Per loghi e scritte vettoriali, usa il formato PNG.",
                "keyTakeaway": "Mantieni i file entro i 6 MB in formato JPG o PNG per caricare senza intoppi su YouTube Studio."
            },
            {
                "heading": "4. Formatta il tuo banner con il ridimensionatore Creovly",
                "body": "Puoi collaudare l’inquadratura con il Ridimensionatore di Miniature YouTube di Creovly. Il modello preimpostato 2560 × 1440 include una guida interattiva con la safe area centrale 1235 × 338 per controllare i tagli prima di pubblicare.",
                "keyTakeaway": "Sfrutta il preset 2560 × 1440 per verificare i margini di ritaglio su mobile e desktop."
            }
        ],
        "workedExample": {
            "title": "Centratura della copertina per evitare tagli su smartphone",
            "scenario": "Un creator realizza un banner 2560×1440. Su smartphone, il logo e i giorni di pubblicazione risultano tagliati perché posizionati fuori dalla safe area centrale.",
            "steps": [
                "Individuare la finestra mobile: L’app YouTube per smartphone mostra unicamente la fascia centrale di 1235 × 338 pixel.",
                "Riposizionare testi e loghi: Spostare il marchio e i testi all’interno del riquadro di 1235 × 338.",
                "Estendere lo sfondo completo: Mantenere texture ed effetti visivi su tutti i 2560 × 1440 pixel per gli schermi TV.",
                "Comprimere sotto i 6 MB: Esportare l’immagine finale in JPG ottimizzato sotto i 6 MB con Creovly."
            ],
            "conclusion": "Il banner visualizza chiaramente testi e loghi su mobile e si espande magnificamente su schermi di PC e TV."
        },
        "checklist": [
            {
                "title": "Risoluzione master tela",
                "detail": "2560 × 1440 pixel (minimo 2048 × 1152)."
            },
            {
                "title": "Safe area centrale",
                "detail": "Testi e loghi confinati entro i 1235 × 338 pixel centrali."
            },
            {
                "title": "Limite di peso 6 MB",
                "detail": "Verifica che il file finale pesi 6 MB o meno in JPG o PNG."
            },
            {
                "title": "Controllo multi-dispositivo",
                "detail": "Controlla l’aspetto sia sull’app mobile che sul browser web dopo il caricamento."
            }
        ],
        "faqs": [
            {
                "question": "Qual è la dimensione consigliata per il banner di YouTube?",
                "answer": "La dimensione ufficiale raccomandata è 2560 × 1440 pixel in formato 16:9, con dimensioni minime pari a 2048 × 1152 pixel."
            },
            {
                "question": "Cos’è la safe area del banner di YouTube?",
                "answer": "La safe area è il rettangolo centrale di 1235 × 338 pixel. Qualsiasi elemento collocato in questo spazio sarà visibile su telefoni, tablet, PC e televisori."
            },
            {
                "question": "Qual è il peso massimo consentito per il file del banner?",
                "answer": "Il file deve pesare al massimo 6 MB e può essere in formato JPG, PNG, BMP o GIF non animata."
            }
        ]
    },
    'youtube-monetization-requirements': {
        "title": "Requisiti di Monetizzazione YouTube Spiegati",
        "seoTitle": "Requisiti di Monetizzazione YouTube Spiegati",
        "category": "Monetizzazione",
        "readTime": "7 min di lettura",
        "description": "Panoramica chiara dei requisiti per monetizzare su YouTube: soglie di 500 e 1.000 iscritti, 4.000 ore di visualizzazione, 10M di visualizzazioni Shorts e norme YPP.",
        "officialSources": [
            {
                "label": "Guida di YouTube: Panoramica e idoneità per il Programma partner di YouTube",
                "description": "Criteri ufficiali per l’accesso a YPP, traguardi di iscritti e ore di visualizzazione, e norme sulla monetizzazione dei canali."
            },
            {
                "label": "Guida di YouTube: Monetizzare con YouTube Shorts",
                "description": "Linee guida ufficiali sulla condivisione dei ricavi pubblicitari generati dai video verticali nel feed di Shorts."
            }
        ],
        "contentSections": [
            {
                "heading": "1. I due livelli di accesso al Programma partner di YouTube (YPP)",
                "body": "YouTube prevede due livelli per il programma YPP. Il livello introduttivo (finanziamento dei fan) sblocca Super Grazie, Super Chat, Super Sticker, abbonamenti al canale e YouTube Shopping. Richiede: 500 iscritti, 3 caricamenti pubblici validi negli ultimi 90 giorni e 3.000 ore di visualizzazione pubbliche in 12 mesi o 3 milioni di visualizzazioni Shorts in 90 giorni. Il livello completo sblocca gli annunci sui video lunghi e su Shorts. Richiede: 1.000 iscritti e 4.000 ore di visualizzazione pubbliche in 12 mesi o 10 milioni di visualizzazioni Shorts in 90 giorni.",
                "keyTakeaway": "Puoi iniziare con il supporto dei fan a 500 iscritti e 3.000 ore; la monetizzazione pubblicitaria completa richiede 1.000 iscritti e 4.000 ore."
            },
            {
                "heading": "2. Ore di visualizzazione pubbliche valide e tempo non conteggiato",
                "body": "Solo le ore pubbliche generate dai video tradizionali lunghi valgono per le 4.000 ore. Il tempo visualizzato nel feed di Shorts NON viene conteggiato per le 4.000 ore (gli Shorts si qualificano mediante la soglia separata di 10M di visualizzazioni). I video privati, non in elenco, eliminati o derivanti da campagne promozionali Google Ads sono esclusi.",
                "keyTakeaway": "Le ore devono provenire da video lunghi pubblici guardati in modo organico in un periodo continuativo di 365 giorni."
            },
            {
                "heading": "3. Sicurezza dell’account e conformità alle linee guida",
                "body": "Oltre a iscritti e ore, è obbligatorio attivare la Verifica in due passaggi sull’account Google, collegare un account Google AdSense attivo e avere zero avvertimenti attivi per violazione delle Norme della Community.",
                "keyTakeaway": "Proteggi l’account con la verifica in 2 passaggi, collega AdSense e mantieni il canale privo di violazioni."
            },
            {
                "heading": "4. Monitora il tuo percorso con i calcolatori Creovly",
                "body": "Pianifica il tempo necessario per raggiungere le 4.000 ore con il Calcolatore di Ore di Visualizzazione YouTube di Creovly. Simula i ricavi combinati con il Calcolatore di Monetizzazione YouTube.",
                "keyTakeaway": "Utilizza calcolatori dedicati per pianificare la frequenza di pubblicazione e le visualizzazioni necessarie."
            }
        ],
        "workedExample": {
            "title": "Pianificazione per raggiungere il traguardo delle 4.000 ore",
            "scenario": "Un creator ha 850 iscritti e 2.400 ore di visualizzazione pubbliche e vuole colmare le 1.600 ore rimanenti prima che le ore più vecchie scadano nella finestra mobile di 12 mesi.",
            "steps": [
                "Calcolare le ore mancanti: 4.000 obiettivo − 2.400 attuali = 1.600 ore necessarie.",
                "Stimare le visualizzazioni: Con una durata media di 4 minuti (0,067 h/view), servono 1.600 ÷ 0,067 = 24.000 visualizzazioni.",
                "Stabilire il ritmo: Pubblicare 2 video a settimana con una media di 2.000 visualizzazioni produce 16.000 visualizzazioni (circa 1.067 ore) al mese.",
                "Verificare i requisiti di sistema: Controllare la verifica in 2 passaggi e verificare zero avvertimenti attivi."
            ],
            "conclusion": "Con questo ritmo, il creator raggiungerà le 4.000 ore in circa 6-7 settimane, qualificandosi per la monetizzazione completa."
        },
        "checklist": [
            {
                "title": "Soglia iscritti",
                "detail": "500 iscritti (supporto dei fan) o 1.000 iscritti (ricavi pubblicitari)."
            },
            {
                "title": "Ore o visualizzazioni Shorts",
                "detail": "4.000 ore pubbliche in 12 mesi o 10M di visualizzazioni Shorts in 90 giorni."
            },
            {
                "title": "Verifica in due passaggi",
                "detail": "Attivare la verifica in due passaggi sull’account Google del canale."
            },
            {
                "title": "Account AdSense collegato",
                "detail": "Collegare un account Google AdSense approvato per la ricezione dei pagamenti."
            },
            {
                "title": "Nessun avvertimento attivo",
                "detail": "Assicurarsi che il canale non abbia strike attivi per violazione delle norme."
            }
        ],
        "faqs": [
            {
                "question": "Quali sono i requisiti per monetizzare su YouTube?",
                "answer": "Per la monetizzazione pubblicitaria completa occorrono 1.000 iscritti e 4.000 ore di visualizzazione pubbliche negli ultimi 12 mesi (o 10 milioni di visualizzazioni Shorts in 90 giorni). Esiste una soglia introduttiva a 500 iscritti e 3.000 ore per il supporto dei fan."
            },
            {
                "question": "Le ore di visualizzazione degli Shorts contano per le 4.000 ore?",
                "answer": "No, le ore del feed di Shorts non concorrono al traguardo delle 4.000 ore. Gli Shorts vengono valutati unicamente sul requisito separato di 10 milioni di visualizzazioni in 90 giorni."
            },
            {
                "question": "In quanto tempo bisogna accumulare le 4.000 ore?",
                "answer": "Il calcolo si basa su una finestra mobile degli ultimi 365 giorni consecutivi. Le ore accumulate più di un anno fa scadono progressivamente dal conteggio."
            }
        ]
    },
    'how-to-change-youtube-thumbnail': {
        "title": "Come Cambiare la Miniatura di YouTube Passo Passo",
        "seoTitle": "Come Cambiare la Miniatura di YouTube (Guida Passo Passo)",
        "category": "Branding del canale",
        "readTime": "5 min di lettura",
        "description": "Tutorial passo passo su come cambiare la miniatura su YouTube: da YouTube Studio su computer, app per smartphone, verifica telefonica dell’account e miniature Shorts.",
        "officialSources": [
            {
                "label": "Guida di YouTube: Aggiungere o modificare le miniature dei video",
                "description": "Documentazione ufficiale per caricare, modificare e selezionare miniature video personalizzate su computer e dispositivi mobili."
            }
        ],
        "contentSections": [
            {
                "heading": "1. Verifica telefonica: sbloccare il caricamento di miniature personalizzate",
                "body": "Per poter caricare una miniatura personalizzata su YouTube, il tuo canale deve avere completato la verifica del numero di telefono. Senza verifica, YouTube consente di scegliere unicamente tra tre fotogrammi estratti in automatico dal video. Apri le Impostazioni in YouTube Studio > Canale > Idoneità alle funzionalità e completa la verifica telefonica.",
                "keyTakeaway": "Effettua la verifica del numero di telefono in YouTube Studio per sbloccare le miniature personalizzate."
            },
            {
                "heading": "2. Come cambiare la miniatura da PC in YouTube Studio",
                "body": "Per cambiare la miniatura dal computer, accedi a YouTube Studio. Clicca su \"Contenuti\" nel menu a sinistra e seleziona il video. Nella sezione \"Miniatura\" della pagina dei dettagli, passa il mouse sull’immagine corrente, clicca sui tre puntini verticali e seleziona \"Modifica\". Scegli il tuo file 1280 × 720 e clicca su \"Salva\" in alto a destra.",
                "keyTakeaway": "In YouTube Studio > Contenuti > Dettagli, clicca sui tre puntini del riquadro miniatura e scegli \"Modifica\"."
            },
            {
                "heading": "3. Come cambiare la miniatura dall’app mobile di YouTube Studio",
                "body": "Apri l’app YouTube Studio su iOS o Android. Tocca \"Contenuti\", seleziona il video e tocca l’icona a forma di matita (Modifica) in alto. Tocca l’icona a matita sopra l’anteprima della miniatura, scegli \"Modifica\", seleziona la foto dalla tua galleria e tocca \"Salva\". Ricorda che su mobile vige il limite di 2 MB.",
                "keyTakeaway": "Tocca l’icona a matita nell’app mobile di YouTube Studio per sostituire la miniatura ovunque ti trovi."
            },
            {
                "heading": "4. Come selezionare o cambiare la miniatura di un video YouTube Shorts",
                "body": "I video Shorts gestiscono le miniature diversamente dai video lunghi. Attualmente non è possibile caricare una miniatura personalizzata da PC per uno Short già pubblicato. Il fotogramma di copertina va scelto obbligatoriamente durante il caricamento iniziale dall’app mobile di YouTube toccando l’icona della matita sull’anteprima del video.",
                "keyTakeaway": "Scegli il fotograma di copertina del tuo Short durante il caricamento mobile; la sostituzione successiva da PC non è supportata."
            },
            {
                "heading": "5. Specifiche tecniche: 1280×720 e compressione sotto i 2 MB",
                "body": "Per una visualizzazione impeccabile, formatta la tua grafica a 1280 × 720 pixel (16:9) con il Ridimensionatore di Miniature di Creovly. Assicurati che il file pesi meno di 2 MB con il Compressore di Miniature di Creovly per evitare errori durante l’upload mobile.",
                "keyTakeaway": "Imposta le miniature a 1280 × 720 e comprimile sotto i 2 MB prima di effettuare il caricamento."
            }
        ],
        "workedExample": {
            "title": "Sostituzione di una miniatura poco performante per rilanciare il CTR",
            "scenario": "Un video pubblicato da 48 ore registra un CTR basso pari al 2,1%. Il creator crea una nuova miniatura con maggior contrasto e testo di aggancio e desidera sostituire il visivo senza azzerare visualizzazioni o commenti.",
            "steps": [
                "Esportare la nuova grafica: 1280 × 720 pixel in formato JPG.",
                "Comprimere sotto i 2 MB: Utilizzare il compressore Creovly per portare il peso a 510 KB.",
                "Accedere a YouTube Studio: Aprire la scheda Contenuti e i dettagli del video.",
                "Eseguire la sostituzione: Cliccare sui tre puntini della miniatura, scegliere \"Modifica\", caricare il nuovo file e salvare.",
                "Monitorare la reazione: Monitorare l’andamento della percentuale di clic (CTR) negli Analytics nelle 72 ore successive."
            ],
            "conclusion": "La nuova miniatura viene recepita istantaneamente nella ricerca e nei consigli senza azzerare il conteggio delle visualizzazioni o i commenti."
        },
        "checklist": [
            {
                "title": "Verifica telefonica effettuata",
                "detail": "Conferma l’abilitazione delle funzionalità intermedie in YouTube Studio."
            },
            {
                "title": "Dimensioni raccomandate",
                "detail": "Imposta il file a 1280 × 720 pixel in formato 16:9."
            },
            {
                "title": "Peso file sotto i 2 MB",
                "detail": "Garantisci la piena compatibilità con i caricamenti da smartphone."
            },
            {
                "title": "Formato JPG o PNG",
                "detail": "Utilizza un profilo colore sRGB per una resa cromatica accurata."
            },
            {
                "title": "Salvataggio confermato",
                "detail": "Clicca su Salva e verifica il rendering sulla pagina pubblica del video."
            }
        ],
        "faqs": [
            {
                "question": "Si può cambiare la miniatura di un video YouTube dopo averlo pubblicato?",
                "answer": "Sì, in qualsiasi momento. Apri YouTube Studio, vai nei dettagli del video, clicca sul menu a tre puntini sulla miniatura, scegli Modifica, carica la nuova immagine e clicca su Salva."
            },
            {
                "question": "Si può modificare la miniatura di uno Short di YouTube già pubblicato?",
                "answer": "Attualmente non è possibile caricare miniature personalizzate da PC per Shorts già pubblicati. Il fotogramma va scelto nell’app mobile durante il caricamento."
            },
            {
                "question": "Perché non riesco a caricare miniature personalizzate su YouTube?",
                "answer": "Il caricamento di miniature personalizzate richiede di aver completato la verifica telefonica dell’account in YouTube Studio. I canali non verificati possono scegliere solo fotogrammi estratti automaticamente."
            }
        ]
    },

  },
};

export function getLocalizedGuide(slug: string, locale: Locale): LocalizedGuideData | undefined {
  return localizedGuides[locale]?.[slug] || localizedGuides.en[slug];
}

