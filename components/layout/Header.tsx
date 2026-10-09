'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Wordmark from '../ui/Wordmark';
import ThemeToggle from '../ui/ThemeToggle';
import { navItems } from '@/config/site';

export default function Header() {
  const currentPath = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      const isActive = currentPath === item.href || currentPath.startsWith(`${item.href}/`);
      return <Link key={item.href} href={item.href} aria-current={isActive ? 'page' : undefined}
        onClick={() => setMobileMenuOpen(false)}
        className={`focus-ring rounded-md px-3 py-2 text-sm font-medium transition-colors ${mobile ? 'block' : ''} ${isActive ? 'text-[var(--text-ink)] bg-[var(--bg-canvas-subtle)]' : 'text-[var(--text-body)] hover:text-[var(--text-ink)] hover:bg-[var(--bg-canvas-subtle)]'}`}>
        {item.name}
      </Link>;
    });
  }

  return <header className="sticky top-0 z-50 w-full border-b border-[var(--border-hairline)] bg-[var(--bg-canvas)]/80 backdrop-blur-md">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
      <Link href="/" onClick={() => setMobileMenuOpen(false)} className="focus-ring rounded-md p-1 -ml-1" aria-label="Creovly Homepage"><Wordmark size="md" /></Link>
      <div className="flex items-center gap-4">
        <nav className="hidden md:flex items-center gap-1" aria-label="Primary navigation">{navigationLinks()}</nav>
        <div className="flex items-center gap-2 border-l border-[var(--border-hairline)] pl-4">
          <ThemeToggle />
          <button id="navigation-toggle" type="button" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden inline-flex items-center justify-center w-8 h-8 rounded-md border border-[var(--border-hairline)] text-[var(--text-body)] focus-ring cursor-pointer"
            aria-expanded={mobileMenuOpen} aria-controls="mobile-navigation" aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open primary navigation menu'}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d={mobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
            </svg>
          </button>
        </div>
      </div>
    </div>
    {mobileMenuOpen && <nav id="mobile-navigation" aria-label="Mobile navigation" className="md:hidden border-t border-[var(--border-hairline)] bg-[var(--bg-canvas)] px-4 py-3 space-y-1">{navigationLinks(true)}</nav>}
  </header>;
}
