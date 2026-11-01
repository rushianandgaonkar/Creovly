'use client';

import React, { useState } from 'react';
import Link from 'next/link';

type TabType = 'thumbnail' | 'title' | 'shorts';

export default function HeroProductMockup() {
  const [activeTab, setActiveTab] = useState<TabType>('thumbnail');
  
  // Thumbnail tab states
  const [highlightOverlay, setHighlightOverlay] = useState(true);
  
  // Title tab states
  const [sampleTitleIndex, setSampleTitleIndex] = useState(0);
  const sampleTitles = [
    {
      title: 'How I Built a Profitable YouTube Studio on a $500 Budget in 30 Days',
      desc: 'Typical creator title with storytelling, length = 68 chars. Mobile feeds cut this off!',
    },
    {
      title: 'Stop Making These 5 Thumbnail Mistakes (Fast Fix)',
      desc: 'Optimized high-CTR title, length = 50 chars. 100% visible on mobile feed.',
    },
    {
      title: 'The Full 2026 YouTube Monetization Masterclass: From 0 to 100,000 Subscribers',
      desc: 'Long search-targeted title, length = 77 chars. Truncates significantly on phone feeds.',
    },
  ];
  const [customTitle, setCustomTitle] = useState('');
  const activeTitleText = customTitle || sampleTitles[sampleTitleIndex].title;
  const titleLength = activeTitleText.length;
  // YouTube mobile feed typically truncates around 50-55 characters depending on font kerning
  const truncationBoundary = 52;
  const isTruncated = titleLength > truncationBoundary;
  const visiblePart = isTruncated ? activeTitleText.slice(0, truncationBoundary) : activeTitleText;
  const truncatedPart = isTruncated ? activeTitleText.slice(truncationBoundary) : '';

  // Shorts tab states
  const [showShortsUi, setShowShortsUi] = useState(true);

  return (
    <div className="w-full max-w-4xl mx-auto mt-10 rounded-2xl border border-[var(--border-hairline-strong)] bg-[var(--bg-canvas-elevated)] shadow-[var(--shadow-floating)] overflow-hidden transition-all duration-300">
      {/* Mockup Window Chrome Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3.5 border-b border-[var(--border-hairline)] bg-[var(--bg-canvas-subtle)]">
        {/* Status indicator & badge */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] font-semibold flex items-center gap-1.5 pl-2 border-l border-[var(--border-hairline)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-accent)] animate-pulse" />
            Interactive Pre-Publish Simulator
          </span>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1 p-1 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-canvas)] text-xs font-medium" role="tablist" aria-label="Pre-publish inspector features">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'thumbnail'}
            onClick={() => setActiveTab('thumbnail')}
            className={`px-3 py-1.5 rounded-md transition-all ${
              activeTab === 'thumbnail'
                ? 'bg-[var(--bg-canvas-elevated)] text-[var(--text-ink)] shadow-2xs font-semibold'
                : 'text-[var(--text-muted)] hover:text-[var(--text-ink)]'
            }`}
          >
            1. Thumbnail Inspector
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'title'}
            onClick={() => setActiveTab('title')}
            className={`px-3 py-1.5 rounded-md transition-all ${
              activeTab === 'title'
                ? 'bg-[var(--bg-canvas-elevated)] text-[var(--text-ink)] shadow-2xs font-semibold'
                : 'text-[var(--text-muted)] hover:text-[var(--text-ink)]'
            }`}
          >
            2. Title Truncation
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'shorts'}
            onClick={() => setActiveTab('shorts')}
            className={`px-3 py-1.5 rounded-md transition-all ${
              activeTab === 'shorts'
                ? 'bg-[var(--bg-canvas-elevated)] text-[var(--text-ink)] shadow-2xs font-semibold'
                : 'text-[var(--text-muted)] hover:text-[var(--text-ink)]'
            }`}
          >
            3. Shorts Safe Zone
          </button>
        </div>
      </div>

      {/* Interactive Canvas Area */}
      <div className="p-4 sm:p-7">
        {/* ================= TAB 1: THUMBNAIL INSPECTOR ================= */}
        {activeTab === 'thumbnail' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div>
                <h2 className="text-base font-bold text-[var(--text-ink)]">
                  Live 16:9 Thumbnail Inspection
                </h2>
                <p className="text-[var(--text-body)] mt-0.5">
                  See how YouTube overlays timestamp UI that can obscure critical text and faces.
                </p>
              </div>
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => setHighlightOverlay(!highlightOverlay)}
                  className={`px-3 py-1.5 rounded-md border text-xs font-medium transition-colors ${
                    highlightOverlay
                      ? 'border-[var(--brand-accent)] bg-[var(--brand-accent)] text-white'
                      : 'border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] text-[var(--text-body)] hover:text-[var(--text-ink)]'
                  }`}
                >
                  {highlightOverlay ? 'Timestamp Danger Zone: ON' : 'Timestamp Danger Zone: OFF'}
                </button>
                <Link
                  href="/tools/youtube-thumbnail-compressor"
                  className="px-3 py-1.5 rounded-md border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] text-[var(--brand-accent)] hover:underline font-medium text-xs inline-flex items-center gap-1"
                >
                  Compressor &rarr;
                </Link>
              </div>
            </div>

            {/* Thumbnail Mock Card */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
              {/* The Video Mockup */}
              <div className="lg:col-span-8">
                <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-[var(--border-hairline)] bg-gradient-to-tr from-slate-900 via-zinc-800 to-indigo-950 p-6 flex flex-col justify-between shadow-inner select-none">
                  {/* Top Spec Badges */}
                  <div className="flex items-center justify-between gap-2 z-10">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md border border-white/15 text-[11px] font-mono text-white">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      16:9 (1280 × 720 HD)
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md border border-white/15 text-[11px] font-mono text-emerald-300">
                      1.3 MB &lt; 2 MB Mobile Cap
                    </span>
                  </div>

                  {/* Thumbnail Creator Graphic Visual */}
                  <div className="my-auto text-center space-y-2 py-4">
                    <span className="inline-block px-3 py-1 rounded-full bg-indigo-500/25 border border-indigo-400/40 text-indigo-200 text-xs font-semibold tracking-wide uppercase">
                      CREOVLY PRE-PUBLISH SUITE
                    </span>
                    <p className="text-xl sm:text-2xl font-black text-white tracking-tight drop-shadow-md">
                      HOW TO DOUBLE YOUR CTR
                    </p>
                    <p className="text-xs text-zinc-300 max-w-sm mx-auto font-medium">
                      High-contrast focal point • Clear facial framing • Crisp rule-of-thirds
                    </p>
                  </div>

                  {/* Bottom Area with Timestamp & Danger Zone Warning */}
                  <div className="flex items-end justify-between z-10">
                    <div className="text-[11px] font-mono text-zinc-400">
                      Standard YouTube 16:9 canvas
                    </div>

                    {/* Official YouTube Time Badge Overlay */}
                    <div className="relative">
                      {highlightOverlay && (
                        <div className="absolute -inset-2.5 rounded-lg border-2 border-dashed border-rose-500 bg-rose-500/20 backdrop-blur-xs flex items-center justify-center animate-pulse z-20 pointer-events-none">
                          <span className="text-[10px] font-bold text-rose-200 uppercase tracking-wider px-1">
                            DO NOT PUT TEXT HERE
                          </span>
                        </div>
                      )}
                      <span className="relative z-10 inline-block px-2 py-0.5 rounded bg-black/90 text-white font-mono text-xs font-bold shadow-md">
                        14:28
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Spec Checklist Sidebar */}
              <div className="lg:col-span-4 space-y-3">
                <div className="p-3.5 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-subtle)] space-y-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] font-semibold">
                    Automated Readiness Specs
                  </span>
                  <ul className="text-xs space-y-2 text-[var(--text-body)]">
                    <li className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                      </svg>
                      <span><strong>16:9 Aspect Ratio:</strong> Baseline 1280×720 HD up to 3840×2160 4K verified.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                      </svg>
                      <span><strong>Payload &lt; 2 MB:</strong> Universal compatibility for YouTube mobile Studio uploads (desktop accepts up to 50 MB).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                      </svg>
                      <span><strong>Timestamp Safe Zone:</strong> Lower right 140×36px blocked by video duration badge.</span>
                    </li>
                  </ul>
                </div>

                <div className="p-3 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] flex items-center justify-between text-xs">
                  <span className="text-[var(--text-muted)]">Want to resize or compress your image?</span>
                  <Link href="/tools/youtube-thumbnail-resizer" className="text-[var(--brand-accent)] font-semibold hover:underline">
                    Resize 16:9 &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: TITLE TRUNCATION ================= */}
        {activeTab === 'title' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div>
                <h2 className="text-base font-bold text-[var(--text-ink)]">
                  Mobile YouTube Feed Title Truncation
                </h2>
                <p className="text-[var(--text-body)] mt-0.5">
                  Over 70% of YouTube views happen on mobile. See exactly where the YouTube app cuts off your title.
                </p>
              </div>
              <Link
                href="/tools/youtube-title-checker"
                className="px-3 py-1.5 rounded-md border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] text-[var(--brand-accent)] hover:underline font-medium text-xs self-start sm:self-auto"
              >
                Full Title Checker &rarr;
              </Link>
            </div>

            {/* Preset Selector */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-medium text-[var(--text-muted)]">Test preset:</span>
              {sampleTitles.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setCustomTitle('');
                    setSampleTitleIndex(idx);
                  }}
                  className={`px-2.5 py-1 rounded-md text-xs transition-colors ${
                    !customTitle && sampleTitleIndex === idx
                      ? 'bg-[var(--brand-primary)] text-[var(--brand-on-primary)] font-medium'
                      : 'border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] text-[var(--text-body)] hover:border-[var(--border-hairline-strong)]'
                  }`}
                >
                  Preset {idx + 1} ({item.title.length} chars)
                </button>
              ))}
            </div>

            {/* Interactive Title Input */}
            <div className="space-y-1.5">
              <label htmlFor="hero-title-input" className="block text-xs font-medium text-[var(--text-ink)]">
                Or type your own YouTube video title to test live:
              </label>
              <div className="relative">
                <input
                  id="hero-title-input"
                  type="text"
                  maxLength={100}
                  value={customTitle || sampleTitles[sampleTitleIndex].title}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  className="w-full h-11 px-3.5 pr-20 rounded-lg border border-[var(--border-hairline-strong)] bg-[var(--bg-canvas)] text-sm text-[var(--text-ink)] focus-ring font-sans"
                  placeholder="Enter a title..."
                />
                <span className={`absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono font-semibold px-2 py-0.5 rounded ${
                  titleLength > 70 ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300' : 'bg-[var(--bg-canvas-subtle)] text-[var(--text-muted)]'
                }`}>
                  {titleLength} / 100
                </span>
              </div>
            </div>

            {/* Truncation Visualizer Box */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Mobile Feed Simulation */}
              <div className="p-4 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-subtle)] space-y-3">
                <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)]">
                  <span>📱 SMARTPHONE HOME FEED</span>
                  <span className={isTruncated ? 'text-rose-500 font-bold' : 'text-emerald-500 font-bold'}>
                    {isTruncated ? '⚠️ TRUNCATED' : '✓ 100% VISIBLE'}
                  </span>
                </div>

                {/* Simulated YouTube feed card */}
                <div className="p-3 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] space-y-2 shadow-2xs">
                  <div className="aspect-video w-full rounded-md bg-zinc-800 flex items-center justify-center text-zinc-500 text-xs">
                    Thumbnail Preview (16:9)
                  </div>
                  <div className="pt-1">
                    <p className="text-sm font-semibold text-[var(--text-ink)] leading-snug">
                      <span>{visiblePart}</span>
                      {isTruncated && (
                        <span className="text-rose-500 bg-rose-500/10 dark:bg-rose-950/30 px-1 rounded line-through decoration-rose-500 font-normal">
                          {truncatedPart}
                        </span>
                      )}
                      {isTruncated && <span className="text-[var(--text-muted)]">...</span>}
                    </p>
                    <p className="text-[11px] text-[var(--text-muted)] mt-1">
                      Creator Channel • 42K views • 2 hours ago
                    </p>
                  </div>
                </div>

                {isTruncated ? (
                  <p className="text-xs text-rose-600 dark:text-rose-400 font-medium">
                    The last {truncatedPart.length} characters are hidden behind &quot;...&quot; on mobile phones. Place key emotional hooks before character 50!
                  </p>
                ) : (
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                    Great length! This title will display fully on iPhone and Android YouTube feeds without being cut off.
                  </p>
                )}
              </div>

              {/* Character Distribution Ruler */}
              <div className="p-4 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-subtle)] space-y-3">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] font-semibold">
                  Title Visibility Thresholds
                </span>

                {/* Visual Progress Bar Ruler */}
                <div className="space-y-1">
                  <div className="h-3 w-full rounded-full bg-[var(--bg-canvas-inset)] overflow-hidden flex">
                    <div
                      className="h-full bg-emerald-500 transition-all duration-300"
                      style={{ width: `${Math.min(100, (Math.min(titleLength, 50) / 100) * 100)}%` }}
                    />
                    <div
                      className="h-full bg-amber-500 transition-all duration-300"
                      style={{
                        width: `${Math.min(100, (Math.max(0, Math.min(titleLength, 70) - 50) / 100) * 100)}%`,
                      }}
                    />
                    <div
                      className="h-full bg-rose-500 transition-all duration-300"
                      style={{ width: `${Math.min(100, (Math.max(0, titleLength - 70) / 100) * 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] font-mono text-[var(--text-muted)]">
                    <span>0</span>
                    <span>50 (Mobile safe)</span>
                    <span>70 (Tablet/Search)</span>
                    <span>100 (Max)</span>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-[var(--text-body)] pt-2 border-t border-[var(--border-hairline)]">
                  <div className="flex items-center justify-between">
                    <span>Mobile visibility boundary:</span>
                    <strong className="font-mono text-[var(--text-ink)]">~50 - 55 chars</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Desktop search visibility:</span>
                    <strong className="font-mono text-[var(--text-ink)]">~65 - 70 chars</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Current title length:</span>
                    <strong className="font-mono text-[var(--brand-accent)]">{titleLength} characters</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 3: SHORTS SAFE ZONE ================= */}
        {activeTab === 'shorts' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div>
                <h2 className="text-base font-bold text-[var(--text-ink)]">
                  Shorts 9:16 Interactive Safe Zone Mask
                </h2>
                <p className="text-[var(--text-body)] mt-0.5">
                  YouTube Shorts overlays avatars, like/comment buttons, and title tickers over the edges of your video.
                </p>
              </div>
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => setShowShortsUi(!showShortsUi)}
                  className={`px-3 py-1.5 rounded-md border text-xs font-medium transition-colors ${
                    showShortsUi
                      ? 'border-[var(--brand-accent)] bg-[var(--brand-accent)] text-white'
                      : 'border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] text-[var(--text-body)] hover:text-[var(--text-ink)]'
                  }`}
                >
                  {showShortsUi ? 'Hide Shorts UI Overlay' : 'Show Shorts UI Overlay'}
                </button>
                <Link
                  href="/tools/youtube-shorts-safe-zone"
                  className="px-3 py-1.5 rounded-md border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] text-[var(--brand-accent)] hover:underline font-medium text-xs"
                >
                  Full Safe Zone Tool &rarr;
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
              {/* 9:16 Mobile Mockup */}
              <div className="sm:col-span-5 flex justify-center">
                <div className="relative w-[210px] h-[373px] rounded-3xl border-4 border-zinc-800 bg-gradient-to-b from-slate-900 via-indigo-950 to-zinc-900 overflow-hidden shadow-xl select-none">
                  {/* Phone Speaker Notch */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-3 rounded-full bg-zinc-800 z-30" />

                  {/* Video Center Safe Content */}
                  <div className="absolute inset-x-4 top-20 bottom-24 border border-dashed border-emerald-400/50 bg-emerald-500/10 rounded-xl flex flex-col items-center justify-center p-3 text-center">
                    <span className="text-[10px] font-mono font-bold text-emerald-300 uppercase tracking-wider">
                      ✓ SAFE ZONE
                    </span>
                    <p className="text-xs font-bold text-white mt-1">
                      Keep face &amp; main captions here
                    </p>
                    <p className="text-[10px] text-zinc-300 mt-1">
                      100% unobstructed on every smartphone
                    </p>
                  </div>

                  {/* Simulated YouTube Shorts UI Overlay */}
                  {showShortsUi && (
                    <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between p-3">
                      {/* Top Bar */}
                      <div className="pt-5 flex items-center justify-between text-white/80 text-[11px]">
                        <span>Shorts</span>
                        <div className="flex gap-2">
                          <span className="w-3.5 h-3.5 rounded-full bg-white/30" />
                          <span className="w-3.5 h-3.5 rounded-full bg-white/30" />
                        </div>
                      </div>

                      {/* Right Interaction Bar: Like, Dislike, Comment, Share */}
                      <div className="absolute right-2.5 bottom-14 flex flex-col items-center gap-3 text-white">
                        <div className="flex flex-col items-center">
                          <div className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-xs flex items-center justify-center text-[10px]">
                            👍
                          </div>
                          <span className="text-[9px] font-mono">14K</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-xs flex items-center justify-center text-[10px]">
                            💬
                          </div>
                          <span className="text-[9px] font-mono">428</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-xs flex items-center justify-center text-[10px]">
                            ↗
                          </div>
                          <span className="text-[9px] font-mono">Share</span>
                        </div>
                        <div className="w-7 h-7 rounded-md border border-white/40 bg-zinc-800" />
                      </div>

                      {/* Bottom Channel Info & Sound Ticker */}
                      <div className="pb-1 max-w-[140px] text-white space-y-1">
                        <div className="flex items-center gap-1.5">
                          <span className="w-5 h-5 rounded-full bg-rose-500 text-[9px] flex items-center justify-center font-bold">
                            C
                          </span>
                          <span className="text-[11px] font-bold truncate">@creovly</span>
                        </div>
                        <p className="text-[10px] text-zinc-200 line-clamp-1 font-medium">
                          Testing YouTube Shorts Safe Zone…
                        </p>
                        <div className="text-[9px] text-zinc-300 flex items-center gap-1">
                          <span>♫</span>
                          <span className="truncate">Original Audio</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Safe Zone Guidance Notes */}
              <div className="sm:col-span-7 space-y-3">
                <div className="p-4 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-subtle)] space-y-2.5">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] font-semibold">
                    Why Shorts Safe Zones Matter
                  </span>
                  <p className="text-xs text-[var(--text-body)] leading-relaxed">
                    YouTube places dynamic UI elements on all 4 borders of Shorts. Subtitles placed too low are covered by the description, and captions placed too far right are blocked by the like/comment buttons.
                  </p>
                  <ul className="text-xs space-y-1.5 text-[var(--text-body)] pt-1">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                      <span><strong>Right Margin:</strong> 15% blocked by engagement buttons.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                      <span><strong>Bottom Margin:</strong> 20% blocked by handle, title, and audio track.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span><strong>Center Box:</strong> 100% unobstructed view on all devices.</span>
                    </li>
                  </ul>
                </div>

                <div className="p-3.5 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] flex items-center justify-between text-xs">
                  <div>
                    <strong className="block text-[var(--text-ink)]">Need custom margins?</strong>
                    <span className="text-[var(--text-muted)]">Upload your own 9:16 frame to test.</span>
                  </div>
                  <Link
                    href="/tools/youtube-shorts-safe-zone"
                    className="px-3 py-1.5 rounded-md bg-[var(--brand-primary)] text-[var(--brand-on-primary)] font-medium text-xs shadow-2xs hover:opacity-90"
                  >
                    Open Tool
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mockup Footer Bar */}
      <div className="px-4 sm:px-6 py-3 border-t border-[var(--border-hairline)] bg-[var(--bg-canvas-subtle)] flex flex-wrap items-center justify-between gap-2 text-xs text-[var(--text-muted)]">
        <span className="flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5 text-emerald-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
          </svg>
          Zero uploads to external cloud • All checks run directly inside your browser
        </span>
        <Link href="/studio" className="text-[var(--brand-accent)] font-semibold hover:underline flex items-center gap-1">
          Launch Publish Studio &rarr;
        </Link>
      </div>
    </div>
  );
}
