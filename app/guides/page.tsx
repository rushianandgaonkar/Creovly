import { createPageMetadata } from '@/lib/metadata';
import GuidesContent from '@/components/guides/GuidesContent';

export const metadata = createPageMetadata({
  title: 'Creator Guides & Benchmarks — Creovly',
  description:
    'Engineered guides covering YouTube packaging standards, thumbnail requirements, RPM monetization mathematics, and Shorts safe zones.',
  path: '/guides',
});

export default function GuidesPage() {
  return <GuidesContent />;
}
