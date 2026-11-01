'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { toolRegistry } from '@/config/site';
import { useI18n } from '@/lib/i18n';
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
  const { t, translateHref } = useI18n();

  const getToolTitle = (id: string, fallback: string): string => {
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

  const allSearchItems: QuickSearchItem[] = [
    {
      id: 'studio',
      title: `${t.common.nav.studio} (${t.common.searchModal.flagshipBadge})`,
      category: t.common.nav.studio,
      href: '/studio',
      description: t.home.destinations.studio.description,
      tag: t.common.searchModal.flagshipBadge,
    },
    {
      id: 'checklist',
      title: t.checklist.hero.heading,
      category: t.common.searchModal.workflowBadge,
      href: '/checklist',
      description: t.checklist.hero.subheading,
      tag: t.common.nav.checklist,
    },
    ...toolRegistry.map((tool) => ({
      id: tool.id,
      title: getToolTitle(tool.id, tool.title),
      category: tool.categoryLabel,
      href: tool.href,
      description: tool.description,
      tag: tool.badge || t.common.badges.available,
    })),
  ];

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
        router.push(translateHref(filtered[selectedIndex].href));
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
        <DialogTitle className="sr-only">{t.common.searchModal.title}</DialogTitle>
        <DialogDescription className="sr-only">
          {t.common.searchModal.placeholder}
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
            placeholder={t.common.searchModal.placeholder}
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
                    router.push(translateHref(item.href));
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full text-left px-3.5 py-3 rounded-xl transition-colors flex items-start justify-between gap-3 cursor-pointer ${
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
              <p className="font-semibold text-[var(--text-ink)]">{t.common.searchModal.noResults} &quot;{query}&quot;</p>
              <p>{t.common.searchModal.tryDifferent}</p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-4 py-2.5 border-t border-[var(--border-hairline)] bg-[var(--bg-canvas-subtle)] flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)]">
          <div className="flex items-center gap-3">
            <span>↑↓ {t.common.searchModal.navigate}</span>
            <span>↵ {t.common.searchModal.select}</span>
            <span>ESC {t.common.searchModal.close}</span>
          </div>
          <span>{t.common.badges.inBrowser}</span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
