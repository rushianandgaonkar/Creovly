'use client';

import React, { useState, useEffect } from 'react';
import { getConsentChoice, setConsentChoice, type ConsentChoice } from '@/lib/consent';
import { useI18n, LocalizedLink } from '@/lib/i18n';

export default function ConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useI18n();

  useEffect(() => {
    const consent = getConsentChoice();
    if (consent === 'unset') {
      const timer = setTimeout(() => setIsVisible(true), 600);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleConsent = (choice: ConsentChoice) => {
    setConsentChoice(choice);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label={t.common.consentBanner.title}
      className="fixed bottom-3 left-3 right-3 z-50 mx-auto max-w-3xl flex flex-col sm:flex-row sm:items-center gap-3 px-4 py-3 rounded-xl border border-[var(--border-hairline-strong)] bg-[var(--bg-canvas-elevated)]/95 backdrop-blur-md shadow-[var(--shadow-floating)] animate-fade-in"
    >
      <p className="flex-1 text-xs text-[var(--text-body)] leading-snug">
        <span className="sr-only">{t.common.consentBanner.title}. </span>
        {t.common.consentBanner.description}{' '}
        <LocalizedLink href="/privacy" className="text-[var(--brand-accent)] underline hover:no-underline font-medium">
          {t.common.consentBanner.privacyLink}
        </LocalizedLink>.
      </p>

      <div className="flex items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={() => handleConsent('denied')}
          className="flex-1 sm:flex-none py-1.5 px-3 text-xs font-semibold rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-canvas-subtle)] hover:bg-[var(--bg-canvas)] text-[var(--text-ink)] transition-colors text-center cursor-pointer focus-ring"
        >
          {t.common.consentBanner.decline}
        </button>
        <button
          type="button"
          onClick={() => handleConsent('granted')}
          className="flex-1 sm:flex-none py-1.5 px-3 text-xs font-semibold rounded-lg bg-[var(--brand-accent)] hover:opacity-90 text-white transition-opacity text-center cursor-pointer focus-ring"
        >
          {t.common.consentBanner.accept}
        </button>
      </div>
    </aside>
  );
}
