/* Hallmark · genre: modern-minimal · macrostructure: Workbench */
'use client';

import { useEffect, useRef, useState } from 'react';
import DropZone from '@/components/form/DropZone';
import Slider from '@/components/form/Slider';
import Button from '@/components/ui/Button';
import Alert from '@/components/feedback/Alert';
import ImagePreview, { useBlobUrl } from './ImagePreview';
import ToolWorkspaceLayout from './ToolWorkspaceLayout';
import { formatBytes } from '@/lib/image-compression';
import { readLogo, removeLogoBackground } from '@/lib/logo-background';
import { toolSamples } from '@/config/tool-samples';
import { useI18n } from '@/lib/i18n';

type Selected = { file: File; width: number; height: number };
type Result = Awaited<ReturnType<typeof removeLogoBackground>>;

export default function LogoBackgroundRemover() {
  const { t } = useI18n();
  const [selected, setSelected] = useState<Selected>();
  const [result, setResult] = useState<Result>();
  const [color, setColor] = useState('#ffffff');
  const [hexInput, setHexInput] = useState('#ffffff');
  const [tolerance, setTolerance] = useState(12);
  const [background, setBackground] = useState('checkerboard');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [fileKey, setFileKey] = useState(0);

  const generation = useRef(0);
  const controller = useRef<AbortController | null>(null);
  const errorRef = useRef<HTMLDivElement>(null);

  const originalUrl = useBlobUrl(selected?.file);
  const outputUrl = useBlobUrl(result?.blob);

  const quickColors = [
    { label: 'White', hex: '#ffffff' },
    { label: 'Black', hex: '#000000' },
    { label: 'Slate', hex: '#0f172a' },
    { label: 'Gray', hex: '#1e293b' },
    { label: 'Green', hex: '#00ff00' },
  ];

  useEffect(() => {
    const ctrl = controller;
    const gen = generation;
    return () => {
      gen.current++;
      ctrl.current?.abort();
    };
  }, []);

  useEffect(() => {
    if (error) errorRef.current?.focus();
  }, [error]);

  const clear = () => {
    generation.current++;
    controller.current?.abort();
    setResult(undefined);
    setError('');
    setBusy(false);
  };

  const handleColorChange = (newColor: string) => {
    clear();
    setColor(newColor);
    setHexInput(newColor);
  };

  const select = async (file: File) => {
    clear();
    setSelected(undefined);
    const id = generation.current;
    setBusy(true);
    try {
      const info = await readLogo(file);
      if (id === generation.current) {
        setSelected({ file, width: info.width, height: info.height });
        handleColorChange(info.color);
      }
    } catch (cause) {
      if (id === generation.current) {
        setError(cause instanceof Error ? cause.message : 'Could not open this image.');
      }
    } finally {
      if (id === generation.current) setBusy(false);
    }
  };

  const run = async () => {
    if (!selected || busy) return;
    clear();
    const id = generation.current;
    const abort = new AbortController();
    controller.current = abort;
    setBusy(true);
    try {
      const next = await removeLogoBackground(selected.file, color, tolerance, abort.signal);
      if (id === generation.current) setResult(next);
    } catch (cause) {
      if (id === generation.current && !abort.signal.aborted) {
        setError(cause instanceof Error ? cause.message : 'Background removal failed.');
      }
    } finally {
      if (id === generation.current) setBusy(false);
    }
  };

  const resetAll = () => {
    clear();
    setSelected(undefined);
    handleColorChange('#ffffff');
    setTolerance(12);
    setFileKey((key) => key + 1);
  };

  return (
    <ToolWorkspaceLayout
      workspace={
        <>
          <DropZone
            key={fileKey}
            id="logo-file"
            label={t.logoRemover.dropzoneLabel}
            maxSizeMB={20}
            privacyNote={t.common.dropzone.localPrivacyNote}
            disabled={busy}
            onFileSelect={select}
            onError={setError}
            samples={toolSamples['logo-background-remover']}
          />

          <div ref={errorRef} tabIndex={-1} className="focus-ring rounded-md">
            {error && (
              <Alert variant="error" title={t.compressor.errors.checkBatchOrSettings}>
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
                {selected.width} × {selected.height} px · {formatBytes(selected.file.size)}
              </span>
            </div>
          )}

          <fieldset disabled={busy} className="space-y-5 min-w-0">
            <legend className="sr-only">Background removal settings</legend>

            <div className="space-y-2.5">
              <label htmlFor="logo-color" className="block text-xs font-medium text-[var(--text-ink)]">
                {t.logoRemover.selectColorHeading}
              </label>
              <div className="flex items-center gap-2.5">
                <input
                  id="logo-color"
                  type="color"
                  value={color}
                  onChange={(e) => handleColorChange(e.target.value)}
                  className="h-10 w-14 cursor-pointer rounded-lg border border-[var(--border-hairline)] p-0.5 bg-[var(--bg-canvas-elevated)] focus-ring shrink-0"
                />
                <input
                  id="logo-hex-input"
                  type="text"
                  value={hexInput}
                  onChange={(e) => {
                    const val = e.target.value;
                    setHexInput(val);
                    if (/^#[0-9A-Fa-f]{6}$/.test(val)) {
                      clear();
                      setColor(val);
                    }
                  }}
                  onBlur={() => {
                    if (/^#[0-9A-Fa-f]{6}$/.test(hexInput)) {
                      setColor(hexInput);
                    } else {
                      setHexInput(color);
                    }
                  }}
                  placeholder="#ffffff"
                  className="h-10 w-24 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] px-2.5 font-mono text-xs text-[var(--text-ink)] focus-ring uppercase"
                />
                <div className="flex items-center gap-1 overflow-x-auto">
                  {quickColors.map((item) => (
                    <button
                      key={item.hex}
                      type="button"
                      onClick={() => handleColorChange(item.hex)}
                      className={`px-2 py-1.5 rounded-md text-[10px] font-mono border transition-all cursor-pointer ${
                        color.toLowerCase() === item.hex.toLowerCase()
                          ? 'border-[var(--brand-accent)] bg-[var(--brand-accent-soft)] text-[var(--brand-accent-deep)] font-semibold'
                          : 'border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] text-[var(--text-body)] hover:border-[var(--brand-accent)]'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
              <p className="text-xs text-[var(--text-muted)]">
                {t.logoRemover.dropzoneHint}
              </p>
            </div>

            <Slider
              id="logo-tolerance"
              label={t.logoRemover.toleranceLabel}
              value={tolerance}
              unit="%"
              onChange={(value) => {
                clear();
                setTolerance(value);
              }}
            />
            <p className="text-xs text-[var(--text-body)] leading-relaxed">
              {t.logoRemover.toleranceHint}
            </p>
          </fieldset>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[var(--border-hairline-subtle)]">
            <Button variant="outline" size="sm" onClick={resetAll} disabled={busy}>
              {t.logoRemover.buttonReset}
            </Button>
            <Button onClick={run} disabled={!selected || busy}>
              {busy ? t.logoRemover.buttonProcessing : t.logoRemover.buttonProcess}
            </Button>
          </div>

          <p className="text-xs text-[var(--text-muted)]">
            {t.logoRemover.noticePreserved}
          </p>
        </>
      }
      results={
        <div className="space-y-5" aria-busy={busy}>
          <div>
            <h3 className="text-sm font-semibold text-[var(--text-ink)]">
              {t.logoRemover.resultsHeading}
            </h3>
            <p role="status" className="mt-1 text-xs text-[var(--text-body)]">
              {busy
                ? t.logoRemover.buttonProcessing
                : result
                ? `${result.removed.toLocaleString()} pixels converted`
                : t.logoRemover.resultsPrompt}
            </p>
          </div>

          {originalUrl && selected && (
            <ImagePreview
              url={originalUrl}
              title={t.logoRemover.originalLabel}
              width={selected.width}
              height={selected.height}
            />
          )}

          {outputUrl && result && (
            <>
              <div>
                <label
                  htmlFor="logo-preview-background"
                  className="block text-xs font-medium text-[var(--text-ink)] mb-2"
                >
                  {t.logoRemover.previewBackgroundHeading}
                </label>
                <select
                  id="logo-preview-background"
                  value={background}
                  onChange={(e) => setBackground(e.target.value)}
                  className="w-full rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] p-2.5 text-xs font-mono focus-ring"
                >
                  <option value="checkerboard">{t.logoRemover.backdropChecker}</option>
                  <option value="white">{t.logoRemover.backdropWhite}</option>
                  <option value="black">{t.logoRemover.backdropDark}</option>
                </select>
              </div>

              <ImagePreview
                url={outputUrl}
                title={t.logoRemover.transparentLabel}
                width={result.width}
                height={result.height}
                transparencyGrid={background === 'checkerboard'}
                frame={
                  background === 'checkerboard'
                    ? undefined
                    : {
                        width: result.width,
                        height: result.height,
                        fit: 'contain',
                        x: 50,
                        y: 50,
                        background,
                      }
                }
              />

              <div className="flex items-center justify-between p-3 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-subtle)] text-xs font-mono">
                <span className="text-[var(--text-ink)]">PNG Alpha</span>
                <span className="text-[var(--text-muted)]">
                  {result.width} × {result.height} px · {formatBytes(result.blob.size)}
                </span>
              </div>

              <Button
                className="w-full"
                onClick={() => {
                  const anchor = document.createElement('a');
                  anchor.href = outputUrl;
                  anchor.download = `${
                    selected?.file.name
                      .replace(/\.[^.]+$/, '')
                      .replace(/[^\p{L}\p{N}_-]/gu, '-')
                      .slice(0, 80) || 'logo'
                  }-transparent.png`;
                  anchor.click();
                }}
              >
                <svg
                  className="w-4 h-4 mr-2"
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
                {t.logoRemover.buttonDownload}
              </Button>
            </>
          )}
        </div>
      }
    />
  );
}
