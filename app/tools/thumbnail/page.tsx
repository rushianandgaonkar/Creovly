/* Hallmark · genre: modern-minimal · macrostructure: Workbench */
import Link from 'next/link';
import { toolRegistry } from '@/config/site';
import { createPageMetadata } from '@/lib/metadata';
import ToolCard from '@/components/ui/ToolCard';
import Button from '@/components/ui/Button';
import PageHero from '@/components/ui/PageHero';

export const metadata = createPageMetadata({
  title: 'Thumbnail & Packaging Tools',
  description:
    'Prepare your YouTube thumbnail with local resizing and compression, and manual Shorts framing guides.',
  path: '/tools/thumbnail',
});

export default function ThumbnailToolsPage() {
  const tools = toolRegistry.filter((tool) => tool.category === 'thumbnail');

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Precision Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)] mb-6"
      >
        <Link href="/" className="hover:text-[var(--text-ink)] transition-colors">
          Home
        </Link>
        <span aria-hidden="true" className="text-[var(--text-faint)]">
          /
        </span>
        <Link href="/tools" className="hover:text-[var(--text-ink)] transition-colors">
          Tools
        </Link>
        <span aria-hidden="true" className="text-[var(--text-faint)]">
          /
        </span>
        <span className="text-[var(--text-ink)] font-semibold" aria-current="page">
          Thumbnails & Shorts
        </span>
      </nav>

      <PageHero tone="blue" className="mb-10">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono uppercase tracking-wider font-semibold border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] text-[var(--text-ink)]">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            Visual Packaging
          </span>
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 bg-emerald-500/5">
            100% In-Browser Execution
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-ink)]">
          Thumbnail & Packaging Toolkit
        </h1>
        <p className="mt-2.5 text-sm sm:text-base text-[var(--text-body)] max-w-2xl leading-relaxed">
          Frame, resize, remove logo backgrounds, and compress YouTube thumbnails locally to meet
          the 2MB ceiling without losing crisp visual clarity.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button href="/tools/youtube-thumbnail-compressor">
            Compress Thumbnail &rarr;
          </Button>
          <Button href="/tools/youtube-thumbnail-resizer" variant="outline">
            Resize & Crop Canvas
          </Button>
        </div>
      </PageHero>

      <section aria-labelledby="thumbnail-tools-heading" className="space-y-4">
        <div className="flex items-center justify-between">
          <h2
            id="thumbnail-tools-heading"
            className="text-lg font-bold tracking-tight text-[var(--text-ink)]"
          >
            Thumbnail & Shorts Tools
          </h2>
          <span className="text-xs font-mono text-[var(--text-muted)]">
            {tools.length} TOOLS
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {tools.map((tool) => (
            <ToolCard
              key={tool.id}
              title={tool.title}
              description={tool.description}
              href={tool.href}
              categoryLabel={tool.categoryLabel}
              status={tool.status}
            />
          ))}
        </div>
      </section>

      <section className="mt-14 pt-10 border-t border-[var(--border-hairline)] max-w-3xl">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-accent)]" />
          <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]">
            Recommended Workflow
          </span>
        </div>
        <h2 className="text-xl font-bold tracking-tight text-[var(--text-ink)]">
          Standard 3-Step Packaging Routine
        </h2>
        <ol className="mt-6 space-y-4 list-none p-0">
          <li className="flex items-start gap-4 p-4 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] shadow-[var(--shadow-whisper)]">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--bg-canvas-subtle)] border border-[var(--border-hairline)] text-[var(--brand-accent)] text-xs font-mono font-bold shrink-0">
              01
            </span>
            <div>
              <h3 className="text-sm font-semibold text-[var(--text-ink)]">
                Resize & Crop Canvas Geometry
              </h3>
              <p className="text-xs text-[var(--text-body)] mt-1 leading-relaxed">
                Use the <Link href="/tools/youtube-thumbnail-resizer" className="text-[var(--brand-accent)] hover:underline">Thumbnail Resizer</Link> to standardize to 1280×720 HD or 1920×1080 Full HD with focal crop alignment.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-4 p-4 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] shadow-[var(--shadow-whisper)]">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--bg-canvas-subtle)] border border-[var(--border-hairline)] text-[var(--brand-accent)] text-xs font-mono font-bold shrink-0">
              02
            </span>
            <div>
              <h3 className="text-sm font-semibold text-[var(--text-ink)]">
                Enforce File Size Ceiling
              </h3>
              <p className="text-xs text-[var(--text-body)] mt-1 leading-relaxed">
                Run the image through the <Link href="/tools/youtube-thumbnail-compressor" className="text-[var(--brand-accent)] hover:underline">Thumbnail Compressor</Link> to ensure it stays below YouTube’s 2MB limit while retaining edge sharpness.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-4 p-4 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] shadow-[var(--shadow-whisper)]">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--bg-canvas-subtle)] border border-[var(--border-hairline)] text-[var(--brand-accent)] text-xs font-mono font-bold shrink-0">
              03
            </span>
            <div>
              <h3 className="text-sm font-semibold text-[var(--text-ink)]">
                Verify Mobile Readability
              </h3>
              <p className="text-xs text-[var(--text-body)] mt-1 leading-relaxed">
                Check off your visual assets on the <Link href="/checklist" className="text-[var(--brand-accent)] hover:underline">Pre-Publish Checklist</Link> or bundle them into <Link href="/studio" className="text-[var(--brand-accent)] hover:underline">Publish Studio</Link>.
              </p>
            </div>
          </li>
        </ol>
      </section>
    </div>
  );
}
