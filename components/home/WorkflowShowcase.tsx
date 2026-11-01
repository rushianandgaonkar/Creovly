'use client';

import React, { useState } from 'react';
import Button from '@/components/ui/Button';
import { useI18n, LocalizedLink } from '@/lib/i18n';

export default function WorkflowShowcase() {
  const { t } = useI18n();
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const steps = [
    {
      id: 'visuals',
      number: '01',
      tag: 'Visual Audit',
      title: t.home.workflow.steps.pack.title,
      description: t.home.workflow.steps.pack.description,
      highlights: [
        'Automatic 16:9 aspect ratio verification (1280×720 up to 3840×2160)',
        'Client-side JPEG compression below 2 MB (mobile-safe)',
        'Timestamp & Shorts mobile UI danger-zone clearance',
      ],
      toolLink: '/tools/youtube-thumbnail-compressor',
      toolLabel: 'Explore Thumbnail Compressor',
    },
    {
      id: 'metadata',
      number: '02',
      tag: 'Metadata Engine',
      title: t.home.workflow.steps.audit.title,
      description: t.home.workflow.steps.audit.description,
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
      tag: 'Zero-Cloud Packaging',
      title: t.home.workflow.steps.export.title,
      description: t.home.workflow.steps.export.description,
      highlights: [
        '11-point automated and manual upload checks',
        'Local draft saving directly in browser memory',
        'Single-click complete project package (.zip) export',
      ],
      toolLink: '/studio',
      toolLabel: 'Open Publish Studio',
    },
  ];

  const activeStep = steps[activeStepIndex];

  return (
    <section
      aria-label="How Creovly prepares your YouTube upload"
      className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20 border-t border-[var(--border-hairline)]"
    >
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 space-y-3">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono uppercase tracking-wider font-semibold border border-[var(--border-hairline)] bg-[var(--bg-canvas-subtle)] text-[var(--text-muted)] mb-2">
          {t.home.workflow.badge}
        </div>
        <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[var(--text-ink)]">
          {t.home.workflow.heading}
        </h2>
        <p className="text-sm sm:text-base text-[var(--text-body)] leading-relaxed">
          {t.home.workflow.subheading}
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
                    className={`text-xs font-semibold tracking-wide ${
                      isActive ? 'text-[var(--brand-accent)]' : 'text-[var(--text-muted)]'
                    }`}
                  >
                    Stage {step.number} &bull; {step.tag}
                  </span>
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-[var(--brand-accent)]" />
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
          <div
            data-ui
            className="rounded-2xl border border-[var(--border-hairline-strong)] bg-[var(--bg-canvas-elevated)] p-6 sm:p-8 shadow-[var(--shadow-floating)] space-y-6"
          >
            {/* Step Header */}
            <div className="space-y-2 border-b border-[var(--border-hairline)] pb-5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-semibold tracking-wide text-[var(--brand-accent)]">
                  Stage {activeStep.number} &mdash; {activeStep.tag}
                </span>
                <span className="text-xs text-[var(--text-muted)]">100% Client-Side</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--text-ink)]">
                {activeStep.title}
              </h3>
              <p className="text-sm text-[var(--text-body)] leading-relaxed">
                {activeStep.description}
              </p>
            </div>

            {/* High-Fidelity Visual Graphic for Current Step */}
            <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-subtle)] p-4 sm:p-5 space-y-4">
              {activeStepIndex === 0 && (
                /* Step 1 Graphic: Side-by-Side Before/After Visual Comparison */
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Before Frame: Raw Uncompressed Export with Alert */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-red-600 dark:text-red-400">
                          Before: Raw Export
                        </span>
                        <span className="text-[11px] font-semibold text-red-700 dark:text-red-300 bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">
                          4.2 MB &bull; Mobile Limit Exceeded
                        </span>
                      </div>
                      <div className="relative aspect-video rounded-lg overflow-hidden border-2 border-red-500/40 shadow-sm bg-black">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src="/examples/compressor-source.jpg"
                          alt="Before optimization uncompressed thumbnail"
                          width={320}
                          height={180}
                          className="w-full h-full object-cover opacity-85"
                          loading="lazy"
                          decoding="async"
                        />
                        {/* Danger Indicator covering critical words */}
                        <div className="absolute bottom-2 right-2 bg-red-600/95 text-white text-[10px] font-semibold px-2 py-1 rounded shadow-md flex items-center gap-1">
                          <span>14:20 Badge Covers Title Hook</span>
                        </div>
                      </div>
                      <p className="text-[11px] text-[var(--text-muted)]">
                        Exceeds YouTube Studio mobile 2 MB limit (desktop supports up to 50 MB). Critical text obscured behind timestamp.
                      </p>
                    </div>

                    {/* After Frame: Creovly Verified & Compressed */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                          Creovly Verified
                        </span>
                        <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                          1.1 MB &bull; Ready
                        </span>
                      </div>
                      <div className="relative aspect-video rounded-lg overflow-hidden border-2 border-emerald-500/50 shadow-sm bg-black">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src="/examples/compressor-source.jpg"
                          alt="After optimization Creovly verified thumbnail"
                          width={320}
                          height={180}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          decoding="async"
                        />
                        {/* YouTube Timestamp badge placed safely */}
                        <div className="absolute bottom-2 right-2 bg-black/90 text-white text-[10px] font-medium px-1.5 py-0.5 rounded shadow">
                          14:20
                        </div>
                        {/* Verified Safe Zone Overlay Tag */}
                        <div className="absolute top-2 left-2 bg-emerald-600 text-white text-[9px] font-semibold px-1.5 py-0.5 rounded shadow">
                          1280&times;720 HD Pass
                        </div>
                      </div>
                      <p className="text-[11px] text-[var(--text-muted)]">
                        74% size reduction to 1.1 MB JPEG. Crisp clarity preserved with safe-zone clearance verified.
                      </p>
                    </div>
                  </div>

                  {/* Benchmark Bar */}
                  <div className="p-3 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] flex items-center justify-between text-xs">
                    <span className="text-[var(--text-muted)]">YouTube Mobile Limit: 2,000,000 bytes (≤ 50 MB Desktop)</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">1,153,433 bytes (Universal Mobile Compatibility)</span>
                  </div>
                </div>
              )}

              {activeStepIndex === 1 && (
                /* Step 2 Graphic: Authentic YouTube Mobile Feed Preview */
                <div className="space-y-4">
                  <div className="p-3.5 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] space-y-3">
                    <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
                      <span className="font-semibold text-[var(--text-ink)]">
                        YouTube Smartphone Feed Simulation
                      </span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                        First 50 Chars Hook Safe
                      </span>
                    </div>

                    {/* YouTube Mobile Card Replica */}
                    <div className="flex gap-3 items-start p-2 rounded-lg bg-[var(--bg-canvas-subtle)] border border-[var(--border-hairline)]">
                      <div className="relative w-28 aspect-video rounded overflow-hidden shrink-0 bg-black">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src="/examples/thumbnail-source.png"
                          alt="Mobile feed video thumbnail preview"
                          width={160}
                          height={90}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          decoding="async"
                        />
                        <span className="absolute bottom-1 right-1 bg-black/85 text-white text-[9px] font-medium px-1 rounded">
                          14:20
                        </span>
                      </div>
                      <div className="space-y-1 min-w-0">
                        <p className="text-xs font-semibold text-[var(--text-ink)] leading-snug">
                          <span className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 px-1 py-0.5 rounded">
                            How I Automated My Video Production
                          </span>{' '}
                          <span className="text-[var(--text-muted)]">
                            (And Saved 15 Hours)...
                          </span>
                        </p>
                        <div className="flex items-center gap-1.5 text-[10px] text-[var(--text-muted)]">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src="/examples/avatar-tech.png"
                            alt="Channel Avatar"
                            width={14}
                            height={14}
                            className="rounded-full"
                          />
                          <span>TechCreator &bull; 142K views &bull; 2 days ago</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Metrics Row */}
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="p-2.5 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)]">
                      <span className="block text-[10px] text-[var(--text-muted)] uppercase tracking-wide">Character Count</span>
                      <strong className="text-[var(--text-ink)] text-sm">48 / 100</strong>
                    </div>
                    <div className="p-2.5 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)]">
                      <span className="block text-[10px] text-[var(--text-muted)] uppercase tracking-wide">Mobile Feed</span>
                      <strong className="text-emerald-600 dark:text-emerald-400 text-sm">100% In-Bounds</strong>
                    </div>
                    <div className="p-2.5 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)]">
                      <span className="block text-[10px] text-[var(--text-muted)] uppercase tracking-wide">CTR Rating</span>
                      <strong className="text-[var(--brand-accent)] text-sm">High Impact</strong>
                    </div>
                  </div>
                </div>
              )}

              {activeStepIndex === 2 && (
                /* Step 3 Graphic: Publish Package ZIP Explorer */
                <div className="space-y-3">
                  <div className="p-4 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] space-y-3">
                    <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
                      <span className="font-semibold text-[var(--text-ink)] flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        Package Contents (ZIP Archive)
                      </span>
                      <span className="text-[var(--brand-accent)] font-semibold">Ready to Export</span>
                    </div>

                    <div className="space-y-2 text-xs text-[var(--text-body)]">
                      <div className="flex items-center justify-between p-2 rounded-lg bg-[var(--bg-canvas-subtle)]">
                        <span className="font-semibold text-[var(--text-ink)]">/project-assets.zip</span>
                        <span className="text-[var(--text-muted)]">Complete Package</span>
                      </div>
                      <div className="flex items-center justify-between px-3 py-1.5 border-l-2 border-zinc-300 dark:border-zinc-700 ml-3">
                        <span className="text-[var(--text-ink)] font-medium">video-metadata.txt</span>
                        <span className="text-emerald-600 dark:text-emerald-400">Title &amp; Description</span>
                      </div>
                      <div className="flex items-center justify-between px-3 py-1.5 border-l-2 border-zinc-300 dark:border-zinc-700 ml-3">
                        <span className="text-[var(--text-ink)] font-medium">thumbnail.jpg</span>
                        <span className="text-emerald-600 dark:text-emerald-400">1280&times;720 HD (1.1 MB)</span>
                      </div>
                      <div className="flex items-center justify-between px-3 py-1.5 border-l-2 border-zinc-300 dark:border-zinc-700 ml-3">
                        <span className="text-[var(--text-ink)] font-medium">pre-publish-checklist.json</span>
                        <span className="text-emerald-600 dark:text-emerald-400">11 Checks Passed</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg border border-emerald-500/20 bg-emerald-500/5 text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
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
              <span className="text-xs uppercase tracking-wider text-[var(--text-muted)] font-semibold block">
                Pre-Publish Verification Standards:
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
              <LocalizedLink href={activeStep.toolLink}>
                <Button variant="primary">
                  {activeStep.toolLabel} &rarr;
                </Button>
              </LocalizedLink>
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
