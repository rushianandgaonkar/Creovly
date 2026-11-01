'use client';

import React from 'react';
import PageHero from '@/components/ui/PageHero';
import Badge from '@/components/ui/Badge';
import { useI18n, LocalizedLink } from '@/lib/i18n';

export default function TermsContent() {
  const { t } = useI18n();
  const terms = t.pages.terms;

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
            1. Purpose and Nature of the Service
          </h2>
          <p>
            Creovly provides browser-based utilities and pre-publish workspaces designed to help digital video creators prepare packaging assets (such as thumbnails, titles, Shorts framing guides, and financial scenario models). All tools operate locally within the user’s web browser without server-side media processing.
          </p>
        </section>

        {/* Intellectual Property */}
        <section className="p-6 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] space-y-3">
          <h2 className="text-base font-semibold text-[var(--text-ink)]">
            2. Creator Ownership & Intellectual Property
          </h2>
          <p>
            <strong>You own 100% of your content:</strong> Creovly claims no ownership, copyright, or intellectual property rights over any images, logos, titles, scripts, or data that you process through our tools.
          </p>
          <p>
            Because file processing executes entirely on your device, Creovly never transmits, stores, or re-licenses your creative assets. You retain full ownership and responsibility for the media you export and upload to external publishing platforms.
          </p>
        </section>

        {/* Disclaimers & Mathematical Scenarios */}
        <section className="p-6 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] space-y-3">
          <h2 className="text-base font-semibold text-[var(--text-ink)]">
            3. Disclaimer Regarding Performance & Earnings
          </h2>
          <p>
            Tools such as the Revenue Calculator, RPM Calculator, Watch Hours Calculator, and Title Analyzer are planning aids that calculate mathematical scenarios based on creator-entered assumptions.
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-[var(--text-muted)]">
            <li>Calculated earnings, click-through rates (CTR), or watch hour milestones are hypothetical models and not guarantees of real-world results.</li>
            <li>Actual creator income is subject to platform algorithms, viewer demographics, seasonality, advertiser demand, and YouTube Partner Program compliance.</li>
            <li>Creovly does not represent or provide professional financial, accounting, legal, or investment advice.</li>
          </ul>
        </section>

        {/* Platform Trademark Notice */}
        <section className="p-6 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] space-y-3">
          <h2 className="text-base font-semibold text-[var(--text-ink)]">
            4. Third-Party Trademarks & Independent Status
          </h2>
          <p>
            Creovly is an independent software toolkit and is not affiliated with, sponsored by, authorized by, or endorsed by Google LLC or YouTube LLC.
          </p>
          <p className="text-xs text-[var(--text-muted)]">
            YouTube™ and YouTube Shorts™ are trademarks of Google LLC. Reference to platform features, specifications, and upload limits is for technical compatibility and educational purposes only.
          </p>
        </section>

        {/* Limitation of Liability */}
        <section className="p-6 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] space-y-3">
          <h2 className="text-base font-semibold text-[var(--text-ink)]">
            5. Limitation of Liability
          </h2>
          <p>
            Creovly is provided on an &ldquo;AS IS&rdquo; and &ldquo;AS AVAILABLE&rdquo; basis without warranties of any kind, whether express or implied. To the maximum extent permitted by law, Creovly shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use the software, loss of data, or decisions made based on tool outputs.
          </p>
        </section>

        {/* Contact */}
        <section className="p-6 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-subtle)] space-y-2">
          <h2 className="text-base font-semibold text-[var(--text-ink)]">
            6. Inquiries and Contact
          </h2>
          <p className="text-xs text-[var(--text-body)]">
            For questions regarding these Terms of Service, please contact{' '}
            <a href="mailto:support@creovly.com" className="text-[var(--brand-accent)] font-medium hover:underline">
              support@creovly.com
            </a>{' '}
            or visit our{' '}
            <LocalizedLink href="/contact" className="text-[var(--brand-accent)] font-medium hover:underline">
              Contact Form
            </LocalizedLink>.
          </p>
        </section>
      </div>
    </div>
  );
}

