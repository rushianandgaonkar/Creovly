import { createToolMetadata, getTool } from '@/lib/metadata';
import ToolPageShell from '@/components/tools/ToolPageShell';
import TitleChecker from '@/components/tools/TitleChecker';
import JsonLd from '@/components/seo/JsonLd';
import { toolSoftwareApplicationJsonLd, toolFaqJsonLd, breadcrumbJsonLd } from '@/lib/structured-data';

const tool = getTool('youtube-title-checker');
export const metadata = createToolMetadata(tool.slug);

export default function TitleCheckerPage() {
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
        category="Title Tools"
        categoryHref="/tools#title"
        toolSlug={tool.slug}
      >
        <TitleChecker />
      </ToolPageShell>
    </>
  );
}
