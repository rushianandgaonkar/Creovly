import Link from 'next/link';
import { createPageMetadata } from '@/lib/metadata';
import PageHero from '@/components/ui/PageHero';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import SpotlightCard from '@/components/ui/SpotlightCard';

export const metadata = createPageMetadata({
  title: 'About Creovly — The Pre-Publish Workspace for YouTube Creators',
  description:
    'Learn about Creovly: an independent, privacy-first pre-publish command center offering 100% in-browser YouTube creator tools to compress thumbnails, test title hooks, check Shorts safe zones, and model revenue.',
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
          Creovly is an independent, privacy-first pre-publish workspace. We provide digital video creators, editors, and channel managers with fast, client-side tools to inspect thumbnails, stress-test title hooks, eliminate Shorts UI overlap, and project channel revenue—all before hitting publish.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button href="/studio" variant="primary">Launch Publish Studio</Button>
          <Button href="/tools" variant="outline">Explore All Tools</Button>
        </div>
      </PageHero>

      <div className="space-y-16">
        {/* What Creovly Is & Who It's For */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-accent)]" />
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]">
              Who We Serve
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-ink)]">
            A dedicated pre-flight workbench for modern video creators
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-body)] leading-relaxed">
            Creovly is specifically designed for <strong>YouTube creators, video editors, thumbnail artists, and channel growth teams</strong>. The critical moments right before uploading define whether a video captures clicks or gets lost in the feed. Creovly exists to make those final verification steps fast, rigorous, and completely private.
          </p>
        </section>

        {/* The Problem We Solved */}
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
            Before uploading to YouTube, creators must navigate strict technical constraints: keeping thumbnails under the 2 MB mobile Studio upload cap (or up to 50 MB on desktop), ensuring primary title hooks land within the first 50 characters to avoid mobile truncation, checking that Shorts subtitles aren’t hidden behind engagement buttons, and accurately modeling revenue without flawed double deductions.
          </p>
          <p className="text-sm sm:text-base text-[var(--text-body)] leading-relaxed">
            Historically, solving these issues meant uploading unreleased media assets to ad-cluttered third-party sites, surrendering channel data, or purchasing expensive monthly SaaS subscriptions. We built Creovly to eliminate that friction: precision tools that process everything in your browser, with zero server uploads and zero paywalls.
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
                Every image compression, background cutout, and mathematical projection runs locally using modern Web APIs (HTML5 Canvas, File API, and Web Workers). Your creative media files never touch our servers.
              </p>
            </SpotlightCard>

            <SpotlightCard className="p-6 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-600 font-mono text-sm font-bold">
                02
              </div>
              <h3 className="text-base font-semibold text-[var(--text-ink)]">
                Calibrated Platform Standards
              </h3>
              <p className="text-xs text-[var(--text-body)] leading-relaxed">
                Built against verified YouTube specifications: 16:9 ratios (from 1280×720 HD up to 3840×2160), mobile 2 MB caps, 9:16 vertical safe margins, and official YouTube Partner Program formulas.
              </p>
            </SpotlightCard>

            <SpotlightCard className="p-6 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-600 font-mono text-sm font-bold">
                03
              </div>
              <h3 className="text-base font-semibold text-[var(--text-ink)]">
                100% Free & No Sign-Up
              </h3>
              <p className="text-xs text-[var(--text-body)] leading-relaxed">
                No forced user registration, no credit cards, and no intrusive subscriptions. All core tools are completely free to use whenever you need to prepare an upload.
              </p>
            </SpotlightCard>
          </div>
        </section>

        {/* Independent Status Disclaimer & Legal Transparency */}
        <section className="p-6 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-subtle)] space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-zinc-400" aria-hidden="true" />
            <h2 className="text-base font-semibold text-[var(--text-ink)]">
              Independent Status & Trademark Notice
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[var(--text-body)] leading-relaxed">
            Creovly is an independent creator utility developed to support content publishers with workflow tools and educational documentation. Creovly is <strong>not affiliated with, endorsed by, sponsored by, or officially associated with YouTube, Google LLC, Alphabet Inc., or any of their subsidiaries</strong>.
          </p>
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            YouTube™ and the YouTube logo are registered trademarks of Google LLC. All product names, platform references, and trademarks mentioned on this website belong to their respective owners and are used strictly for identification and educational reference under fair use.
          </p>
        </section>

        {/* Contact and Support */}
        <section className="p-6 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" aria-hidden="true" />
            <h2 className="text-base font-semibold text-[var(--text-ink)]">
              Get in Touch
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[var(--text-body)] leading-relaxed">
            Have feedback on our tools, noticed an update in YouTube platform specifications, or need technical assistance? Our team is here to help:
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-1">
            <a
              href="mailto:support@creovly.com"
              className="text-xs font-semibold text-[var(--brand-accent)] hover:underline inline-flex items-center gap-1.5"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              support@creovly.com
            </a>
            <span className="text-xs text-[var(--text-muted)]">&bull;</span>
            <Link
              href="/contact"
              className="text-xs font-semibold text-[var(--text-ink)] hover:underline"
            >
              Contact Form &rarr;
            </Link>
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
