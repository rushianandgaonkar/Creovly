/* Hallmark · genre: modern-minimal · macrostructure: Workbench */
'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import DropZone from '@/components/form/DropZone';
import Slider from '@/components/form/Slider';
import Toggle from '@/components/form/Toggle';
import Button from '@/components/ui/Button';
import Alert from '@/components/feedback/Alert';
import MetricCard from '@/components/results/MetricCard';
import ToolWorkspaceLayout from './ToolWorkspaceLayout';
import { useBlobUrl } from './ImagePreview';
import {
  decodeImage,
  validateImage,
  formatBytes,
  type OutputFormat,
} from '@/lib/image-compression';
import { toolSamples } from '@/config/tool-samples';
import { useI18n } from '@/lib/i18n';
import { toolSeoContent } from '@/config/tool-guidance-i18n';

type DeviceView = 'all' | 'desktop' | 'tablet' | 'mobile' | 'tv';
type FitMode = 'cover' | 'contain';

export default function BannerResizer({ locale: propLocale }: { locale?: string } = {}) {
  const { t, locale: contextLocale } = useI18n();
  const currentLocale = (propLocale || contextLocale || 'en') as keyof typeof toolSeoContent;
  const seo = toolSeoContent[currentLocale] || toolSeoContent.en;
  const b = t.banner;

  const [selected, setSelected] = useState<{
    file: File;
    width: number;
    height: number;
    format: OutputFormat;
  }>();

  const [deviceView, setDeviceView] = useState<DeviceView>('all');
  const [fitMode, setFitMode] = useState<FitMode>('cover');
  const [zoom, setZoom] = useState(100);
  const [panX, setPanX] = useState(50);
  const [panY, setPanY] = useState(50);
  const [showGuide, setShowGuide] = useState(true);
  const [outputFormat, setOutputFormat] = useState<OutputFormat>('image/jpeg');

  const [outputBlob, setOutputBlob] = useState<Blob>();
  const [loading, setLoading] = useState(false);
  const [rendering, setRendering] = useState(false);
  const [error, setError] = useState('');
  const [fileKey, setFileKey] = useState(0);

  const request = useRef(0);
  const errorRef = useRef<HTMLDivElement>(null);

  const sourceBlob = useMemo(
    () => (selected ? new Blob([selected.file], { type: selected.format }) : undefined),
    [selected]
  );
  const sourceUrl = useBlobUrl(sourceBlob);
  const outputUrl = useBlobUrl(outputBlob);

  useEffect(() => {
    if (error) errorRef.current?.focus();
  }, [error]);

  const clear = () => {
    request.current++;
    setRendering(false);
    setLoading(false);
    setOutputBlob(undefined);
    setError('');
  };

  const handleSelect = async (file: File) => {
    clear();
    const id = request.current;
    setSelected(undefined);
    setLoading(true);

    try {
      const format = await validateImage(file);
      const bitmap = await decodeImage(file);
      const dimensions = { width: bitmap.width, height: bitmap.height };
      bitmap.close();

      if (id !== request.current) return;
      setSelected({ file, ...dimensions, format });
      setLoading(false);
    } catch (err) {
      if (id !== request.current) return;
      setLoading(false);
      setError(err instanceof Error ? err.message : 'Could not decode this image.');
    }
  };

  // Render 2560 x 1440 banner to blob
  const renderBanner = useCallback(async () => {
    if (!selected) return;
    setRendering(true);
    setError('');

    try {
      const bitmap = await decodeImage(selected.file);
      const canvas = document.createElement('canvas');
      canvas.width = 2560;
      canvas.height = 1440;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        bitmap.close();
        throw new Error('Canvas context could not be created');
      }

      // Background fill
      ctx.fillStyle = '#090a0f';
      ctx.fillRect(0, 0, 2560, 1440);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      const zoomFactor = zoom / 100;
      let drawWidth = 0;
      let drawHeight = 0;
      let drawX = 0;
      let drawY = 0;

      if (fitMode === 'cover') {
        const baseScale = Math.max(2560 / bitmap.width, 1440 / bitmap.height);
        const finalScale = baseScale * zoomFactor;
        drawWidth = bitmap.width * finalScale;
        drawHeight = bitmap.height * finalScale;
        drawX = (2560 - drawWidth) * (panX / 100);
        drawY = (1440 - drawHeight) * (panY / 100);
      } else {
        const baseScale = Math.min(2560 / bitmap.width, 1440 / bitmap.height);
        const finalScale = baseScale * zoomFactor;
        drawWidth = bitmap.width * finalScale;
        drawHeight = bitmap.height * finalScale;
        drawX = (2560 - drawWidth) / 2 + (2560 - drawWidth) * ((panX - 50) / 100);
        drawY = (1440 - drawHeight) / 2 + (1440 - drawHeight) * ((panY - 50) / 100);
      }

      ctx.drawImage(bitmap, drawX, drawY, drawWidth, drawHeight);
      bitmap.close();

      const quality = outputFormat === 'image/jpeg' ? 0.92 : undefined;
      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, outputFormat, quality)
      );

      canvas.width = 0;
      canvas.height = 0;

      if (!blob) {
        throw new Error('Could not export canvas to image blob');
      }

      setOutputBlob(blob);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Banner render failed.');
    } finally {
      setRendering(false);
    }
  }, [selected, fitMode, zoom, panX, panY, outputFormat]);

  // Re-render banner output whenever settings change
  useEffect(() => {
    if (selected) {
      renderBanner();
    }
  }, [selected, fitMode, zoom, panX, panY, outputFormat, renderBanner]);

  const resetControls = () => {
    setDeviceView('all');
    setFitMode('cover');
    setZoom(100);
    setPanX(50);
    setPanY(50);
    setShowGuide(true);
    setOutputFormat('image/jpeg');
  };

  const isOverSize = outputBlob && outputBlob.size > 6 * 1024 * 1024;

  const deviceButtons: { id: DeviceView; label: string; tag: string }[] = [
    { id: 'all', label: b.viewAll, tag: 'GUIDE' },
    { id: 'desktop', label: b.viewDesktop, tag: '2560×423' },
    { id: 'tablet', label: b.viewTablet, tag: '1855×423' },
    { id: 'mobile', label: b.viewMobile, tag: '1546×423' },
    { id: 'tv', label: b.viewTv, tag: '2560×1440' },
  ];

  return (
    <ToolWorkspaceLayout
      workspace={
        <>
          <DropZone
            key={fileKey}
            id="banner-image"
            label={b.dropzoneLabel}
            accept="image/jpeg,image/png,image/webp"
            maxSizeMB={20}
            privacyNote={t.common.dropzone.localPrivacyNote}
            onFileSelect={handleSelect}
            onError={setError}
            disabled={loading || rendering}
            samples={toolSamples['youtube-banner-size']}
          />

          <div ref={errorRef} tabIndex={-1} className="rounded focus-ring">
            {error && (
              <Alert variant="error" title={t.compressor.errors.checkBatchOrSettings}>
                {error}
              </Alert>
            )}
          </div>

          {selected && (
            <div className="flex items-center justify-between p-3 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-subtle)] text-xs font-mono">
              <span className="truncate max-w-[200px] text-[var(--text-ink)] font-medium">
                {selected.file.name}
              </span>
              <span className="text-[var(--text-muted)]">
                {selected.width} × {selected.height} px • {formatBytes(selected.file.size)}
              </span>
            </div>
          )}

          <fieldset disabled={rendering || loading} className="space-y-5 min-w-0">
            <legend className="sr-only">Banner calibrator controls</legend>

            {/* Device Display Preview Selector */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-[var(--text-ink)]">
                  {b.deviceViewHeading}
                </span>
                <span className="text-[10px] font-mono text-[var(--text-muted)]">
                  DISPLAYS
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                {deviceButtons.map((btn) => (
                  <button
                    key={btn.id}
                    type="button"
                    onClick={() => setDeviceView(btn.id)}
                    className={`px-2.5 py-2 rounded-lg text-left border text-xs transition-all cursor-pointer ${
                      deviceView === btn.id
                        ? 'border-[var(--brand-accent)] bg-[var(--brand-accent)]/10 text-[var(--text-ink)] font-semibold shadow-sm'
                        : 'border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] text-[var(--text-body)] hover:border-[var(--border-strong)]'
                    }`}
                  >
                    <div className="font-medium truncate">{btn.label}</div>
                    <div className="text-[10px] font-mono text-[var(--text-muted)] mt-0.5">{btn.tag}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Framing Fit Mode */}
            <div className="space-y-2">
              <span className="text-xs font-medium text-[var(--text-ink)] block">
                {b.fitModeHeading}
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setFitMode('cover')}
                  className={`px-3 py-2 rounded-lg border text-xs text-center cursor-pointer transition-all ${
                    fitMode === 'cover'
                      ? 'border-[var(--brand-accent)] bg-[var(--brand-accent)]/10 text-[var(--text-ink)] font-semibold'
                      : 'border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] text-[var(--text-body)]'
                  }`}
                >
                  {b.fitCover}
                </button>
                <button
                  type="button"
                  onClick={() => setFitMode('contain')}
                  className={`px-3 py-2 rounded-lg border text-xs text-center cursor-pointer transition-all ${
                    fitMode === 'contain'
                      ? 'border-[var(--brand-accent)] bg-[var(--brand-accent)]/10 text-[var(--text-ink)] font-semibold'
                      : 'border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] text-[var(--text-body)]'
                  }`}
                >
                  {b.fitContain}
                </button>
              </div>
            </div>

            {/* Sliders: Zoom, Pan X, Pan Y */}
            <div className="space-y-4 p-4 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-subtle)]">
              <Slider
                id="banner-zoom"
                label={b.zoomLabel}
                min={50}
                max={200}
                unit="%"
                value={zoom}
                onChange={setZoom}
              />
              <Slider
                id="banner-pan-x"
                label={b.panXLabel}
                min={0}
                max={100}
                unit="%"
                value={panX}
                onChange={setPanX}
              />
              <Slider
                id="banner-pan-y"
                label={b.panYLabel}
                min={0}
                max={100}
                unit="%"
                value={panY}
                onChange={setPanY}
              />
            </div>

            {/* Toggles & Format */}
            <div className="space-y-3 pt-1">
              <div className="flex items-center justify-between p-3 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)]">
                <Toggle
                  id="guide-toggle"
                  label={b.guideToggle}
                  checked={showGuide}
                  onCheckedChange={setShowGuide}
                />
              </div>

              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-xs">
                  <span className="text-[var(--text-muted)] font-mono text-[11px]">FORMAT:</span>
                  <button
                    type="button"
                    onClick={() => setOutputFormat('image/jpeg')}
                    className={`px-2.5 py-1 rounded text-xs font-mono border cursor-pointer ${
                      outputFormat === 'image/jpeg'
                        ? 'border-[var(--brand-accent)] bg-[var(--brand-accent)]/15 text-[var(--text-ink)] font-bold'
                        : 'border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] text-[var(--text-muted)]'
                    }`}
                  >
                    JPEG
                  </button>
                  <button
                    type="button"
                    onClick={() => setOutputFormat('image/png')}
                    className={`px-2.5 py-1 rounded text-xs font-mono border cursor-pointer ${
                      outputFormat === 'image/png'
                        ? 'border-[var(--brand-accent)] bg-[var(--brand-accent)]/15 text-[var(--text-ink)] font-bold'
                        : 'border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] text-[var(--text-muted)]'
                    }`}
                  >
                    PNG
                  </button>
                </div>

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={resetControls}
                  className="text-xs text-[var(--text-muted)] hover:text-[var(--text-ink)]"
                >
                  {b.buttonReset}
                </Button>
              </div>
            </div>

            {/* Download Template Action Card */}
            <div className="p-4 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-subtle)] space-y-2">
              <div className="text-xs font-semibold text-[var(--text-ink)] flex items-center justify-between">
                <span>{seo.bannerSpecs.cardTitle}</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[var(--bg-canvas-elevated)] border border-[var(--border-hairline)] text-[var(--text-muted)]">
                  {seo.bannerSpecs.cardBadge}
                </span>
              </div>
              <p className="text-[11px] text-[var(--text-body)] leading-relaxed">
                {seo.bannerSpecs.cardDesc}
              </p>
              <a
                href="/templates/youtube-banner-size-template.png"
                download="youtube-banner-size-template.png"
                className="inline-flex items-center gap-1.5 text-xs text-[var(--brand-accent)] hover:underline font-medium pt-1"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                {b.buttonTemplate}
              </a>
            </div>
          </fieldset>
        </>
      }
      results={
        <>
          {sourceUrl ? (
            <div className="space-y-4">
              <figure className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-semibold text-[var(--text-ink)]">
                    16:9 Canvas Viewport
                  </span>
                  <span className="text-[var(--text-muted)]">2560 × 1440 TV SPEC</span>
                </div>

                {/* 16:9 Banner Preview Container */}
                <div
                  className="relative w-full aspect-[16/9] overflow-hidden rounded-xl bg-black border border-[var(--border-hairline)] shadow-[var(--shadow-floating)] select-none"
                  role="img"
                  aria-label="YouTube banner canvas with safe zone calibration"
                >
                  {/* Artwork Preview rendered with CSS transformations matching canvas logic */}
                  <div className="absolute inset-0 overflow-hidden flex items-center justify-center">
                    <Image
                      unoptimized
                      fill
                      sizes="(max-width: 1024px) 100vw, 640px"
                      src={sourceUrl}
                      alt="Banner artwork preview"
                      className="transition-transform duration-75"
                      style={{
                        objectFit: fitMode,
                        transform: `scale(${zoom / 100}) translate(${(panX - 50) * 0.5}%, ${(panY - 50) * 0.5}%)`,
                      }}
                    />
                  </div>

                  {/* Device Overlays / Masks */}
                  {/* 1. Desktop Strip Mask (Outside 2560 x 423) */}
                  {deviceView === 'desktop' && (
                    <>
                      <div className="absolute inset-x-0 top-0 bg-black/85 backdrop-blur-[2px] pointer-events-none" style={{ height: '35.3125%' }} />
                      <div className="absolute inset-x-0 bottom-0 bg-black/85 backdrop-blur-[2px] pointer-events-none" style={{ height: '35.3125%' }} />
                    </>
                  )}

                  {/* 2. Tablet View Mask (Outside 1855 x 423) */}
                  {deviceView === 'tablet' && (
                    <>
                      <div className="absolute inset-x-0 top-0 bg-black/85 backdrop-blur-[2px] pointer-events-none" style={{ height: '35.3125%' }} />
                      <div className="absolute inset-x-0 bottom-0 bg-black/85 backdrop-blur-[2px] pointer-events-none" style={{ height: '35.3125%' }} />
                      <div className="absolute inset-y-0 left-0 bg-black/85 backdrop-blur-[2px] pointer-events-none" style={{ width: '13.77%', top: '35.3125%', height: '29.375%' }} />
                      <div className="absolute inset-y-0 right-0 bg-black/85 backdrop-blur-[2px] pointer-events-none" style={{ width: '13.77%', top: '35.3125%', height: '29.375%' }} />
                    </>
                  )}

                  {/* 3. Mobile View Mask (Outside 1546 x 423) */}
                  {deviceView === 'mobile' && (
                    <>
                      <div className="absolute inset-x-0 top-0 bg-black/90 backdrop-blur-[2px] pointer-events-none" style={{ height: '35.3125%' }} />
                      <div className="absolute inset-x-0 bottom-0 bg-black/90 backdrop-blur-[2px] pointer-events-none" style={{ height: '35.3125%' }} />
                      <div className="absolute inset-y-0 left-0 bg-black/90 backdrop-blur-[2px] pointer-events-none" style={{ width: '19.805%', top: '35.3125%', height: '29.375%' }} />
                      <div className="absolute inset-y-0 right-0 bg-black/90 backdrop-blur-[2px] pointer-events-none" style={{ width: '19.805%', top: '35.3125%', height: '29.375%' }} />
                    </>
                  )}

                  {/* Guidelines Overlay (active when showGuide is on) */}
                  {showGuide && (
                    <>
                      {/* Desktop Full Horizontal Band (2560 × 423) */}
                      <div
                        className="absolute inset-x-0 border-y border-amber-400/70 pointer-events-none z-10"
                        style={{ top: '35.3125%', height: '29.375%' }}
                      >
                        {/* Tablet Boundary Markers */}
                        <div
                          className="absolute inset-y-0 border-x border-dashed border-sky-400/80 pointer-events-none"
                          style={{ left: '13.77%', width: '72.46%' }}
                        />

                        {/* Mobile Safe Area (1546 × 423) */}
                        <div
                          className="absolute inset-y-0 border-2 border-emerald-400 bg-emerald-500/10 pointer-events-none shadow-[0_0_15px_rgba(16,185,129,0.3)] flex items-center justify-center"
                          style={{ left: '19.805%', width: '60.39%' }}
                        >
                          <span className="text-[10px] font-mono font-bold text-emerald-300 bg-black/75 px-1.5 py-0.5 rounded border border-emerald-400/40">
                            MOBILE SAFE ZONE (1546 × 423)
                          </span>
                        </div>
                      </div>

                      {/* Corner Tags */}
                      <span className="absolute top-2 left-2 text-[9px] font-mono bg-black/80 text-zinc-300 px-1.5 py-0.5 rounded border border-zinc-700/60 z-20">
                        TV: 2560 × 1440
                      </span>
                      <span className="absolute top-2 right-2 text-[9px] font-mono bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded border border-amber-400/40 z-20">
                        DESKTOP: 2560 × 423
                      </span>
                    </>
                  )}
                </div>
              </figure>

              {/* Notice & Metrics */}
              <div className="p-3 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-xs text-emerald-300 flex items-start gap-2">
                <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{b.safeAreaNotice}</span>
              </div>

              {isOverSize && (
                <Alert variant="warning" title="File Size Limit">
                  {b.warningSize}
                </Alert>
              )}

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <MetricCard
                  label="Output Size"
                  value="2560 × 1440"
                  subtext="Official TV Canvas"
                />
                <MetricCard
                  label="Safe Zone"
                  value="1546 × 423"
                  subtext="Mobile & Desktop"
                />
                <MetricCard
                  label="Payload"
                  value={outputBlob ? formatBytes(outputBlob.size) : '…'}
                  subtext={isOverSize ? '> 6 MB limit' : 'Under 6 MB limit'}
                />
              </div>

              {/* Download / Export Action */}
              <div className="pt-2">
                {outputUrl ? (
                  <a
                    href={outputUrl}
                    download={`youtube-banner-2560x1440.${outputFormat === 'image/jpeg' ? 'jpg' : 'png'}`}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--brand-primary)] text-[var(--brand-on-primary)] px-6 py-3.5 text-sm font-semibold hover:opacity-90 transition-opacity focus-ring shadow-[var(--shadow-floating)]"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    {b.buttonExport}
                  </a>
                ) : (
                  <Button
                    type="button"
                    variant="primary"
                    size="lg"
                    className="w-full"
                    disabled={rendering}
                    onClick={renderBanner}
                  >
                    {rendering ? b.buttonExporting : b.buttonExport}
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div className="h-64 sm:h-80 rounded-2xl border border-dashed border-[var(--border-hairline)] bg-[var(--bg-canvas-subtle)] flex flex-col items-center justify-center p-6 text-center">
              <div className="w-12 h-12 rounded-xl bg-[var(--bg-canvas-elevated)] border border-[var(--border-hairline)] flex items-center justify-center text-[var(--text-muted)] mb-3">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-[var(--text-ink)] mb-1">
                {b.resultsHeading}
              </h3>
              <p className="text-xs text-[var(--text-muted)] max-w-sm leading-relaxed">
                {b.resultsPrompt}
              </p>
            </div>
          )}
        </>
      }
    />
  );
}

