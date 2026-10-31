'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log unexpected error to client console
    console.error('Creovly Application Error:', error);
  }, [error]);

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-20 sm:py-28 text-center space-y-6">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-rose-500/20 bg-rose-500/10 text-xs font-mono text-rose-600 dark:text-rose-400 font-semibold">
        Error 500 — Unexpected Error
      </div>

      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-ink)]">
        Something went wrong
      </h1>

      <p className="text-sm sm:text-base text-[var(--text-body)] max-w-md mx-auto leading-relaxed">
        An unexpected error occurred while rendering this page or processing workspace memory. No data was lost from your device.
      </p>

      {error.digest && (
        <p className="text-xs font-mono text-[var(--text-muted)] bg-[var(--bg-canvas-subtle)] p-2 rounded-lg max-w-xs mx-auto">
          Reference Code: {error.digest}
        </p>
      )}

      <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
        <Button
          type="button"
          variant="primary"
          size="md"
          onClick={() => reset()}
        >
          Try Again
        </Button>
        <Button href="/" variant="outline" size="md">
          Return to Home
        </Button>
      </div>

      <div className="pt-10 border-t border-[var(--border-hairline)] text-xs text-[var(--text-muted)] font-mono">
        If this issue persists, please <Link href="/contact" className="text-[var(--brand-accent)] underline">let our team know</Link>.
      </div>
    </div>
  );
}

