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
import { decodeImage, validateImage, formatBytes, formatLabel, downloadName, type OutputFormat } from '@/lib/image-compression';
import { resizeGeometry, resizeImage, validateResize, type ResizeOptions } from '@/lib/image-resize';

const defaults: ResizeOptions = { width: 1280, height: 720, fit: 'cover', x: 50, y: 50, background: 'white', format: 'image/jpeg', quality: .9 };

export default function ThumbnailResizer() {
  const [selected, setSelected] = useState<{ file: File; width: number; height: number; format: OutputFormat }>();
  const [options, setOptions] = useState(defaults);
  const [preset, setPreset] = useState('1280x720');
  const [width, setWidth] = useState('1280'); const [height, setHeight] = useState('720');
  const [result, setResult] = useState<Awaited<ReturnType<typeof resizeImage>>>();
  const [loading, setLoading] = useState(false); const [busy, setBusy] = useState(false);
  const [error, setError] = useState(''); const [fileKey, setFileKey] = useState(0);
  const generation = useRef(0); const controller = useRef<AbortController | undefined>(undefined);
  const errorRef = useRef<HTMLDivElement>(null);
  const sourceBlob = useMemo(() => selected ? new Blob([selected.file], { type: selected.format }) : undefined, [selected]);
  const sourceUrl = useBlobUrl(sourceBlob); const outputUrl = useBlobUrl(result?.blob);
  const settings = { ...options, width: Number(width), height: Number(height) };
  let valid = true;
  try { validateResize(settings); } catch { valid = false; }
  const upscaled = selected && valid && resizeGeometry(selected.width, selected.height, settings.width, settings.height, options.fit).scale > 1;
  useEffect(() => () => { generation.current++; controller.current?.abort(); }, []);
  useEffect(() => { if (error) errorRef.current?.focus(); }, [error]);
  const cancel = () => { generation.current++; controller.current?.abort(); setBusy(false); setLoading(false); };
  const clear = () => { cancel(); setResult(undefined); setError(''); };
  const change = (patch: Partial<ResizeOptions>) => { clear(); setOptions((current) => ({ ...current, ...patch })); };
  const selectFile = async (file: File) => {
    clear(); setSelected(undefined); setLoading(true); const id = generation.current;
    try {
      const format = await validateImage(file); const bitmap = await decodeImage(file);
      const dimensions = { width: bitmap.width, height: bitmap.height }; bitmap.close();
      if (id === generation.current) setSelected({ file, format, ...dimensions });
    } catch (cause) { if (id === generation.current) setError(cause instanceof Error ? cause.message : 'Could not open this image.'); }
    finally { if (id === generation.current) setLoading(false); }
  };
  const reset = () => { clear(); setSelected(undefined); setOptions(defaults); setWidth('1280'); setHeight('720'); setPreset('1280x720'); setFileKey((key) => key + 1); };
  const run = async () => {
    if (!selected || busy) return;
    clear(); const id = generation.current; const abort = new AbortController(); controller.current = abort; setBusy(true);
    try { const output = await resizeImage(selected.file, settings, abort.signal); if (id === generation.current) setResult(output); }
    catch (cause) { if (id === generation.current && !abort.signal.aborted) setError(cause instanceof Error ? cause.message : 'Resize failed. Please try again.'); }
    finally { if (id === generation.current) setBusy(false); }
  };
  return <ToolWorkspaceLayout workspace={<>
    <DropZone key={fileKey} id="resizer-file" label="Select image to resize" maxSizeMB={20} privacyNote="Stays on your device" disabled={loading || busy} onFileSelect={selectFile} onError={setError} />
    <div ref={errorRef} tabIndex={-1} className="focus-ring rounded-md">{error && <Alert variant="error" title="Check your image or settings">{error}</Alert>}</div>
    {selected && <p className="text-xs text-[var(--text-body)] break-all">{selected.file.name} · {selected.width} × {selected.height} · {formatBytes(selected.file.size)}</p>}
    <fieldset disabled={loading || busy} className="space-y-5 min-w-0">
      <legend className="sr-only">Resize settings</legend>
      <Select id="resize-preset" label="Canvas size" value={preset} onChange={(event) => { clear(); const value = event.target.value; setPreset(value); if (value !== 'custom') { const [w, h] = value.split('x'); setWidth(w); setHeight(h); } }} options={[{ value: '1280x720', label: '1280 × 720 — HD 16:9' }, { value: '1920x1080', label: '1920 × 1080 — Full HD 16:9' }, { value: '3840x2160', label: '3840 × 2160 — 4K 16:9' }, { value: 'custom', label: 'Custom dimensions' }]} />
      {preset === 'custom' && <div className="grid grid-cols-2 gap-4">
        <NumberInput id="resize-width" label="Width" suffix="px" min={1} max={8192} value={width} onChange={(event) => { clear(); setWidth(event.target.value); }} />
        <NumberInput id="resize-height" label="Height" suffix="px" min={1} max={8192} value={height} onChange={(event) => { clear(); setHeight(event.target.value); }} />
      </div>}
      <Select id="resize-fit" label="Image fit" value={options.fit} onChange={(event) => change({ fit: event.target.value as ResizeOptions['fit'] })} options={[{ value: 'cover', label: 'Crop to fill — no stretching' }, { value: 'contain', label: 'Fit entire image — add padding' }]} />
      {options.fit === 'cover' ? <div className="space-y-4">
        <p className="text-xs text-[var(--text-body)]">Move the crop to keep your subject in frame. A slider has no effect when there is no crop on that axis.</p>
        <Slider id="crop-x" label="Horizontal crop position" value={options.x} unit="%" onChange={(x) => change({ x })} />
        <Slider id="crop-y" label="Vertical crop position" value={options.y} unit="%" onChange={(y) => change({ y })} />
      </div> : <p className="text-xs text-[var(--text-body)]">The complete image stays centered. Empty canvas areas use the background below.</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Select id="resize-background" label="Canvas background" value={options.background} onChange={(event) => change({ background: event.target.value as ResizeOptions['background'] })} options={[{ value: 'white', label: 'White' }, { value: 'black', label: 'Black' }, { value: 'transparent', label: 'Transparent' }]} />
        <Select id="resize-format" label="Output format" value={options.format} onChange={(event) => change({ format: event.target.value as OutputFormat })} options={[{ value: 'image/jpeg', label: 'JPEG' }, { value: 'image/png', label: 'PNG' }, { value: 'image/webp', label: 'WebP' }]} />
      </div>
      <p className="text-xs text-[var(--text-body)]">{options.format === 'image/jpeg' ? 'JPEG is lossy. Choose Transparent with JPEG and transparent areas become white.' : options.format === 'image/png' ? 'PNG preserves transparency when the background is Transparent.' : 'WebP is lossy and supports transparency. Choose JPEG or PNG for a YouTube upload.'}</p>
      {options.format !== 'image/png' && <Slider id="resize-quality" label="Export quality" min={25} max={95} value={Math.round(options.quality * 100)} unit="%" onChange={(quality) => change({ quality: quality / 100 })} />}
    </fieldset>
    {upscaled && <Alert variant="warning" title="This will enlarge your image">Enlarging adds pixels, but cannot restore detail. Check text and edges in the output.</Alert>}
    <div className="flex flex-wrap justify-between items-center gap-3 pt-3 border-t border-[var(--border-hairline-subtle)]"><Button variant="outline" size="sm" onClick={reset}>Reset</Button><Button disabled={!selected || busy || loading} onClick={run}>{busy ? 'Resizing…' : 'Resize thumbnail'}</Button></div>
    <p role="status" aria-live="polite" className="text-xs text-[var(--text-body)]">{loading ? 'Opening image…' : busy ? 'Creating your resized image…' : result ? 'Resize finished. Review and download your image.' : selected ? 'Image ready. Adjust the framing, then resize.' : 'Choose an image to begin.'}</p>
    <p className="text-xs text-[var(--text-body)]">Processing stays in your browser. Images are not uploaded or saved to a server. Reset or leave the page to clear the workspace.</p>
  </>} results={<>
    {!selected && <p className="py-12 text-center text-sm text-[var(--text-body)]">Your image and canvas preview will appear here.</p>}
    {selected && sourceUrl && <ImagePreview url={sourceUrl} title="Original" width={selected.width} height={selected.height} />}
    {selected && sourceUrl && valid && !result && <ImagePreview url={sourceUrl} title="Framing preview — not yet exported" width={selected.width} height={selected.height} frame={{ width: settings.width, height: settings.height, fit: options.fit, x: options.x, y: options.y, background: options.background === 'transparent' ? options.format === 'image/jpeg' ? 'white' : 'transparent' : options.background }} />}
    {selected && !valid && <p className="text-xs text-[var(--text-body)]">Enter valid dimensions to see the framing preview. Maximum: 8,192 pixels per side and 24 megapixels total.</p>}
    {selected && result && <>
      {outputUrl && <ImagePreview url={outputUrl} title="Exported output" width={result.width} height={result.height} />}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3"><MetricCard label="Canvas size" value={`${result.width} × ${result.height}`} /><MetricCard label="Output size" value={formatBytes(result.blob.size)} subtext={formatLabel(result.blob.type)} /></div>
      <p className="text-xs text-[var(--text-body)]">Resizing does not guarantee a smaller file. Use the compressor next if you need a specific file size.</p>
      {outputUrl && <a href={outputUrl} download={downloadName(selected.file.name, options.format).replace('-compressed.', `-${result.width}x${result.height}.`)} className="inline-flex w-full justify-center rounded-full bg-[var(--brand-primary)] text-[var(--brand-on-primary)] px-4 py-3 text-sm font-medium hover:opacity-90 focus-ring">Download {formatLabel(result.blob.type)}</a>}
      <Button href="/tools/youtube-thumbnail-compressor" variant="outline" className="w-full">Open thumbnail compressor</Button>
    </>}
  </>} />;
}

