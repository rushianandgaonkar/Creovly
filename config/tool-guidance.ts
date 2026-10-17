import type { CalculatorKind } from '@/lib/creator-calculators';

export interface ToolGuidance {
  steps: [ { title: string; body: string }, { title: string; body: string }, { title: string; body: string } ];
  related: [string, string, string];
  image?: { before: string; after: string; beforeLabel: string; afterLabel: string; note: string; transparent?: boolean; portrait?: boolean };
  calculator?: CalculatorKind;
  titleExample?: true;
}
const resizer = 'youtube-thumbnail-resizer';
const compressor = 'youtube-thumbnail-compressor';
const logo = 'logo-background-remover';
const shorts = 'youtube-shorts-safe-zone';
const title = 'youtube-title-checker';
const revenue = 'youtube-revenue-calculator';
const rpm = 'youtube-rpm-calculator';
const watch = 'youtube-watch-hours-calculator';
const income = 'youtube-monetization-calculator';

export const toolGuidance: Record<string, ToolGuidance> = {
  [logo]: {
    steps: [
      { title: 'Choose your logo', body: 'Select a still JPEG, PNG, or WebP with a flat background. The starting color comes from its top-left pixel.' },
      { title: 'Remove the background', body: 'Confirm the color and adjust tolerance. Select Remove background to process the border-connected areas.' },
      { title: 'Inspect and download', body: 'Check edges on light, dark, and checkerboard previews, then download your transparent PNG.' },
    ], related: [resizer, compressor, title],
    image: { before: 'logo-source.png', after: 'logo-transparent.png', beforeLabel: 'Before · white background', afterLabel: 'After · transparent PNG', transparent: true, note: 'White background removed at 12% tolerance. Enclosed white lettering stays intact. The checkerboard indicates transparency and is not part of the file.' },
  },
  [resizer]: {
    steps: [
      { title: 'Select a thumbnail', body: 'Choose a still JPEG, PNG, or WebP. Review its original dimensions before choosing your canvas.' },
      { title: 'Set the framing', body: 'Choose dimensions, crop or padding, and an output format. Move the crop to keep important content visible.' },
      { title: 'Resize and review', body: 'Select Resize thumbnail, compare the exported output, and download it. Compress afterward if needed.' },
    ], related: [compressor, logo, title],
    image: { before: 'thumbnail-source.png', after: 'thumbnail-resized.jpg', beforeLabel: 'Before · 1600 × 1000', afterLabel: 'After · 1280 × 720', note: 'Center crop to fill a 16:9 canvas, exported as JPEG at 90% quality. Top and bottom edges are cropped; the image is not stretched.' },
  },
  [compressor]: {
    steps: [
      { title: 'Select your image', body: 'Choose a still JPEG, PNG, or WebP thumbnail. Its dimensions and original file size appear in the workspace.' },
      { title: 'Choose a size target', body: 'Set the target and format. Advanced settings let you limit JPEG or WebP quality.' },
      { title: 'Compare and download', body: 'Compress, inspect text and edges, and download the result. If the target is missed, adjust settings or resize first.' },
    ], related: [resizer, title, logo],
    image: { before: 'compressor-source.jpg', after: 'thumbnail-compressed.jpg', beforeLabel: 'Before · original JPEG', afterLabel: 'After · compressed JPEG', note: 'Same 1600 × 1000 dimensions. JPEG, 2,000 KB target, maximum quality 90%. File sizes below are measured from these example files; results vary by image and browser.' },
  },
  [shorts]: {
    steps: [
      { title: 'Choose a still frame', body: 'Export a representative frame from your video, then select its JPEG, PNG, or WebP image.' },
      { title: 'Plan your margins', body: 'Adjust reserved edges and optionally place a content box over important text or a subject. Review any overlap.' },
      { title: 'Export the guide', body: 'Create the annotated PNG for reference. Keep your clean source for publishing and check the actual Shorts player.' },
    ], related: [resizer, title, compressor],
    image: { before: 'shorts-source.png', after: 'shorts-guide.png', beforeLabel: 'Before · clean still frame', afterLabel: 'After · annotated reference', portrait: true, note: 'Starting margins: top 10%, bottom 25%, left 5%, right 18%. The shaded edges are manual planning assumptions, not official YouTube safe zones. Annotations are included in this export.' },
  },
  [title]: {
    steps: [
      { title: 'Enter a draft', body: 'Paste your title and optionally add an exact topic phrase you want to check.' },
      { title: 'Review the feedback', body: 'Check character units, whitespace, punctuation, and phrase placement. Explore wrapping at different widths.' },
      { title: 'Refine the wording', body: 'Edit the title yourself, then copy it when ready. Check accuracy and final acceptance in YouTube Studio.' },
    ], related: [compressor, resizer, shorts], titleExample: true,
  },
  [revenue]: {
    steps: [
      { title: 'Enter monthly views', body: 'Use your own views or a planning assumption. For Shorts, use the engaged-view basis.' },
      { title: 'Set your RPM range', body: 'Supply lower and upper RPM assumptions after the platform share. No niche benchmark is inserted.' },
      { title: 'Calculate a scenario', body: 'Compare monthly and annual amounts, then copy the assumptions and formulas if useful.' },
    ], related: [rpm, income, watch], calculator: 'revenue',
  },
  [rpm]: {
    steps: [
      { title: 'Choose one period', body: 'Gather creator revenue and views covering the same dates and revenue scope.' },
      { title: 'Enter matching values', body: 'Enter revenue in USD and the corresponding views. Use engaged views for Shorts.' },
      { title: 'Calculate your RPM', body: 'Review revenue per 1,000 views and copy the calculation. This does not infer advertiser CPM.' },
    ], related: [revenue, income, watch], calculator: 'rpm',
  },
  [watch]: {
    steps: [
      { title: 'Set your starting point', body: 'Enter current hours and your chosen goal. These values do not confirm monetization eligibility.' },
      { title: 'Describe your pace', body: 'Enter additional monthly hours and average view duration in minutes.' },
      { title: 'Review the scenario', body: 'Calculate hours remaining, additional views, and a constant-pace timeline. Expiring hours are not simulated.' },
    ], related: [revenue, rpm, income], calculator: 'watch-hours',
  },
  [income]: {
    steps: [
      { title: 'Add platform assumptions', body: 'Enter monthly views and your platform RPM after the platform share.' },
      { title: 'Add income and costs', body: 'Include deals, fees, affiliates, other income, and costs. Avoid counting revenue already included in RPM twice.' },
      { title: 'Review the totals', body: 'Calculate monthly income and the amount after costs, before taxes. Annual results repeat the monthly scenario.' },
    ], related: [revenue, rpm, watch], calculator: 'monetization',
  },
};

export const titleDemonstration = {
  before: '  HOW TO PLAN YOUR FIRST YOUTUBE VIDEO!!!  ',
  after: 'How to plan your first YouTube video',
  phrase: 'YouTube video',
};
