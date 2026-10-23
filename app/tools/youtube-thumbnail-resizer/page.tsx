import { createToolMetadata, getTool } from '@/lib/metadata';
import ToolPageShell from '@/components/tools/ToolPageShell';
import ThumbnailResizer from '@/components/tools/ThumbnailResizer';
import styles from '@/components/ui/artwork.module.css';

const tool = getTool('youtube-thumbnail-resizer');
export const metadata = createToolMetadata(tool.slug);

export default function ThumbnailResizerPage() {
  return <ToolPageShell className={styles.page} title={tool.title} description={tool.description} category="Thumbnail Tools" categoryHref="/tools/thumbnail" toolSlug={tool.slug}
    educationalContent={<><p>Prepare a thumbnail, channel banner, profile picture or watermark asset from a still JPEG, PNG or WebP. Crop to fill trims edges; fit entire image adds padding. All exports remain rectangular.</p><p>The banner preset uses 2560 × 1440. Its preview guide scales the central 1235 × 338 text/logo area published for a 2048 × 1152 banner. The 800 × 800 profile canvas is a Creovly preset, with an illustrative circle guide. The watermark canvas is 150 × 150; it prepares an asset without placing it on a video or removing its background.</p><p>Guides never appear in downloaded files. Review your artwork in YouTube’s own upload preview. YouTube specifies banners at 6 MB or smaller and watermark images below 1 MB. See <a className="underline focus-ring" href="https://support.google.com/youtube/answer/10456525?hl=en" target="_blank" rel="noreferrer">YouTube’s channel branding guidelines</a> for current requirements.</p><p>Inputs are limited to 20 MB, 24 megapixels and 8,192 pixels per side. Output canvases use the same dimension limits. Resizing changes dimensions, not a target file size. Enlarging cannot recover detail. Exports may remove metadata or change colors.</p></>}
    faqs={[
      { question: 'Which dimensions and formats are supported?', answer: 'Still JPEG, PNG, and WebP inputs can be up to 20 MB. Input and output are limited to 24 megapixels and 8,192 pixels per side. Choose a preset or custom dimensions, then export JPEG, PNG, or WebP.' },
      { question: 'Will enlarging improve a blurry thumbnail?', answer: 'No. Enlarging adds pixels but does not recover missing detail. Inspect small text and edges in the exported image; use a higher-resolution original when possible.' },
      { question: 'Are my images uploaded?', answer: 'No. Decoding, resizing, and exporting happen in your browser. Images are not stored by this tool, and leaving or resetting clears the workspace.' },
      { question: 'Can I keep transparency?', answer: 'Choose Transparent as the canvas background and export PNG or WebP. JPEG does not support transparency; transparent areas become white.' },
      { question: 'Does the preview match the download?', answer: 'The framing preview shows the crop and padding. After resizing, the output preview uses the actual exported image, including format and quality changes. Review it before downloading.' },
      { question: 'Can I move the crop?', answer: 'Yes. Horizontal and vertical sliders move the crop across available space. When an axis does not need cropping, its slider has no effect. Fit entire image always centers the image.' },
      { question: 'Will the guides or circular crop appear in my download?', answer: 'No. Banner and profile guides are preview overlays only. Your download stays rectangular; YouTube controls the displayed crop. Review the image in YouTube’s own upload preview.' },
      { question: 'What changes when I choose another preset?', answer: 'The canvas dimensions, format, fit, background and crop position switch to that preset’s defaults. Your source image stays selected, but any previous output is cleared. Quality remains at your chosen setting. Reset restores the thumbnail defaults and clears the image.' },
      { question: 'Does the watermark preset remove a background or add a watermark to my image?', answer: 'It resizes your existing artwork into a 150 × 150 square PNG with transparent padding. It preserves transparency already in the source. Use the logo background remover first for a solid-color background. Watermark placement is a separate task.' },
    ]}><ThumbnailResizer /></ToolPageShell>;
}

