'use client';

import React, { useState, useEffect } from 'react';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export default function ConsentSettings() {
  const [currentChoice, setCurrentChoice] = useState<'granted' | 'denied' | 'unset'>('unset');
  const [message, setMessage] = useState('');

  useEffect(() => {
    try {
      const stored = localStorage.getItem('creovly-consent');
      if (stored === 'granted' || stored === 'denied') {
        setCurrentChoice(stored);
      }
    } catch (_) {}
  }, []);

  const updateConsent = (choice: 'granted' | 'denied') => {
    try {
      localStorage.setItem('creovly-consent', choice);
    } catch (_) {}

    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        analytics_storage: choice,
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
      });
    }

    setCurrentChoice(choice);
    setMessage(
      choice === 'granted'
        ? '✓ Analytics cookies enabled with IP masking.'
        : '✓ Analytics cookies declined. Cookieless privacy mode active.'
    );
    setTimeout(() => setMessage(''), 4000);
  };

  return (
    <div className="p-4 sm:p-5 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-subtle)] space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-ink)]">
            Your Current Consent Status
          </h4>
          <p className="text-xs text-[var(--text-muted)] mt-0.5">
            Status:{' '}
            <strong className="text-[var(--text-ink)]">
              {currentChoice === 'granted'
                ? 'Analytics Cookies Allowed'
                : currentChoice === 'denied'
                ? 'Analytics Cookies Declined'
                : 'Default (Denied until chosen)'}
            </strong>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => updateConsent('granted')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              currentChoice === 'granted'
                ? 'bg-[var(--brand-accent)] text-white'
                : 'border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] text-[var(--text-ink)] hover:bg-[var(--bg-canvas)]'
            }`}
          >
            Allow Analytics
          </button>
          <button
            type="button"
            onClick={() => updateConsent('denied')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              currentChoice === 'denied'
                ? 'bg-zinc-800 text-white dark:bg-zinc-200 dark:text-zinc-900'
                : 'border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] text-[var(--text-ink)] hover:bg-[var(--bg-canvas)]'
            }`}
          >
            Block Analytics
          </button>
        </div>
      </div>

      {message && (
        <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
          {message}
        </p>
      )}
    </div>
  );
}

