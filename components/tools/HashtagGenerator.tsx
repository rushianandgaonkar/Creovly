'use client';

import { useMemo, useState } from 'react';
import Textarea from '@/components/form/Textarea';
import Toggle from '@/components/form/Toggle';
import Button from '@/components/ui/Button';
import ToolWorkspaceLayout from './ToolWorkspaceLayout';
import { generateHashtags, DEFAULT_MAX_HASHTAGS } from '@/lib/hashtags';
import { useI18n } from '@/lib/i18n';

export default function HashtagGenerator() {
  const { t } = useI18n();
  const [text, setText] = useState('');
  const [shorts, setShorts] = useState(false);
  const [removed, setRemoved] = useState<Set<string>>(new Set());
  const [status, setStatus] = useState('');

  const result = useMemo(() => generateHashtags(text, { shorts }), [text, shorts]);
  const selected = result.hashtags.filter((tag) => !removed.has(tag));
  const output = selected.join(' ');

  const toggle = (tag: string) => {
    setStatus('');
    setRemoved((current) => {
      const next = new Set(current);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });
  };

  const copy = async () => {
    if (!selected.length) {
      setStatus(t.hashtagGenerator.emptySelection);
      return;
    }
    try {
      await navigator.clipboard.writeText(output);
      setStatus(
        selected.length === 1
          ? t.hashtagGenerator.copiedSingular
          : t.hashtagGenerator.copiedPlural.replace('{count}', String(selected.length))
      );
    } catch {
      setStatus(t.hashtagGenerator.copyFailed);
    }
  };

  return (
    <ToolWorkspaceLayout
      workspace={
        <div className="space-y-6">
          <Textarea
            id="hashtag-topic"
            label={t.hashtagGenerator.topicLabel}
            hint={t.hashtagGenerator.topicHint}
            rows={5}
            placeholder={t.hashtagGenerator.topicPlaceholder}
            value={text}
            onChange={(event) => {
              setText(event.target.value);
              setRemoved(new Set());
              setStatus('');
            }}
          />
          <Toggle
            id="hashtag-shorts"
            label={t.hashtagGenerator.shortsLabel}
            hint={t.hashtagGenerator.shortsHint}
            checked={shorts}
            onCheckedChange={(value) => {
              setShorts(value);
              setStatus('');
            }}
          />
          <div className="flex flex-wrap gap-3 pt-4 border-t border-[var(--border-hairline-subtle)]">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                setText(t.hashtagGenerator.exampleText);
                setRemoved(new Set());
                setStatus('');
              }}
            >
              {t.hashtagGenerator.loadExample}
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                setText('');
                setRemoved(new Set());
                setStatus('');
              }}
            >
              {t.hashtagGenerator.clear}
            </Button>
          </div>
        </div>
      }
      results={
        result.hashtags.length ? (
          <div className="space-y-5">
            <div className="flex items-baseline justify-between gap-3">
              <h2 className="text-sm font-semibold text-[var(--text-ink)]">
                {t.hashtagGenerator.resultsHeading}
              </h2>
              <span className="font-mono text-xs text-[var(--text-muted)]">
                {selected.length} / {DEFAULT_MAX_HASHTAGS}
              </span>
            </div>
            <p className="text-xs text-[var(--text-body)]">{t.hashtagGenerator.selectTip}</p>
            <ul className="flex flex-wrap gap-2" aria-label={t.hashtagGenerator.listAria}>
              {result.hashtags.map((tag) => {
                const on = !removed.has(tag);
                return (
                  <li key={tag}>
                    <button
                      type="button"
                      aria-pressed={on}
                      onClick={() => toggle(tag)}
                      className={`rounded-full border px-3 py-1.5 text-sm font-medium transition duration-150 active:scale-[0.97] focus-ring ${
                        on
                          ? 'border-[var(--brand-accent)] bg-[var(--brand-accent-soft)] text-[var(--brand-accent-deep)]'
                          : 'border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] text-[var(--text-muted)] line-through hover:border-[var(--border-hairline-strong)]'
                      }`}
                    >
                      {tag}
                    </button>
                  </li>
                );
              })}
            </ul>
            {result.dropped > 0 && (
              <p className="text-xs text-[var(--text-muted)]">
                {t.hashtagGenerator.droppedCount
                  .replace('{count}', String(result.dropped))
                  .replace('{max}', String(DEFAULT_MAX_HASHTAGS))}
              </p>
            )}
            <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-inset)] p-3">
              <p className="font-mono text-xs text-[var(--text-ink)] break-words">
                {output || t.hashtagGenerator.emptySelection}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-[var(--border-hairline-subtle)]">
              <Button type="button" onClick={copy} disabled={!selected.length}>
                {t.hashtagGenerator.copyButton}
              </Button>
              {status && (
                <span role="status" className="text-xs text-[var(--text-body)]">
                  {status}
                </span>
              )}
            </div>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              {t.hashtagGenerator.pasteAdvice}
            </p>
          </div>
        ) : (
          <p className="py-16 text-center text-xs text-[var(--text-muted)]">
            {t.hashtagGenerator.emptyState}
          </p>
        )
      }
    />
  );
}
