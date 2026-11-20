import type { ReactNode } from 'react';
import ToolPageShell from './ToolPageShell';
import { getTool } from '@/lib/metadata';
import { toolContent } from '@/config/tool-content';

const categoryHrefs: Record<string, string> = { thumbnail: '/tools/thumbnail', title: '/tools#title' };

/** Page shell for tools whose copy lives in config/tool-content.ts. */
export default function ContentToolPage({ slug, children }: { slug: string; children: ReactNode }) {
  const tool = getTool(slug);
  const content = toolContent[slug];
  return (
    <ToolPageShell
      title={tool.title}
      description={tool.description}
      category={tool.categoryLabel}
      categoryHref={categoryHrefs[tool.category] ?? '/tools'}
      toolSlug={slug}
      faqs={content.faqs}
      educationalContent={<ToolAbout slug={slug} />}
    >
      {children}
    </ToolPageShell>
  );
}

export function ToolAbout({ slug }: { slug: string }) {
  const content = toolContent[slug];
  if (!content) return null;
  return (
    <>
      {content.about.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      {content.source && (
        <p>
          <a href={content.source.href} target="_blank" rel="noopener noreferrer" className="text-[var(--brand-accent-deep)] underline hover:no-underline font-medium focus-ring">
            {content.source.label}
          </a>
        </p>
      )}
    </>
  );
}
