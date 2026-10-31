import Link from 'next/link';
import { createPageMetadata } from '@/lib/metadata';
import PageHero from '@/components/ui/PageHero';
import Badge from '@/components/ui/Badge';

export const metadata = createPageMetadata({
  title: 'Terms of Service — Creovly',
  description:
    'Review the terms of service, acceptable use guidelines, and creator intellectual property rights for Creovly.',
  path: '/terms',
});

export default function TermsPage() {
  const lastUpdated = 'October 31, 2026';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)] mb-6">
        <Link href="/" className="hover:text-[var(--text-ink)] transition-colors">
          Home
        </Link>
        <span aria-hidden="true" className="text-[var(--text-faint)]">/</span>
        <span className="text-[var(--text-ink)] font-semibold" aria-current="page">
          Terms of Service
        </span>
      </nav>

      <PageHero tone="indigo" className="mb-12">
        <div className="inline-flex items-center gap-2 mb-2">
          <Badge variant="neutral">Legal & Terms</Badge>
          <span className="text-xs font-mono text-[var(--text-muted)]">Effective Date: {lastUpdated}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-ink)]">
          Terms of Service
        </h1>
        <p className="mt-3 text-sm sm:text-base text-[var(--text-body)] leading-relaxed">
          Please read these Terms of Service carefully before using Creovly. By accessing or using our website, tools, or workspaces, you agree to be bound by these terms.
        </p>
      </PageHero>

      <div className="space-y-10 text-sm text-[var(--text-body)] leading-relaxed">
        {/* Purpose */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-[var(--text-ink)]">
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
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-[var(--text-ink)]">
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
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-[var(--text-ink)]">
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
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-[var(--text-ink)]">
            5. Limitation of Liability
          </h2>
          <p>
            Creovly is provided on an &ldquo;AS IS&rdquo; and &ldquo;AS AVAILABLE&rdquo; basis without warranties of any kind, whether express or implied. To the maximum extent permitted by law, Creovly shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use the software, loss of data, or decisions made based on tool outputs.
          </p>
        </section>

        {/* Contact */}
        <section className="pt-6 border-t border-[var(--border-hairline)] space-y-2">
          <h2 className="text-base font-semibold text-[var(--text-ink)]">
            6. Inquiries
          </h2>
          <p>
            For questions regarding these terms, please visit our{' '}
            <Link href="/contact" className="text-[var(--brand-accent)] font-medium hover:underline">
              Contact Page
            </Link>{' '}
            or contact us at{' '}
            <a href="mailto:support@creovly.com" className="text-[var(--brand-accent)] font-medium hover:underline">
              support@creovly.com
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
}

