/* Hallmark · genre: modern-minimal · macrostructure: Workbench */
'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import ImagePreview, { useBlobUrl } from './ImagePreview';
import DropZone from '@/components/form/DropZone';
import Select from '@/components/form/Select';
import NumberInput from '@/components/form/NumberInput';
import Slider from '@/components/form/Slider';
import Button from '@/components/ui/Button';
import Alert from '@/components/feedback/Alert';
import MetricCard from '@/components/results/MetricCard';
import ToolWorkspaceLayout from './ToolWorkspaceLayout';
import {
  compressImage,
  decodeImage,
  downloadName,
  formatBytes,
  formatLabel,
  validateImage,
  type CompressionResult,
  type OutputFormat,
} from '@/lib/image-compression';
import { toolSamples } from '@/config/tool-samples';

interface SelectedImage {
  file: File;
  width: number;
  height: number;
  format: OutputFormat;
}

const targetPresets = [
  { label: '2,000 KB (YouTube Max)', value: '2000' },
  { label: '1,500 KB (Recommended)', value: '1500' },
  { label: '1,000 KB (Balanced)', value: '1000' },
  { label: '500 KB (Light)', value: '500' },
];

export default function ThumbnailCompressor() {
  const [selected, setSelected] = useState<SelectedImage>();
  const [result, setResult] = useState<CompressionResult>();
  const [format, setFormat] = useState<OutputFormat>('image/jpeg');
  const [target, setTarget] = useState('2000');
  const [quality, setQuality] = useState(90);
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fileKey, setFileKey] = useState(0);

  const request = useRef(0);
  const controller = useRef<AbortController | undefined>(undefined);
  const originalBlob = useMemo(
    () => (selected ? new Blob([selected.file], { type: selected.format }) : undefined),
    [selected]
  );
  const originalUrl = useBlobUrl(originalBlob);
  const outputUrl = useBlobUrl(result?.blob);
  const errorRef = useRef<HTMLDivElement>(null);

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

  const cancel = () => {
    request.current++;
    controller.current?.abort();
    setBusy(false);
    setLoading(false);
  };

  const selectFile = async (file: File) => {
    cancel();
    const id = request.current;
    setSelected(undefined);
    setResult(undefined);
    setError('');
    setLoading(true);
    try {
      const inputFormat = await validateImage(file);
      const bitmap = await decodeImage(file);
      const dimensions = { width: bitmap.width, height: bitmap.height };
      bitmap.close();
      if (id === request.current) {
        setSelected({ file, format: inputFormat, ...dimensions });
      }
    } catch (cause) {
      if (id === request.current) {
        setError(
          cause instanceof Error
            ? cause.message
            : 'Could not open this image. Please choose another file.'
        );
      }
    } finally {
      if (id === request.current) setLoading(false);
    }
  };

  const clearResult = () => {
    cancel();
    setResult(undefined);
    setError('');
  };

  const reset = () => {
    cancel();
    setSelected(undefined);
    setResult(undefined);
    setError('');
    setFileKey((key) => key + 1);
    setFormat('image/jpeg');
    setTarget('2000');
    setQuality(90);
  };

  const run = async () => {
    if (!selected || busy) return;
    const bytes = Number(target) * 1000;
    if (!Number.isFinite(bytes) || bytes < 10_000 || bytes > 20_000_000) {
      setError('Enter a target between 10 and 20,000 KB.');
      return;
    }
    cancel();
    const id = request.current;
    const abort = new AbortController();
    controller.current = abort;
    setBusy(true);
    setError('');
    setResult(undefined);
    try {
      const output = await compressImage(
        selected.file,
        { format, targetBytes: bytes, maxQuality: quality / 100 },
        abort.signal
      );
      if (id === request.current) setResult(output);
    } catch (cause) {
      if (id === request.current && !abort.signal.aborted) {
        setError(
          cause instanceof Error
            ? cause.message
            : 'Compression failed. Please try another format.'
        );
      }
    } finally {
      if (id === request.current) setBusy(false);
    }
  };

  return (
    <ToolWorkspaceLayout
      workspace={
        <>
          <DropZone
            key={fileKey}
            id="thumbnail-file"
            label="Upload Thumbnail Image"
            maxSizeMB={20}
            privacyNote="100% In-Browser Execution"
            onFileSelect={selectFile}
            onError={setError}
            disabled={busy || loading}
            samples={toolSamples['youtube-thumbnail-compressor']}
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
                {formatBytes(selected.file.size)} · {selected.width} × {selected.height} px ·{' '}
                {formatLabel(selected.format)}
              </span>
            </div>
          )}

          <fieldset disabled={busy || loading} className="space-y-5 min-w-0">
            <legend className="sr-only">Compression settings</legend>

            <div className="space-y-2">
              <NumberInput
                id="target-size"
                label="Target File Size Ceiling"
                value={target}
                min={10}
                max={20000}
                step={1}
                suffix="KB"
                onChange={(event) => {
                  clearResult();
                  setTarget(event.target.value);
                }}
              />
              <div className="flex flex-wrap gap-1.5 pt-1">
                {targetPresets.map((preset) => (
                  <button
                    key={preset.value}
                    type="button"
                    onClick={() => {
                      clearResult();
                      setTarget(preset.value);
                    }}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-mono border transition-all ${
                      target === preset.value
                        ? 'border-[var(--brand-accent)] bg-[var(--brand-accent-soft)] text-[var(--brand-accent-deep)] font-semibold'
                        : 'border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] text-[var(--text-body)] hover:border-[var(--brand-accent)]'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            <Select
              id="output-format"
              label="Export Format"
              value={format}
              onChange={(event) => {
                clearResult();
                setFormat(event.target.value as OutputFormat);
              }}
              options={[
                { value: 'image/jpeg', label: 'JPEG — recommended for YouTube' },
                { value: 'image/png', label: 'PNG — lossless with transparency' },
                { value: 'image/webp', label: 'WebP — compact web format' },
              ]}
            />

            <p className="text-xs text-[var(--text-body)] leading-relaxed">
              {format === 'image/jpeg'
                ? 'JPEG applies iterative binary search quality compression. Pixel dimensions stay 100% untouched.'
                : format === 'image/png'
                ? 'PNG maintains lossless alpha transparency. PNG file size is determined by image complexity.'
                : 'WebP offers high density compression with alpha support. YouTube accepts WebP for custom thumbnails.'}
            </p>

            {format !== 'image/png' && (
              <details className="rounded-xl border border-[var(--border-hairline)] p-4 bg-[var(--bg-canvas-subtle)]">
                <summary className="text-xs font-mono font-medium text-[var(--text-ink)] cursor-pointer focus-ring rounded select-none">
                  Advanced Quality Thresholds
                </summary>
                <div className="mt-4">
                  <Slider
                    id="max-quality"
                    label="Maximum Quality Cap"
                    value={quality}
                    min={25}
                    max={95}
                    unit="%"
                    onChange={(value) => {
                      clearResult();
                      setQuality(value);
                    }}
                  />
                </div>
                <p className="text-xs text-[var(--text-muted)] mt-2">
                  Creovly tests the highest quality level that meets your size target, down to 25%.
                </p>
              </details>
            )}
          </fieldset>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[var(--border-hairline-subtle)]">
            <Button variant="outline" size="sm" onClick={reset} disabled={busy || loading}>
              Reset
            </Button>
            <Button disabled={!selected || busy || loading} onClick={run}>
              {busy ? 'Compressing locally…' : 'Compress Thumbnail'}
            </Button>
          </div>

          <p role="status" aria-live="polite" className="text-xs text-[var(--text-muted)]">
            {loading
              ? 'Opening image…'
              : busy
              ? 'Calculating optimal quality step. Keep window open.'
              : result
              ? 'Compression complete. Review comparison below.'
              : selected
              ? 'Ready. Adjust target size and click Compress.'
              : 'Choose an image or creator sample to start.'}
          </p>
        </>
      }
      results={
        <>
          {!selected && (
            <div className="py-16 text-center text-xs text-[var(--text-muted)] font-mono">
              Upload a thumbnail to inspect original and compressed results.
            </div>
          )}

          {selected && originalUrl && (
            <ImagePreview
              url={originalUrl}
              title="Original Thumbnail"
              width={selected.width}
              height={selected.height}
            />
          )}

          {selected && !result && (
            <p className="text-xs text-[var(--text-muted)] font-mono text-center py-4">
              Click Compress Thumbnail to calculate output size.
            </p>
          )}

          {selected && result && (
            <>
              {outputUrl && (
                <ImagePreview
                  url={outputUrl}
                  title="Compressed Output"
                  width={result.width}
                  height={result.height}
                />
              )}

              <div className="grid grid-cols-2 gap-3">
                <MetricCard label="Original Size" value={formatBytes(selected.file.size)} />
                <MetricCard
                  label="Output Size"
                  value={formatBytes(result.blob.size)}
                  subtext={`${formatLabel(result.blob.type)} · ${result.width} × ${result.height}`}
                />
              </div>

              <div className="p-3 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-subtle)] flex items-center justify-between text-xs font-mono">
                <span className="text-[var(--text-ink)] font-semibold">
                  {result.blob.size < selected.file.size
                    ? `${((1 - result.blob.size / selected.file.size) * 100).toFixed(1)}% reduction`
                    : result.blob.size === selected.file.size
                    ? 'Identical size'
                    : `+${((result.blob.size / selected.file.size - 1) * 100).toFixed(1)}%`}
                </span>
                <span className="text-[var(--text-muted)]">
                  {result.quality === null
                    ? result.originalUsed
                      ? 'Original retained'
                      : 'Lossless PNG'
                    : `Quality: ${Math.round(result.quality * 100)}%`}
                </span>
              </div>

              <Alert
                variant={result.targetMet ? 'success' : 'warning'}
                title={result.targetMet ? 'YouTube Spec Met' : 'Target Threshold Exceeded'}
              >
                {result.targetMet
                  ? `Output is safely within your ${formatBytes(
                      Number(target) * 1000
                    )} ceiling. Ready for YouTube Studio.`
                  : 'Target cannot be reached at this resolution. Consider resizing to 1280×720 first or selecting JPEG.'}
                {result.originalUsed &&
                  ' Original was already smaller than the re-encoded result, preserving max fidelity.'}
              </Alert>

              {outputUrl && (
                <a
                  href={outputUrl}
                  download={downloadName(selected.file.name, format)}
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
                  Download {formatLabel(result.blob.type)} ({formatBytes(result.blob.size)})
                </a>
              )}
            </>
          )}
        </>
      }
    />
  );
}
