'use client';

import React from 'react';
import type { GuideItem } from '@/lib/guides';
import PageHero from '@/components/ui/PageHero';
import Badge from '@/components/ui/Badge';
import ToolCard from '@/components/ui/ToolCard';
import { toolRegistry } from '@/config/site';
import WorkedExampleCard from './WorkedExampleCard';
import ActionChecklist from './ActionChecklist';
import { useI18n, LocalizedLink } from '@/lib/i18n';

interface GuideArticleProps {
  guide: GuideItem;
}

export default function GuideArticle({ guide }: GuideArticleProps) {
  const { t } = useI18n();
  const relatedTools = toolRegistry.filter((t) => guide.relatedToolIds.includes(t.id));
  const localizedItem = t.guides.items[guide.slug as keyof typeof t.guides.items];

  const displayTitle = localizedItem?.title || guide.title;
  const displayCategory = localizedItem?.category || guide.category;
  const displayReadTime = localizedItem?.readTime || guide.readTime;
  const displayDesc = localizedItem?.description || guide.description;

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Navigation Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex items-center space-x-2 text-xs font-mono text-[var(--text-muted)]">
          <li>
            <LocalizedLink href="/" className="hover:text-[var(--text-ink)] transition-colors">
              {t.tools.shell.breadcrumbHome}
            </LocalizedLink>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <LocalizedLink href="/guides" className="hover:text-[var(--text-ink)] transition-colors">
              {t.guides.article.breadcrumbGuides}
            </LocalizedLink>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-[var(--text-ink)] truncate max-w-[200px] sm:max-w-none">
            {displayTitle}
          </li>
        </ol>
      </nav>

      {/* Guide Hero with approved violet tone */}
      <PageHero tone="violet" className="mb-10">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <Badge variant="neutral">{displayCategory}</Badge>
          <span className="text-xs font-mono text-[var(--text-muted)]">{displayReadTime}</span>
          <span className="text-xs font-mono text-[var(--text-muted)]">&middot;</span>
          <span className="text-xs font-mono text-[var(--text-muted)]">
            {t.guides.article.author}
          </span>
          <span className="text-xs font-mono text-[var(--text-muted)]">&middot;</span>
          <span className="text-xs font-mono text-[var(--text-muted)]">
            {t.guides.article.lastVerifiedPrefix} {guide.lastVerified}
          </span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-[var(--text-ink)] leading-tight">
          {displayTitle}
        </h1>
        <p className="mt-3 text-sm sm:text-base text-[var(--text-body)] leading-relaxed">
          {displayDesc}
        </p>
      </PageHero>

      {/* Official Documentation Citations */}
      {guide.officialSources.length > 0 && (
        <aside
          aria-label="Official Documentation"
          className="mb-10 p-5 rounded-xl border border-[var(--border-hairline-strong)] bg-[var(--bg-canvas-subtle)]"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] font-mono uppercase font-semibold text-[var(--brand-accent-deep)] dark:text-blue-400">
              {t.guides.article.verifiedLabel}
            </span>
          </div>
          <p className="text-xs text-[var(--text-muted)] mb-3">
            {t.guides.article.sourcesDescription}
          </p>
          <ul className="space-y-2">
            {guide.officialSources.map((source, idx) => (
              <li key={idx} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2 text-xs">
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-[var(--brand-accent)] hover:underline inline-flex items-center gap-1"
                >
                  {source.label}
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
                <span className="text-[var(--text-body)]">— {source.description}</span>
              </li>
            ))}
          </ul>
        </aside>
      )}

      {/* Main Editorial Content */}
      <div className="space-y-8 text-[var(--text-body)] leading-relaxed text-sm sm:text-base">
        {guide.contentSections.map((section, idx) => (
          <section key={idx} className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-[var(--text-ink)]">
              {section.heading}
            </h2>
            <p className="text-sm sm:text-base text-[var(--text-body)] leading-relaxed">
              {section.body}
            </p>
            {section.keyTakeaway && (
              <div className="my-3 p-3.5 rounded-lg border-l-2 border-[var(--brand-accent)] bg-[var(--bg-canvas-subtle)] text-xs sm:text-sm text-[var(--text-ink)]">
                <strong className="font-semibold text-[var(--text-ink)]">{t.guides.article.keyTakeawayPrefix} </strong>
                {section.keyTakeaway}
              </div>
            )}
          </section>
        ))}
      </div>

      {/* Worked Example */}
      <WorkedExampleCard example={guide.workedExample} />

      {/* Actionable Pre-Publish Checklist */}
      <ActionChecklist items={guide.checklist} guideTitle={displayTitle} />

      {/* Related Tools Section */}
      {relatedTools.length > 0 && (
        <section className="mt-16 pt-10 border-t border-[var(--border-hairline)]">
          <div className="mb-6">
            <span className="text-xs font-mono uppercase text-[var(--text-muted)]">
              {t.guides.article.appliedUtilitiesBadge}
            </span>
            <h2 className="text-xl font-bold tracking-tight text-[var(--text-ink)] mt-1">
              {t.guides.article.relatedToolsHeading}
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-body)] mt-1">
              {t.guides.article.appliedUtilitiesDesc}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {relatedTools.map((tool) => (
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
      )}
    </article>
  );
}
