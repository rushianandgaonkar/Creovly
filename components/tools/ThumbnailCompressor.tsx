'use client';

import { useEffect, useRef, useState } from 'react';
import ImagePreview, { useBlobUrl } from './ImagePreview';
import DropZone from '@/components/form/DropZone';
import Select from '@/components/form/Select';
import NumberInput from '@/components/form/NumberInput';
import Slider from '@/components/form/Slider';
import Button from '@/components/ui/Button';
import Alert from '@/components/feedback/Alert';
import ToolWorkspaceLayout from './ToolWorkspaceLayout';
import { formatBytes, formatLabel, type OutputFormat } from '@/lib/image-compression';
import { batchDownloadName, compressBatch, validateBatchSelection, type BatchItem } from '@/lib/batch-compression';
import { toolSamples } from '@/config/tool-samples';
import { useI18n } from '@/lib/i18n';

function CompletedImage({ item, index }: { item: BatchItem; index: number }) {
  const { t } = useI18n();
  const originalUrl = useBlobUrl(item.file);
  const outputUrl = useBlobUrl(item.result?.blob);
  const result = item.result;
  if (!result) return null;

  const pct = Math.abs((result.blob.size / item.file.size - 1) * 100).toFixed(1);
  const sizeDiff =
    result.blob.size < item.file.size
      ? t.compressor.percentSmaller.replace('{percent}', pct)
      : result.blob.size === item.file.size
      ? t.compressor.sameFileSize
      : t.compressor.percentLarger.replace('{percent}', pct);

  const qualityDesc = result.originalUsed
    ? t.compressor.smallerOriginalRetained
    : result.quality === null
    ? t.compressor.pngOutput
    : t.compressor.qualityLabel.replace('{quality}', String(Math.round(result.quality * 100)));

  return (
    <div className="space-y-4">
      {originalUrl && (
        <ImagePreview
          url={originalUrl}
          title={t.compressor.originalThumbnail}
          width={result.width}
          height={result.height}
        />
      )}
      {outputUrl && (
        <ImagePreview
          url={outputUrl}
          title={t.compressor.compressedOutput}
          width={result.width}
          height={result.height}
        />
      )}
      <p className="text-sm text-[var(--text-body)]">
        {formatBytes(item.file.size)} → {formatBytes(result.blob.size)} · {formatLabel(result.blob.type)} · {result.width} × {result.height}
      </p>
      <p className="text-xs text-[var(--text-body)]">
        {sizeDiff} · {qualityDesc}
      </p>
      <Alert
        variant={result.targetMet ? 'success' : 'warning'}
        title={result.targetMet ? t.compressor.targetMet : t.compressor.targetNotReached}
      >
        {result.targetMet ? t.compressor.targetMetAlert : t.compressor.targetNotReachedAlert}
      </Alert>
      {outputUrl && (
        <a
          href={outputUrl}
          download={batchDownloadName(item.file.name, index, result.blob.type as OutputFormat)}
          className="inline-flex rounded-xl bg-[var(--brand-primary)] text-[var(--brand-on-primary)] px-4 py-3 text-sm font-semibold focus-ring"
        >
          {t.compressor.buttonDownloadSingle.replace('{format}', formatLabel(result.blob.type))}
        </a>
      )}
    </div>
  );
}

export default function ThumbnailCompressor() {
  const { t } = useI18n();
  const [items, setItems] = useState<BatchItem[]>([]);
  const [format, setFormat] = useState<OutputFormat>('image/jpeg');
  const [target, setTarget] = useState('2000');
  const [quality, setQuality] = useState(90);
  const [busy, setBusy] = useState(false);
  const [packing, setPacking] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [fileKey, setFileKey] = useState(0);
  const [preview, setPreview] = useState(0);
  const generation = useRef(0);
  const controller = useRef<AbortController | null>(null);
  const errorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessage(t.compressor.messages.initial);
  }, [t]);

  useEffect(() => () => { generation.current++; controller.current?.abort(); }, []);
  useEffect(() => { if (error) errorRef.current?.focus(); }, [error]);

  const invalidate = () => {
    generation.current++; controller.current?.abort(); setBusy(false); setPacking(false); setError('');
    setItems((current) => current.map(({ file }) => ({ file, status: 'queued' })));
    setMessage(t.compressor.messages.settingsChanged);
  };

  const select = (files: File[]) => {
    try {
      validateBatchSelection(files);
    } catch (cause) {
      setError(
        t.compressor.errors.validationPrefix.replace('{message}', (cause as Error).message)
      );
      return false;
    }
    invalidate();
    setItems(files.map((file) => ({ file, status: 'queued' })));
    setPreview(0);
    setMessage(
      files.length === 1
        ? t.compressor.messages.imagesReadySingle
        : t.compressor.messages.imagesReadyPlural.replace('{count}', String(files.length))
    );
    return true;
  };

  const reset = () => {
    invalidate(); setItems([]); setFileKey((key) => key + 1); setTarget('2000'); setQuality(90); setFormat('image/jpeg'); setPreview(0);
    setMessage(t.compressor.messages.workspaceCleared);
  };

  const run = async () => {
    if (!items.length || busy || packing) return;
    const targetBytes = Number(target) * 1000;
    if (!Number.isFinite(targetBytes) || targetBytes < 10_000 || targetBytes > 20_000_000) {
      setError(t.compressor.errors.targetRange);
      return;
    }
    invalidate();
    const id = generation.current;
    const abort = new AbortController();
    controller.current = abort;
    setBusy(true);
    setMessage(t.compressor.messages.processingLocal);
    try {
      const rows = await compressBatch(items.map((item) => item.file), { format, targetBytes, maxQuality: quality / 100 }, {
        signal: abort.signal,
        onUpdate: (index, row) => {
          if (id === generation.current) setItems((current) => current.map((item, at) => at === index ? row : item));
        },
      });
      if (id === generation.current) {
        setItems(rows);
        const first = rows.findIndex((row) => row.status === 'complete');
        if (first >= 0) setPreview(first);
        const count = rows.filter((row) => row.status === 'complete').length;
        if (abort.signal.aborted) {
          setMessage(
            t.compressor.messages.cancelled
              .replace('{count}', String(count))
              .replace('{total}', String(rows.length))
          );
        } else {
          setMessage(
            t.compressor.messages.batchFinished
              .replace('{count}', String(count))
              .replace('{total}', String(rows.length))
          );
        }
      }
    } catch (cause) {
      if (id === generation.current) {
        setError(cause instanceof Error ? cause.message : t.compressor.errors.batchFailed);
      }
    } finally {
      if (id === generation.current) setBusy(false);
    }
  };

  const zip = async () => {
    if (busy || packing) return;
    const files = items.flatMap((item, index) =>
      item.status === 'complete' && item.result
        ? [{ name: batchDownloadName(item.file.name, index, item.result.blob.type as OutputFormat), blob: item.result.blob }]
        : []
    );
    if (!files.length) return;
    const id = generation.current;
    setPacking(true);
    setError('');
    try {
      const { createStudioZip } = await import('@/lib/studio-zip');
      const blob = await createStudioZip(files);
      if (id !== generation.current) return;
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = 'creovly-thumbnails.zip';
      anchor.click();
      setTimeout(() => URL.revokeObjectURL(url), 30_000);
      setMessage(t.compressor.messages.zipPrepared.replace('{count}', String(files.length)));
    } catch (cause) {
      if (id === generation.current) {
        setError(cause instanceof Error ? cause.message : t.compressor.errors.zipFailed);
      }
    } finally {
      if (id === generation.current) setPacking(false);
    }
  };

  const complete = items.filter((item) => item.status === 'complete');
  const settled = items.filter((item) => ['complete', 'error', 'cancelled'].includes(item.status)).length;
  const selected = items[preview];
  const locked = busy || packing;

  const getStatusLabel = (status: BatchItem['status']) => {
    switch (status) {
      case 'complete':
        return t.compressor.statusReady;
      case 'error':
        return t.compressor.statusFailed;
      case 'processing':
        return t.compressor.statusProcessing;
      case 'cancelled':
        return t.compressor.statusCancelled;
      case 'queued':
      default:
        return t.compressor.statusQueued;
    }
  };

  return (
    <ToolWorkspaceLayout
      workspace={
        <>
          <DropZone
            key={fileKey}
            id="thumbnail-file"
            label={t.compressor.dropzoneLabel}
            maxSizeMB={20}
            privacyNote={t.common.dropzone.localPrivacyNote}
            onFilesSelect={select}
            onError={setError}
            disabled={locked}
            samples={toolSamples['youtube-thumbnail-compressor']}
          />
          <p className="text-xs text-[var(--text-body)]">
            {t.compressor.dropzoneHint}
          </p>
          <div ref={errorRef} tabIndex={-1} className="focus-ring rounded-md">
            {error && (
              <Alert variant="error" title={t.compressor.errors.checkBatchOrSettings}>
                {error}
              </Alert>
            )}
          </div>
          <fieldset disabled={locked} className="space-y-5 min-w-0">
            <legend className="sr-only">Compression settings</legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <NumberInput
                id="target-size"
                label={t.compressor.targetSizeLabel}
                suffix="KB"
                value={target}
                min={10}
                max={20000}
                onChange={(event) => {
                  invalidate();
                  setTarget(event.target.value);
                }}
              />
              <Select
                id="output-format"
                label={t.compressor.exportFormatLabel}
                value={format}
                onChange={(event) => {
                  invalidate();
                  setFormat(event.target.value as OutputFormat);
                }}
                options={[
                  { value: 'image/jpeg', label: t.compressor.formatJpeg },
                  { value: 'image/png', label: t.compressor.formatPng },
                  { value: 'image/webp', label: t.compressor.formatWebp },
                ]}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {['2000', '1500', '1000', '500'].map((value) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={target === value}
                  onClick={() => {
                    invalidate();
                    setTarget(value);
                  }}
                  className="rounded-md border border-[var(--border-hairline)] px-3 py-2 text-xs focus-ring disabled:opacity-50 cursor-pointer"
                >
                  {Number(value).toLocaleString('en-US')} KB
                </button>
              ))}
            </div>
            <p className="text-xs text-[var(--text-body)]">
              {format === 'image/jpeg'
                ? t.compressor.formatExplanationJpeg
                : format === 'image/png'
                ? t.compressor.formatExplanationPng
                : t.compressor.formatExplanationWebp}
            </p>
            {format !== 'image/png' && (
              <details className="rounded-xl border border-[var(--border-hairline)] p-4">
                <summary className="text-xs font-medium cursor-pointer focus-ring rounded">
                  {t.compressor.advancedQualityHeading}
                </summary>
                <div className="mt-4">
                  <Slider
                    id="max-quality"
                    label={t.compressor.maxQualityLabel}
                    min={25}
                    max={95}
                    value={quality}
                    unit="%"
                    onChange={(value) => {
                      invalidate();
                      setQuality(value);
                    }}
                  />
                </div>
                <p className="mt-3 text-xs text-[var(--text-body)]">
                  {t.compressor.qualityExplanation}
                </p>
              </details>
            )}
          </fieldset>
          <div className="flex flex-wrap gap-3">
            <Button onClick={run} disabled={!items.length || locked}>
              {busy
                ? t.compressor.buttonCompressing
                : items.length > 1
                ? t.compressor.buttonCompressBatch
                : t.compressor.buttonCompressSingle}
            </Button>
            {busy && (
              <Button
                variant="outline"
                onClick={() => {
                  controller.current?.abort();
                  setMessage(t.compressor.messages.cancelling);
                }}
              >
                {t.compressor.buttonCancel}
              </Button>
            )}
            <Button variant="outline" onClick={reset} disabled={packing}>
              {t.compressor.buttonReset}
            </Button>
          </div>
          <p role="status" aria-live="polite" className="text-sm text-[var(--text-body)]">
            {message}
          </p>
          {items.length > 0 && (
            <div className="space-y-3">
              <label htmlFor="batch-progress" className="text-xs text-[var(--text-body)]">
                {t.compressor.batchProgressLabel
                  .replace('{settled}', String(settled))
                  .replace('{total}', String(items.length))
                  .replace('{complete}', String(complete.length))}
              </label>
              <progress id="batch-progress" value={settled} max={items.length} className="w-full" />
              <ul className="divide-y divide-[var(--border-hairline)]">
                {items.map((item, index) => (
                  <li key={index} className="py-3 space-y-2">
                    <div className="flex flex-wrap justify-between gap-2 text-sm">
                      <span className="break-all font-medium">
                        {index + 1}. {item.file.name}
                      </span>
                      <span className="text-[var(--text-body)]">
                        {formatBytes(item.file.size)} · {getStatusLabel(item.status)}
                      </span>
                    </div>
                    {item.error && <p className="text-xs text-[var(--state-error-text)]">{item.error}</p>}
                    {item.result && (
                      <p className="text-xs text-[var(--text-body)]">
                        {formatBytes(item.result.blob.size)} ·{' '}
                        {item.result.targetMet
                          ? t.compressor.targetMet
                          : t.compressor.targetNotReached}
                      </p>
                    )}
                    <div className="flex gap-3">
                      {item.status === 'complete' && (
                        <button
                          type="button"
                          onClick={() => setPreview(index)}
                          className="text-xs text-[var(--brand-accent)] underline focus-ring cursor-pointer"
                          aria-pressed={preview === index}
                        >
                          {t.compressor.buttonReviewImage.replace('{index}', String(index + 1))}
                        </button>
                      )}
                      <button
                        type="button"
                        disabled={locked}
                        onClick={() => {
                          setError('');
                          setItems((current) => current.filter((_, at) => at !== index));
                          setPreview(0);
                          setMessage(t.compressor.messages.imageRemoved);
                        }}
                        aria-label={t.compressor.removeAria.replace('{index}', String(index + 1))}
                        className="text-xs text-[var(--text-body)] underline focus-ring disabled:opacity-50 cursor-pointer"
                      >
                        {t.compressor.buttonRemove}
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <p className="text-xs text-[var(--text-muted)]">
            {t.compressor.privacyFootnote}
          </p>
        </>
      }
      results={
        <>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-base font-semibold">{t.compressor.batchResultsHeading}</h3>
            <Button onClick={zip} disabled={!complete.length || locked}>
              {packing
                ? t.compressor.buttonPreparingZip
                : t.compressor.buttonDownloadZip.replace('{count}', String(complete.length))}
            </Button>
          </div>
          <p className="text-xs text-[var(--text-body)]">
            {t.compressor.batchResultsHint}
          </p>
          {selected?.result ? (
            <>
              <p className="break-all text-sm font-medium">
                {t.compressor.selectedImageTitle
                  .replace('{index}', String(preview + 1))
                  .replace('{name}', selected.file.name)}
              </p>
              <CompletedImage key={generation.current + '-' + preview} item={selected} index={preview} />
            </>
          ) : (
            <p className="py-12 text-sm text-[var(--text-body)]">
              {t.compressor.emptyResultsPrompt}
            </p>
          )}
        </>
      }
    />
  );
}
