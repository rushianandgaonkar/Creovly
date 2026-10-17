import type { ReactNode } from 'react';

export default function StudioSection({ title, children, className = '' }: { title: string; children: ReactNode; className?: string }) {
  return <section className={`min-w-0 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] p-5 sm:p-6 space-y-5 ${className}`}>
    <h2 className="text-base font-semibold tracking-tight border-b border-[var(--border-hairline-subtle)] pb-3">{title}</h2>
    {children}
  </section>;
}
