'use client';

import React from 'react';
import { toolRegistry } from '@/config/site';
import ToolCard from '@/components/ui/ToolCard';
import Button from '@/components/ui/Button';
import PageHero from '@/components/ui/PageHero';
import { useI18n, LocalizedLink } from '@/lib/i18n';

export default function ThumbnailToolsContent() {
  const { t } = useI18n();
  const tools = toolRegistry.filter((tool) => tool.category === 'thumbnail');

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Precision Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)] mb-6"
      >
        <LocalizedLink href="/" className="hover:text-[var(--text-ink)] transition-colors">
          {t.tools.shell.breadcrumbHome}
        </LocalizedLink>
        <span aria-hidden="true" className="text-[var(--text-faint)]">
          /
        </span>
        <LocalizedLink href="/tools" className="hover:text-[var(--text-ink)] transition-colors">
          {t.tools.shell.breadcrumbTools}
        </LocalizedLink>
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
          Frame, resize, remove logo backgrounds, and compress YouTube thumbnails locally to ensure
          universal mobile upload compatibility (under 2 MB) and desktop support (up to 50 MB) without losing crisp visual clarity.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <LocalizedLink href="/tools/youtube-thumbnail-compressor">
            <Button>
              Compress Thumbnail &rarr;
            </Button>
          </LocalizedLink>
          <LocalizedLink href="/tools/youtube-thumbnail-resizer">
            <Button variant="outline">
              Resize & Crop Canvas
            </Button>
          </LocalizedLink>
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
                Use the <LocalizedLink href="/tools/youtube-thumbnail-resizer" className="text-[var(--brand-accent)] hover:underline">Thumbnail Resizer</LocalizedLink> to standardize to 1280×720 HD or 1920×1080 Full HD with focal crop alignment.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-4 p-4 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] shadow-[var(--shadow-whisper)]">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--bg-canvas-subtle)] border border-[var(--border-hairline)] text-[var(--brand-accent)] text-xs font-mono font-bold shrink-0">
              02
            </span>
            <div>
              <h3 className="text-sm font-semibold text-[var(--text-ink)]">
                Optimize File Size & Format
              </h3>
              <p className="text-xs text-[var(--text-body)] mt-1 leading-relaxed">
                Run the image through the <LocalizedLink href="/tools/youtube-thumbnail-compressor" className="text-[var(--brand-accent)] hover:underline">Thumbnail Compressor</LocalizedLink> to ensure it meets YouTube’s 2 MB mobile Studio limit (desktop supports up to 50 MB) and uses recommended JPG or PNG formats.
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
                Check off your visual assets on the <LocalizedLink href="/checklist" className="text-[var(--brand-accent)] hover:underline">Pre-Publish Checklist</LocalizedLink> or bundle them into <LocalizedLink href="/studio" className="text-[var(--brand-accent)] hover:underline">Publish Studio</LocalizedLink>.
              </p>
            </div>
          </li>
        </ol>
      </section>
    </div>
  );
}

