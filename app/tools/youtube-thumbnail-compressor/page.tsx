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
    >
      <ThumbnailCompressor />
    </ToolPageShell>
  );
}
