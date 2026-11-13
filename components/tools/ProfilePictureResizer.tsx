'use client';

import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from 'react';
import DropZone from '@/components/form/DropZone';
import Select from '@/components/form/Select';
import Slider from '@/components/form/Slider';
import Button from '@/components/ui/Button';
import Alert from '@/components/feedback/Alert';
import MetricCard from '@/components/results/MetricCard';
import ToolWorkspaceLayout from './ToolWorkspaceLayout';
import { useBlobUrl } from './ImagePreview';
import { toolSamples } from '@/config/tool-samples';
import { formatBytes, formatLabel } from '@/lib/image-compression';
import { resizeGeometry } from '@/lib/image-resize';
import { exportProfilePicture, inspectProfileImage, PROFILE_SIZE, ProfileError, type ProfileFormat } from '@/lib/profile-picture';
import { useI18n, LocalizedLink } from '@/lib/i18n';
import { fillTemplate } from '@/lib/utils';

interface Source { file: File; preview: Blob; width: number; height: number; frames: number }
type Geometry = ReturnType<typeof resizeGeometry>;

const crop0 = { x: 50, y: 50, zoom: 1 };
// Preview sizes in CSS px, matching where YouTube shows the channel icon.
const SIZES = { channel: 160, watch: 40, comments: 48 };

const clamp = (value: number) => Math.min(100, Math.max(0, value));
const imageStyle = (g: Geometry): CSSProperties => ({ left: `${g.left}%`, top: `${g.top}%`, width: `${g.drawWidth}%`, height: `${g.drawHeight}%` });

function Avatar({ url, g, fill, size }: { url: string; g: Geometry; fill: string | null; size: number }) {
  return (
    <span className="relative block shrink-0 overflow-hidden rounded-full" style={{ width: size, height: size, background: fill ?? undefined }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={url} alt="" draggable={false} className="absolute max-w-none select-none" style={imageStyle(g)} />
    </span>
  );
}

async function firstFrame(file: File): Promise<Blob> {
  const bitmap = await createImageBitmap(file);
  const canvas = document.createElement('canvas');
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  canvas.getContext('2d')?.drawImage(bitmap, 0, 0);
  bitmap.close();
  return new Promise((resolve, reject) => canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new ProfileError('open'))), 'image/png'));
}

export default function ProfilePictureResizer() {
  const { t } = useI18n();
  const p = t.profilePicture;
  const [source, setSource] = useState<Source>();
  const [crop, setCrop] = useState(crop0);
  const [fillOn, setFillOn] = useState(false);
  const [fillColor, setFillColor] = useState('#ffffff');
  const [format, setFormat] = useState<ProfileFormat>('image/png');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [result, setResult] = useState<Awaited<ReturnType<typeof exportProfilePicture>>>();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [fileKey, setFileKey] = useState(0);
  const drag = useRef<{ id: number; px: number; py: number; x: number; y: number } | undefined>(undefined);
  const generation = useRef(0);

  const previewUrl = useBlobUrl(source?.preview);
  const outputUrl = useBlobUrl(result?.blob);
  const fill = fillOn ? fillColor : format === 'image/jpeg' ? '#ffffff' : null;
  const g = source ? resizeGeometry(source.width, source.height, 100, 100, 'cover', crop.x, crop.y, crop.zoom) : undefined;
  const exportScale = source ? resizeGeometry(source.width, source.height, PROFILE_SIZE, PROFILE_SIZE, 'cover', crop.x, crop.y, crop.zoom).scale : 1;

  useEffect(() => () => { generation.current++; }, []);

  const describe = (cause: unknown) => {
    if (cause instanceof ProfileError) {
      return { unsupported: p.errorUnsupported, tooLarge: p.errorTooLarge, open: p.errorOpen, export: p.errorExport }[cause.code];
    }
    return cause instanceof Error ? cause.message : p.errorOpen;
  };

  const change = (next: () => void) => {
    setResult(undefined);
    setError('');
    next();
  };

  const selectFile = async (file: File) => {
    const id = ++generation.current;
    change(() => setSource(undefined));
    setCrop(crop0);
    try {
      const info = await inspectProfileImage(file);
      const preview = info.frames > 1 ? await firstFrame(file) : file;
      if (id === generation.current) setSource({ file, preview, ...info });
    } catch (cause) {
      if (id === generation.current) setError(describe(cause));
    }
  };

  const reset = () => {
    generation.current++;
    change(() => setSource(undefined));
    setCrop(crop0);
    setFillOn(false);
    setFormat('image/png');
    setFileKey((key) => key + 1);
  };

  // Converts a pointer or key movement (in % of the crop box) into crop travel, so dragging right moves the image right.
  const pan = (from: { x: number; y: number }, dx: number, dy: number) => {
    if (!g) return;
    const travelX = 100 - g.drawWidth;
    const travelY = 100 - g.drawHeight;
    change(() => setCrop((current) => ({ ...current, x: travelX ? clamp(from.x + (dx / travelX) * 100) : 50, y: travelY ? clamp(from.y + (dy / travelY) * 100) : 50 })));
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = { id: event.pointerId, px: event.clientX, py: event.clientY, x: crop.x, y: crop.y };
  };
  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (drag.current?.id !== event.pointerId) return;
    const box = event.currentTarget.getBoundingClientRect();
    pan(drag.current, ((event.clientX - drag.current.px) / box.width) * 100, ((event.clientY - drag.current.py) / box.height) * 100);
  };
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = event.shiftKey ? 10 : 2;
    const move = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] }[event.key];
    if (!move) return;
    event.preventDefault();
    pan(crop, move[0], move[1]);
  };

  const run = async () => {
    if (!source || busy) return;
    const id = generation.current;
    setBusy(true);
    setError('');
    try {
      const output = await exportProfilePicture(source.file, crop, format, fill);
      if (id === generation.current) setResult(output);
    } catch (cause) {
      if (id === generation.current) setError(describe(cause));
    } finally {
      if (id === generation.current) setBusy(false);
    }
  };

  const specs = [
    [p.specRecommended, p.specRecommendedValue],
    [p.specMinimum, p.specMinimumValue],
    [p.specMaxFile, p.specMaxFileValue],
    [p.specFormats, p.specFormatsValue],
    [p.specDisplay, p.specDisplayValue],
  ];
  const dark = theme === 'dark';
  const frame = dark ? 'bg-[#0f0f0f] text-[#f1f1f1]' : 'bg-white text-[#0f0f0f]';
  const muted = dark ? 'bg-[#3f3f3f]' : 'bg-[#e5e5e5]';
  const fileBase = source?.file.name.replace(/\.[^.]+$/, '').replace(/[^\p{L}\p{N}_-]/gu, '-').slice(0, 60) || 'profile-picture';

  return (
    <>
      <section aria-labelledby="pfp-spec-heading" className="mb-6 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-subtle)] p-4 sm:p-5">
        <h2 id="pfp-spec-heading" className="text-base font-bold text-[var(--text-ink)] mb-3">{p.specHeading}</h2>
        <table className="w-full text-sm">
          <tbody className="divide-y divide-[var(--border-hairline)]">
            {specs.map(([label, value]) => (
              <tr key={label}>
                <th scope="row" className="py-1.5 pr-4 text-left font-normal text-[var(--text-muted)] whitespace-nowrap">{label}</th>
                <td className="py-1.5 font-semibold text-[var(--text-ink)]">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-2 text-[11px] text-[var(--text-muted)]">{p.specNote}</p>
      </section>

      <ToolWorkspaceLayout
        workspace={
          <>
            <DropZone
              key={fileKey}
              id="pfp-file"
              label={p.dropzoneLabel}
              accept="image/jpeg,image/png,image/webp,image/gif,image/bmp"
              maxSizeMB={20}
              privacyNote={p.dropzoneHint}
              disabled={busy}
              onFileSelect={selectFile}
              onError={setError}
              samples={toolSamples['youtube-profile-picture-resizer']}
            />

            {error && <Alert variant="error" title={p.errorTitle}>{error}</Alert>}

            {source && g && previewUrl && (
              <>
                <div className="space-y-3">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-sm font-semibold text-[var(--text-ink)]">{p.cropHeading}</h3>
                    <span className="text-xs font-mono text-[var(--text-muted)]">{source.width} × {source.height} px</span>
                  </div>
                  <div
                    role="group"
                    tabIndex={0}
                    aria-label={p.cropAria}
                    aria-describedby="pfp-crop-help"
                    onPointerDown={onPointerDown}
                    onPointerMove={onPointerMove}
                    onPointerUp={() => { drag.current = undefined; }}
                    onPointerCancel={() => { drag.current = undefined; }}
                    onKeyDown={onKeyDown}
                    className="relative mx-auto aspect-square w-full max-w-[360px] cursor-grab touch-none select-none overflow-hidden rounded-lg border border-[var(--border-hairline)] focus-ring active:cursor-grabbing"
                    style={{ background: fill ?? 'repeating-conic-gradient(#d4d4d4 0 25%, #ffffff 0 50%) 0 0 / 16px 16px' }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={previewUrl} alt="" draggable={false} className="pointer-events-none absolute max-w-none" style={imageStyle(g)} />
                    <span aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(circle closest-side, transparent 99.5%, rgba(0,0,0,0.55) 100%)' }} />
                    <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-full border-2 border-white/90" />
                  </div>
                  <p id="pfp-crop-help" className="text-xs text-[var(--text-body)]">{p.cropHelp}</p>
                  <Slider id="pfp-zoom" label={p.zoom} min={100} max={400} unit="%" value={Math.round(crop.zoom * 100)} onChange={(value) => change(() => setCrop((current) => ({ ...current, zoom: value / 100 })))} />
                </div>

                {source.frames > 1 && <Alert variant="info">{p.warnAnimated}</Alert>}
                {exportScale > 1 && (
                  <Alert variant="warning">{fillTemplate(p.warnBlurry, { size: Math.round(PROFILE_SIZE / exportScale) })}</Alert>
                )}

                <div className="space-y-3 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-subtle)] p-4">
                  <label className="flex items-center gap-2 text-sm text-[var(--text-ink)]">
                    <input type="checkbox" checked={fillOn} onChange={(event) => change(() => setFillOn(event.target.checked))} className="focus-ring" />
                    {p.fillToggle}
                  </label>
                  {fillOn && (
                    <label className="flex items-center gap-3 text-xs font-medium text-[var(--text-ink)]">
                      <input type="color" value={fillColor} onChange={(event) => change(() => setFillColor(event.target.value))} className="h-9 w-12 cursor-pointer rounded border border-[var(--border-control)] focus-ring" />
                      {p.fillColor} <span className="font-mono text-[var(--text-muted)]">{fillColor}</span>
                    </label>
                  )}
                  <p className="text-xs text-[var(--text-body)]">
                    {p.fillTip}{' '}
                    <LocalizedLink href="/tools/logo-background-remover" className="font-medium text-[var(--brand-accent)] underline hover:no-underline">{p.fillLink}</LocalizedLink>
                  </p>
                </div>

                <Select
                  id="pfp-format"
                  label={p.formatLabel}
                  value={format}
                  onChange={(event) => change(() => setFormat(event.target.value as ProfileFormat))}
                  options={[{ value: 'image/png', label: 'PNG' }, { value: 'image/jpeg', label: 'JPG' }]}
                />
                {format === 'image/jpeg' && <p className="-mt-4 text-xs text-[var(--text-body)]">{p.jpgNote}</p>}
              </>
            )}

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border-hairline-subtle)] pt-4">
              <Button variant="outline" size="sm" onClick={reset}>{p.reset}</Button>
              <Button disabled={!source || busy} onClick={run}>{busy ? p.exporting : p.exportButton}</Button>
            </div>
          </>
        }
        results={
          <>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-base font-semibold text-[var(--text-ink)]">{p.previewHeading}</h3>
              <div className="inline-flex rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-canvas-subtle)] p-0.5">
                {(['light', 'dark'] as const).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    aria-pressed={theme === mode}
                    onClick={() => setTheme(mode)}
                    className={`rounded-md px-2.5 py-1 text-xs font-medium focus-ring ${theme === mode ? 'bg-[var(--bg-canvas-elevated)] text-[var(--text-ink)] shadow-xs' : 'text-[var(--text-muted)]'}`}
                  >
                    {mode === 'light' ? p.previewLight : p.previewDark}
                  </button>
                ))}
              </div>
            </div>

            {!source || !g || !previewUrl ? (
              <p className="text-sm text-[var(--text-body)]">{p.previewEmpty}</p>
            ) : (
              <div className={`space-y-5 rounded-xl border border-[var(--border-hairline)] p-4 ${frame}`}>
                <figure className="space-y-2">
                  <figcaption className="text-[11px] opacity-70">{fillTemplate(p.previewChannel, { size: SIZES.channel })}</figcaption>
                  <div className="flex items-center gap-4">
                    <Avatar url={previewUrl} g={g} fill={fill} size={SIZES.channel} />
                    <div className="min-w-0 space-y-2">
                      <p className="truncate text-lg font-bold">{p.previewName}</p>
                      <span className={`block h-2 w-24 rounded ${muted}`} />
                    </div>
                  </div>
                </figure>
                <figure className="space-y-2">
                  <figcaption className="text-[11px] opacity-70">{fillTemplate(p.previewWatch, { size: SIZES.watch })}</figcaption>
                  <div className="flex items-center gap-3">
                    <Avatar url={previewUrl} g={g} fill={fill} size={SIZES.watch} />
                    <div className="min-w-0 space-y-1.5">
                      <p className="truncate text-sm font-semibold">{p.previewName}</p>
                      <span className={`block h-1.5 w-16 rounded ${muted}`} />
                    </div>
                  </div>
                </figure>
                <figure className="space-y-2">
                  <figcaption className="text-[11px] opacity-70">{fillTemplate(p.previewComments, { size: SIZES.comments })}</figcaption>
                  <div className="flex items-start gap-3">
                    <Avatar url={previewUrl} g={g} fill={fill} size={SIZES.comments} />
                    <div className="min-w-0">
                      <p className="text-xs font-semibold">@{p.previewName.replace(/\s+/g, '').toLowerCase()}</p>
                      <p className="text-sm">{p.previewComment}</p>
                    </div>
                  </div>
                </figure>
              </div>
            )}

            {result && outputUrl && (
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-[var(--text-ink)]">{p.resultHeading}</h3>
                <div className="grid grid-cols-2 gap-3">
                  <MetricCard label={p.resultDimensions} value={`${PROFILE_SIZE} × ${PROFILE_SIZE}`} />
                  <MetricCard label={p.resultSize} value={formatBytes(result.blob.size)} subtext={formatLabel(result.blob.type)} />
                </div>
                {result.quality !== null && result.quality < 0.92 && (
                  <Alert variant="info">{fillTemplate(p.qualityReduced, { quality: Math.round(result.quality * 100) })}</Alert>
                )}
                <a
                  href={outputUrl}
                  download={`${fileBase}-800x800.${format === 'image/png' ? 'png' : 'jpg'}`}
                  className="inline-flex w-full items-center justify-center rounded-xl bg-[var(--brand-primary)] px-4 py-3 text-sm font-semibold text-[var(--brand-on-primary)] hover:opacity-90 focus-ring"
                >
                  {fillTemplate(p.download, { format: format === 'image/png' ? 'PNG' : 'JPG' })}
                </a>
              </div>
            )}
          </>
        }
      />
    </>
  );
}
