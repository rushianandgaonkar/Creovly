/* Hallmark · genre: modern-minimal · macrostructure: Workbench · theme: Cobalt · enrichment: none */
/* Hallmark · pre-emit critique: P5 H5 E5 S5 R5 V5 */
'use client';

import React from 'react';
import Button from '@/components/ui/Button';
import { toolCategories } from '@/config/site';
import HeroProductMockup from './HeroProductMockup';

export default function CreatorHero() {
  const scrollToTools = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('tools');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden border-b border-[var(--border-hairline)] bg-radial-[ellipse_at_50%_15%] from-[var(--brand-accent-soft)]/35 via-transparent to-transparent pt-14 pb-12 sm:pt-20 sm:pb-16">
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Eyebrow Label */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] shadow-2xs text-xs text-[var(--text-muted)] font-mono mb-6 select-none">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
          <span className="tracking-wide">PRE-PUBLISH WORKSPACE</span>
          <span className="text-[var(--border-hairline-strong)]">/</span>
          <span className="text-[var(--text-ink)] font-sans font-medium">YOUTUBE CREATOR TOOLKIT</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-[-0.035em] text-[var(--text-ink)] leading-[1.04] max-w-4xl mx-auto">
          Create smarter.
          <span className="block text-[var(--text-ink)] mt-1">
            Publish better.
          </span>
        </h1>

        {/* Subtitle / Intro */}
        <p className="mt-6 text-base sm:text-lg text-[var(--text-body)] max-w-2xl mx-auto leading-relaxed">
          The focused pre-publish workbench for YouTube creators. Inspect thumbnails, test mobile title truncation, verify Shorts safe zones, and model revenue — 100% locally in your browser.
        </p>

        {/* Primary Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <a
            href="#tools"
            onClick={scrollToTools}
            className="inline-flex items-center justify-center h-11 px-6 rounded-lg bg-[var(--brand-primary)] text-[var(--brand-on-primary)] font-medium text-sm hover:opacity-90 transition-opacity focus-ring shadow-sm"
          >
            Explore 8 Creator Tools ↓
          </a>
          <Button href="/studio" variant="outline" className="h-11 px-6">
            Open Publish Studio →
          </Button>
        </div>

        {/* Architecture & Privacy Guarantees */}
        <div className="mt-10 inline-flex flex-wrap items-center justify-center gap-3 sm:gap-6 px-4 py-2.5 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] text-xs text-[var(--text-body)] shadow-2xs">
          <span className="inline-flex items-center gap-1.5 font-medium text-[var(--text-ink)]">
            <svg className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
            </svg>
            100% Client-side processing
          </span>
          <span className="hidden sm:inline text-[var(--border-hairline-strong)]" aria-hidden="true">•</span>
          <span className="inline-flex items-center gap-1.5">
            <svg className="w-4 h-4 text-[var(--brand-accent)] shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
            </svg>
            Zero sign-up required
          </span>
          <span className="hidden sm:inline text-[var(--border-hairline-strong)]" aria-hidden="true">•</span>
          <span className="inline-flex items-center gap-1.5">
            <svg className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm.75 4.75a.75.75 0 00-1.5 0v5.5a.75.75 0 001.5 0v-5.5zm-.75 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            Media never leaves your browser
          </span>
        </div>
        {/* Interactive Hero Simulator Mockup */}
        <HeroProductMockup />
      </div>

      {/* Category Fast-Jump Bar */}
      <div className="mt-12 pt-6 border-t border-[var(--border-hairline-subtle)] max-w-2xl mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs text-[var(--text-muted)] font-medium mr-1">Direct navigation:</span>
          {toolCategories.map((cat) => (
            <a
              key={cat.id}
              href={`#${cat.id}`}
              className="inline-flex items-center px-3 py-1.5 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] hover:border-[var(--brand-accent)] hover:text-[var(--brand-accent)] transition-colors text-xs font-medium text-[var(--text-ink)] focus-ring"
            >
              {cat.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

