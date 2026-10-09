import { createPageMetadata } from '@/lib/metadata';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import MetricCard from '@/components/results/MetricCard';
import ScoreIndicator from '@/components/results/ScoreIndicator';
import Alert from '@/components/feedback/Alert';
import ProgressBar from '@/components/results/ProgressBar';

export const metadata = createPageMetadata({
  title: 'Publish Studio — Workspace Preview',
  description: 'Explore a sample Creovly Publish Studio workspace. Asset analysis and package export are not available yet.',
  path: '/studio',
  noindex: true,
});

export default function StudioPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      {/* Hero Header */}
      <div className="max-w-3xl mb-12">
        <div className="inline-flex items-center gap-2 mb-3">
          <Badge variant="popular" size="md">Flagship Workspace</Badge>
          <span className="text-xs font-mono text-[var(--text-muted)]">Workspace Preview</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[var(--text-ink)]">
          Creovly Publish Studio
        </h1>
        <p className="mt-3 text-base sm:text-lg text-[var(--text-body)] leading-relaxed">
          The unified command center creators run{' '}
          <span className="text-[var(--text-ink)] font-semibold">before hitting publish</span>. Explore how thumbnail checks, title feedback, Shorts layouts, and income estimates could fit into one workflow.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Button variant="pill-primary" size="md" href="/tools">
            Explore Current Modular Tools &rarr;
          </Button>
          <Button variant="pill-secondary" size="md" href="/checklist">
            View Pre-Publish Checklist
          </Button>
        </div>
      </div>

      <p className="text-sm text-[var(--text-body)] mb-4">Sample workspace · Scores, measurements, and checks are illustrative. Analysis and exports are not available yet.</p>
      {/* Workspace preview */}
      <div className="rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] p-6 sm:p-8 shadow-[var(--shadow-floating)] relative overflow-hidden">
        {/* Studio Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[var(--border-hairline)]">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]">Active Workspace Preview</span>
              <h2 className="text-base font-semibold text-[var(--text-ink)]">Project: “Episode 14 — Scaling Micro-SaaS to $10k MRR”</h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="accent">Draft Mode</Badge>
            <span className="text-xs font-mono text-[var(--text-muted)]">Preview Session</span>
          </div>
        </div>

        {/* Studio 3-Column Pre-Flight Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Module 1: Asset Inspector */}
          <div className="p-5 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-subtle)] space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-[var(--text-muted)] font-semibold">01. Thumbnail Canvas</span>
              <Badge variant="new">16:9 Verified</Badge>
            </div>
            <div className="aspect-video w-full rounded-lg bg-[var(--bg-canvas)] border border-[var(--border-hairline)] flex flex-col items-center justify-center p-4 text-center">
              <svg className="w-8 h-8 text-[var(--text-muted)] mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-xs font-mono text-[var(--text-ink)] font-medium">1280 × 720 px</span>
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-0.5">1.18 MB (Within 2MB Limit)</span>
            </div>
            <ProgressBar label="Contrast & Readability" value={92} variant="success" />
          </div>

          {/* Module 2: Title & Packaging Scorer */}
          <div className="p-5 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-subtle)] space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-[var(--text-muted)] font-semibold">02. Packaging & Title</span>
              <Badge variant="popular">High CTR</Badge>
            </div>
            <div className="p-3 rounded-lg bg-[var(--bg-canvas)] border border-[var(--border-hairline)]">
              <span className="text-[11px] text-[var(--text-muted)] font-mono">Current draft:</span>
              <p className="text-xs font-medium text-[var(--text-ink)] mt-1">
                I Scaled a Micro-SaaS to $10,000/mo (Step-by-Step Blueprint)
              </p>
            </div>
            <ScoreIndicator score={89} label="Title Impact Score" verdict="Strong CTR Potential" />
          </div>

          {/* Module 3: Pre-Publish Ready State */}
          <div className="p-5 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-subtle)] space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono uppercase text-[var(--text-muted)] font-semibold">03. Pre-Flight Readiness</span>
                <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400">9/10 Checks</span>
              </div>
              <div className="space-y-2.5 text-xs text-[var(--text-body)]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span>Thumbnail file size under 2MB</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span>Title mobile truncation verified</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span>Description disclosures verified</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span>Shorts UI elements clearance checked</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--border-hairline)]">
              <Button disabled variant="primary" size="md" className="w-full">
                Export Pre-Flight Package &rarr;
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Studio Positioning Notice */}
      <div className="mt-8">
        <Alert variant="info" title="Workspace preview">
          This example shows the intended Studio layout. It does not analyze assets, save projects, or export publishing packages.
        </Alert>
      </div>
    </div>
  );
}
