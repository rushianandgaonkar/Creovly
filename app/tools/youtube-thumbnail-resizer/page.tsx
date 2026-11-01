import { createToolMetadata, getTool } from '@/lib/metadata';
import ToolPageShell from '@/components/tools/ToolPageShell';
import ThumbnailResizer from '@/components/tools/ThumbnailResizer';
import styles from '@/components/ui/artwork.module.css';

const tool = getTool('youtube-thumbnail-resizer');
export const metadata = createToolMetadata(tool.slug);

export default function ThumbnailResizerPage() {
  return (
    <ToolPageShell
      className={styles.page}
      title={tool.title}
      description={tool.description}
      category="Thumbnail Tools"
      categoryHref="/tools/thumbnail"
      toolSlug={tool.slug}
      educationalContent={
        <>
          <p>
            Prepare a thumbnail, channel banner, profile picture or watermark asset from a still JPEG, PNG or WebP. Crop to fill trims edges; fit entire image adds padding. All exports remain rectangular.
          </p>
          <p>
            The banner preset uses 2560 × 1440. Its preview guide scales the central 1235 × 338 text/logo area published for a 2048 × 1152 banner. The 800 × 800 profile canvas is a Creovly preset, with an illustrative circle guide. The watermark canvas is 150 × 150; it prepares an asset without placing it on a video or removing its background.
          </p>
          <p>
            Guides never appear in downloaded files. Review your artwork in YouTube’s own upload preview. YouTube specifies banners at 6 MB or smaller and watermark images below 1 MB. See{' '}
            <a
              className="underline focus-ring"
              href="https://support.google.com/youtube/answer/10456525?hl=en"
              target="_blank"
              rel="noreferrer"
            >
              YouTube’s channel branding guidelines
            </a>{' '}
            for current requirements.
          </p>
          <p>
            Inputs are limited to 20 MB, 24 megapixels and 8,192 pixels per side. Output canvases use the same dimension limits. Resizing changes dimensions, not a target file size. Enlarging cannot recover detail. Exports may remove metadata or change colors.
          </p>
        </>
      }
      faqs={[
        {
          question: 'What is the best YouTube thumbnail size in 2026?',
          answer:
            'Standard YouTube video thumbnails require a 16:9 aspect ratio with a minimum width of 640 pixels. The recommended baseline resolution is 1280 × 720 pixels, with higher resolutions up to 3840 × 2160 supported on desktop. Files must remain under 2 MB for mobile Studio uploads and under 50 MB for desktop browser uploads. Supported formats are JPG, PNG, GIF, and BMP (with JPG and PNG officially recommended).',
        },
        {
          question: 'How to resize an image for a YouTube thumbnail?',
          answer:
            'Select the 1280 × 720 (16:9) preset in the resizer, adjust the crop alignment or padding to fit your artwork, and download the production-ready JPEG or PNG file.',
        },
        {
          question: 'How to convert an image to 1280x720 pixels?',
          answer:
            'Load your image into the resizer, choose the 1280 × 720 preset, and select either "Crop to Fill" to eliminate black bars or "Fit with Padding" to keep 100% of the original content without distortion.',
        },
        {
          question: 'What is the YouTube thumbnail aspect ratio?',
          answer:
            'Standard horizontal YouTube videos use a 16:9 widescreen ratio (1280×720 or 1920×1080). Vertical YouTube Shorts use a 9:16 portrait ratio (1080×1920).',
        },
        {
          question: 'How to resize a YouTube thumbnail without cropping?',
          answer:
            'Select "Fit Entire Image" mode in the resizer. This scales your artwork proportionally and adds clean canvas padding (black or transparent) around the borders without cutting off any edges or text.',
        },
      ]}
    >
      <ThumbnailResizer />
    </ToolPageShell>
  );
}
