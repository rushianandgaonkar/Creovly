import { createToolMetadata, getTool } from '@/lib/metadata';
import ToolPageShell from '@/components/tools/ToolPageShell';
import ThumbnailCompressor from '@/components/tools/ThumbnailCompressor';
import JsonLd from '@/components/seo/JsonLd';
import { toolSoftwareApplicationJsonLd, toolFaqJsonLd, breadcrumbJsonLd } from '@/lib/structured-data';

const tool = getTool('youtube-thumbnail-compressor');
export const metadata = createToolMetadata(tool.slug);

export default function ThumbnailCompressorPage() {
  const schemas = [
    toolSoftwareApplicationJsonLd(tool.slug),
    toolFaqJsonLd(tool.slug),
    breadcrumbJsonLd([
      { name: 'Tools', href: '/tools' },
      { name: 'Thumbnails', href: '/tools/thumbnail' },
      { name: tool.title, href: tool.href },
    ]),
  ].filter(Boolean);

  return (
    <>
      <JsonLd data={schemas as Record<string, unknown>[]} />
      <ToolPageShell
        title={tool.title}
        description={tool.description}
        category={tool.categoryLabel}
        categoryHref="/tools/thumbnail"
        toolSlug={tool.slug}
      >
        <ThumbnailCompressor />
      </ToolPageShell>
    </>
  );
}
