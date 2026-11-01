'use client';

import React, { useState, useEffect } from 'react';
import { getConsentChoice, setConsentChoice, type ConsentChoice } from '@/lib/consent';
import { useI18n } from '@/lib/i18n';

export default function ConsentSettings() {
  const [currentChoice, setCurrentChoice] = useState<ConsentChoice | 'unset'>('unset');
  const [message, setMessage] = useState('');
  const { t } = useI18n();

  useEffect(() => {
    setCurrentChoice(getConsentChoice());
  }, []);

  const updateConsent = (choice: ConsentChoice) => {
    setConsentChoice(choice);
    setCurrentChoice(choice);
    setMessage(
      choice === 'granted'
        ? `✓ ${t.pages.privacy.consentGrantedText}`
        : `✓ ${t.pages.privacy.consentDeniedText}`
    );
    setTimeout(() => setMessage(''), 4500);
  };

  return (
    <div className="p-4 sm:p-5 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-subtle)] space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-ink)]">
            {t.pages.privacy.consentSettingsHeading}
          </h4>
          <p className="text-xs text-[var(--text-muted)] mt-0.5">
            <strong className="text-[var(--text-ink)]">
              {currentChoice === 'granted'
                ? t.pages.privacy.consentGrantedText
                : t.pages.privacy.consentDeniedText}
            </strong>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => updateConsent('granted')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              currentChoice === 'granted'
                ? 'bg-[var(--brand-accent)] text-white'
                : 'border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] text-[var(--text-ink)] hover:bg-[var(--bg-canvas)]'
            }`}
          >
            {t.pages.privacy.buttonGrant}
          </button>
          <button
            type="button"
            onClick={() => updateConsent('denied')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              currentChoice === 'denied'
                ? 'bg-zinc-800 text-white dark:bg-zinc-200 dark:text-zinc-900'
                : 'border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] text-[var(--text-ink)] hover:bg-[var(--bg-canvas)]'
            }`}
          >
            {t.pages.privacy.buttonRevoke}
          </button>
        </div>
      </div>

      {message && (
        <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium animate-fade-in">
          {message}
        </p>
      )}
    </div>
  );
}
