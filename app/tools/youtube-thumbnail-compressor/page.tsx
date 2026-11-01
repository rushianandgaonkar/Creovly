import { createToolMetadata, getTool } from '@/lib/metadata';
import ToolPageShell from '@/components/tools/ToolPageShell';
import ThumbnailCompressor from '@/components/tools/ThumbnailCompressor';

const tool = getTool('youtube-thumbnail-compressor');
export const metadata = createToolMetadata(tool.slug);

export default function ThumbnailCompressorPage() {
  return (
    <ToolPageShell
      title={tool.title}
      description={tool.description}
      category={tool.categoryLabel}
      categoryHref="/tools/thumbnail"
      toolSlug={tool.slug}
      faqs={[
        {
          question: 'How to compress a YouTube thumbnail without losing quality?',
          answer:
            'Upload your thumbnail and select JPEG (the format officially recommended by YouTube along with PNG). While WebP is supported for website embedding, YouTube officially recommends JPG or PNG for Studio uploads. Setting quality between 75% and 85% reduces file weight dramatically while keeping fine text and faces sharp.',
        },
        {
          question: 'How to reduce YouTube thumbnail size under 2MB?',
          answer:
            'Set your target file size slider to under 2 MB in the compressor. This ensures your thumbnail meets YouTube’s strict 2 MB mobile Studio upload limit (desktop allows up to 50 MB) and prevents upload rejection errors.',
        },
        {
          question: 'How to make a YouTube thumbnail file smaller?',
          answer:
            'Convert heavy PNG illustrations to optimized JPEGs, ensure dimensions match 1280×720 rather than 4K, and compress to remove unneeded metadata and redundant pixel data.',
        },
        {
          question: 'What is the maximum file size for a YouTube thumbnail?',
          answer:
            'According to official YouTube platform specifications, custom thumbnails must be under 2 MB for mobile Studio uploads and under 50 MB for desktop browser uploads. Supported formats are JPEG, PNG, and GIF.',
        },
        {
          question: 'How to compress a PNG thumbnail for YouTube?',
          answer:
            'Upload your PNG and apply client-side compression. If the file exceeds 2 MB and doesn’t require transparency, converting to high-quality JPEG will shrink file weight by up to 80% without losing sharpness.',
        },
      ]}
      educationalContent={
        <>
          <p>
            Every image uses the same target, format, and maximum quality settings. Changing settings or selecting a replacement batch clears previous outputs so you cannot download results from stale settings. Removing an individual image keeps the other completed results.
          </p>
          <p>
            Dimensions are preserved. Re-encoding can change colors or remove embedded metadata. If the original is retained, its metadata is retained too. Samples load one image; upload multiple files to test a batch.
          </p>
          <p>
            <a
              href="https://support.google.com/youtube/answer/72431?hl=en"
              className="text-[var(--brand-accent)] underline focus-ring"
            >
              Check YouTube’s current thumbnail guidance
            </a>{' '}
            before uploading.
          </p>
        </>
      }
    >
      <ThumbnailCompressor />
    </ToolPageShell>
  );
}
