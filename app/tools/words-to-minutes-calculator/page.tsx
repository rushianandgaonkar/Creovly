import { createToolMetadata, getTool } from '@/lib/metadata';
import ToolPageShell from '@/components/tools/ToolPageShell';
import ScriptLengthCalculator from '@/components/tools/ScriptLengthCalculator';
import JsonLd from '@/components/seo/JsonLd';
import { toolSoftwareApplicationJsonLd, toolFaqJsonLd, breadcrumbJsonLd } from '@/lib/structured-data';

const tool = getTool('words-to-minutes-calculator');
export const metadata = createToolMetadata(tool.slug);

export default function ScriptLengthCalculatorPage() {
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
        <ScriptLengthCalculator />
      </ToolPageShell>
    </>
  );
}
