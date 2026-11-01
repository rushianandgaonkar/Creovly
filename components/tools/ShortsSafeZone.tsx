/* Hallmark · genre: modern-minimal · macrostructure: Workbench */
'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
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
  downloadName,
  type OutputFormat,
} from '@/lib/image-compression';
import {
  checkShortsGuide,
  exportShortsGuide,
  starterBox,
  starterMargins,
  type Margins,
} from '@/lib/shorts-guide';
import { toolSamples } from '@/config/tool-samples';
import { useI18n } from '@/lib/i18n';

export default function ShortsSafeZone() {
  const { t } = useI18n();
  const [selected, setSelected] = useState<{
    file: File;
    width: number;
    height: number;
    format: OutputFormat;
  }>();
  const [margins, setMargins] = useState<Margins>(starterMargins);
  const [box, setBox] = useState(starterBox);
  const [markContent, setMarkContent] = useState(false);
  const [showGuide, setShowGuide] = useState(true);
  const [output, setOutput] = useState<Blob>();
  const [loading, setLoading] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [key, setKey] = useState(0);

  const request = useRef(0);
  const controller = useRef<AbortController | undefined>(undefined);
  const errorRef = useRef<HTMLDivElement>(null);

  const marginPresets = [
    { label: t.shorts.presetStandard, margins: starterMargins },
    { label: t.shorts.presetMinimal, margins: { top: 10, bottom: 15, left: 5, right: 10 } },
    { label: t.shorts.presetHighClearance, margins: { top: 20, bottom: 25, left: 8, right: 15 } },
  ];

  const source = useMemo(
    () => (selected ? new Blob([selected.file], { type: selected.format }) : undefined),
    [selected]
  );
  const sourceUrl = useBlobUrl(source);
  const outputUrl = useBlobUrl(output);

  const guide = checkShortsGuide(margins, markContent ? box : undefined);

  useEffect(() => {
    const ctrl = controller;
    const req = request;
    return () => {
      req.current++;
      ctrl.current?.abort();
    };
  }, []);

  useEffect(() => {
    if (error) errorRef.current?.focus();
  }, [error]);

  const clear = () => {
    request.current++;
    controller.current?.abort();
    setBusy(false);
    setLoading(false);
    setOutput(undefined);
    setError('');
  };

  const select = async (file: File) => {
    clear();
    const id = request.current;
    setSelected(undefined);
    setLoading(true);
    try {
      const format = await validateImage(file);
      const bitmap = await decodeImage(file);
      const dimensions = { width: bitmap.width, height: bitmap.height };
      bitmap.close();
      if (id === request.current) setSelected({ file, format, ...dimensions });
    } catch (cause) {
      if (id === request.current) {
        setError(cause instanceof Error ? cause.message : 'Could not open the frame.');
      }
    } finally {
      if (id === request.current) setLoading(false);
    }
  };

  const reset = () => {
    clear();
    setSelected(undefined);
    setMargins(starterMargins);
    setBox(starterBox);
    setMarkContent(false);
    setShowGuide(true);
    setKey((v) => v + 1);
  };

  const run = async () => {
    if (!selected || busy) return;
    clear();
    const id = request.current;
    const abort = new AbortController();
    controller.current = abort;
    setBusy(true);
    try {
      const blob = await exportShortsGuide(
        selected.file,
        margins,
        markContent ? box : undefined,
        abort.signal
      );
      if (id === request.current) setOutput(blob);
    } catch (cause) {
      if (id === request.current && !abort.signal.aborted) {
        setError(cause instanceof Error ? cause.message : 'Could not create the guide.');
      }
    } finally {
      if (id === request.current) setBusy(false);
    }
  };

  const positioned = {
    left: `${guide.center.x}%`,
    top: `${guide.center.y}%`,
    width: `${guide.center.width}%`,
    height: `${guide.center.height}%`,
  };

  return (
    <ToolWorkspaceLayout
      workspace={
        <>
          <DropZone
            key={key}
            id="shorts-frame"
            label={t.shorts.dropzoneLabel}
            maxSizeMB={20}
            privacyNote={t.common.dropzone.localPrivacyNote}
            onFileSelect={select}
            onError={setError}
            disabled={loading || busy}
            samples={toolSamples['youtube-shorts-safe-zone']}
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
                {selected.width} × {selected.height} px
              </span>
            </div>
          )}

          <fieldset disabled={busy || loading} className="space-y-5 min-w-0">
            <legend className="sr-only">Guide settings</legend>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-[var(--text-ink)]">
                  {t.shorts.marginPresetsHeading}
                </span>
                <span className="text-[10px] font-mono text-[var(--text-muted)]">
                  CLEARANCE
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {marginPresets.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => {
                      clear();
                      setMargins(preset.margins);
                    }}
                    className="px-2.5 py-1.5 rounded-md text-[11px] font-mono border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] text-[var(--text-body)] hover:border-[var(--brand-accent)] hover:text-[var(--text-ink)] transition-all cursor-pointer"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-subtle)]">
              <Slider
                id="margin-top"
                label={t.shorts.topMargin}
                min={0}
                max={40}
                unit="%"
                value={margins.top}
                onChange={(value) => {
                  clear();
                  setMargins((current) => ({ ...current, top: value }));
                }}
              />
              <Slider
                id="margin-bottom"
                label={t.shorts.bottomMargin}
                min={0}
                max={50}
                unit="%"
                value={margins.bottom}
                onChange={(value) => {
                  clear();
                  setMargins((current) => ({ ...current, bottom: value }));
                }}
              />
              <Slider
                id="margin-left"
                label={t.shorts.leftMargin}
                min={0}
                max={40}
                unit="%"
                value={margins.left}
                onChange={(value) => {
                  clear();
                  setMargins((current) => ({ ...current, left: value }));
                }}
              />
              <Slider
                id="margin-right"
                label={t.shorts.rightMargin}
                min={0}
                max={40}
                unit="%"
                value={margins.right}
                onChange={(value) => {
                  clear();
                  setMargins((current) => ({ ...current, right: value }));
                }}
              />
            </div>

            <div className="space-y-3 pt-2">
              <Toggle
                id="show-shorts-guide"
                label={t.shorts.guideToggle}
                checked={showGuide}
                onChange={(event) => setShowGuide(event.target.checked)}
              />
              <Toggle
                id="mark-shorts-content"
                label={t.shorts.contentBoxToggle}
                checked={markContent}
                onChange={(event) => {
                  clear();
                  setMarkContent(event.target.checked);
                }}
              />
            </div>

            {markContent && (
              <div className="space-y-4 p-4 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-subtle)]">
                <span className="text-xs font-mono font-medium text-[var(--text-ink)]">
                  {t.shorts.contentBoxHeading}
                </span>
                <Slider
                  id="content-x"
                  label={t.shorts.leftMargin}
                  min={0}
                  max={100 - box.width}
                  value={box.x}
                  unit="%"
                  onChange={(x) => {
                    clear();
                    setBox((current) => ({ ...current, x }));
                  }}
                />
                <Slider
                  id="content-y"
                  label={t.shorts.topMargin}
                  min={0}
                  max={100 - box.height}
                  value={box.y}
                  unit="%"
                  onChange={(y) => {
                    clear();
                    setBox((current) => ({ ...current, y }));
                  }}
                />
                <Slider
                  id="content-width"
                  label={t.resizer.widthLabel}
                  min={1}
                  max={100 - box.x}
                  value={box.width}
                  unit="%"
                  onChange={(width) => {
                    clear();
                    setBox((current) => ({ ...current, width }));
                  }}
                />
                <Slider
                  id="content-height"
                  label={t.resizer.heightLabel}
                  min={1}
                  max={100 - box.y}
                  value={box.height}
                  unit="%"
                  onChange={(height) => {
                    clear();
                    setBox((current) => ({ ...current, height }));
                  }}
                />
              </div>
            )}
          </fieldset>

          <div className="flex flex-wrap justify-between items-center gap-3 pt-4 border-t border-[var(--border-hairline-subtle)]">
            <Button variant="outline" size="sm" onClick={reset}>
              {t.shorts.buttonReset}
            </Button>
            <Button disabled={!selected || loading || busy} onClick={run}>
              {busy ? t.shorts.buttonExporting : t.shorts.buttonExport}
            </Button>
          </div>
        </>
      }
      results={
        <>
          {sourceUrl ? (
            <div className="space-y-4">
              <figure className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-semibold text-[var(--text-ink)]">
                    9:16 Portrait Viewport
                  </span>
                  <span className="text-[var(--text-muted)]">1080 × 1920 REF</span>
                </div>

                <div
                  className="relative mx-auto w-full max-w-[260px] aspect-[9/16] overflow-hidden rounded-2xl bg-black border border-[var(--border-hairline)] shadow-[var(--shadow-floating)]"
                  role="img"
                  aria-label="Shorts portrait preview with safe zone overlay"
                >
                  <Image
                    unoptimized
                    fill
                    sizes="260px"
                    src={sourceUrl}
                    alt="Shorts frame preview"
                    className="object-contain"
                  />

                  {/* YouTube Simulated Right Rail Icons */}
                  <div className="absolute right-2.5 bottom-20 flex flex-col items-center gap-3 pointer-events-none z-10 opacity-70">
                    <div className="w-7 h-7 rounded-full bg-black/60 flex items-center justify-center text-white text-[10px]">
                      👍
                    </div>
                    <div className="w-7 h-7 rounded-full bg-black/60 flex items-center justify-center text-white text-[10px]">
                      💬
                    </div>
                    <div className="w-7 h-7 rounded-full bg-black/60 flex items-center justify-center text-white text-[10px]">
                      ↗
                    </div>
                  </div>

                  {/* YouTube Simulated Bottom Creator Handle */}
                  <div className="absolute left-3 bottom-4 right-12 pointer-events-none z-10 opacity-70">
                    <div className="flex items-center gap-1.5 mb-1">
                      <div className="w-5 h-5 rounded-full bg-white/20" />
                      <div className="h-2.5 w-16 bg-white/40 rounded" />
                    </div>
                    <div className="h-2 w-32 bg-white/30 rounded" />
                  </div>

                  {showGuide && (
                    <>
                      <div
                        className="absolute border-2 border-emerald-400 z-20 pointer-events-none"
                        style={{
                          ...positioned,
                          boxShadow: '0 0 0 2000px rgba(220, 38, 38, 0.32)',
                        }}
                      />
                      <span className="absolute top-3 left-3 text-[10px] font-mono bg-black/80 text-emerald-400 px-2 py-0.5 rounded border border-emerald-400/30 z-20">
                        SAFE ZONE
                      </span>
                    </>
                  )}

                  {markContent && (
                    <div
                      className="absolute border-2 border-dashed border-amber-300 z-30 pointer-events-none"
                      style={{
                        left: `${box.x}%`,
                        top: `${box.y}%`,
                        width: `${box.width}%`,
                        height: `${box.height}%`,
                      }}
                    />
                  )}
                </div>
              </figure>

              <MetricCard
                label={t.shorts.resultsHeading}
                value={`${guide.center.width}% × ${guide.center.height}%`}
                subtext="Total unobstructed screen area"
              />

              {markContent && (
                <Alert
                  variant={guide.overlaps.length ? 'warning' : 'success'}
                  title={
                    guide.overlaps.length
                      ? t.shorts.statusOverlapDetected
                      : t.shorts.statusInSafeZone
                  }
                >
                  {guide.overlaps.length
                    ? `${t.shorts.statusOverlapDetected} (${guide.overlaps.join(', ')})`
                    : t.shorts.statusInSafeZone}
                </Alert>
              )}

              {outputUrl && (
                <a
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--brand-primary)] text-[var(--brand-on-primary)] px-4 py-3 text-sm font-semibold hover:opacity-90 transition-opacity focus-ring shadow-[var(--shadow-whisper)]"
                  href={outputUrl}
                  download={downloadName(selected?.file.name ?? 'frame', 'image/png').replace(
                    '-compressed.',
                    '-planning-guide.'
                  )}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  {t.shorts.buttonExport}
                </a>
              )}
            </div>
          ) : (
            <div className="py-16 text-center text-xs text-[var(--text-muted)] font-mono">
              {t.shorts.resultsPrompt}
            </div>
          )}
        </>
      }
    />
  );
}
