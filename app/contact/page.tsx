import Link from 'next/link';
import { createPageMetadata } from '@/lib/metadata';
import PageHero from '@/components/ui/PageHero';
import Badge from '@/components/ui/Badge';
import ContactForm from '@/components/contact/ContactForm';

export const metadata = createPageMetadata({
  title: 'Contact Us — Creovly',
  description:
    'Have feedback, a feature suggestion, or questions about Creovly? Reach out to our team and we will get back to you.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      {/* Precision Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)] mb-6">
        <Link href="/" className="hover:text-[var(--text-ink)] transition-colors">
          Home
        </Link>
        <span aria-hidden="true" className="text-[var(--text-faint)]">/</span>
        <span className="text-[var(--text-ink)] font-semibold" aria-current="page">
          Contact
        </span>
      </nav>

      <PageHero tone="blue" className="mb-12">
        <div className="inline-flex items-center gap-2 mb-2">
          <Badge variant="neutral">Creator Support</Badge>
          <span className="text-xs font-mono text-[var(--text-muted)]">We Listen to Every Creator</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-ink)]">
          Contact Creovly
        </h1>
        <p className="mt-3 text-sm sm:text-base text-[var(--text-body)] leading-relaxed">
          Have an idea for a new creator tool, feedback on Publish Studio, or need assistance? Send us a message below or write directly to <a href="mailto:support@creovly.com" className="text-[var(--brand-accent)] font-semibold underline">support@creovly.com</a>.
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
              Direct Contact
            </h3>
            <p className="leading-relaxed">
              Prefer writing directly from your mail client? Email our creator inbox anytime:
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
              Response Time
            </h3>
            <p className="leading-relaxed text-[var(--text-muted)]">
              We typically review creator feedback and support inquiries within 24–48 business hours.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] space-y-2">
            <h3 className="font-semibold text-sm text-[var(--text-ink)]">
              Feature Requests
            </h3>
            <p className="leading-relaxed text-[var(--text-muted)]">
              Most tools on Creovly were built directly from creator suggestions. If a pre-publish step is frustrating in your workflow, tell us!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

