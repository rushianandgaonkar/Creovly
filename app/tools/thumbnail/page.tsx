/* Hallmark · genre: modern-minimal · macrostructure: Workbench */
import { createPageMetadata } from '@/lib/metadata';
import ThumbnailToolsContent from '@/components/pages/ThumbnailToolsContent';
import JsonLd from '@/components/seo/JsonLd';
import { breadcrumbJsonLd } from '@/lib/structured-data';

export const metadata = createPageMetadata({
  title: 'Thumbnail & Packaging Tools',
  description:
    'Prepare your YouTube thumbnail with local resizing and compression, and manual Shorts framing guides.',
  path: '/tools/thumbnail',
  ogImage: '/og/tools.png',
});

export default function ThumbnailToolsPage() {
  const schemas = [
    breadcrumbJsonLd([
      { name: 'Tools', href: '/tools' },
      { name: 'Thumbnails', href: '/tools/thumbnail' },
    ]),
  ];

  return (
    <>
      <JsonLd data={schemas} />
      <ThumbnailToolsContent />
    </>
  );
}
