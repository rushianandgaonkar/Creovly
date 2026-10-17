/* Hallmark · genre: modern-minimal · macrostructure: Workbench · theme: Cobalt · nav: N1b · footer: Ft2 */
/* Hallmark · pre-emit critique: P5 H5 E5 S5 R5 V5 */
import React from 'react';
import Link from 'next/link';
import Wordmark from '../ui/Wordmark';
import { siteConfig, footerNavigation, secondaryNavItems } from '@/config/site';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

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
              Browser Engine: Fully Operational
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-[11px] font-mono text-[var(--text-muted)]">
            <span>Local Canvas Active</span>
            <span aria-hidden="true">•</span>
            <span>Zero Cloud Uploads</span>
            <span aria-hidden="true">•</span>
            <span>Memory-Safe ZIP Export</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand & Mission Column */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="inline-flex focus-ring rounded-md" aria-label="Creovly Homepage">
              <Wordmark size="md" />
            </Link>
            <p className="text-xs text-[var(--text-body)] max-w-sm leading-relaxed">
              {siteConfig.description}
            </p>

            <div className="flex items-center gap-2 text-[11px] font-mono text-[var(--text-muted)]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
              <span>100% Client-side · Private · No accounts required</span>
            </div>

            <nav aria-label="Secondary links" className="flex flex-wrap gap-x-4 gap-y-1 text-xs pt-1">
              {secondaryNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="focus-ring rounded text-[var(--text-muted)] hover:text-[var(--text-ink)] transition-colors"
                >
                  {item.name}
                  {item.badge && <span className="text-[10px] font-mono text-[var(--brand-accent)] ml-1">[{item.badge}]</span>}
                </Link>
              ))}
            </nav>
          </div>

          {/* Category Columns */}
          {footerNavigation.categories.map((col) => (
            <div key={col.title} className="flex flex-col gap-3">
              <h4 className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-ink)] font-semibold">
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
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-[var(--border-hairline-subtle)] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[var(--text-muted)]">
          <p className="font-mono">
            &copy; {currentYear} {siteConfig.name}. All processing occurs locally in your browser.
          </p>
          <p className="font-mono text-[10px]">YouTube™ is a trademark of Google LLC.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
