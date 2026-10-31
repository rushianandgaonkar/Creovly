'use client';

import React from 'react';
import Link from 'next/link';
import Badge from './Badge';
import type { ToolStatus } from '@/types';
import ToolIllustration from '@/components/tools/ToolIllustration';

export interface ToolCardProps {
  title: string;
  description: string;
  href: string;
  categoryLabel: string;
  badge?: 'Popular' | 'New' | 'Free';
  status: ToolStatus;
  headingAs?: 'h3' | 'h4';
  className?: string;
  illustration?: string;
}

const badgeVariants = {
  Popular: 'popular' as const,
  New: 'new' as const,
  Free: 'free' as const,
};

const toolFeatureTags: Record<string, string> = {
  'logo-background-remover': 'Transparent PNG • Canvas',
  'youtube-thumbnail-compressor': '< 2MB Payload • JPEG/WebP',
  'youtube-thumbnail-resizer': '1280×720 HD • 16:9',
  'youtube-shorts-safe-zone': '9:16 Safe Zone • Mask',
  'youtube-title-checker': 'Mobile ~50 Chars • Truncation',
  'youtube-revenue-calculator': 'Dynamic RPM • Modeler',
  'youtube-rpm-calculator': 'Net Earnings / 1K Views',
  'youtube-watch-hours-calculator': '4,000 Hr Goal • Pace',
  'youtube-monetization-calculator': 'Multi-Stream Revenue',
};

export const ToolCard: React.FC<ToolCardProps> = ({
  title,
  description,
  href,
  categoryLabel,
  badge,
  status,
  headingAs: Heading = 'h3',
  className = '',
  illustration,
}) => {
  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  return (
    <Link
      href={href}
      onMouseMove={handleMouseMove}
      className={`spotlight-card group relative flex flex-col justify-between p-5 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] hover:border-[var(--border-hairline-strong)] hover:shadow-[var(--shadow-floating)] transition-all duration-200 focus-ring overflow-hidden ${className}`}
    >
      <div>
        {illustration && (
          <div className="h-28 -mx-5 -mt-5 mb-4 border-b border-[var(--border-hairline)] overflow-hidden relative">
            <ToolIllustration toolId={illustration} />
          </div>
        )}
        {/* Card Header: Category + Optional Badge */}
        {(!illustration || status !== 'available' || badge) && <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)]">
            {categoryLabel}
          </span>
          {status !== 'available' ? (
            <Badge variant="neutral" size="sm">
              {status === 'preview' ? 'Preview' : 'Planned'}
            </Badge>
          ) : badge && (
            <Badge variant={badgeVariants[badge]} size="sm">
              {badge}
            </Badge>
          )}
        </div>}

        {/* Title with Arrow indicator */}
        <Heading className="text-base font-semibold text-[var(--text-ink)] group-hover:text-[var(--brand-accent)] transition-colors duration-150 flex items-center justify-between gap-2 tracking-tight">
          <span>{title}</span>
          <svg
            className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--brand-accent)] group-hover:translate-x-0.5 transition-transform duration-150 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Heading>

        {/* Description */}
        <p className="mt-2 text-xs leading-relaxed text-[var(--text-body)] line-clamp-2">
          {description}
        </p>

        {/* Feature Spec Chip */}
        {illustration && toolFeatureTags[illustration] && (
          <div className="mt-3">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md border border-[var(--border-hairline)] bg-[var(--bg-canvas-subtle)] text-[10px] font-mono text-[var(--text-muted)] font-medium">
              <span className="w-1 h-1 rounded-full bg-[var(--brand-accent)]" />
              {toolFeatureTags[illustration]}
            </span>
          </div>
        )}
      </div>

      {/* Footer / Action prompt */}
      <div className="mt-4 pt-3 border-t border-[var(--border-hairline-subtle)] flex items-center justify-between text-xs text-[var(--text-muted)] font-medium">
        <span className="inline-flex items-center gap-1.5 group-hover:text-[var(--text-ink)] transition-colors">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-accent)]"></span>
          {status === 'available' ? 'Available' : 'In development'}
        </span>
        <span className="text-[var(--brand-accent)] group-hover:underline">
          {status === 'available' ? 'Open tool' : 'View preview'} &rarr;
        </span>
      </div>
    </Link>
  );
};

export default ToolCard;
