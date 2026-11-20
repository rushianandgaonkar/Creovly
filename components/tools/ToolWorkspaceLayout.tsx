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
        className="lg:col-span-7 min-w-0 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] overflow-hidden shadow-[var(--shadow-whisper)] transition"
        aria-labelledby="workspace-heading"
      >
        <div className="px-5 py-3.5 border-b border-[var(--border-hairline)] bg-[var(--bg-canvas-subtle)]">
          <span
            id="workspace-heading"
            className="text-sm font-semibold text-[var(--text-ink)]"
          >
            {shell.workbenchControls}
          </span>
        </div>
        <div className="p-5 sm:p-6 space-y-6">{workspace}</div>
      </section>

      {/* Output & Inspection Panel (Results) */}
      <section
        className="lg:col-span-5 min-w-0 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] overflow-hidden shadow-[var(--shadow-whisper)] lg:sticky lg:top-20 transition"
        aria-labelledby="results-heading"
      >
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[var(--border-hairline)] bg-[var(--bg-canvas-subtle)]">
          <span
            id="results-heading"
            className="text-sm font-semibold text-[var(--text-ink)]"
          >
            {preview ? shell.sampleResults : shell.outputInspection}
          </span>
          {preview && (
            <span className="text-xs text-[var(--text-muted)]">{shell.previewMode}</span>
          )}
        </div>
        <div className="p-5 sm:p-6 space-y-5 max-h-[calc(100vh-8rem)] overflow-y-auto">
          {results}
        </div>
      </section>
    </div>
  );
}
