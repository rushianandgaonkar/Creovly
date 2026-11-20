'use client';

import { useEffect, useRef, useState } from 'react';
import Input from '@/components/form/Input';
import Select from '@/components/form/Select';
import Slider from '@/components/form/Slider';
import DropZone from '@/components/form/DropZone';
import Alert from '@/components/feedback/Alert';
import Button from '@/components/ui/Button';
import ToolWorkspaceLayout from './ToolWorkspaceLayout';
import { BANNER, DESKTOP_AREA, SAFE_AREA, DEFAULT_DESIGN, drawBanner, type BannerAlign, type BannerDesign, type BannerFont } from '@/lib/banner-maker';
import { formatBytes } from '@/lib/thumbnail-size';

type View = 'tv' | 'desktop' | 'phone';
const VIEWS: Record<View, { label: string; width: number; height: number }> = {
  tv: { label: 'TV', width: BANNER.width, height: BANNER.height },
  desktop: { label: 'Desktop', width: DESKTOP_AREA.width, height: DESKTOP_AREA.height },
  phone: { label: 'Phone', width: SAFE_AREA.width, height: SAFE_AREA.height },
};
const FONTS = [
  { value: 'display', label: 'Bold display' },
  { value: 'sans', label: 'Clean sans' },
  { value: 'serif', label: 'Classic serif' },
  { value: 'mono', label: 'Monospace' },
];
const pct = (n: number) => `${n * 100}%`;

function Segmented<T extends string>({ label, options, value, onChange }: { label: string; options: { value: T; label: string }[]; value: T; onChange: (v: T) => void }) {
  return (
    <div role="group" aria-label={label} className="inline-flex rounded-full border border-[var(--border-hairline)] bg-[var(--bg-canvas-subtle)] p-1">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={value === option.value}
          onClick={() => onChange(option.value)}
          className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition duration-150 active:scale-[0.97] focus-ring ${value === option.value ? 'bg-[var(--bg-canvas-elevated)] text-[var(--text-ink)] shadow-[var(--shadow-whisper)]' : 'text-[var(--text-body)] hover:text-[var(--text-ink)]'}`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export default function BannerMaker() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [design, setDesign] = useState<BannerDesign>(DEFAULT_DESIGN);
  const [image, setImage] = useState<ImageBitmap>();
  const [families, setFamilies] = useState<Record<BannerFont, string>>();
  const [view, setView] = useState<View>('tv');
  const [guides, setGuides] = useState(true);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const set = <K extends keyof BannerDesign>(key: K, value: BannerDesign[K]) => { setStatus(''); setDesign((d) => ({ ...d, [key]: value })); };

  // Canvas text needs the real font names next/font generated, loaded before drawing.
  useEffect(() => {
    const css = getComputedStyle(document.body);
    const read = (name: string, fallback: string) => `${css.getPropertyValue(name).trim() || fallback}, ${fallback}`;
    const next: Record<BannerFont, string> = {
      display: read('--font-display', 'sans-serif'),
      sans: read('--font-geist-sans', 'sans-serif'),
      serif: 'Georgia, "Times New Roman", serif',
      mono: read('--font-geist-mono', 'monospace'),
    };
    Promise.all(Object.values(next).flatMap((family) => [document.fonts.load(`700 100px ${family}`), document.fonts.load(`500 50px ${family}`)]))
      .catch(() => undefined)
      .finally(() => setFamilies(next));
  }, []);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx || !families) return;
    drawBanner(ctx, design, families, image ? { source: image, width: image.width, height: image.height } : undefined);
  }, [design, families, image]);

  useEffect(() => () => image?.close(), [image]);

  const loadImage = async (file: File) => {
    setError(''); setStatus('');
    try { setImage(await createImageBitmap(file)); } catch { setError('This file could not be read as an image. Try a JPG or PNG.'); }
  };

  const download = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const toBlob = (type: string, quality?: number) => new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, type, quality));
    let blob = await toBlob('image/png');
    let ext = 'png';
    if (blob && blob.size > BANNER.maxBytes) { blob = await toBlob('image/jpeg', 0.92); ext = 'jpg'; }
    if (!blob) { setStatus('Export failed. Try again.'); return; }
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url; link.download = `youtube-banner-2560x1440.${ext}`; link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setStatus(`Downloaded ${ext.toUpperCase()}, ${formatBytes(blob.size)}${blob.size > BANNER.maxBytes ? '. Still over 6 MB: use a simpler photo.' : '.'}`);
  };

  const v = VIEWS[view];

  return (
    <ToolWorkspaceLayout
      workspace={
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input id="banner-title" label="Channel name" maxLength={60} value={design.title} onChange={(e) => set('title', e.target.value)} />
            <Input id="banner-tagline" label="Tagline" hint="Optional" maxLength={90} value={design.tagline} onChange={(e) => set('tagline', e.target.value)} />
            <Select id="banner-font" label="Font" options={FONTS} value={design.font} onChange={(e) => set('font', e.target.value as BannerFont)} />
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-medium text-[var(--text-ink)]">Text alignment</span>
              <Segmented<BannerAlign> label="Text alignment" value={design.align} onChange={(a) => set('align', a)} options={[{ value: 'left', label: 'Left' }, { value: 'center', label: 'Center' }, { value: 'right', label: 'Right' }]} />
            </div>
          </div>

          <div className="flex flex-wrap gap-6">
            {([['banner-bg', 'Background colour', 'background'], ['banner-fg', 'Text colour', 'textColor']] as const).map(([id, label, key]) => (
              <label key={id} htmlFor={id} className="flex items-center gap-3 text-sm text-[var(--text-ink)]">
                <input id={id} type="color" value={design[key]} onChange={(e) => set(key, e.target.value)} className="h-9 w-12 cursor-pointer rounded-md border border-[var(--border-control)] bg-[var(--bg-canvas-elevated)] p-1 focus-ring" />
                <span>{label}</span>
                <span className="font-mono text-xs text-[var(--text-muted)]">{design[key].toUpperCase()}</span>
              </label>
            ))}
          </div>

          <div className="space-y-3">
            <DropZone id="banner-photo" label="Background photo (optional)" accept="image/jpeg,image/png,image/webp" maxSizeMB={20} onFileSelect={loadImage} onError={setError} />
            {error && <Alert variant="error" title="Could not use this file">{error}</Alert>}
            {image && (
              <div className="space-y-3">
                <Slider id="banner-dim" label="Darken photo" min={0} max={70} step={5} unit="%" value={Math.round(design.dim * 100)} onChange={(n) => set('dim', n / 100)} />
                <Button type="button" variant="ghost" size="sm" onClick={() => { setImage(undefined); setStatus(''); }}>Remove photo</Button>
              </div>
            )}
          </div>
        </div>
      }
      results={
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Segmented<View> label="Preview device" value={view} onChange={setView} options={(Object.keys(VIEWS) as View[]).map((key) => ({ value: key, label: VIEWS[key].label }))} />
            <label className="flex items-center gap-2 text-sm text-[var(--text-body)]">
              <input type="checkbox" checked={guides} onChange={(e) => setGuides(e.target.checked)} className="h-4 w-4 accent-[var(--brand-accent)] focus-ring" />
              Safe area guide
            </label>
          </div>

          <div className="relative overflow-hidden rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-canvas-inset)]" style={{ aspectRatio: `${v.width}/${v.height}` }}>
            <canvas
              ref={canvasRef}
              width={BANNER.width}
              height={BANNER.height}
              role="img"
              aria-label={`Banner preview, ${v.label} view`}
              className="absolute max-w-none"
              style={{ width: pct(BANNER.width / v.width), left: pct(-(BANNER.width - v.width) / 2 / v.width), top: pct(-(BANNER.height - v.height) / 2 / v.height) }}
            />
            {guides && view !== 'phone' && (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute border-2 border-dashed border-[var(--brand-accent)]"
                style={{ width: pct(SAFE_AREA.width / v.width), height: pct(SAFE_AREA.height / v.height), left: pct((1 - SAFE_AREA.width / v.width) / 2), top: pct((1 - SAFE_AREA.height / v.height) / 2) }}
              />
            )}
          </div>
          <p className="text-xs text-[var(--text-body)] leading-relaxed">
            {view === 'tv' && `TV shows the full 2560 × 1440 image. The dashed box is the ${SAFE_AREA.width} × ${SAFE_AREA.height} area every device shows.`}
            {view === 'desktop' && 'Desktop shows a 2560 × 423 strip from the middle. Keep text inside the dashed box.'}
            {view === 'phone' && 'Phones show only the 1546 × 423 safe area. Everything here is visible on every device.'}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-[var(--border-hairline-subtle)]">
            <Button type="button" onClick={download} disabled={!families}>Download banner</Button>
            <p role="status" className="text-xs text-[var(--text-muted)]">{status || '2560 × 1440 PNG, or JPG if the PNG is over 6 MB.'}</p>
          </div>
        </div>
      }
    />
  );
}
