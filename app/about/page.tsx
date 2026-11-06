import { createPageMetadata } from '@/lib/metadata';
import AboutContent from '@/components/pages/AboutContent';

export const metadata = createPageMetadata({
  title: 'About Creovly: Pre-Publish Tools for YouTubers',
  description:
    'Creovly is a free, privacy-first pre-publish workspace for YouTube creators: compress thumbnails, test titles, check Shorts safe zones and model revenue.',
  path: '/about',
  ogImage: '/og/about.png',
});

export default function AboutPage() {
  return <AboutContent />;
}
