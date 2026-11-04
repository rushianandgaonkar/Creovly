'use client';

import React, { useState } from 'react';
import Wordmark from '@/components/ui/Wordmark';
import Button from '@/components/ui/Button';

export default function LinkToUs() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2500);
    } catch {
      // Fallback if clipboard API is restricted
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2500);
    }
  };

  const snippets = [
    {
      id: 'html-text',
      title: 'Standard HTML Text Link',
      description: 'Best for editorial articles, tutorials, and creator resource directories.',
      code: '<a href="https://creovly.com" target="_blank" rel="noopener">Creovly – Free In-Browser YouTube Creator Tools</a>',
    },
    {
      id: 'html-badge',
      title: 'Branded Dark Badge',
      description: 'Visual badge styled with Creovly identity for sidebars, resource footers, and tools pages.',
      code: '<a href="https://creovly.com" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:6px;padding:6px 12px;background:#171717;color:#ffffff;border-radius:6px;text-decoration:none;font-family:system-ui,-apple-system,sans-serif;font-size:12px;font-weight:600;"><span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#0070f3;"></span>Creovly Creator Tools</a>',
    },
    {
      id: 'markdown',
      title: 'Markdown Link',
      description: 'Quick link for GitHub READMEs, Substack newsletters, and Markdown documentation.',
      code: '[Creovly — Free In-Browser YouTube Creator Tools](https://creovly.com)',
    },
  ];

  return (
    <section className="space-y-6 pt-4" aria-labelledby="link-to-us-heading">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-accent)]" />
          <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]">
            Press & Backlinks
          </span>
        </div>
        <h2 id="link-to-us-heading" className="text-2xl font-bold tracking-tight text-[var(--text-ink)]">
          Link to Creovly
        </h2>
        <p className="text-sm text-[var(--text-body)] max-w-2xl leading-relaxed">
          Writing about YouTube optimization, creator tools, or in-browser workflows? You are welcome to link to Creovly. Use the ready-made copyable HTML snippets and official brand assets below.
        </p>
      </div>

      {/* Official Brand Assets & Logo Showcase */}
      <div className="p-6 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] space-y-4">
        <h3 className="text-sm font-semibold text-[var(--text-ink)] uppercase font-mono tracking-wider">
          Official Logo & Brand Mark
        </h3>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl border border-[var(--border-hairline-subtle)] bg-[var(--bg-canvas)]">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-[var(--bg-canvas-elevated)] border border-[var(--border-hairline)] shadow-2xs">
              <Wordmark size="md" />
            </div>
            <div>
              <div className="text-xs font-semibold text-[var(--text-ink)]">Creovly Wordmark & Aperture Mark</div>
              <div className="text-[11px] font-mono text-[var(--text-muted)]">Vector SVG &bull; Modern-Minimal Canvas</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/favicon.svg"
              download="creovly-logo.svg"
              className="text-xs font-mono font-medium px-3 py-1.5 rounded-md border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] hover:text-[var(--brand-accent)] hover:border-[var(--brand-accent)] transition-colors focus-ring"
            >
              Download SVG
            </a>
            <a
              href="/apple-touch-icon.png"
              download="creovly-mark.png"
              className="text-xs font-mono font-medium px-3 py-1.5 rounded-md border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] hover:text-[var(--brand-accent)] hover:border-[var(--brand-accent)] transition-colors focus-ring"
            >
              Download PNG
            </a>
          </div>
        </div>
      </div>

      {/* Snippets List */}
      <div className="space-y-4">
        {snippets.map((snippet) => (
          <div
            key={snippet.id}
            className="p-5 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h4 className="text-sm font-semibold text-[var(--text-ink)]">
                  {snippet.title}
                </h4>
                <p className="text-xs text-[var(--text-muted)]">
                  {snippet.description}
                </p>
              </div>
              <Button
                type="button"
                variant={copiedKey === snippet.id ? 'primary' : 'outline'}
                size="sm"
                className="shrink-0 text-xs font-mono"
                onClick={() => copyToClipboard(snippet.code, snippet.id)}
              >
                {copiedKey === snippet.id ? '✓ Copied to Clipboard' : 'Copy Snippet'}
              </Button>
            </div>

            <pre className="p-3 rounded-lg bg-[var(--bg-canvas-subtle)] border border-[var(--border-hairline-subtle)] text-[11px] font-mono text-[var(--text-ink)] overflow-x-auto whitespace-pre-wrap break-all select-all">
              <code>{snippet.code}</code>
            </pre>
          </div>
        ))}
      </div>
    </section>
  );
}

