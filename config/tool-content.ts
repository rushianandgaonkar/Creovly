import type { FAQItem } from '@/types';

/**
 * English copy for tools added after the message files were localized.
 * shortcut: every locale shows this English text; move it into messages/* during the translation pass.
 */
export interface ToolContent { about: string[]; source?: { href: string; label: string }; faqs: FAQItem[] }

export const toolContent: Record<string, ToolContent> = {
  'youtube-thumbnail-size': {
    about: [
      'YouTube’s help page recommends 3840 × 2160 pixels for video thumbnails and 2160 × 3840 for Shorts thumbnails. Use a 16:9 ratio for videos and 9:16 for Shorts. Video thumbnails must be at least 640 pixels wide. 1280 × 720 is the long-standing thumbnail size and still meets both rules.',
      'The size limit depends on where you upload: 2 MB in the mobile app and 50 MB on desktop. Save as JPG or PNG. Your account must be verified before you can upload a custom thumbnail.',
    ],
    source: { href: 'https://support.google.com/youtube/answer/72431', label: 'Read YouTube’s thumbnail requirements' },
    faqs: [
      { question: 'What is the YouTube thumbnail size?', answer: 'YouTube recommends 3840 × 2160 pixels at a 16:9 aspect ratio for video thumbnails. The minimum width is 640 pixels. 1280 × 720 is also widely used and meets the requirements.' },
      { question: 'What is the YouTube Shorts thumbnail size?', answer: 'YouTube recommends 2160 × 3840 pixels at a 9:16 aspect ratio for Shorts, with a minimum height of 640 pixels.' },
      { question: 'What is the maximum YouTube thumbnail file size?', answer: '2 MB when you upload from the mobile app and 50 MB on desktop. If your file is over 2 MB, upload from a computer or compress it first.' },
      { question: 'Is 1280 × 720 still a good thumbnail size?', answer: 'Yes. It is 16:9 and wider than the 640-pixel minimum. YouTube now recommends 3840 × 2160, so use a larger size if your design and file size allow.' },
      { question: 'Which file formats can I use for a YouTube thumbnail?', answer: 'YouTube’s help page lists JPG and PNG. Convert WebP or other formats before uploading.' },
      { question: 'Why can’t I upload a custom thumbnail?', answer: 'Custom thumbnails need a verified YouTube account. Verify your account in YouTube Studio, then try again.' },
      { question: 'Is my image uploaded when I check it?', answer: 'No. Your browser reads the image’s size and type on your device. Nothing is sent to Creovly.' },
    ],
  },
  'best-time-to-post-on-youtube': {
    about: [
      'No single posting time works for every channel. Your best time is shortly before your own viewers are most active. YouTube Studio shows when they are online in Analytics, on the Audience tab, in the “When your viewers are on YouTube” card.',
      'Pick the peak hour from that card and how much lead time you want. This planner shows when to publish each day for the next week, in your time zone and your audience’s. It accounts for daylight saving changes. Test a few times and keep the one that works for your channel.',
    ],
    faqs: [
      { question: 'What is the best time to post on YouTube?', answer: 'It depends on your audience. Publish a little before your viewers are most active, which you can see in YouTube Studio under Analytics, Audience, “When your viewers are on YouTube.”' },
      { question: 'How long before my audience’s peak should I publish?', answer: 'Many creators publish one to three hours before the peak so the video is live when viewers arrive. Treat that as a starting point and compare results in Analytics.' },
      { question: 'Where do I find when my viewers are on YouTube?', answer: 'Open YouTube Studio, go to Analytics, select the Audience tab and find the “When your viewers are on YouTube” card. It appears once your channel has enough viewing data.' },
      { question: 'What if my channel is new and has no audience data yet?', answer: 'Choose the time zone where most of your target viewers live and an hour when they are usually free, such as early evening. Adjust once Studio shows real data.' },
      { question: 'Should I post at the same time every week?', answer: 'A regular schedule helps returning viewers know when to expect new videos. Use Studio’s scheduling to publish at your chosen time even when you are offline.' },
      { question: 'Does this tool use my YouTube data?', answer: 'No. It only uses the hour and time zones you choose and runs in your browser.' },
    ],
  },
  'youtube-hashtag-generator': {
    about: [
      'Hashtags help viewers find videos on the same topic. YouTube shows hashtags from your title and description as links, and up to three from the description can appear by your title. Hashtags cannot contain spaces, so this generator joins words in CamelCase, like #HomeWorkout.',
      'YouTube ignores every hashtag on a video that has more than 60. It also warns that too many hashtags make them less relevant. This generator stops at 15 so you can keep only the ones that describe your video.',
    ],
    source: { href: 'https://support.google.com/youtube/answer/6390658', label: 'Read YouTube’s hashtag rules' },
    faqs: [
      { question: 'How many hashtags should I use on YouTube?', answer: 'Use a few that describe the video. If a video has more than 60 hashtags, YouTube ignores all of them. This generator caps the list at 15 so you can choose the most relevant ones.' },
      { question: 'Where do YouTube hashtags appear?', answer: 'Hashtags in your title and description become clickable links. Up to three hashtags from the description can also appear by your title.' },
      { question: 'Can a YouTube hashtag have spaces?', answer: 'No. Join words together, as in #TwoWords or #twowords. The generator does this for you.' },
      { question: 'What is the difference between hashtags and tags?', answer: 'Tags go in the Tags field in YouTube Studio and are not shown to viewers. Hashtags are visible in the title or description and link to other videos with the same hashtag.' },
      { question: 'Should I add #Shorts to my Shorts?', answer: 'It is optional. The toggle only adds the hashtag; a video’s format, not the hashtag, makes it a Short.' },
      { question: 'Does this generator use AI or send my text anywhere?', answer: 'No. It builds hashtags from the words you type, in your browser.' },
    ],
  },
  'youtube-cpm-calculator': {
    about: [
      'CPM is what advertisers pay for 1,000 ad impressions before YouTube takes its share. Playback-based CPM is the same cost for 1,000 monetized playbacks, meaning views where at least one ad was shown. Both appear in YouTube Analytics on the Revenue tab.',
      'This calculator turns your views, monetized playback rate and playback-based CPM into gross ad revenue, then applies your revenue share. For long-form videos in the YouTube Partner Program, creators receive 55% of net ad revenue. The result is your estimated ad income and the RPM it implies.',
    ],
    source: { href: 'https://support.google.com/youtube/answer/9314357', label: 'Read YouTube’s guide to CPM and RPM' },
    faqs: [
      { question: 'What is CPM on YouTube?', answer: 'CPM is the cost advertisers pay per 1,000 ad impressions, before YouTube’s revenue share. YouTube Analytics also shows playback-based CPM, the cost per 1,000 monetized playbacks.' },
      { question: 'What is the difference between CPM and RPM?', answer: 'CPM is measured before YouTube’s share and counts only ads. RPM is what you earn per 1,000 views after the share, across all revenue sources and all views, including ones without ads.' },
      { question: 'How do I calculate YouTube earnings from CPM?', answer: 'Multiply views by your monetized playback rate to get monetized playbacks. Divide by 1,000 and multiply by playback-based CPM for gross revenue. Multiply by your revenue share to get your estimated earnings.' },
      { question: 'How much of the ad revenue does a creator get?', answer: 'For long-form videos in the YouTube Partner Program, creators receive 55% of net ad revenue. Shorts use a different revenue-sharing model, so change the share field if you are estimating Shorts.' },
      { question: 'What is a monetized playback?', answer: 'A view where the viewer saw at least one ad, or left during a pre-roll ad. Not every view shows an ad, so monetized playbacks are lower than views.' },
      { question: 'Why does CPM change from month to month?', answer: 'Advertiser demand varies with audience country, season, ad format and topic. Use figures from the same period in your own Analytics for the closest estimate.' },
    ],
  },
};
