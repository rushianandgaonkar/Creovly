/* Hallmark · genre: modern-minimal · macrostructure: Workbench */
'use client';

import { useI18n } from '@/lib/i18n';
import { toolGuidance } from '@/config/tool-guidance';
import { toolPlaybookTranslations } from '@/config/tool-guidance-i18n';

export default function ToolSteps({ slug }: { slug: string }) {
  const { locale } = useI18n();
  const playbook = toolPlaybookTranslations[locale] || toolPlaybookTranslations.en;
  const steps = playbook.tools[slug] || toolGuidance[slug]?.steps;

  if (!steps) return null;

  return (
    <section
      id="how-to-use"
      className="mt-14 pt-10 border-t border-[var(--border-hairline)] scroll-mt-20"
      aria-labelledby="steps-heading"
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-accent)]" />
        <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]">
          {playbook.badge}
        </span>
      </div>
      <h2
        id="steps-heading"
        className="text-xl font-bold tracking-tight text-[var(--text-ink)]"
      >
        {playbook.heading}
      </h2>
      <p className="mt-1 text-xs text-[var(--text-body)]">
        {playbook.subheading}
      </p>

      <ol className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-6 list-none p-0">
        {steps.map((step, index) => (
          <li
            key={index}
            className="min-w-0 rounded-2xl border border-[var(--border-hairline)] p-5 sm:p-6 bg-[var(--bg-canvas-elevated)] shadow-[var(--shadow-whisper)] flex flex-col justify-between hover:border-[var(--brand-accent)] transition-colors group"
          >
            <div>
              <div className="flex items-center justify-between">
                <span
                  className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--bg-canvas-subtle)] border border-[var(--border-hairline)] text-[var(--brand-accent)] text-xs font-mono font-bold group-hover:bg-[var(--brand-accent-soft)] group-hover:text-[var(--brand-accent-deep)] transition-colors"
                  aria-hidden="true"
                >
                  0{index + 1}
                </span>
                <span className="text-[10px] font-mono text-[var(--text-faint)]">
                  {`${playbook.stepPrefix} // 0${index + 1}`}
                </span>
              </div>
              <h3 className="mt-4 text-sm font-semibold text-[var(--text-ink)]">
                {step.title}
              </h3>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[var(--text-body)]">
                {step.body}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
