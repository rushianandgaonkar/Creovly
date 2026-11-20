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
        className="flex items-center gap-2 text-xs text-[var(--text-muted)] mb-6"
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

