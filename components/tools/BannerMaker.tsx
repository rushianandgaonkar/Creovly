'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Input from '@/components/form/Input';
import Select from '@/components/form/Select';
import Slider from '@/components/form/Slider';
import DropZone from '@/components/form/DropZone';
import Alert from '@/components/feedback/Alert';
import Button from '@/components/ui/Button';
import ToolWorkspaceLayout from './ToolWorkspaceLayout';
import {
  BANNER,
  DESKTOP_AREA,
  SAFE_AREA,
  DEFAULT_DESIGN,
  drawBanner,
  type BannerAlign,
  type BannerDesign,
  type BannerFont,
} from '@/lib/banner-maker';
import { formatBytes } from '@/lib/thumbnail-size';
import { useI18n } from '@/lib/i18n';

type View = 'tv' | 'desktop' | 'phone';
const VIEWS: Record<View, { width: number; height: number }> = {
  tv: { width: BANNER.width, height: BANNER.height },
  desktop: { width: DESKTOP_AREA.width, height: DESKTOP_AREA.height },
  phone: { width: SAFE_AREA.width, height: SAFE_AREA.height },
};

const pct = (n: number) => `${n * 100}%`;

function Segmented<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div
      role="group"
      aria-label={label}
      className="inline-flex rounded-full border border-[var(--border-hairline)] bg-[var(--bg-canvas-subtle)] p-1"
    >
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={value === option.value}
          onClick={() => onChange(option.value)}
          className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition duration-150 active:scale-[0.97] focus-ring ${
            value === option.value
              ? 'bg-[var(--bg-canvas-elevated)] text-[var(--text-ink)] shadow-[var(--shadow-whisper)]'
              : 'text-[var(--text-body)] hover:text-[var(--text-ink)]'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export default function BannerMaker() {
  const { t } = useI18n();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [design, setDesign] = useState<BannerDesign>(() => ({
    ...DEFAULT_DESIGN,
    title: t.bannerMaker.defaultTitle,
    tagline: t.bannerMaker.defaultTagline,
  }));
  const [image, setImage] = useState<ImageBitmap>();
  const [families, setFamilies] = useState<Record<BannerFont, string>>();
  const [view, setView] = useState<View>('tv');
  const [guides, setGuides] = useState(true);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const set = <K extends keyof BannerDesign>(key: K, value: BannerDesign[K]) => {
    setStatus('');
    setDesign((d) => ({ ...d, [key]: value }));
  };

  const fonts = useMemo(
    () => [
      { value: 'display', label: t.bannerMaker.fontDisplay },
      { value: 'sans', label: t.bannerMaker.fontSans },
      { value: 'serif', label: t.bannerMaker.fontSerif },
      { value: 'mono', label: t.bannerMaker.fontMono },
    ],
    [t]
  );

  const viewOptions = useMemo(
    () => [
      { value: 'tv' as View, label: t.bannerMaker.viewTv },
      { value: 'desktop' as View, label: t.bannerMaker.viewDesktop },
      { value: 'phone' as View, label: t.bannerMaker.viewPhone },
    ],
    [t]
  );

  const alignOptions = useMemo(
    () => [
      { value: 'left' as BannerAlign, label: t.bannerMaker.alignLeft },
      { value: 'center' as BannerAlign, label: t.bannerMaker.alignCenter },
      { value: 'right' as BannerAlign, label: t.bannerMaker.alignRight },
    ],
    [t]
  );

  // Canvas text needs the real font names next/font generated, loaded before drawing.
  useEffect(() => {
    const css = getComputedStyle(document.body);
    const read = (name: string, fallback: string) =>
      `${css.getPropertyValue(name).trim() || fallback}, ${fallback}`;
    const next: Record<BannerFont, string> = {
      display: read('--font-display', 'sans-serif'),
      sans: read('--font-geist-sans', 'sans-serif'),
      serif: 'Georgia, "Times New Roman", serif',
      mono: read('--font-geist-mono', 'monospace'),
    };
    Promise.all(
      Object.values(next).flatMap((family) => [
        document.fonts.load(`700 100px ${family}`),
        document.fonts.load(`500 50px ${family}`),
      ])
    )
      .catch(() => undefined)
      .finally(() => setFamilies(next));
  }, []);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx || !families) return;
    drawBanner(
      ctx,
      design,
      families,
      image ? { source: image, width: image.width, height: image.height } : undefined
    );
  }, [design, families, image]);

  useEffect(() => () => image?.close(), [image]);

  const loadImage = async (file: File) => {
    setError('');
    setStatus('');
    try {
      setImage(await createImageBitmap(file));
    } catch {
      setError(t.bannerMaker.photoErrorBody);
    }
  };

  const download = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const toBlob = (type: string, quality?: number) =>
      new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, type, quality));
    let blob = await toBlob('image/png');
    let ext = 'png';
    if (blob && blob.size > BANNER.maxBytes) {
      blob = await toBlob('image/jpeg', 0.92);
      ext = 'jpg';
    }
    if (!blob) {
      setStatus(t.bannerMaker.downloadFailed);
      return;
    }
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `youtube-banner-2560x1440.${ext}`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    const sizeStr = formatBytes(blob.size);
    const extStr = ext.toUpperCase();
    const msg =
      blob.size > BANNER.maxBytes
        ? t.bannerMaker.downloadStillOver.replace('{ext}', extStr).replace('{size}', sizeStr)
        : t.bannerMaker.downloadSuccess.replace('{ext}', extStr).replace('{size}', sizeStr);
    setStatus(msg);
  };

  const v = VIEWS[view];
  const activeViewLabel = viewOptions.find((opt) => opt.value === view)?.label ?? view;

  return (
    <ToolWorkspaceLayout
      workspace={
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              id="banner-title"
              label={t.bannerMaker.titleLabel}
              maxLength={60}
              value={design.title}
              onChange={(e) => set('title', e.target.value)}
            />
            <Input
              id="banner-tagline"
              label={t.bannerMaker.taglineLabel}
              hint={t.bannerMaker.taglineHint}
              maxLength={90}
              value={design.tagline}
              onChange={(e) => set('tagline', e.target.value)}
            />
            <Select
              id="banner-font"
              label={t.bannerMaker.fontLabel}
              options={fonts}
              value={design.font}
              onChange={(e) => set('font', e.target.value as BannerFont)}
            />
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-medium text-[var(--text-ink)]">
                {t.bannerMaker.alignLabel}
              </span>
              <Segmented<BannerAlign>
                label={t.bannerMaker.alignLabel}
                value={design.align}
                onChange={(a) => set('align', a)}
                options={alignOptions}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-6">
            {(
              [
                ['banner-bg', t.bannerMaker.bgColour, 'background'],
                ['banner-fg', t.bannerMaker.textColour, 'textColor'],
              ] as const
            ).map(([id, label, key]) => (
              <label
                key={id}
                htmlFor={id}
                className="flex items-center gap-3 text-sm text-[var(--text-ink)]"
              >
                <input
                  id={id}
                  type="color"
                  value={design[key]}
                  onChange={(e) => set(key, e.target.value)}
                  className="h-9 w-12 cursor-pointer rounded-md border border-[var(--border-control)] bg-[var(--bg-canvas-elevated)] p-1 focus-ring"
                />
                <span>{label}</span>
                <span className="font-mono text-xs text-[var(--text-muted)]">
                  {design[key].toUpperCase()}
                </span>
              </label>
            ))}
          </div>

          <div className="space-y-3">
            <DropZone
              id="banner-photo"
              label={t.bannerMaker.photoLabel}
              accept="image/jpeg,image/png,image/webp"
              maxSizeMB={20}
              onFileSelect={loadImage}
              onError={setError}
            />
            {error && <Alert variant="error" title={t.bannerMaker.photoErrorTitle}>{error}</Alert>}
            {image && (
              <div className="space-y-3">
                <Slider
                  id="banner-dim"
                  label={t.bannerMaker.dimLabel}
                  min={0}
                  max={70}
                  step={5}
                  unit="%"
                  value={Math.round(design.dim * 100)}
                  onChange={(n) => set('dim', n / 100)}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setImage(undefined);
                    setStatus('');
                  }}
                >
                  {t.bannerMaker.removePhoto}
                </Button>
              </div>
            )}
          </div>
        </div>
      }
      results={
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Segmented<View>
              label={t.bannerMaker.previewDevice}
              value={view}
              onChange={setView}
              options={viewOptions}
            />
            <label className="flex items-center gap-2 text-sm text-[var(--text-body)]">
              <input
                type="checkbox"
                checked={guides}
                onChange={(e) => setGuides(e.target.checked)}
                className="h-4 w-4 accent-[var(--brand-accent)] focus-ring"
              />
              {t.bannerMaker.safeAreaGuide}
            </label>
          </div>

          <div
            className="relative overflow-hidden rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-canvas-inset)]"
            style={{ aspectRatio: `${v.width}/${v.height}` }}
          >
            <canvas
              ref={canvasRef}
              width={BANNER.width}
              height={BANNER.height}
              role="img"
              aria-label={t.bannerMaker.previewAria.replace('{view}', activeViewLabel)}
              className="absolute max-w-none"
              style={{
                width: pct(BANNER.width / v.width),
                left: pct(-(BANNER.width - v.width) / 2 / v.width),
                top: pct(-(BANNER.height - v.height) / 2 / v.height),
              }}
            />
            {guides && view !== 'phone' && (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute border-2 border-dashed border-[var(--brand-accent)]"
                style={{
                  width: pct(SAFE_AREA.width / v.width),
                  height: pct(SAFE_AREA.height / v.height),
                  left: pct((1 - SAFE_AREA.width / v.width) / 2),
                  top: pct((1 - SAFE_AREA.height / v.height) / 2),
                }}
              />
            )}
          </div>
          <p className="text-xs text-[var(--text-body)] leading-relaxed">
            {view === 'tv' && t.bannerMaker.noteTv}
            {view === 'desktop' && t.bannerMaker.noteDesktop}
            {view === 'phone' && t.bannerMaker.notePhone}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-[var(--border-hairline-subtle)]">
            <Button type="button" onClick={download} disabled={!families}>
              {t.bannerMaker.downloadButton}
            </Button>
            <p role="status" className="text-xs text-[var(--text-muted)]">
              {status || t.bannerMaker.downloadDefaultStatus}
            </p>
          </div>
        </div>
      }
    />
  );
}
