/* Hallmark · genre: modern-minimal · macrostructure: Workbench · theme: Cobalt */
/* Hallmark · pre-emit critique: P5 H5 E5 S5 R5 V5 */
import { createPageMetadata } from '@/lib/metadata';
import PublishStudio from '@/components/studio/PublishStudio';

export const metadata = createPageMetadata({
  title: 'Publish Studio — Prepare your next YouTube upload',
  description: 'Prepare your title, description, and image in one local workspace. Review publishing checks, save a text draft, and download a project package.',
  path: '/studio',
});

export default function StudioPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
      <PublishStudio />
    </div>
  );
}
