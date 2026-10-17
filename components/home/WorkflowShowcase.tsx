'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';

interface WorkflowStep {
  id: string;
  number: string;
  tag: string;
  title: string;
  description: string;
  highlights: string[];
  toolLink: string;
  toolLabel: string;
}

const steps: WorkflowStep[] = [
  {
    id: 'visuals',
    number: '01',
    tag: 'VISUAL AUDIT',
    title: 'Verify thumbnail specs & eliminate UI overlap',
    description:
      'Never lose CTR to an obscured title or an oversized payload. Validate 1280×720 HD resolution, compress under the 2MB YouTube upload ceiling, and keep critical focal points out of the bottom-right timestamp zone.',
    highlights: [
      'Automatic 1280×720 HD aspect ratio verification',
      'Client-side JPEG/WebP compression below 2 MB',
      'Timestamp & Shorts mobile UI danger-zone clearance',
    ],
    toolLink: '/tools/youtube-thumbnail-compressor',
    toolLabel: 'Explore Thumbnail Compressor',
  },
  {
    id: 'metadata',
    number: '02',
    tag: 'METADATA ENGINE',
    title: 'Stress-test titles against mobile truncation',
    description:
      'Over 70% of YouTube views originate on smartphones. Check where mobile home feeds truncate titles behind ellipses, calibrate keyword placement, and ensure your core emotional hook lands in the first 50 characters.',
    highlights: [
      'Real-time ~50 character mobile feed boundary alert',
      'Desktop search vs. smartphone feed preview',
      'Actionable length scoring with zero cloud tracking',
    ],
    toolLink: '/tools/youtube-title-checker',
    toolLabel: 'Explore Title Checker',
  },
  {
    id: 'package',
    number: '03',
    tag: 'ZERO-CLOUD PACKAGING',
    title: 'Consolidate assets into an upload-ready ZIP',
    description:
      'Publish Studio brings title drafts, description formatting, prepared thumbnails, and an 11-point readiness checklist into a unified local workspace. Export everything as a structured ZIP archive ready for YouTube Studio.',
    highlights: [
      '11-point automated and manual upload checks',
      'Local draft saving directly in browser memory',
      'Single-click complete project package (.zip) export',
    ],
    toolLink: '/studio',
    toolLabel: 'Open Publish Studio',
  },
];

export default function WorkflowShowcase() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeStep = steps[activeStepIndex];

  return (
    <section
      aria-label="How Creovly prepares your YouTube upload"
      className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20 border-t border-[var(--border-hairline)]"
    >
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-canvas-subtle)] text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] font-semibold select-none">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-accent)]" />
          The Pre-Publish Workflow
        </div>
        <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[var(--text-ink)]">
          From rough draft to publish-ready in 3 steps
        </h2>
        <p className="text-sm sm:text-base text-[var(--text-body)] leading-relaxed">
          The systematic pre-flight process elite YouTube creators use before hitting Publish.
        </p>
      </div>

      {/* Step Selector Tabs (Top on Mobile, Sidebar on Desktop) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Step Navigation Cards */}
        <div className="lg:col-span-5 space-y-3" role="tablist" aria-label="Workflow steps">
          {steps.map((step, idx) => {
            const isActive = activeStepIndex === idx;
            return (
              <button
                key={step.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveStepIndex(idx)}
                className={`w-full text-left p-5 rounded-xl border transition-all duration-200 focus-ring ${
                  isActive
                    ? 'border-[var(--brand-accent)] bg-[var(--bg-canvas-elevated)] shadow-sm'
                    : 'border-[var(--border-hairline)] bg-[var(--bg-canvas-subtle)]/60 hover:bg-[var(--bg-canvas-elevated)] hover:border-[var(--border-hairline-strong)]'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span
                    className={`text-xs font-mono font-bold tracking-wider ${
                      isActive ? 'text-[var(--brand-accent)]' : 'text-[var(--text-muted)]'
                    }`}
                  >
                    STEP {step.number} • {step.tag}
                  </span>
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-[var(--brand-accent)] animate-pulse" />
                  )}
                </div>
                <h3
                  className={`text-base font-semibold tracking-tight transition-colors ${
                    isActive ? 'text-[var(--text-ink)]' : 'text-[var(--text-body)]'
                  }`}
                >
                  {step.title}
                </h3>
              </button>
            );
          })}
        </div>

        {/* Dynamic Interactive Preview Panel */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl border border-[var(--border-hairline-strong)] bg-[var(--bg-canvas-elevated)] p-6 sm:p-8 shadow-[var(--shadow-floating)] space-y-6">
            {/* Step Header */}
            <div className="space-y-2 border-b border-[var(--border-hairline)] pb-5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-mono uppercase tracking-wider text-[var(--brand-accent)] font-semibold">
                  Stage {activeStep.number} &mdash; {activeStep.tag}
                </span>
                <span className="text-xs font-mono text-[var(--text-muted)]">100% Client-Side</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--text-ink)]">
                {activeStep.title}
              </h3>
              <p className="text-sm text-[var(--text-body)] leading-relaxed">
                {activeStep.description}
              </p>
            </div>

            {/* Interactive Visual Graphic for Current Step */}
            <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-subtle)] p-5 space-y-4">
              {activeStepIndex === 0 && (
                /* Step 1 Graphic: Thumbnail Comparison & Checks */
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3.5 rounded-lg border border-red-200 dark:border-red-950/80 bg-red-50/50 dark:bg-red-950/20 space-y-1.5">
                      <div className="flex items-center justify-between text-red-700 dark:text-red-400 font-semibold font-mono">
                        <span>BEFORE OPTIMIZATION</span>
                        <span>⚠️ 4.2 MB</span>
                      </div>
                      <p className="text-[11px] text-[var(--text-body)]">
                        Exceeds YouTube 2MB limit. Reject on upload. Key title words hidden behind timestamp badge.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-lg border border-emerald-200 dark:border-emerald-950/80 bg-emerald-50/50 dark:bg-emerald-950/20 space-y-1.5">
                      <div className="flex items-center justify-between text-emerald-700 dark:text-emerald-400 font-semibold font-mono">
                        <span>CREOVLY VERIFIED</span>
                        <span>✓ 1.2 MB</span>
                      </div>
                      <p className="text-[11px] text-[var(--text-body)]">
                        1280×720 HD resolution verified. 71% file size reduction. Clean safe zones confirmed.
                      </p>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] flex items-center justify-between text-xs font-mono">
                    <span className="text-[var(--text-muted)]">YouTube Limit: 2,000,000 bytes</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">1,258,291 bytes (Passes)</span>
                  </div>
                </div>
              )}

              {activeStepIndex === 1 && (
                /* Step 2 Graphic: Title Truncation Meter */
                <div className="space-y-4">
                  <div className="p-3.5 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono text-[var(--text-muted)]">
                      <span>SIMULATED YOUTUBE MOBILE FEED</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓ FIRST 50 CHARS HOOK</span>
                    </div>
                    <div className="text-sm font-semibold text-[var(--text-ink)] leading-snug">
                      <span className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 px-1 py-0.5 rounded">
                        How I Automated My Video Workflow
                      </span>{' '}
                      <span className="text-[var(--text-muted)] text-xs font-normal">
                        (And Saved 15 Hours Every Week...)
                      </span>
                    </div>
                    <p className="text-[11px] text-[var(--text-muted)]">
                      The core emotional proposition is completely visible before mobile cutoff occurs.
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
                    <div className="p-2 rounded border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)]">
                      <span className="block text-[10px] text-[var(--text-muted)]">CHARACTER COUNT</span>
                      <strong className="text-[var(--text-ink)]">48 / 100</strong>
                    </div>
                    <div className="p-2 rounded border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)]">
                      <span className="block text-[10px] text-[var(--text-muted)]">MOBILE SAFE</span>
                      <strong className="text-emerald-600 dark:text-emerald-400">100% VISIBLE</strong>
                    </div>
                    <div className="p-2 rounded border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)]">
                      <span className="block text-[10px] text-[var(--text-muted)]">SEARCH SCORE</span>
                      <strong className="text-[var(--brand-accent)]">HIGH CTR</strong>
                    </div>
                  </div>
                </div>
              )}

              {activeStepIndex === 2 && (
                /* Step 3 Graphic: Publish Package ZIP Explorer */
                <div className="space-y-3">
                  <div className="p-3.5 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] space-y-2.5">
                    <div className="flex items-center justify-between text-xs font-mono text-[var(--text-muted)]">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        PACKAGE CONTENTS (ZIP ARCHIVE)
                      </span>
                      <span className="text-[var(--brand-accent)] font-semibold">Ready to Export</span>
                    </div>
                    <ul className="text-xs space-y-1.5 font-mono text-[var(--text-body)]">
                      <li className="flex items-center justify-between p-1.5 rounded bg-[var(--bg-canvas-subtle)]">
                        <span>📁 /project-assets/</span>
                        <span className="text-[var(--text-muted)]">Archive</span>
                      </li>
                      <li className="flex items-center justify-between pl-4">
                        <span>📄 video-metadata.txt</span>
                        <span className="text-emerald-600 dark:text-emerald-400">Title &amp; Description</span>
                      </li>
                      <li className="flex items-center justify-between pl-4">
                        <span>🖼️ thumbnail.jpg</span>
                        <span className="text-emerald-600 dark:text-emerald-400">1280×720 (1.2 MB)</span>
                      </li>
                      <li className="flex items-center justify-between pl-4">
                        <span>📋 pre-publish-checklist.json</span>
                        <span className="text-emerald-600 dark:text-emerald-400">11 Checks Passed</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-2.5 rounded-lg border border-emerald-500/20 bg-emerald-500/5 text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                    <svg className="w-4 h-4 shrink-0 text-emerald-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                    </svg>
                    <span>100% browser-generated ZIP. Media and draft text never touch external servers.</span>
                  </div>
                </div>
              )}
            </div>

            {/* Checklist Highlights */}
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] font-semibold">
                Guaranteed Pre-Publish Quality:
              </span>
              <ul className="text-xs text-[var(--text-body)] space-y-1.5">
                {activeStep.highlights.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <svg className="w-3.5 h-3.5 text-emerald-500 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Step Action Button */}
            <div className="pt-2 border-t border-[var(--border-hairline)] flex items-center justify-between">
              <Button href={activeStep.toolLink} variant="primary">
                {activeStep.toolLabel} &rarr;
              </Button>
              <span className="text-xs text-[var(--text-muted)]">
                Step {activeStep.number} of 03
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
