import type { FAQItem } from '@/types';
import type { CalculatorKind } from '@/lib/creator-calculators';

export const calculatorFaqs: Record<CalculatorKind, FAQItem[]> = {
  revenue: [
    {
      question: 'How much money does YouTube pay for 1,000 views?',
      answer:
        'Creators typically earn between $1.50 and $6.00 per 1,000 long-form views, though niches like finance or software can exceed $15+. Actual payouts depend on audience geography, seasonality, and niche RPM.',
    },
    {
      question: 'How much does YouTube pay for 100,000 views?',
      answer:
        'At an average RPM of $2.50 to $5.00, 100,000 views generates approximately $250 to $500. Higher-paying niches (B2B, tech) can earn $1,000+ for the same view volume.',
    },
    {
      question: 'How much money can you make from 1 million YouTube views?',
      answer:
        'One million long-form views typically yields between $2,000 and $7,000 depending on your channel RPM. Lifestyle content may earn closer to $1,500, while business and finance channels can exceed $10,000.',
    },
    {
      question: 'How to calculate YouTube earnings from views?',
      answer:
        'Use the standard formula: Estimated Earnings = (Total Views ÷ 1,000) × RPM. For instance, 80,000 views at a $4.00 RPM produces $320 in net creator revenue.',
    },
    {
      question: 'How much do YouTube Shorts earn per 1 million views?',
      answer:
        'Shorts monetize through the creator ad pool, yielding an effective RPM between $0.03 and $0.12 per 1,000 views. One million Shorts views generally generates approximately $30 to $120.',
    },
  ],
  rpm: [
    {
      question: 'How to calculate RPM on YouTube?',
      answer:
        'Divide your net earned revenue by total views and multiply by 1,000: RPM = (Total Revenue ÷ Total Views) × 1,000. If you earned $240 from 60,000 views, your RPM is $4.00.',
    },
    {
      question: 'What is a good RPM on YouTube?',
      answer:
        'An RPM between $3.00 and $6.00 is solid for general entertainment. Niche educational, tech, and financial channels frequently see RPMs between $8.00 and $25.00+.',
    },
    {
      question: 'What is the difference between YouTube RPM and CPM?',
      answer:
        'CPM is what advertisers pay per 1,000 ad impressions before platform splits. RPM is what the creator actually receives per 1,000 total views after YouTube’s 45% revenue cut and non-monetized views are accounted for.',
    },
    {
      question: 'How to calculate YouTube RPM from views and earnings?',
      answer:
        'Enter your exact YouTube Studio estimated revenue and total views for the same date range. Creovly calculates your exact net earnings per 1,000 views instantly.',
    },
    {
      question: 'Why is my YouTube RPM so low?',
      answer:
        'Common causes include viewers from lower-CPM geographic regions, high mobile/Shorts viewership ratios, January post-holiday advertiser pullbacks, or content in low-competition advertiser categories.',
    },
  ],
  'watch-hours': [
    {
      question: 'How many views do you need to get 4,000 watch hours?',
      answer:
        'It depends on your average view duration. If viewers average 5 minutes per video, you need 48,000 views: (4,000 hours × 60 minutes) ÷ 5 minutes = 48,000 views.',
    },
    {
      question: 'How to calculate YouTube watch hours?',
      answer:
        'Formula: Watch Hours = (Total Views × Average View Duration in Minutes) ÷ 60. For example, 15,000 views with an average duration of 4 minutes yields 1,000 public watch hours.',
    },
    {
      question: 'How many watch hours does a 10-minute YouTube video get?',
      answer:
        'A 10-minute video viewed 1,000 times with a 50% retention rate (5-minute average watch time) produces 83.3 watch hours. At 100% completion, it generates 166.7 hours.',
    },
    {
      question: 'How long does it take to reach 4,000 watch hours?',
      answer:
        'At a steady pace of 400 monthly watch hours, reaching 4,000 hours takes roughly 10 months. Remember that hours expire after 12 months on a rolling calendar window.',
    },
    {
      question: 'Do YouTube Shorts count toward 4,000 watch hours?',
      answer:
        'No. Watch hours from the Shorts feed do not count toward the 4,000-hour threshold. Shorts qualify via a separate pathway: 10 million valid Shorts views in 90 days.',
    },
  ],
  monetization: [
    {
      question: 'How many subscribers do you need to monetize YouTube?',
      answer:
        'You need 500 subscribers for fan funding (Super Thanks, memberships) and 1,000 subscribers for YouTube ad revenue sharing, alongside applicable watch-hour or Shorts-view requirements.',
    },
    {
      question: 'How many watch hours are needed for YouTube monetization?',
      answer:
        'YouTube requires 3,000 valid public watch hours (within 12 months) for fan-funding features, and 4,000 valid public watch hours for full ad revenue sharing.',
    },
    {
      question: 'How many Shorts views do you need for monetization?',
      answer:
        'You need 3 million public Shorts views in 90 days for fan funding (500 subs), and 10 million public Shorts views in 90 days for YouTube ad revenue sharing (1,000 subs).',
    },
    {
      question: 'How to check YouTube monetization eligibility?',
      answer:
        'Open YouTube Studio and go to the "Earn" tab to see live trackers for your subscriber count, watch hours, and Shorts views against official Partner Program thresholds.',
    },
    {
      question: 'Can you monetize YouTube with 500 subscribers?',
      answer:
        'Yes. With 500 subscribers (plus 3 public uploads in 90 days and 3,000 watch hours or 3M Shorts views), you can unlock fan funding, Super Chats, and channel memberships.',
    },
  ],
};

