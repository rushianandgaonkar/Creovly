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
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 p-4 sm:p-5 rounded-2xl border border-[var(--border-hairline-strong)] bg-[var(--bg-canvas-elevated)]/95 backdrop-blur-md shadow-[var(--shadow-floating)] space-y-3 animate-fade-in"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500" aria-hidden="true" />
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-ink)]">
            {t.common.consentBanner.title}
          </h3>
        </div>
      </div>

      <p className="text-xs text-[var(--text-body)] leading-relaxed">
        {t.common.consentBanner.description}{' '}
        <LocalizedLink href="/privacy" className="text-[var(--brand-accent)] underline hover:no-underline font-medium">
          {t.common.consentBanner.privacyLink}
        </LocalizedLink>.
      </p>

      <div className="flex items-center gap-2 pt-1">
        <button
          type="button"
          onClick={() => handleConsent('granted')}
          className="flex-1 py-2 px-3 text-xs font-semibold rounded-lg bg-[var(--brand-accent)] hover:opacity-90 text-white transition-opacity text-center shadow-xs cursor-pointer"
        >
          {t.common.consentBanner.accept}
        </button>
        <button
          type="button"
          onClick={() => handleConsent('denied')}
          className="flex-1 py-2 px-3 text-xs font-semibold rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-canvas-subtle)] hover:bg-[var(--bg-canvas)] text-[var(--text-ink)] transition-colors text-center cursor-pointer"
        >
          {t.common.consentBanner.decline}
        </button>
      </div>
    </aside>
  );
}
