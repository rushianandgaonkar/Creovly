'use client';

import React from 'react';
import ToolDiscovery from '@/components/tools/ToolDiscovery';
import { toolRegistry } from '@/config/site';
import PageHero from '@/components/ui/PageHero';
import { useI18n, LocalizedLink } from '@/lib/i18n';

export default function ToolsDirectoryContent() {
  const { t } = useI18n();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Precision Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)] mb-6"
      >
        <LocalizedLink href="/" className="hover:text-[var(--text-ink)] transition-colors">
          {t.tools.shell.breadcrumbHome}
        </LocalizedLink>
        <span aria-hidden="true" className="text-[var(--text-faint)]">
          /
        </span>
        <span className="text-[var(--text-ink)] font-semibold" aria-current="page">
          {t.tools.shell.breadcrumbTools}
        </span>
      </nav>

      <PageHero tone="indigo" className="mb-10">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono uppercase tracking-wider font-semibold border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] text-[var(--text-ink)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-accent)]" />
            {t.tools.directory.completeCatalog}
          </span>
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 bg-emerald-500/5">
            {t.tools.shell.badgeInBrowser}
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-ink)]">
          {t.tools.directory.heading}
        </h1>
        <p className="mt-2.5 text-sm sm:text-base text-[var(--text-body)] max-w-2xl leading-relaxed">
          {t.tools.directory.subheading}
        </p>
      </PageHero>

      <ToolDiscovery tools={toolRegistry} visualCards={true} />
    </div>
  );
}

