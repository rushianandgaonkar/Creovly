import React from 'react';

export interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

// Card per DESIGN.md §9: hairline sheet, hover raises the border and shadow. No cursor glow.
export default function SpotlightCard({
  children,
  className = '',
  as: Component = 'div',
  ...props
}: SpotlightCardProps) {
  return (
    <Component
      className={`group relative rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] transition duration-300 hover:border-[var(--border-hairline-strong)] hover:shadow-[var(--shadow-floating)] overflow-hidden ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
