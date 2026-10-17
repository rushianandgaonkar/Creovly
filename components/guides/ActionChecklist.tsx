'use client';

import React, { useState } from 'react';
import type { GuideChecklistItem } from '@/lib/guides';

interface ActionChecklistProps {
  items: GuideChecklistItem[];
  guideTitle: string;
}

export default function ActionChecklist({ items, guideTitle }: ActionChecklistProps) {
  const [checkedState, setCheckedState] = useState<Record<number, boolean>>({});

  const toggleItem = (index: number) => {
    setCheckedState((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const completedCount = Object.values(checkedState).filter(Boolean).length;

  return (
    <section
      aria-labelledby="action-checklist-heading"
      className="my-10 rounded-2xl border border-[var(--border-hairline-strong)] bg-[var(--bg-canvas-elevated)] p-6 sm:p-8"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-5 border-b border-[var(--border-hairline)]">
        <div>
          <span className="text-[11px] font-mono font-medium tracking-wide uppercase px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/50">
            Action Checklist
          </span>
          <h3
            id="action-checklist-heading"
            className="mt-2 text-xl font-bold tracking-tight text-[var(--text-ink)]"
          >
            Pre-Publish Verification
          </h3>
        </div>
        <div className="text-xs font-mono text-[var(--text-muted)] self-start sm:self-center bg-[var(--bg-canvas-subtle)] px-3 py-1.5 rounded-lg border border-[var(--border-hairline)]">
          Completed: {completedCount} of {items.length}
        </div>
      </div>

      <p className="mt-4 text-xs text-[var(--text-muted)]">
        Check each item off as you prepare your media for YouTube upload.
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
              <button
                type="button"
                role="checkbox"
                aria-checked={isChecked}
                aria-label={`Mark ${item.title} as completed`}
                className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded flex items-center justify-center border transition-all ${
                  isChecked
                    ? 'bg-emerald-600 border-emerald-600 text-white'
                    : 'border-[var(--border-hairline-strong)] bg-[var(--bg-canvas-elevated)] group-hover:border-[var(--text-muted)]'
                }`}
              >
                {isChecked && (
                  <svg
                    className="w-3.5 h-3.5 fill-current"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
              <div className="flex-1 select-none">
                <span
                  className={`text-sm font-semibold block transition-colors ${
                    isChecked
                      ? 'text-emerald-900 dark:text-emerald-200 line-through opacity-85'
                      : 'text-[var(--text-ink)]'
                  }`}
                >
                  {item.title}
                </span>
                <span
                  className={`mt-0.5 text-xs block leading-relaxed transition-colors ${
                    isChecked ? 'text-emerald-800 dark:text-emerald-300/80' : 'text-[var(--text-body)]'
                  }`}
                >
                  {item.detail}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
