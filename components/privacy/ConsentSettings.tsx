'use client';

import React, { useState, useEffect } from 'react';
import { getConsentChoice, setConsentChoice, type ConsentChoice } from '@/lib/consent';

export default function ConsentSettings() {
  const [currentChoice, setCurrentChoice] = useState<ConsentChoice | 'unset'>('unset');
  const [message, setMessage] = useState('');

  useEffect(() => {
    setCurrentChoice(getConsentChoice());
  }, []);

  const updateConsent = (choice: ConsentChoice) => {
    setConsentChoice(choice);
    setCurrentChoice(choice);
    setMessage(
      choice === 'granted'
        ? '✓ Analytics cookies enabled with IP masking.'
        : '✓ Analytics cookies declined. Any existing analytics cookies have been purged; cookieless measurement active.'
    );
    setTimeout(() => setMessage(''), 4500);
  };

  return (
    <div className="p-4 sm:p-5 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-subtle)] space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
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
                ? 'Analytics Cookies Declined (Cookieless Mode)'
                : 'Default (Denied until explicitly chosen)'}
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
            Decline Analytics
          </button>
        </div>
      </div>

      <p className="text-xs text-[var(--text-muted)] leading-relaxed">
        Changing your preference to &ldquo;Decline Analytics&rdquo; updates Google Consent Mode v2 to denied, immediately purges any active Google Analytics cookies (<code>_ga</code>, <code>_ga_*</code>) from this browser, and restricts traffic signals to cookieless pings.
      </p>

      {message && (
        <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium animate-fade-in">
          {message}
        </p>
      )}
    </div>
  );
}
