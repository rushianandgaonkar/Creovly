export const checklist = {
  hero: {
    badge: 'Interactive Pre-Publish Workflow',
    tag: 'Pre-Flight Audit',
    heading: 'Pre-Publish Creator Checklist',
    subheading: 'Systematic pre-flight audit for thumbnails, titles, affiliate disclosures, audio licensing, and YouTube distribution.',
  },
  status: {
    completed: '{count} of {total} items verified',
    allComplete: 'All pre-publish checks completed! Ready to publish.',
    incomplete: 'Complete remaining checks before scheduling your video.',
    resetButton: 'Reset Checklist',
    exportButton: 'Export Checklist (.txt)',
    resetAria: 'Reset all checklist items to unchecked',
    auditReadiness: 'Audit Readiness:',
    packageStudioButton: 'Package Project in Studio →',
    completeLabel: '✓ Complete',
    itemsCount: '{completed} of {total} items',
    storageNotice: 'Checklist progress auto-saves to your local browser storage.',
    openStudioButton: 'Open Publish Studio →',
  },
  sections: [
    {
      title: '01. Visual Packaging & Assets',
      items: [
        {
          id: 'thumb-size',
          title: 'Thumbnail format, dimensions, and file size suit your upload',
          description: 'Use 16:9 aspect ratio (baseline 1280×720 HD up to 3840×2160, minimum width 640px) in JPG or PNG format. YouTube Studio mobile uploads enforce a strict 2 MB limit, while desktop browser uploads accept up to 50 MB.',
        },
        {
          id: 'thumb-mobile',
          title: 'Thumbnail text is readable on mobile devices (small screen check)',
          description: 'Over 70% of YouTube viewership occurs on mobile viewports.',
        },
        {
          id: 'shorts-overlay',
          title: 'Shorts critical captions are outside the right-side UI overlay safe zone',
          description: 'Ensures comments, like buttons, and channel handle do not cover text.',
        },
      ],
    },
    {
      title: '02. Title, Description & Metadata',
      items: [
        {
          id: 'title-hook',
          title: 'Primary hook or keyword is within the first 50 characters of the title',
          description: 'Prevents mobile cutoff in push notifications and recommendation feeds.',
        },
        {
          id: 'timestamps',
          title: 'Timestamps / Video Chapters are accurately formatted (00:00 start)',
          description: 'Required for Google Search key moments indexation.',
        },
        {
          id: 'affiliate-disclosure',
          title: 'Affiliate links include explicit FTC disclosure notice',
          description: 'Mandatory legal compliance for YouTube monetization.',
        },
      ],
    },
    {
      title: '03. Audio Licensing & Policy Compliance',
      items: [
        {
          id: 'music-license',
          title: 'Background music licenses and clearance tokens are valid',
          description: 'Prevents automatic Content ID claims and revenue sharing rerouting.',
        },
        {
          id: 'paid-promotion',
          title: 'Paid promotion checkbox marked if video contains sponsor endorsement',
          description: 'Enforces YouTube’s native "Includes paid promotion" banner.',
        },
        {
          id: 'community-guidelines',
          title: 'Content complies with advertiser-friendly and Community Guidelines',
          description: 'Avoids yellow monetization icon and restricted distribution.',
        },
      ],
    },
    {
      title: '04. Final Upload Settings & Distribution',
      items: [
        {
          id: 'end-screen',
          title: 'End screen elements and cards configured for next-video retention',
          description: 'Keeps viewers engaged within your channel session.',
        },
        {
          id: 'playlist-added',
          title: 'Video added to primary topical playlist',
          description: 'Assists algorithmic grouping and autoplay continuation.',
        },
        {
          id: 'upload-unlisted',
          title: 'Uploaded as Unlisted first for HD/4K processing and checks',
          description: 'Ensures 1080p60/4K encoding and copyright checks finish before public release.',
        },
      ],
    },
  ],
};

