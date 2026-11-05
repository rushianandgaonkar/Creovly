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
      description:
        'Recommended for editorial articles, tutorials, and creator resource directories. Standard voluntary links remain unqualified.',
      code: '<a href="https://creovly.com" target="_blank" rel="noopener">Creovly</a>',
    },
    {
      id: 'markdown',
      title: 'Markdown Link',
      description:
        'Standard voluntary markdown link for GitHub READMEs, Substack newsletters, and creator documentation.',
      code: '[Creovly](https://creovly.com)',
    },
    {
      id: 'html-badge',
      title: 'Branded Dark Badge',
      description:
        'Visual badge styled with Creovly identity for creator toolkits, curated tool roundups, and standalone resource pages. Distributed embeds include rel="nofollow" per search engine guidelines. Never place as a sitewide footer embed.',
      code: '<a href="https://creovly.com" target="_blank" rel="nofollow noopener" style="display:inline-flex;align-items:center;gap:6px;padding:6px 12px;background:#171717;color:#ffffff;border-radius:6px;text-decoration:none;font-family:system-ui,-apple-system,sans-serif;font-size:12px;font-weight:600;"><span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#0070f3;"></span>Creovly</a>',
    },
  ];

  return (
    <section id="media-kit" className="space-y-6 pt-4 scroll-mt-20" aria-labelledby="media-kit-heading">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-accent)]" />
          <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]">
            Media Kit &amp; Brand Assets
          </span>
        </div>
        <h2 id="media-kit-heading" className="text-2xl font-bold tracking-tight text-[var(--text-ink)]">
          Media Kit &amp; Brand Assets
        </h2>
        <p className="text-sm text-[var(--text-body)] max-w-2xl leading-relaxed">
          Writing about Creovly, YouTube optimization, or creator tools? You are welcome to reference Creovly, link to our platform, and use our official brand marks. Below you will find vector logos, voluntary editorial linking snippets, and usage guidelines.
        </p>
      </div>

      {/* Voluntary Attribution & Policy Notice */}
      <div className="p-4 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-subtle)] space-y-1.5 text-xs text-[var(--text-body)]">
        <div className="flex items-center gap-2 font-semibold text-[var(--text-ink)]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
          <span>Voluntary &amp; Independent Attribution Notice</span>
        </div>
        <p className="leading-relaxed">
          Linking to Creovly is completely optional and voluntary. Creovly never requires, requests, or solicits links, and we never participate in paid link placements, private link networks, or reciprocal link exchanges. Creators and publications are free to cite Creovly at their sole discretion.
        </p>
      </div>

      {/* Official Brand Assets & Logo Showcase */}
      <div className="p-6 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-[var(--text-ink)] uppercase font-mono tracking-wider">
            Official Logo &amp; Brand Mark
          </h3>
          <span className="text-[11px] font-mono text-[var(--text-muted)]">Vector &amp; High-Res</span>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl border border-[var(--border-hairline-subtle)] bg-[var(--bg-canvas)]">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-[var(--bg-canvas-elevated)] border border-[var(--border-hairline)] shadow-2xs">
              <Wordmark size="md" />
            </div>
            <div>
              <div className="text-xs font-semibold text-[var(--text-ink)]">Creovly Wordmark &amp; Aperture Mark</div>
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

// Alias for backwards compatibility
export { LinkToUs as MediaKit };
