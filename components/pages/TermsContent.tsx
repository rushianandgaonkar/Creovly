'use client';

import React from 'react';
import PageHero from '@/components/ui/PageHero';
import Badge from '@/components/ui/Badge';
import { useI18n, LocalizedLink } from '@/lib/i18n';

export default function TermsContent() {
  const { t } = useI18n();
  const terms = t.pages.terms;
  const sections = terms.sections;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)] mb-6">
        <LocalizedLink href="/" className="hover:text-[var(--text-ink)] transition-colors">
          {t.tools.shell.breadcrumbHome}
        </LocalizedLink>
        <span aria-hidden="true" className="text-[var(--text-faint)]">/</span>
        <span className="text-[var(--text-ink)] font-semibold" aria-current="page">
          {terms.heading}
        </span>
      </nav>

      <PageHero tone="indigo" className="mb-12">
        <div className="inline-flex items-center gap-2 mb-2">
          <Badge variant="neutral">{terms.heroBadge}</Badge>
          <span className="text-xs font-mono text-[var(--text-muted)]">{terms.lastUpdated}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-ink)]">
          {terms.heading}
        </h1>
        <p className="mt-3 text-sm sm:text-base text-[var(--text-body)] leading-relaxed">
          {terms.subheading}
        </p>
      </PageHero>

      <div className="space-y-10 text-sm text-[var(--text-body)] leading-relaxed">
        {/* Purpose */}
        <section className="p-6 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] space-y-3">
          <h2 className="text-base font-semibold text-[var(--text-ink)]">
            {sections.purposeTitle}
          </h2>
          <p>{sections.purposeBody}</p>
        </section>

        {/* Intellectual Property */}
        <section className="p-6 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] space-y-3">
          <h2 className="text-base font-semibold text-[var(--text-ink)]">
            {sections.ipTitle}
          </h2>
          <p>
            <strong>{sections.ipOwnershipHeading}</strong> {sections.ipOwnershipBody}
          </p>
          <p>{sections.ipProcessingBody}</p>
        </section>

        {/* Disclaimers & Mathematical Scenarios */}
        <section className="p-6 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] space-y-3">
          <h2 className="text-base font-semibold text-[var(--text-ink)]">
            {sections.disclaimerTitle}
          </h2>
          <p>{sections.disclaimerBody}</p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-[var(--text-muted)]">
            <li>{sections.disclaimerItem1}</li>
            <li>{sections.disclaimerItem2}</li>
            <li>{sections.disclaimerItem3}</li>
          </ul>
        </section>

        {/* Platform Trademark Notice */}
        <section className="p-6 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] space-y-3">
          <h2 className="text-base font-semibold text-[var(--text-ink)]">
            {sections.trademarksTitle}
          </h2>
          <p>{sections.trademarksBody1}</p>
          <p className="text-xs text-[var(--text-muted)]">
            {sections.trademarksBody2}
          </p>
        </section>

        {/* Limitation of Liability */}
        <section className="p-6 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] space-y-3">
          <h2 className="text-base font-semibold text-[var(--text-ink)]">
            {sections.liabilityTitle}
          </h2>
          <p>{sections.liabilityBody}</p>
        </section>

        {/* Contact */}
        <section className="p-6 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-subtle)] space-y-2">
          <h2 className="text-base font-semibold text-[var(--text-ink)]">
            {sections.contactTitle}
          </h2>
          <p className="text-xs text-[var(--text-body)]">
            {sections.contactBodyPrefix}
            <a href="mailto:support@creovly.com" className="text-[var(--brand-accent)] font-medium hover:underline">
              support@creovly.com
            </a>
            {sections.contactBodyMid}
            <LocalizedLink href="/contact" className="text-[var(--brand-accent)] font-medium hover:underline">
              {sections.contactFormLink}
            </LocalizedLink>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
