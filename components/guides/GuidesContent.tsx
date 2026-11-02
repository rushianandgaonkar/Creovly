'use client';

import React from 'react';
import Badge from '@/components/ui/Badge';
import ToolCard from '@/components/ui/ToolCard';
import { toolRegistry } from '@/config/site';
import PageHero from '@/components/ui/PageHero';
import { guides as staticGuides } from '@/lib/guides';
import { useI18n, LocalizedLink } from '@/lib/i18n';

export default function GuidesContent() {
  const { t } = useI18n();
  const guidesIndex = t.guides.index;
  const guideItems = t.guides.items;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
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
        <span className="text-[var(--text-ink)] font-semibold" aria-current="page">
          {t.guides.article.breadcrumbGuides}
        </span>
      </nav>

      <PageHero tone="violet" className="mb-12">
        <div className="inline-flex items-center gap-2 mb-2">
          <Badge variant="neutral">{guidesIndex.heroBadge}</Badge>
          <span className="text-xs font-mono text-[var(--text-muted)]">{guidesIndex.heroVerified}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-ink)]">
          {guidesIndex.heading}
        </h1>
        <p className="mt-2 text-sm sm:text-base text-[var(--text-body)] leading-relaxed">
          {guidesIndex.subheading}
        </p>
      </PageHero>

      {/* Guides List with active routing */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {staticGuides.map((guide) => {
          const localized = guideItems[guide.slug as keyof typeof guideItems];
          const displayTitle = localized?.title || guide.title;
          const displayDesc = localized?.description || guide.description;
          const displayCategory = localized?.category || guide.category;
          const displayReadTime = localized?.readTime || guide.readTime;

          return (
            <article
              key={guide.slug}
              className="p-5 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] flex flex-col justify-between hover:border-[var(--border-hairline-strong)] hover:shadow-[var(--shadow-floating)] transition-all group"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)] mb-3">
                  <span>{displayCategory}</span>
                  <span>{displayReadTime}</span>
                </div>
                <h2 className="text-base font-semibold text-[var(--text-ink)] leading-snug group-hover:text-[var(--brand-accent)] transition-colors">
                  <LocalizedLink href={`/guides/${guide.slug}`} className="focus:outline-none">
                    {displayTitle}
                  </LocalizedLink>
                </h2>
                <p className="mt-2 text-xs text-[var(--text-body)] leading-relaxed">
                  {displayDesc}
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-[var(--border-hairline-subtle)] flex items-center justify-between text-xs text-[var(--text-muted)]">
                <span className="font-mono text-[10px] text-[var(--text-muted)]">
                  {t.guides.article.lastVerifiedPrefix} {guide.lastVerified}
                </span>
                <LocalizedLink
                  href={`/guides/${guide.slug}`}
                  className="text-xs font-medium text-[var(--brand-accent)] hover:underline inline-flex items-center gap-1"
                >
                  {t.guides.index.readGuide}
                </LocalizedLink>
              </div>
            </article>
          );
        })}
      </div>

      {/* Tools Reference */}
      <section className="pt-10 border-t border-[var(--border-hairline)]">
        <h2 className="text-lg font-bold tracking-tight text-[var(--text-ink)] mb-4">
          {t.guides.article.relatedToolsHeading}
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

