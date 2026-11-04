import { createPageMetadata } from '@/lib/metadata';
import GuidesContent from '@/components/guides/GuidesContent';
import JsonLd from '@/components/seo/JsonLd';
import { breadcrumbJsonLd } from '@/lib/structured-data';

export const metadata = createPageMetadata({
  title: 'Creator Guides & Benchmarks',
  description:
    'Engineered guides covering YouTube packaging standards, thumbnail requirements, RPM monetization mathematics, and Shorts safe zones.',
  path: '/guides',
  ogImage: '/og/guides.png',
});

export default function GuidesPage() {
  const schemas = [
    breadcrumbJsonLd([
      { name: 'Guides', href: '/guides' },
    ]),
  ];

  return (
    <>
      <JsonLd data={schemas} />
      <GuidesContent />
    </>
  );
}
