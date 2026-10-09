import { createPageMetadata } from '@/lib/metadata';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import ToolDiscovery from '@/components/tools/ToolDiscovery';
import { siteConfig, toolRegistry } from '@/config/site';

export const metadata = createPageMetadata({
  title: `${siteConfig.name} — YouTube creator tools`,
  description: siteConfig.description,
  path: '/',
});

export default function HomePage() {
  return <>
    <section className="home-hero">
      <div aria-hidden="true" className="home-hero-grid" />
      <div className="home-hero-content max-w-6xl mx-auto px-4 sm:px-6">
        <p className="home-eyebrow"><span aria-hidden="true" />Your next upload starts here</p>
        <h1 className="home-headline">Create smarter.<br /><span>Publish better.</span></h1>
        <p className="home-intro">Prepare thumbnails, check titles, and plan your next YouTube upload.</p>
        <p className="home-assurance"><svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></svg>No account needed<span aria-hidden="true">·</span>Tools run in your browser</p>
      </div>
    </section>
    <div className="home-tools max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8"><ToolDiscovery tools={toolRegistry} visualCards /></div>
    <section aria-label="More ways to prepare" className="max-w-6xl mx-auto px-4 sm:px-6 pb-10 sm:pb-14 mt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 border-t border-[var(--border-hairline)] pt-8">
        <article className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] p-5 space-y-3">
          <h2 className="text-lg font-semibold tracking-tight">One final check before publishing.</h2>
          <p className="text-sm text-[var(--text-body)] leading-relaxed">Review your thumbnail, title, disclosures, and upload details with the interactive pre-publish checklist.</p>
          <Button href="/checklist" variant="outline">Open the checklist &rarr;</Button>
        </article>
        <article className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] p-5 space-y-3">
          <div className="flex flex-wrap items-center gap-2"><h2 className="text-lg font-semibold tracking-tight">Publish Studio</h2><Badge variant="neutral">Preview</Badge></div>
          <p className="text-sm text-[var(--text-body)] leading-relaxed">Explore the planned combined workspace. Studio currently shows sample layouts; use the individual tools above for working results.</p>
          <Button href="/studio" variant="ghost">Explore the Studio preview &rarr;</Button>
        </article>
      </div>
    </section>
  </>;
}
