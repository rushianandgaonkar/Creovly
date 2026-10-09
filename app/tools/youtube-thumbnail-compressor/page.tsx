import { createToolMetadata, getTool } from '@/lib/metadata';
import ToolPageShell from '@/components/tools/ToolPageShell';
import ThumbnailCompressor from '@/components/tools/ThumbnailCompressor';

const tool = getTool('youtube-thumbnail-compressor');
export const metadata = createToolMetadata(tool.slug);

export default function ThumbnailCompressorPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description} category={tool.categoryLabel} categoryHref="/tools/thumbnail" toolSlug={tool.slug}
      faqs={[
        { question: 'Do my images leave my device?', answer: 'No. This tool reads and compresses the selected image inside your browser. It does not upload your image to a server or keep it after you clear the workspace.' },
        { question: 'Will the compressed thumbnail look exactly the same?', answer: 'JPEG and WebP compression can change image detail. Compare the previews, especially small text and edges. PNG preserves transparency and does not use a lossy quality setting. If the original is smaller than the same-format output, we keep the original.' },
        { question: 'What if the output cannot reach my target?', answer: 'The tool reports that the target was not reached and shows the actual output size. It does not silently resize your image. Try a different format, a larger target, or resize the source with the thumbnail resizer.' },
        { question: 'Which files can I use?', answer: 'Still JPEG, PNG, and WebP images up to 20 MB, 24 megapixels, and 8,192 pixels on either side. Animated images and damaged files are rejected. Use JPEG or PNG when preparing a YouTube upload.' },
      ]}
      educationalContent={<>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Select one thumbnail or drag it into the workspace.</li>
          <li>Choose a target size and output format. Open advanced settings to limit JPEG or WebP quality.</li>
          <li>Compress, compare the original and output, then download the image.</li>
        </ol>
        <p>Dimensions are preserved. JPEG replaces transparency with white; PNG and WebP keep it. Re-encoding may change colors or remove embedded metadata. If the original is retained, its metadata is retained too.</p>
        <p>YouTube currently lists a 2 MB limit for mobile video-thumbnail uploads and 50 MB on desktop. It recommends JPEG or PNG and a 16:9 aspect ratio for standard videos. The 2 MB default here is a size target, not a guarantee of upload eligibility. <a href="https://support.google.com/youtube/answer/72431?hl=en" className="text-[var(--brand-accent)] underline focus-ring">Check YouTube’s current guidance</a>.</p>
      </>}
    >
      <ThumbnailCompressor />
    </ToolPageShell>
  );
}

