'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getConsentChoice, setConsentChoice, type ConsentChoice } from '@/lib/consent';

export default function ConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = getConsentChoice();
    if (consent === 'unset') {
      // Small delay so layout doesn't jump abruptly on first paint
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
      aria-label="Cookie and Analytics Consent"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 p-4 sm:p-5 rounded-2xl border border-[var(--border-hairline-strong)] bg-[var(--bg-canvas-elevated)]/95 backdrop-blur-md shadow-[var(--shadow-floating)] space-y-3 animate-fade-in"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500" aria-hidden="true" />
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-ink)]">
            Privacy &amp; Analytics Consent
          </h3>
        </div>
      </div>

      <p className="text-xs text-[var(--text-body)] leading-relaxed">
        We use Google Analytics (with IP masking) to evaluate aggregate site traffic. If you decline, no analytics cookies are stored on your device, and any existing analytics cookies are deleted. Learn more in our{' '}
        <Link href="/privacy" className="text-[var(--brand-accent)] underline hover:no-underline font-medium">
          Privacy Policy
        </Link>.
      </p>

      <div className="flex items-center gap-2 pt-1">
        <button
          type="button"
          onClick={() => handleConsent('granted')}
          className="flex-1 py-2 px-3 text-xs font-semibold rounded-lg bg-[var(--brand-accent)] hover:opacity-90 text-white transition-opacity text-center shadow-xs"
        >
          Accept Analytics
        </button>
        <button
          type="button"
          onClick={() => handleConsent('denied')}
          className="flex-1 py-2 px-3 text-xs font-semibold rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-canvas-subtle)] hover:bg-[var(--bg-canvas)] text-[var(--text-ink)] transition-colors text-center"
        >
          Decline
        </button>
      </div>
    </aside>
  );
}
