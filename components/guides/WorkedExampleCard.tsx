'use client';

import React from 'react';
import type { WorkedExample } from '@/lib/guides';
import { useI18n } from '@/lib/i18n';

interface WorkedExampleCardProps {
  example: WorkedExample;
}

export default function WorkedExampleCard({ example }: WorkedExampleCardProps) {
  const { t } = useI18n();
  const article = t.guides.article;

  return (
    <section
      aria-labelledby="worked-example-heading"
      className="my-10 rounded-2xl border border-[var(--border-hairline-strong)] bg-[var(--bg-canvas-elevated)] p-6 sm:p-8 shadow-sm"
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="text-[11px] font-mono font-medium tracking-wide uppercase px-2.5 py-0.5 rounded-full bg-violet-100 dark:bg-violet-950/60 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-800/50">
          {article.workedScenarioBadge}
        </span>
        <span className="text-xs text-[var(--text-muted)] font-mono">{article.workedScenarioTag}</span>
      </div>

      <h3
        id="worked-example-heading"
        className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--text-ink)]"
      >
        {example.title}
      </h3>

      <p className="mt-3 text-sm text-[var(--text-body)] leading-relaxed bg-[var(--bg-canvas-subtle)] p-4 rounded-xl border border-[var(--border-hairline)]">
        <strong className="text-[var(--text-ink)] font-semibold">{article.scenarioLabel} </strong>
        {example.scenario}
      </p>

      <div className="mt-6 space-y-3">
        <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]">
          {article.executionStepsLabel}
        </h4>
        <ol className="space-y-3">
          {example.steps.map((step, index) => (
            <li
              key={index}
              className="flex items-start gap-3.5 text-sm text-[var(--text-body)] leading-relaxed"
            >
              <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-md bg-[var(--bg-canvas-subtle)] text-[var(--text-ink)] font-mono text-xs font-semibold border border-[var(--border-hairline)]">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="pt-0.5">{step}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-6 pt-5 border-t border-[var(--border-hairline)] flex items-start gap-3 bg-blue-50/50 dark:bg-blue-950/20 p-4 rounded-xl border-l-4 border-l-[var(--brand-accent)]">
        <div className="text-xs text-[var(--text-body)] leading-relaxed">
          <strong className="text-[var(--text-ink)] font-semibold">{article.takeawayLabel} </strong>
          {example.conclusion}
        </div>
      </div>
    </section>
  );
}
