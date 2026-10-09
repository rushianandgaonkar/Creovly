import React from 'react';

export interface MetricCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  subtext,
  trend,
  trendValue,
  className = '',
}) => {
  return (
    <div
      className={`min-w-0 p-4 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] flex flex-col justify-between ${className}`}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] select-none">
          {label}
        </span>
        {trendValue && (
          <span
            className={`inline-flex items-center gap-0.5 text-[11px] font-mono tabular-nums font-medium ${
              trend === 'up'
                ? 'text-emerald-600 dark:text-emerald-400'
                : trend === 'down'
                ? 'text-rose-600 dark:text-rose-400'
                : 'text-[var(--text-muted)]'
            }`}
          >
            {trend === 'up' && '▲ '}
            {trend === 'down' && '▼ '}
            {trendValue}
          </span>
        )}
      </div>

      <div className="mt-2">
        <div className="text-2xl font-bold tracking-tight text-[var(--text-ink)] tabular-nums font-mono [overflow-wrap:anywhere]">
          {value}
        </div>
        {subtext && (
          <p className="mt-1 text-xs text-[var(--text-body)]">
            {subtext}
          </p>
        )}
      </div>
    </div>
  );
};

export default MetricCard;
