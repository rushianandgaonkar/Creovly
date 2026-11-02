/* Hallmark · genre: modern-minimal · macrostructure: Workbench */
'use client';

import React from 'react';
import ToolCard from '@/components/ui/ToolCard';
import Alert from '@/components/feedback/Alert';
import ToolWorkspaceLayout from './ToolWorkspaceLayout';
import { toolRegistry, categoryHeroTones } from '@/config/site';
import PageHero from '@/components/ui/PageHero';
import type { FAQItem } from '@/types';
import { toolGuidance } from '@/config/tool-guidance';
import ToolDemonstration from './ToolDemonstration';
import ToolSteps from './ToolSteps';
import { useI18n, LocalizedLink } from '@/lib/i18n';
import { translations } from '@/config/i18n';

export interface ToolPageShellProps {
  title: string;
  description: string;
  category: string;
  categoryHref: string;
  toolSlug: string;
  faqs?: FAQItem[];
  workspace?: React.ReactNode;
  results?: React.ReactNode;
  children?: React.ReactNode;
  educationalContent?: React.ReactNode;
  className?: string;
}

const previewFaqs: FAQItem[] = [
  {
    question: 'Can I use this tool to process my content yet?',
    answer:
      'This is a workspace preview. The controls show the planned workflow, and the results are fixed examples. Analysis, downloads, and exports are not available yet.',
  },
  {
    question: 'Are the sample results based on my inputs?',
    answer:
      'No. Changing an input does not update these illustrative results. They are not predictions or validated measurements.',
  },
];

export const ToolPageShell: React.FC<ToolPageShellProps> = ({
  title,
  description,
  category,
  categoryHref,
  toolSlug,
  faqs,
  workspace,
  results,
  children,
  educationalContent,
  className = '',
}) => {
  const { t, locale } = useI18n();
  const tool = toolRegistry.find((entry) => entry.slug === toolSlug);
  const isPreview = tool?.status !== 'available';

  const toolTrans = translations[locale]?.tools[toolSlug];
  const displayTitle = toolTrans?.title || title;
  const displayDescription = toolTrans?.description || description;
  const displayCategory = toolTrans?.categoryLabel || category;

  const slugToFaqKey: Record<string, keyof typeof t.tools.faqs> = {
    'youtube-thumbnail-compressor': 'compressor',
    'youtube-thumbnail-resizer': 'resizer',
    'logo-background-remover': 'logoRemover',
    'youtube-shorts-safe-zone': 'shorts',
    'youtube-title-checker': 'titleChecker',
    'youtube-revenue-calculator': 'revenue',
    'youtube-rpm-calculator': 'rpm',
    'youtube-watch-hours-calculator': 'watchHours',
    'youtube-monetization-calculator': 'monetization',
  };

  const localizedFaqs = slugToFaqKey[toolSlug] ? t.tools.faqs[slugToFaqKey[toolSlug]] : undefined;
  const displayedFaqs = localizedFaqs ?? faqs ?? (isPreview ? previewFaqs : []);

  const preferredRelated = toolGuidance[toolSlug]?.related ?? [];
  const relatedTools = toolRegistry
    .filter((entry) => entry.slug !== toolSlug)
    .sort((a, b) => {
      const aRank = preferredRelated.indexOf(a.slug);
      const bRank = preferredRelated.indexOf(b.slug);
      return (
        (aRank < 0 ? 99 : aRank) - (bRank < 0 ? 99 : bRank) ||
        Number(b.category === tool?.category) - Number(a.category === tool?.category)
      );
    })
    .slice(0, 3);

  const getToolLocalizedTitle = (id: string, fallback: string): string => {
    switch (id) {
      case 'youtube-thumbnail-compressor':
        return t.compressor.title;
      case 'youtube-thumbnail-resizer':
        return t.resizer.title;
      case 'logo-background-remover':
        return t.logoRemover.title;
      case 'youtube-shorts-safe-zone':
        return t.shorts.title;
      case 'youtube-title-checker':
        return t.titleChecker.title;
      case 'youtube-revenue-calculator':
        return t.calculator.revenue.title;
      case 'youtube-rpm-calculator':
        return t.calculator.rpm.title;
      case 'youtube-watch-hours-calculator':
        return t.calculator.watchHours.title;
      case 'youtube-monetization-calculator':
        return t.calculator.monetization.title;
      default:
        return fallback;
    }
  };

  const renderGuidance = () => {
    if (toolSlug === 'youtube-thumbnail-compressor' && t.tools.guidance?.compressor) {
      const g = t.tools.guidance.compressor;
      return (
        <>
          <p>{g.p1}</p>
          <p>{g.p2}</p>
          <p>
            <a
              href="https://support.google.com/youtube/answer/72431?hl=en"
              className="text-[var(--brand-accent)] underline focus-ring"
            >
              {g.linkText}
            </a>{' '}
            {g.linkSuffix}
          </p>
        </>
      );
    }
    if (toolSlug === 'youtube-thumbnail-resizer' && t.tools.guidance?.resizer) {
      const g = t.tools.guidance.resizer;
      return (
        <>
          <p>{g.p1}</p>
          <p>{g.p2}</p>
          <p>{g.p3}</p>
          <p>{g.p4}</p>
        </>
      );
    }
    if (toolSlug === 'logo-background-remover' && t.tools.guidance?.logoRemover) {
      const g = t.tools.guidance.logoRemover;
      return (
        <>
          <p>{g.p1}</p>
          <p>{g.p2}</p>
          <p>{g.p3}</p>
        </>
      );
    }
    if (toolSlug === 'youtube-shorts-safe-zone' && t.tools.guidance?.shorts) {
      const g = t.tools.guidance.shorts;
      return (
        <>
          <p>{g.p1}</p>
          <p>{g.p2}</p>
          <p>{g.p3}</p>
        </>
      );
    }
    if (toolSlug === 'youtube-title-checker' && t.tools.guidance?.titleChecker) {
      const g = t.tools.guidance.titleChecker;
      return (
        <>
          <p>{g.p1}</p>
          <p>{g.p2}</p>
          <p>{g.p3}</p>
        </>
      );
    }
    return educationalContent;
  };

  const activeGuidance = renderGuidance();

  return (
    <div className={`max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 ${className}`}>
      {/* Precision Breadcrumb */}
      <nav
        className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)] mb-6 overflow-x-auto whitespace-nowrap"
        aria-label="Breadcrumb"
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
        <LocalizedLink
          href={categoryHref}
          className="hover:text-[var(--text-ink)] transition-colors"
        >
          {displayCategory}
        </LocalizedLink>
        <span aria-hidden="true" className="text-[var(--text-faint)]">
          /
        </span>
        <span
          className="text-[var(--text-ink)] font-semibold truncate"
          aria-current="page"
        >
          {displayTitle}
        </span>
      </nav>

      {/* Tool Header / PageHero */}
      <PageHero
        tone={tool?.heroTone ?? categoryHeroTones[tool?.category ?? 'publishing']}
        className="mb-8"
      >
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono uppercase tracking-wider font-semibold border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] text-[var(--text-ink)] shadow-[var(--shadow-whisper)]">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                tool?.status === 'available' ? 'bg-emerald-500' : 'bg-amber-500'
              }`}
            />
            {displayCategory}
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-medium border border-emerald-500/20 bg-emerald-500/5">
            <svg
              className="w-3 h-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            {t.tools.shell.badgeInBrowser}
          </span>
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono text-[var(--text-muted)] border border-[var(--border-hairline)] bg-[var(--bg-canvas-subtle)]">
            {t.tools.shell.badgeUpdatedSpecs}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[var(--text-ink)]">
          {displayTitle}
        </h1>
        <p className="mt-2.5 text-sm sm:text-base text-[var(--text-body)] max-w-3xl leading-relaxed">
          {displayDescription}
        </p>
      </PageHero>

      {isPreview && (
        <div className="mb-6">
          <Alert variant="info" title={t.tools.shell.previewAlertTitle}>
            {t.tools.shell.previewAlertBody}
          </Alert>
        </div>
      )}

      {/* Main Workspace */}
      {children ?? (
        <ToolWorkspaceLayout
          workspace={workspace}
          results={results}
          preview={isPreview}
        />
      )}

      {/* Tool Demonstration & Step Guides */}
      {!isPreview && (
        <>
          <ToolDemonstration slug={toolSlug} />
          <ToolSteps slug={toolSlug} />
        </>
      )}

      {/* Educational / Guidance Content */}
      <section className="mt-14 pt-10 border-t border-[var(--border-hairline)]" aria-labelledby="guide-heading">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-accent)]" />
          <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]">
            {t.tools.shell.guidanceLabel}
          </span>
        </div>
        <h2
          id="guide-heading"
          className="text-xl font-bold tracking-tight text-[var(--text-ink)]"
        >
          {t.tools.shell.aboutHeading.replace('{title}', displayTitle)}
        </h2>
        <div className="mt-4 prose prose-zinc dark:prose-invert max-w-none text-sm text-[var(--text-body)] leading-relaxed space-y-4">
          {activeGuidance ? (
            activeGuidance
          ) : (
            <>
              <p>
                {t.tools.shell.previewAlertBody}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
                <div className="p-4 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] shadow-[var(--shadow-whisper)]">
                  <span className="text-xs font-mono font-bold text-[var(--brand-accent)]">
                    {t.tools.shell.defaultSteps.step1Title}
                  </span>
                  <h3 className="text-sm font-semibold text-[var(--text-ink)] mt-1">
                    {t.tools.shell.defaultSteps.step1Heading}
                  </h3>
                  <p className="text-xs text-[var(--text-body)] mt-1.5 leading-relaxed">
                    {t.tools.shell.defaultSteps.step1Body}
                  </p>
                </div>
                <div className="p-4 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] shadow-[var(--shadow-whisper)]">
                  <span className="text-xs font-mono font-bold text-[var(--brand-accent)]">
                    {t.tools.shell.defaultSteps.step2Title}
                  </span>
                  <h3 className="text-sm font-semibold text-[var(--text-ink)] mt-1">
                    {t.tools.shell.defaultSteps.step2Heading}
                  </h3>
                  <p className="text-xs text-[var(--text-body)] mt-1.5 leading-relaxed">
                    {t.tools.shell.defaultSteps.step2Body}
                  </p>
                </div>
                <div className="p-4 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] shadow-[var(--shadow-whisper)]">
                  <span className="text-xs font-mono font-bold text-[var(--brand-accent)]">
                    {t.tools.shell.defaultSteps.step3Title}
                  </span>
                  <h3 className="text-sm font-semibold text-[var(--text-ink)] mt-1">
                    {t.tools.shell.defaultSteps.step3Heading}
                  </h3>
                  <p className="text-xs text-[var(--text-body)] mt-1.5 leading-relaxed">
                    {t.tools.shell.defaultSteps.step3Body}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Frequently Asked Questions */}
      {displayedFaqs.length > 0 && (
        <section
          className="mt-14 pt-10 border-t border-[var(--border-hairline)]"
          aria-labelledby="faq-heading"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-accent)]" />
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]">
              {t.tools.shell.faqBadge}
            </span>
          </div>
          <h2
            id="faq-heading"
            className="text-xl font-bold tracking-tight text-[var(--text-ink)]"
          >
            {t.tools.shell.faqHeading}
          </h2>
          <div className="mt-6 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] shadow-[var(--shadow-whisper)] divide-y divide-[var(--border-hairline)] overflow-hidden">
            {displayedFaqs.map((faq) => (
              <details
                key={faq.question}
                className="group p-4 sm:p-5 transition-colors [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none text-left text-sm font-semibold text-[var(--text-ink)] hover:text-[var(--brand-accent)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)] rounded">
                  <span>{faq.question}</span>
                  <svg
                    className="w-4 h-4 shrink-0 text-[var(--text-muted)] transition-transform duration-200 group-open:rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="mt-3 text-sm text-[var(--text-body)] leading-relaxed pt-2 border-t border-[var(--border-hairline)]/60">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </section>
      )}

      {/* Related Creovly Tools */}
      <section
        className="mt-16 pt-12 border-t border-[var(--border-hairline)]"
        aria-labelledby="related-heading"
      >
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-accent)]" />
              <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]">
                {t.tools.shell.relatedBadge}
              </span>
            </div>
            <h2
              id="related-heading"
              className="text-xl font-bold tracking-tight text-[var(--text-ink)]"
            >
              {t.tools.shell.relatedHeading}
            </h2>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">
              {t.tools.shell.relatedSubheading}
            </p>
          </div>
          <LocalizedLink
            href="/tools"
            className="text-xs font-mono font-medium text-[var(--brand-accent)] hover:underline inline-flex items-center gap-1"
          >
            <span>{t.tools.shell.relatedViewAll}</span>
            <span aria-hidden="true">&rarr;</span>
          </LocalizedLink>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {relatedTools.map((relTool) => (
            <ToolCard
              key={relTool.id}
              illustration={relTool.id}
              title={getToolLocalizedTitle(relTool.id, relTool.title)}
              description={relTool.description}
              href={relTool.href}
              categoryLabel={relTool.categoryLabel}
              badge={relTool.badge}
              status={relTool.status}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ToolPageShell;
