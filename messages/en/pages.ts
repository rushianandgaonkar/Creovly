export const pages = {
  about: {
    heroBadge: 'Our Mission',
    heroTag: 'Built for YouTube Creators',
    heading: 'Create smarter. Publish better.',
    subheading:
      'Creovly is an independent, privacy-first pre-publish workspace. We provide digital video creators, editors, and channel managers with fast, client-side tools to inspect thumbnails, stress-test title hooks, eliminate Shorts UI overlap, and project channel revenue—all before hitting publish.',
    buttonStudio: 'Launch Publish Studio',
    buttonTools: 'Explore All Tools',
    breadcrumb: 'About',
    sections: {
      missionTitle: 'What Creovly Is & Who It’s For',
      missionBody:
        'Creovly serves YouTube video creators, thumbnail designers, scriptwriters, and channel operators. Most creator tools push heavy subscription fees, demand full channel access permissions, or run slow cloud processing. Creovly was engineered as a lightweight, private, and instant alternative: run pre-flight checks, optimize packaging assets, and verify specifications without account logins or cloud uploads.',
      principlesTag: 'Engineering Principles',
      differenceTitle: 'What makes Creovly different',
      privacyTitle: '100% In-Browser Privacy Architecture',
      privacyBody:
        'Every visual tool—from thumbnail compression to Shorts safe-zone verification—runs entirely in your client web browser via WebAssembly and Canvas APIs. Your images, titles, and draft descriptions are never transmitted to external cloud servers, stored in remote databases, or indexed by third parties. When you close the browser tab, memory is cleared.',
      scopeTitle: 'Strict Platform Scope Discipline',
      scopeBody:
        'We believe creator software should never make false promises. Creovly tools do not claim to "guarantee viral views", fabricate algorithm secrets, or estimate inflated sponsorship values. All calculators operate on conservative platform mathematics and your explicit input parameters.',
      disclaimerTitle: 'Independent Platform Boundaries',
      disclaimerBody:
        'Creovly is an independent software product developed for creators. YouTube™ is a registered trademark of Google LLC. Creovly is not affiliated with, endorsed by, or sponsored by YouTube or Google LLC.',
      supportTitle: 'Get in Touch',
      supportBody:
        'Have feedback on our tools, noticed an update in YouTube platform specifications, or need technical assistance? Our team is here to help:',
      contactFormLink: 'Contact Form →',
      ctaHeading: 'Ready to streamline your pre-publish workflow?',
      ctaBody:
        'Open Publish Studio to consolidate your title, thumbnail, and checklist into a complete, upload-ready package.',
      ctaButton: 'Launch Studio →',
    },
  },
  contact: {
    heroBadge: 'Creator Support',
    heroTag: 'Independent Engineering',
    heading: 'Contact Us',
    subheading:
      'Have questions, bug reports, or feature suggestions for Creovly? Reach out directly to our engineering team.',
    sidebar: {
      directTitle: 'Direct Contact',
      directBody: 'Prefer writing directly from your mail client? Email our creator inbox anytime:',
      responseTitle: 'Response Time',
      responseBody: 'We typically review creator feedback and support inquiries within 24–48 business hours.',
      featuresTitle: 'Feature Requests',
      featuresBody:
        'Most tools on Creovly were built directly from creator suggestions. If a pre-publish step is frustrating in your workflow, tell us!',
    },
    form: {
      nameLabel: 'Your name',
      namePlaceholder: 'Alex Rivera',
      emailLabel: 'Email address',
      emailPlaceholder: 'alex@creator.com',
      channelLabel: 'YouTube channel name or URL (optional)',
      channelPlaceholder: 'youtube.com/@yourchannel',
      topicLabel: 'Topic',
      topics: {
        feedback: 'General Feedback',
        bug: 'Bug Report',
        feature: 'Feature Suggestion',
        partnership: 'Partnership / Press',
      },
      messageLabel: 'Your message',
      messagePlaceholder: 'Describe your feedback, bug report, or feature request in detail...',
      buttonSubmit: 'Send message via email client',
      buttonCopy: 'Copy message text',
      privacyNote:
        'Zero server storage: submitting opens your default email client with your pre-formatted message. No form data is saved to a database.',
      submittedHeading: 'Message Prepared',
      submittedBody:
        'Your email application should have opened. If it didn’t, you can copy your prepared message and email it directly to',
      launchEmailApp: 'Launch Email App →',
      copiedNotification: '✓ Copied!',
    },
    errors: {
      nameRequired: 'Please enter your name.',
      emailValid: 'Please enter a valid email address so we can reach you.',
      messageMin: 'Please enter a message of at least 10 characters.',
    },
  },
  privacy: {
    heroBadge: 'Data Transparency',
    heroTag: 'Verified Client-Side Privacy',
    heading: 'Privacy Policy',
    subheading:
      'Creovly operates on a strict client-side architecture. We do not store, view, or transmit your media files or video drafts.',
    lastUpdated: 'Last Updated: November 1, 2026',
    consentSettingsHeading: 'Cookie & Analytics Preferences',
    consentGrantedText: 'Analytics cookies are currently allowed (with IP anonymization).',
    consentDeniedText: 'Analytics cookies are currently disabled. No tracking cookies are stored.',
    buttonRevoke: 'Disable Analytics Cookies',
    buttonGrant: 'Enable Analytics Cookies',
    sections: {
      clientSideTitle: '1. 100% Client-Side Processing Architecture',
      clientSideBody:
        'Unlike traditional creator SaaS platforms, all file processing tools on Creovly (including the YouTube Thumbnail Compressor, Thumbnail Resizer, Logo Background Remover, Shorts Safe Zone Checker, and Title Checker) execute entirely inside your local web browser session using modern Web APIs (HTML5 Canvas, File API, Web Workers, and local JavaScript threads).',
      clientSideItem1:
        'Your uploaded images, graphics, and thumbnail artwork are processed entirely in-memory and are never transmitted to any Creovly server, cloud storage, or external database.',
      clientSideItem2:
        'Calculated financial models, RPM estimates, and scenario figures remain solely in temporary browser memory.',
      clientSideItem3:
        'No media files, raw video assets, or photographic uploads are ever logged, cached, or retained on servers.',
      dataCollectTitle: '2. Information We Do and Do Not Collect',
      noAccountHeading: 'No Account Required:',
      noAccountBody:
        'You do not need to register an account, authenticate via Google or YouTube OAuth, or provide personal payment credentials to use Creovly tools.',
      contactCommsHeading: 'Voluntary Contact Communications & Email Processing:',
      contactCommsBody:
        'When you use our Contact page, the form formats your inquiry into an email draft in your local email application addressed to support@creovly.com rather than automatically submitting data to a website database. Delivery is not completed until you explicitly press “Send” in your email client. When you send an email to us, your message, sender address, and any optional information (such as your channel handle) are routed through and retained by standard email infrastructure—both by your email provider and by Creovly’s email service provider (inbox servers)—strictly so our team can read and answer your communication. Creovly does not store contact submissions in browser localStorage or on web application servers, and we never sell, rent, or distribute contact details to third-party data brokers or marketing vendors.',
      storageTitle: '3. Local Browser Storage Inventory',
      storageDescription:
        'To provide a seamless creator experience without requiring cloud logins or user accounts, Creovly utilizes standard browser localStorage on your physical device. We strictly disclose all stored keys below:',
      storageKeys: {
        studioDraftKey: 'creovly-studio-draft-v1',
        studioDraftDesc:
          'Used in Publish Studio. Saves your project metadata (video title, description text, targets, and packaging settings) locally on your physical device only when you explicitly select “Save draft” (or press Ctrl+S / ⌘S). Publish Studio does not automatically save every edit as you type; saving is an intentional creator action. Binary image files are never stored in localStorage. You can reload your saved project with “Load saved draft” or delete it permanently using “Remove Saved Draft”.',
        checklistKey: 'creovly-checklist',
        checklistDesc:
          'Used in the Pre-Publish Checklist. Saves checked verification milestones so your workflow status is preserved across visits. You can reset this at any time using the “Reset Checklist” button.',
        themeKey: 'creovly-theme',
        themeDesc:
          'Stores your light or dark display preference (light or dark) to prevent screen flickering between page navigations.',
        analyticsConsentKey: 'creovly-analytics-consent',
        analyticsConsentDesc:
          'Stores your explicit analytics cookie choice (granted or denied) when responding to our consent banner.',
      },
      analyticsTitle: '4. Analytics, Cookies & Consent Management',
      analyticsBody:
        'Creovly uses Google Analytics 4 (GA4) with IP anonymization enabled strictly to measure aggregate traffic metrics (e.g. daily active users, top-performing creator utilities, and device viewport categories).',
      platformTitle: '5. Independent Platform Status & Fair Use',
      platformBody:
        'Creovly is an independent software tool and is not affiliated with, endorsed by, sponsored by, or partner with YouTube, Google LLC, Alphabet Inc., or any of their subsidiaries. YouTube™ and the YouTube logo are registered trademarks of Google LLC.',
      contactTitle: '6. Contact Data Protection Officer',
      contactBodyPrefix:
        'If you have questions regarding this Privacy Policy or your data rights, please contact our team at ',
      contactBodyMid: ' or use our ',
      contactFormLink: 'Contact Form',
    },
  },
  terms: {
    heroBadge: 'Legal Transparency',
    heroTag: 'User Rights & Terms',
    heading: 'Terms of Service',
    subheading: 'Transparent guidelines for utilizing Creovly’s in-browser creator workspace.',
    lastUpdated: 'Last Updated: October 31, 2026',
    sections: {
      purposeTitle: '1. Purpose and Nature of the Service',
      purposeBody:
        'Creovly provides browser-based utilities and pre-publish workspaces designed to help digital video creators prepare packaging assets (such as thumbnails, titles, Shorts framing guides, and financial scenario models). All tools operate locally within the user’s web browser without server-side media processing.',
      ipTitle: '2. Creator Ownership & Intellectual Property',
      ipOwnershipHeading: 'You own 100% of your content:',
      ipOwnershipBody:
        'Creovly claims no ownership, copyright, or intellectual property rights over any images, logos, titles, scripts, or data that you process through our tools.',
      ipProcessingBody:
        'Because file processing executes entirely on your device, Creovly never transmits, stores, or re-licenses your creative assets. You retain full ownership and responsibility for the media you export and upload to external publishing platforms.',
      disclaimerTitle: '3. Disclaimer Regarding Performance & Earnings',
      disclaimerBody:
        'Tools such as the Revenue Calculator, RPM Calculator, Watch Hours Calculator, and Title Analyzer are planning aids that calculate mathematical scenarios based on creator-entered assumptions.',
      disclaimerItem1:
        'Calculated earnings, click-through rates (CTR), or watch hour milestones are hypothetical models and not guarantees of real-world results.',
      disclaimerItem2:
        'Actual creator income is subject to platform algorithms, viewer demographics, seasonality, advertiser demand, and YouTube Partner Program compliance.',
      disclaimerItem3:
        'Creovly does not represent or provide professional financial, accounting, legal, or investment advice.',
      trademarksTitle: '4. Third-Party Trademarks & Independent Status',
      trademarksBody1:
        'Creovly is an independent software toolkit and is not affiliated with, sponsored by, authorized by, or endorsed by Google LLC or YouTube LLC.',
      trademarksBody2:
        'YouTube™ and YouTube Shorts™ are trademarks of Google LLC. Reference to platform features, specifications, and upload limits is for technical compatibility and educational purposes only.',
      liabilityTitle: '5. Limitation of Liability',
      liabilityBody:
        'Creovly is provided on an “AS IS” and “AS AVAILABLE” basis without warranties of any kind, whether express or implied. To the maximum extent permitted by law, Creovly shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use the software, loss of data, or decisions made based on tool outputs.',
      contactTitle: '6. Inquiries and Contact',
      contactBodyPrefix: 'For questions regarding these Terms of Service, please contact ',
      contactBodyMid: ' or visit our ',
      contactFormLink: 'Contact Form',
    },
  },
};
