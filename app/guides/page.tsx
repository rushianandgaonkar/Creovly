import Link from 'next/link';
import { createPageMetadata } from '@/lib/metadata';
import Badge from '@/components/ui/Badge';
import ToolCard from '@/components/ui/ToolCard';
import { toolRegistry } from '@/config/site';
import PageHero from '@/components/ui/PageHero';
import { guides } from '@/lib/guides';

export const metadata = createPageMetadata({
  title: 'Creator Guides & Benchmarks — Creovly',
  description:
    'Engineered guides covering YouTube packaging standards, thumbnail requirements, RPM monetization mathematics, and Shorts safe zones.',
  path: '/guides',
});

export default function GuidesPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      <PageHero tone="violet" className="mb-12">
        <div className="inline-flex items-center gap-2 mb-2">
          <Badge variant="neutral">Educational</Badge>
          <span className="text-xs font-mono text-[var(--text-muted)]">Verified Platform Standards</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-ink)]">
          Creator Guides & Benchmarks
        </h1>
        <p className="mt-2 text-sm sm:text-base text-[var(--text-body)] leading-relaxed">
          Engineered guides covering YouTube packaging standards, monetization mathematics, and pre-publish best practices with official platform citations.
        </p>
      </PageHero>

      {/* Guides List with active routing */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {guides.map((guide) => (
          <article
            key={guide.slug}
            className="p-5 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] flex flex-col justify-between hover:border-[var(--border-hairline-strong)] hover:shadow-[var(--shadow-floating)] transition-all group"
          >
            <div>
              <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)] mb-3">
                <span>{guide.category}</span>
                <span>{guide.readTime}</span>
              </div>
              <h2 className="text-base font-semibold text-[var(--text-ink)] leading-snug group-hover:text-[var(--brand-accent)] transition-colors">
                <Link href={`/guides/${guide.slug}`} className="focus:outline-none">
                  {guide.title}
                </Link>
              </h2>
              <p className="mt-2 text-xs text-[var(--text-body)] leading-relaxed">
                {guide.description}
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-[var(--border-hairline-subtle)] flex items-center justify-between text-xs text-[var(--text-muted)]">
              <span className="font-mono text-[10px] text-[var(--text-muted)]">
                Verified {guide.lastVerified}
              </span>
              <Link
                href={`/guides/${guide.slug}`}
                className="text-xs font-medium text-[var(--brand-accent)] hover:underline inline-flex items-center gap-1"
              >
                Read guide &rarr;
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* Tools Reference */}
      <section className="pt-10 border-t border-[var(--border-hairline)]">
        <h2 className="text-lg font-bold tracking-tight text-[var(--text-ink)] mb-4">
          Explore the creator tools
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {toolRegistry.slice(0, 3).map((tool) => (
            <ToolCard
              key={tool.id}
              title={tool.title}
              description={tool.description}
              href={tool.href}
              categoryLabel={tool.categoryLabel}
              badge={tool.badge}
              status={tool.status}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
