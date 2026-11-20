'use client';

import type { ReactNode } from 'react';
import ToolPageShell from './ToolPageShell';
import { getTool } from '@/lib/metadata';

const categoryHrefs: Record<string, string> = { thumbnail: '/tools/thumbnail', title: '/tools#title' };

/** Page shell for tools rendered through the registry. */
export default function ContentToolPage({ slug, children }: { slug: string; children: ReactNode }) {
  const tool = getTool(slug);
  return (
    <ToolPageShell
      title={tool.title}
      description={tool.description}
      category={tool.categoryLabel}
      categoryHref={categoryHrefs[tool.category] ?? '/tools'}
      toolSlug={slug}
    >
      {children}
    </ToolPageShell>
  );
}
