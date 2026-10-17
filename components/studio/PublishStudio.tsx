/* Hallmark · genre: modern-minimal · macrostructure: Workbench · theme: Cobalt */
/* Hallmark · pre-emit critique: P5 H5 E5 S5 R5 V5 */
'use client';

import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Input from '@/components/form/Input';
import Textarea from '@/components/form/Textarea';
import Select from '@/components/form/Select';
import Slider from '@/components/form/Slider';
import DropZone from '@/components/form/DropZone';
import Button from '@/components/ui/Button';
import Alert from '@/components/feedback/Alert';
import MetricCard from '@/components/results/MetricCard';
import { useBlobUrl } from '@/components/tools/ImagePreview';
import StudioSection from './StudioSection';
import { analyzeTitle } from '@/lib/title-analysis';
import { compressImage, decodeImage, formatBytes, formatLabel, validateImage, type OutputFormat } from '@/lib/image-compression';
import { resizeImage } from '@/lib/image-resize';
import { checkShortsGuide, exportShortsGuide } from '@/lib/shorts-guide';
import { emptyStudioDraft, parseStudioDraft, studioChecks, studioConfirmations, studioReport, type StudioDraft } from '@/lib/studio';
import { createStudioZip } from '@/lib/studio-zip';

interface Asset { file: File; width: number; height: number; format: OutputFormat }
const DRAFT_KEY = 'creovly-studio-draft-v1';

export default function PublishStudio() {
  const [draft, setDraft] = useState<StudioDraft>(emptyStudioDraft);
  const [source, setSource] = useState<Asset>();
  const [prepared, setPrepared] = useState<Asset>();
  const [previewSurface, setPreviewSurface] = useState<'mobile' | 'desktop'>('mobile');
  const [busy, setBusy] = useState('');
  const [message, setMessage] = useState('Start a project. Nothing is saved until you choose Save draft.');
  const [error, setError] = useState('');
  const [hasSaved, setHasSaved] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [fileKey, setFileKey] = useState(0);
  const request = useRef(0);
  const abort = useRef<AbortController | undefined>(undefined);
  const errorRef = useRef<HTMLDivElement>(null);
  const asset = prepared ?? source;
  const assetBlob = useMemo(() => asset ? new Blob([asset.file], { type: asset.format }) : undefined, [asset]);
  const imageUrl = useBlobUrl(assetBlob);
  const assetInfo = asset ? { width: asset.width, height: asset.height, bytes: asset.file.size, format: asset.format, name: asset.file.name } : undefined;
  const checks = studioChecks(draft, assetInfo);
  const completed = checks.filter(check => check.passed).length;
  const titleAnalysis = draft.title.trim() ? analyzeTitle(draft.title, draft.keyword) : undefined;
  const titleRemaining = 100 - draft.title.length;
  const titleTone = titleRemaining < 0 ? 'error' : draft.title.length >= 90 ? 'warning' : 'success';
  let guide: ReturnType<typeof checkShortsGuide> | undefined;
  try { guide = checkShortsGuide(draft.margins, draft.box); } catch { /* Invalid settings are reported by the readiness check. */ }

  useEffect(() => { try { setHasSaved(!!localStorage.getItem(DRAFT_KEY)); } catch { setMessage('Browser storage is unavailable. You can still work and download your project.'); } }, []);
  useEffect(() => () => { request.current++; abort.current?.abort(); }, []);
  useEffect(() => { if (error) errorRef.current?.focus(); }, [error]);
  function cancel() { request.current++; abort.current?.abort(); setBusy(''); }
  function change(patch: Partial<StudioDraft>, clearImage = false) {
    if (busy) return;
    setDraft(prev => ({ ...prev, ...patch, confirmations: {} }));
    setDirty(true); setError(''); setMessage('Unsaved changes. Review the manual checks again after editing.');
    if (clearImage) setPrepared(undefined);
  }
  function clearAsset() { cancel(); setSource(undefined); setPrepared(undefined); setFileKey(key => key + 1); }
  async function selectFile(file: File) {
    cancel(); const id = request.current;
    setSource(undefined); setPrepared(undefined); setError(''); setBusy('Opening image…');
    setDraft(prev => ({ ...prev, confirmations: {} })); setDirty(true);
    try {
      const format = await validateImage(file); const bitmap = await decodeImage(file);
      const dimensions = { width: bitmap.width, height: bitmap.height }; bitmap.close();
      if (id === request.current) { setSource({ file, format, ...dimensions }); setMessage('Image opened locally. Review its framing and the checks.'); }
    } catch (cause) { if (id === request.current) setError(cause instanceof Error ? cause.message : 'Could not open this image.'); }
    finally { if (id === request.current) setBusy(''); }
  }
  async function prepare() {
    if (!source || busy) return;
    cancel(); const id = request.current; const controller = new AbortController(); abort.current = controller;
    setBusy('Preparing JPEG…'); setError('');
    try {
      const width = draft.kind === 'video' ? 1280 : 1080; const height = draft.kind === 'video' ? 720 : 1920;
      const resized = await resizeImage(source.file, { width, height, fit: draft.fit, x: 50, y: 50, background: 'white', format: 'image/jpeg', quality: .95 }, controller.signal);
      const output = await compressImage(new File([resized.blob], 'prepared.jpg', { type: 'image/jpeg' }), { format: 'image/jpeg', targetBytes: 2_000_000, maxQuality: .9 }, controller.signal);
      if (id !== request.current) return;
      setPrepared({ file: new File([output.blob], draft.kind === 'video' ? 'thumbnail.jpg' : 'shorts-frame.jpg', { type: 'image/jpeg' }), width, height, format: 'image/jpeg' });
      setDraft(prev => ({ ...prev, confirmations: {} })); setDirty(true);
      setMessage(`JPEG prepared: ${width} × ${height}, ${formatBytes(output.blob.size)}. ${output.targetMet ? 'Within the 2 MB preparation target.' : 'The 2 MB preparation target was not reached.'}${resized.upscaled ? ' Source was enlarged; inspect detail carefully.' : ''} Review the new image and manual checks.`);
    } catch (cause) { if (id === request.current && !controller.signal.aborted) setError(cause instanceof Error ? cause.message : 'Could not prepare this image.'); }
    finally { if (id === request.current) setBusy(''); }
  }
  const saveDraft = useCallback(() => {
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
      setHasSaved(true);
      setDirty(false);
      setError('');
      setMessage('Draft saved in this browser. Images are not saved; reselect them after loading.');
    } catch {
      setError('Could not save this draft. Browser storage may be full or blocked. Download a project package to keep a copy.');
    }
  }, [draft]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        saveDraft();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [saveDraft]);

  function loadDraft() {
    try {
      const raw = localStorage.getItem(DRAFT_KEY); if (!raw) throw new Error('No saved draft was found.');
      const next = parseStudioDraft(raw); clearAsset(); setDraft(next); setDirty(false); setError('');
      setMessage('Saved draft loaded. Reselect your image and review the manual checks; both were reset.');
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'Could not load the saved draft.'); }
  }

  function newProject() {
    if (dirty && (draft.title.trim() || draft.description.trim() || asset)) {
      const confirmClear = window.confirm('You have unsaved changes in your workspace. Starting a new project will clear current metadata. Are you sure you want to proceed?');
      if (!confirmClear) return;
    }
    clearAsset(); setDraft(emptyStudioDraft()); setDirty(false); setError(''); setMessage(hasSaved ? 'New empty project. Your previously saved draft is still available.' : 'New empty project. Nothing is saved until you choose Save draft.');
  }

  function forgetDraft() {
    try { localStorage.removeItem(DRAFT_KEY); setHasSaved(false); setDirty(true); setError(''); setMessage('Saved draft removed from this browser. The current workspace is still open.'); }
    catch { setError('Could not remove the saved draft from browser storage.'); }
  }

  async function copyMetadata() {
    try { await navigator.clipboard.writeText(`${draft.title}\n\n${draft.description}`); setMessage('Title and description copied to your clipboard.'); setError(''); }
    catch { setError('Clipboard access failed. Select and copy the title and description manually.'); }
  }

  async function downloadPackage() {
    if (busy) return;
    cancel(); const id = request.current; const controller = new AbortController(); abort.current = controller;
    setBusy('Building package…'); setError('');
    try {
      const report = studioReport(draft, assetInfo);
      const files = [
        { name: 'project.json', blob: new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' }) },
        { name: 'metadata.txt', blob: new Blob([`${draft.title}\n\n${draft.description}\n`], { type: 'text/plain;charset=utf-8' }) },
        { name: 'checks.txt', blob: new Blob([`${draft.projectName || 'Untitled project'}\n${completed} of ${checks.length} checks completed\n\n${checks.map(check => `${check.passed ? '[x]' : '[ ]'} ${check.label} (${check.source})\n    ${check.detail}`).join('\n')}\n\n${report.limitations}\n\nThe included image is ${prepared ? 'the prepared JPEG' : 'the selected original'}. No video file is included. Upload and review your files in YouTube Studio yourself.\n`], { type: 'text/plain;charset=utf-8' }) },
      ];
      if (asset) files.push({ name: `${draft.kind === 'video' ? 'thumbnail' : 'shorts-frame'}.${asset.format === 'image/jpeg' ? 'jpg' : asset.format.split('/')[1]}`, blob: asset.file });
      if (draft.kind === 'shorts' && asset) files.push({ name: 'shorts-planning-guide.png', blob: await exportShortsGuide(asset.file, draft.margins, draft.box, controller.signal) });
      const zip = await createStudioZip(files);
      if (id !== request.current || controller.signal.aborted) return;
      const url = URL.createObjectURL(zip); const anchor = document.createElement('a');
      anchor.href = url; anchor.download = `${draft.projectName.replace(/[^a-zA-Z0-9_-]/g, '-').slice(0, 60) || 'creovly-project'}.zip`; document.body.appendChild(anchor); anchor.click(); anchor.remove(); setTimeout(() => URL.revokeObjectURL(url), 30_000);
      setMessage('Project package download started. It includes the current metadata, check report, and selected image if present.');
    } catch (cause) { if (id === request.current && !controller.signal.aborted) setError(cause instanceof Error ? cause.message : 'Could not build this package.'); }
    finally { if (id === request.current) setBusy(''); }
  }

  return <div className="space-y-6">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <p className="text-xs text-[var(--text-body)]">One local project <span aria-hidden="true">·</span> {dirty ? 'Unsaved changes' : 'Save drafts explicitly'}</p>
      <div className="flex flex-wrap items-center gap-2">
        <Button variant="ghost" size="sm" onClick={newProject}>New project</Button>
        <Button variant="outline" size="sm" disabled={!hasSaved || !!busy} onClick={loadDraft}>Load saved draft</Button>
        <Button size="sm" disabled={!!busy} onClick={saveDraft}>
          <span>Save draft</span>
          <kbd className="ml-1 text-[10px] font-mono opacity-60">Ctrl+S</kbd>
        </Button>
      </div>
    </div>
    <div ref={errorRef} tabIndex={-1} className="focus-ring rounded">{error && <Alert variant="error" title="Review your project">{error}</Alert>}</div>
    <p role="status" aria-live="polite" className="text-xs text-[var(--text-body)]">{busy || message}</p>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
      <div className="space-y-6 min-w-0">
        <StudioSection title="01. Project & metadata">
          <fieldset disabled={!!busy} className="space-y-4 min-w-0">
            <legend className="sr-only">Project metadata</legend>
            <div className="grid sm:grid-cols-2 gap-4"><Input id="studio-project" label="Project name" maxLength={120} value={draft.projectName} onChange={event => change({ projectName: event.target.value })} placeholder="My next upload" /><Select id="studio-kind" label="Content type" value={draft.kind} onChange={event => change({ kind: event.target.value as StudioDraft['kind'] }, true)} options={[{ value: 'video', label: 'Standard video' }, { value: 'shorts', label: 'Shorts still-frame planning' }]} /></div>
            <Input id="studio-channel" label="Channel name (preview only)" maxLength={100} value={draft.channel} onChange={event => change({ channel: event.target.value })} placeholder="Your channel" />
            <Textarea id="studio-title" label="Video title" rows={2} maxLength={2000} value={draft.title} onChange={event => change({ title: event.target.value })} placeholder="Give your video a clear, accurate title" />
            <p className="text-xs font-medium" style={{ color: draft.title.length ? `var(--state-${titleTone}-text)` : 'var(--text-body)' }}>{draft.title.length} / 100 character units · {titleRemaining < 0 ? `${-titleRemaining} character${titleRemaining === -1 ? '' : 's'} over the limit` : titleRemaining === 0 ? 'At the limit' : `${titleRemaining} remaining`}</p>
            <Input id="studio-keyword" label="Topic phrase (optional)" maxLength={100} value={draft.keyword} onChange={event => change({ keyword: event.target.value })} placeholder="Exact phrase to check" />
            <Textarea id="studio-description" label="Video description" rows={5} maxLength={10000} value={draft.description} onChange={event => change({ description: event.target.value })} placeholder="Describe the video, then add relevant links, credits, and disclosures." />
            <p className="text-xs" style={{ color: draft.description.length > 5000 ? 'var(--state-error-text)' : 'var(--text-body)' }}>{draft.description.length} / 5,000 character units{draft.description.length > 5000 ? ` · ${draft.description.length - 5000} over the limit` : ''}. Spaces count; emoji may use more than one unit.</p>
          </fieldset>
          {titleAnalysis && <details className="rounded-lg border border-[var(--border-hairline)] p-3"><summary className="text-xs font-medium cursor-pointer focus-ring">Title feedback · basic local checks</summary><ul className="mt-3 list-disc pl-4 text-xs text-[var(--text-body)] space-y-2">{titleAnalysis.notes.map(note => <li key={note}>{note}</li>)}</ul></details>}
        </StudioSection>
        <StudioSection title={draft.kind === 'video' ? '02. Thumbnail preparation' : '02. Shorts frame & planning guide'}>
          <DropZone key={fileKey} id="studio-image" label={draft.kind === 'video' ? 'Select project thumbnail' : 'Select Shorts still frame'} maxSizeMB={20} privacyNote="Stays on your device" disabled={!!busy} onFileSelect={selectFile} onError={setError} />
          {source && <p className="text-xs text-[var(--text-body)] break-all">Source: {source.file.name} · {source.width} × {source.height} · {formatBytes(source.file.size)}</p>}
          <fieldset disabled={!!busy} className="grid sm:grid-cols-2 gap-4 min-w-0">
            <legend className="sr-only">Image preparation settings</legend>
            <Select id="studio-fit" label="Preparation framing" value={draft.fit} onChange={event => change({ fit: event.target.value as StudioDraft['fit'] }, true)} options={[{ value: 'contain', label: 'Fit whole image · white padding' }, { value: 'cover', label: 'Fill canvas · center crop' }]} />
            {draft.kind === 'video' && <Select id="studio-device" label="Thumbnail upload profile" value={draft.uploadDevice} onChange={event => change({ uploadDevice: event.target.value as StudioDraft['uploadDevice'] })} options={[{ value: 'mobile', label: 'Mobile · 2 MB target' }, { value: 'desktop', label: 'Desktop · 50 MB target' }]} />}
          </fieldset>
          <p className="text-xs text-[var(--text-body)]">Prepare a {draft.kind === 'video' ? '1280 × 720' : '1080 × 1920'} JPEG with a 2 MB size target. This can crop, enlarge, or reduce detail; transparency becomes white. Review the result. For custom framing, use the <Link href="/tools/youtube-thumbnail-resizer" className="underline focus-ring text-[var(--brand-accent-deep)]">resizer</Link> and reselect its download here.</p>
          <div className="flex flex-wrap gap-2"><Button disabled={!source || !!busy} onClick={prepare}>Prepare JPEG</Button>{asset && <Button variant="outline" disabled={!!busy} onClick={() => { clearAsset(); setDraft(prev => ({ ...prev, confirmations: {} })); setDirty(true); setMessage('Project image removed.'); }}>Remove image</Button>}{prepared && <Button variant="ghost" disabled={!!busy} onClick={() => { setPrepared(undefined); setDraft(prev => ({ ...prev, confirmations: {} })); setDirty(true); setMessage('Using the original image again.'); }}>Use original</Button>}</div>
          {draft.kind === 'shorts' && <>
            <details className="rounded-lg border border-[var(--border-hairline)] p-3"><summary className="text-xs font-medium cursor-pointer focus-ring">Adjust manual planning margins and content box</summary>
              <fieldset disabled={!!busy} className="space-y-4 mt-4 min-w-0"><legend className="sr-only">Manual Shorts guide settings</legend>
                {(['top', 'bottom', 'left', 'right'] as const).map(side => <Slider key={side} id={`studio-margin-${side}`} label={`${side[0].toUpperCase() + side.slice(1)} margin`} min={0} max={45} value={draft.margins[side]} unit="%" onChange={value => change({ margins: { ...draft.margins, [side]: value } })} />)}
                {(['x', 'y', 'width', 'height'] as const).map(axis => <Slider key={axis} id={`studio-box-${axis}`} label={`Content box ${axis}`} min={axis === 'width' || axis === 'height' ? 1 : 0} max={100} value={draft.box[axis]} unit="%" onChange={value => change({ box: { ...draft.box, [axis]: value } })} />)}
              </fieldset>
            </details>
            <p className="text-xs text-[var(--text-body)]">Planning margins are adjustable examples, not official safe zones. Place the box around important content yourself. The package includes a separately annotated PNG guide, not a video.</p>
          </>}
        </StudioSection>
      </div>
      <div className="space-y-6 min-w-0">
        <StudioSection title="03. Package preview">
          {draft.kind === 'video' && (
            <div className="flex items-center justify-between gap-2 border-b border-[var(--border-hairline)] pb-3 mb-4">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] font-semibold">
                Simulated YouTube View
              </span>
              <div className="flex items-center gap-1 p-0.5 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-canvas-subtle)] text-xs">
                <button
                  type="button"
                  onClick={() => setPreviewSurface('mobile')}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                    previewSurface === 'mobile'
                      ? 'bg-[var(--bg-canvas-elevated)] text-[var(--text-ink)] shadow-2xs font-semibold'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-ink)]'
                  }`}
                >
                  📱 Mobile Feed
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewSurface('desktop')}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                    previewSurface === 'desktop'
                      ? 'bg-[var(--bg-canvas-elevated)] text-[var(--text-ink)] shadow-2xs font-semibold'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-ink)]'
                  }`}
                >
                  💻 Desktop Search
                </button>
              </div>
            </div>
          )}

          {draft.kind === 'video' && previewSurface === 'desktop' ? (
            /* Desktop Search Layout Preview */
            <div className="space-y-3 p-3.5 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-subtle)]">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5 items-start">
                <div className="sm:col-span-5 relative aspect-video rounded-lg overflow-hidden border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] shadow-inner">
                  {imageUrl ? (
                    <Image unoptimized src={imageUrl} alt="Current project thumbnail" fill sizes="300px" style={{ objectFit: 'contain' }} />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-xs text-[var(--text-muted)]">
                      16:9 Thumbnail
                    </div>
                  )}
                </div>
                <div className="sm:col-span-7 space-y-1.5 min-w-0">
                  <h4 className="text-xs sm:text-sm font-bold text-[var(--text-ink)] line-clamp-2 leading-snug">
                    {draft.title || 'Your video title appears here'}
                  </h4>
                  <p className="text-[10px] text-[var(--text-muted)] flex items-center gap-1.5 font-mono">
                    <span className="font-semibold text-[var(--text-body)]">{draft.channel || 'Your channel'}</span>
                    <span className="w-1 h-1 rounded-full bg-emerald-500" />
                    <span>48K views • 2 hours ago</span>
                  </p>
                  <p className="text-[11px] text-[var(--text-body)] line-clamp-2 leading-relaxed">
                    {draft.description || 'Add your description to preview how search snippets render on desktop results.'}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* Mobile Feed or Shorts Layout Preview */
            <div className="max-w-sm mx-auto space-y-3">
              <div className="relative mx-auto rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-subtle)] overflow-hidden" style={{ aspectRatio: draft.kind === 'video' ? '16/9' : '9/16', width: draft.kind === 'shorts' ? 'min(100%, 225px)' : '100%' }}>
                {imageUrl ? (
                  <Image unoptimized src={imageUrl} alt="Current project image" fill sizes="400px" style={{ objectFit: 'contain' }} />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-sm text-[var(--text-muted)]">
                    Your {draft.kind === 'video' ? 'thumbnail' : 'still frame'}
                  </div>
                )}
                {draft.kind === 'shorts' && asset && guide && (
                  <>
                    <div className="absolute border-2 border-dashed border-emerald-500 pointer-events-none" style={{ left: `${guide.center.x}%`, top: `${guide.center.y}%`, width: `${guide.center.width}%`, height: `${guide.center.height}%` }} />
                    <div className="absolute border-2 border-amber-500 pointer-events-none" style={{ left: `${draft.box.x}%`, top: `${draft.box.y}%`, width: `${draft.box.width}%`, height: `${draft.box.height}%` }} />
                  </>
                )}
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold line-clamp-2 break-words text-[var(--text-ink)] leading-snug">
                  {draft.title || 'Your video title appears here'}
                </p>
                <p className="text-xs text-[var(--text-body)] break-words">
                  {draft.channel || 'Your channel'} • 48K views • 2 hours ago
                </p>
                {draft.title.length > 50 && draft.kind === 'video' && (
                  <p className="text-[10px] text-amber-600 dark:text-amber-400 font-medium">
                    ⚠️ Title is {draft.title.length} chars. Mobile feeds may truncate after ~50 chars.
                  </p>
                )}
              </div>
            </div>
          )}

          {asset && <MetricCard label={prepared ? 'Prepared image' : 'Selected original'} value={formatBytes(asset.file.size)} subtext={`${asset.width} × ${asset.height} · ${formatLabel(asset.format)}`} />}
          {asset && imageUrl && <a href={imageUrl} download={`${draft.kind === 'video' ? 'thumbnail' : 'shorts-frame'}.${asset.format === 'image/jpeg' ? 'jpg' : asset.format.split('/')[1]}`} className="inline-flex text-xs font-medium underline text-[var(--brand-accent-deep)] focus-ring rounded">Download current image</a>}
          {draft.kind === 'shorts' && source && !prepared && Math.abs(source.width / source.height / (9 / 16) - 1) >= .01 && <p className="text-xs text-[var(--state-warning-text)]">Prepare a 9:16 JPEG before using the planning overlay. The export guide fits the whole source frame with padding.</p>}
        </StudioSection>
        <StudioSection title="04. Pre-publish review">
          {/* Visual Readiness Progress Meter */}
          <div className="space-y-2 p-3.5 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-subtle)]">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-semibold text-[var(--text-ink)]">Readiness Score</span>
              <span className={completed === checks.length ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-[var(--brand-accent)] font-bold'}>
                {completed} / {checks.length} Checks Completed ({Math.round((completed / checks.length) * 100)}%)
              </span>
            </div>
            <div className="h-2 w-full rounded-full bg-[var(--bg-canvas-inset)] overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  completed === checks.length ? 'bg-emerald-500' : 'bg-[var(--brand-accent)]'
                }`}
                style={{ width: `${(completed / checks.length) * 100}%` }}
              />
            </div>
            <p className="text-[11px] text-[var(--text-muted)]">
              {completed === checks.length
                ? '✓ All checks completed. Verify final upload acceptance in YouTube Studio.'
                : 'Complete all automated checks and your manual confirmations below.'}
            </p>
          </div>

          <ul className="space-y-3 pt-2">{checks.filter(check => check.source === 'automatic').map(check => <li key={check.id} className="text-xs"><div className="font-medium" style={{ color: check.passed ? 'var(--state-success-text)' : 'var(--state-warning-text)' }}>{check.passed ? '✓' : '○'} {check.label} · {check.passed ? 'Checked' : 'Needs review'}</div><p className="mt-1 text-[var(--text-body)]">{check.detail}</p></li>)}</ul>
          <fieldset disabled={!!busy} className="space-y-3 border-t border-[var(--border-hairline)] pt-4"><legend className="text-xs font-semibold px-1">Your manual confirmations</legend>
            {studioConfirmations.map(item => <label key={item.id} className="flex gap-3 items-start text-xs leading-relaxed cursor-pointer"><input type="checkbox" className="mt-0.5 accent-[var(--brand-accent)] focus-ring" checked={draft.confirmations[item.id] === true} onChange={event => { setDraft(prev => ({ ...prev, confirmations: { ...prev.confirmations, [item.id]: event.target.checked } })); setDirty(true); setMessage('Manual confirmation updated. Save draft to keep your text; confirmations must be reviewed after loading.'); }} /><span>{item.label}</span></label>)}
          </fieldset>
          <p className="text-xs text-[var(--text-body)]">Editing the project clears manual confirmations. These checks do not verify platform policies, legal compliance, readability, or expected performance.</p>
          <div className="flex flex-wrap gap-2"><Button disabled={!!busy || (!draft.title.trim() && !asset)} onClick={downloadPackage}>Download project (.zip)</Button><Button variant="outline" disabled={!!busy || !draft.title.trim()} onClick={copyMetadata}>Copy metadata</Button></div>
          <p className="text-xs text-[var(--text-body)]">The ZIP contains metadata.txt, project.json, checks.txt, and the current image if present. Unfinished checks stay marked in the report. Files are prepared locally; nothing is published to YouTube.</p>
        </StudioSection>
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
      <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] p-4 text-xs text-[var(--text-body)] space-y-2">
        <h3 className="font-semibold text-[var(--text-ink)] flex items-center justify-between">
          <span>Local Browser Storage</span>
          <span className="text-[10px] font-mono text-[var(--text-muted)]">OFFLINE</span>
        </h3>
        <p className="leading-relaxed">Drafts and settings persist in your browser only. Media files stay in memory; re-select them after reloading.</p>
        {hasSaved && (
          <div className="pt-1">
            <Button variant="ghost" size="sm" disabled={!!busy} onClick={forgetDraft}>
              Delete saved draft
            </Button>
          </div>
        )}
      </div>

      <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] p-4 text-xs text-[var(--text-body)] space-y-2">
        <h3 className="font-semibold text-[var(--text-ink)] flex items-center justify-between">
          <span>Package Contents</span>
          <span className="text-[10px] font-mono text-[var(--text-muted)]">.ZIP</span>
        </h3>
        <p className="leading-relaxed">Export bundles project.json, metadata.txt, checks.txt, and your prepared image ready for upload.</p>
        <p className="pt-1">
          <Link href="/checklist" className="underline font-medium text-[var(--brand-accent)] focus-ring">
            Open pre-publish checklist &rarr;
          </Link>
        </p>
      </div>

      <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] p-4 text-xs text-[var(--text-body)] space-y-2">
        <h3 className="font-semibold text-[var(--text-ink)] flex items-center justify-between">
          <span>YouTube Guidelines</span>
          <span className="text-[10px] font-mono text-[var(--text-muted)]">SPECS</span>
        </h3>
        <p className="leading-relaxed">Verify platform upload standards before releasing your video to production.</p>
        <div className="pt-1 flex flex-col gap-1">
          <a href="https://support.google.com/youtube/answer/72431?hl=en" target="_blank" rel="noreferrer" className="underline text-[var(--brand-accent)] focus-ring">
            Thumbnail guidance &rarr;
          </a>
          <a href="https://support.google.com/youtube/answer/57407?hl=en" target="_blank" rel="noreferrer" className="underline text-[var(--brand-accent)] focus-ring">
            Upload guidance &rarr;
          </a>
        </div>
      </div>
    </div>
  </div>;
}
