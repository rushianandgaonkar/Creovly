'use client';

import { useState } from 'react';

/** Illustrative before/after scrubber. Both layers use the same sample image. */
export default function BeforeAfterDemo() {
  const [pos, setPos] = useState(50);

  return (
    <div className="space-y-4">
      <div className="relative aspect-video rounded-lg overflow-hidden border border-[var(--border-hairline)] bg-black select-none">
        {/* After (base): optimized */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/examples/compressor-source.webp"
          alt="Optimized thumbnail example with the timestamp clear of the title"
          width={640}
          height={360}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
        <span className="absolute bottom-2 right-2 bg-black/90 text-white text-[11px] font-medium px-1.5 py-0.5 rounded">14:20</span>

        {/* Before (clipped): raw export */}
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/examples/compressor-source.webp"
            alt=""
            aria-hidden="true"
            width={640}
            height={360}
            className="absolute inset-0 w-full h-full object-cover brightness-75 saturate-50"
            decoding="async"
          />
          <span className="absolute bottom-2 left-2 bg-red-600 text-white text-[11px] font-semibold px-2 py-1 rounded shadow">
            14:20 badge covers the title hook
          </span>
        </div>

        {/* Divider */}
        <div
          className="absolute inset-y-0 w-0.5 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.25)] pointer-events-none"
          style={{ left: `${pos}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-[11px] text-zinc-700">
            ◂▸
          </div>
        </div>

        <span className="absolute top-2 left-2 bg-black/65 text-white text-[11px] font-medium px-2 py-1 rounded">Before</span>
        <span className="absolute top-2 right-2 bg-black/65 text-white text-[11px] font-medium px-2 py-1 rounded">After</span>

        {/* Native range input keeps it keyboard and touch accessible */}
        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label="Compare raw export and optimized thumbnail"
          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-[var(--brand-accent)]"
        />
      </div>

      <div className="flex flex-wrap items-end justify-between gap-3">
        <p className="text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--text-ink)] [font-variant-numeric:tabular-nums]">
          <span className="text-[var(--text-muted)] line-through decoration-1">4.2 MB</span>
          <span className="mx-2 text-[var(--text-faint)]" aria-hidden="true">&rarr;</span>
          <span className="sr-only"> to </span>
          <span className="text-emerald-600 dark:text-emerald-400">1.1 MB</span>
        </p>
        <p className="text-xs text-[var(--text-muted)] max-w-[16rem] sm:text-right">
          Example: 74% smaller, under YouTube&apos;s 2,000,000-byte mobile limit (1,153,433 bytes).
        </p>
      </div>
    </div>
  );
}
