import { createPageMetadata } from '@/lib/metadata';
import Badge from '@/components/ui/Badge';
import ToolCard from '@/components/ui/ToolCard';
import { toolRegistry } from '@/config/site';

export const metadata = createPageMetadata({
  title: 'Creator Guides — Preview',
  description: 'Preview planned guides covering YouTube thumbnails, Shorts layouts, and creator monetization.',
  path: '/guides',
  noindex: true,
});

const guides = [
  {
    title: 'The YouTube Thumbnail Blueprint: File Limits, Dimensions & CTR',
    category: 'Visual Packaging',
    readTime: '6 min read',
    description:
      'Everything creators need to know about the 1280×720 aspect ratio, 2MB size cap, and visual framing tricks to boost organic click-through rate.',
    status: 'Preview',
  },
  {
    title: 'Decoding YouTube RPM: How Creators Actually Get Paid in 2026',
    category: 'Monetization',
    readTime: '8 min read',
    description:
      'Understand the difference between advertiser CPM and your take-home RPM, audience geography impacts, and how to diversify your channel income.',
    status: 'Preview',
  },
  {
    title: 'Shorts Safe Zones: Keeping Subtitles & Faces Unobscured',
    category: 'Shorts',
    readTime: '5 min read',
    description:
      'A comprehensive layout breakdown of mobile UI overlays on YouTube Shorts, TikTok, and Instagram Reels.',
    status: 'Preview',
  },
];

export default function GuidesPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      <div className="max-w-2xl mb-12">
        <div className="inline-flex items-center gap-2 mb-2">
          <Badge variant="neutral">Educational</Badge>
          <span className="text-xs font-mono text-[var(--text-muted)]">Platform Standards</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-ink)]">
          Creator Guides & Benchmarks
        </h1>
        <p className="mt-2 text-sm sm:text-base text-[var(--text-body)] leading-relaxed">
          Engineered guides covering YouTube packaging standards, monetization mathematics, and pre-publish best practices.
        </p>
      </div>

      {/* Guides List with honest preview treatment */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {guides.map((guide) => (
          <article
            key={guide.title}
            className="p-5 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] flex flex-col justify-between hover:border-[var(--border-hairline-strong)] hover:shadow-[var(--shadow-floating)] transition-all"
          >
            <div>
              <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)] mb-3">
                <span>{guide.category}</span>
                <span>{guide.readTime}</span>
              </div>
              <h2 className="text-base font-semibold text-[var(--text-ink)] leading-snug">
                {guide.title}
              </h2>
              <p className="mt-2 text-xs text-[var(--text-body)] leading-relaxed">
                {guide.description}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[var(--border-hairline-subtle)] flex items-center justify-between text-xs text-[var(--text-muted)]">
              <span className="font-mono text-[11px]">Editorial Guide</span>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[var(--bg-canvas-subtle)] text-[var(--text-muted)] border border-[var(--border-hairline)]">
                Coming Soon
              </span>
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

