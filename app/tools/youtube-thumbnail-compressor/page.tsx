import { createToolMetadata, getTool } from '@/lib/metadata';
import ToolPageShell from '@/components/tools/ToolPageShell';
import ThumbnailCompressor from '@/components/tools/ThumbnailCompressor';

const tool = getTool('youtube-thumbnail-compressor');
export const metadata = createToolMetadata(tool.slug);

export default function ThumbnailCompressorPage() {
  return <ToolPageShell title={tool.title} description={tool.description} category={tool.categoryLabel} categoryHref="/tools/thumbnail" toolSlug={tool.slug}
    faqs={[
      { question: 'How many thumbnails can I compress?', answer: 'Select 1–10 images with a total input size up to 50 MB. Each image must be under 20 MB, 24 megapixels, and 8,192 pixels per side. Completed outputs are limited to 60 MB total. Files are processed sequentially to limit memory use.' },
      { question: 'What happens when one file fails or I cancel?', answer: 'A failed image gets its own error; later files continue. Cancel stops the current image and queued work while keeping completed outputs. Reset clears the entire batch. Browser encoders may take a moment to finish before cancellation is observed.' },
      { question: 'What does the ZIP contain?', answer: 'Only completed outputs, including images that did not meet the requested size target. Failed and cancelled files are excluded. Numbered filenames prevent overwriting files with the same name. Review each image before downloading.' },
      { question: 'Do my images leave my device?', answer: 'No. Compression and ZIP creation happen in your browser. This tool does not upload or save selected images. Reset or leave the page to clear the workspace.' },
      { question: 'Will the compressed thumbnail look exactly the same?', answer: 'JPEG and WebP can change detail. Compare small text and edges. PNG preserves transparency without lossy quality control. A smaller same-format original is retained. Conversion can increase file size, and size targets may be missed.' },
      { question: 'Which output format should I choose?', answer: 'JPEG replaces transparency with white; PNG and WebP preserve it. For a YouTube upload, choose JPEG or PNG and review current platform guidance. Meeting a file-size target alone does not guarantee upload eligibility.' },
    ]}
    educationalContent={<><p>Every image uses the same target, format, and maximum quality settings. Changing settings or selecting a replacement batch clears previous outputs so you cannot download results from stale settings. Removing an individual image keeps the other completed results.</p><p>Dimensions are preserved. Re-encoding can change colors or remove embedded metadata. If the original is retained, its metadata is retained too. Samples load one image; upload multiple files to test a batch.</p><p><a href="https://support.google.com/youtube/answer/72431?hl=en" className="text-[var(--brand-accent)] underline focus-ring">Check YouTube’s current thumbnail guidance</a> before uploading.</p></>}
  ><ThumbnailCompressor /></ToolPageShell>;
}
