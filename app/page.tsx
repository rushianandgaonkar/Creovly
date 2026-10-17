/* Hallmark · genre: modern-minimal · macrostructure: Workbench · theme: Cobalt · enrichment: none */
/* Hallmark · pre-emit critique: P5 H5 E5 S5 R5 V5 */
import { createPageMetadata } from '@/lib/metadata';
import Button from '@/components/ui/Button';
import ToolDiscovery from '@/components/tools/ToolDiscovery';
import CreatorHero from '@/components/home/CreatorHero';
import { siteConfig, toolRegistry } from '@/config/site';

import SpotlightCard from '@/components/ui/SpotlightCard';
import WorkflowShowcase from '@/components/home/WorkflowShowcase';

export const metadata = createPageMetadata({
  title: `${siteConfig.name} — YouTube creator tools`,
  description: siteConfig.description,
  path: '/',
});

export default function HomePage() {
  return (
    <>
      <CreatorHero />

      {/* The 3-Step Pre-Publish Workflow */}
      <WorkflowShowcase />

      {/* Primary Tool Discovery Workbench */}
      <main id="tools" className="home-tools max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 scroll-mt-6">
        <ToolDiscovery tools={toolRegistry} visualCards />
      </main>

      {/* Pre-Publish Workflow Destinations */}
      <section aria-label="Pre-publish workflow options" className="max-w-6xl mx-auto px-4 sm:px-6 pb-12 sm:pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-[var(--border-hairline)] pt-8">
          <SpotlightCard as="article" className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] font-semibold">
                Checklist Workflow
              </span>
              <span className="w-2 h-2 rounded-full bg-amber-500" aria-hidden="true" />
            </div>
            <h2 className="text-xl font-bold tracking-tight text-[var(--text-ink)]">
              Pre-Publish Checklist
            </h2>
            <p className="text-sm text-[var(--text-body)] leading-relaxed">
              Systematically verify thumbnail specs, title character truncation, audio licensing disclosures, and final upload readiness before releasing to your audience.
            </p>
            <div className="pt-2">
              <Button href="/checklist" variant="outline">
                Open the checklist &rarr;
              </Button>
            </div>
          </SpotlightCard>

          <SpotlightCard as="article" spotlightColor="rgba(0, 112, 243, 0.2)" className="p-6 space-y-4 border-[var(--brand-accent)]/30">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--brand-accent)] font-semibold">
                Flagship Command Center
              </span>
              <span className="w-2 h-2 rounded-full bg-[var(--brand-accent)] animate-pulse" aria-hidden="true" />
            </div>
            <h2 className="text-xl font-bold tracking-tight text-[var(--text-ink)]">
              Publish Studio
            </h2>
            <p className="text-sm text-[var(--text-body)] leading-relaxed">
              Draft your title, description, and thumbnail in a unified multi-pane workspace. Run automated checks, save local text drafts, and download your complete project package (.zip).
            </p>
            <div className="pt-2">
              <Button href="/studio" variant="primary">
                Launch Publish Studio &rarr;
              </Button>
            </div>
          </SpotlightCard>
        </div>
      </section>
    </>
  );
}
