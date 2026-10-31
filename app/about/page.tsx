import Link from 'next/link';
import { createPageMetadata } from '@/lib/metadata';
import PageHero from '@/components/ui/PageHero';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import SpotlightCard from '@/components/ui/SpotlightCard';

export const metadata = createPageMetadata({
  title: 'About Creovly — The Pre-Publish Workspace for YouTube Creators',
  description:
    'Learn why Creovly was built: private, in-browser creator tools engineered to prepare thumbnails, stress-test titles, verify Shorts safe zones, and model revenue.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      {/* Precision Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)] mb-6">
        <Link href="/" className="hover:text-[var(--text-ink)] transition-colors">
          Home
        </Link>
        <span aria-hidden="true" className="text-[var(--text-faint)]">/</span>
        <span className="text-[var(--text-ink)] font-semibold" aria-current="page">
          About
        </span>
      </nav>

      {/* Hero Section */}
      <PageHero tone="violet" className="mb-14">
        <div className="inline-flex items-center gap-2 mb-2">
          <Badge variant="neutral">Our Mission</Badge>
          <span className="text-xs font-mono text-[var(--text-muted)]">Built for YouTube Creators</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[var(--text-ink)] leading-tight">
          Create smarter. <span className="block sm:inline">Publish better.</span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-[var(--text-body)] max-w-2xl leading-relaxed">
          Creovly is an independent, privacy-first pre-publish command center. We give digital video creators fast, client-side tools to inspect thumbnails, stress-test title hooks, eliminate Shorts UI overlap, and project channel revenue—all before hitting publish.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button href="/studio" variant="primary">Launch Publish Studio</Button>
          <Button href="/tools" variant="outline">Explore All Tools</Button>
        </div>
      </PageHero>

      {/* The Origin Story & Problem */}
      <div className="space-y-16">
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-accent)]" />
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]">
              The Problem We Solved
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-ink)]">
            Creators shouldn’t have to compromise privacy just to resize an image or check a title.
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-body)] leading-relaxed">
            In modern content creation, the hours right before uploading are critical. Creators need to compress thumbnails under YouTube’s strict 2 MB mobile upload limit, confirm that titles won’t truncate on smartphone screens, ensure subtitles aren’t hidden behind Shorts like buttons, and calculate RPM revenue scenarios.
          </p>
          <p className="text-sm sm:text-base text-[var(--text-body)] leading-relaxed">
            Historically, doing this meant uploading unreleased video thumbnails to sketchy ad-riddled websites, surrendering personal analytics data, or signing up for bloated monthly subscriptions. We built Creovly to eliminate that compromise entirely.
          </p>
        </section>

        {/* 3 Core Pillars */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-accent)]" />
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]">
              Engineering Principles
            </span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-[var(--text-ink)]">
            What makes Creovly different
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SpotlightCard className="p-6 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 font-mono text-sm font-bold">
                01
              </div>
              <h3 className="text-base font-semibold text-[var(--text-ink)]">
                100% In-Browser Execution
              </h3>
              <p className="text-xs text-[var(--text-body)] leading-relaxed">
                Every image compression, background removal, and mathematical calculation runs locally in your device’s browser. Your creative assets never touch our servers.
              </p>
            </SpotlightCard>

            <SpotlightCard className="p-6 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-600 font-mono text-sm font-bold">
                02
              </div>
              <h3 className="text-base font-semibold text-[var(--text-ink)]">
                Calibrated Platform Specs
              </h3>
              <p className="text-xs text-[var(--text-body)] leading-relaxed">
                Built against verified YouTube specifications: 1280×720 aspect ratios, 2 MB mobile caps, 9:16 vertical safe margins, and official Partner Program math.
              </p>
            </SpotlightCard>

            <SpotlightCard className="p-6 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-600 font-mono text-sm font-bold">
                03
              </div>
              <h3 className="text-base font-semibold text-[var(--text-ink)]">
                Zero Paywalls & Zero Spam
              </h3>
              <p className="text-xs text-[var(--text-body)] leading-relaxed">
                No forced account registrations, no credit card paywalls, and no pop-ups. Just reliable, precision tools ready when you need to upload.
              </p>
            </SpotlightCard>
          </div>
        </section>

        {/* Explore Workspaces Callout */}
        <section className="p-8 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-[var(--text-ink)]">
              Ready to streamline your pre-publish workflow?
            </h3>
            <p className="text-xs text-[var(--text-body)] max-w-xl">
              Open Publish Studio to consolidate your title, thumbnail, and checklist into a complete, upload-ready package.
            </p>
          </div>
          <Button href="/studio" variant="primary" size="md">
            Launch Studio &rarr;
          </Button>
        </section>
      </div>
    </div>
  );
}

