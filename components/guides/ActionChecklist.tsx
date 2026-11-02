'use client';

import React, { useState } from 'react';
import type { GuideChecklistItem } from '@/lib/guides';
import { useI18n } from '@/lib/i18n';

interface ActionChecklistProps {
  items: GuideChecklistItem[];
  guideTitle: string;
}

export default function ActionChecklist({ items }: ActionChecklistProps) {
  const [checkedState, setCheckedState] = useState<Record<number, boolean>>({});
  const { t } = useI18n();
  const article = t.guides.article;

  const toggleItem = (index: number) => {
    setCheckedState((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const completedCount = Object.values(checkedState).filter(Boolean).length;
  const counterText = article.checklistCompleted
    .replace('{completed}', String(completedCount))
    .replace('{total}', String(items.length));

  return (
    <section
      aria-labelledby="action-checklist-heading"
      className="my-10 rounded-2xl border border-[var(--border-hairline-strong)] bg-[var(--bg-canvas-elevated)] p-6 sm:p-8"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-5 border-b border-[var(--border-hairline)]">
        <div>
          <span className="text-[11px] font-mono font-medium tracking-wide uppercase px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/50">
            {article.checklistBadge}
          </span>
          <h3
            id="action-checklist-heading"
            className="mt-2 text-xl font-bold tracking-tight text-[var(--text-ink)]"
          >
            {article.checklistTitle}
          </h3>
        </div>
        <div className="text-xs font-mono text-[var(--text-muted)] self-start sm:self-center bg-[var(--bg-canvas-subtle)] px-3 py-1.5 rounded-lg border border-[var(--border-hairline)]">
          {counterText}
        </div>
      </div>

      <p className="mt-4 text-xs text-[var(--text-muted)]">
        {article.checklistNote}
      </p>

      <ul className="mt-6 space-y-3.5">
        {items.map((item, index) => {
          const isChecked = !!checkedState[index];
          return (
            <li
              key={index}
              onClick={() => toggleItem(index)}
              className={`group flex items-start gap-3.5 p-3.5 rounded-xl border transition-all cursor-pointer ${
                isChecked
                  ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800/60'
                  : 'bg-[var(--bg-canvas)] border-[var(--border-hairline)] hover:border-[var(--border-hairline-strong)]'
              }`}
            >
              <div
                className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center transition-colors flex-shrink-0 ${
                  isChecked
                    ? 'bg-emerald-600 border-emerald-600 text-white'
                    : 'border-[var(--border-hairline-strong)] bg-[var(--bg-canvas-subtle)] group-hover:border-[var(--brand-accent)]'
                }`}
                aria-hidden="true"
              >
                {isChecked && (
                  <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <span
                  className={`text-sm font-semibold transition-all block ${
                    isChecked
                      ? 'text-[var(--text-muted)] line-through opacity-80'
                      : 'text-[var(--text-ink)]'
                  }`}
                >
                  {item.title}
                </span>
                <p className="mt-1 text-xs text-[var(--text-body)] leading-relaxed">
                  {item.detail}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
