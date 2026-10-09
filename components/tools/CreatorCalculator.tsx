'use client';
import { useEffect, useRef, useState } from 'react';
import NumberInput from '@/components/form/NumberInput';
import Button from '@/components/ui/Button';
import Alert from '@/components/feedback/Alert';
import MetricCard from '@/components/results/MetricCard';
import ResultSummaryPanel from '@/components/results/ResultSummaryPanel';
import ToolWorkspaceLayout from './ToolWorkspaceLayout';
import { calculatorDefinitions, calculateCreator, formatCalculatorMetric, type CalculatorKind, type CalculatorResult } from '@/lib/creator-calculators';

export default function CreatorCalculator({ kind }: { kind: CalculatorKind }) {
  const definition = calculatorDefinitions[kind];
  const [input, setInput] = useState<Record<string, string>>({});
  const [result, setResult] = useState<CalculatorResult>(); const [error, setError] = useState('');
  const errorRef = useRef<HTMLDivElement>(null);
  useEffect(() => { if (error) errorRef.current?.focus(); }, [error]);
  const clear = () => { setResult(undefined); setError(''); };
  const summary = result ? [definition.title, ...definition.fields.map((field) => `${field.label}: ${input[field.key]}`), ...result.metrics.map((metric) => `${metric.label}: ${formatCalculatorMetric(metric)}`), result.formula, result.explanation, definition.note].join('\n') : '';
  return <ToolWorkspaceLayout workspace={<form noValidate onSubmit={(event) => { event.preventDefault(); clear(); try { setResult(calculateCreator(kind, input)); } catch (cause) { setError(cause instanceof Error ? cause.message : 'Check your inputs.'); } }} className="space-y-5">
    <div ref={errorRef} tabIndex={-1} className="rounded focus-ring">{error && <Alert variant="error" title="Check your inputs">{error}</Alert>}</div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{definition.fields.map((field) => <NumberInput key={field.key} id={`${kind}-${field.key}`} label={field.label} value={input[field.key] ?? ''} min={field.min ?? 0} max={field.max ?? 1_000_000_000_000} step={field.integer ? 1 : 'any'} suffix={field.suffix} onChange={(event) => { clear(); setInput((current) => ({ ...current, [field.key]: event.target.value })); }} />)}</div>
    <p className="text-xs text-[var(--text-body)] leading-relaxed">{definition.note}</p>
    <div className="flex flex-wrap gap-3 items-center"><Button type="button" variant="outline" size="sm" onClick={() => { clear(); setInput({}); }}>Reset</Button><Button type="button" variant="outline" size="sm" onClick={() => { clear(); setInput({ ...definition.example }); }}>Load example inputs</Button><Button type="submit">Calculate</Button></div>
    <p role="status" className="text-xs text-[var(--text-body)]">{result ? 'Calculation complete. Results reflect your entered assumptions.' : 'Enter your inputs and calculate. Nothing is saved or sent to a server.'}</p>
  </form>} results={result ? <ResultSummaryPanel embedded key={summary} title={definition.title} badge="Calculated" canCopy onCopy={() => navigator.clipboard.writeText(summary)}>
    <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))' }}>{result.metrics.map((metric) => <MetricCard key={metric.label} label={metric.label} value={formatCalculatorMetric(metric)} subtext={metric.detail} />)}</div>
    <p className="text-xs text-[var(--text-body)] break-words">{result.formula}</p><p className="text-xs text-[var(--text-body)]">{result.explanation}</p>
  </ResultSummaryPanel> : <p className="py-10 text-center text-sm text-[var(--text-body)]">Your calculated results will appear here.</p>} />;
}
