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
import { compressImage, decodeImage, downloadName, formatBytes, formatLabel, validateImage, type CompressionResult, type OutputFormat } from '@/lib/image-compression';

interface SelectedImage { file: File; width: number; height: number; format: OutputFormat }

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
  const originalBlob = useMemo(() => selected ? new Blob([selected.file], { type: selected.format }) : undefined, [selected]);
  const originalUrl = useBlobUrl(originalBlob);
  const outputUrl = useBlobUrl(result?.blob);
  const errorRef = useRef<HTMLDivElement>(null);

  useEffect(() => () => { request.current++; controller.current?.abort(); }, []);
  useEffect(() => { if (error) errorRef.current?.focus(); }, [error]);

  const cancel = () => { request.current++; controller.current?.abort(); setBusy(false); setLoading(false); };
  const selectFile = async (file: File) => {
    cancel(); const id = request.current;
    setSelected(undefined); setResult(undefined); setError(''); setLoading(true);
    try {
      const inputFormat = await validateImage(file);
      const bitmap = await decodeImage(file);
      const dimensions = { width: bitmap.width, height: bitmap.height }; bitmap.close();
      if (id === request.current) setSelected({ file, format: inputFormat, ...dimensions });
    } catch (cause) { if (id === request.current) setError(cause instanceof Error ? cause.message : 'Could not open this image. Please choose another file.'); }
    finally { if (id === request.current) setLoading(false); }
  };
  const clearResult = () => { cancel(); setResult(undefined); setError(''); };
  const reset = () => {
    cancel(); setSelected(undefined); setResult(undefined); setError(''); setFileKey((key) => key + 1);
    setFormat('image/jpeg'); setTarget('2000'); setQuality(90);
  };
  const run = async () => {
    if (!selected || busy) return;
    const bytes = Number(target) * 1000;
    if (!Number.isFinite(bytes) || bytes < 10_000 || bytes > 20_000_000) { setError('Enter a target between 10 and 20,000 KB.'); return; }
    cancel(); const id = request.current; const abort = new AbortController(); controller.current = abort;
    setBusy(true); setError(''); setResult(undefined);
    try {
      const output = await compressImage(selected.file, { format, targetBytes: bytes, maxQuality: quality / 100 }, abort.signal);
      if (id === request.current) setResult(output);
    } catch (cause) {
      if (id === request.current && !abort.signal.aborted) setError(cause instanceof Error ? cause.message : 'Compression failed. Please try another format.');
    } finally { if (id === request.current) setBusy(false); }
  };

  return <ToolWorkspaceLayout workspace={
    <>
      <DropZone key={fileKey} id="thumbnail-file" label="Select thumbnail" maxSizeMB={20} privacyNote="Stays on your device" onFileSelect={selectFile} onError={setError} disabled={busy || loading} />
      <div ref={errorRef} tabIndex={-1} className="focus-ring rounded-md">{error && <Alert variant="error" title="Check your image or settings">{error}</Alert>}</div>
      {selected && <p className="text-xs text-[var(--text-body)] break-all">{selected.file.name} · {formatBytes(selected.file.size)} · {selected.width} × {selected.height} · {formatLabel(selected.format)}</p>}
      <fieldset disabled={busy || loading} className="space-y-5 min-w-0">
        <legend className="sr-only">Compression settings</legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumberInput id="target-size" label="Target file size" value={target} min={10} max={20000} step={1} suffix="KB" onChange={(event) => { clearResult(); setTarget(event.target.value); }} />
          <Select id="output-format" label="Output format" value={format} onChange={(event) => { clearResult(); setFormat(event.target.value as OutputFormat); }} options={[{ value: 'image/jpeg', label: 'JPEG — recommended' }, { value: 'image/png', label: 'PNG — preserve transparency' }, { value: 'image/webp', label: 'WebP — compact web image' }]} />
        </div>
        <p className="text-xs text-[var(--text-body)]">Default: 2 MB (2,000 KB). Image dimensions stay unchanged.</p>
        <p className="text-xs text-[var(--text-body)]">{format === 'image/jpeg' ? 'JPEG uses lossy compression. Transparent areas become white.' : format === 'image/png' ? 'PNG keeps transparency. Its file size cannot be controlled with a quality slider; the target may not be reachable.' : 'WebP keeps transparency and uses lossy compression. For a YouTube upload, choose JPEG or PNG.'}</p>
        {format !== 'image/png' && <details className="rounded-lg border border-[var(--border-hairline)] p-3">
          <summary className="text-xs font-medium cursor-pointer focus-ring rounded">Advanced quality settings</summary>
          <div className="mt-4"><Slider id="max-quality" label="Maximum quality" value={quality} min={25} max={95} unit="%" onChange={(value) => { clearResult(); setQuality(value); }} /></div>
          <p className="text-xs text-[var(--text-body)] mt-3">We try the highest quality that fits your target, down to 25%. Review fine text before using the result.</p>
        </details>}
      </fieldset>
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[var(--border-hairline-subtle)]">
        <Button variant="outline" size="sm" onClick={reset}>Reset</Button>
        <Button disabled={!selected || busy || loading} onClick={run}>{busy ? 'Compressing…' : 'Compress thumbnail'}</Button>
      </div>
      <p role="status" aria-live="polite" className="text-xs text-[var(--text-body)]">{loading ? 'Opening image…' : busy ? 'Finding an output size. Keep this page open.' : result ? 'Compression finished. Review the result before downloading.' : selected ? 'Image ready. Choose your settings and compress.' : 'Choose an image to begin.'}</p>
      <p className="text-xs text-[var(--text-body)]">Images are processed locally in this browser. This tool does not upload or save them to a server. Reset or leave the page to clear the workspace.</p>
    </>
  } results={
    <>
      {!selected && <div className="py-12 text-center text-sm text-[var(--text-body)]">Your original and compressed thumbnail will appear here.</div>}
      {selected && originalUrl && <ImagePreview url={originalUrl} title="Original" width={selected.width} height={selected.height} />}
      {selected && !result && <p className="text-xs text-[var(--text-body)]">Compress the image to compare the output and download it.</p>}
      {selected && result && <>
        {outputUrl && <ImagePreview url={outputUrl} title="Output" width={result.width} height={result.height} />}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3">
          <MetricCard label="Original size" value={formatBytes(selected.file.size)} />
          <MetricCard label="Output size" value={formatBytes(result.blob.size)} subtext={`${formatLabel(result.blob.type)} · ${result.width} × ${result.height}`} />
        </div>
        <p className="text-xs text-[var(--text-body)]">{result.blob.size < selected.file.size ? `${((1 - result.blob.size / selected.file.size) * 100).toFixed(1)}% smaller` : result.blob.size === selected.file.size ? 'Same file size' : `${((result.blob.size / selected.file.size - 1) * 100).toFixed(1)}% larger`} · {result.quality === null ? result.originalUsed ? 'Original retained' : 'PNG output' : `Quality ${Math.round(result.quality * 100)}%`}</p>
        <Alert variant={result.targetMet ? 'success' : 'warning'} title={result.targetMet ? 'Target met' : 'Target not reached'}>
          {result.targetMet ? `Output is within your ${formatBytes(Number(target) * 1000)} target.` : 'This target cannot be reached with these settings and dimensions. Try JPEG or WebP, increase the target, or use the thumbnail resizer first.'}
          {result.originalUsed && ' The original is already smaller than the re-encoded version, so we kept it unchanged.'}
        </Alert>
        {result.blob.size > selected.file.size && <p className="text-xs text-[var(--text-body)]">Converting formats made this file larger. Try another output format or keep the original.</p>}
        {outputUrl && <a href={outputUrl} download={downloadName(selected.file.name, format)} className="inline-flex w-full justify-center rounded-full bg-[var(--brand-primary)] text-[var(--brand-on-primary)] px-4 py-3 text-sm font-medium hover:opacity-90 focus-ring">Download {formatLabel(result.blob.type)}</a>}
      </>}
    </>
  } />;
}


