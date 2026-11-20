'use client';

import { useMemo, useState } from 'react';
import { encode } from 'uqr';
import Input from '@/components/form/Input';
import Button from '@/components/ui/Button';
import Alert from '@/components/feedback/Alert';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import ToolWorkspaceLayout from './ToolWorkspaceLayout';
import { useI18n } from '@/lib/i18n';
import { fillTemplate } from '@/lib/utils';
import { formatTimestamp, parseChannel, parseTimestamp, parseVideoId, subscribeLink, timestampLinks } from '@/lib/youtube-links';

const MAX_TIMESTAMPS = 20;
export const segmentListClass =
  'h-auto group-data-[orientation=horizontal]/tabs:h-auto p-1 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-subtle)]';
export const segmentTriggerClass =
  'h-auto px-4 py-2 text-sm font-medium rounded-lg text-[var(--text-muted)] data-[state=active]:bg-[var(--bg-canvas-elevated)] data-[state=active]:text-[var(--text-ink)] data-[state=active]:shadow-xs';

export interface CopyLabels { copy: string; copied: string; copyFailed: string; testLink: string }

export function CopyField({ id, label, value, hint, multiline, openable, labels }: { id: string; label: string; value: string; hint?: string; multiline?: boolean; openable?: boolean; labels: CopyLabels }) {
  const [state, setState] = useState<'idle' | 'copied' | 'failed'>('idle');
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setState('copied');
    } catch {
      setState('failed');
    }
    setTimeout(() => setState('idle'), 2000);
  };
  const fieldClass = 'w-full rounded-md border border-[var(--border-control)] bg-[var(--bg-canvas-subtle)] px-3 text-xs font-mono text-[var(--text-ink)] focus-ring';

  return (
    <div className="space-y-1.5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <label htmlFor={id} className="text-xs font-medium text-[var(--text-ink)]">{label}</label>
        <div className="flex items-center gap-3">
          {openable && (
            <a href={value} target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-[var(--brand-accent-deep)] underline hover:no-underline focus-ring rounded">
              {labels.testLink}
            </a>
          )}
          <Button variant="outline" size="sm" onClick={copy}>{state === 'copied' ? labels.copied : labels.copy}</Button>
        </div>
      </div>
      {multiline ? (
        <textarea id={id} readOnly rows={value.split('\n').length > 3 ? 6 : 4} value={value} onFocus={(event) => event.currentTarget.select()} className={`${fieldClass} py-2 leading-relaxed resize-y`} />
      ) : (
        <input id={id} readOnly value={value} onFocus={(event) => event.currentTarget.select()} className={`${fieldClass} h-9`} />
      )}
      {hint && <p className="text-[11px] text-[var(--text-muted)]">{hint}</p>}
      {state === 'failed' && <p className="text-[11px] text-[var(--state-error)]">{labels.copyFailed}</p>}
      <p role="status" aria-live="polite" className="sr-only">{state === 'copied' ? labels.copied : ''}</p>
    </div>
  );
}

function qrDataUrl(text: string): string {
  if (!text || typeof document === 'undefined') return '';
  const { data } = encode(text, { ecc: 'M', border: 2 });
  const scale = 12;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = data.length * scale;
  const context = canvas.getContext('2d');
  if (!context) return '';
  context.fillStyle = '#ffffff';
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = '#000000';
  data.forEach((row, y) => row.forEach((dark, x) => dark && context.fillRect(x * scale, y * scale, scale, scale)));
  return canvas.toDataURL('image/png');
}

export default function YouTubeLinkGenerator() {
  const { t } = useI18n();
  const l = t.linkGenerator;
  const [tab, setTab] = useState('timestamp');
  const [video, setVideo] = useState('');
  const [times, setTimes] = useState([{ id: 0, value: '' }]);
  const [channel, setChannel] = useState('');

  const videoId = parseVideoId(video);
  const parsed = times.map((time) => ({ ...time, result: parseTimestamp(time.value) }));
  const valid = parsed.flatMap((time) => ('seconds' in time.result ? [time.result.seconds] : []));
  const links = videoId && valid.length ? timestampLinks(videoId, valid[0]) : null;
  const list = videoId && valid.length > 1 ? valid.map((seconds) => `${formatTimestamp(seconds)} https://youtu.be/${videoId}?t=${seconds}`).join('\n') : '';

  const channelRef = parseChannel(channel);
  const subscribe = channelRef ? subscribeLink(channelRef) : '';
  const qr = useMemo(() => (subscribe ? qrDataUrl(new URL(subscribe).href) : ''), [subscribe]);

  const updateTime = (id: number, value: string) => setTimes((rows) => rows.map((row) => (row.id === id ? { ...row, value } : row)));
  const addTime = () => setTimes((rows) => [...rows, { id: Math.max(...rows.map((row) => row.id)) + 1, value: '' }]);
  const removeTime = (id: number) => setTimes((rows) => rows.filter((row) => row.id !== id));

  return (
    <Tabs value={tab} onValueChange={setTab} className="gap-5">
      <TabsList aria-label={l.tabsLabel} className={segmentListClass}>
        <TabsTrigger value="timestamp" className={segmentTriggerClass}>{l.tabTimestamp}</TabsTrigger>
        <TabsTrigger value="subscribe" className={segmentTriggerClass}>{l.tabSubscribe}</TabsTrigger>
      </TabsList>

      <TabsContent value="timestamp">
        <ToolWorkspaceLayout
          workspace={
            <>
              <Input
                id="link-video"
                label={l.videoLabel}
                placeholder={l.videoPlaceholder}
                value={video}
                inputMode="url"
                autoComplete="off"
                onChange={(event) => setVideo(event.target.value)}
                error={video.trim() && !videoId ? l.videoError : undefined}
                hint={videoId ? fillTemplate(l.videoFound, { id: videoId }) : undefined}
              />
              {!video.trim() && <p className="-mt-4 text-[11px] text-[var(--text-muted)]">{l.videoHint}</p>}

              <div className="space-y-3">
                {parsed.map((time, index) => {
                  const result = time.result;
                  const error = 'error' in result && result.error !== 'empty' ? (result.error === 'negative' ? l.timeNegative : l.timeInvalid) : undefined;
                  return (
                    <div key={time.id} className="flex items-start gap-2">
                      <Input
                        id={`link-time-${time.id}`}
                        label={fillTemplate(l.timeLabel, { n: index + 1 })}
                        placeholder={l.timePlaceholder}
                        value={time.value}
                        autoComplete="off"
                        onChange={(event) => updateTime(time.id, event.target.value)}
                        error={error}
                        hint={'seconds' in result ? fillTemplate(l.timeParsed, { time: formatTimestamp(result.seconds), seconds: result.seconds }) : undefined}
                      />
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => removeTime(time.id)}
                          aria-label={fillTemplate(l.removeTimestamp, { n: index + 1 })}
                          className="mt-6 h-9 w-9 shrink-0 rounded-md border border-[var(--border-control)] text-[var(--text-muted)] hover:text-[var(--text-ink)] focus-ring"
                        >
                          <span aria-hidden="true">×</span>
                        </button>
                      )}
                    </div>
                  );
                })}
                <Button variant="outline" size="sm" onClick={addTime} disabled={times.length >= MAX_TIMESTAMPS}>
                  + {l.addTimestamp}
                </Button>
              </div>
            </>
          }
          results={
            links ? (
              <>
                <CopyField id="link-short" label={l.shortLink} value={links.short} openable labels={l} />
                <CopyField id="link-full" label={l.fullLink} value={links.full} openable labels={l} />
                <CopyField id="link-embed" label={l.embedCode} value={links.embed} multiline labels={l} />
                {list && <CopyField id="link-list" label={l.listHeading} value={list} hint={l.listHint} multiline labels={l} />}
              </>
            ) : (
              <p className="text-sm text-[var(--text-body)]">{l.timestampEmpty}</p>
            )
          }
        />
      </TabsContent>

      <TabsContent value="subscribe">
        <ToolWorkspaceLayout
          workspace={
            <>
              <Input
                id="link-channel"
                label={l.channelLabel}
                placeholder={l.channelPlaceholder}
                value={channel}
                autoComplete="off"
                onChange={(event) => setChannel(event.target.value)}
                error={channel.trim() && !channelRef ? l.channelError : undefined}
              />
              <p className="-mt-4 text-[11px] text-[var(--text-muted)]">{l.channelHint}</p>
              {(channelRef?.kind === 'c' || channelRef?.kind === 'user') && <Alert variant="info">{l.legacyNote}</Alert>}
            </>
          }
          results={
            subscribe ? (
              <>
                <CopyField id="link-subscribe" label={l.tabSubscribe} value={subscribe} hint={l.subscribeHint} openable labels={l} />
                {qr && (
                  <figure className="space-y-3">
                    <figcaption className="text-xs font-medium text-[var(--text-ink)]">{l.qrHeading}</figcaption>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={qr} alt={l.qrAlt} width={200} height={200} className="rounded-lg border border-[var(--border-hairline)] bg-white" />
                    <p className="text-[11px] text-[var(--text-muted)]">{l.qrHint}</p>
                    <a
                      href={qr}
                      download="youtube-subscribe-qr.png"
                      className="inline-flex items-center justify-center rounded-full bg-[var(--brand-accent)] text-[var(--brand-on-accent)] px-5 h-10 text-sm font-medium hover:bg-[var(--brand-accent-deep)] focus-ring"
                    >
                      {l.qrDownload}
                    </a>
                  </figure>
                )}
              </>
            ) : (
              <p className="text-sm text-[var(--text-body)]">{l.subscribeEmpty}</p>
            )
          }
        />
      </TabsContent>
    </Tabs>
  );
}
