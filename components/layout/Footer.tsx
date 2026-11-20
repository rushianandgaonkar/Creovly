'use client';

import React from 'react';
import Wordmark from '../ui/Wordmark';
import LanguageSelector from './LanguageSelector';
import { siteConfig } from '@/config/site';
import { useI18n, LocalizedLink } from '@/lib/i18n';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useI18n();

  const categories = [
    {
      title: t.common.footer.categories.thumbnail,
      items: [
        { name: t.compressor.title, href: '/tools/youtube-thumbnail-compressor' },
        { name: t.resizer.title, href: '/tools/youtube-thumbnail-resizer' },
        { name: t.logoRemover.title, href: '/tools/logo-background-remover' },
        { name: t.profilePicture.title, href: '/tools/youtube-profile-picture-resizer' },
        { name: t.thumbnailDownloader.title, href: '/tools/youtube-thumbnail-downloader' },
        { name: t.thumbnailTester.title, href: '/tools/youtube-thumbnail-tester' },
        { name: t.shorts.title, href: '/tools/youtube-shorts-safe-zone' },
      ],
    },
    {
      title: t.common.footer.categories.title,
      items: [
        { name: t.titleChecker.title, href: '/tools/youtube-title-checker' },
        { name: t.linkGenerator.title, href: '/tools/youtube-link-generator' },
        { name: t.chapterGenerator.title, href: '/tools/youtube-timestamp-generator' },
        { name: t.scriptLength.title, href: '/tools/words-to-minutes-calculator' },
        { name: t.common.nav.checklist, href: '/checklist' },
      ],
    },
    {
      title: t.common.footer.categories.moneyGrowth,
      items: [
        { name: t.calculator.revenue.title, href: '/tools/youtube-revenue-calculator' },
        { name: t.calculator.rpm.title, href: '/tools/youtube-rpm-calculator' },
        { name: t.calculator.watchHours.title, href: '/tools/youtube-watch-hours-calculator' },
        { name: t.calculator.monetization.title, href: '/tools/youtube-monetization-calculator' },
        { name: t.engagement.title, href: '/tools/engagement-rate-calculator' },
      ],
    },
    {
      title: t.common.footer.categories.publishing,
      items: [
        { name: t.common.nav.studio, href: '/studio' },
        { name: t.common.nav.checklist, href: '/checklist' },
        { name: t.common.nav.guides, href: '/guides' },
      ],
    },
  ];

  const companyLinks = [
    { name: `${t.common.nav.about} / Press`, href: '/about' },
    { name: t.common.nav.contact, href: '/contact' },
    { name: t.common.nav.privacy, href: '/privacy' },
    { name: t.common.nav.terms, href: '/terms' },
  ];

  return (
    <footer className="mt-auto border-t border-[var(--border-hairline)] bg-[var(--bg-canvas)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand & Mission Column */}
          <div className="md:col-span-2 space-y-4">
            <LocalizedLink href="/" className="inline-flex focus-ring rounded-md" aria-label="Creovly Homepage">
              <Wordmark size="md" />
            </LocalizedLink>
            <p className="text-xs text-[var(--text-body)] max-w-sm leading-relaxed">
              {t.home.hero.description}
            </p>
          </div>

          {/* Category Columns */}
          {categories.map((col) => (
            <div key={col.title} className="flex flex-col gap-3">
              <h2 className="text-xs text-[var(--text-ink)] font-semibold">
                {col.title}
              </h2>
              <ul className="space-y-2 text-xs">
                {col.items.map((item) => (
                  <li key={item.href}>
                    <LocalizedLink
                      href={item.href}
                      className="text-[var(--text-body)] hover:text-[var(--text-ink)] transition-colors focus-ring rounded"
                    >
                      {item.name}
                    </LocalizedLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Language Selector Bar */}
        <div className="mt-10 pt-6 border-t border-[var(--border-hairline-subtle)]">
          <LanguageSelector variant="footer" />
        </div>

        {/* Company & Legal Navigation */}
        <div className="mt-10 pt-6 border-t border-[var(--border-hairline-subtle)] flex flex-wrap items-center justify-between gap-4 text-xs">
          <nav aria-label="Company and Legal links" className="flex flex-wrap gap-x-6 gap-y-2 text-[var(--text-body)]">
            {companyLinks.map((item) => (
              <LocalizedLink
                key={item.href}
                href={item.href}
                className="hover:text-[var(--text-ink)] transition-colors focus-ring rounded"
              >
                {item.name}
              </LocalizedLink>
            ))}
          </nav>
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 pt-4 border-t border-[var(--border-hairline-subtle)] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[var(--text-muted)]">
          <p>
            &copy; {currentYear} {siteConfig.name}. {t.common.footer.copyright}
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span>{t.common.footer.sampleMedia}</span>
            <span>{t.common.footer.disclaimer}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
