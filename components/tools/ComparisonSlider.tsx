'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';

export interface ComparisonSliderProps {
  beforeSrc: string;
  afterSrc: string;
  beforeLabel: string;
  afterLabel: string;
  width: number;
  height: number;
  transparentAfter?: boolean;
  portrait?: boolean;
  className?: string;
}

export default function ComparisonSlider({
  beforeSrc,
  afterSrc,
  beforeLabel,
  afterLabel,
  width,
  height,
  transparentAfter = false,
  portrait = false,
  className = '',
}: ComparisonSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [mode, setMode] = useState<'slider' | 'side-by-side'>('slider');
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(Math.round(percentage));
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isDragging) {
      updatePosition(e.clientX);
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (isDragging) {
      setIsDragging(false);
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        // Pointer capture release safety
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (mode !== 'slider') return;
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setSliderPosition((prev) => Math.max(0, prev - 5));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setSliderPosition((prev) => Math.min(100, prev + 5));
    } else if (e.key === 'Home') {
      e.preventDefault();
      setSliderPosition(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setSliderPosition(100);
    }
  };

  const checkerboardStyle: React.CSSProperties = {
    backgroundColor: '#ffffff',
    backgroundImage: 'conic-gradient(#e4e4e7 25%, transparent 0 50%, #e4e4e7 0 75%, transparent 0)',
    backgroundSize: '16px 16px',
  };

  const heightClass = portrait ? 'h-80 sm:h-96' : 'h-64 sm:h-80';

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Controls & Mode Switch */}
      <div className="flex items-center justify-between text-xs">
        <span className="text-[var(--text-body)]">
          {mode === 'slider' ? 'Drag or scrub slider to compare' : 'Side-by-side comparison'}
        </span>
        <div className="inline-flex rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-canvas-subtle)] p-0.5" role="tablist" aria-label="Comparison view mode">
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'slider'}
            onClick={() => setMode('slider')}
            className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
              mode === 'slider'
                ? 'bg-[var(--bg-canvas-elevated)] text-[var(--text-ink)] shadow-sm'
                : 'text-[var(--text-muted)] hover:text-[var(--text-ink)]'
            }`}
          >
            Interactive Slider
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'side-by-side'}
            onClick={() => setMode('side-by-side')}
            className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
              mode === 'side-by-side'
                ? 'bg-[var(--bg-canvas-elevated)] text-[var(--text-ink)] shadow-sm'
                : 'text-[var(--text-muted)] hover:text-[var(--text-ink)]'
            }`}
          >
            Side-by-side
          </button>
        </div>
      </div>

      {mode === 'slider' ? (
        <div
          ref={containerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="slider"
          aria-label="Before and after comparison slider"
          aria-valuenow={sliderPosition}
          aria-valuemin={0}
          aria-valuemax={100}
          className={`relative w-full ${heightClass} rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] overflow-hidden select-none cursor-ew-resize focus-ring touch-none`}
        >
          {/* Base Layer: AFTER (Right / Processed side) */}
          <div
            className="absolute inset-0 w-full h-full flex items-center justify-center p-4"
            style={transparentAfter ? checkerboardStyle : { backgroundColor: 'var(--bg-canvas-subtle)' }}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                unoptimized
                src={afterSrc}
                alt={afterLabel}
                width={width}
                height={height}
                className="max-w-full max-h-full object-contain pointer-events-none"
              />
            </div>
          </div>

          {/* Top Layer: BEFORE (Left / Original side clipped) */}
          <div
            className="absolute inset-0 w-full h-full flex items-center justify-center p-4 bg-[var(--bg-canvas-subtle)] overflow-hidden"
            style={{
              clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
            }}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                unoptimized
                src={beforeSrc}
                alt={beforeLabel}
                width={width}
                height={height}
                className="max-w-full max-h-full object-contain pointer-events-none"
              />
            </div>
          </div>

          {/* Divider Line & Scrubber Handle */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-[var(--brand-accent)] pointer-events-none shadow-[0_0_8px_rgba(0,112,243,0.4)]"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[var(--bg-canvas-elevated)] border-2 border-[var(--brand-accent)] shadow-md flex items-center justify-center text-[var(--brand-accent)] font-mono text-[11px] font-bold">
              ◂▸
            </div>
          </div>

          {/* Floating Labels */}
          <div className="absolute top-3 left-3 pointer-events-none bg-black/60 backdrop-blur-sm text-white px-2.5 py-1 rounded-md text-[11px] font-medium transition-opacity duration-200">
            {beforeLabel}
          </div>
          <div className="absolute top-3 right-3 pointer-events-none bg-black/60 backdrop-blur-sm text-white px-2.5 py-1 rounded-md text-[11px] font-medium transition-opacity duration-200">
            {afterLabel}
          </div>
        </div>
      ) : (
        /* Side-by-side mode */
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <figure className="min-w-0 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] overflow-hidden">
            <div className="p-3 text-xs font-semibold border-b border-[var(--border-hairline-subtle)] text-[var(--text-ink)]">
              {beforeLabel}
            </div>
            <div className={`p-4 bg-[var(--bg-canvas-subtle)] flex items-center justify-center ${heightClass}`}>
              <Image
                unoptimized
                src={beforeSrc}
                alt={beforeLabel}
                width={width}
                height={height}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </figure>

          <figure className="min-w-0 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] overflow-hidden">
            <div className="p-3 text-xs font-semibold border-b border-[var(--border-hairline-subtle)] text-[var(--text-ink)]">
              {afterLabel}
            </div>
            <div
              className={`p-4 flex items-center justify-center ${heightClass}`}
              style={transparentAfter ? checkerboardStyle : { backgroundColor: 'var(--bg-canvas-subtle)' }}
            >
              <Image
                unoptimized
                src={afterSrc}
                alt={afterLabel}
                width={width}
                height={height}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </figure>
        </div>
      )}
    </div>
  );
}
