import React from 'react';
import Link from 'next/link';

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'pill-primary' | 'pill-secondary';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
  id?: string;
  'aria-label'?: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  children: React.ReactNode;
}

const baseStyles =
  'inline-flex items-center justify-center whitespace-nowrap font-medium transition-all duration-150 select-none focus-ring cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none';

const variantStyles = {
  // App & marketing primary (Obsidian pill with ambient shadow)
  primary:
    'rounded-full bg-[var(--brand-primary)] text-[var(--brand-on-primary)] shadow-[var(--shadow-button-primary)] hover:shadow-[var(--shadow-button-primary-hover)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]',
  secondary:
    'rounded-full bg-[var(--bg-canvas-subtle)] text-[var(--text-ink)] border border-[var(--border-hairline)] hover:bg-[var(--border-hairline)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]',
  ghost:
    'rounded-full text-[var(--text-body)] hover:text-[var(--text-ink)] hover:bg-[var(--bg-canvas-subtle)] active:scale-[0.98]',
  // Floating white pill (Crisp white with soft diffused elevation)
  outline:
    'rounded-full bg-[var(--bg-canvas-elevated)] text-[var(--text-ink)] border border-[var(--border-hairline)] shadow-[var(--shadow-button-elevated)] hover:shadow-[var(--shadow-button-elevated-hover)] hover:border-[var(--border-hairline-strong)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]',

  // Backwards-compatible aliases
  'pill-primary':
    'rounded-full bg-[var(--brand-primary)] text-[var(--brand-on-primary)] shadow-[var(--shadow-button-primary)] hover:shadow-[var(--shadow-button-primary-hover)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]',
  'pill-secondary':
    'rounded-full bg-[var(--bg-canvas-elevated)] text-[var(--text-ink)] border border-[var(--border-hairline)] shadow-[var(--shadow-button-elevated)] hover:shadow-[var(--shadow-button-elevated-hover)] hover:border-[var(--border-hairline-strong)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]',
};

const sizeStyles = {
  sm: 'h-8 px-4 text-xs gap-1.5',
  md: 'h-10 px-5 text-sm gap-2',
  lg: 'h-12 px-7 text-base gap-2.5',
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  href,
  type = 'button',
  className = '',
  disabled = false,
  id,
  'aria-label': ariaLabel,
  onClick,
  children,
}) => {
  const combinedClasses = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if (href) {
    return (
      <Link
        href={href}
        className={combinedClasses}
        id={id}
        aria-label={ariaLabel}
        onClick={onClick}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={combinedClasses}
      disabled={disabled}
      id={id}
      aria-label={ariaLabel}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
