'use client';

import React, { useState } from 'react';
import { useI18n, LocalizedLink } from '@/lib/i18n';

interface ThumbnailPreset {
  id: string;
  name: string;
  src: string;
  aspect: string;
  size: string;
  timestamp: string;
  format: '16:9' | '9:16';
}

export default function StudioHeroWorkspace() {
  const { t } = useI18n();
  const ws = t.home.studioWorkspace;

  const presets: ThumbnailPreset[] = [
    {
      id: 'workflow',
      name: ws.presetWorkflow,
      src: '/examples/compressor-source.jpg',
      aspect: '1280 × 720 HD',
      size: '1.1 MB JPEG',
      timestamp: '14:20',
      format: '16:9',
    },
    {
      id: 'framing',
      name: ws.presetFraming,
      src: '/examples/thumbnail-source.png',
      aspect: '1280 × 720 HD',
      size: '1.3 MB JPEG',
      timestamp: '08:45',
      format: '16:9',
    },
    {
      id: 'shorts',
      name: ws.presetShorts,
      src: '/examples/shorts-source.png',
      aspect: '1080 × 1920 (9:16)',
      size: '890 KB JPEG',
      timestamp: '00:54',
      format: '9:16',
    },
  ];

  const titlePresets = [
    ws.sampleTitle1,
    ws.sampleTitle2,
    ws.sampleTitle3,
  ];

  const [selectedTitleIdx, setSelectedTitleIdx] = useState<number | null>(0);
  const [customTitle, setCustomTitle] = useState<string | null>(null);
  const activeTitle =
    customTitle !== null
      ? customTitle
      : titlePresets[selectedTitleIdx ?? 0] || titlePresets[0];

  const [activePresetId, setActivePresetId] = useState<string>('workflow');
  const activePreset = presets.find(p => p.id === activePresetId) || presets[0];

  const [checklist, setChecklist] = useState({
    resolution: true,
    fileSize: true,
    safeZone: true,
    audioDisclosure: true,
    descriptionChapters: true,
  });

  const toggleCheck = (key: keyof typeof checklist) => {
    setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const titleLength = activeTitle.length;
  const isHookSafe = titleLength <= 50;
  const titleStatusText = isHookSafe
    ? ws.statusOptimal
    : titleLength <= 70
    ? ws.statusTruncates
    : ws.statusExceeds;

  const totalChecks = 6;
  const passedChecks =
    Object.values(checklist).filter(Boolean).length + (isHookSafe ? 1 : 0);

  const formattedCharsCount = ws.charsCount.replace('{count}', String(titleLength));
  const formattedReadyCount = ws.readyCount
    .replace('{passed}', String(passedChecks))
    .replace('{total}', String(totalChecks));

  return (
    <div
      data-ui
      className="w-full rounded-2xl border border-[var(--border-hairline-strong)] bg-zinc-950 text-zinc-100 shadow-[var(--shadow-floating)] overflow-hidden text-left"
    >
      {/* Studio Top Window Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-zinc-900/90 border-b border-zinc-800 text-xs">
        <div className="flex items-center gap-2.5">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
          </div>
          <span className="font-semibold text-zinc-200">
            {ws.title}{' '}
            <span className="text-zinc-500 font-normal">{ws.projectDraft}</span>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 text-[11px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            {ws.clientSideBadge}
          </span>
          <LocalizedLink
            href="/studio"
            className="text-[11px] font-semibold text-white bg-sky-600 hover:bg-sky-500 px-2.5 py-1 rounded transition-colors"
          >
            {ws.openStudio}
          </LocalizedLink>
        </div>
      </div>

      {/* Main 3-Column Studio Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-zinc-800/80">
        {/* Column 1: Metadata & Title Stress-Tester (4 cols) */}
        <div className="lg:col-span-4 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              {ws.colTitle}
            </h4>
            <span
              className={`text-xs font-semibold px-2 py-0.5 rounded ${
                isHookSafe
                  ? 'bg-emerald-500/15 text-emerald-300'
                  : 'bg-amber-500/15 text-amber-300'
              }`}
            >
              {formattedCharsCount}
            </span>
          </div>

          <div className="space-y-2">
            <label htmlFor="hero-studio-title" className="text-xs text-zinc-300 font-medium block">
              {ws.videoTitleLabel}
            </label>
            <input
              id="hero-studio-title"
              type="text"
              value={activeTitle}
              onChange={e => {
                setCustomTitle(e.target.value);
                setSelectedTitleIdx(null);
              }}
              className="w-full px-3 py-2 text-sm bg-zinc-900 border border-zinc-700/80 rounded-lg text-white focus:outline-none focus:border-sky-500 transition-colors"
              placeholder={ws.titlePlaceholder}
            />
            <p className="text-[11px] text-zinc-400 flex items-center justify-between">
              <span>{titleStatusText}</span>
              {isHookSafe ? (
                <span className="text-emerald-400 font-medium">{ws.badgeOptimal}</span>
              ) : (
                <span className="text-amber-400 font-medium">{ws.badgeReviewHook}</span>
              )}
            </p>
          </div>

          {/* Quick Preset Selector */}
          <div className="space-y-1.5 pt-1">
            <span className="text-[10px] uppercase font-semibold text-zinc-500 block">
              {ws.sampleTitlesLabel}
            </span>
            <div className="flex flex-col gap-1.5">
              {titlePresets.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setSelectedTitleIdx(idx);
                    setCustomTitle(null);
                  }}
                  className={`text-left text-xs px-2.5 py-1.5 rounded transition-colors truncate ${
                    activeTitle === preset
                      ? 'bg-zinc-800 text-sky-300 border border-zinc-700'
                      : 'bg-zinc-900/60 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
                  }`}
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Column 2: 16:9 Thumbnail Canvas (5 cols) */}
        <div className="lg:col-span-5 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              {ws.colThumbnail}
            </h4>
            <span className="text-xs text-zinc-400">{activePreset.aspect}</span>
          </div>

          {/* Thumbnail Preview Screen */}
          <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black border border-zinc-700/80 shadow-inner group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={activePreset.src}
              alt={ws.previewAlt}
              width={640}
              height={360}
              className={`w-full h-full ${
                activePreset.format === '9:16'
                  ? 'object-contain bg-zinc-950'
                  : 'object-cover'
              }`}
              loading="lazy"
              decoding="async"
            />

            {/* Platform Badges Overlay */}
            <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 z-10">
              <span className="px-2 py-0.5 rounded bg-black/80 backdrop-blur-sm border border-emerald-500/40 text-[10px] font-semibold text-emerald-300">
                {activePreset.size}
              </span>
              <span className="px-1.5 py-0.5 rounded bg-black/80 text-[10px] text-zinc-300">
                {ws.badgeHdPass}
              </span>
            </div>

            {/* Bottom-right YouTube Timestamp */}
            <div className="absolute bottom-2.5 right-2.5 z-10 px-1.5 py-0.5 rounded bg-black/90 text-white font-medium text-[11px] tracking-tight">
              {activePreset.timestamp}
            </div>
          </div>

          {/* Switch Format / Artwork Preset */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-semibold text-zinc-500">
              {ws.previewStyleLabel}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {presets.map(preset => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => setActivePresetId(preset.id)}
                  className={`text-xs px-2 py-1 rounded transition-colors ${
                    activePreset.id === preset.id
                      ? 'bg-sky-600 text-white font-medium'
                      : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                  }`}
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Column 3: 11-point Pre-Publish Checklist (3 cols) */}
        <div className="lg:col-span-3 p-5 space-y-4 bg-zinc-900/40 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                {ws.colChecklist}
              </h4>
              <span className="text-xs font-bold text-emerald-400">
                {formattedReadyCount}
              </span>
            </div>

            {/* Mini Checklist */}
            <div className="space-y-2 text-xs">
              <button
                type="button"
                onClick={() => toggleCheck('resolution')}
                className="w-full flex items-center justify-between text-left p-1.5 rounded hover:bg-zinc-800/60"
              >
                <span className="text-zinc-300 truncate">{ws.checkAspect}</span>
                <span className={checklist.resolution ? 'text-emerald-400 font-bold' : 'text-zinc-600'}>
                  {checklist.resolution ? ws.badgePass : ws.badgeSkip}
                </span>
              </button>

              <button
                type="button"
                onClick={() => toggleCheck('fileSize')}
                className="w-full flex items-center justify-between text-left p-1.5 rounded hover:bg-zinc-800/60"
              >
                <span className="text-zinc-300 truncate">{ws.checkFileSize}</span>
                <span className={checklist.fileSize ? 'text-emerald-400 font-bold' : 'text-zinc-600'}>
                  {checklist.fileSize ? ws.badgePass : ws.badgeSkip}
                </span>
              </button>

              <button
                type="button"
                onClick={() => toggleCheck('safeZone')}
                className="w-full flex items-center justify-between text-left p-1.5 rounded hover:bg-zinc-800/60"
              >
                <span className="text-zinc-300 truncate">{ws.checkSafeZone}</span>
                <span className={checklist.safeZone ? 'text-emerald-400 font-bold' : 'text-zinc-600'}>
                  {checklist.safeZone ? ws.badgePass : ws.badgeSkip}
                </span>
              </button>

              <div className="flex items-center justify-between p-1.5 text-zinc-300">
                <span className="truncate">{ws.checkHook}</span>
                <span className={isHookSafe ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
                  {isHookSafe ? ws.badgePass : ws.badgeWarn}
                </span>
              </div>

              <button
                type="button"
                onClick={() => toggleCheck('audioDisclosure')}
                className="w-full flex items-center justify-between text-left p-1.5 rounded hover:bg-zinc-800/60"
              >
                <span className="text-zinc-300 truncate">{ws.checkAudio}</span>
                <span className={checklist.audioDisclosure ? 'text-emerald-400 font-bold' : 'text-zinc-600'}>
                  {checklist.audioDisclosure ? ws.badgePass : ws.badgeSkip}
                </span>
              </button>

              <button
                type="button"
                onClick={() => toggleCheck('descriptionChapters')}
                className="w-full flex items-center justify-between text-left p-1.5 rounded hover:bg-zinc-800/60"
              >
                <span className="text-zinc-300 truncate">{ws.checkChapters}</span>
                <span className={checklist.descriptionChapters ? 'text-emerald-400 font-bold' : 'text-zinc-600'}>
                  {checklist.descriptionChapters ? ws.badgePass : ws.badgeSkip}
                </span>
              </button>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-3 border-t border-zinc-800">
            <LocalizedLink
              href="/studio"
              className="w-full flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold rounded-lg bg-white hover:bg-zinc-200 text-zinc-950 transition-colors shadow"
            >
              {ws.exportZip}
            </LocalizedLink>
          </div>
        </div>
      </div>
    </div>
  );
}
