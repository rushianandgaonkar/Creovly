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
  return (
    <Link
      href={href}
      className={`group relative flex flex-col justify-between p-5 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] hover:border-[var(--border-hairline-strong)] hover:shadow-[var(--shadow-floating)] transition-all duration-200 focus-ring overflow-hidden ${className}`}
    >
      <div>
        {illustration && <ToolIllustration toolId={illustration} />}
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
