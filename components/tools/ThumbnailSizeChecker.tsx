'use client';

import { useState } from 'react';
import DropZone from '@/components/form/DropZone';
import Alert from '@/components/feedback/Alert';
import { LocalizedLink, useI18n } from '@/lib/i18n';
import ToolWorkspaceLayout from './ToolWorkspaceLayout';
import { useBlobUrl } from './ImagePreview';
import {
  THUMBNAIL_SPECS,
  checkThumbnail,
  describeRatio,
  formatBytes,
  type CheckLevel,
  type ThumbnailCheck,
  type ThumbnailMode,
} from '@/lib/thumbnail-size';

interface Inspected {
  file: File;
  width: number;
  height: number;
}

const levelIcon: Record<CheckLevel, { text: string; icon: string }> = {
  pass: { text: 'text-[var(--state-success-text)]', icon: 'M5 13l4 4L19 7' },
  info: { text: 'text-[var(--state-info-text)]', icon: 'M12 8h.01M11 12h1v4h1' },
  warn: { text: 'text-[var(--state-warning-text)]', icon: 'M12 9v4m0 4h.01' },
  fail: { text: 'text-[var(--state-error-text)]', icon: 'M6 18L18 6M6 6l12 12' },
};

const formatName = (type: string) =>
  ({ 'image/jpeg': 'JPG', 'image/png': 'PNG', 'image/webp': 'WebP', 'image/gif': 'GIF' }[type] ??
  (type || 'Unknown'));

export default function ThumbnailSizeChecker() {
  const { t } = useI18n();
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
      setError(t.thumbnailSize.errorInvalidImage);
    }
  };

  const checks = image
    ? checkThumbnail(
        { width: image.width, height: image.height, bytes: image.file.size, type: image.file.type },
        mode
      )
    : [];
  const needsResize = checks.some(
    (check) => (check.id === 'ratio' || check.id === 'minimum') && check.level !== 'pass'
  );
  const needsCompress = checks.some((check) => check.id === 'size' && check.level !== 'pass');

  const getLevelWord = (level: CheckLevel) => {
    switch (level) {
      case 'pass':
        return t.thumbnailSize.levelPass;
      case 'info':
        return t.thumbnailSize.levelNote;
      case 'warn':
        return t.thumbnailSize.levelCheck;
      case 'fail':
        return t.thumbnailSize.levelFix;
    }
  };

  const getCheckLabel = (id: ThumbnailCheck['id']) => {
    switch (id) {
      case 'minimum':
        return t.thumbnailSize.checkMinLabel;
      case 'ratio':
        return t.thumbnailSize.checkRatioLabel;
      case 'resolution':
        return t.thumbnailSize.checkResolutionLabel;
      case 'format':
        return t.thumbnailSize.checkFormatLabel;
      case 'size':
        return t.thumbnailSize.checkSizeLabel;
    }
  };

  const getCheckDetail = (check: ThumbnailCheck) => {
    switch (check.id) {
      case 'minimum': {
        const dim =
          check.minSide === 'width' ? t.thumbnailSize.sideWidth : t.thumbnailSize.sideHeight;
        const tpl =
          check.level === 'pass' ? t.thumbnailSize.checkMinPass : t.thumbnailSize.checkMinFail;
        return tpl.replace('{side}', String(check.side ?? '')).replace('{dim}', dim);
      }
      case 'ratio': {
        const tpl =
          check.level === 'pass' ? t.thumbnailSize.checkRatioPass : t.thumbnailSize.checkRatioWarn;
        return tpl
          .replace('{actual}', check.actualRatio ?? '')
          .replaceAll('{target}', check.targetRatio ?? '');
      }
      case 'resolution': {
        const tpl =
          check.level === 'pass'
            ? t.thumbnailSize.checkResolutionPass
            : t.thumbnailSize.checkResolutionInfo;
        return tpl
          .replace('{width}', String(check.targetWidth ?? ''))
          .replace('{height}', String(check.targetHeight ?? ''));
      }
      case 'format': {
        return check.level === 'pass'
          ? t.thumbnailSize.checkFormatPass.replace('{format}', check.format ?? '')
          : t.thumbnailSize.checkFormatWarn;
      }
      case 'size': {
        const sizeStr = formatBytes(check.bytes ?? 0);
        const tpl =
          check.level === 'pass'
            ? t.thumbnailSize.checkSizePass
            : check.level === 'warn'
              ? t.thumbnailSize.checkSizeWarn
              : t.thumbnailSize.checkSizeFail;
        return tpl.replace('{size}', sizeStr);
      }
    }
  };

  const sideLabel = spec.minSide === 'width' ? t.thumbnailSize.sideWidth : t.thumbnailSize.sideHeight;
  const specRows: [string, string][] = [
    [t.thumbnailSize.specRecommended, `${spec.width} × ${spec.height} ${t.thumbnailSize.dimUnit}`],
    [t.thumbnailSize.specMinimum, `${THUMBNAIL_SPECS.minPixels} ${t.thumbnailSize.dimUnit} ${sideLabel}`],
    [t.thumbnailSize.specRatio, spec.ratio],
    [t.thumbnailSize.specMaxFileSize, t.thumbnailSize.specMaxFileSizeVal],
    [t.thumbnailSize.specFormats, t.thumbnailSize.specFormatsVal],
  ];

  return (
    <ToolWorkspaceLayout
      workspace={
        <div className="space-y-6">
          <div
            role="group"
            aria-label={t.thumbnailSize.typeAria}
            className="inline-flex rounded-full border border-[var(--border-hairline)] bg-[var(--bg-canvas-subtle)] p-1"
          >
            {(['video', 'shorts'] as const).map((value) => (
              <button
                key={value}
                type="button"
                aria-pressed={mode === value}
                onClick={() => setMode(value)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition duration-150 active:scale-[0.97] focus-ring ${
                  mode === value
                    ? 'bg-[var(--bg-canvas-elevated)] text-[var(--text-ink)] shadow-[var(--shadow-whisper)]'
                    : 'text-[var(--text-body)] hover:text-[var(--text-ink)]'
                }`}
              >
                {value === 'video' ? t.thumbnailSize.modeVideo : t.thumbnailSize.modeShorts}
              </button>
            ))}
          </div>

          <SpecList rows={specRows} />

          <DropZone
            id="thumbnail-size-file"
            label={t.thumbnailSize.dropLabel}
            accept="image/jpeg,image/png,image/webp,image/gif"
            maxSizeMB={50}
            onFileSelect={inspect}
            onError={setError}
          />
          {error && <Alert variant="error" title={t.thumbnailSize.errorTitle}>{error}</Alert>}
        </div>
      }
      results={
        image ? (
          <div className="space-y-5">
            <h2 className="text-sm font-semibold text-[var(--text-ink)]">{image.file.name}</h2>
            {url && (
              <div
                className="relative mx-auto overflow-hidden rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-canvas-inset)]"
                style={{
                  aspectRatio: `${spec.width}/${spec.height}`,
                  width: mode === 'video' ? '100%' : 'min(100%, 180px)',
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- local object URL preview */}
                <img
                  src={url}
                  alt={t.thumbnailSize.previewAlt
                    .replace('{name}', image.file.name)
                    .replace('{ratio}', spec.ratio)}
                  className="absolute inset-0 h-full w-full object-contain"
                />
              </div>
            )}
            <SpecList
              rows={[
                [t.thumbnailSize.resultDimensions, `${image.width} × ${image.height} ${t.thumbnailSize.dimUnit}`],
                [t.thumbnailSize.resultRatio, describeRatio(image.width, image.height)],
                [t.thumbnailSize.resultFileSize, formatBytes(image.file.size)],
                [t.thumbnailSize.resultFormat, formatName(image.file.type)],
              ]}
            />
            <ul className="space-y-3" aria-label={t.thumbnailSize.checksAria}>
              {checks.map((check) => {
                const style = levelIcon[check.level];
                const word = getLevelWord(check.level);
                const label = getCheckLabel(check.id);
                const detail = getCheckDetail(check);
                return (
                  <li key={check.id} className="flex gap-3">
                    <svg
                      className={`mt-0.5 h-4 w-4 shrink-0 ${style.text}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d={style.icon} />
                    </svg>
                    <p className="text-sm text-[var(--text-body)]">
                      <span className={`font-semibold ${style.text}`}>
                        {word}: {label}.
                      </span>{' '}
                      {detail}
                    </p>
                  </li>
                );
              })}
            </ul>
            {(needsResize || needsCompress) && (
              <div className="flex flex-wrap gap-x-5 gap-y-2 pt-2">
                {needsResize && (
                  <LocalizedLink
                    href="/tools/youtube-thumbnail-resizer"
                    className="text-sm font-medium text-[var(--brand-accent-deep)] underline hover:no-underline focus-ring"
                  >
                    {t.thumbnailSize.actionResize.replace('{ratio}', spec.ratio)}
                  </LocalizedLink>
                )}
                {needsCompress && (
                  <LocalizedLink
                    href="/tools/youtube-thumbnail-compressor"
                    className="text-sm font-medium text-[var(--brand-accent-deep)] underline hover:no-underline focus-ring"
                  >
                    {t.thumbnailSize.actionCompress}
                  </LocalizedLink>
                )}
              </div>
            )}
          </div>
        ) : (
          <p className="py-16 text-center text-xs text-[var(--text-muted)]">
            {t.thumbnailSize.emptyState}
          </p>
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
