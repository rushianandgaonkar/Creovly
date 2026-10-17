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

export default function CreatorCalculator({ kind }: { kind: CalculatorKind }) {
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

  const summary = result
    ? [
        definition.title,
        '--- Inputs ---',
        ...definition.fields.map((field) => `${field.label}: ${input[field.key] || '0'} ${field.suffix ?? ''}`),
        '--- Calculated Results ---',
        ...result.metrics.map(
          (metric) => `${metric.label}: ${formatCalculatorMetric(metric)} (${metric.detail ?? ''})`
        ),
        `Formula: ${result.formula}`,
        `Methodology: ${result.explanation}`,
        definition.note,
      ].join('\n')
    : '';

  return (
    <ToolWorkspaceLayout
      workspace={
        <form noValidate onSubmit={handleCalculate} className="space-y-6">
          <div ref={errorRef} tabIndex={-1} className="rounded focus-ring">
            {error && (
              <Alert variant="error" title="Input validation notice">
                {error}
              </Alert>
            )}
          </div>

          <div className="flex items-center justify-between pb-2 border-b border-[var(--border-hairline-subtle)]">
            <span className="text-xs font-mono font-medium uppercase tracking-wider text-[var(--text-ink)]">
              {definition.title} Parameters
            </span>
            <button
              type="button"
              onClick={() => {
                clear();
                setInput({ ...definition.example });
              }}
              className="text-[11px] font-mono text-[var(--brand-accent)] hover:underline focus-ring cursor-pointer"
            >
              Load Example Scenario &rarr;
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {definition.fields.map((field) => (
              <NumberInput
                key={field.key}
                id={`${kind}-${field.key}`}
                label={field.label}
                value={input[field.key] ?? ''}
                min={field.min ?? 0}
                max={field.max ?? 1_000_000_000_000}
                step={field.integer ? 1 : 'any'}
                suffix={field.suffix}
                onChange={(event) => {
                  clear();
                  setInput((current) => ({ ...current, [field.key]: event.target.value }));
                }}
              />
            ))}
          </div>

          <p className="text-xs text-[var(--text-body)] leading-relaxed">
            {definition.note}
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
              Clear
            </Button>
            <Button type="submit">Calculate Scenario</Button>
          </div>

          <p role="status" className="text-xs text-[var(--text-muted)]">
            {result
              ? 'Calculations complete. Values calculated strictly from your inputs.'
              : 'Client-side arithmetic. No channel connection or financial data retention.'}
          </p>
        </form>
      }
      results={
        result ? (
          <ResultSummaryPanel
            embedded
            key={summary}
            title={definition.title}
            badge="Calculated"
            canCopy
            onCopy={async () => {
              await navigator.clipboard.writeText(summary);
            }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {result.metrics.map((metric) => (
                <MetricCard
                  key={metric.label}
                  label={metric.label}
                  value={formatCalculatorMetric(metric)}
                  subtext={metric.detail}
                />
              ))}
            </div>

            <div className="p-4 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-subtle)] space-y-2">
              <span className="text-xs font-mono font-medium text-[var(--text-ink)] block">
                Formula & Logic
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
            Enter values and click Calculate Scenario to see detailed breakdowns.
          </div>
        )
      }
    />
  );
}
