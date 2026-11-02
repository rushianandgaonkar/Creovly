export const tools = {
  shell: {
    breadcrumbHome: 'Home',
    breadcrumbTools: 'Tools',
    badgeInBrowser: '100% In-Browser Execution',
    badgeUpdatedSpecs: 'Updated Specifications',
    previewAlertTitle: 'Workspace preview',
    previewAlertBody: 'Explore the planned interface. Results are fixed samples; processing, calculations, downloads, and exports are not available yet.',
    guidanceLabel: 'Reference & Standards',
    aboutHeading: 'About {title}',
    defaultSteps: {
      step1Title: '01. Prepare',
      step1Heading: 'Upload & Configure',
      step1Body: 'Set up your parameters or load creator sample assets with one click.',
      step2Title: '02. Inspect',
      step2Heading: 'Compare & Validate',
      step2Body: 'Check file dimensions, byte limits, and visual framing against YouTube specifications.',
      step3Title: '03. Export',
      step3Heading: 'Export Ready Files',
      step3Body: 'Save production-ready files directly to your device with clean naming formats.',
    },
    faqBadge: 'Documentation & FAQ',
    faqHeading: 'Frequently Asked Questions',
    relatedBadge: 'Workflow Continuity',
    relatedHeading: 'Related Creator Tools',
    relatedSubheading: 'Complementary utilities for your YouTube pre-publish checklist',
    relatedViewAll: 'View all tools',
    workbenchControls: 'Workbench Controls',
    inputLocal: 'INPUT // LOCAL',
    outputInspection: 'Output & Inspection',
    sampleResults: 'Sample Results',
    previewMode: 'PREVIEW MODE',
    liveSpec: 'LIVE SPEC',
  },
  directory: {
    heading: 'Creator Pre-Publish Utilities',
    subheading: 'Zero sign-ups. Zero server uploads. Client-side tools to inspect thumbnails, optimize video titles, ensure Shorts UI safe zones, and model YouTube channel economics.',
    completeCatalog: 'Complete Catalog',
    searchPlaceholder: 'Search tools (/)...',
    filterAll: 'All',
    toolsCount: '{count} {label} {status}',
    toolSingular: 'tool',
    toolPlural: 'tools',
    statusFound: 'found',
    statusAvailable: 'available',
    emptyTitle: 'No tools found',
    emptyText: 'No creator tools match your search "{query}". Try searching for "compress", "title", "rpm", or clear filters.',
    clearFilters: 'Clear search filters',
  },
  categories: {
    thumbnail: {
      title: 'Thumbnail & Packaging Tools',
      label: 'Thumbnails & Shorts',
      description: 'Prepare your YouTube thumbnail with local resizing and compression, and manual Shorts framing guides.',
    },
    title: {
      title: 'Title Tools',
      label: 'Titles',
      description: 'Check character counts, test mobile truncation limits, and analyze title hooks.',
    },
    moneyGrowth: {
      title: 'Money & Growth Tools',
      label: 'Money & Growth',
      description: 'Model creator revenue scenarios, calculate net RPM per 1,000 views, and track watch-hour progress.',
    },
  },
  faqs: {
    compressor: [
      {
        question: 'How to compress a YouTube thumbnail without losing quality?',
        answer: 'Upload your thumbnail and select JPEG (the format officially recommended by YouTube along with PNG). While WebP is supported for website embedding, YouTube officially recommends JPG or PNG for Studio uploads. Setting quality between 75% and 85% reduces file weight dramatically while keeping fine text and faces sharp.',
      },
      {
        question: 'How to reduce YouTube thumbnail size under 2MB?',
        answer: 'Set your target file size slider to under 2 MB in the compressor. This ensures your thumbnail meets YouTube’s strict 2 MB mobile Studio upload limit (desktop allows up to 50 MB) and prevents upload rejection errors.',
      },
      {
        question: 'How to make a YouTube thumbnail file smaller?',
        answer: 'Convert heavy PNG illustrations to optimized JPEGs, ensure dimensions match 1280×720 rather than 4K, and compress to remove unneeded metadata and redundant pixel data.',
      },
      {
        question: 'What is the maximum file size for a YouTube thumbnail?',
        answer: 'According to official YouTube platform specifications, custom thumbnails must be under 2 MB for mobile Studio uploads and under 50 MB for desktop browser uploads. Supported formats are JPEG, PNG, and GIF.',
      },
      {
        question: 'How to compress a PNG thumbnail for YouTube?',
        answer: 'Upload your PNG and apply client-side compression. If the file exceeds 2 MB and doesn’t require transparency, converting to high-quality JPEG will shrink file weight by up to 80% without losing sharpness.',
      },
    ],
    resizer: [
      {
        question: 'What is the best YouTube thumbnail size in 2026?',
        answer: 'Standard YouTube video thumbnails require a 16:9 aspect ratio with a minimum width of 640 pixels. The recommended baseline resolution is 1280 × 720 pixels, with higher resolutions up to 3840 × 2160 supported on desktop. Files must remain under 2 MB for mobile Studio uploads and under 50 MB for desktop browser uploads. Supported formats are JPG, PNG, GIF, and BMP (with JPG and PNG officially recommended).',
      },
      {
        question: 'How to resize an image for a YouTube thumbnail?',
        answer: 'Select the 1280 × 720 (16:9) preset in the resizer, adjust the crop alignment or padding to fit your artwork, and download the production-ready JPEG or PNG file.',
      },
      {
        question: 'How to convert an image to 1280x720 pixels?',
        answer: 'Load your image into the resizer, choose the 1280 × 720 preset, and select either "Crop to Fill" to eliminate black bars or "Fit with Padding" to keep 100% of the original content without distortion.',
      },
      {
        question: 'What is the YouTube thumbnail aspect ratio?',
        answer: 'YouTube video thumbnails use a 16:9 widescreen aspect ratio. YouTube Shorts use vertical 9:16 framing, while channel profile pictures require a 1:1 square ratio.',
      },
      {
        question: 'Why does my YouTube thumbnail look blurry?',
        answer: 'Thumbnails appear blurry when exported below 1280 × 720 resolution, when heavily compressed below 50% quality, or when upscaled from lower-resolution video freeze frames.',
      },
    ],
    logoRemover: [
      {
        question: 'How to remove background from a logo for free?',
        answer: 'Upload your logo, select the background color, and click Remove background. Export a clean, transparent PNG directly in your browser with zero fees and no account required.',
      },
      {
        question: 'How to make a logo background transparent?',
        answer: 'Use this tool to detect and eliminate border-connected background pixels. Exporting as a PNG preserves the alpha channel so your logo overlays cleanly on any background color.',
      },
      {
        question: 'How to remove white background from a logo?',
        answer: 'Select white as your background color and adjust the tolerance slider to clean edge fringes. Enclosed white lettering stays protected while outer white borders are removed.',
      },
      {
        question: 'How to convert a JPG logo to transparent PNG?',
        answer: 'Since JPG does not support transparency, simply changing the file extension will not work. Process your JPG through this tool to strip the solid background, then download the resulting PNG.',
      },
      {
        question: 'How to remove logo background without losing quality?',
        answer: 'Upload your highest-resolution source file and maintain full original dimensions during export. All pixel processing executes locally with lossless canvas operations.',
      },
    ],
    shorts: [
      {
        question: 'What is the safe zone for YouTube Shorts?',
        answer: 'The Shorts safe zone is the central 9:16 area clear of native platform overlays—including the bottom title, sound icon, channel avatar, and the right-side like/comment buttons.',
      },
      {
        question: 'How to keep text inside the YouTube Shorts safe zone?',
        answer: 'Center critical titles and captions in the middle 60% of the screen. Avoid the top 15% (header/search) and bottom 25% (channel info and sound tags) to prevent UI obstruction.',
      },
      {
        question: 'What are the YouTube Shorts safe zone dimensions?',
        answer: 'Shorts use a 1080 × 1920 canvas (9:16). While exact UI margins shift across phones, reserving ~280px at the bottom, ~140px at the top, and ~120px on the right keeps key content protected across devices.',
      },
      {
        question: 'Where should captions be placed in YouTube Shorts?',
        answer: 'Position captions in the lower-middle section of the screen, just above the video description bar and indented from the right-hand action column so viewers can read without interference.',
      },
      {
        question: 'How to prevent YouTube Shorts buttons from covering text?',
        answer: 'Maintain a minimum 120-pixel margin from the right edge of your 1080×1920 canvas. Use Creovly’s interactive overlay tool to test a representative video frame before publishing.',
      },
    ],
    titleChecker: [
      {
        question: 'How long should a YouTube video title be?',
        answer: 'Aim for 50–70 characters. While YouTube permits up to 100 characters, mobile search feeds and suggested rails frequently truncate titles after 55–60 characters. Place your primary hook and keywords upfront.',
      },
      {
        question: 'What is the maximum character limit for YouTube titles?',
        answer: 'YouTube enforces a strict maximum limit of 100 characters, including spaces, numbers, and emojis. Titles exceeding 100 characters will be rejected upon upload in YouTube Studio.',
      },
      {
        question: 'How to write SEO-friendly YouTube titles?',
        answer: 'Front-load your primary target keyword within the first 40 characters, address user search intent clearly, and eliminate filler words to balance search indexing with high mobile click-through rates.',
      },
      {
        question: 'How to check if a YouTube title is too long?',
        answer: 'Paste your title draft into Creovly’s Title Checker to inspect the character count and preview mobile two-line truncation widths before finalizing your metadata.',
      },
      {
        question: 'Do emojis in YouTube titles hurt SEO?',
        answer: 'Emojis do not harm search indexing when used sparingly (1–2 relevant symbols), but avoid replacing core keyword text with emojis since search algorithms parse written terms.',
      },
    ],
    revenue: [
      {
        question: 'How much money does YouTube pay for 1,000 views?',
        answer: 'Creators typically earn between $1.50 and $6.00 per 1,000 long-form views, though niches like finance or software can exceed $15+. Actual payouts depend on audience geography, seasonality, and niche RPM.',
      },
      {
        question: 'How much does YouTube pay for 100,000 views?',
        answer: 'At an average RPM of $2.50 to $5.00, 100,000 views generates approximately $250 to $500. Higher-paying niches (B2B, tech) can earn $1,000+ for the same view volume.',
      },
      {
        question: 'How much money can you make from 1 million YouTube views?',
        answer: 'One million long-form views typically yields between $2,000 and $7,000 depending on your channel RPM. Lifestyle content may earn closer to $1,500, while business and finance channels can exceed $10,000.',
      },
      {
        question: 'How to calculate YouTube earnings from views?',
        answer: 'Use the standard formula: Estimated Earnings = (Total Views ÷ 1,000) × RPM. For instance, 80,000 views at a $4.00 RPM produces $320 in net creator revenue.',
      },
      {
        question: 'How much do YouTube Shorts earn per 1 million views?',
        answer: 'Shorts monetize through the creator ad pool, yielding an effective RPM between $0.03 and $0.12 per 1,000 views. One million Shorts views generally generates approximately $30 to $120.',
      },
    ],
    rpm: [
      {
        question: 'How to calculate RPM on YouTube?',
        answer: 'Divide your net earned revenue by total views and multiply by 1,000: RPM = (Total Revenue ÷ Total Views) × 1,000. If you earned $240 from 60,000 views, your RPM is $4.00.',
      },
      {
        question: 'What is a good RPM on YouTube?',
        answer: 'An RPM between $3.00 and $6.00 is solid for general entertainment. Niche educational, tech, and financial channels frequently see RPMs between $8.00 and $25.00+.',
      },
      {
        question: 'What is the difference between YouTube RPM and CPM?',
        answer: 'CPM is what advertisers pay per 1,000 ad impressions before platform splits. RPM is what the creator actually receives per 1,000 total views after YouTube’s 45% revenue cut and non-monetized views are accounted for.',
      },
      {
        question: 'How to calculate YouTube RPM from views and earnings?',
        answer: 'Enter your exact YouTube Studio estimated revenue and total views for the same date range. Creovly calculates your exact net earnings per 1,000 views instantly.',
      },
      {
        question: 'Why is my YouTube RPM so low?',
        answer: 'Common causes include viewers from lower-CPM geographic regions, high mobile/Shorts viewership ratios, January post-holiday advertiser pullbacks, or content in low-competition advertiser categories.',
      },
    ],
    watchHours: [
      {
        question: 'How to calculate 4,000 watch hours on YouTube?',
        answer: 'Multiply 4,000 hours by 60 to get 240,000 total watch minutes. Divide 240,000 by your average view duration in minutes to calculate the total views needed to qualify for the YouTube Partner Program.',
      },
      {
        question: 'How many views is 4,000 watch hours?',
        answer: 'If your average view duration is 4 minutes, you need 60,000 views (60,000 × 4 = 240,000 minutes = 4,000 hours). At an 8-minute duration, you need only 30,000 views.',
      },
      {
        question: 'How long does it take to get 4,000 watch hours?',
        answer: 'Publishing 1–2 long-form videos weekly with consistent 4–6 minute view durations typically takes consistent creators 3 to 9 months to reach 4,000 valid public watch hours.',
      },
      {
        question: 'Do YouTube Shorts count toward 4,000 watch hours?',
        answer: 'No. Watch hours accumulated from the vertical Shorts Feed do not count toward the 4,000-hour threshold. Shorts have a separate qualification path requiring 10 million Shorts views in 90 days.',
      },
      {
        question: 'Do unlisted or deleted videos count toward watch hours?',
        answer: 'No. YouTube only counts public watch hours from currently active public videos within the rolling 365-day qualification window.',
      },
    ],
    monetization: [
      {
        question: 'How do YouTubers make money beside AdSense?',
        answer: 'Top creators diversify through brand sponsorships, affiliate marketing links, channel memberships, digital products, coaching, and merchandise alongside platform ad revenue.',
      },
      {
        question: 'How much should I charge for a YouTube sponsorship?',
        answer: 'Industry baselines range between $20 and $50 per 1,000 projected views. A video expected to achieve 50,000 views commonly commands a sponsorship fee between $1,000 and $2,500.',
      },
      {
        question: 'How to calculate total creator net income?',
        answer: 'Combine platform ad payouts, sponsorship deal fees, affiliate commissions, and membership earnings, then deduct production costs, software subscriptions, and contractor expenses.',
      },
      {
        question: 'When should a creator start monetizing outside YouTube?',
        answer: 'You can begin affiliate marketing and sponsorships from your first upload. You do not need to wait for 1,000 subscribers or YPP qualification to recommend tools you use.',
      },
      {
        question: 'Why are operating costs important in creator revenue modeling?',
        answer: 'Gross revenue misleads creators. Factoring in editing, equipment depreciation, software subscriptions, and taxes reveals your actual take-home profit per upload.',
      },
    ],
  },
  guidance: {
    compressor: {
      p1: 'Every image uses the same target, format, and maximum quality settings. Changing settings or selecting a replacement batch clears previous outputs so you cannot download results from stale settings. Removing an individual image keeps the other completed results.',
      p2: 'Dimensions are preserved. Re-encoding can change colors or remove embedded metadata. If the original is retained, its metadata is retained too. Samples load one image; upload multiple files to test a batch.',
      linkText: 'Check YouTube’s current thumbnail guidance',
      linkSuffix: 'before uploading.',
    },
    resizer: {
      p1: 'Prepare a thumbnail, channel banner, profile picture or watermark asset from a still JPEG, PNG or WebP. Crop to fill trims edges; fit entire image adds padding. All exports remain rectangular.',
      p2: 'The banner preset uses 2560 × 1440. Its preview guide scales the central 1235 × 338 text/logo area published for a 2048 × 1152 banner. The 800 × 800 profile canvas is a Creovly preset, with an illustrative circle guide. The watermark canvas is 150 × 150; it prepares an asset without placing it on a video or removing its background.',
      p3: 'Guides never appear in downloaded files. Review your artwork in YouTube’s own upload preview. YouTube specifies banners at 6 MB or smaller and watermark images below 1 MB. See YouTube’s channel branding guidelines for current requirements.',
      p4: 'Inputs are limited to 20 MB, 24 megapixels and 8,192 pixels per side. Output canvases use the same dimension limits. Resizing changes dimensions, not a target file size. Enlarging cannot recover detail. Exports may remove metadata or change colors.',
    },
    logoRemover: {
      p1: 'Choose an existing logo with a solid background, confirm the background color, and adjust tolerance. Select Remove background, inspect the actual before/after images, then download a transparent PNG.',
      p2: 'This tool removes matching colors connected to the image border. It preserves enclosed areas, including enclosed background inside letters. Similar foreground colors touching the background can also be removed. Complex photos, gradients, shadows, and anti-aliased edges may need a dedicated editor.',
      p3: 'Processing stays in your browser. Images are not saved between visits. Original dimensions are preserved; PNG output may be larger than your source file.',
    },
    shorts: {
      p1: 'Choose a still frame. The tool fits it into a 9:16 canvas, adding black padding when needed. Adjust the reserved margins to approximate the player layout you want to plan around. The defaults are starting assumptions, not official YouTube measurements.',
      p2: 'Enable the content box and position it over your important text or subject. The checker reports whether that box overlaps your chosen margins. It does not detect actual content or analyze a video.',
      p3: 'Create a PNG guide to download a 1080 × 1920 annotated planning reference. The download always includes the guide, even when the on-screen overlay is hidden. Use your clean source for publishing and inspect it in the actual Shorts player.',
    },
    titleChecker: {
      p1: 'Enter a draft title and, optionally, an exact topic phrase. Check the length, whitespace, repeated punctuation, and uppercase emphasis. The phrase check ignores case but does not match synonyms or measure search demand.',
      p2: 'YouTube lists a 100-character title limit. This tool uses a conservative UTF-16 character-unit count, including spaces; some emoji use more than one unit. Check final acceptance in YouTube Studio. The word count splits on whitespace and is less useful for languages that do not use spaces.',
      p3: 'The preview wraps into two lines at your chosen width. It is an illustration, not a replica of every YouTube surface. Feedback does not predict CTR, rankings, truthfulness, or platform policy compliance.',
    },
  },
};

