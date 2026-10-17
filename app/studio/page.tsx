/* Hallmark · genre: modern-minimal · macrostructure: Workbench · theme: Cobalt */
/* Hallmark · pre-emit critique: P5 H5 E5 S5 R5 V5 */
import { createPageMetadata } from '@/lib/metadata';
import PageHero from '@/components/ui/PageHero';
import PublishStudio from '@/components/studio/PublishStudio';

export const metadata = createPageMetadata({
  title: 'Publish Studio — Prepare your next YouTube upload',
  description: 'Prepare your title, description, and image in one local workspace. Review publishing checks, save a text draft, and download a project package.',
  path: '/studio',
});

export default function StudioPage() {
  return <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
    <PageHero className="mb-8">
      <p className="text-xs font-medium text-[var(--text-body)] mb-2">Your pre-publish workspace</p>
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Creovly Publish Studio</h1>
      <p className="mt-3 text-sm sm:text-base text-[var(--text-body)] leading-relaxed">Bring your title, description, and image together. Review the details, prepare your files, and download a package for your next upload.</p>
      <p className="mt-3 text-xs text-[var(--text-body)]">Runs in your browser · No account needed · You stay in control of publishing</p>
    </PageHero>
    <PublishStudio />
  </div>;
}
