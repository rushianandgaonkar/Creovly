'use client';

import React from 'react';
import PageHero from '@/components/ui/PageHero';
import Badge from '@/components/ui/Badge';
import ConsentSettings from '@/components/privacy/ConsentSettings';
import { useI18n, LocalizedLink } from '@/lib/i18n';

export default function PrivacyContent() {
  const { t } = useI18n();
  const privacy = t.pages.privacy;
  const sections = privacy.sections;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)] mb-6">
        <LocalizedLink href="/" className="hover:text-[var(--text-ink)] transition-colors">
          {t.tools.shell.breadcrumbHome}
        </LocalizedLink>
        <span aria-hidden="true" className="text-[var(--text-faint)]">/</span>
        <span className="text-[var(--text-ink)] font-semibold" aria-current="page">
          {privacy.heading}
        </span>
      </nav>

      <PageHero tone="teal" className="mb-12">
        <div className="inline-flex items-center gap-2 mb-2">
          <Badge variant="neutral">{privacy.heroBadge}</Badge>
          <span className="text-xs font-mono text-[var(--text-muted)]">{privacy.lastUpdated}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-ink)]">
          {privacy.heading}
        </h1>
        <p className="mt-3 text-sm sm:text-base text-[var(--text-body)] leading-relaxed">
          {privacy.subheading}
        </p>
      </PageHero>

      <div className="space-y-10 text-sm text-[var(--text-body)] leading-relaxed">
        {/* Core Architecture */}
        <section className="p-6 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" aria-hidden="true" />
            <h2 className="text-base font-semibold text-[var(--text-ink)]">
              {sections.clientSideTitle}
            </h2>
          </div>
          <p>{sections.clientSideBody}</p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-[var(--text-muted)]">
            <li>{sections.clientSideItem1}</li>
            <li>{sections.clientSideItem2}</li>
            <li>{sections.clientSideItem3}</li>
          </ul>
        </section>

        {/* Information We Collect */}
        <section className="p-6 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] space-y-3">
          <h2 className="text-base font-semibold text-[var(--text-ink)]">
            {sections.dataCollectTitle}
          </h2>
          <p>
            <strong>{sections.noAccountHeading}</strong> {sections.noAccountBody}
          </p>
          <p>
            <strong>{sections.contactCommsHeading}</strong> {sections.contactCommsBody}
          </p>
        </section>

        {/* Local Storage Inventory */}
        <section className="p-6 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] space-y-3">
          <h2 className="text-base font-semibold text-[var(--text-ink)]">
            {sections.storageTitle}
          </h2>
          <p>{sections.storageDescription}</p>
          <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-subtle)] p-4 space-y-3 text-xs">
            <div className="space-y-1">
              <span className="font-mono font-semibold text-[var(--text-ink)]">
                {sections.storageKeys.studioDraftKey}
              </span>
              <p className="text-[var(--text-body)]">
                {sections.storageKeys.studioDraftDesc}
              </p>
            </div>
            <div className="border-t border-[var(--border-hairline)] pt-2.5 space-y-1">
              <span className="font-mono font-semibold text-[var(--text-ink)]">
                {sections.storageKeys.checklistKey}
              </span>
              <p className="text-[var(--text-body)]">
                {sections.storageKeys.checklistDesc}
              </p>
            </div>
            <div className="border-t border-[var(--border-hairline)] pt-2.5 space-y-1">
              <span className="font-mono font-semibold text-[var(--text-ink)]">
                {sections.storageKeys.themeKey}
              </span>
              <p className="text-[var(--text-body)]">
                {sections.storageKeys.themeDesc}
              </p>
            </div>
            <div className="border-t border-[var(--border-hairline)] pt-2.5 space-y-1">
              <span className="font-mono font-semibold text-[var(--text-ink)]">
                {sections.storageKeys.analyticsConsentKey}
              </span>
              <p className="text-[var(--text-body)]">
                {sections.storageKeys.analyticsConsentDesc}
              </p>
            </div>
          </div>
        </section>

        {/* Analytics & Cookies Controls */}
        <section className="p-6 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] space-y-4">
          <h2 className="text-base font-semibold text-[var(--text-ink)]">
            {sections.analyticsTitle}
          </h2>
          <p>{sections.analyticsBody}</p>
          <div className="pt-2">
            <ConsentSettings />
          </div>
        </section>

        {/* Third-Party Links & Disclaimers */}
        <section className="p-6 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] space-y-3">
          <h2 className="text-base font-semibold text-[var(--text-ink)]">
            {sections.platformTitle}
          </h2>
          <p>{sections.platformBody}</p>
        </section>

        {/* Contact Information */}
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
