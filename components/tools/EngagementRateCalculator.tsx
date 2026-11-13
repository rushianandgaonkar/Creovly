'use client';

import { useState } from 'react';
import NumberInput from '@/components/form/NumberInput';
import Select from '@/components/form/Select';
import Textarea from '@/components/form/Textarea';
import Alert from '@/components/feedback/Alert';
import MetricCard from '@/components/results/MetricCard';
import ProgressBar from '@/components/results/ProgressBar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import ToolWorkspaceLayout from './ToolWorkspaceLayout';
import { segmentListClass, segmentTriggerClass } from './YouTubeLinkGenerator';
import { useI18n } from '@/lib/i18n';
import { fillTemplate } from '@/lib/utils';
import {
  calculateAverage,
  calculateEngagement,
  platformBases,
  platformFields,
  type Basis,
  type EngagementField,
  type EngagementInput,
  type EngagementResult,
  type Platform,
} from '@/lib/engagement';

const PLATFORMS: Platform[] = ['youtube', 'instagram', 'tiktok'];

export default function EngagementRateCalculator() {
  const { t, locale } = useI18n();
  const e = t.engagement;
  const [platform, setPlatform] = useState<Platform>('youtube');
  const [basis, setBasis] = useState<Basis>('views');
  const [mode, setMode] = useState('single');
  // One shared record, so likes and comments survive a platform switch.
  const [values, setValues] = useState<EngagementInput>({});
  const [rows, setRows] = useState('');

  const intl = locale === 'pt' ? 'pt-BR' : locale;
  const count = new Intl.NumberFormat(intl);
  const percent = (rate: number) => new Intl.NumberFormat(intl, { style: 'percent', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(rate / 100);
  const label = (key: EngagementField) => (key === 'followers' && platform === 'youtube' ? e.subscribers : e[key]);
  const fields = platformFields[platform];

  const single = calculateEngagement(platform, basis, values);
  const average = rows.trim() ? calculateAverage(platform, basis, rows) : null;
  const shown: EngagementResult | null = mode === 'single' ? (single.ok ? single.result : null) : average?.summary ?? null;
  const rate = mode === 'single' ? shown?.rate : average?.rate ?? undefined;

  const switchPlatform = (next: string) => {
    setPlatform(next as Platform);
    setBasis(platformBases[next as Platform][0]);
  };

  const formula = (result: EngagementResult) => `(${result.parts.map((part) => label(part.key)).join(' + ')}) ÷ ${label(result.basis)} × 100`;
  const numbers = (result: EngagementResult) => `(${result.parts.map((part) => count.format(part.value)).join(' + ')}) ÷ ${count.format(result.divisor)} × 100 = ${percent(result.rate)}`;

  const singleMessage = () => {
    if (single.ok) return null;
    const names = single.fields.map(label).join(', ');
    if (single.error === 'missing') return <p className="text-sm text-[var(--text-body)]">{fillTemplate(e.emptyPrompt, { fields: names })}</p>;
    if (single.error === 'zero') return <Alert variant="warning">{fillTemplate(e.zeroError, { field: names })}</Alert>;
    return <Alert variant="error">{fillTemplate(e.invalidError, { fields: names })}</Alert>;
  };

  const workspace = (
    <>
      <Tabs value={mode} onValueChange={setMode} className="gap-4">
        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-[var(--text-ink)]">{e.modeLabel}</span>
          <TabsList aria-label={e.modeLabel} className={segmentListClass}>
            <TabsTrigger value="single" className={segmentTriggerClass}>{e.modeSingle}</TabsTrigger>
            <TabsTrigger value="average" className={segmentTriggerClass}>{e.modeAverage}</TabsTrigger>
          </TabsList>
        </div>

        <Select
          id={`er-basis-${platform}`}
          label={e.basisLabel}
          value={basis}
          onChange={(event) => setBasis(event.target.value as Basis)}
          options={platformBases[platform].map((key) => ({ value: key, label: label(key) }))}
        />

        <TabsContent value="single">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {fields.map(({ key, optional }) => (
              <NumberInput
                key={key}
                id={`er-${platform}-${key}`}
                label={label(key)}
                hint={optional ? e.optional : undefined}
                min={0}
                inputMode="numeric"
                value={values[key] ?? ''}
                onChange={(event) => setValues((current) => ({ ...current, [key]: event.target.value }))}
                error={!single.ok && single.error === 'invalid' && single.fields.includes(key) ? fillTemplate(e.invalidError, { fields: label(key) }) : undefined}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="average" className="space-y-3">
          <Textarea
            id={`er-rows-${platform}`}
            label={e.rowsLabel}
            rows={8}
            value={rows}
            onChange={(event) => setRows(event.target.value)}
            placeholder={fields.map(({ key }) => label(key)).join('\t')}
          />
          <p className="text-xs text-[var(--text-body)]">{fillTemplate(e.rowsHint, { columns: fields.map(({ key, optional }) => (optional ? `${label(key)} (${e.optional})` : label(key))).join(', ') })}</p>
          {average?.truncated && <Alert variant="info">{e.rowsTruncated}</Alert>}
          {average && average.skipped.length > 0 && <Alert variant="warning">{fillTemplate(e.rowsSkipped, { rows: average.skipped.join(', ') })}</Alert>}
        </TabsContent>
      </Tabs>
    </>
  );

  const results = (
    <>
      {shown && rate !== undefined ? (
        <>
          <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-subtle)] p-4">
            <p className="text-xs font-medium text-[var(--text-muted)]">{mode === 'single' ? e.resultLabel : e.averageLabel}</p>
            <p className="mt-1 text-4xl font-bold tracking-tight tabular-nums text-[var(--text-ink)]" aria-live="polite">{percent(rate)}</p>
            {mode === 'average' && average && <p className="mt-1 text-xs text-[var(--text-body)]">{fillTemplate(e.rowsCount, { count: average.count })}</p>}
            <dl className="mt-3 space-y-1 border-t border-[var(--border-hairline)] pt-3 text-xs">
              <dt className="font-medium text-[var(--text-ink)]">{e.formulaLabel}</dt>
              <dd className="font-mono text-[var(--text-body)] break-words">{formula(shown)}</dd>
              {mode === 'single' && <dd className="font-mono text-[var(--text-muted)] break-words">{numbers(shown)}</dd>}
            </dl>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-[var(--text-ink)]">{e.breakdownHeading}</h3>
            {shown.parts.map((part) => (
              <ProgressBar key={part.key} label={`${label(part.key)} · ${count.format(part.value)}`} value={Math.round(part.share ?? 0)} />
            ))}
          </div>

          <MetricCard
            label={e.ratioLabel}
            value={shown.commentsPer100Likes === null ? e.ratioNone : fillTemplate(e.ratioValue, { value: new Intl.NumberFormat(intl, { maximumFractionDigits: 2 }).format(shown.commentsPer100Likes) })}
            subtext={e.ratioHint}
          />
        </>
      ) : mode === 'single' ? (
        singleMessage()
      ) : (
        <p className="text-sm text-[var(--text-body)]">{fillTemplate(e.rowsHint, { columns: fields.map(({ key }) => label(key)).join(', ') })}</p>
      )}

      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-[var(--text-ink)]">{e.compareHeading}</h3>
        <div className="grid grid-cols-2 gap-3">
          <MetricCard label={e.compareSingle} value={single.ok ? percent(single.result.rate) : e.compareMissing} />
          <MetricCard label={e.compareAverage} value={average?.rate != null ? percent(average.rate) : e.compareMissing} />
        </div>
        <p className="text-xs text-[var(--text-body)]">{e.compareHint}</p>
      </div>
      <p className="text-xs text-[var(--text-muted)]">{e.noBenchmark}</p>
    </>
  );

  return (
    <Tabs value={platform} onValueChange={switchPlatform} className="gap-5">
      <TabsList aria-label={e.platformLabel} className={segmentListClass}>
        {PLATFORMS.map((key) => (
          <TabsTrigger key={key} value={key} className={segmentTriggerClass}>{e[key]}</TabsTrigger>
        ))}
      </TabsList>
      {PLATFORMS.map((key) => (
        <TabsContent key={key} value={key}>
          <ToolWorkspaceLayout workspace={workspace} results={results} />
        </TabsContent>
      ))}
    </Tabs>
  );
}
