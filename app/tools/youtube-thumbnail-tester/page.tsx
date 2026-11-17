import { createToolMetadata, getTool } from '@/lib/metadata';
import ToolPageShell from '@/components/tools/ToolPageShell';
import ThumbnailTester from '@/components/tools/ThumbnailTester';
import JsonLd from '@/components/seo/JsonLd';
import { toolSoftwareApplicationJsonLd, toolFaqJsonLd, breadcrumbJsonLd } from '@/lib/structured-data';

const tool = getTool('youtube-thumbnail-tester');
export const metadata = createToolMetadata(tool.slug);

export default function ThumbnailTesterPage() {
  const schemas = [
    toolSoftwareApplicationJsonLd(tool.slug),
    toolFaqJsonLd(tool.slug),
    breadcrumbJsonLd([
      { name: 'Tools', href: '/tools' },
      { name: tool.title, href: tool.href },
    ]),
  ].filter(Boolean);

  return (
    <>
      <JsonLd data={schemas as Record<string, unknown>[]} />
      <ToolPageShell
        title={tool.title}
        description={tool.description}
        category="Thumbnail Tools"
        categoryHref="/tools/thumbnail"
        toolSlug={tool.slug}
      >
        <ThumbnailTester />
      </ToolPageShell>
    </>
  );
}
