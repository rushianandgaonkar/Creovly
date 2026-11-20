'use client';

import React from 'react';
import Badge from './Badge';
import type { ToolStatus } from '@/types';
import ToolIllustration from '@/components/tools/ToolIllustration';
import { useI18n, LocalizedLink } from '@/lib/i18n';

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
  const { t, locale } = useI18n();

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  const getLocalizedBadge = (b?: 'Popular' | 'New' | 'Free') => {
    if (!b) return null;
    switch (b) {
      case 'Popular':
        return t.common.badges.popular;
      case 'New':
        return t.common.badges.new;
      case 'Free':
        return t.common.badges.free;
    }
  };

  return (
    <LocalizedLink
      href={href}
      onMouseMove={handleMouseMove}
      className={`spotlight-card group relative flex flex-col justify-between p-5 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] hover:border-[var(--border-hairline-strong)] hover:shadow-[var(--shadow-floating)] transition duration-200 focus-ring overflow-hidden ${className}`}
    >
      <div>
        {illustration && (
          <div className="aspect-[16/10] min-h-[180px] -mx-5 -mt-5 mb-4 border-b border-[var(--border-hairline)] overflow-hidden relative">
            <ToolIllustration toolId={illustration} />
          </div>
        )}
        {/* Card Header: Category + Optional Badge */}
        {(!illustration || status !== 'available' || badge) && (
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="text-xs text-[var(--text-muted)]">
              {categoryLabel}
            </span>
            {status !== 'available' ? (
              <Badge variant="neutral" size="sm">
                {status === 'preview' ? t.common.badges.preview : 'Planned'}
              </Badge>
            ) : badge && (
              <Badge variant={badgeVariants[badge]} size="sm">
                {getLocalizedBadge(badge) || badge}
              </Badge>
            )}
          </div>
        )}

        {/* Title with Arrow indicator */}
        <Heading className="text-base font-semibold text-[var(--text-ink)] group-hover:text-[var(--brand-accent-deep)] transition-colors duration-150 flex items-center justify-between gap-2 tracking-tight">
          <span>{title}</span>
          <svg
            className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--brand-accent-deep)] group-hover:translate-x-0.5 transition-transform duration-150 shrink-0"
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
    </LocalizedLink>
  );
};

export default ToolCard;
