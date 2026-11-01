/* Hallmark · genre: modern-minimal · macrostructure: Workbench · theme: Cobalt · enrichment: none */
/* Hallmark · pre-emit critique: P5 H5 E5 S5 R5 V5 */
import { createPageMetadata } from '@/lib/metadata';
import PolaroidLineCarousel from '@/components/ui/polaroid-line-carousel';
import CreatorHero from '@/components/home/CreatorHero';
import { toolRegistry } from '@/config/site';
import WorkflowShowcase from '@/components/home/WorkflowShowcase';
import WorkflowDestinations from '@/components/home/WorkflowDestinations';

export const metadata = createPageMetadata({
  title: 'Free YouTube Creator Tools | Creovly',
  description:
    'Explore free YouTube creator tools by Creovly. Compress and resize thumbnails, analyze titles, check Shorts safe zones, and calculate revenue.',
  path: '/',
});

export default function HomePage() {
  return (
    <>
      <CreatorHero />

      {/* Primary tool discovery */}
      <div id="tools" className="home-tools max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 scroll-mt-6">
        <PolaroidLineCarousel tools={toolRegistry.filter(tool => tool.status === 'available')} />
      </div>

      <WorkflowShowcase />

      <WorkflowDestinations />
    </>
  );
}
