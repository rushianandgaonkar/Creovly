'use client';

import React from 'react';
import PageHero from '@/components/ui/PageHero';
import Button from '@/components/ui/Button';
import SpotlightCard from '@/components/ui/SpotlightCard';
import LinkToUs from '@/components/ui/LinkToUs';
import { useI18n, LocalizedLink } from '@/lib/i18n';

export default function AboutContent() {
  const { t } = useI18n();
  const about = t.pages.about;
  const sections = about.sections;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      {/* Precision Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[var(--text-muted)] mb-6">
        <LocalizedLink href="/" className="hover:text-[var(--text-ink)] transition-colors">
          {t.tools.shell.breadcrumbHome}
        </LocalizedLink>
        <span aria-hidden="true" className="text-[var(--text-faint)]">/</span>
        <span className="text-[var(--text-ink)] font-semibold" aria-current="page">
          {about.breadcrumb || about.heading}
        </span>
      </nav>

      {/* Hero Section */}
      <PageHero tone="violet" className="mb-14">
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[var(--text-ink)] leading-tight">
          {about.heading}
        </h1>
        <p className="mt-4 text-base sm:text-lg text-[var(--text-body)] max-w-2xl leading-relaxed">
          {about.subheading}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <LocalizedLink href="/studio">
            <Button variant="primary">{about.buttonStudio}</Button>
          </LocalizedLink>
          <LocalizedLink href="/tools">
            <Button variant="outline">{about.buttonTools}</Button>
          </LocalizedLink>
        </div>
      </PageHero>

      <div className="space-y-16">
        {/* Mission Section */}
        <section className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-ink)]">
            {sections.missionTitle}
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-body)] leading-relaxed">
            {sections.missionBody}
          </p>
        </section>

        {/* 3 Core Pillars */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight text-[var(--text-ink)]">
            {sections.differenceTitle}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SpotlightCard className="p-6 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-[var(--brand-accent-soft)] border border-[var(--border-hairline)] flex items-center justify-center text-[var(--brand-accent-deep)] font-mono text-sm font-bold">
                01
              </div>
              <h3 className="text-base font-semibold text-[var(--text-ink)]">
                {sections.privacyTitle}
              </h3>
              <p className="text-xs text-[var(--text-body)] leading-relaxed">
                {sections.privacyBody}
              </p>
            </SpotlightCard>

            <SpotlightCard className="p-6 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-[var(--brand-accent-soft)] border border-[var(--border-hairline)] flex items-center justify-center text-[var(--brand-accent-deep)] font-mono text-sm font-bold">
                02
              </div>
              <h3 className="text-base font-semibold text-[var(--text-ink)]">
                {sections.scopeTitle}
              </h3>
              <p className="text-xs text-[var(--text-body)] leading-relaxed">
                {sections.scopeBody}
              </p>
            </SpotlightCard>

            <SpotlightCard className="p-6 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-[var(--brand-accent-soft)] border border-[var(--border-hairline)] flex items-center justify-center text-[var(--brand-accent-deep)] font-mono text-sm font-bold">
                03
              </div>
              <h3 className="text-base font-semibold text-[var(--text-ink)]">
                {sections.disclaimerTitle}
              </h3>
              <p className="text-xs text-[var(--text-body)] leading-relaxed">
                {sections.disclaimerBody}
              </p>
            </SpotlightCard>
          </div>
        </section>

        {/* Media Kit & Brand Assets Section */}
        <LinkToUs />

        {/* Independent Status Disclaimer & Legal Transparency */}
        <section className="p-6 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-subtle)] space-y-3">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-semibold text-[var(--text-ink)]">
              {sections.disclaimerTitle}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[var(--text-body)] leading-relaxed">
            {sections.disclaimerBody}
          </p>
        </section>

        {/* Contact and Support */}
        <section className="p-6 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] space-y-3">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-semibold text-[var(--text-ink)]">
              {sections.supportTitle}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[var(--text-body)] leading-relaxed">
            {sections.supportBody}
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-1">
            <a
              href="mailto:support@creovly.com"
              className="text-xs font-semibold text-[var(--brand-accent-deep)] hover:underline inline-flex items-center gap-1.5"
            >
              <svg aria-hidden="true" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              support@creovly.com
            </a>
            <span className="text-xs text-[var(--text-muted)]">&bull;</span>
            <LocalizedLink
              href="/contact"
              className="text-xs font-semibold text-[var(--text-ink)] hover:underline"
            >
              {sections.contactFormLink}
            </LocalizedLink>
          </div>
        </section>

        {/* Explore Workspaces Callout */}
        <section className="p-8 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-[var(--text-ink)]">
              {sections.ctaHeading}
            </h3>
            <p className="text-xs text-[var(--text-body)] max-w-xl">
              {sections.ctaBody}
            </p>
          </div>
          <LocalizedLink href="/studio">
            <Button variant="primary" size="md">
              {sections.ctaButton}
            </Button>
          </LocalizedLink>
        </section>
      </div>
    </div>
  );
}
