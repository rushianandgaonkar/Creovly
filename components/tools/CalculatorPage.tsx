/* Hallmark · genre: modern-minimal · macrostructure: Workbench */
'use client';

import ToolPageShell from './ToolPageShell';
import CreatorCalculator from './CreatorCalculator';
import { getTool } from '@/lib/metadata';
import { calculatorDefinitions, type CalculatorKind } from '@/lib/creator-calculators';
import { calculatorFaqs } from '@/config/calculator-faqs';
import { useI18n } from '@/lib/i18n';

export default function CalculatorPage({ kind, slug }: { kind: CalculatorKind; slug: string }) {
  const { t } = useI18n();
  const tool = getTool(slug);
  const definition = calculatorDefinitions[kind];
  const watch = kind === 'watch-hours';

  const getLocalizedTitle = (): string => {
    switch (kind) {
      case 'revenue':
        return t.calculator.revenue.title;
      case 'rpm':
        return t.calculator.rpm.title;
      case 'watch-hours':
        return t.calculator.watchHours.title;
      case 'monetization':
        return t.calculator.monetization.title;
    }
  };

  const getLocalizedNote = (): string => {
    switch (kind) {
      case 'revenue':
        return t.calculator.revenue.note;
      case 'rpm':
        return t.calculator.rpm.note;
      case 'watch-hours':
        return t.calculator.watchHours.note;
      case 'monetization':
        return t.calculator.monetization.note;
    }
  };

  return (
    <ToolPageShell
      title={getLocalizedTitle()}
      description={tool.description}
      category={t.tools.categories.moneyGrowth.label}
      categoryHref="/tools"
      toolSlug={slug}
      educationalContent={
        <div className="space-y-4">
          <p>
            {t.calculator.shared.educationalIntro}
          </p>
          <div className="p-4 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-subtle)] text-xs text-[var(--text-body)]">
            <span className="font-mono font-semibold text-[var(--text-ink)] block mb-1">
              {t.calculator.shared.methodologyNoticeTitle}
            </span>
            {getLocalizedNote()}
          </div>
          <p>
            {t.calculator.shared.educationalLocalNote}
          </p>
          <p>
            <a
              href={
                watch
                  ? 'https://support.google.com/youtube/answer/72851'
                  : 'https://support.google.com/youtube/answer/9314357'
              }
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--brand-accent)] font-medium hover:underline focus-ring inline-flex items-center gap-1 text-xs font-mono"
            >
              <span>{watch ? t.calculator.shared.officialGuideLinkTextWatch : t.calculator.shared.officialGuideLinkTextRpm}</span>
              <span aria-hidden="true">&rarr;</span>
            </a>
          </p>
        </div>
      }
      faqs={calculatorFaqs[kind]}
    >
      <CreatorCalculator kind={kind} />
    </ToolPageShell>
  );
}
