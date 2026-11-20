'use client';

import { useMemo, useState } from 'react';
import Textarea from '@/components/form/Textarea';
import Toggle from '@/components/form/Toggle';
import Button from '@/components/ui/Button';
import ToolWorkspaceLayout from './ToolWorkspaceLayout';
import { generateHashtags, DEFAULT_MAX_HASHTAGS } from '@/lib/hashtags';

const EXAMPLE = 'home workout, workout for beginners\nno equipment, fitness';

export default function HashtagGenerator() {
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
      if (next.has(tag)) next.delete(tag); else next.add(tag);
      return next;
    });
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setStatus(`Copied ${selected.length} hashtag${selected.length === 1 ? '' : 's'}.`);
    } catch {
      setStatus('Copy failed. Select the text and copy it manually.');
    }
  };

  return (
    <ToolWorkspaceLayout
      workspace={
        <div className="space-y-6">
          <Textarea
            id="hashtag-topic"
            label="Video topic and keywords"
            hint="Separate with commas or new lines"
            rows={5}
            placeholder="e.g. home workout, workout for beginners"
            value={text}
            onChange={(event) => { setText(event.target.value); setRemoved(new Set()); setStatus(''); }}
          />
          <Toggle
            id="hashtag-shorts"
            label="Add #Shorts"
            hint="Optional. It does not change how YouTube classifies the video."
            checked={shorts}
            onCheckedChange={(value) => { setShorts(value); setStatus(''); }}
          />
          <div className="flex flex-wrap gap-3 pt-4 border-t border-[var(--border-hairline-subtle)]">
            <Button type="button" variant="outline" size="sm" onClick={() => { setText(EXAMPLE); setRemoved(new Set()); setStatus(''); }}>
              Load example
            </Button>
            <Button type="button" variant="ghost" size="sm" onClick={() => { setText(''); setRemoved(new Set()); setStatus(''); }}>
              Clear
            </Button>
          </div>
        </div>
      }
      results={
        result.hashtags.length ? (
          <div className="space-y-5">
            <div className="flex items-baseline justify-between gap-3">
              <h2 className="text-sm font-semibold text-[var(--text-ink)]">Your hashtags</h2>
              <span className="font-mono text-xs text-[var(--text-muted)]">{selected.length} / {DEFAULT_MAX_HASHTAGS}</span>
            </div>
            <p className="text-xs text-[var(--text-body)]">Select a hashtag to leave it out.</p>
            <ul className="flex flex-wrap gap-2" aria-label="Generated hashtags">
              {result.hashtags.map((tag) => {
                const on = !removed.has(tag);
                return (
                  <li key={tag}>
                    <button
                      type="button"
                      aria-pressed={on}
                      onClick={() => toggle(tag)}
                      className={`rounded-full border px-3 py-1.5 text-sm font-medium transition duration-150 active:scale-[0.97] focus-ring ${on
                        ? 'border-[var(--brand-accent)] bg-[var(--brand-accent-soft)] text-[var(--brand-accent-deep)]'
                        : 'border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] text-[var(--text-muted)] line-through hover:border-[var(--border-hairline-strong)]'}`}
                    >
                      {tag}
                    </button>
                  </li>
                );
              })}
            </ul>
            {result.dropped > 0 && (
              <p className="text-xs text-[var(--text-muted)]">{result.dropped} more were left out to keep the list at {DEFAULT_MAX_HASHTAGS}.</p>
            )}
            <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-inset)] p-3">
              <p className="font-mono text-xs text-[var(--text-ink)] break-words">{output || 'No hashtags selected.'}</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button type="button" onClick={copy} disabled={!selected.length}>Copy hashtags</Button>
              <p role="status" className="text-xs text-[var(--text-muted)]">{status}</p>
            </div>
            <p className="text-xs text-[var(--text-body)] leading-relaxed">
              Paste them at the end of your description. Up to three can show by your title.
            </p>
          </div>
        ) : (
          <p className="py-16 text-center text-xs text-[var(--text-muted)]">Type a topic to see hashtags.</p>
        )
      }
    />
  );
}
