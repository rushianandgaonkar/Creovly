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
          <div className="absolute bottom-2.5 left-2.5 z-10 flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/80 border border-emerald-500/40 text-[10px] font-semibold text-emerald-300">
            Example: 1.1 MB, under 2 MB
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

    case 'banner-size':
      return (
        <div className={`tool-preview preview-banner-size w-full h-full relative overflow-hidden select-none bg-zinc-950 flex items-center justify-center ${className}`} data-ui>
          {/* Banner 16:9 Canvas */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/examples/thumbnail-source.png"
            alt="YouTube banner 2560x1440 preview"
            width={320}
            height={180}
            className="w-full h-full object-cover opacity-60"
            loading="lazy"
            decoding="async"
          />
          {/* Desktop/Tablet Horizontal Strip (423/1440 ≈ 29.4% height) */}
          <div
            className="absolute inset-x-0 border-y border-amber-400/60 bg-amber-500/10 flex items-center justify-center pointer-events-none"
            style={{ top: '35.3%', height: '29.4%' }}
          >
            {/* Central Mobile Safe Zone (1546/2560 ≈ 60.4% width) */}
            <div
              className="h-full border-x-2 border-emerald-400 bg-emerald-500/20 flex flex-col items-center justify-center px-1 relative shadow-[0_0_12px_rgba(16,185,129,0.25)]"
              style={{ width: '60.4%' }}
            >
              <span className="text-[9px] font-bold text-emerald-300 tracking-wider uppercase bg-black/60 px-1 py-0.5 rounded border border-emerald-400/40">
                Safe Area (1546×423)
              </span>
            </div>
          </div>
          {/* TV Resolution Badge */}
          <div className="absolute bottom-2 left-2 z-10 px-2 py-0.5 rounded bg-black/80 backdrop-blur-sm border border-zinc-700 text-[10px] font-semibold text-zinc-300">
            2560 × 1440 TV
          </div>
          <div className="absolute top-2 right-2 z-10 px-1.5 py-0.5 rounded bg-amber-500/20 border border-amber-400/40 text-[9px] font-mono text-amber-300">
            All Devices
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

    case 'channel-name-generator':
      return (
        <div className={`tool-preview preview-channel-name w-full h-full p-3 bg-zinc-950 text-zinc-100 flex flex-col justify-between select-none ${className}`} data-ui>
          <div className="flex items-center justify-between text-[10px] text-zinc-400">
            <span className="uppercase tracking-wide font-medium text-indigo-400">Smart Archetypes</span>
            <span className="px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-[9px] font-semibold border border-indigo-500/30">Name patterns</span>
          </div>
          <div className="bg-zinc-900/90 rounded-lg p-2.5 border border-zinc-800 space-y-1.5 my-auto">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-mono uppercase text-emerald-400 font-bold tracking-wider">Modern &amp; Punchy</span>
              <span className="text-[9px] font-mono text-zinc-400 bg-zinc-800/80 px-1 py-0.2 rounded">16 chars</span>
            </div>
            <div className="text-sm font-bold text-white tracking-tight flex items-center justify-between">
              <span>Weekend Woodshop</span>
              <span className="text-indigo-400 text-xs">★</span>
            </div>
            <div className="text-[10px] text-zinc-400 font-mono flex items-center gap-1">
              <span className="text-zinc-500">@</span>
              <span className="text-zinc-300">WeekendWoodshop</span>
            </div>
          </div>
          <div className="flex items-center justify-between text-[9px] text-zinc-400 pt-1.5 border-t border-zinc-800/80">
            <span>8 Niche Formats</span>
            <span className="text-zinc-300 font-medium">Instant Handle Check</span>
          </div>
        </div>
      );

    case 'tag-generator':
      return (
        <div className={`tool-preview preview-tag-generator w-full h-full p-3 bg-zinc-950 text-zinc-100 flex flex-col justify-between select-none ${className}`} data-ui>
          <div className="flex items-center justify-between text-[10px] text-zinc-400">
            <span className="uppercase tracking-wide font-medium text-indigo-400">Cluster Engine</span>
            <span className="px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-[9px] font-semibold border border-indigo-500/30">500-Char Meter</span>
          </div>
          <div className="bg-zinc-900/90 rounded-lg p-2.5 border border-zinc-800 space-y-2 my-auto">
            <div className="flex flex-wrap gap-1">
              <span className="px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-[9px] font-mono font-medium border border-indigo-500/30">iphone 16</span>
              <span className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 text-[9px] font-mono">iphone 16 review</span>
              <span className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 text-[9px] font-mono">camera test</span>
              <span className="px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-300 text-[9px] font-mono border border-emerald-500/20">is it worth it</span>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-[9px] font-mono text-zinc-400">
                <span>Studio Limit</span>
                <span className="text-emerald-400 font-bold">342 / 500 chars</span>
              </div>
              <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full" style={{ width: '68%' }} />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between text-[9px] text-zinc-400 pt-1.5 border-t border-zinc-800/80">
            <span>5 Smart Clusters</span>
            <span className="text-zinc-300 font-medium">Instant Comma Copy</span>
          </div>
        </div>
      );

    case 'description-generator':
      return (
        <div className={`tool-preview preview-description-generator w-full h-full p-3 bg-zinc-950 text-zinc-100 flex flex-col justify-between select-none ${className}`} data-ui>
          <div className="flex items-center justify-between text-[10px] text-zinc-400">
            <span className="uppercase tracking-wide font-medium text-indigo-400">Description Builder</span>
            <span className="px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-[9px] font-semibold border border-indigo-500/30">Above-the-Fold</span>
          </div>
          <div className="bg-zinc-900/90 rounded-lg p-2.5 border border-zinc-800 space-y-1.5 my-auto">
            <div className="text-[11px] font-medium text-zinc-200 truncate">
              How I film a week of videos in one day. Gear, script and schedule...
            </div>
            <div className="truncate text-[10px] text-zinc-400 font-mono"><span className="text-sky-400">00:00</span> Intro <span className="ml-2 text-sky-400">02:30</span> Gear <span className="ml-2 text-sky-400">08:15</span> Schedule</div>
            <div className="flex justify-between items-center text-[9px] text-zinc-500 font-mono pt-1 border-t border-zinc-800/60">
              <span className="text-zinc-400">#Filmmaking #Creator</span>
              <span className="text-emerald-400 font-semibold">1,240 / 5,000 chars</span>
            </div>
          </div>
          <div className="flex items-center justify-between text-[9px] text-zinc-400 pt-1.5 border-t border-zinc-800/80">
            <span>6 Video Templates</span>
            <span className="text-zinc-300 font-medium">Auto Chapters &amp; Links</span>
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
            <svg viewBox="0 0 160 40" preserveAspectRatio="none" className="w-full h-full" aria-hidden="true">
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
              <div className="h-full rounded-full bg-amber-400 " style={{ width: '71%' }} />
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

    case 'link-generator':
      return (
        <div className={`tool-preview preview-link-generator w-full h-full p-3.5 bg-zinc-900 text-zinc-100 flex flex-col justify-between select-none ${className}`} data-ui>
          <div className="flex items-center justify-between text-[10px] text-zinc-400">
            <span className="font-medium">Timestamp link</span>
            <span className="px-1.5 py-0.5 rounded bg-zinc-700/60 text-zinc-300 text-[9px] font-semibold">Example</span>
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 rounded bg-zinc-950/70 border border-zinc-800 px-2 py-1.5 font-mono text-[10px]">
              <span className="truncate text-zinc-200">youtu.be/dQw4w9WgXcQ<span className="text-orange-400">?t=90</span></span>
              <span className="ml-auto shrink-0 rounded bg-orange-500/20 px-1 text-orange-300">1:30</span>
            </div>
            <div className="flex items-center gap-2 rounded bg-zinc-950/70 border border-zinc-800 px-2 py-1.5 font-mono text-[10px]">
              <span className="truncate text-zinc-200">youtube.com/@channel<span className="text-emerald-400">?sub_confirmation=1</span></span>
            </div>
          </div>
          <div className="flex items-center justify-between text-[10px] text-zinc-400 pt-1 border-t border-zinc-800">
            <span>Timestamp · Subscribe</span>
            <span className="text-zinc-200 font-medium">QR PNG</span>
          </div>
        </div>
      );

    case 'profile-picture-resizer':
      return (
        <div className={`tool-preview preview-profile-picture w-full h-full relative overflow-hidden flex items-center justify-center gap-4 select-none bg-zinc-950 ${className}`} data-ui>
          <div className="relative w-24 h-24 border border-dashed border-zinc-500 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/examples/avatar-vlog.png" alt="Square profile picture crop with circle guide" width={128} height={128} className="w-full h-full object-cover" loading="lazy" decoding="async" />
            <span className="absolute inset-0" style={{ background: 'radial-gradient(circle closest-side, transparent 99%, rgba(0,0,0,0.6) 100%)' }} />
          </div>
          <div className="flex flex-col items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/examples/avatar-vlog.png" alt="" width={48} height={48} className="w-12 h-12 rounded-full" loading="lazy" decoding="async" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/examples/avatar-vlog.png" alt="" width={24} height={24} className="w-6 h-6 rounded-full" loading="lazy" decoding="async" />
          </div>
          <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded bg-black/80 border border-orange-400/40 text-[10px] font-semibold text-orange-200">
            1:1 • 800 × 800
          </div>
        </div>
      );

    case 'engagement-rate-calculator':
      return (
        <div className={`tool-preview preview-engagement w-full h-full p-3.5 bg-zinc-900 text-zinc-100 flex flex-col justify-between select-none ${className}`} data-ui>
          <div>
            <div className="flex items-center justify-between text-[10px] text-zinc-400 mb-1">
              <span className="font-medium">Engagement rate · by views</span>
              <span className="text-zinc-400 font-semibold">Example</span>
            </div>
            <div className="text-2xl font-bold text-white tracking-tight">5.00%</div>
          </div>
          <div className="space-y-1">
            {[['Likes', 80, 'bg-orange-400'], ['Comments', 10, 'bg-emerald-400'], ['Shares', 10, 'bg-sky-400']].map(([name, share, color]) => (
              <div key={name} className="flex items-center gap-2 text-[10px] text-zinc-300">
                <span className="w-14">{name}</span>
                <span className="h-1.5 flex-1 rounded-full bg-zinc-800 overflow-hidden"><span className={`block h-full ${color}`} style={{ width: `${share}%` }} /></span>
                <span className="w-7 text-right">{share}%</span>
              </div>
            ))}
          </div>
          <div className="text-[10px] text-zinc-400 pt-1 border-t border-zinc-800">YouTube, Instagram, TikTok</div>
        </div>
      );

    case 'thumbnail-downloader':
      return (
        <div className={`tool-preview preview-thumbnail-downloader w-full h-full p-3.5 bg-zinc-900 text-zinc-100 flex flex-col justify-between select-none ${className}`} data-ui>
          <div className="flex items-center justify-between text-[10px] text-zinc-400">
            <span className="font-mono truncate">youtu.be/VIDEO_ID</span>
            <span className="px-1.5 py-0.5 rounded bg-zinc-700/60 text-zinc-300 text-[9px] font-semibold">Example</span>
          </div>
          <div className="flex items-end gap-2">
            {[['w-[46%]', '1280×720'], ['w-[30%]', '640×480'], ['w-[18%]', '480×360']].map(([width, label]) => (
              <div key={label} className={`${width} space-y-1`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/examples/thumbnail-source.webp" alt="" width={160} height={90} className="aspect-video w-full rounded object-cover" loading="lazy" decoding="async" />
                <span className="block text-[10px] font-mono text-zinc-400">{label}</span>
              </div>
            ))}
          </div>
        </div>
      );

    case 'thumbnail-tester':
      return (
        <div className={`tool-preview preview-thumbnail-tester w-full h-full p-3.5 bg-white text-zinc-900 flex gap-3 select-none ${className}`} data-ui>
          {['A', 'B'].map((version, index) => (
            <div key={version} className="flex-1 min-w-0 space-y-1.5">
              <div className="relative aspect-video rounded-lg overflow-hidden bg-zinc-900">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={index ? '/examples/compressor-source.webp' : '/examples/thumbnail-source.webp'} alt="" width={160} height={90} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                <span className="absolute bottom-1 right-1 rounded bg-black/80 px-1 text-[8px] font-medium text-white">10:24</span>
                <span className="absolute top-1 left-1 rounded bg-white/90 px-1 text-[8px] font-bold">{version}</span>
              </div>
              <div className="flex gap-1.5">
                <span className="h-4 w-4 shrink-0 rounded-full bg-[#065fd4]" />
                <div className="flex-1 space-y-1">
                  <span className="block h-1.5 rounded bg-zinc-800" />
                  <span className="block h-1.5 w-3/4 rounded bg-zinc-800" />
                  <span className="block h-1 w-1/2 rounded bg-zinc-400" />
                </div>
              </div>
            </div>
          ))}
        </div>
      );

    case 'timestamp-generator':
      return (
        <div className={`tool-preview preview-timestamp-generator w-full h-full p-3.5 bg-zinc-900 text-zinc-100 flex flex-col justify-between select-none ${className}`} data-ui>
          <div className="flex items-center justify-between text-[10px] text-zinc-400">
            <span className="font-medium">Chapters</span>
            <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[9px] font-semibold">Rules OK</span>
          </div>
          <div className="space-y-1 font-mono text-[10px]">
            {[['0:00', 'Intro'], ['0:42', 'What you need'], ['2:15', 'Set up the camera'], ['5:30', 'Lighting']].map(([time, title]) => (
              <div key={time} className="flex gap-2">
                <span className="text-orange-300">{time}</span>
                <span className="truncate text-zinc-200">{title}</span>
              </div>
            ))}
          </div>
          <div className="flex h-1.5 gap-0.5 overflow-hidden rounded-full">
            {[8, 18, 30, 44].map((width, index) => (
              <span key={index} className="bg-orange-400/80" style={{ width: `${width}%` }} />
            ))}
          </div>
        </div>
      );

    case 'words-to-minutes-calculator':
      return (
        <div className={`tool-preview preview-words-to-minutes w-full h-full p-3.5 bg-zinc-900 text-zinc-100 flex flex-col justify-between select-none ${className}`} data-ui>
          <div className="flex items-center justify-between text-[10px] text-zinc-400 mb-1">
            <span className="font-medium">1,500 words · 150/min</span>
            <span className="text-zinc-400 font-semibold">Example</span>
          </div>
          <div className="text-2xl font-bold text-white tracking-tight font-mono">10:00</div>
          <div className="space-y-1">
            {[['Slow', 120, '12:30'], ['Fast', 180, '8:20']].map(([name, rate, time]) => (
              <div key={name as string} className="flex items-center justify-between text-[10px] text-zinc-300">
                <span>{name} · {rate}/min</span>
                <span className="font-mono text-zinc-100">{time}</span>
              </div>
            ))}
          </div>
        </div>
      );

    case 'banner-maker':
      return (
        <div className={`tool-preview preview-banner-maker w-full h-full p-3.5 bg-zinc-900 text-zinc-100 flex flex-col justify-between select-none ${className}`} data-ui>
          <div className="flex items-center justify-between text-[10px] text-zinc-400">
            <span className="font-medium">2560 × 1440</span>
            <span className="text-zinc-400 font-semibold">Example</span>
          </div>
          <div className="relative w-full aspect-video rounded bg-orange-950 flex items-center justify-center">
            <div className="absolute inset-x-[19.8%] inset-y-[35.3%] border border-dashed border-orange-300/80" />
            <span className="text-[11px] font-bold text-white">Your Channel</span>
          </div>
          <div className="flex gap-2 text-[10px] text-zinc-400"><span>TV</span><span>Desktop</span><span className="text-orange-300">Phone</span></div>
        </div>
      );

    case 'thumbnail-size':
      return (
        <div className={`tool-preview preview-thumbnail-size w-full h-full p-3.5 bg-zinc-900 text-zinc-100 flex flex-col justify-between select-none ${className}`} data-ui>
          <div className="flex items-center justify-between text-[10px] text-zinc-400">
            <span className="font-medium">Thumbnail check</span>
            <span className="text-zinc-400 font-semibold">Example</span>
          </div>
          <div className="mx-auto w-3/5 aspect-video rounded border border-dashed border-sky-400/70 flex items-center justify-center font-mono text-[10px] text-sky-200">16:9</div>
          <div className="space-y-1 text-[10px]">
            {[['Size', '3840 × 2160'], ['File', '1.4 MB JPG']].map(([label, value]) => (
              <div key={label} className="flex justify-between"><span className="text-zinc-400">{label}</span><span className="font-mono text-emerald-300">{value}</span></div>
            ))}
          </div>
        </div>
      );

    case 'best-time-to-post-on-youtube':
      return (
        <div className={`tool-preview preview-best-time w-full h-full p-3.5 bg-zinc-900 text-zinc-100 flex flex-col justify-between select-none ${className}`} data-ui>
          <div className="flex items-center justify-between text-[10px] text-zinc-400">
            <span className="font-medium">Publish 2 hours before peak</span>
            <span className="text-zinc-400 font-semibold">Example</span>
          </div>
          <div className="text-2xl font-bold text-white tracking-tight font-mono">4:00 PM</div>
          <div className="space-y-1 font-mono text-[10px]">
            {[['Fri', '4:00 PM'], ['Sat', '4:00 PM'], ['Sun', '4:00 PM']].map(([dayName, at]) => (
              <div key={dayName} className="flex justify-between"><span className="text-zinc-400">{dayName}</span><span className="text-orange-300">{at}</span></div>
            ))}
          </div>
        </div>
      );

    case 'hashtag-generator':
      return (
        <div className={`tool-preview preview-hashtag-generator w-full h-full p-3.5 bg-zinc-900 text-zinc-100 flex flex-col justify-between select-none ${className}`} data-ui>
          <div className="flex items-center justify-between text-[10px] text-zinc-400">
            <span className="font-medium">home workout, no equipment</span>
            <span className="text-zinc-400 font-semibold">Example</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {['#HomeWorkout', '#NoEquipment', '#Workout', '#Fitness'].map((tag) => (
              <span key={tag} className="px-1.5 py-0.5 rounded-full bg-orange-500/15 text-orange-200 text-[10px] font-medium border border-orange-400/30">{tag}</span>
            ))}
          </div>
          <div className="text-[10px] text-zinc-400 font-mono">4 / 15</div>
        </div>
      );

    case 'cpm-calculator':
      return (
        <div className={`tool-preview preview-cpm w-full h-full p-3.5 bg-zinc-900 text-zinc-100 flex flex-col justify-between select-none ${className}`} data-ui>
          <div className="flex items-center justify-between text-[10px] text-zinc-400">
            <span className="font-medium">100,000 views at $8 CPM</span>
            <span className="text-zinc-400 font-semibold">Example</span>
          </div>
          <div className="text-2xl font-bold text-white tracking-tight font-mono">$264</div>
          <div className="space-y-1 text-[10px]">
            {[['Gross ad revenue', '$480'], ['Your share', '55%']].map(([label, value]) => (
              <div key={label} className="flex justify-between"><span className="text-zinc-400">{label}</span><span className="font-mono text-zinc-100">{value}</span></div>
            ))}
          </div>
        </div>
      );

    default:
      return null;
  }
}
