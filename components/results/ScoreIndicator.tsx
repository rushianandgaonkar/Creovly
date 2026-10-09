import React from 'react';

export interface ScoreIndicatorProps {
  score: number; // 0 to 100
  label?: string;
  verdict?: string;
  className?: string;
}

export const ScoreIndicator: React.FC<ScoreIndicatorProps> = ({
  score,
  label = 'Optimization Score',
  verdict,
  className = '',
}) => {
  const clamped = Math.min(100, Math.max(0, score));

  let colorClass = 'text-emerald-500 border-emerald-500/30 bg-emerald-500/10';
  let statusText = verdict || 'Excellent';

  if (clamped < 50) {
    colorClass = 'text-rose-500 border-rose-500/30 bg-rose-500/10';
    statusText = verdict || 'Needs Attention';
  } else if (clamped < 80) {
    colorClass = 'text-amber-500 border-amber-500/30 bg-amber-500/10';
    statusText = verdict || 'Good';
  }

  return (
    <div
      className={`p-4 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] flex items-center justify-between gap-4 ${className}`}
    >
      <div>
        <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] select-none">
          {label}
        </span>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-xs font-semibold text-[var(--text-ink)]">
            {statusText}
          </span>
          <span className="text-[11px] text-[var(--text-muted)]">
            ({clamped}/100)
          </span>
        </div>
      </div>

      <div
        className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-mono font-bold text-base tabular-nums ${colorClass}`}
      >
        {clamped}
      </div>
    </div>
  );
};

export default ScoreIndicator;
