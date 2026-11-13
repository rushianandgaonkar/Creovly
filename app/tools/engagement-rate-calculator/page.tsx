import { createToolMetadata, getTool } from '@/lib/metadata';
import ToolPageShell from '@/components/tools/ToolPageShell';
import EngagementRateCalculator from '@/components/tools/EngagementRateCalculator';
import JsonLd from '@/components/seo/JsonLd';
import { toolSoftwareApplicationJsonLd, toolFaqJsonLd, breadcrumbJsonLd } from '@/lib/structured-data';

const tool = getTool('engagement-rate-calculator');
export const metadata = createToolMetadata(tool.slug);

export default function EngagementRateCalculatorPage() {
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
        category="Money & Growth"
        categoryHref="/tools"
        toolSlug={tool.slug}
      >
        <EngagementRateCalculator />
      </ToolPageShell>
    </>
  );
}
