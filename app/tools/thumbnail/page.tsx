/* Hallmark · genre: modern-minimal · macrostructure: Workbench */
import { createPageMetadata } from '@/lib/metadata';
import ThumbnailToolsContent from '@/components/pages/ThumbnailToolsContent';

export const metadata = createPageMetadata({
  title: 'Thumbnail & Packaging Tools',
  description:
    'Prepare your YouTube thumbnail with local resizing and compression, and manual Shorts framing guides.',
  path: '/tools/thumbnail',
});

export default function ThumbnailToolsPage() {
  return <ThumbnailToolsContent />;
}
