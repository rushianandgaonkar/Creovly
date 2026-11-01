/* Hallmark · genre: modern-minimal · macrostructure: Workbench */
'use client';

import { useEffect, useRef, useState } from 'react';
import NumberInput from '@/components/form/NumberInput';
import Button from '@/components/ui/Button';
import Alert from '@/components/feedback/Alert';
import MetricCard from '@/components/results/MetricCard';
import ResultSummaryPanel from '@/components/results/ResultSummaryPanel';
import ToolWorkspaceLayout from './ToolWorkspaceLayout';
import {
  calculatorDefinitions,
  calculateCreator,
  formatCalculatorMetric,
  type CalculatorKind,
  type CalculatorResult,
} from '@/lib/creator-calculators';
import { useI18n } from '@/lib/i18n';

export default function CreatorCalculator({ kind }: { kind: CalculatorKind }) {
  const { t } = useI18n();
  const definition = calculatorDefinitions[kind];
  const [input, setInput] = useState<Record<string, string>>({});
  const [result, setResult] = useState<CalculatorResult>();
  const [error, setError] = useState('');
  const errorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (error) errorRef.current?.focus();
  }, [error]);

  const clear = () => {
    setResult(undefined);
    setError('');
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    clear();
    try {
      setResult(calculateCreator(kind, input));
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Please check your inputs.');
    }
  };

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

  const getLocalizedField = (fieldKey: string, fallbackLabel: string, fallbackSuffix?: string) => {
    if (kind === 'revenue') {
      const f = (t.calculator.revenue.fields as any)[fieldKey];
      if (f) return { label: f.label, suffix: f.suffix || fallbackSuffix };
    } else if (kind === 'rpm') {
      const f = (t.calculator.rpm.fields as any)[fieldKey];
      if (f) return { label: f.label, suffix: f.suffix || fallbackSuffix };
    } else if (kind === 'watch-hours') {
      const f = (t.calculator.watchHours.fields as any)[fieldKey];
      if (f) return { label: f.label, suffix: f.suffix || fallbackSuffix };
    } else if (kind === 'monetization') {
      const f = (t.calculator.monetization.fields as any)[fieldKey];
      if (f) return { label: f.label, suffix: f.suffix || fallbackSuffix };
    }
    return { label: fallbackLabel, suffix: fallbackSuffix };
  };

  const getLocalizedMetricLabel = (label: string): string => {
    if (kind === 'revenue') {
      if (label.includes('Lower Monthly')) return t.calculator.revenue.metrics.monthlyLower;
      if (label.includes('Upper Monthly')) return t.calculator.revenue.metrics.monthlyUpper;
      if (label.includes('Lower Annual')) return t.calculator.revenue.metrics.annualLower;
      if (label.includes('Upper Annual')) return t.calculator.revenue.metrics.annualUpper;
    } else if (kind === 'rpm') {
      if (label.includes('Calculated RPM')) return t.calculator.rpm.metrics.calculatedRpm;
      if (label.includes('Revenue Entered')) return t.calculator.rpm.metrics.revenueEntered;
      if (label.includes('Views Entered')) return t.calculator.rpm.metrics.viewsEntered;
    } else if (kind === 'watch-hours') {
      if (label.includes('Hours Remaining')) return t.calculator.watchHours.metrics.remaining;
      if (label.includes('Progress to Goal')) return t.calculator.watchHours.metrics.progress;
      if (label.includes('Pace')) return t.calculator.watchHours.metrics.pace;
      if (label.includes('Views Needed')) return t.calculator.watchHours.metrics.viewsNeeded;
    } else if (kind === 'monetization') {
      if (label.includes('Total Monthly Revenue')) return t.calculator.monetization.metrics.monthlyTotal;
      if (label.includes('Monthly After Costs')) return t.calculator.monetization.metrics.afterCosts;
      if (label.includes('Platform Ad Revenue')) return t.calculator.monetization.metrics.platform;
      if (label.includes('Sponsorship Revenue')) return t.calculator.monetization.metrics.sponsorship;
      if (label.includes('Affiliate Revenue')) return t.calculator.monetization.metrics.affiliate;
      if (label.includes('Other Revenue')) return t.calculator.monetization.metrics.other;
      if (label.includes('Costs')) return t.calculator.monetization.metrics.costs;
      if (label.includes('Annual Net')) return t.calculator.monetization.metrics.annualNet;
    }
    return label;
  };

  const localizedTitle = getLocalizedTitle();
  const localizedNote = getLocalizedNote();

  const summary = result
    ? [
        localizedTitle,
        t.calculator.shared.inputsHeader,
        ...definition.fields.map((field) => {
          const loc = getLocalizedField(field.key, field.label, field.suffix);
          return `${loc.label}: ${input[field.key] || '0'} ${loc.suffix ?? ''}`;
        }),
        t.calculator.shared.resultsHeader,
        ...result.metrics.map(
          (metric) => `${getLocalizedMetricLabel(metric.label)}: ${formatCalculatorMetric(metric)} (${metric.detail ?? ''})`
        ),
        `${t.calculator.shared.formulaPrefix}${result.formula}`,
        `${t.calculator.shared.methodologyPrefix}${result.explanation}`,
        localizedNote,
      ].join('\n')
    : '';

  return (
    <ToolWorkspaceLayout
      workspace={
        <form noValidate onSubmit={handleCalculate} className="space-y-6">
          <div ref={errorRef} tabIndex={-1} className="rounded focus-ring">
            {error && (
              <Alert variant="error" title={t.calculator.shared.validationNoticeTitle}>
                {error}
              </Alert>
            )}
          </div>

          <div className="flex items-center justify-between pb-2 border-b border-[var(--border-hairline-subtle)]">
            <span className="text-xs font-mono font-medium uppercase tracking-wider text-[var(--text-ink)]">
              {t.calculator.shared.parametersHeading.replace('{title}', localizedTitle)}
            </span>
            <button
              type="button"
              onClick={() => {
                clear();
                setInput({ ...definition.example });
              }}
              className="text-[11px] font-mono text-[var(--brand-accent)] hover:underline focus-ring cursor-pointer"
            >
              {t.calculator.shared.loadExample}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {definition.fields.map((field) => {
              const loc = getLocalizedField(field.key, field.label, field.suffix);
              return (
                <NumberInput
                  key={field.key}
                  id={`${kind}-${field.key}`}
                  label={loc.label}
                  value={input[field.key] ?? ''}
                  min={field.min ?? 0}
                  max={field.max ?? 1_000_000_000_000}
                  step={field.integer ? 1 : 'any'}
                  suffix={loc.suffix}
                  onChange={(event) => {
                    clear();
                    setInput((current) => ({ ...current, [field.key]: event.target.value }));
                  }}
                />
              );
            })}
          </div>

          <p className="text-xs text-[var(--text-body)] leading-relaxed">
            {localizedNote}
          </p>

          <div className="flex flex-wrap gap-3 items-center justify-between pt-4 border-t border-[var(--border-hairline-subtle)]">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                clear();
                setInput({});
              }}
            >
              {t.calculator.shared.clearButton}
            </Button>
            <Button type="submit">{t.calculator.shared.calculateButton}</Button>
          </div>

          <p role="status" className="text-xs text-[var(--text-muted)]">
            {result
              ? t.calculator.shared.completeStatus
              : t.calculator.shared.initialStatus}
          </p>
        </form>
      }
      results={
        result ? (
          <ResultSummaryPanel
            embedded
            key={summary}
            title={localizedTitle}
            badge={t.calculator.shared.calculatedBadge}
            canCopy
            onCopy={async () => {
              await navigator.clipboard.writeText(summary);
            }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {result.metrics.map((metric) => (
                <MetricCard
                  key={metric.label}
                  label={getLocalizedMetricLabel(metric.label)}
                  value={formatCalculatorMetric(metric)}
                  subtext={metric.detail}
                />
              ))}
            </div>

            <div className="p-4 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-subtle)] space-y-2">
              <span className="text-xs font-mono font-medium text-[var(--text-ink)] block">
                {t.calculator.shared.formulaPrefix.trim()}
              </span>
              <p className="text-xs font-mono text-[var(--text-muted)] break-words">
                {result.formula}
              </p>
              <p className="text-xs text-[var(--text-body)] leading-relaxed">
                {result.explanation}
              </p>
            </div>
          </ResultSummaryPanel>
        ) : (
          <div className="py-16 text-center text-xs text-[var(--text-muted)] font-mono">
            {t.calculator.shared.initialStatus}
          </div>
        )
      }
    />
  );
}
