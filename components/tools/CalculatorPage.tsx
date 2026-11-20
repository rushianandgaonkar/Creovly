'use client';

import ToolPageShell from './ToolPageShell';
import CreatorCalculator from './CreatorCalculator';
import { getTool } from '@/lib/metadata';
import { calculatorDefinitions, type CalculatorKind } from '@/lib/creator-calculators';
import { calculatorFaqs } from '@/config/calculator-faqs';
import { useI18n, LocalizedLink } from '@/lib/i18n';
import { toolSeoContent } from '@/config/tool-guidance-i18n';
import { revenueExplainer } from '@/config/revenue-explainer';
import { translations } from '@/config/i18n';

export default function CalculatorPage({ kind, slug }: { kind: CalculatorKind; slug: string }) {
  const { t, locale } = useI18n();
  const seo = toolSeoContent[locale] || toolSeoContent.en;
  const rx = revenueExplainer[locale] || revenueExplainer.en;
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
      case 'cpm':
        return t.calculator.cpm.title;
      default:
        return definition.title;
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
      case 'cpm':
        return t.calculator.cpm.note;
      default:
        return definition.note;
    }
  };

  return (
    <ToolPageShell
      title={getLocalizedTitle()}
      description={translations[locale]?.tools[slug]?.description || tool.description}
      category={t.tools.categories.moneyGrowth.label}
      categoryHref="/tools"
      toolSlug={slug}
      educationalContent={
        <div className="space-y-4">
          {kind === 'revenue' && (
            <div>
              <p className="font-medium text-[var(--text-ink)] mb-2">
                {seo.calculators.revenueIntro}
              </p>
              <h2 className="text-base font-bold text-[var(--text-ink)] pt-1">
                {seo.calculators.revenueHow}
              </h2>
              <p className="text-xs text-[var(--text-body)] mt-1 mb-2">
                {seo.calculators.revenueDesc}
              </p>
              <div className="space-y-3 mt-3">
                <h2 className="text-base font-bold text-[var(--text-ink)]">{rx.rpmHeading}</h2>
                <p>{rx.rpmBody}</p>
                <h2 className="text-base font-bold text-[var(--text-ink)]">{rx.exampleHeading}</h2>
                <p>{rx.exampleBody}</p>
                <h2 className="text-base font-bold text-[var(--text-ink)]">{rx.relatedHeading}</h2>
                <ul className="list-disc pl-5">
                  {(
                    [
                      ['/tools/youtube-rpm-calculator', rx.rpm],
                      ['/tools/youtube-monetization-calculator', rx.monetization],
                      ['/tools/youtube-watch-hours-calculator', rx.watchHours],
                    ] as const
                  ).map(([href, item]) => (
                    <li key={href}>
                      <LocalizedLink href={href} className="text-[var(--brand-accent-deep)] underline hover:no-underline font-medium">
                        {item.label}
                      </LocalizedLink>{' '}
                      {item.note}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          {kind === 'rpm' && (
            <div>
              <p className="font-medium text-[var(--text-ink)] mb-2">
                {seo.calculators.rpmIntro}
              </p>
              <h2 className="text-base font-bold text-[var(--text-ink)] pt-1">
                {seo.calculators.rpmHow}
              </h2>
            </div>
          )}
          {kind === 'monetization' && (
            <div>
              <p className="font-medium text-[var(--text-ink)] mb-2">
                {seo.calculators.monetizationIntro}
              </p>
              <h2 className="text-base font-bold text-[var(--text-ink)] pt-1">
                {seo.calculators.monetizationHow}
              </h2>
              <p className="text-xs">
                Review official thresholds and partner criteria in our guide to{' '}
                <LocalizedLink href="/guides/youtube-monetization-requirements" className="text-[var(--brand-accent-deep)] underline hover:no-underline font-medium">
                  YouTube monetization requirements
                </LocalizedLink>.
              </p>
            </div>
          )}
          {kind === 'cpm' && (
            <div>
              <p>{t.calculator.cpm.about1}</p>
              <p>{t.calculator.cpm.about2}</p>
              <p>
                <a
                  href="https://support.google.com/youtube/answer/9314357"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--brand-accent-deep)] underline hover:no-underline font-medium focus-ring text-xs"
                >
                  {t.calculator.cpm.sourceLabel}
                </a>
              </p>
            </div>
          )}
          {kind === 'watch-hours' && (
            <div>
              <p className="text-xs">
                Track your eligibility trajectory with official platform standards in our guide to{' '}
                <LocalizedLink href="/guides/youtube-monetization-requirements" className="text-[var(--brand-accent-deep)] underline hover:no-underline font-medium">
                  YouTube monetization requirements
                </LocalizedLink>.
              </p>
            </div>
          )}
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
              className="text-[var(--brand-accent-deep)] font-medium hover:underline focus-ring text-xs"
            >
              <span>{watch ? t.calculator.shared.officialGuideLinkTextWatch : t.calculator.shared.officialGuideLinkTextRpm}</span>
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
