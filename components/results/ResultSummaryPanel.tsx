'use client';

import React, { useState } from 'react';
import Button from '../ui/Button';

export interface ResultSummaryPanelProps {
  title?: string;
  badge?: string;
  canCopy?: boolean;
  canExport?: boolean;
  embedded?: boolean;
  onCopy?: () => Promise<void>;
  onExport?: () => void;
  className?: string;
  children: React.ReactNode;
}

export const ResultSummaryPanel: React.FC<ResultSummaryPanelProps> = ({
  title = 'Analysis Results',
  badge,
  canCopy = false,
  canExport = false,
  embedded = false,
  onCopy,
  onExport,
  className = '',
  children,
}) => {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);

  const handleCopy = async () => {
    if (!onCopy) return;
    setCopied(false);
    setCopyError(false);
    try {
      await onCopy();
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopyError(true);
    }
  };

  return (
    <div
      className={`${embedded ? 'min-w-0' : 'rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] p-5 md:p-6 shadow-[var(--shadow-whisper)]'} ${className}`}
    >
      {/* Panel Header */}
      <div className="flex flex-wrap items-center justify-between pb-4 border-b border-[var(--border-hairline-subtle)] gap-2">
        <div className="flex flex-wrap items-center gap-2 min-w-0">
          <h3 className="text-sm font-semibold tracking-tight text-[var(--text-ink)]">
            {title}
          </h3>
          {badge && (
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[var(--bg-canvas-subtle)] text-[var(--text-muted)] border border-[var(--border-hairline)]">
              {badge}
            </span>
          )}
        </div>

        {/* Actions (copy, export) */}
        <div className="flex items-center gap-2">
          {canCopy && onCopy && (
            <Button
              variant="outline"
              size="sm"
              type="button"
              aria-label="Copy results to clipboard"
              onClick={handleCopy}
            >
              <svg
                className="w-3.5 h-3.5 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              {copied ? 'Copied!' : 'Copy'}
            </Button>
          )}
          {canExport && onExport && (
            <Button
              variant="outline"
              size="sm"
              type="button"
              aria-label="Export results data"
              onClick={onExport}
            >
              <svg
                className="w-3.5 h-3.5 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Export
            </Button>
          )}
        </div>
      </div>

      <p role="status" className="text-xs text-[var(--text-body)]">
        {copyError ? 'Could not copy. Please try again.' : copied ? 'Results copied to clipboard.' : ''}
      </p>

      {/* Content */}
      <div className="mt-4 space-y-4">{children}</div>
    </div>
  );
};

export default ResultSummaryPanel;
