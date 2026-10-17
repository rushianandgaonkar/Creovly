/* Hallmark · genre: modern-minimal · macrostructure: Workbench · theme: Cobalt · nav: N1b · footer: Ft2 */
/* Hallmark · pre-emit critique: P5 H5 E5 S5 R5 V5 */
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Wordmark from '../ui/Wordmark';
import ThemeToggle from '../ui/ThemeToggle';
import QuickSearchModal from '../ui/QuickSearchModal';
import { navItems } from '@/config/site';

export default function Header() {
  const currentPath = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement as HTMLElement | null;
      const isInput = activeEl && (['INPUT', 'TEXTAREA'].includes(activeEl.tagName) || activeEl.isContentEditable);
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && !isInput)) {
        e.preventDefault();
        setSearchModalOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
        document.getElementById('navigation-toggle')?.focus();
      }
    };
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [mobileMenuOpen]);

  function navigationLinks(mobile = false) {
    return navItems.map((item) => {
      const isActive = currentPath === item.href || (item.href !== '/' && currentPath.startsWith(`${item.href}/`));
      return (
        <Link
          key={item.href}
          href={item.href}
          aria-current={isActive ? 'page' : undefined}
          onClick={() => setMobileMenuOpen(false)}
          className={`focus-ring rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
            mobile ? 'block py-2.5 text-sm' : ''
          } ${
            isActive
              ? 'text-[var(--text-ink)] bg-[var(--bg-canvas-subtle)] font-semibold shadow-2xs'
              : 'text-[var(--text-body)] hover:text-[var(--text-ink)] hover:bg-[var(--bg-canvas-subtle)]'
          }`}
        >
          {item.name}
        </Link>
      );
    });
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 backdrop-blur-md ${
        scrolled
          ? 'border-b border-[var(--border-hairline-strong)] bg-[var(--bg-canvas)]/90 shadow-2xs'
          : 'border-b border-[var(--border-hairline)] bg-[var(--bg-canvas)]/80'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="focus-ring rounded-md p-1 -ml-1 inline-flex items-center"
            aria-label="Creovly Homepage"
          >
            <Wordmark size="md" />
          </Link>
          <span className="hidden lg:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-[var(--border-hairline-subtle)] bg-[var(--bg-canvas-subtle)] text-[10px] font-mono text-[var(--text-muted)]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
            <span>100% LOCAL</span>
          </span>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          {/* Quick Tool Search Command Launcher */}
          <button
            type="button"
            onClick={() => setSearchModalOpen(true)}
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-[var(--border-hairline)] bg-[var(--bg-canvas-subtle)] hover:border-[var(--brand-accent)] text-xs text-[var(--text-muted)] hover:text-[var(--text-ink)] transition-colors focus-ring cursor-pointer"
            aria-label="Open tool search command palette"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span>Search</span>
            <kbd className="text-[10px] font-mono px-1 rounded bg-[var(--bg-canvas-elevated)] border border-[var(--border-hairline)] text-[var(--text-body)]">/</kbd>
          </button>

          <nav className="hidden md:flex items-center gap-1" aria-label="Primary navigation">
            {navigationLinks()}
          </nav>
          <div className="flex items-center gap-2 border-l border-[var(--border-hairline)] pl-3 sm:pl-4">
            <ThemeToggle />
            <button
              id="navigation-toggle"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden inline-flex items-center justify-center w-8 h-8 rounded-md border border-[var(--border-hairline)] text-[var(--text-body)] hover:text-[var(--text-ink)] focus-ring cursor-pointer"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open primary navigation menu'}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d={mobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {mobileMenuOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="md:hidden border-t border-[var(--border-hairline)] bg-[var(--bg-canvas)] px-4 py-3 space-y-1"
        >
          {navigationLinks(true)}
        </nav>
      )}

      {/* Global Quick Search Modal */}
      <QuickSearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
      />
    </header>
  );
}
