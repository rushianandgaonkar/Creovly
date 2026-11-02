/* Hallmark · genre: modern-minimal · macrostructure: Workbench */
'use client';

import type { ReactNode } from 'react';
import { useI18n } from '@/lib/i18n';

interface ToolWorkspaceLayoutProps {
  workspace: ReactNode;
  results: ReactNode;
  preview?: boolean;
}

export default function ToolWorkspaceLayout({
  workspace,
  results,
  preview = false,
}: ToolWorkspaceLayoutProps) {
  const { t } = useI18n();
  const shell = t.tools.shell;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start mb-16">
      {/* Input Workbench Panel (Controls) */}
      <section
        className="lg:col-span-7 min-w-0 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] overflow-hidden shadow-[var(--shadow-whisper)] transition-all"
        aria-labelledby="workspace-heading"
      >
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[var(--border-hairline)] bg-[var(--bg-canvas-subtle)]">
          <div className="flex items-center gap-2.5">
            <span
              className="w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-emerald-500/20"
              aria-hidden="true"
            />
            <h2
              id="workspace-heading"
              className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--text-ink)]"
            >
              {shell.workbenchControls}
            </h2>
          </div>
          <span className="text-[11px] font-mono text-[var(--text-muted)]">
            {shell.inputLocal}
          </span>
        </div>
        <div className="p-5 sm:p-6 space-y-6">{workspace}</div>
      </section>

      {/* Output & Inspection Panel (Results) */}
      <section
        className="lg:col-span-5 min-w-0 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] overflow-hidden shadow-[var(--shadow-whisper)] lg:sticky lg:top-20 transition-all"
        aria-labelledby="results-heading"
      >
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[var(--border-hairline)] bg-[var(--bg-canvas-subtle)]">
          <div className="flex items-center gap-2.5">
            <span
              className={`w-2 h-2 rounded-full ${
                preview ? 'bg-amber-500' : 'bg-[var(--brand-accent)]'
              }`}
              aria-hidden="true"
            />
            <h2
              id="results-heading"
              className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--text-ink)]"
            >
              {preview ? shell.sampleResults : shell.outputInspection}
            </h2>
          </div>
          <span className="text-[11px] font-mono text-[var(--text-muted)]">
            {preview ? shell.previewMode : shell.liveSpec}
          </span>
        </div>
        <div className="p-5 sm:p-6 space-y-5 max-h-[calc(100vh-8rem)] overflow-y-auto">
          {results}
        </div>
      </section>
    </div>
  );
}
