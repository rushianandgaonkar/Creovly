'use client';

import { useState } from 'react';
import DropZone from '@/components/form/DropZone';
import Alert from '@/components/feedback/Alert';
import { LocalizedLink } from '@/lib/i18n';
import ToolWorkspaceLayout from './ToolWorkspaceLayout';
import { useBlobUrl } from './ImagePreview';
import { THUMBNAIL_SPECS, checkThumbnail, describeRatio, formatBytes, type CheckLevel, type ThumbnailMode } from '@/lib/thumbnail-size';

interface Inspected { file: File; width: number; height: number }

const levelStyle: Record<CheckLevel, { text: string; icon: string; word: string }> = {
  pass: { text: 'text-[var(--state-success-text)]', icon: 'M5 13l4 4L19 7', word: 'Pass' },
  info: { text: 'text-[var(--state-info-text)]', icon: 'M12 8h.01M11 12h1v4h1', word: 'Note' },
  warn: { text: 'text-[var(--state-warning-text)]', icon: 'M12 9v4m0 4h.01', word: 'Check' },
  fail: { text: 'text-[var(--state-error-text)]', icon: 'M6 18L18 6M6 6l12 12', word: 'Fix' },
};

const formatName = (type: string) => ({ 'image/jpeg': 'JPG', 'image/png': 'PNG', 'image/webp': 'WebP', 'image/gif': 'GIF' }[type] ?? (type || 'Unknown'));

export default function ThumbnailSizeChecker() {
  const [mode, setMode] = useState<ThumbnailMode>('video');
  const [image, setImage] = useState<Inspected>();
  const [error, setError] = useState('');
  const url = useBlobUrl(image?.file);
  const spec = THUMBNAIL_SPECS[mode];

  const inspect = async (file: File) => {
    setError('');
    try {
      const bitmap = await createImageBitmap(file);
      setImage({ file, width: bitmap.width, height: bitmap.height });
      bitmap.close();
    } catch {
      setImage(undefined);
      setError('This file could not be read as an image. Try a JPG or PNG.');
    }
  };

  const checks = image ? checkThumbnail({ width: image.width, height: image.height, bytes: image.file.size, type: image.file.type }, mode) : [];
  const needsResize = checks.some((check) => (check.id === 'ratio' || check.id === 'minimum') && check.level !== 'pass');
  const needsCompress = checks.some((check) => check.id === 'size' && check.level !== 'pass');

  const specRows: [string, string][] = [
    ['Recommended size', `${spec.width} × ${spec.height} px`],
    ['Minimum', `${THUMBNAIL_SPECS.minPixels} px ${spec.minSide}`],
    ['Aspect ratio', spec.ratio],
    ['Max file size', '2 MB mobile, 50 MB desktop'],
    ['Formats', 'JPG or PNG'],
  ];

  return (
    <ToolWorkspaceLayout
      workspace={
        <div className="space-y-6">
          <div role="group" aria-label="Thumbnail type" className="inline-flex rounded-full border border-[var(--border-hairline)] bg-[var(--bg-canvas-subtle)] p-1">
            {(['video', 'shorts'] as const).map((value) => (
              <button
                key={value}
                type="button"
                aria-pressed={mode === value}
                onClick={() => setMode(value)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition duration-150 active:scale-[0.97] focus-ring ${mode === value ? 'bg-[var(--bg-canvas-elevated)] text-[var(--text-ink)] shadow-[var(--shadow-whisper)]' : 'text-[var(--text-body)] hover:text-[var(--text-ink)]'}`}
              >
                {value === 'video' ? 'Video' : 'Shorts'}
              </button>
            ))}
          </div>

          <SpecList rows={specRows} />

          <DropZone
            id="thumbnail-size-file"
            label="Check your thumbnail"
            accept="image/jpeg,image/png,image/webp,image/gif"
            maxSizeMB={50}
            onFileSelect={inspect}
            onError={setError}
          />
          {error && <Alert variant="error" title="Could not check this file">{error}</Alert>}
        </div>
      }
      results={
        image ? (
          <div className="space-y-5">
            <h2 className="text-sm font-semibold text-[var(--text-ink)]">{image.file.name}</h2>
            {url && (
              <div
                className="relative mx-auto overflow-hidden rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-canvas-inset)]"
                style={{ aspectRatio: `${spec.width}/${spec.height}`, width: mode === 'video' ? '100%' : 'min(100%, 180px)' }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- local object URL preview */}
                <img src={url} alt={`${image.file.name} inside a ${spec.ratio} frame`} className="absolute inset-0 h-full w-full object-contain" />
              </div>
            )}
            <SpecList rows={[
              ['Dimensions', `${image.width} × ${image.height} px`],
              ['Ratio', describeRatio(image.width, image.height)],
              ['File size', formatBytes(image.file.size)],
              ['Format', formatName(image.file.type)],
            ]} />
            <ul className="space-y-3" aria-label="Requirement checks">
              {checks.map((check) => {
                const style = levelStyle[check.level];
                return (
                  <li key={check.id} className="flex gap-3">
                    <svg className={`mt-0.5 h-4 w-4 shrink-0 ${style.text}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d={style.icon} />
                    </svg>
                    <p className="text-sm text-[var(--text-body)]">
                      <span className={`font-semibold ${style.text}`}>{style.word}: {check.label}.</span> {check.detail}
                    </p>
                  </li>
                );
              })}
            </ul>
            {(needsResize || needsCompress) && (
              <div className="flex flex-wrap gap-x-5 gap-y-2 pt-2">
                {needsResize && (
                  <LocalizedLink href="/tools/youtube-thumbnail-resizer" className="text-sm font-medium text-[var(--brand-accent-deep)] underline hover:no-underline focus-ring">
                    Resize to {spec.ratio}
                  </LocalizedLink>
                )}
                {needsCompress && (
                  <LocalizedLink href="/tools/youtube-thumbnail-compressor" className="text-sm font-medium text-[var(--brand-accent-deep)] underline hover:no-underline focus-ring">
                    Compress under 2 MB
                  </LocalizedLink>
                )}
              </div>
            )}
          </div>
        ) : (
          <p className="py-16 text-center text-xs text-[var(--text-muted)]">Add an image to check it against YouTube’s rules.</p>
        )
      }
    />
  );
}

function SpecList({ rows }: { rows: [string, string][] }) {
  return (
    <dl className="divide-y divide-[var(--border-hairline-subtle)] border-y border-[var(--border-hairline-subtle)]">
      {rows.map(([term, value]) => (
        <div key={term} className="flex items-baseline justify-between gap-4 py-2">
          <dt className="text-sm text-[var(--text-muted)]">{term}</dt>
          <dd className="font-mono text-sm text-[var(--text-ink)] text-right">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
