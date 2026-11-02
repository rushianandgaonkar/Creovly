'use client';

import React from 'react';
import PageHero from '@/components/ui/PageHero';
import Badge from '@/components/ui/Badge';
import ContactForm from '@/components/contact/ContactForm';
import { useI18n, LocalizedLink } from '@/lib/i18n';

export default function ContactContent() {
  const { t } = useI18n();
  const contact = t.pages.contact;
  const sidebar = contact.sidebar;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      {/* Precision Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)] mb-6">
        <LocalizedLink href="/" className="hover:text-[var(--text-ink)] transition-colors">
          {t.tools.shell.breadcrumbHome}
        </LocalizedLink>
        <span aria-hidden="true" className="text-[var(--text-faint)]">/</span>
        <span className="text-[var(--text-ink)] font-semibold" aria-current="page">
          {contact.heading}
        </span>
      </nav>

      <PageHero tone="blue" className="mb-12">
        <div className="inline-flex items-center gap-2 mb-2">
          <Badge variant="neutral">{contact.heroBadge}</Badge>
          <span className="text-xs font-mono text-[var(--text-muted)]">{contact.heroTag}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-ink)]">
          {contact.heading}
        </h1>
        <p className="mt-3 text-sm sm:text-base text-[var(--text-body)] leading-relaxed">
          {contact.subheading}{' '}
          <a href="mailto:support@creovly.com" className="text-[var(--brand-accent)] font-semibold underline">
            support@creovly.com
          </a>.
        </p>
      </PageHero>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contact Form Column */}
        <div className="md:col-span-2 p-6 sm:p-8 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] shadow-[var(--shadow-whisper)]">
          <ContactForm />
        </div>

        {/* Direct Sidebar Column */}
        <div className="space-y-6 text-xs text-[var(--text-body)]">
          <div className="p-5 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] space-y-3">
            <h3 className="font-semibold text-sm text-[var(--text-ink)]">
              {sidebar.directTitle}
            </h3>
            <p className="leading-relaxed">
              {sidebar.directBody}
            </p>
            <a
              href="mailto:support@creovly.com"
              className="text-[var(--brand-accent)] font-medium font-mono text-xs hover:underline block pt-1"
            >
              support@creovly.com
            </a>
          </div>

          <div className="p-5 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] space-y-2">
            <h3 className="font-semibold text-sm text-[var(--text-ink)]">
              {sidebar.responseTitle}
            </h3>
            <p className="leading-relaxed text-[var(--text-muted)]">
              {sidebar.responseBody}
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] space-y-2">
            <h3 className="font-semibold text-sm text-[var(--text-ink)]">
              {sidebar.featuresTitle}
            </h3>
            <p className="leading-relaxed text-[var(--text-muted)]">
              {sidebar.featuresBody}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
