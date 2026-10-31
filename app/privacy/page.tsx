import Link from 'next/link';
import { createPageMetadata } from '@/lib/metadata';
import PageHero from '@/components/ui/PageHero';
import Badge from '@/components/ui/Badge';

export const metadata = createPageMetadata({
  title: 'Privacy Policy — Creovly',
  description:
    'Creovly is engineered with a strict 100% local, client-side privacy architecture. Your images, titles, and financial scenarios never leave your browser.',
  path: '/privacy',
});

export default function PrivacyPage() {
  const lastUpdated = 'October 31, 2026';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)] mb-6">
        <Link href="/" className="hover:text-[var(--text-ink)] transition-colors">
          Home
        </Link>
        <span aria-hidden="true" className="text-[var(--text-faint)]">/</span>
        <span className="text-[var(--text-ink)] font-semibold" aria-current="page">
          Privacy Policy
        </span>
      </nav>

      <PageHero tone="teal" className="mb-12">
        <div className="inline-flex items-center gap-2 mb-2">
          <Badge variant="neutral">Privacy Architecture</Badge>
          <span className="text-xs font-mono text-[var(--text-muted)]">Last Updated: {lastUpdated}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-ink)]">
          Privacy Policy
        </h1>
        <p className="mt-3 text-sm sm:text-base text-[var(--text-body)] leading-relaxed">
          At Creovly, privacy is not an afterthought or a policy disclaimer—it is the foundational engineering principle of our software. We believe your creative assets, channel drafts, and income projections belong exclusively to you.
        </p>
      </PageHero>

      <div className="space-y-10 text-sm text-[var(--text-body)] leading-relaxed">
        {/* Core Architecture */}
        <section className="p-6 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" aria-hidden="true" />
            <h2 className="text-base font-semibold text-[var(--text-ink)]">
              1. 100% Client-Side Processing Architecture
            </h2>
          </div>
          <p>
            Unlike traditional creator SaaS platforms, all file processing tools on Creovly (including the YouTube Thumbnail Compressor, Thumbnail Resizer, Logo Background Remover, Shorts Safe Zone Checker, and Title Checker) execute entirely inside your local web browser session using modern Web APIs (HTML5 Canvas, WebAssembly, and local JavaScript threads).
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-[var(--text-muted)]">
            <li>Your uploaded images and thumbnail graphics are never transmitted to any cloud server or third-party storage.</li>
            <li>Calculated financial models and RPM scenarios remain solely in temporary browser memory.</li>
            <li>No files, video assets, or drafts are logged or retained once you close or refresh your browser tab.</li>
          </ul>
        </section>

        {/* Information We Collect */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-[var(--text-ink)]">
            2. Information We Do and Do Not Collect
          </h2>
          <p>
            <strong>No Account Required:</strong> You do not need to register an account, authenticate via Google or YouTube OAuth, or provide personal payment credentials to use Creovly tools.
          </p>
          <p>
            <strong>Voluntary Contact Inquiries:</strong> If you choose to contact us through our Contact form or email, we collect only the information you voluntarily submit (such as your name, email address, optional channel name, and inquiry details) strictly for the purpose of responding to your message. We never sell, rent, or distribute contact lists to third-party data brokers.
          </p>
        </section>

        {/* Local Storage */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-[var(--text-ink)]">
            3. Local Storage & Cookies
          </h2>
          <p>
            Creovly does not use tracking cookies for advertising profiling. We utilize standard browser <code>localStorage</code> solely to save your local workspace preferences:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>Theme Preference:</strong> Storing your light or dark mode selection (<code>creovly-theme</code>).</li>
            <li><strong>Checklist State:</strong> Persisting checked pre-publish milestones in your browser so you do not lose progress if you navigate away.</li>
          </ul>
          <p>
            You can clear these saved items at any time through your browser’s site data settings or by resetting the tool workspace.
          </p>
        </section>

        {/* Analytics */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-[var(--text-ink)]">
            4. Performance & Analytics
          </h2>
          <p>
            To understand high-level site traffic and identify broken links, we may utilize privacy-respecting, anonymized website analytics (such as Google Analytics 4). Analytics measurements collect aggregated technical information such as browser type, referring URLs, and pages visited, without collecting personal creator identities or file contents. IP anonymization is enforced where applicable.
          </p>
        </section>

        {/* Third-Party Links */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-[var(--text-ink)]">
            5. External Links & YouTube Trademarks
          </h2>
          <p>
            Creovly provides educational links to official platform documentation (e.g., Google Support, YouTube Help). We are not responsible for the privacy practices of external third-party sites.
          </p>
          <p className="text-xs text-[var(--text-muted)]">
            Creovly is an independent creator workspace. YouTube™ is a registered trademark of Google LLC. Creovly is not affiliated with, endorsed by, or sponsored by YouTube or Google LLC.
          </p>
        </section>

        {/* Contact */}
        <section className="pt-6 border-t border-[var(--border-hairline)] space-y-2">
          <h2 className="text-base font-semibold text-[var(--text-ink)]">
            6. Contact & Data Inquiries
          </h2>
          <p>
            If you have questions about this Privacy Policy or our client-side architecture, please reach out through our{' '}
            <Link href="/contact" className="text-[var(--brand-accent)] font-medium hover:underline">
              Contact Page
            </Link>{' '}
            or email us directly at{' '}
            <a href="mailto:support@creovly.com" className="text-[var(--brand-accent)] font-medium hover:underline">
              support@creovly.com
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
}

