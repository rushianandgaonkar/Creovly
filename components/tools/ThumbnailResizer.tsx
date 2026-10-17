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

const dimensionPresets = [
  { label: '1280 × 720 (HD 16:9)', value: '1280x720' },
  { label: '1920 × 1080 (Full HD)', value: '1920x1080' },
  { label: '3840 × 2160 (4K UHD)', value: '3840x2160' },
  { label: '1080 × 1920 (Shorts 9:16)', value: '1080x1920' },
  { label: 'Custom', value: 'custom' },
];

export default function ThumbnailResizer() {
  const [selected, setSelected] = useState<{
    file: File;
    width: number;
    height: number;
    format: OutputFormat;
  }>();
  const [options, setOptions] = useState(defaults);
  const [preset, setPreset] = useState('1280x720');
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
  let valid = true;
  try {
    validateResize(settings);
  } catch {
    valid = false;
  }

  const upscaled =
    selected &&
    valid &&
    resizeGeometry(selected.width, selected.height, settings.width, settings.height, options.fit)
      .scale > 1;

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
    setPreset('1280x720');
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

  return (
    <ToolWorkspaceLayout
      workspace={
        <>
          <DropZone
            key={fileKey}
            id="resizer-file"
            label="Upload Image to Resize"
            maxSizeMB={20}
            privacyNote="100% In-Browser Execution"
            disabled={loading || busy}
            onFileSelect={selectFile}
            onError={setError}
            samples={toolSamples['youtube-thumbnail-resizer']}
          />

          <div ref={errorRef} tabIndex={-1} className="focus-ring rounded-md">
            {error && (
              <Alert variant="error" title="Check your image or settings">
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

            <div className="space-y-2">
              <label className="block text-xs font-medium text-[var(--text-ink)]">
                Target Canvas Geometry
              </label>
              <div className="flex flex-wrap gap-1.5">
                {dimensionPresets.map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => {
                      clear();
                      setPreset(item.value);
                      if (item.value !== 'custom') {
                        const [w, h] = item.value.split('x');
                        setWidth(w);
                        setHeight(h);
                      }
                    }}
                    className={`px-2.5 py-1.5 rounded-md text-[11px] font-mono border transition-all ${
                      preset === item.value
                        ? 'border-[var(--brand-accent)] bg-[var(--brand-accent-soft)] text-[var(--brand-accent-deep)] font-semibold'
                        : 'border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] text-[var(--text-body)] hover:border-[var(--brand-accent)]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {preset === 'custom' && (
              <div className="grid grid-cols-2 gap-4">
                <NumberInput
                  id="resize-width"
                  label="Custom Width"
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
                  label="Custom Height"
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
              label="Canvas Fitting Strategy"
              value={options.fit}
              onChange={(event) =>
                change({ fit: event.target.value as ResizeOptions['fit'] })
              }
              options={[
                { value: 'cover', label: 'Crop to Fill — zero borders / full bleed' },
                { value: 'contain', label: 'Fit Entire Image — preserve all artwork with padding' },
              ]}
            />

            {options.fit === 'cover' ? (
              <div className="space-y-3 p-4 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-subtle)]">
                <span className="text-xs font-mono font-medium text-[var(--text-ink)]">
                  Crop Focal Point Alignment
                </span>
                <Slider
                  id="crop-x"
                  label="Horizontal Crop Anchor"
                  value={options.x}
                  unit="%"
                  onChange={(x) => change({ x })}
                />
                <Slider
                  id="crop-y"
                  label="Vertical Crop Anchor"
                  value={options.y}
                  unit="%"
                  onChange={(y) => change({ y })}
                />
              </div>
            ) : (
              <p className="text-xs text-[var(--text-body)] leading-relaxed">
                Source image stays centered. Letterboxed bars use the canvas background color selected below.
              </p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select
                id="resize-background"
                label="Padding Background"
                value={options.background}
                onChange={(event) =>
                  change({ background: event.target.value as ResizeOptions['background'] })
                }
                options={[
                  { value: 'white', label: 'White' },
                  { value: 'black', label: 'Black' },
                  { value: 'transparent', label: 'Transparent Alpha' },
                ]}
              />
              <Select
                id="resize-format"
                label="Output Format"
                value={options.format}
                onChange={(event) => change({ format: event.target.value as OutputFormat })}
                options={[
                  { value: 'image/jpeg', label: 'JPEG (Best for YouTube)' },
                  { value: 'image/png', label: 'PNG (Alpha transparency)' },
                  { value: 'image/webp', label: 'WebP' },
                ]}
              />
            </div>

            {options.format !== 'image/png' && (
              <Slider
                id="resize-quality"
                label="JPEG / WebP Export Quality"
                min={25}
                max={95}
                value={Math.round(options.quality * 100)}
                unit="%"
                onChange={(q) => change({ quality: q / 100 })}
              />
            )}
          </fieldset>

          {upscaled && (
            <Alert variant="warning" title="Upscaling Resolution">
              Source resolution is smaller than target canvas. While crisp bicubic resampling is applied, consider using higher-res master assets if available.
            </Alert>
          )}

          <div className="flex flex-wrap justify-between items-center gap-3 pt-4 border-t border-[var(--border-hairline-subtle)]">
            <Button variant="outline" size="sm" onClick={reset}>
              Reset
            </Button>
            <Button disabled={!selected || busy || loading} onClick={run}>
              {busy ? 'Rendering canvas locally…' : 'Resize Thumbnail'}
            </Button>
          </div>

          <p role="status" aria-live="polite" className="text-xs text-[var(--text-muted)]">
            {loading
              ? 'Opening source image…'
              : busy
              ? 'Rendering high-resolution canvas…'
              : result
              ? 'Resize completed. Download or compress output.'
              : selected
              ? 'Ready. Adjust crop sliders and click Resize.'
              : 'Choose an image to begin.'}
          </p>
        </>
      }
      results={
        <>
          {!selected && (
            <div className="py-16 text-center text-xs text-[var(--text-muted)] font-mono">
              Upload an image to inspect source geometry and crop boundaries.
            </div>
          )}

          {selected && sourceUrl && (
            <ImagePreview
              url={sourceUrl}
              title="Source Artwork"
              width={selected.width}
              height={selected.height}
            />
          )}

          {selected && sourceUrl && valid && !result && (
            <ImagePreview
              url={sourceUrl}
              title="Interactive Framing Preview (Not yet exported)"
              width={selected.width}
              height={selected.height}
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
                  title="Resized Master Output"
                  width={result.width}
                  height={result.height}
                />
              )}

              <div className="grid grid-cols-2 gap-3">
                <MetricCard label="Canvas Geometry" value={`${result.width} × ${result.height}`} />
                <MetricCard
                  label="Output Size"
                  value={formatBytes(result.blob.size)}
                  subtext={formatLabel(result.blob.type)}
                />
              </div>

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
                  Download {result.width}×{result.height} {formatLabel(result.blob.type)}
                </a>
              )}

              <Button
                href="/tools/youtube-thumbnail-compressor"
                variant="outline"
                className="w-full text-xs font-mono"
              >
                Send to Thumbnail Compressor &rarr;
              </Button>
            </>
          )}
        </>
      }
    />
  );
}
