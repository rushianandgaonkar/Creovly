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
import { decodeImage, validateImage, downloadName, type OutputFormat } from '@/lib/image-compression';
import { checkShortsGuide, exportShortsGuide, starterBox, starterMargins, type Margins } from '@/lib/shorts-guide';

export default function ShortsSafeZone() {
  const [selected, setSelected] = useState<{ file: File; width: number; height: number; format: OutputFormat }>();
  const [margins, setMargins] = useState(starterMargins); const [box, setBox] = useState(starterBox); const [markContent, setMarkContent] = useState(false);
  const [showGuide, setShowGuide] = useState(true); const [output, setOutput] = useState<Blob>();
  const [loading, setLoading] = useState(false); const [busy, setBusy] = useState(false); const [error, setError] = useState(''); const [key, setKey] = useState(0);
  const request = useRef(0); const controller = useRef<AbortController | undefined>(undefined); const errorRef = useRef<HTMLDivElement>(null);
  const source = useMemo(() => selected ? new Blob([selected.file], { type: selected.format }) : undefined, [selected]);
  const sourceUrl = useBlobUrl(source); const outputUrl = useBlobUrl(output);
  const guide = checkShortsGuide(margins, markContent ? box : undefined);
  useEffect(() => () => { request.current++; controller.current?.abort(); }, []);
  useEffect(() => { if (error) errorRef.current?.focus(); }, [error]);
  const clear = () => { request.current++; controller.current?.abort(); setBusy(false); setLoading(false); setOutput(undefined); setError(''); };
  const select = async (file: File) => {
    clear(); const id = request.current; setSelected(undefined); setLoading(true);
    try { const format = await validateImage(file); const bitmap = await decodeImage(file); const dimensions = { width: bitmap.width, height: bitmap.height }; bitmap.close(); if (id === request.current) setSelected({ file, format, ...dimensions }); }
    catch (cause) { if (id === request.current) setError(cause instanceof Error ? cause.message : 'Could not open the frame.'); }
    finally { if (id === request.current) setLoading(false); }
  };
  const reset = () => { clear(); setSelected(undefined); setMargins(starterMargins); setBox(starterBox); setMarkContent(false); setShowGuide(true); setKey((v) => v + 1); };
  const run = async () => {
    if (!selected || busy) return;
    clear(); const id = request.current; const abort = new AbortController(); controller.current = abort; setBusy(true);
    try { const blob = await exportShortsGuide(selected.file, margins, markContent ? box : undefined, abort.signal); if (id === request.current) setOutput(blob); }
    catch (cause) { if (id === request.current && !abort.signal.aborted) setError(cause instanceof Error ? cause.message : 'Could not create the guide.'); }
    finally { if (id === request.current) setBusy(false); }
  };
  const positioned = { left: `${guide.center.x}%`, top: `${guide.center.y}%`, width: `${guide.center.width}%`, height: `${guide.center.height}%` };
  return <ToolWorkspaceLayout workspace={<>
    <DropZone key={key} id="shorts-frame" label="Select a still frame" maxSizeMB={20} privacyNote="Stays on your device" onFileSelect={select} onError={setError} disabled={loading || busy} />
    <div ref={errorRef} tabIndex={-1} className="rounded focus-ring">{error && <Alert variant="error" title="Check your frame">{error}</Alert>}</div>
    {selected && <p className="text-xs text-[var(--text-body)] break-all">{selected.file.name} · {selected.width} × {selected.height}. Fitted into a 9:16 canvas without cropping.</p>}
    <Alert variant="info" title="Manual planning guide">Starting margins are Creovly planning assumptions, not official YouTube safe-zone measurements. UI overlays vary. This tool does not detect text, faces, captions, or policy compliance.</Alert>
    <fieldset disabled={busy || loading} className="space-y-5 min-w-0"><legend className="sr-only">Guide settings</legend>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">{(['top', 'bottom', 'left', 'right'] as (keyof Margins)[]).map((side) => <Slider key={side} id={`margin-${side}`} label={`${side[0].toUpperCase() + side.slice(1)} reserved margin`} min={0} max={side === 'bottom' ? 50 : 40} unit="%" value={margins[side]} onChange={(value) => { clear(); setMargins((current) => ({ ...current, [side]: value })); }} />)}</div>
      <Toggle id="show-shorts-guide" label="Show guide overlay" checked={showGuide} onChange={(event) => setShowGuide(event.target.checked)} />
      <Toggle id="mark-shorts-content" label="Mark important content with a box" hint="Place this box over the text or subject you want to check. Coordinates refer to the full 9:16 canvas." checked={markContent} onChange={(event) => { clear(); setMarkContent(event.target.checked); }} />
      {markContent && <div className="space-y-5">
        <Slider id="content-x" label="Content box left position" min={0} max={100 - box.width} value={box.x} unit="%" onChange={(x) => { clear(); setBox((current) => ({ ...current, x })); }} />
        <Slider id="content-y" label="Content box top position" min={0} max={100 - box.height} value={box.y} unit="%" onChange={(y) => { clear(); setBox((current) => ({ ...current, y })); }} />
        <Slider id="content-width" label="Content box width" min={1} max={100 - box.x} value={box.width} unit="%" onChange={(width) => { clear(); setBox((current) => ({ ...current, width })); }} />
        <Slider id="content-height" label="Content box height" min={1} max={100 - box.y} value={box.height} unit="%" onChange={(height) => { clear(); setBox((current) => ({ ...current, height })); }} />
      </div>}
    </fieldset>
    <div className="flex flex-wrap justify-between gap-3"><Button variant="outline" onClick={reset}>Reset</Button><Button disabled={!selected || loading || busy} onClick={run}>{busy ? 'Creating guide…' : 'Create PNG guide'}</Button></div>
    <p role="status" className="text-xs text-[var(--text-body)]">{loading ? 'Opening frame…' : busy ? 'Creating the annotated guide…' : output ? 'Guide ready to download. It includes visible planning annotations.' : 'Select a frame and adjust the margins. Guide exports always include the annotations.'}</p>
    <p className="text-xs text-[var(--text-body)]">Still JPEG, PNG, or WebP only; video playback is not supported. Images are processed locally, without uploading or saving them to a server.</p>
  </>} results={<>
    {sourceUrl ? <>
      <figure className="space-y-3"><figcaption className="text-xs font-medium">Manual frame preview · 9:16 canvas</figcaption><div className="relative mx-auto w-full max-w-[280px] aspect-[9/16] overflow-hidden rounded-lg bg-black" role="img" aria-label="Your frame fitted into a portrait canvas with adjustable reserved margins and an optional marked content box">
        <Image unoptimized fill sizes="280px" src={sourceUrl} alt="Selected Shorts frame" className="object-contain" />
        {showGuide && <><div className="absolute border-2 border-green-400" style={{ ...positioned, boxShadow: '0 0 0 2000px rgba(220,38,38,.35)' }} /><span className="absolute top-2 left-2 text-[10px] bg-black/80 text-white px-2 py-1 rounded">Planning guide</span></>}
        {markContent && <div className="absolute border-2 border-dashed border-yellow-300" style={{ left: `${box.x}%`, top: `${box.y}%`, width: `${box.width}%`, height: `${box.height}%` }} />}
      </div><p className="text-xs text-[var(--text-body)]">Solid outline: chosen central area. Shaded edges: reserved margins. Dashed box: content you marked.</p></figure>
      <MetricCard label="Chosen central area" value={`${guide.center.width}% × ${guide.center.height}%`} subtext="Width × height of the canvas; not a clearance score" />
      {markContent ? <Alert variant={guide.overlaps.length ? 'warning' : 'success'} title={guide.overlaps.length ? 'Box overlaps your margins' : 'Box fits inside your margins'}>{guide.overlaps.length ? `Your marked box intersects the ${guide.overlaps.join(', ')} reserved margin${guide.overlaps.length > 1 ? 's' : ''}. Adjust its position or the margins.` : 'The box you marked is inside your chosen central area. This does not guarantee visibility in the YouTube app.'}</Alert> : <p className="text-xs text-[var(--text-body)]">Enable the content box to check a specific part of your frame against the chosen margins.</p>}
      {outputUrl && <a className="inline-flex w-full justify-center rounded-full bg-[var(--brand-primary)] text-[var(--brand-on-primary)] px-4 py-3 text-sm font-medium focus-ring" href={outputUrl} download={downloadName(selected?.file.name ?? 'frame', 'image/png').replace('-compressed.', '-planning-guide.')}>Download annotated PNG guide</a>}
      <p className="text-xs text-[var(--text-body)]">The export is a 1080 × 1920 planning reference with visible overlays. Inspect the actual Shorts player before publishing.</p>
    </> : <p className="py-10 text-center text-sm text-[var(--text-body)]">Your frame and adjustable guide will appear here.</p>}
  </>} />;
}
