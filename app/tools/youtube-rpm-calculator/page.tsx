import { createToolMetadata, getTool } from '@/lib/metadata';
import CalculatorPage from '@/components/tools/CalculatorPage';
import JsonLd from '@/components/seo/JsonLd';
import { toolWebApplicationJsonLd, breadcrumbJsonLd } from '@/lib/structured-data';

const tool = getTool('youtube-rpm-calculator');
export const metadata = createToolMetadata(tool.slug);

export default function Page() {
  const schemas = [
    toolWebApplicationJsonLd(tool.slug),
    breadcrumbJsonLd([
      { name: 'Tools', href: '/tools' },
      { name: tool.title, href: tool.href },
    ]),
  ].filter(Boolean);

  return (
    <>
      <JsonLd data={schemas as Record<string, unknown>[]} />
      <CalculatorPage kind="rpm" slug="youtube-rpm-calculator" />
    </>
  );
}
