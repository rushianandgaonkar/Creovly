'use client';

import { useState } from 'react';
import Textarea from '@/components/form/Textarea';
import NumberInput from '@/components/form/NumberInput';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import ToolWorkspaceLayout from './ToolWorkspaceLayout';
import { segmentListClass, segmentTriggerClass } from './YouTubeLinkGenerator';
import { useI18n, LocalizedLink } from '@/lib/i18n';
import { fillTemplate } from '@/lib/utils';
import {
  PACES,
  countCharacters,
  countForDuration,
  countParagraphs,
  countWords,
  detectUnit,
  formatDuration,
  speakingSeconds,
  type CountUnit,
  type PaceKey,
} from '@/lib/script-length';

const chipClass = (active: boolean) =>
  `rounded-lg border px-3 py-2 text-left text-xs focus-ring ${
    active
      ? 'border-[var(--brand-accent)] bg-[var(--bg-canvas-elevated)] text-[var(--text-ink)]'
      : 'border-[var(--border-hairline)] bg-[var(--bg-canvas-subtle)] text-[var(--text-muted)] hover:text-[var(--text-ink)]'
  }`;

export default function ScriptLengthCalculator() {
  const { t, locale } = useI18n();
  const s = t.scriptLength;
  const [mode, setMode] = useState('text');
  const [text, setText] = useState('');
  const [manualCount, setManualCount] = useState('');
  const [unitChoice, setUnitChoice] = useState<CountUnit | null>(null);
  const [pace, setPace] = useState<PaceKey | 'custom'>('average');
  const [customRate, setCustomRate] = useState('150');
  const [pause, setPause] = useState('0');
  const [target, setTarget] = useState('10');

  const defaultUnit: CountUnit = mode === 'text' && text.trim() ? detectUnit(text) : locale === 'ja' || locale === 'ko' ? 'characters' : 'words';
  const unit = unitChoice ?? defaultUnit;
  const paces = PACES[unit];
  const activePace = pace !== 'custom' && !(pace in paces) ? 'average' : pace;
  const rate = activePace === 'custom' ? Math.max(Number(customRate) || 0, 0) : (paces[activePace] as number);

  const words = countWords(text);
  const characters = countCharacters(text);
  const paragraphs = mode === 'text' ? countParagraphs(text) : 0;
  const count = mode === 'text' ? (unit === 'words' ? words : characters) : Math.max(Math.floor(Number(manualCount) || 0), 0);
  const pauseSeconds = Math.min(Math.max(Number(pause) || 0, 0), 30);
  const seconds = speakingSeconds(count, rate, paragraphs, pauseSeconds);
  const targetSeconds = Math.max(Number(target) || 0, 0) * 60;
  const needed = countForDuration(targetSeconds, rate);
  const unitLabel = unit === 'words' ? s.unitWords : s.unitCharacters;

  const paceLabels: Record<PaceKey, string> = { slow: s.paceSlow, average: s.paceAverage, fast: s.paceFast, reading: s.paceReading };
  const paceKeys = Object.keys(paces) as PaceKey[];

  return (
    <ToolWorkspaceLayout
      workspace={
        <>
          <Tabs value={mode} onValueChange={setMode} className="gap-4">
            <TabsList aria-label={s.modeLabel} className={segmentListClass}>
              <TabsTrigger value="text" className={segmentTriggerClass}>{s.modeText}</TabsTrigger>
              <TabsTrigger value="count" className={segmentTriggerClass}>{s.modeCount}</TabsTrigger>
            </TabsList>
            <TabsContent value="text">
              <Textarea
                id="script-text"
                label={s.textLabel}
                placeholder={s.textPlaceholder}
                rows={10}
                value={text}
                onChange={(event) => setText(event.target.value)}
                hint={s.textHint}
              />
            </TabsContent>
            <TabsContent value="count">
              <NumberInput
                id="script-count"
                label={s.countLabel}
                min={0}
                step={10}
                value={manualCount}
                placeholder="1500"
                onChange={(event) => setManualCount(event.target.value)}
              />
            </TabsContent>
          </Tabs>

          <fieldset className="space-y-2">
            <legend className="text-xs font-medium text-[var(--text-ink)]">{s.unitLabel}</legend>
            <div className="inline-flex rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-subtle)] p-1">
              {(['words', 'characters'] as const).map((value) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={unit === value}
                  onClick={() => setUnitChoice(value)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium focus-ring ${
                    unit === value ? 'bg-[var(--bg-canvas-elevated)] text-[var(--text-ink)] shadow-xs' : 'text-[var(--text-muted)]'
                  }`}
                >
                  {value === 'words' ? s.unitWords : s.unitCharacters}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-[var(--text-muted)]">{s.unitHint}</p>
          </fieldset>

          <fieldset className="space-y-2">
            <legend className="text-xs font-medium text-[var(--text-ink)]">{s.paceLabel}</legend>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {paceKeys.map((key) => (
                <button key={key} type="button" aria-pressed={activePace === key} onClick={() => setPace(key)} className={chipClass(activePace === key)}>
                  <span className="block font-semibold">{paceLabels[key]}</span>
                  <span className="font-mono">{fillTemplate(s.perMinute, { rate: paces[key] as number, unit: unitLabel })}</span>
                </button>
              ))}
              <button type="button" aria-pressed={activePace === 'custom'} onClick={() => setPace('custom')} className={chipClass(activePace === 'custom')}>
                <span className="block font-semibold">{s.paceCustom}</span>
                <span className="font-mono">{fillTemplate(s.perMinute, { rate: Number(customRate) || 0, unit: unitLabel })}</span>
              </button>
            </div>
            {activePace === 'custom' && (
              <NumberInput
                id="script-rate"
                label={fillTemplate(s.customRateLabel, { unit: unitLabel })}
                min={1}
                max={1000}
                value={customRate}
                onChange={(event) => setCustomRate(event.target.value)}
              />
            )}
            <p className="text-[11px] text-[var(--text-muted)]">{s.paceHint}</p>
          </fieldset>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {mode === 'text' && (
              <NumberInput
                id="script-pause"
                label={s.pauseLabel}
                min={0}
                max={30}
                step={0.5}
                suffix="s"
                value={pause}
                onChange={(event) => setPause(event.target.value)}
                hint={s.pauseHint}
              />
            )}
            <NumberInput
              id="script-target"
              label={s.targetLabel}
              min={0}
              step={1}
              suffix="min"
              value={target}
              onChange={(event) => setTarget(event.target.value)}
            />
          </div>
        </>
      }
      results={
        <div className="space-y-5">
          <div>
            <p className="text-xs font-medium text-[var(--text-muted)]">{s.resultLabel}</p>
            <p className="text-4xl font-bold tracking-tight text-[var(--text-ink)] font-mono" aria-live="polite">{formatDuration(seconds)}</p>
            <p className="text-xs text-[var(--text-body)]">
              {fillTemplate(s.resultDetail, { count: count.toLocaleString(locale), unit: unitLabel, rate })}
            </p>
          </div>

          {mode === 'text' && (
            <dl className="grid grid-cols-3 gap-2 text-center">
              {[
                [s.statWords, words],
                [s.statCharacters, characters],
                [s.statParagraphs, paragraphs],
              ].map(([label, value]) => (
                <div key={label as string} className="rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-canvas-subtle)] p-2">
                  <dt className="text-[11px] text-[var(--text-muted)]">{label}</dt>
                  <dd className="font-mono text-sm font-semibold text-[var(--text-ink)]">{Number(value).toLocaleString(locale)}</dd>
                </div>
              ))}
            </dl>
          )}

          <section aria-labelledby="script-paces" className="space-y-2">
            <h3 id="script-paces" className="text-xs font-medium text-[var(--text-ink)]">{s.compareHeading}</h3>
            <table className="w-full text-xs">
              <tbody className="divide-y divide-[var(--border-hairline)]">
                {paceKeys.map((key) => (
                  <tr key={key}>
                    <th scope="row" className="py-1.5 pr-2 text-left font-normal text-[var(--text-body)]">
                      {paceLabels[key]} <span className="font-mono text-[var(--text-muted)]">({paces[key]})</span>
                    </th>
                    <td className="py-1.5 text-right font-mono text-[var(--text-ink)]">
                      {formatDuration(speakingSeconds(count, paces[key] as number, paragraphs, pauseSeconds))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {needed > 0 && rate > 0 && (
            <p className="rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-canvas-subtle)] p-3 text-sm text-[var(--text-ink)]">
              {fillTemplate(s.targetResult, { minutes: Number(target), count: needed.toLocaleString(locale), unit: unitLabel })}
            </p>
          )}

          <p className="text-xs text-[var(--text-body)]">
            {s.nextStep}{' '}
            <LocalizedLink href="/tools/youtube-timestamp-generator" className="font-medium text-[var(--brand-accent-deep)] underline hover:no-underline">
              {s.nextStepLink}
            </LocalizedLink>
          </p>
        </div>
      }
    />
  );
}
