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

function CompletedImage({ item, index }: { item: BatchItem; index: number }) {
  const originalUrl = useBlobUrl(item.file);
  const outputUrl = useBlobUrl(item.result?.blob);
  const result = item.result;
  if (!result) return null;
  return <div className="space-y-4">
    {originalUrl && <ImagePreview url={originalUrl} title="Original thumbnail" width={result.width} height={result.height} />}
    {outputUrl && <ImagePreview url={outputUrl} title="Compressed output" width={result.width} height={result.height} />}
    <p className="text-sm text-[var(--text-body)]">{formatBytes(item.file.size)} → {formatBytes(result.blob.size)} · {formatLabel(result.blob.type)} · {result.width} × {result.height}</p>
    <p className="text-xs text-[var(--text-body)]">{result.blob.size < item.file.size ? ((1 - result.blob.size / item.file.size) * 100).toFixed(1) + '% smaller' : result.blob.size === item.file.size ? 'Same file size' : ((result.blob.size / item.file.size - 1) * 100).toFixed(1) + '% larger'} · {result.originalUsed ? 'Smaller original retained' : result.quality === null ? 'PNG output' : 'Quality ' + Math.round(result.quality * 100) + '%'}</p>
    <Alert variant={result.targetMet ? 'success' : 'warning'} title={result.targetMet ? 'Size target met' : 'Size target not reached'}>{result.targetMet ? 'Review the image before using it. File size alone does not confirm upload eligibility.' : 'Output exceeds your target. Increase the target, change format, or resize first. This output is still downloadable.'}</Alert>
    {outputUrl && <a href={outputUrl} download={batchDownloadName(item.file.name, index, result.blob.type as OutputFormat)} className="inline-flex rounded-xl bg-[var(--brand-primary)] text-[var(--brand-on-primary)] px-4 py-3 text-sm font-semibold focus-ring">Download {formatLabel(result.blob.type)}</a>}
  </div>;
}

export default function ThumbnailCompressor() {
  const [items, setItems] = useState<BatchItem[]>([]);
  const [format, setFormat] = useState<OutputFormat>('image/jpeg');
  const [target, setTarget] = useState('2000');
  const [quality, setQuality] = useState(90);
  const [busy, setBusy] = useState(false);
  const [packing, setPacking] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('Choose one image or a batch to begin.');
  const [fileKey, setFileKey] = useState(0);
  const [preview, setPreview] = useState(0);
  const generation = useRef(0);
  const controller = useRef<AbortController | null>(null);
  const errorRef = useRef<HTMLDivElement>(null);
  useEffect(() => () => { generation.current++; controller.current?.abort(); }, []);
  useEffect(() => { if (error) errorRef.current?.focus(); }, [error]);
  const invalidate = () => {
    generation.current++; controller.current?.abort(); setBusy(false); setPacking(false); setError('');
    setItems((current) => current.map(({ file }) => ({ file, status: 'queued' })));
    setMessage('Settings changed. Compress again to create matching results.');
  };
  const select = (files: File[]) => {
    try { validateBatchSelection(files); }
    catch (cause) { setError((cause as Error).message + ' Your previous batch is unchanged.'); return false; }
    invalidate(); setItems(files.map((file) => ({ file, status: 'queued' }))); setPreview(0);
    setMessage(files.length + (files.length === 1 ? ' image ready.' : ' images ready.') + ' Selecting files again replaces this batch.');
    return true;
  };
  const reset = () => {
    invalidate(); setItems([]); setFileKey((key) => key + 1); setTarget('2000'); setQuality(90); setFormat('image/jpeg'); setPreview(0);
    setMessage('Workspace cleared. Choose images to begin.');
  };
  const run = async () => {
    if (!items.length || busy || packing) return;
    const targetBytes = Number(target) * 1000;
    if (!Number.isFinite(targetBytes) || targetBytes < 10_000 || targetBytes > 20_000_000) { setError('Enter a target between 10 and 20,000 KB per image.'); return; }
    invalidate();
    const id = generation.current;
    const abort = new AbortController(); controller.current = abort; setBusy(true); setMessage('Processing images locally, one at a time.');
    try {
      const rows = await compressBatch(items.map((item) => item.file), { format, targetBytes, maxQuality: quality / 100 }, {
        signal: abort.signal,
        onUpdate: (index, row) => {
          if (id === generation.current) setItems((current) => current.map((item, at) => at === index ? row : item));
        },
      });
      if (id === generation.current) {
        setItems(rows);
        const first = rows.findIndex((row) => row.status === 'complete'); if (first >= 0) setPreview(first);
        const count = rows.filter((row) => row.status === 'complete').length;
        setMessage((abort.signal.aborted ? 'Cancelled. ' : 'Batch finished. ') + count + ' of ' + rows.length + ' outputs ready. Review each result before downloading.');
      }
    } catch (cause) { if (id === generation.current) setError(cause instanceof Error ? cause.message : 'Batch processing failed. Try a smaller batch.'); }
    finally { if (id === generation.current) setBusy(false); }
  };
  const zip = async () => {
    if (busy || packing) return;
    const files = items.flatMap((item, index) => item.status === 'complete' && item.result ? [{ name: batchDownloadName(item.file.name, index, item.result.blob.type as OutputFormat), blob: item.result.blob }] : []);
    if (!files.length) return;
    const id = generation.current; setPacking(true); setError('');
    try {
      const { createStudioZip } = await import('@/lib/studio-zip');
      const blob = await createStudioZip(files);
      if (id !== generation.current) return;
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement('a'); anchor.href = url; anchor.download = 'creovly-thumbnails.zip'; anchor.click();
      setTimeout(() => URL.revokeObjectURL(url), 30_000);
      setMessage('ZIP prepared with ' + files.length + ' completed outputs. Failed and cancelled files are excluded.');
    } catch (cause) { if (id === generation.current) setError(cause instanceof Error ? cause.message : 'ZIP creation failed. Download the images individually.'); }
    finally { if (id === generation.current) setPacking(false); }
  };
  const complete = items.filter((item) => item.status === 'complete');
  const settled = items.filter((item) => ['complete', 'error', 'cancelled'].includes(item.status)).length;
  const selected = items[preview];
  const locked = busy || packing;
  return <ToolWorkspaceLayout workspace={<>
    <DropZone key={fileKey} id="thumbnail-file" label="Select thumbnails" maxSizeMB={20} privacyNote="Stays on your device" onFilesSelect={select} onError={setError} disabled={locked} samples={toolSamples['youtube-thumbnail-compressor']} />
    <p className="text-xs text-[var(--text-body)]">Up to 10 images · 20 MB each · 50 MB total. Selected files replace the current batch. Sample buttons load one image.</p>
    <div ref={errorRef} tabIndex={-1} className="focus-ring rounded-md">{error && <Alert variant="error" title="Check your batch or settings">{error}</Alert>}</div>
    <fieldset disabled={locked} className="space-y-5 min-w-0">
      <legend className="sr-only">Compression settings for every image</legend>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <NumberInput id="target-size" label="Target size per image" suffix="KB" value={target} min={10} max={20000} onChange={(event) => { invalidate(); setTarget(event.target.value); }} />
        <Select id="output-format" label="Export format" value={format} onChange={(event) => { invalidate(); setFormat(event.target.value as OutputFormat); }} options={[{ value: 'image/jpeg', label: 'JPEG' }, { value: 'image/png', label: 'PNG · transparency' }, { value: 'image/webp', label: 'WebP · web image' }]} />
      </div>
      <div className="flex flex-wrap gap-2">{['2000', '1500', '1000', '500'].map((value) => <button key={value} type="button" aria-pressed={target === value} onClick={() => { invalidate(); setTarget(value); }} className="rounded-md border border-[var(--border-hairline)] px-3 py-2 text-xs focus-ring disabled:opacity-50">{Number(value).toLocaleString('en-US')} KB</button>)}</div>
      <p className="text-xs text-[var(--text-body)]">Dimensions stay unchanged. {format === 'image/jpeg' ? 'JPEG is lossy and replaces transparency with white.' : format === 'image/png' ? 'PNG preserves transparency. A size target may not be reachable, and conversion can make files larger.' : 'WebP is lossy and supports transparency. Choose JPEG or PNG when preparing a YouTube upload.'}</p>
      {format !== 'image/png' && <details className="rounded-xl border border-[var(--border-hairline)] p-4"><summary className="text-xs font-medium cursor-pointer focus-ring rounded">Advanced quality settings</summary><div className="mt-4"><Slider id="max-quality" label="Maximum quality" min={25} max={95} value={quality} unit="%" onChange={(value) => { invalidate(); setQuality(value); }} /></div><p className="mt-3 text-xs text-[var(--text-body)]">The compressor searches down to 25% quality to try to meet your target. Inspect small text and edges.</p></details>}
    </fieldset>
    <div className="flex flex-wrap gap-3">
      <Button onClick={run} disabled={!items.length || locked}>{busy ? 'Compressing…' : items.length > 1 ? 'Compress batch' : 'Compress thumbnail'}</Button>
      {busy && <Button variant="outline" onClick={() => { controller.current?.abort(); setMessage('Cancelling current image. Completed outputs will remain available.'); }}>Cancel processing</Button>}
      <Button variant="outline" onClick={reset} disabled={packing}>Reset</Button>
    </div>
    <p role="status" aria-live="polite" className="text-sm text-[var(--text-body)]">{message}</p>
    {items.length > 0 && <div className="space-y-3">
      <label htmlFor="batch-progress" className="text-xs text-[var(--text-body)]">{settled} / {items.length} images finished · {complete.length} outputs ready</label>
      <progress id="batch-progress" value={settled} max={items.length} className="w-full" />
      <ul className="divide-y divide-[var(--border-hairline)]">{items.map((item, index) => <li key={index} className="py-3 space-y-2">
        <div className="flex flex-wrap justify-between gap-2 text-sm"><span className="break-all font-medium">{index + 1}. {item.file.name}</span><span className="text-[var(--text-body)]">{formatBytes(item.file.size)} · {item.status === 'complete' ? 'Ready' : item.status === 'error' ? 'Failed' : item.status === 'processing' ? 'Processing' : item.status === 'cancelled' ? 'Cancelled' : 'Queued'}</span></div>
        {item.error && <p className="text-xs text-[var(--state-error-text)]">{item.error}</p>}
        {item.result && <p className="text-xs text-[var(--text-body)]">{formatBytes(item.result.blob.size)} · {item.result.targetMet ? 'Size target met' : 'Size target not reached'}</p>}
        <div className="flex gap-3">
          {item.status === 'complete' && <button type="button" onClick={() => setPreview(index)} className="text-xs text-[var(--brand-accent)] underline focus-ring" aria-pressed={preview === index}>Review image {index + 1}</button>}
          <button type="button" disabled={locked} onClick={() => { setError(''); setItems((current) => current.filter((_, at) => at !== index)); setPreview(0); setMessage('Image removed. Other completed results remain available.'); }} aria-label={'Remove image ' + (index + 1)} className="text-xs text-[var(--text-body)] underline focus-ring disabled:opacity-50">Remove</button>
        </div>
      </li>)}</ul>
    </div>}
    <p className="text-xs text-[var(--text-muted)]">Images are processed sequentially in your browser without uploads or saved batches. Reset or leave to clear them. Completed outputs are capped at 60 MB total.</p>
  </>} results={<>
    <div className="flex flex-wrap items-center justify-between gap-3"><h3 className="text-base font-semibold">Batch results</h3><Button onClick={zip} disabled={!complete.length || locked}>{packing ? 'Preparing ZIP…' : 'Download ZIP (' + complete.length + ')'}</Button></div>
    <p className="text-xs text-[var(--text-body)]">The ZIP includes completed outputs only, even when a size target was missed. Unique numbered filenames prevent collisions.</p>
    {selected?.result ? <><p className="break-all text-sm font-medium">Image {preview + 1}: {selected.file.name}</p><CompletedImage key={generation.current + '-' + preview} item={selected} index={preview} /></> : <p className="py-12 text-sm text-[var(--text-body)]">Compress your images, then select a completed image to compare the original and output and download it individually.</p>}
  </>} />;
}
