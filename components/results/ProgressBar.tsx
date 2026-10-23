'use client';

import React from 'react';
import { Progress } from '@/components/ui/progress';

export interface ProgressBarProps {
  value: number; // 0 to 100
  label?: string;
  showPercent?: boolean;
  variant?: 'primary' | 'success' | 'warning' | 'error';
  className?: string;
}

const variantIndicatorColors = {
  primary: 'bg-[var(--brand-accent)]',
  success: 'bg-emerald-500',
  warning: 'bg-amber-500',
  error: 'bg-rose-500',
};

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  label,
  showPercent = true,
  variant = 'primary',
  className = '',
}) => {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {(label || showPercent) && (
        <div className="flex items-center justify-between text-xs font-medium">
          {label && <span className="text-[var(--text-ink)]">{label}</span>}
          {showPercent && (
            <span className="font-mono tabular-nums text-[var(--text-muted)] ml-auto">
              {clamped}%
            </span>
          )}
        </div>
      )}

      <Progress
        value={clamped}
        className="h-2"
        indicatorClassName={variantIndicatorColors[variant]}
      />
    </div>
  );
};

export default ProgressBar;
