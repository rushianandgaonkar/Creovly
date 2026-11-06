import React from 'react';

interface ToolIllustrationProps {
  toolId: string;
  className?: string;
}

/**
 * High-fidelity creator artwork previews for each tool in the catalog.
 * Uses real creator media, platform-true YouTube UI elements, and realistic
 * dashboard fragments (marked with data-ui).
 */
export default function ToolIllustration({ toolId, className = '' }: ToolIllustrationProps) {
  const kind = toolId.replace('youtube-', '');

  switch (kind) {
    case 'logo-background-remover':
      return (
        <div className={`tool-preview preview-logo-remover w-full h-full relative overflow-hidden flex items-center justify-center select-none bg-zinc-950 ${className}`} data-ui>
          {/* Split comparison: Solid dark left, checkerboard right */}
          <div className="absolute inset-0 flex">
            <div className="w-1/2 h-full bg-zinc-900 flex items-center justify-end pr-2 border-r border-zinc-700/60">
              <span className="absolute top-2.5 left-2.5 text-[9px] font-medium tracking-wide uppercase px-1.5 py-0.5 rounded bg-black/60 text-zinc-300">Original</span>
            </div>
            <div
              className="w-1/2 h-full flex items-center justify-start pl-2"
              style={{
                backgroundImage: 'linear-gradient(45deg, #1f242c 25%, transparent 25%), linear-gradient(-45deg, #1f242c 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #1f242c 75%), linear-gradient(-45deg, transparent 75%, #1f242c 75%)',
                backgroundSize: '12px 12px',
                backgroundPosition: '0 0, 0 6px, 6px -6px, -6px 0px',
                backgroundColor: '#12161c',
              }}
            >
              <span className="absolute top-2.5 right-2.5 text-[9px] font-medium tracking-wide uppercase px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">Transparent PNG</span>
            </div>
          </div>
          {/* Channel Mark centered over split */}
          <div className="relative z-10 w-24 h-24 rounded-xl shadow-2xl flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/examples/sample-gaming-badge-transparent.png"
              alt="Channel badge background removed demonstration"
              width={160}
              height={160}
              className="w-20 h-20 object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      );

    case 'thumbnail-compressor':
      return (
        <div className={`tool-preview preview-compressor w-full h-full relative overflow-hidden select-none bg-zinc-950 group ${className}`} data-ui>
          {/* Real 16:9 Thumbnail Image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/examples/compressor-source.jpg"
            alt="YouTube thumbnail 1280x720 compressor preview"
            width={320}
            height={180}
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
          {/* Compression Badge */}
          <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/75 backdrop-blur-sm border border-emerald-500/40 text-[10px] font-semibold text-emerald-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Example: 1.1 MB • &lt; 2 MB
          </div>
          {/* YouTube Video Timestamp in bottom-right */}
          <div className="absolute bottom-2.5 right-2.5 z-10 px-1.5 py-0.5 rounded bg-black/85 text-white font-medium text-[10px] tracking-tight">
            14:20
          </div>
        </div>
      );

    case 'thumbnail-resizer':
      return (
        <div className={`tool-preview preview-resizer w-full h-full relative overflow-hidden select-none bg-zinc-950 ${className}`} data-ui>
          {/* Real Thumbnail Background */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/examples/thumbnail-source.png"
            alt="YouTube thumbnail framing and resize preview"
            width={320}
            height={180}
            className="w-full h-full object-cover opacity-90"
            loading="lazy"
            decoding="async"
          />
          {/* Framing Guides Overlay */}
          <div className="absolute inset-3 border border-dashed border-sky-400/70 rounded pointer-events-none">
            <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-sky-400" />
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-sky-400" />
            <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-sky-400" />
            <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-sky-400" />
          </div>
          {/* Resolution Badge */}
          <div className="absolute bottom-2.5 left-2.5 z-10 px-2 py-0.5 rounded bg-black/80 backdrop-blur-sm border border-sky-400/40 text-[10px] font-semibold text-sky-200">
            16:9 • 1280 × 720 HD
          </div>
        </div>
      );

    case 'shorts-safe-zone':
      return (
        <div className={`tool-preview preview-shorts w-full h-full relative overflow-hidden select-none bg-zinc-950 flex items-center justify-center p-2 ${className}`} data-ui>
          {/* 9:16 Vertical Phone Container */}
          <div className="relative w-[108px] h-full rounded-lg overflow-hidden border border-zinc-700/80 shadow-md bg-zinc-900">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/examples/shorts-source.png"
              alt="YouTube Shorts vertical frame safe zone preview"
              width={160}
              height={284}
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
            {/* Safe Zone Rectangle */}
            <div className="absolute inset-x-2 top-4 bottom-10 border border-dashed border-rose-400/90 rounded bg-rose-500/10 flex items-center justify-center">
              <span className="text-[8px] font-bold uppercase tracking-wider text-rose-200 bg-black/60 px-1 py-0.5 rounded">
                Safe Zone
              </span>
            </div>
            {/* Shorts UI Overlay Icons */}
            <div className="absolute right-1.5 bottom-8 flex flex-col gap-1.5 items-center">
              <div className="w-3.5 h-3.5 rounded-full bg-white/30 backdrop-blur-sm" />
              <div className="w-3.5 h-3.5 rounded-full bg-white/30 backdrop-blur-sm" />
              <div className="w-3.5 h-3.5 rounded-full bg-white/30 backdrop-blur-sm" />
            </div>
            <div className="absolute left-1.5 bottom-2 right-6 h-2 rounded bg-white/30" />
          </div>
          {/* Label */}
          <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-black/75 border border-rose-500/40 text-[10px] font-semibold text-rose-300">
            9:16 Shorts
          </div>
        </div>
      );

    case 'title-checker':
      return (
        <div className={`tool-preview preview-title-checker w-full h-full relative p-3 bg-zinc-900 text-zinc-100 flex flex-col justify-between select-none ${className}`} data-ui>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[10px] text-zinc-400 pb-1 border-b border-zinc-800">
              <span className="font-semibold text-zinc-300">Mobile Feed Preview</span>
              <span className="text-zinc-400 font-medium">Example · 52 chars</span>
            </div>
            {/* Video Card Simulation */}
            <div className="flex gap-2.5 items-start pt-1">
              {/* Mini Video Thumbnail */}
              <div className="w-16 h-10 rounded bg-zinc-800 shrink-0 relative overflow-hidden border border-zinc-700/60">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/examples/thumbnail-source.png"
                  alt="Video thumbnail"
                  width={160}
                  height={90}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="space-y-1 min-w-0">
                <p className="text-[11px] font-semibold text-zinc-100 leading-tight">
                  <span className="bg-emerald-500/20 text-emerald-300 px-1 py-0.5 rounded">
                    How I Automated My
                  </span>{' '}
                  <span className="text-zinc-400">Workflow...</span>
                </p>
                <div className="flex items-center gap-1.5 text-[9px] text-zinc-400">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/examples/avatar-tech.png" alt="Channel avatar" width={14} height={14} className="rounded-full" />
                  <span>Example channel</span>
                </div>
              </div>
            </div>
          </div>
          {/* Truncation boundary guide */}
          <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between text-[10px]">
            <span className="text-zinc-400">Mobile wrap preview</span>
            <span className="text-zinc-300 font-semibold">Illustrative</span>
          </div>
        </div>
      );

    case 'revenue-calculator':
      return (
        <div className={`tool-preview preview-revenue w-full h-full p-3.5 bg-zinc-900 text-zinc-100 flex flex-col justify-between select-none ${className}`} data-ui>
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-zinc-400 uppercase tracking-wide font-medium">Estimated Monthly</span>
              <span className="text-[10px] text-zinc-400 font-semibold flex items-center gap-0.5">
                Example
              </span>
            </div>
            <div className="text-2xl font-bold text-white tracking-tight">
              $2,450<span className="text-zinc-400 text-sm font-normal">.00</span>
            </div>
          </div>
          {/* Mini Revenue Curve SVG */}
          <div className="h-10 w-full relative">
            <svg viewBox="0 0 160 40" preserveAspectRatio="none" className="w-full h-full">
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path d="M0 32 Q40 28 70 18 T160 6 L160 40 L0 40 Z" fill="url(#revGrad)" />
              <path d="M0 32 Q40 28 70 18 T160 6" fill="none" stroke="#10b981" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          </div>
          <div className="flex items-center justify-between text-[10px] text-zinc-400 pt-1 border-t border-zinc-800">
            <span>Example: 580K views</span>
            <span className="text-zinc-200 font-medium">$4.22 RPM</span>
          </div>
        </div>
      );

    case 'rpm-calculator':
      return (
        <div className={`tool-preview preview-rpm w-full h-full p-3.5 bg-zinc-900 text-zinc-100 flex flex-col justify-between select-none ${className}`} data-ui>
          <div>
            <div className="flex items-center justify-between text-[10px] text-zinc-400 mb-1">
              <span className="uppercase tracking-wide font-medium">Net Creator RPM</span>
              <span className="px-1.5 py-0.5 rounded bg-zinc-700/60 text-zinc-300 text-[9px] font-semibold">Example</span>
            </div>
            <div className="text-2xl font-bold text-white tracking-tight">
              $4.85 <span className="text-xs text-zinc-400 font-normal">/ 1K views</span>
            </div>
          </div>
          {/* Format Comparison */}
          <div className="space-y-1.5 bg-zinc-950/70 p-2 rounded border border-zinc-800">
            <div className="flex items-center justify-between text-[10px]">
              <span className="text-zinc-300">Long-Form Video</span>
              <span className="text-emerald-400 font-semibold">$4.85</span>
            </div>
            <div className="flex items-center justify-between text-[10px]">
              <span className="text-zinc-400">Shorts Feed</span>
              <span className="text-zinc-400 font-medium">$0.18</span>
            </div>
          </div>
          <div className="text-[10px] text-zinc-400">
            Example values. Enter your own numbers.
          </div>
        </div>
      );

    case 'watch-hours-calculator':
      return (
        <div className={`tool-preview preview-watch-hours w-full h-full p-3.5 bg-zinc-900 text-zinc-100 flex flex-col justify-between select-none ${className}`} data-ui>
          <div>
            <div className="flex items-center justify-between text-[10px] text-zinc-400 mb-1">
              <span className="uppercase tracking-wide font-medium">YPP 4,000 Hour Goal</span>
              <span className="text-zinc-400 font-semibold">Example</span>
            </div>
            <div className="text-xl font-bold text-white tracking-tight">
              2,840 <span className="text-zinc-400 text-xs font-normal">/ 4,000 hrs</span>
            </div>
          </div>
          {/* Progress bar */}
          <div className="space-y-1.5">
            <div className="w-full h-2.5 rounded-full bg-zinc-800 overflow-hidden p-0.5 border border-zinc-700/60">
              <div className="h-full rounded-full bg-amber-400 transition-all duration-300" style={{ width: '71%' }} />
            </div>
            <div className="flex items-center justify-between text-[10px] text-zinc-400">
              <span>1,160 hrs remaining</span>
              <span className="text-amber-300 font-medium">~42 days at current pace</span>
            </div>
          </div>
          <div className="text-[10px] text-zinc-400 pt-1 border-t border-zinc-800">
            Example values. Enter your own numbers.
          </div>
        </div>
      );

    case 'monetization-calculator':
      return (
        <div className={`tool-preview preview-monetization w-full h-full p-3.5 bg-zinc-900 text-zinc-100 flex flex-col justify-between select-none ${className}`} data-ui>
          <div>
            <div className="flex items-center justify-between text-[10px] text-zinc-400 mb-1">
              <span className="uppercase tracking-wide font-medium">Monthly Diversified Income</span>
              <span className="text-zinc-400 font-semibold">Example</span>
            </div>
            <div className="text-xl font-bold text-white tracking-tight">
              $4,120<span className="text-xs text-zinc-400 font-normal"> net / mo</span>
            </div>
          </div>
          {/* Segmented stream breakdown bar */}
          <div className="space-y-1.5">
            <div className="w-full h-2.5 rounded-full overflow-hidden flex gap-0.5 bg-zinc-800">
              <div style={{ width: '45%' }} className="h-full bg-sky-500 rounded-l-full" title="AdSense 45%" />
              <div style={{ width: '35%' }} className="h-full bg-emerald-500" title="Sponsorships 35%" />
              <div style={{ width: '20%' }} className="h-full bg-violet-500 rounded-r-full" title="Memberships 20%" />
            </div>
            <div className="grid grid-cols-3 gap-1 text-[9px] text-zinc-300 pt-0.5">
              <span className="flex items-center gap-1 text-sky-400"><span className="w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0" />AdSense 45%</span>
              <span className="flex items-center gap-1 text-emerald-400"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />Sponsor 35%</span>
              <span className="flex items-center gap-1 text-violet-400"><span className="w-1.5 h-1.5 rounded-full bg-violet-500 shrink-0" />Subs 20%</span>
            </div>
          </div>
          <div className="text-[10px] text-zinc-400 pt-1 border-t border-zinc-800">
            Example mix. Enter your own numbers.
          </div>
        </div>
      );

    default:
      return null;
  }
}
