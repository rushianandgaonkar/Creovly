import type { ReactNode } from 'react';

export default function ToolWorkspaceLayout({ workspace, results, preview = false }: { workspace: ReactNode; results: ReactNode; preview?: boolean }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
      <section className="lg:col-span-7 min-w-0 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] p-5 sm:p-6 shadow-[var(--shadow-whisper)]" aria-labelledby="workspace-heading">
        <h2 id="workspace-heading" className="text-sm font-semibold pb-3 border-b border-[var(--border-hairline-subtle)]">Tool workspace</h2>
        <div className="mt-5 space-y-5">{workspace}</div>
      </section>
      <section className="lg:col-span-5 min-w-0 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] p-5 sm:p-6 shadow-[var(--shadow-whisper)]" aria-labelledby="results-heading">
        <h2 id="results-heading" className="text-sm font-semibold pb-3 border-b border-[var(--border-hairline-subtle)]">{preview ? 'Sample results' : 'Results'}</h2>
        <div className="mt-5 space-y-4">{results}</div>
      </section>
    </div>
  );
}
