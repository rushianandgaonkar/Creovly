import React from 'react';

export interface BadgeProps {
  variant?: 'popular' | 'new' | 'free' | 'neutral' | 'accent';
  size?: 'sm' | 'md';
  className?: string;
  children: React.ReactNode;
}

const variantStyles = {
  popular: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
  new: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
  free: 'bg-zinc-500/10 text-zinc-700 dark:text-zinc-300 border-zinc-500/20',
  neutral: 'bg-[var(--bg-canvas-subtle)] text-[var(--text-muted)] border-[var(--border-hairline)]',
  accent: 'bg-[var(--brand-accent)]/10 text-[var(--brand-accent)] border-[var(--brand-accent)]/30',
};

const sizeStyles = {
  sm: 'text-[11px] px-2 py-0.5 rounded-full font-medium',
  md: 'text-xs px-2.5 py-1 rounded-full font-medium',
};

export const Badge: React.FC<BadgeProps> = ({
  variant = 'neutral',
  size = 'sm',
  className = '',
  children,
}) => {
  return (
    <span
      className={`inline-flex items-center border tracking-tight tabular-nums select-none ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;
