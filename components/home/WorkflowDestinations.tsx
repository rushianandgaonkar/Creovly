'use client';

import React from 'react';
import Button from '@/components/ui/Button';
import SpotlightCard from '@/components/ui/SpotlightCard';
import { useI18n, LocalizedLink } from '@/lib/i18n';

export default function WorkflowDestinations() {
  const { t } = useI18n();
  const destinations = t.home.destinations;

  return (
    <section aria-label="Pre-publish workflow options" className="max-w-6xl mx-auto px-4 sm:px-6 pb-12 sm:pb-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-[var(--border-hairline)] pt-8">
        <SpotlightCard as="article" className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] font-semibold">
              {destinations.checklist.tag}
            </span>
            <span className="w-2 h-2 rounded-full bg-amber-500" aria-hidden="true" />
          </div>
          <h2 className="text-xl font-bold tracking-tight text-[var(--text-ink)]">
            {destinations.checklist.title}
          </h2>
          <p className="text-sm text-[var(--text-body)] leading-relaxed">
            {destinations.checklist.description}
          </p>
          <div className="pt-2">
            <LocalizedLink href="/checklist">
              <Button variant="outline">
                {destinations.checklist.buttonText} &rarr;
              </Button>
            </LocalizedLink>
          </div>
        </SpotlightCard>

        <SpotlightCard as="article" spotlightColor="rgba(0, 112, 243, 0.2)" className="p-6 space-y-4 border-[var(--brand-accent)]/30">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--brand-accent)] font-semibold">
              {destinations.studio.tag}
            </span>
            <span className="w-2 h-2 rounded-full bg-[var(--brand-accent)] animate-pulse" aria-hidden="true" />
          </div>
          <h2 className="text-xl font-bold tracking-tight text-[var(--text-ink)]">
            {destinations.studio.title}
          </h2>
          <p className="text-sm text-[var(--text-body)] leading-relaxed">
            {destinations.studio.description}
          </p>
          <div className="pt-2">
            <LocalizedLink href="/studio">
              <Button variant="primary">
                {destinations.studio.buttonText} &rarr;
              </Button>
            </LocalizedLink>
          </div>
        </SpotlightCard>
      </div>
    </section>
  );
}

