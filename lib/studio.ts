import { analyzeTitle } from './title-analysis';
import { checkShortsGuide, starterBox, starterMargins, type ContentBox, type Margins } from './shorts-guide';

export interface StudioDraft {
  version: 1;
  projectName: string;
  channel: string;
  title: string;
  description: string;
  keyword: string;
  kind: 'video' | 'shorts';
  uploadDevice: 'mobile' | 'desktop';
  fit: 'cover' | 'contain';
  margins: Margins;
  box: ContentBox;
  confirmations: Record<string, boolean>;
}
export interface StudioAsset { width: number; height: number; bytes: number; format: string; name: string }
export interface StudioCheck { id: string; label: string; passed: boolean; detail: string; source: 'automatic' | 'manual' }
export const studioConfirmations = [
  { id: 'accuracy', label: 'Title and image accurately represent the video' },
  { id: 'readability', label: 'I reviewed image detail and text at a small size' },
  { id: 'description', label: 'I reviewed links, credits, and applicable disclosures' },
  { id: 'rights', label: 'I reviewed permissions for the images, music, and footage' },
  { id: 'upload', label: 'I reviewed audience, captions, visibility, and upload settings' },
] as const;
export function emptyStudioDraft(): StudioDraft {
  return { version: 1, projectName: '', channel: '', title: '', description: '', keyword: '', kind: 'video', uploadDevice: 'mobile', fit: 'contain', margins: { ...starterMargins }, box: { ...starterBox }, confirmations: {} };
}
// Local storage is untrusted. Reconstruct only known fields and invalidate confirmations.
export function parseStudioDraft(raw: string): StudioDraft {
  const data = JSON.parse(raw);
  if (!data || data.version !== 1 || typeof data !== 'object') throw new Error('This saved draft is not supported.');
  const draft = emptyStudioDraft();
  for (const [key, limit] of [['projectName', 120], ['channel', 100], ['title', 2000], ['description', 10000], ['keyword', 100]] as const) {
    if (typeof data[key] !== 'string' || data[key].length > limit) throw new Error('This saved draft contains invalid text.');
    draft[key] = data[key];
  }
  if (!['video', 'shorts'].includes(data.kind) || !['mobile', 'desktop'].includes(data.uploadDevice) || !['cover', 'contain'].includes(data.fit)) throw new Error('This saved draft contains invalid settings.');
  draft.kind = data.kind; draft.uploadDevice = data.uploadDevice; draft.fit = data.fit;
  const margins = Object.fromEntries(Object.keys(draft.margins).map(key => [key, data.margins?.[key]])) as unknown as Margins;
  const box = Object.fromEntries(Object.keys(draft.box).map(key => [key, data.box?.[key]])) as unknown as ContentBox;
  checkShortsGuide(margins, box);
  draft.margins = margins; draft.box = box;
  return draft;
}
export function studioChecks(draft: StudioDraft, asset?: StudioAsset): StudioCheck[] {
  const title = draft.title.trim() ? analyzeTitle(draft.title, draft.keyword) : undefined;
  const targetRatio = draft.kind === 'video' ? 16 / 9 : 9 / 16;
  const sizeLimit = draft.kind === 'video' && draft.uploadDevice === 'mobile' ? 2_000_000 : 50_000_000;
  const checks: StudioCheck[] = [
    { id: 'title', label: 'Title length and characters', passed: !!title?.withinLimit && !/[<>]/u.test(draft.title), detail: !title ? 'Add a title.' : title.length > 100 ? `${title.length - 100} character${title.length === 101 ? '' : 's'} over the 100-unit limit.` : /[<>]/u.test(draft.title) ? 'Remove angle brackets and check final acceptance in YouTube Studio.' : `${title.length} / 100 character units.`, source: 'automatic' },
    { id: 'description-length', label: 'Description length and characters', passed: !!draft.description.trim() && draft.description.length <= 5000 && !/[<>]/u.test(draft.description), detail: !draft.description.trim() ? 'Add a description for this project.' : draft.description.length > 5000 ? `${draft.description.length - 5000} characters over the 5,000-unit limit.` : /[<>]/u.test(draft.description) ? 'Review angle brackets in your description.' : `${draft.description.length} / 5,000 character units.`, source: 'automatic' },
    { id: 'asset', label: draft.kind === 'video' ? 'Thumbnail selected' : 'Still frame selected', passed: !!asset, detail: asset ? `${asset.width} × ${asset.height} pixels.` : 'Choose a still JPEG, PNG, or WebP image.', source: 'automatic' },
    { id: 'image-format', label: 'JPEG or PNG format', passed: !!asset && ['image/jpeg', 'image/png'].includes(asset.format), detail: asset?.format === 'image/webp' ? 'Prepare a JPEG below or use the image tools.' : asset ? 'Image format checked from its file signature.' : 'Select an image first.', source: 'automatic' },
    { id: 'framing', label: draft.kind === 'video' ? '16:9 framing and minimum width' : '9:16 framing and minimum height', passed: !!asset && Math.abs(asset.width / asset.height / targetRatio - 1) < .01 && (draft.kind === 'video' ? asset.width : asset.height) >= 640, detail: 'Framing check uses a 1% ratio tolerance and a 640px minimum on the relevant axis. It does not measure readability.', source: 'automatic' },
    { id: 'image-size', label: draft.kind === 'video' && draft.uploadDevice === 'mobile' ? 'Within 2 MB mobile thumbnail target' : 'Within 50 MB desktop thumbnail target', passed: !!asset && asset.bytes <= sizeLimit, detail: draft.kind === 'shorts' ? 'For a custom Shorts thumbnail, review desktop upload availability in YouTube Studio.' : `Upload profile: ${draft.uploadDevice}. Studio accepts source images up to 20 MB.`, source: 'automatic' },
  ];
  if (draft.kind === 'shorts') {
    let detail = ''; let passed = false;
    try { const guide = checkShortsGuide(draft.margins, draft.box); passed = !!asset && !guide.overlaps.length; detail = guide.overlaps.length ? `Marked content overlaps: ${guide.overlaps.join(', ')}.` : 'Marked content is inside your chosen margins. Manual planning only; no automatic face/text detection.'; }
    catch (error) { detail = error instanceof Error ? error.message : 'Review the guide settings.'; }
    checks.push({ id: 'guide', label: 'Manual Shorts planning box', passed, detail, source: 'automatic' });
  }
  for (const item of studioConfirmations) checks.push({ ...item, passed: draft.confirmations[item.id] === true, detail: 'Confirmed by you; not automatically verified.', source: 'manual' });
  return checks;
}
export function studioReport(draft: StudioDraft, asset?: StudioAsset) {
  const checks = studioChecks(draft, asset);
  return { schemaVersion: 1, project: draft, asset: asset ?? null, checks, completed: checks.filter(check => check.passed).length, total: checks.length, titleNotes: draft.title.trim() ? analyzeTitle(draft.title, draft.keyword).notes : [], limitations: 'Local preparation report, not a prediction or approval by YouTube. Manual confirmations are self-reported. Preview wrapping and Shorts margins are illustrative. No publishing, video analysis, policy audit, or performance prediction is performed.' };
}
