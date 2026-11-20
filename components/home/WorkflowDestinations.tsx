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
          <h2 className="text-xl font-bold tracking-tight text-[var(--text-ink)]">
            {destinations.checklist.title}
          </h2>
          <p className="text-sm text-[var(--text-body)] leading-relaxed">
            {destinations.checklist.description}
          </p>
          <div className="pt-2">
            <LocalizedLink href="/checklist">
              <Button variant="outline">
                {destinations.checklist.buttonText}
              </Button>
            </LocalizedLink>
          </div>
        </SpotlightCard>

        <SpotlightCard as="article" className="p-6 space-y-4 border-[var(--brand-accent)]/30">
          <h2 className="text-xl font-bold tracking-tight text-[var(--text-ink)]">
            {destinations.studio.title}
          </h2>
          <p className="text-sm text-[var(--text-body)] leading-relaxed">
            {destinations.studio.description}
          </p>
          <div className="pt-2">
            <LocalizedLink href="/studio">
              <Button variant="primary">
                {destinations.studio.buttonText}
              </Button>
            </LocalizedLink>
          </div>
        </SpotlightCard>
      </div>
    </section>
  );
}

