'use client';

import React from 'react';
import PageHero from '@/components/ui/PageHero';
import Badge from '@/components/ui/Badge';
import ConsentSettings from '@/components/privacy/ConsentSettings';
import { useI18n, LocalizedLink } from '@/lib/i18n';

export default function PrivacyContent() {
  const { t } = useI18n();
  const privacy = t.pages.privacy;

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
              1. 100% Client-Side Processing Architecture
            </h2>
          </div>
          <p>
            Unlike traditional creator SaaS platforms, all file processing tools on Creovly (including the YouTube Thumbnail Compressor, Thumbnail Resizer, Logo Background Remover, Shorts Safe Zone Checker, and Title Checker) execute entirely inside your local web browser session using modern Web APIs (HTML5 Canvas, File API, Web Workers, and local JavaScript threads).
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-[var(--text-muted)]">
            <li>Your uploaded images, graphics, and thumbnail artwork are processed entirely in-memory and are never transmitted to any Creovly server, cloud storage, or external database.</li>
            <li>Calculated financial models, RPM estimates, and scenario figures remain solely in temporary browser memory.</li>
            <li>No media files, raw video assets, or photographic uploads are ever logged, cached, or retained on servers.</li>
          </ul>
        </section>

        {/* Information We Collect */}
        <section className="p-6 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] space-y-3">
          <h2 className="text-base font-semibold text-[var(--text-ink)]">
            2. Information We Do and Do Not Collect
          </h2>
          <p>
            <strong>No Account Required:</strong> You do not need to register an account, authenticate via Google or YouTube OAuth, or provide personal payment credentials to use Creovly tools.
          </p>
          <p>
            <strong>Voluntary Contact Communications &amp; Email Processing:</strong> When you use our Contact page, the form formats your inquiry into an email draft in your local email application addressed to <code>support@creovly.com</code> rather than automatically submitting data to a website database. Delivery is not completed until you explicitly press &ldquo;Send&rdquo; in your email client. When you send an email to us, your message, sender address, and any optional information (such as your channel handle) are routed through and retained by standard email infrastructure—both by your email provider and by Creovly&rsquo;s email service provider (inbox servers)—strictly so our team can read and answer your communication. Creovly does not store contact submissions in browser <code>localStorage</code> or on web application servers, and we never sell, rent, or distribute contact details to third-party data brokers or marketing vendors.
          </p>
        </section>

        {/* Local Storage Inventory */}
        <section className="p-6 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] space-y-3">
          <h2 className="text-base font-semibold text-[var(--text-ink)]">
            3. Local Browser Storage Inventory
          </h2>
          <p>
            To provide a seamless creator experience without requiring cloud logins or user accounts, Creovly utilizes standard browser <code>localStorage</code> on your physical device. We strictly disclose all stored keys below:
          </p>
          <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-subtle)] p-4 space-y-3 text-xs">
            <div className="space-y-1">
              <span className="font-mono font-semibold text-[var(--text-ink)]">creovly-studio-draft-v1</span>
              <p className="text-[var(--text-body)]">
                Used in <strong>Publish Studio</strong>. Saves your project metadata (video title, description text, targets, and packaging settings) locally on your physical device only when you explicitly select <strong>&ldquo;Save draft&rdquo;</strong> (or press <kbd className="font-mono text-[10px] px-1 py-0.5 rounded bg-[var(--bg-canvas-elevated)] border border-[var(--border-hairline)]">Ctrl+S</kbd> / <kbd className="font-mono text-[10px] px-1 py-0.5 rounded bg-[var(--bg-canvas-elevated)] border border-[var(--border-hairline)]">⌘S</kbd>). Publish Studio does <em>not</em> automatically save every edit as you type; saving is an intentional creator action. <em>Binary image files are never stored in localStorage.</em> You can reload your saved project with &ldquo;Load saved draft&rdquo; or delete it permanently using &ldquo;Remove Saved Draft&rdquo;.
              </p>
            </div>
            <div className="border-t border-[var(--border-hairline)] pt-2.5 space-y-1">
              <span className="font-mono font-semibold text-[var(--text-ink)]">creovly-checklist</span>
              <p className="text-[var(--text-body)]">
                Used in the <strong>Pre-Publish Checklist</strong>. Saves checked verification milestones so your workflow status is preserved across visits. You can reset this at any time using the &ldquo;Reset Checklist&rdquo; button.
              </p>
            </div>
            <div className="border-t border-[var(--border-hairline)] pt-2.5 space-y-1">
              <span className="font-mono font-semibold text-[var(--text-ink)]">creovly-theme</span>
              <p className="text-[var(--text-body)]">
                Stores your light or dark display preference (<code>light</code> or <code>dark</code>) to prevent screen flickering between page navigations.
              </p>
            </div>
            <div className="border-t border-[var(--border-hairline)] pt-2.5 space-y-1">
              <span className="font-mono font-semibold text-[var(--text-ink)]">creovly-analytics-consent</span>
              <p className="text-[var(--text-body)]">
                Stores your explicit analytics cookie choice (<code>granted</code> or <code>denied</code>) when responding to our consent banner.
              </p>
            </div>
          </div>
        </section>

        {/* Analytics & Cookies Controls */}
        <section className="p-6 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] space-y-4">
          <h2 className="text-base font-semibold text-[var(--text-ink)]">
            4. Analytics, Cookies &amp; Consent Management
          </h2>
          <p>
            Creovly uses Google Analytics 4 (GA4) with IP anonymization enabled strictly to measure aggregate traffic metrics (e.g. daily active users, top-performing creator utilities, and device viewport categories).
          </p>
          <div className="pt-2">
            <ConsentSettings />
          </div>
        </section>

        {/* Third-Party Links & Disclaimers */}
        <section className="p-6 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] space-y-3">
          <h2 className="text-base font-semibold text-[var(--text-ink)]">
            5. Independent Platform Status &amp; Fair Use
          </h2>
          <p>
            Creovly is an independent software tool and is not affiliated with, endorsed by, sponsored by, or partner with YouTube, Google LLC, Alphabet Inc., or any of their subsidiaries. YouTube™ and the YouTube logo are registered trademarks of Google LLC.
          </p>
        </section>

        {/* Contact Information */}
        <section className="p-6 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-subtle)] space-y-2">
          <h2 className="text-base font-semibold text-[var(--text-ink)]">
            6. Contact Data Protection Officer
          </h2>
          <p className="text-xs text-[var(--text-body)]">
            If you have questions regarding this Privacy Policy or your data rights, please contact our team at{' '}
            <a href="mailto:support@creovly.com" className="text-[var(--brand-accent)] font-medium hover:underline">
              support@creovly.com
            </a>{' '}
            or use our{' '}
            <LocalizedLink href="/contact" className="text-[var(--brand-accent)] font-medium hover:underline">
              Contact Form
            </LocalizedLink>.
          </p>
        </section>
      </div>
    </div>
  );
}

