'use client';

import React, { useRef, useState, useCallback } from 'react';

export interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  as?: React.ElementType;
}

export default function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(0, 112, 243, 0.15)',
  as: Component = 'div',
  ...props
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  }, []);

  return (
    <Component
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] transition-all duration-300 hover:border-[var(--border-hairline-strong)] hover:shadow-[var(--shadow-floating)] overflow-hidden ${className}`}
      {...props}
    >
      {/* Dynamic Cursor Spotlight Overlay */}
      <div
        className="pointer-events-none absolute -inset-px rounded-[inherit] transition-opacity duration-300 z-0"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(450px circle at var(--mouse-x, -999px) var(--mouse-y, -999px), ${spotlightColor}, transparent 75%)`,
        }}
        aria-hidden="true"
      />

      {/* Card Content */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </Component>
  );
}
