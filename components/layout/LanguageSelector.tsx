'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { selectorLanguages, getLocaleFromPath, translatePath, type Locale } from '@/config/i18n';

interface LanguageSelectorProps {
  variant?: 'header' | 'footer';
  className?: string;
}

export default function LanguageSelector({ variant = 'header', className = '' }: LanguageSelectorProps) {
  const pathname = usePathname() || '/';
  const currentLocale = getLocaleFromPath(pathname);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const currentLang = selectorLanguages.find((l) => l.code === currentLocale) || selectorLanguages[7];

  if (variant === 'footer') {
    return (
      <div className={`flex flex-col gap-2 ${className}`}>
        <label htmlFor="footer-language-select" className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-ink)] font-semibold flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5 text-[var(--text-muted)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
          <span>Language / Idioma</span>
        </label>
        <div className="flex flex-wrap gap-1.5 text-xs">
          {selectorLanguages.map((lang) => {
            const isSelected = lang.code === currentLocale;
            const targetHref = translatePath(pathname, lang.code as Locale);
            return (
              <Link
                key={lang.code}
                href={targetHref}
                hrefLang={lang.code}
                className={`px-2 py-1 rounded text-[11px] font-medium transition-colors focus-ring ${
                  isSelected
                    ? 'bg-[var(--brand-accent)] text-white font-semibold shadow-2xs'
                    : 'bg-[var(--bg-canvas-subtle)] text-[var(--text-body)] hover:text-[var(--text-ink)] hover:bg-[var(--bg-canvas-elevated)] border border-[var(--border-hairline)]'
                }`}
                aria-current={isSelected ? 'true' : undefined}
              >
                {lang.label}
              </Link>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={`Select language. Current: ${currentLang.label}`}
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] hover:border-[var(--brand-accent)] text-xs text-[var(--text-body)] hover:text-[var(--text-ink)] transition-all focus-ring cursor-pointer shadow-2xs"
      >
        <svg
          className="w-3.5 h-3.5 text-[var(--text-muted)]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        <span className="font-medium text-[11px]">{currentLang.label}</span>
        <svg
          className={`w-3 h-3 text-[var(--text-muted)] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div
          role="listbox"
          aria-label="Languages"
          className="absolute right-0 mt-1.5 w-48 rounded-lg border border-[var(--border-hairline-strong)] bg-[var(--bg-canvas-elevated)] p-1 shadow-lg z-50 animate-in fade-in zoom-in-95 duration-100"
        >
          <div className="px-2 py-1.5 text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)] border-b border-[var(--border-hairline)] mb-1">
            Select Language
          </div>
          <div className="max-h-64 overflow-y-auto space-y-0.5">
            {selectorLanguages.map((lang) => {
              const isSelected = lang.code === currentLocale;
              const targetHref = translatePath(pathname, lang.code as Locale);
              return (
                <Link
                  key={lang.code}
                  href={targetHref}
                  hrefLang={lang.code}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between w-full px-2.5 py-1.5 rounded-md text-xs transition-colors focus-ring ${
                    isSelected
                      ? 'bg-[var(--brand-accent)] text-white font-semibold'
                      : 'text-[var(--text-body)] hover:text-[var(--text-ink)] hover:bg-[var(--bg-canvas-subtle)]'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>{lang.label}</span>
                    <span className={`text-[10px] font-mono ${isSelected ? 'text-white/80' : 'text-[var(--text-muted)]'}`}>
                      ({lang.code})
                    </span>
                  </span>
                  {isSelected && (
                    <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

