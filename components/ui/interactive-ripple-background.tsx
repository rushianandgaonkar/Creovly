'use client';

import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface Ripple {
  x: number;
  y: number;
  id: number;
  timestamp: number;
}

export interface RippleBackgroundProps {
  children?: React.ReactNode;
  className?: string;
}

export const RippleBackground: React.FC<RippleBackgroundProps> = ({
  children,
  className,
}) => {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const rippleIdRef = useRef(0);

  const createRipple = (e: React.MouseEvent<HTMLDivElement>) => {
    // If the click was directly on an interactive input or button, don't interrupt
    const target = e.target as HTMLElement | null;
    if (target?.closest('button, a, input, textarea, select')) {
      return;
    }

    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple: Ripple = {
      x,
      y,
      id: rippleIdRef.current++,
      timestamp: Date.now(),
    };

    setRipples((prev) => [...prev, newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 2000);
  };

  // Ambient periodic ripples to gently breathe life into the hero canvas
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      if (!containerRef.current) return;
      if (document.hidden) return;

      const rect = containerRef.current.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      // Spawn in central hero area
      const x = rect.width * (0.2 + Math.random() * 0.6);
      const y = rect.height * (0.15 + Math.random() * 0.5);

      const newRipple: Ripple = {
        x,
        y,
        id: rippleIdRef.current++,
        timestamp: Date.now(),
      };

      setRipples((prev) => [...prev, newRipple]);

      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 2000);
    }, 3800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn('relative w-full overflow-hidden select-none', className)}
      onClick={createRipple}
    >
      {/* Expanding Ripple Rings */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        {ripples.map((ripple) => (
          <div
            key={ripple.id}
            className="absolute pointer-events-none"
            style={{
              left: ripple.x,
              top: ripple.y,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div className="absolute inset-0 rounded-full border-2 border-amber-400/35 dark:border-amber-400/20 animate-ripple" />
            <div
              className="absolute inset-0 rounded-full border-2 border-purple-400/25 dark:border-purple-400/20 animate-ripple"
              style={{ animationDelay: '0.15s' }}
            />
            <div
              className="absolute inset-0 rounded-full border-2 border-sky-400/20 dark:border-sky-400/15 animate-ripple"
              style={{ animationDelay: '0.3s' }}
            />
          </div>
        ))}
      </div>

      {/* Hero Workspace Content */}
      <div className="relative z-10 w-full pointer-events-auto">
        {children}
      </div>
    </div>
  );
};

export default RippleBackground;

