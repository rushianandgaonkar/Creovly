import React from 'react';

export interface AlertProps {
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  className?: string;
  children: React.ReactNode;
}

const styles = {
  info: {
    container: 'bg-[var(--state-info-bg)] border-[var(--state-info-border)] text-[var(--state-info)]',
    titleColor: 'text-blue-900 dark:text-blue-200',
    bodyColor: 'text-blue-800 dark:text-blue-300',
  },
  success: {
    container: 'bg-[var(--state-success-bg)] border-[var(--state-success-border)] text-[var(--state-success)]',
    titleColor: 'text-emerald-900 dark:text-emerald-200',
    bodyColor: 'text-emerald-800 dark:text-emerald-300',
  },
  warning: {
    container: 'bg-[var(--state-warning-bg)] border-[var(--state-warning-border)] text-[var(--state-warning)]',
    titleColor: 'text-amber-900 dark:text-amber-200',
    bodyColor: 'text-amber-800 dark:text-amber-300',
  },
  error: {
    container: 'bg-[var(--state-error-bg)] border-[var(--state-error-border)] text-[var(--state-error)]',
    titleColor: 'text-rose-900 dark:text-rose-200',
    bodyColor: 'text-rose-800 dark:text-rose-300',
  },
};

export const Alert: React.FC<AlertProps> = ({
  variant = 'info',
  title,
  className = '',
  children,
}) => {
  const current = styles[variant];

  return (
    <div
      role="alert"
      className={`flex gap-3 p-3.5 rounded-lg border text-sm leading-relaxed ${current.container} ${className}`}
    >
      <div className="shrink-0 mt-0.5">
        {variant === 'info' && (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="12" cy="12" r="9" />
            <line x1="12" y1="8" x2="12.01" y2="8" strokeWidth="3" strokeLinecap="round" />
            <polyline points="11 12 12 12 12 16 13 16" />
          </svg>
        )}
        {variant === 'success' && (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )}
        {variant === 'warning' && (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        )}
        {variant === 'error' && (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="12" cy="12" r="9" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
        )}
      </div>

      <div className="flex-1">
        {title && (
          <h4 className={`text-xs font-semibold uppercase tracking-wider mb-1 ${current.titleColor}`}>
            {title}
          </h4>
        )}
        <div className={`text-xs ${current.bodyColor}`}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Alert;
