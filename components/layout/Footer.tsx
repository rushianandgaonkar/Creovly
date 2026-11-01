/* Hallmark · genre: modern-minimal · macrostructure: Workbench · theme: Cobalt · nav: N1b · footer: Ft2 */
/* Hallmark · pre-emit critique: P5 H5 E5 S5 R5 V5 */
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
        { name: t.shorts.title, href: '/tools/youtube-shorts-safe-zone' },
      ],
    },
    {
      title: t.common.footer.categories.title,
      items: [
        { name: t.titleChecker.title, href: '/tools/youtube-title-checker' },
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
    { name: t.common.nav.about, href: '/about' },
    { name: t.common.nav.contact, href: '/contact' },
    { name: t.common.nav.privacy, href: '/privacy' },
    { name: t.common.nav.terms, href: '/terms' },
  ];

  const secondaryNav = [
    { name: t.common.nav.studio, href: '/studio' },
    { name: t.common.nav.guides, href: '/guides' },
  ];

  return (
    <footer className="mt-auto border-t border-[var(--border-hairline)] bg-[var(--bg-canvas)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
        {/* Real-time Local System Status Bar */}
        <div className="p-4 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] flex flex-wrap items-center justify-between gap-3 text-xs mb-10 shadow-2xs">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="font-mono text-[11px] font-semibold text-[var(--text-ink)] uppercase tracking-wider">
              {t.common.footer.systemStatus}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-[11px] font-mono text-[var(--text-muted)]">
            <span>{t.common.footer.localCanvas}</span>
            <span aria-hidden="true">•</span>
            <span>{t.common.footer.zeroUploads}</span>
            <span aria-hidden="true">•</span>
            <span>{t.common.footer.safeZip}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand & Mission Column */}
          <div className="md:col-span-2 space-y-4">
            <LocalizedLink href="/" className="inline-flex focus-ring rounded-md" aria-label="Creovly Homepage">
              <Wordmark size="md" />
            </LocalizedLink>
            <p className="text-xs text-[var(--text-body)] max-w-sm leading-relaxed">
              {t.home.hero.description}
            </p>

            <div className="flex items-center gap-2 text-[11px] font-mono text-[var(--text-muted)]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
              <span>{t.common.footer.clientOnlyBadge}</span>
            </div>

            <nav aria-label="Secondary links" className="flex flex-wrap gap-x-4 gap-y-1 text-xs pt-1">
              {secondaryNav.map((item) => (
                <LocalizedLink
                  key={item.href}
                  href={item.href}
                  className="focus-ring rounded text-[var(--text-muted)] hover:text-[var(--text-ink)] transition-colors"
                >
                  {item.name}
                </LocalizedLink>
              ))}
            </nav>
          </div>

          {/* Category Columns */}
          {categories.map((col) => (
            <div key={col.title} className="flex flex-col gap-3">
              <h4 className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-ink)] font-semibold">
                {col.title}
              </h4>
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
          <div className="flex items-center gap-2 text-[11px] font-mono text-[var(--text-muted)]">
            <span>{t.common.footer.clientArchitecture}</span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 pt-4 border-t border-[var(--border-hairline-subtle)] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[var(--text-muted)]">
          <p className="font-mono">
            &copy; {currentYear} {siteConfig.name}. {t.common.footer.copyright}
          </p>
          <div className="flex flex-wrap items-center gap-2 text-[10px] text-[var(--text-muted)]">
            <span>{t.common.footer.sampleMedia}</span>
            <span aria-hidden="true">•</span>
            <span>{t.common.footer.disclaimer}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
