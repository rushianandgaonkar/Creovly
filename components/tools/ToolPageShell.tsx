import React from 'react';
import Link from 'next/link';
import ToolCard from '@/components/ui/ToolCard';
import Alert from '@/components/feedback/Alert';
import ToolWorkspaceLayout from './ToolWorkspaceLayout';
import { toolRegistry } from '@/config/site';
import type { FAQItem } from '@/types';

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
    answer: 'This is a workspace preview. The controls show the planned workflow, and the results are fixed examples. Analysis, downloads, and exports are not available yet.',
  },
  {
    question: 'Are the sample results based on my inputs?',
    answer: 'No. Changing an input does not update these illustrative results. They are not predictions or validated measurements.',
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
  const relatedTools = toolRegistry
    .filter((t) => t.slug !== toolSlug)
    .sort((a, b) => Number(b.category === tool?.category) - Number(a.category === tool?.category))
    .slice(0, 3);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-[var(--text-muted)] mb-6" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-[var(--text-ink)] transition-colors">
          Home
        </Link>
        <span aria-hidden="true">&gt;</span>
        <Link href="/tools" className="hover:text-[var(--text-ink)] transition-colors">
          Tools
        </Link>
        <span aria-hidden="true">&gt;</span>
        <Link href={categoryHref} className="hover:text-[var(--text-ink)] transition-colors">
          {category}
        </Link>
        <span aria-hidden="true">&gt;</span>
        <span className="text-[var(--text-ink)] font-medium truncate" aria-current="page">
          {title}
        </span>
      </nav>

      {/* Header / Value Proposition */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-[var(--brand-accent)] mb-2 font-medium">
          <span>{category}</span>
          <span>•</span>
          <span>{tool?.status === 'available' ? 'Available' : tool?.status === 'planned' ? 'Planned' : 'Preview'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[var(--text-ink)]">
          {title}
        </h1>
        <p className="mt-2 text-sm sm:text-base text-[var(--text-body)] max-w-2xl leading-relaxed">
          {description}
        </p>
      </div>

      {isPreview && (
        <div className="mb-6">
          <Alert variant="info" title="Workspace preview">
            Explore the planned interface. Results are fixed samples; processing, calculations, downloads, and exports are not available yet.
          </Alert>
        </div>
      )}

      {children ?? <ToolWorkspaceLayout workspace={workspace} results={results} preview={isPreview} />}

      {/* Educational / Guidance Content */}
      <section className="mt-16 pt-12 border-t border-[var(--border-hairline)]" aria-labelledby="guide-heading">
        <h2 id="guide-heading" className="text-xl font-bold tracking-tight text-[var(--text-ink)]">
          About the {title}
        </h2>
        <div className="mt-4 prose prose-zinc dark:prose-invert max-w-none text-sm text-[var(--text-body)] leading-relaxed space-y-4">
          {educationalContent ? (
            educationalContent
          ) : (
            <>
              <p>
                This workspace illustrates a planned part of your pre-publish routine. Explore the example configuration and sample output to see the intended workflow.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
                <div className="p-4 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-canvas-subtle)]">
                  <span className="text-xs font-mono font-bold text-[var(--text-ink)]">01. Prepare</span>
                  <p className="text-xs text-[var(--text-body)] mt-1">
                    Explore the example settings for this planned tool.
                  </p>
                </div>
                <div className="p-4 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-canvas-subtle)]">
                  <span className="text-xs font-mono font-bold text-[var(--text-ink)]">02. Inspect</span>
                  <p className="text-xs text-[var(--text-body)] mt-1">
                    Review sample output to understand the planned results layout.
                  </p>
                </div>
                <div className="p-4 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-canvas-subtle)]">
                  <span className="text-xs font-mono font-bold text-[var(--text-ink)]">03. Publish</span>
                  <p className="text-xs text-[var(--text-body)] mt-1">
                    Use the interactive publishing checklist to prepare your upload.
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Frequently Asked Questions */}
      {displayedFaqs.length > 0 && (
        <section className="mt-12 pt-8 border-t border-[var(--border-hairline-subtle)]" aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="text-lg font-bold tracking-tight text-[var(--text-ink)]">
            Frequently Asked Questions
          </h2>
          <dl className="mt-4 space-y-4">
            {displayedFaqs.map((faq) => (
              <div
                key={faq.question}
                className="p-4 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)]"
              >
                <dt className="text-sm font-semibold text-[var(--text-ink)]">
                  {faq.question}
                </dt>
                <dd className="mt-1 text-xs text-[var(--text-body)] leading-relaxed">
                  {faq.answer}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      {/* Related Creovly Tools */}
      <section className="mt-16 pt-12 border-t border-[var(--border-hairline)]" aria-labelledby="related-heading">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 id="related-heading" className="text-lg font-bold tracking-tight text-[var(--text-ink)]">
              Related Creator Tools
            </h2>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">
              Complementary utilities for your YouTube pre-publish checklist
            </p>
          </div>
          <Link href="/tools" className="text-xs font-medium text-[var(--brand-accent)] hover:underline">
            View all tools &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
    </div>
  );
};

export default ToolPageShell;
