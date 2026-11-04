/* Hallmark · genre: modern-minimal · macrostructure: Workbench */
import { createPageMetadata } from '@/lib/metadata';
import ToolsDirectoryContent from '@/components/tools/ToolsDirectoryContent';
import JsonLd from '@/components/seo/JsonLd';
import { breadcrumbJsonLd } from '@/lib/structured-data';

export const metadata = createPageMetadata({
  title: 'Creator Tools Directory',
  description:
    'Find tools for thumbnails, title drafts, Shorts framing, revenue, RPM, watch hours, and creator income scenarios.',
  path: '/tools',
  ogImage: '/og/tools.png',
});

export default function ToolsDirectoryPage() {
  const schemas = [
    breadcrumbJsonLd([
      { name: 'Tools', href: '/tools' },
    ]),
  ];

  return (
    <>
      <JsonLd data={schemas} />
      <ToolsDirectoryContent />
    </>
  );
}
