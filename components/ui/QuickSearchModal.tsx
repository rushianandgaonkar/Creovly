'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { toolRegistry } from '@/config/site';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

interface QuickSearchItem {
  id: string;
  title: string;
  category: string;
  href: string;
  description: string;
  tag?: string;
}

const allSearchItems: QuickSearchItem[] = [
  {
    id: 'studio',
    title: 'Publish Studio (Command Center)',
    category: 'Flagship Studio',
    href: '/studio',
    description: 'Unified workspace for title, description, thumbnail preparation, automated checks, and ZIP package export.',
    tag: 'Flagship Tool',
  },
  {
    id: 'checklist',
    title: 'Pre-Publish Launch Checklist',
    category: 'Workflow',
    href: '/checklist',
    description: 'Systematic pre-flight audit for thumbnails, titles, affiliate disclosures, and YouTube compliance.',
    tag: 'Checklist',
  },
  ...toolRegistry.map((tool) => ({
    id: tool.id,
    title: tool.title,
    category: tool.categoryLabel,
    href: tool.href,
    description: tool.description,
    tag: tool.badge || 'Tool',
  })),
];

export default function QuickSearchModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Filter items
  const filtered = allSearchItems.filter((item) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      item.title.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q)
    );
  });

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Keyboard navigation inside modal
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filtered.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % Math.max(1, filtered.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        router.push(filtered[selectedIndex].href);
        onClose();
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        showCloseButton={false}
        className="top-[18%] sm:top-[22%] translate-y-0 w-full max-w-2xl rounded-2xl border border-[var(--border-hairline-strong)] bg-[var(--bg-canvas-elevated)] shadow-2xl p-0 gap-0 overflow-hidden"
      >
        <DialogTitle className="sr-only">Quick tool launcher</DialogTitle>
        <DialogDescription className="sr-only">
          Search and launch Creovly tools, calculators, studio, and guides
        </DialogDescription>

        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[var(--border-hairline)] bg-[var(--bg-canvas)]">
          <svg className="w-5 h-5 text-[var(--brand-accent)] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search tools, calculators, studio, checklist…"
            className="w-full bg-transparent text-sm sm:text-base text-[var(--text-ink)] placeholder-[var(--text-muted)] focus:outline-none font-sans"
          />
          <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono rounded border border-[var(--border-hairline)] bg-[var(--bg-canvas-subtle)] text-[var(--text-muted)]">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div ref={listRef} className="max-h-[60vh] overflow-y-auto p-2 space-y-1">
          {filtered.length > 0 ? (
            filtered.map((item, idx) => {
              const isSelected = selectedIndex === idx;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    router.push(item.href);
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full text-left px-3.5 py-3 rounded-xl transition-colors flex items-start justify-between gap-3 ${
                    isSelected
                      ? 'bg-[var(--bg-canvas-subtle)] border border-[var(--brand-accent)]/30'
                      : 'hover:bg-[var(--bg-canvas-subtle)] border border-transparent'
                  }`}
                >
                  <div className="space-y-0.5 min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-[var(--text-ink)] tracking-tight">
                        {item.title}
                      </span>
                      {item.tag && (
                        <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-[var(--bg-canvas-elevated)] border border-[var(--border-hairline)] text-[var(--brand-accent)]">
                          {item.tag}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[var(--text-muted)] line-clamp-1">
                      {item.description}
                    </p>
                  </div>
                  <span className="text-[10px] font-mono text-[var(--text-faint)] shrink-0 self-center hidden sm:inline-block">
                    {item.category} &rarr;
                  </span>
                </button>
              );
            })
          ) : (
            <div className="py-12 text-center text-xs text-[var(--text-muted)] space-y-1">
              <p className="font-semibold text-[var(--text-ink)]">No results found for &quot;{query}&quot;</p>
              <p>Try searching for thumbnail, compressor, title, RPM, or studio.</p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-4 py-2.5 border-t border-[var(--border-hairline)] bg-[var(--bg-canvas-subtle)] flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)]">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <span>100% Client-Side Search</span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
