'use client';

import { useState, useEffect } from 'react';
import Input from '@/components/form/Input';
import Button from '@/components/ui/Button';
import ToolCard from '@/components/ui/ToolCard';
import { toolCategories } from '@/config/site';
import type { ToolDefinition } from '@/types';

export default function ToolDiscovery({ tools, visualCards = false }: { tools: ToolDefinition[]; visualCards?: boolean }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const activeEl = document.activeElement as HTMLElement | null;
      const isInput = activeEl && (['INPUT', 'TEXTAREA'].includes(activeEl.tagName) || activeEl.isContentEditable);
      if (event.key === '/' && !isInput) {
        event.preventDefault();
        const input = document.getElementById('tool-search') as HTMLInputElement | null;
        if (input) {
          input.focus();
          input.select();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const terms = query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  const matches = tools.filter((tool) => {
    const text = `${tool.title} ${tool.description} ${tool.categoryLabel}`.toLocaleLowerCase();
    return (category === 'all' || tool.category === category) && terms.every((term) => text.includes(term));
  });
  const categoryCounts: Record<string, number> = {
    all: tools.length,
    ...toolCategories.reduce((acc, cat) => {
      acc[cat.id] = tools.filter((t) => t.category === cat.id).length;
      return acc;
    }, {} as Record<string, number>),
  };

  return <section id="creator-tools" aria-labelledby="discover-heading" className="space-y-6">
    <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-[var(--border-hairline)] pb-4">
      <div>
        <h2 id="discover-heading" className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--text-ink)]">
          Explore Creator Tools
        </h2>
        <p className="text-xs text-[var(--text-muted)] mt-0.5">
          100% browser-based pre-publish utilities. Select a tool to begin.
        </p>
      </div>
      <p role="status" aria-live="polite" aria-atomic="true" className="text-xs font-mono text-[var(--text-muted)]">
        <span className="font-semibold text-[var(--text-ink)]">{matches.length}</span> {matches.length === 1 ? 'tool' : 'tools'} {terms.length || category !== 'all' ? 'found' : 'available'}
      </p>
    </div>
    <div className={visualCards ? 'discovery-search' : 'max-w-xl'}>
      <Input
        id="tool-search"
        type="search"
        label="Search tools"
        placeholder="Try thumbnail, title, RPM…"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        hint={
          <span className="inline-flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
            <span>Shortcut</span>
            <kbd className="inline-flex items-center justify-center min-w-5 h-5 px-1.5 text-[11px] font-mono rounded border border-[var(--border-hairline)] bg-[var(--bg-canvas-subtle)] text-[var(--text-body)] shadow-2xs">
              /
            </kbd>
          </span>
        }
      />
    </div>
    <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter tools by category">
      {[{ id: 'all', label: 'All tools' }, ...toolCategories].map((item) => {
        const count = categoryCounts[item.id] ?? 0;
        const isSelected = category === item.id;
        return (
          <button
            key={item.id}
            type="button"
            aria-pressed={isSelected}
            onClick={() => setCategory(item.id)}
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-medium focus-ring transition-all duration-150 ${
              isSelected
                ? 'bg-[var(--brand-primary)] text-[var(--brand-on-primary)] border-[var(--brand-primary)] shadow-2xs font-semibold'
                : 'bg-[var(--bg-canvas-elevated)] text-[var(--text-body)] border-[var(--border-hairline)] hover:border-[var(--border-hairline-strong)] hover:text-[var(--text-ink)]'
            }`}
          >
            <span>{item.label}</span>
            <span
              className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono tabular-nums ${
                isSelected
                  ? 'bg-white/20 text-[var(--brand-on-primary)]'
                  : 'bg-[var(--bg-canvas-subtle)] text-[var(--text-muted)]'
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
      {(query || category !== 'all') && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setQuery('');
            setCategory('all');
          }}
          className="text-xs"
        >
          Clear filters
        </Button>
      )}
    </div>
    {matches.length ? <div className="space-y-8 pt-2">{toolCategories.map((group) => {
      const entries = matches.filter((tool) => tool.category === group.id);
      return entries.length ? <section key={group.id} id={group.id} aria-labelledby={`${group.id}-heading`} className="scroll-mt-20">
        <h3 id={`${group.id}-heading`} className="text-sm font-semibold mb-3">{group.label}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{entries.map((tool) => <ToolCard key={tool.id} illustration={visualCards ? tool.id : undefined} headingAs="h4" title={tool.title} description={tool.description} href={tool.href} categoryLabel={tool.categoryLabel} status={tool.status} badge={tool.badge} />)}</div>
      </section> : null;
    })}</div> : <div className="rounded-xl border border-[var(--border-hairline)] p-8 text-center space-y-2"><h3 className="font-semibold">No matching tools</h3><p className="text-sm text-[var(--text-body)]">Try a shorter search or clear the filters to see all tools.</p></div>}
  </section>;
}
