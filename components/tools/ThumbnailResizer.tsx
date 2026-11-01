/* Hallmark · genre: modern-minimal · macrostructure: Workbench */
'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import DropZone from '@/components/form/DropZone';
import Select from '@/components/form/Select';
import NumberInput from '@/components/form/NumberInput';
import Slider from '@/components/form/Slider';
import Button from '@/components/ui/Button';
import Alert from '@/components/feedback/Alert';
import MetricCard from '@/components/results/MetricCard';
import ToolWorkspaceLayout from './ToolWorkspaceLayout';
import ImagePreview, { useBlobUrl } from './ImagePreview';
import {
  decodeImage,
  validateImage,
  formatBytes,
  formatLabel,
  downloadName,
  type OutputFormat,
} from '@/lib/image-compression';
import { resizeGeometry, resizeImage, validateResize, type ResizeOptions } from '@/lib/image-resize';
import { toolSamples } from '@/config/tool-samples';
import { artworkPresets, artworkGuide, artworkWarnings } from '@/config/artwork-presets';
import ArtworkPresetPicker from '@/components/ui/ArtworkPresetPicker';
import styles from '@/components/ui/artwork.module.css';
import { useI18n, LocalizedLink } from '@/lib/i18n';

const defaults: ResizeOptions = {
  width: 1280,
  height: 720,
  fit: 'cover',
  x: 50,
  y: 50,
  background: 'white',
  format: 'image/jpeg',
  quality: 0.9,
};

export default function ThumbnailResizer() {
  const { t, translateHref } = useI18n();
  const [selected, setSelected] = useState<{
    file: File;
    width: number;
    height: number;
    format: OutputFormat;
  }>();
  const [options, setOptions] = useState(defaults);
  const [preset, setPreset] = useState('thumbnail');
  const [showGuide, setShowGuide] = useState(true);
  const [width, setWidth] = useState('1280');
  const [height, setHeight] = useState('720');
  const [result, setResult] = useState<Awaited<ReturnType<typeof resizeImage>>>();
  const [loading, setLoading] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [fileKey, setFileKey] = useState(0);

  const generation = useRef(0);
  const controller = useRef<AbortController | undefined>(undefined);
  const errorRef = useRef<HTMLDivElement>(null);

  const sourceBlob = useMemo(
    () => (selected ? new Blob([selected.file], { type: selected.format }) : undefined),
    [selected]
  );
  const sourceUrl = useBlobUrl(sourceBlob);
  const outputUrl = useBlobUrl(result?.blob);

  const settings = { ...options, width: Number(width), height: Number(height) };
  const activePreset = artworkPresets.find((item) => item.id === preset);
  const guide = artworkGuide(preset);
  const guideStyle = guide
    ? {
        left: `${guide.left}%`,
        top: `${guide.top}%`,
        width: `${guide.width}%`,
        height: `${guide.height}%`,
        borderRadius: guide.shape === 'circle' ? '50%' : 0,
      }
    : undefined;
  const overlay =
    guide && showGuide ? <span aria-hidden="true" className={styles.guide} style={guideStyle} /> : undefined;
  const warnings = result ? artworkWarnings(preset, result.blob.size, result.blob.type) : [];
  let valid = true;
  try {
    validateResize(settings);
  } catch {
    valid = false;
  }

  const upscaled =
    selected &&
    valid &&
    resizeGeometry(selected.width, selected.height, settings.width, settings.height, options.fit).scale > 1;

  useEffect(() => {
    const ctrl = controller;
    const gen = generation;
    return () => {
      gen.current++;
      ctrl.current?.abort();
    };
  }, []);

  useEffect(() => {
    if (error) errorRef.current?.focus();
  }, [error]);

  const cancel = () => {
    generation.current++;
    controller.current?.abort();
    setBusy(false);
    setLoading(false);
  };

  const clear = () => {
    cancel();
    setResult(undefined);
    setError('');
  };

  const change = (patch: Partial<ResizeOptions>) => {
    clear();
    setOptions((current) => ({ ...current, ...patch }));
  };

  const choosePreset = (id: string) => {
    clear();
    setPreset(id);
    setShowGuide(true);
    const next = artworkPresets.find((item) => item.id === id);
    if (!next) return;
    setWidth(String(next.width));
    setHeight(String(next.height));
    setOptions((current) => ({
      ...current,
      width: next.width,
      height: next.height,
      x: 50,
      y: 50,
      fit: next.fit,
      format: next.format,
      background: next.background,
    }));
  };

  const selectFile = async (file: File) => {
    clear();
    setSelected(undefined);
    setLoading(true);
    const id = generation.current;
    try {
      const format = await validateImage(file);
      const bitmap = await decodeImage(file);
      const dimensions = { width: bitmap.width, height: bitmap.height };
      bitmap.close();
      if (id === generation.current) setSelected({ file, format, ...dimensions });
    } catch (cause) {
      if (id === generation.current) {
        setError(cause instanceof Error ? cause.message : 'Could not open this image.');
      }
    } finally {
      if (id === generation.current) setLoading(false);
    }
  };

  const reset = () => {
    clear();
    setSelected(undefined);
    setOptions(defaults);
    setWidth('1280');
    setHeight('720');
    setPreset('thumbnail');
    setShowGuide(true);
    setFileKey((key) => key + 1);
  };

  const run = async () => {
    if (!selected || busy) return;
    clear();
    const id = generation.current;
    const abort = new AbortController();
    controller.current = abort;
    setBusy(true);
    try {
      const output = await resizeImage(selected.file, settings, abort.signal);
      if (id === generation.current) setResult(output);
    } catch (cause) {
      if (id === generation.current && !abort.signal.aborted) {
        setError(cause instanceof Error ? cause.message : 'Resize failed. Please try again.');
      }
    } finally {
      if (id === generation.current) setBusy(false);
    }
  };

  const getPresetLabel = (id: string, fallback: string): string => {
    switch (id) {
      case 'thumbnail':
        return t.resizer.presets.thumbnail.label;
      case 'banner':
        return t.resizer.presets.banner.label;
      case 'profile':
        return t.resizer.presets.profile.label;
      case 'watermark':
        return t.resizer.presets.watermark.label;
      default:
        return fallback;
    }
  };

  return (
    <ToolWorkspaceLayout
      workspace={
        <>
          <ArtworkPresetPicker value={preset} onChange={choosePreset} disabled={loading || busy} />
          <DropZone
            key={fileKey}
            id="resizer-file"
            label={t.resizer.dropzoneLabel}
            maxSizeMB={20}
            privacyNote={t.common.dropzone.localPrivacyNote}
            disabled={loading || busy}
            onFileSelect={selectFile}
            onError={setError}
            samples={toolSamples['youtube-thumbnail-resizer']}
          />

          <div ref={errorRef} tabIndex={-1} className="focus-ring rounded-md">
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
                {selected.width} × {selected.height} px · {formatBytes(selected.file.size)}
              </span>
            </div>
          )}

          <fieldset disabled={loading || busy} className="space-y-5 min-w-0">
            <legend className="sr-only">Resize settings</legend>

            <Select
              id="artwork-size"
              label={t.resizer.presetPickerHeading}
              value={preset}
              onChange={(event) => choosePreset(event.target.value)}
              options={[
                ...artworkPresets.map((item) => ({
                  value: item.id,
                  label: `${getPresetLabel(item.id, item.label)} · ${item.width} × ${item.height}`,
                })),
                { value: 'custom', label: t.resizer.customDimensionsHeading },
              ]}
            />
            <p className="text-xs text-[var(--text-body)]">
              {activePreset ? activePreset.description : t.resizer.dropzoneHint}
            </p>

            {preset === 'custom' && (
              <div className="grid grid-cols-2 gap-4">
                <NumberInput
                  id="resize-width"
                  label={t.resizer.widthLabel}
                  suffix="px"
                  min={1}
                  max={8192}
                  value={width}
                  onChange={(event) => {
                    clear();
                    setWidth(event.target.value);
                  }}
                />
                <NumberInput
                  id="resize-height"
                  label={t.resizer.heightLabel}
                  suffix="px"
                  min={1}
                  max={8192}
                  value={height}
                  onChange={(event) => {
                    clear();
                    setHeight(event.target.value);
                  }}
                />
              </div>
            )}

            <Select
              id="resize-fit"
              label={t.resizer.framingHeading}
              value={options.fit}
              onChange={(event) => change({ fit: event.target.value as ResizeOptions['fit'] })}
              options={[
                { value: 'cover', label: t.resizer.fitCover },
                { value: 'contain', label: t.resizer.fitContain },
              ]}
            />

            {options.fit === 'cover' ? (
              <div className="space-y-3 p-4 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-subtle)]">
                <span className="text-xs font-mono font-medium text-[var(--text-ink)]">
                  {t.resizer.framingHeading}
                </span>
                <Slider
                  id="crop-x"
                  label={t.resizer.positionX}
                  value={options.x}
                  unit="%"
                  onChange={(x) => change({ x })}
                />
                <Slider
                  id="crop-y"
                  label={t.resizer.positionY}
                  value={options.y}
                  unit="%"
                  onChange={(y) => change({ y })}
                />
              </div>
            ) : (
              <p className="text-xs text-[var(--text-body)] leading-relaxed">
                {t.resizer.fitExplanationContain}
              </p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select
                id="resize-background"
                label={t.resizer.backgroundColor}
                value={options.background}
                onChange={(event) =>
                  change({ background: event.target.value as ResizeOptions['background'] })
                }
                options={[
                  { value: 'white', label: 'White' },
                  { value: 'black', label: 'Black' },
                  { value: 'transparent', label: 'Transparent' },
                ]}
              />
              <Select
                id="resize-format"
                label={t.resizer.exportOptionsHeading}
                value={options.format}
                onChange={(event) => change({ format: event.target.value as OutputFormat })}
                options={[
                  { value: 'image/jpeg', label: 'JPEG' },
                  { value: 'image/png', label: 'PNG' },
                  { value: 'image/webp', label: 'WebP' },
                ]}
              />
            </div>

            {options.format !== 'image/png' && (
              <Slider
                id="resize-quality"
                label={t.compressor.maxQualityLabel}
                min={25}
                max={95}
                value={Math.round(options.quality * 100)}
                unit="%"
                onChange={(q) => change({ quality: q / 100 })}
              />
            )}
          </fieldset>

          {options.background === 'transparent' && options.format === 'image/jpeg' && (
            <p className="text-xs text-[var(--text-body)]">
              {t.compressor.formatExplanationJpeg}
            </p>
          )}

          {upscaled && (
            <Alert variant="warning" title={t.resizer.warnings.underSize}>
              {t.resizer.warnings.underSize}
            </Alert>
          )}

          <div className="flex flex-wrap justify-between items-center gap-3 pt-4 border-t border-[var(--border-hairline-subtle)]">
            <Button variant="outline" size="sm" onClick={reset}>
              {t.resizer.buttonReset}
            </Button>
            <Button disabled={!selected || busy || loading} onClick={run}>
              {busy ? t.resizer.buttonResizing : t.resizer.buttonResize}
            </Button>
          </div>
        </>
      }
      results={
        <>
          <div>
            <h3 className="text-base font-semibold">
              {getPresetLabel(preset, activePreset?.label ?? 'Artwork')}{' '}
              <span className="text-xs font-normal text-[var(--text-body)]">
                {valid ? `${settings.width} × ${settings.height}` : ''}
              </span>
            </h3>
            {guide && (
              <label className="flex items-center gap-2 mt-3 text-sm">
                <input
                  type="checkbox"
                  checked={showGuide}
                  onChange={(event) => setShowGuide(event.target.checked)}
                  className="focus-ring"
                />
                {t.resizer.guideOverlayToggle}
              </label>
            )}
          </div>
          {!selected && (
            <div className={styles.empty}>
              <div
                aria-hidden="true"
                className={styles.canvas}
                style={{
                  aspectRatio: valid ? `${settings.width}/${settings.height}` : '16/9',
                  width: `min(100%, ${
                    valid ? Math.min(400, (220 * settings.width) / settings.height) : 400
                  }px)`,
                }}
              >
                {guide && showGuide && <span className={styles.emptyGuide} style={guideStyle} />}
              </div>
              <p className="text-sm font-medium">{t.resizer.resultsHeading}</p>
              <p className="text-xs text-[var(--text-body)] mt-2">
                {t.resizer.resultsPrompt}
              </p>
            </div>
          )}

          {selected && sourceUrl && (
            <ImagePreview
              url={sourceUrl}
              title={t.resizer.originalDimensions}
              width={selected.width}
              height={selected.height}
            />
          )}

          {selected && sourceUrl && valid && !result && (
            <ImagePreview
              url={sourceUrl}
              title={t.resizer.newDimensions}
              width={selected.width}
              height={selected.height}
              overlay={overlay}
              transparencyGrid={options.background === 'transparent' && options.format !== 'image/jpeg'}
              frame={{
                width: settings.width,
                height: settings.height,
                fit: options.fit,
                x: options.x,
                y: options.y,
                background:
                  options.background === 'transparent'
                    ? options.format === 'image/jpeg'
                      ? 'white'
                      : 'transparent'
                    : options.background,
              }}
            />
          )}

          {selected && result && (
            <>
              {outputUrl && (
                <ImagePreview
                  url={outputUrl}
                  title={t.resizer.resultsHeading}
                  width={result.width}
                  height={result.height}
                  overlay={overlay}
                  transparencyGrid={options.background === 'transparent' && options.format !== 'image/jpeg'}
                  frame={{
                    width: result.width,
                    height: result.height,
                    fit: 'contain',
                    x: 50,
                    y: 50,
                    background: 'transparent',
                  }}
                />
              )}

              <div className="grid grid-cols-2 gap-3">
                <MetricCard label={t.resizer.newDimensions} value={`${result.width} × ${result.height}`} />
                <MetricCard
                  label={t.compressor.targetSizeLabel}
                  value={formatBytes(result.blob.size)}
                  subtext={formatLabel(result.blob.type)}
                />
              </div>
              {warnings.map((warning) => (
                <Alert key={warning} variant="warning" title="Notice">
                  {warning}
                </Alert>
              ))}

              {outputUrl && (
                <a
                  href={outputUrl}
                  download={downloadName(selected.file.name, options.format).replace(
                    '-compressed.',
                    `-${result.width}x${result.height}.`
                  )}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--brand-primary)] text-[var(--brand-on-primary)] px-4 py-3 text-sm font-semibold hover:opacity-90 transition-opacity focus-ring shadow-[var(--shadow-whisper)]"
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
                  {t.resizer.buttonDownload.replace('{format}', `${result.width}×${result.height} ${formatLabel(result.blob.type)}`)}
                </a>
              )}

              <Button
                href={translateHref('/tools/youtube-thumbnail-compressor')}
                variant="outline"
                className="w-full text-xs font-mono"
              >
                {t.compressor.title} &rarr;
              </Button>
            </>
          )}
        </>
      }
    />
  );
}
