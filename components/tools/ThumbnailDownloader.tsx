'use client';

import { useState } from 'react';
import Input from '@/components/form/Input';
import Button from '@/components/ui/Button';
import Alert from '@/components/feedback/Alert';
import ToolWorkspaceLayout from './ToolWorkspaceLayout';
import { useI18n, LocalizedLink } from '@/lib/i18n';
import { fillTemplate } from '@/lib/utils';
import { parseVideoId } from '@/lib/youtube-links';
import {
  THUMBNAIL_SIZES,
  isPlaceholderImage,
  thumbnailFileName,
  thumbnailUrl,
  type ThumbnailSize,
  type ThumbnailSizeKey,
} from '@/lib/youtube-thumbnails';

type SizeState = 'loading' | 'ready' | 'missing' | 'failed';
type DownloadState = 'idle' | 'busy' | 'fallback';

const linkClass = 'font-medium text-[var(--brand-accent-deep)] underline hover:no-underline focus-ring rounded';

function SizeCard({ videoId, size, label }: { videoId: string; size: ThumbnailSize; label: string }) {
  const { t } = useI18n();
  const d = t.thumbnailDownloader;
  const [state, setState] = useState<SizeState>('loading');
  const [download, setDownload] = useState<DownloadState>('idle');
  const [copy, setCopy] = useState<'idle' | 'copied' | 'failed'>('idle');
  const url = thumbnailUrl(videoId, size.key);

  const save = async () => {
    setDownload('busy');
    try {
      const response = await fetch(url, { mode: 'cors' });
      if (!response.ok) throw new Error(String(response.status));
      const objectUrl = URL.createObjectURL(await response.blob());
      const anchor = document.createElement('a');
      anchor.href = objectUrl;
      anchor.download = thumbnailFileName(videoId, size.key);
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
      setDownload('idle');
    } catch {
      // The image host may refuse cross-origin reads; opening the image lets the viewer save it from the browser.
      window.open(url, '_blank', 'noopener,noreferrer');
      setDownload('fallback');
    }
  };

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopy('copied');
    } catch {
      setCopy('failed');
    }
    setTimeout(() => setCopy('idle'), 2000);
  };

  return (
    <li className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-subtle)] p-3 space-y-3">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-sm font-semibold text-[var(--text-ink)]">{label}</h3>
        <span className="text-xs font-mono text-[var(--text-muted)]">
          {size.width} × {size.height}
        </span>
      </div>
      <div
        className="relative overflow-hidden rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)]"
        style={{ aspectRatio: `${size.width} / ${size.height}` }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={url}
          alt={fillTemplate(d.imageAlt, { size: label })}
          width={size.width}
          height={size.height}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onLoad={(event) => setState(isPlaceholderImage(size.key, event.currentTarget.naturalWidth) ? 'missing' : 'ready')}
          onError={() => setState('failed')}
          className={`h-full w-full object-cover ${state === 'missing' ? 'opacity-30' : ''} ${state === 'failed' ? 'invisible' : ''}`}
        />
        {(state === 'missing' || state === 'failed') && (
          <p className="absolute inset-0 flex items-center justify-center p-3 text-center text-xs font-medium text-[var(--text-ink)]">
            {d.unavailable}
          </p>
        )}
      </div>
      {state !== 'missing' && state !== 'failed' && (
        <div className="flex flex-wrap items-center gap-2">
          <Button size="sm" onClick={save} disabled={state !== 'ready' || download === 'busy'}>
            {download === 'busy' ? d.downloading : d.download}
          </Button>
          <Button variant="outline" size="sm" onClick={copyUrl}>
            {copy === 'copied' ? d.copied : d.copyUrl}
          </Button>
          <a href={url} target="_blank" rel="noopener noreferrer" className={`text-xs ${linkClass}`}>
            {d.open}
          </a>
        </div>
      )}
      {download === 'fallback' && <p className="text-[11px] text-[var(--text-body)]">{d.fallbackNote}</p>}
      {copy === 'failed' && <p className="text-[11px] text-[var(--state-error)]">{d.copyFailed}</p>}
      <p role="status" aria-live="polite" className="sr-only">
        {copy === 'copied' ? d.copied : ''}
      </p>
    </li>
  );
}

export default function ThumbnailDownloader() {
  const { t } = useI18n();
  const d = t.thumbnailDownloader;
  const [video, setVideo] = useState('');
  const videoId = parseVideoId(video);

  const sizeLabels: Record<ThumbnailSizeKey, string> = {
    maxresdefault: d.sizeMaxres,
    sddefault: d.sizeSd,
    hqdefault: d.sizeHq,
    mqdefault: d.sizeMq,
    default: d.sizeDefault,
  };

  return (
    <ToolWorkspaceLayout
      workspace={
        <>
          <Input
            id="thumb-dl-video"
            label={d.videoLabel}
            placeholder={d.videoPlaceholder}
            value={video}
            inputMode="url"
            autoComplete="off"
            onChange={(event) => setVideo(event.target.value)}
            error={video.trim() && !videoId ? d.videoError : undefined}
            hint={videoId ? fillTemplate(d.videoFound, { id: videoId }) : undefined}
          />
          {!video.trim() && <p className="-mt-4 text-[11px] text-[var(--text-muted)]">{d.videoHint}</p>}

          {videoId && (
            <section aria-labelledby="thumb-dl-sizes" className="space-y-3">
              <h2 id="thumb-dl-sizes" className="text-sm font-semibold text-[var(--text-ink)]">
                {d.sizesHeading}
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {THUMBNAIL_SIZES.map((size) => (
                  <SizeCard key={`${videoId}-${size.key}`} videoId={videoId} size={size} label={sizeLabels[size.key]} />
                ))}
              </ul>
            </section>
          )}

          <Alert variant="info">{d.usageNote}</Alert>
        </>
      }
      results={
        videoId ? (
          <div className="space-y-4 text-sm text-[var(--text-body)]">
            <p>{d.resultIntro}</p>
            <ul className="space-y-2">
              <li>
                <LocalizedLink href="/tools/youtube-thumbnail-tester" className={linkClass}>{d.nextTester}</LocalizedLink>
                <span className="block text-xs text-[var(--text-muted)]">{d.nextTesterHint}</span>
              </li>
              <li>
                <LocalizedLink href="/tools/youtube-thumbnail-resizer" className={linkClass}>{d.nextResizer}</LocalizedLink>
                <span className="block text-xs text-[var(--text-muted)]">{d.nextResizerHint}</span>
              </li>
              <li>
                <LocalizedLink href="/tools/youtube-thumbnail-compressor" className={linkClass}>{d.nextCompressor}</LocalizedLink>
                <span className="block text-xs text-[var(--text-muted)]">{d.nextCompressorHint}</span>
              </li>
            </ul>
          </div>
        ) : (
          <p className="text-sm text-[var(--text-body)]">{d.emptyState}</p>
        )
      }
    />
  );
}
