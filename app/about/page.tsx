import { createPageMetadata } from '@/lib/metadata';
import AboutContent from '@/components/pages/AboutContent';

export const metadata = createPageMetadata({
  title: 'About Creovly — The Pre-Publish Workspace for YouTube Creators',
  description:
    'Learn about Creovly: an independent, privacy-first pre-publish command center offering 100% in-browser YouTube creator tools to compress thumbnails, test title hooks, check Shorts safe zones, and model revenue.',
  path: '/about',
});

export default function AboutPage() {
  return <AboutContent />;
}
