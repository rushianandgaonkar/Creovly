'use client';

import { useState } from 'react';
import Input from '@/components/form/Input';
import Button from '@/components/ui/Button';
import ToolCard from '@/components/ui/ToolCard';
import { toolCategories } from '@/config/site';
import type { ToolDefinition } from '@/types';

export default function ToolDiscovery({ tools, visualCards = false }: { tools: ToolDefinition[]; visualCards?: boolean }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const terms = query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  const matches = tools.filter((tool) => {
    const text = `${tool.title} ${tool.description} ${tool.categoryLabel}`.toLocaleLowerCase();
    return (category === 'all' || tool.category === category) && terms.every((term) => text.includes(term));
  });
  return <section id="creator-tools" aria-labelledby="discover-heading" className="space-y-5">
    <div className="flex flex-wrap items-baseline justify-between gap-2">
      <h2 id="discover-heading" className="text-xl font-semibold tracking-tight">Find your tool</h2>
      <p role="status" aria-live="polite" aria-atomic="true" className="text-xs text-[var(--text-body)]">{matches.length} {matches.length === 1 ? 'tool' : 'tools'}{terms.length || category !== 'all' ? ' found' : ' available'}</p>
    </div>
    <div className={visualCards ? 'discovery-search' : 'max-w-xl'}><Input id="tool-search" type="search" label="Search tools" placeholder="Try thumbnail, title, RPM…" value={query} onChange={(event) => setQuery(event.target.value)} /></div>
    <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter tools by category">
      {[{ id: 'all', label: 'All tools' }, ...toolCategories].map((item) => <button key={item.id} type="button" aria-pressed={category === item.id} onClick={() => setCategory(item.id)} className={`px-3.5 py-2 rounded-full border text-xs font-medium focus-ring transition-colors ${category === item.id ? 'bg-[var(--brand-primary)] text-[var(--brand-on-primary)] border-[var(--brand-primary)]' : 'bg-[var(--bg-canvas-elevated)] text-[var(--text-body)] border-[var(--border-hairline)] hover:border-[var(--border-hairline-strong)]'}`}>{item.label}</button>)}
      {(query || category !== 'all') && <Button variant="ghost" size="sm" onClick={() => { setQuery(''); setCategory('all'); }}>Clear filters</Button>}
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
