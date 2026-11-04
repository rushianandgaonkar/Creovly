import { createToolMetadata, getTool } from '@/lib/metadata';
import ToolPageShell from '@/components/tools/ToolPageShell';
import LogoBackgroundRemover from '@/components/tools/LogoBackgroundRemover';
import JsonLd from '@/components/seo/JsonLd';
import { toolWebApplicationJsonLd, breadcrumbJsonLd } from '@/lib/structured-data';

const tool = getTool('logo-background-remover');
export const metadata = createToolMetadata(tool.slug);

export default function LogoBackgroundRemoverPage() {
  const schemas = [
    toolWebApplicationJsonLd(tool.slug),
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
        category="Thumbnail Tools"
        categoryHref="/tools/thumbnail"
        toolSlug={tool.slug}
      >
        <LogoBackgroundRemover />
      </ToolPageShell>
    </>
  );
}
