/* Hallmark · genre: modern-minimal · macrostructure: Workbench */
import React from 'react';
import Link from 'next/link';
import ToolCard from '@/components/ui/ToolCard';
import Alert from '@/components/feedback/Alert';
import ToolWorkspaceLayout from './ToolWorkspaceLayout';
import { toolRegistry, categoryHeroTones } from '@/config/site';
import PageHero from '@/components/ui/PageHero';
import type { FAQItem } from '@/types';
import { toolGuidance } from '@/config/tool-guidance';
import ToolDemonstration from './ToolDemonstration';
import ToolSteps from './ToolSteps';

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
}) => {
  const tool = toolRegistry.find((entry) => entry.slug === toolSlug);
  const isPreview = tool?.status !== 'available';
  const displayedFaqs = faqs ?? (isPreview ? previewFaqs : []);
  const preferredRelated = toolGuidance[toolSlug]?.related ?? [];
  const relatedTools = toolRegistry
    .filter((t) => t.slug !== toolSlug)
    .sort((a, b) => {
      const aRank = preferredRelated.indexOf(a.slug);
      const bRank = preferredRelated.indexOf(b.slug);
      return (
        (aRank < 0 ? 99 : aRank) - (bRank < 0 ? 99 : bRank) ||
        Number(b.category === tool?.category) - Number(a.category === tool?.category)
      );
    })
    .slice(0, 3);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Precision Breadcrumb */}
      <nav
        className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)] mb-6 overflow-x-auto whitespace-nowrap"
        aria-label="Breadcrumb"
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
        <Link
          href={categoryHref}
          className="hover:text-[var(--text-ink)] transition-colors"
        >
          {category}
        </Link>
        <span aria-hidden="true" className="text-[var(--text-faint)]">
          /
        </span>
        <span
          className="text-[var(--text-ink)] font-semibold truncate"
          aria-current="page"
        >
          {title}
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
            {category}
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
            100% In-Browser Execution
          </span>
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono text-[var(--text-muted)] border border-[var(--border-hairline)] bg-[var(--bg-canvas-subtle)]">
            YouTube 2026 Ready
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[var(--text-ink)]">
          {title}
        </h1>
        <p className="mt-2.5 text-sm sm:text-base text-[var(--text-body)] max-w-3xl leading-relaxed">
          {description}
        </p>
      </PageHero>

      {isPreview && (
        <div className="mb-6">
          <Alert variant="info" title="Workspace preview">
            Explore the planned interface. Results are fixed samples; processing, calculations,
            downloads, and exports are not available yet.
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
            Reference & Standards
          </span>
        </div>
        <h2
          id="guide-heading"
          className="text-xl font-bold tracking-tight text-[var(--text-ink)]"
        >
          About {title}
        </h2>
        <div className="mt-4 prose prose-zinc dark:prose-invert max-w-none text-sm text-[var(--text-body)] leading-relaxed space-y-4">
          {educationalContent ? (
            educationalContent
          ) : (
            <>
              <p>
                This workspace illustrates a planned part of your pre-publish routine. Explore the
                example configuration and sample output to see the intended workflow.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
                <div className="p-4 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] shadow-[var(--shadow-whisper)]">
                  <span className="text-xs font-mono font-bold text-[var(--brand-accent)]">
                    01. Prepare
                  </span>
                  <h3 className="text-sm font-semibold text-[var(--text-ink)] mt-1">
                    Upload & Configure
                  </h3>
                  <p className="text-xs text-[var(--text-body)] mt-1.5 leading-relaxed">
                    Set up your parameters or load creator sample assets with one click.
                  </p>
                </div>
                <div className="p-4 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] shadow-[var(--shadow-whisper)]">
                  <span className="text-xs font-mono font-bold text-[var(--brand-accent)]">
                    02. Inspect
                  </span>
                  <h3 className="text-sm font-semibold text-[var(--text-ink)] mt-1">
                    Compare & Validate
                  </h3>
                  <p className="text-xs text-[var(--text-body)] mt-1.5 leading-relaxed">
                    Check file dimensions, byte limits, and visual framing against YouTube specifications.
                  </p>
                </div>
                <div className="p-4 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] shadow-[var(--shadow-whisper)]">
                  <span className="text-xs font-mono font-bold text-[var(--brand-accent)]">
                    03. Export
                  </span>
                  <h3 className="text-sm font-semibold text-[var(--text-ink)] mt-1">
                    Export Ready Files
                  </h3>
                  <p className="text-xs text-[var(--text-body)] mt-1.5 leading-relaxed">
                    Save production-ready files directly to your device with clean naming formats.
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
              Documentation & FAQ
            </span>
          </div>
          <h2
            id="faq-heading"
            className="text-xl font-bold tracking-tight text-[var(--text-ink)]"
          >
            Frequently Asked Questions
          </h2>
          <div className="mt-6 divide-y divide-[var(--border-hairline)] rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] shadow-[var(--shadow-whisper)] overflow-hidden">
            {displayedFaqs.map((faq) => (
              <details
                key={faq.question}
                className="group p-5 hover:bg-[var(--bg-canvas-subtle)] transition-colors"
              >
                <summary className="flex items-center justify-between text-sm font-semibold text-[var(--text-ink)] cursor-pointer focus-ring rounded list-none select-none">
                  <span>{faq.question}</span>
                  <span className="ml-4 shrink-0 text-[var(--text-muted)] group-open:rotate-180 transition-transform duration-200">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </summary>
                <p className="mt-3 text-sm text-[var(--text-body)] leading-relaxed pr-8">
                  {faq.answer}
                </p>
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
                Workflow Continuity
              </span>
            </div>
            <h2
              id="related-heading"
              className="text-xl font-bold tracking-tight text-[var(--text-ink)]"
            >
              Related Creator Tools
            </h2>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">
              Complementary utilities for your YouTube pre-publish checklist
            </p>
          </div>
          <Link
            href="/tools"
            className="text-xs font-mono font-medium text-[var(--brand-accent)] hover:underline inline-flex items-center gap-1"
          >
            <span>View all tools</span>
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {relatedTools.map((relTool) => (
            <ToolCard
              key={relTool.id}
              illustration={relTool.id}
              title={relTool.title}
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
