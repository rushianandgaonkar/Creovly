import React from 'react';
import Link from 'next/link';
import Wordmark from '../ui/Wordmark';
import { siteConfig, footerNavigation, secondaryNavItems } from '@/config/site';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-[var(--border-hairline)] bg-[var(--bg-canvas)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand & Mission Column */}
          <div className="col-span-2">
            <Link href="/" className="inline-flex focus-ring rounded-md" aria-label="Creovly Homepage">
              <Wordmark size="md" />
            </Link>
            <p className="mt-3 text-sm text-[var(--text-body)] max-w-sm leading-relaxed">
              {siteConfig.description}
            </p>

            <div className="mt-6 flex items-center gap-3 text-xs text-[var(--text-muted)]">
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                Creator tools & publishing checklist
              </span>
            </div>
            <nav aria-label="More from Creovly" className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs">
              {secondaryNavItems.map((item) => <Link key={item.href} href={item.href} className="focus-ring rounded text-[var(--text-body)] hover:text-[var(--text-ink)]">{item.name} <span className="text-[var(--text-muted)]">({item.badge})</span></Link>)}
            </nav>
          </div>

          {/* Category Links Columns */}
          {footerNavigation.categories.slice(0, 2).map((col) => (
            <div key={col.title} className="flex flex-col gap-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--text-ink)] font-semibold">
                {col.title}
              </h4>
              <ul className="space-y-2 text-xs">
                {col.items.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-[var(--text-body)] hover:text-[var(--text-ink)] transition-colors focus-ring rounded"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Money & Publishing Column */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--text-ink)] font-semibold">
              {footerNavigation.categories[2].title}
            </h4>
            <ul className="space-y-2 text-xs">
              {footerNavigation.categories[2].items.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-[var(--text-body)] hover:text-[var(--text-ink)] transition-colors focus-ring rounded"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[var(--border-hairline-subtle)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--text-muted)]">
          <p className="font-mono">
            &copy; {currentYear} {siteConfig.name} ({siteConfig.domain}). All rights reserved.
          </p>

          {footerNavigation.company.length > 0 && <ul className="flex flex-wrap items-center gap-4 sm:gap-6">
            {footerNavigation.company.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="hover:text-[var(--text-ink)] transition-colors focus-ring rounded"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>}
        </div>
      </div>
    </footer>
  );
};

export default Footer;

