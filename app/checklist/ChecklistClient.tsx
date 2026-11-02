'use client';

import React, { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import PageHero from '@/components/ui/PageHero';
import { useI18n, LocalizedLink } from '@/lib/i18n';

export const ChecklistClient: React.FC = () => {
  const { t } = useI18n();
  const [checkedState, setCheckedState] = useState<Record<string, boolean>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  const sections = t.checklist.sections;

  useEffect(() => {
    try {
      const stored = localStorage.getItem('creovly-checklist');
      if (stored) {
        setCheckedState(JSON.parse(stored));
      }
    } catch (_) {}
    setIsLoaded(true);
  }, []);

  const toggleItem = (id: string) => {
    setCheckedState((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem('creovly-checklist', JSON.stringify(next));
      } catch (_) {}
      return next;
    });
  };

  const handleReset = () => {
    setCheckedState({});
    try {
      localStorage.removeItem('creovly-checklist');
    } catch (_) {}
  };

  const totalItems = sections.reduce((acc, sec) => acc + sec.items.length, 0);
  const completedCount = isLoaded
    ? sections
        .flatMap((s) => s.items)
        .filter((item) => checkedState[item.id]).length
    : 0;

  const handleExportText = () => {
    const lines: string[] = [
      `${t.checklist.hero.heading}`,
      `${t.checklist.status.completed.replace('{count}', String(completedCount)).replace('{total}', String(totalItems))}`,
      '',
    ];

    sections.forEach((section) => {
      lines.push(`--- ${section.title} ---`);
      section.items.forEach((item) => {
        const mark = checkedState[item.id] ? '[x]' : '[ ]';
        lines.push(`${mark} ${item.title}`);
        lines.push(`    ${item.description}`);
      });
      lines.push('');
    });

    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'pre-publish-checklist.txt';
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    setTimeout(() => URL.revokeObjectURL(url), 30000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      <PageHero tone="amber" className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <Badge variant="new">{t.checklist.hero.badge}</Badge>
              <span className="text-xs font-mono text-[var(--text-muted)]">{t.checklist.hero.tag}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-ink)]">
              {t.checklist.hero.heading}
            </h1>
            <p className="mt-2 text-sm sm:text-base text-[var(--text-body)] leading-relaxed max-w-2xl">
              {t.checklist.hero.subheading}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {isLoaded && completedCount > 0 && (
              <button
                type="button"
                onClick={handleReset}
                aria-label={t.checklist.status.resetAria}
                className="text-xs text-[var(--text-muted)] hover:text-red-500 transition-colors underline cursor-pointer"
              >
                {t.checklist.status.resetButton}
              </button>
            )}
            <button
              type="button"
              onClick={handleExportText}
              className="text-xs text-[var(--brand-accent)] hover:underline cursor-pointer font-medium"
            >
              {t.checklist.status.exportButton}
            </button>
          </div>
        </div>
      </PageHero>

      {/* Progress & Readiness Banner */}
      <div className="mb-6 p-4 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] space-y-2.5 shadow-2xs">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-[var(--text-body)]">
            {t.checklist.status.auditReadiness} <strong className="text-[var(--text-ink)]">{t.checklist.status.completed.replace('{count}', String(completedCount)).replace('{total}', String(totalItems))}</strong>
          </span>
          <span className={completedCount === totalItems ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-[var(--brand-accent)] font-bold'}>
            {totalItems > 0 ? Math.round((completedCount / totalItems) * 100) : 0}%
          </span>
        </div>
        <div className="w-full h-2 rounded-full bg-[var(--bg-canvas-subtle)] border border-[var(--border-hairline-subtle)] overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${
              completedCount === totalItems && totalItems > 0 ? 'bg-emerald-500' : 'bg-[var(--brand-accent)]'
            }`}
            style={{ width: `${totalItems > 0 ? (completedCount / totalItems) * 100 : 0}%` }}
          />
        </div>
      </div>

      {/* 100% Complete Celebration Banner */}
      {isLoaded && completedCount === totalItems && totalItems > 0 && (
        <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 flex flex-wrap items-center justify-between gap-3 mb-6 animate-fade-in-up">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <strong className="text-xs sm:text-sm font-semibold">{t.checklist.status.allComplete}</strong>
          </div>
          <LocalizedLink href="/studio">
            <Button variant="primary" size="sm">
              {t.checklist.status.packageStudioButton}
            </Button>
          </LocalizedLink>
        </div>
      )}

      {/* Interactive Checklist Groups */}
      <div className="space-y-6">
        {sections.map((section) => {
          const groupCompleted = section.items.filter((i) => checkedState[i.id]).length;
          const isGroupAllDone = groupCompleted === section.items.length && section.items.length > 0;
          return (
            <div
              key={section.title}
              className={`rounded-xl border transition-all duration-200 bg-[var(--bg-canvas-elevated)] p-6 shadow-2xs ${
                isGroupAllDone
                  ? 'border-emerald-500/30 ring-1 ring-emerald-500/15'
                  : 'border-[var(--border-hairline)]'
              }`}
            >
              <h2 className="text-sm font-semibold tracking-tight text-[var(--text-ink)] pb-3 border-b border-[var(--border-hairline-subtle)] flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <span>{section.title}</span>
                  {isGroupAllDone && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold">
                      {t.checklist.status.completeLabel}
                    </span>
                  )}
                </span>
                <span className="text-xs font-mono text-[var(--text-muted)]">
                  {t.checklist.status.itemsCount
                    .replace('{completed}', String(groupCompleted))
                    .replace('{total}', String(section.items.length))}
                </span>
              </h2>
              <div className="mt-4 space-y-3">
                {section.items.map((item) => {
                  const isChecked = Boolean(checkedState[item.id]);
                  return (
                    <label
                      key={item.id}
                      className="flex items-start gap-3 cursor-pointer group select-none p-2 rounded-lg hover:bg-[var(--bg-canvas-subtle)] transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleItem(item.id)}
                        className="mt-0.5 w-4 h-4 rounded border-[var(--border-hairline-strong)] accent-[var(--brand-accent)] cursor-pointer"
                      />
                      <div>
                        <span
                          className={`text-sm font-medium transition-colors ${
                            isChecked
                              ? 'line-through text-[var(--text-muted)]'
                              : 'text-[var(--text-ink)] group-hover:text-[var(--brand-accent)]'
                          }`}
                        >
                          {item.title}
                        </span>
                        <p className="text-xs text-[var(--text-muted)] mt-0.5">
                          {item.description}
                        </p>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-[var(--border-hairline)]">
        <span className="text-xs text-[var(--text-muted)]">
          {t.checklist.status.storageNotice}
        </span>
        <LocalizedLink href="/studio">
          <Button variant="primary" size="md">
            {t.checklist.status.openStudioButton}
          </Button>
        </LocalizedLink>
      </div>
    </div>
  );
};

export default ChecklistClient;
