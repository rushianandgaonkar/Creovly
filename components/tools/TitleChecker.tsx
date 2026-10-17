/* Hallmark · genre: modern-minimal · macrostructure: Workbench */
'use client';

import { useEffect, useRef, useState } from 'react';
import Input from '@/components/form/Input';
import Slider from '@/components/form/Slider';
import Button from '@/components/ui/Button';
import Alert from '@/components/feedback/Alert';
import MetricCard from '@/components/results/MetricCard';
import ResultSummaryPanel from '@/components/results/ResultSummaryPanel';
import ToolWorkspaceLayout from './ToolWorkspaceLayout';
import { analyzeTitle } from '@/lib/title-analysis';

function lengthFeedback(length: number) {
  const remaining = 100 - length;
  if (remaining < 0) {
    return {
      tone: 'error' as const,
      message: `${-remaining} char${remaining === -1 ? '' : 's'} over 100-limit`,
      percentage: 100,
    };
  }
  if (remaining === 0) {
    return {
      tone: 'warning' as const,
      message: 'At 100-character ceiling',
      percentage: 100,
    };
  }
  const percentage = Math.min(100, (length / 100) * 100);
  return {
    tone: length >= 90 ? ('warning' as const) : ('success' as const),
    message: `${remaining} char${remaining === 1 ? '' : 's'} remaining`,
    percentage,
  };
}

const viewportPresets = [
  { label: 'Mobile (320px)', width: 320 },
  { label: 'Tablet (400px)', width: 400 },
  { label: 'Desktop (480px)', width: 480 },
];

export default function TitleChecker() {
  const [title, setTitle] = useState('');
  const [keyword, setKeyword] = useState('');
  const [width, setWidth] = useState(360);
  const [result, setResult] = useState<ReturnType<typeof analyzeTitle>>();
  const [error, setError] = useState('');
  const errorRef = useRef<HTMLDivElement>(null);

  const draftFeedback = lengthFeedback(title.length);
  const resultFeedback = result ? lengthFeedback(result.length) : undefined;

  useEffect(() => {
    if (error) errorRef.current?.focus();
  }, [error]);

  const clear = () => {
    setResult(undefined);
    setError('');
  };

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    clear();
    try {
      setResult(analyzeTitle(title, keyword));
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Please check your title input.');
    }
  };

  const resetAll = () => {
    clear();
    setTitle('');
    setKeyword('');
    setWidth(360);
  };

  return (
    <ToolWorkspaceLayout
      workspace={
        <form noValidate className="space-y-6" onSubmit={handleCheck}>
          <div className="space-y-2">
            <Input
              id="draft-title"
              label="Draft YouTube Video Title"
              value={title}
              maxLength={200}
              placeholder="e.g. 10 Mistakes Every Creator Makes in 2026"
              onChange={(event) => {
                clear();
                setTitle(event.target.value);
              }}
            />

            {/* Character meter bar */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-xs font-mono">
                <span
                  style={{
                    color: title.length
                      ? `var(--state-${draftFeedback.tone}-text)`
                      : 'var(--text-muted)',
                  }}
                  className="font-semibold"
                >
                  {title.length} / 100 units
                  {title.length > 0 && ` · ${draftFeedback.message}`}
                </span>
                <span className="text-[10px] text-[var(--text-muted)]">
                  {title.length >= 40 && title.length <= 70 ? '🎯 Ideal Sweet Spot' : 'YouTube Max: 100'}
                </span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-[var(--bg-canvas-subtle)] border border-[var(--border-hairline)] overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 rounded-full ${
                    draftFeedback.tone === 'error'
                      ? 'bg-rose-500'
                      : draftFeedback.tone === 'warning'
                      ? 'bg-amber-500'
                      : 'bg-[var(--brand-accent)]'
                  }`}
                  style={{ width: `${draftFeedback.percentage}%` }}
                />
              </div>
            </div>
          </div>

          <Input
            id="title-keyword"
            label="Key Topic / Search Phrase (Optional)"
            value={keyword}
            maxLength={100}
            placeholder="e.g. Creator Mistakes"
            onChange={(event) => {
              clear();
              setKeyword(event.target.value);
            }}
          />

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="title-preview-width" className="text-xs font-medium text-[var(--text-ink)]">
                Feed Preview Container Width
              </label>
              <div className="flex items-center gap-1">
                {viewportPresets.map((preset) => (
                  <button
                    key={preset.width}
                    type="button"
                    onClick={() => setWidth(preset.width)}
                    className={`px-2 py-0.5 rounded text-[10px] font-mono border transition-all ${
                      width === preset.width
                        ? 'border-[var(--brand-accent)] bg-[var(--brand-accent-soft)] text-[var(--brand-accent-deep)] font-semibold'
                        : 'border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] text-[var(--text-muted)]'
                    }`}
                  >
                    {preset.label.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>
            <Slider
              id="title-preview-width"
              label="Interactive Width Slider"
              min={240}
              max={480}
              value={width}
              unit=" px"
              onChange={setWidth}
            />
          </div>

          <div ref={errorRef} tabIndex={-1} className="rounded focus-ring">
            {error && (
              <Alert variant="error" title="Check your title">
                {error}
              </Alert>
            )}
          </div>

          <div className="flex flex-wrap justify-between items-center gap-3 pt-4 border-t border-[var(--border-hairline-subtle)]">
            <Button type="button" variant="outline" size="sm" onClick={resetAll}>
              Reset
            </Button>
            <Button type="submit" disabled={!title.trim()}>
              Check Title Heuristics
            </Button>
          </div>

          <p className="text-xs text-[var(--text-muted)]">
            Instant client-side heuristic audit. No remote AI hallucinations or fabricated rank predictions.
          </p>
        </form>
      }
      results={
        <>
          {title.trim() ? (
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="font-semibold text-[var(--text-ink)]">
                    Simulated YouTube Video Card
                  </span>
                  <span className="text-[var(--text-muted)]">{width}px Feed Width</span>
                </div>

                <div
                  style={{ width, maxWidth: '100%' }}
                  className="rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] overflow-hidden shadow-[var(--shadow-floating)] transition-all"
                >
                  {/* Simulated 16:9 Thumbnail Header */}
                  <div className="relative aspect-video w-full bg-[var(--bg-canvas-subtle)] flex items-center justify-center border-b border-[var(--border-hairline-subtle)]">
                    <span className="text-[11px] font-mono text-[var(--text-muted)] flex items-center gap-1.5">
                      <svg
                        className="w-4 h-4 text-[var(--text-faint)]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      16:9 Thumbnail Preview
                    </span>
                    <span className="absolute bottom-2 right-2 bg-black/85 text-white text-[10px] font-mono px-1.5 py-0.5 rounded font-medium">
                      12:45
                    </span>
                  </div>

                  {/* Feed Metadata Card */}
                  <div className="p-3.5 flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-[var(--brand-accent)] text-white font-mono text-xs font-bold flex items-center justify-center shrink-0">
                      YT
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-[var(--text-ink)] line-clamp-2 leading-snug break-words">
                        {title}
                      </p>
                      <p className="mt-1 text-xs text-[var(--text-muted)] flex items-center gap-1">
                        <span>Creator Channel</span>
                        <span>•</span>
                        <span>124K views</span>
                        <span>•</span>
                        <span>3 days ago</span>
                      </p>
                    </div>
                  </div>
                </div>

                <p className="mt-2 text-[11px] text-[var(--text-muted)] leading-relaxed">
                  Line wrapping varies by device screen density and platform layout. Titles above 70 characters often truncate with ellipsis on mobile search feeds.
                </p>
              </div>

              {result && (
                <ResultSummaryPanel
                  embedded
                  key={`${title}:${keyword}`}
                  title="Heuristic Title Audit"
                  badge="Verified Rules"
                  canCopy
                  onCopy={async () => {
                    await navigator.clipboard.writeText(
                      [
                        `Title: ${title}`,
                        `Length: ${result.length} / 100 units`,
                        `Words: ${result.words}`,
                        ...result.notes.map((n) => `• ${n}`),
                      ].join('\n')
                    );
                  }}
                >
                  <div className="grid grid-cols-2 gap-3">
                    <MetricCard
                      label="Length (Units)"
                      value={`${result.length} / 100`}
                      tone={resultFeedback?.tone}
                      subtext={resultFeedback?.message}
                    />
                    <MetricCard
                      label="Word Count"
                      value={String(result.words)}
                      subtext="Words in title"
                    />
                  </div>

                  <div className="p-3.5 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-subtle)] space-y-2">
                    <span className="text-xs font-mono font-medium text-[var(--text-ink)] block">
                      Editorial Heuristics
                    </span>
                    <ul className="space-y-1.5 text-xs text-[var(--text-body)]">
                      {result.notes.map((note) => (
                        <li key={note} className="flex items-start gap-2">
                          <span className="text-[var(--brand-accent)] shrink-0 font-bold">✓</span>
                          <span>{note}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </ResultSummaryPanel>
              )}
            </div>
          ) : (
            <div className="py-16 text-center text-xs text-[var(--text-muted)] font-mono">
              Type a draft title to inspect live wrapping and character limits.
            </div>
          )}
        </>
      }
    />
  );
}
