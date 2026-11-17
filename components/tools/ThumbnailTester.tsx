'use client';

import { useEffect, useRef, useState } from 'react';
import DropZone from '@/components/form/DropZone';
import Input from '@/components/form/Input';
import Button from '@/components/ui/Button';
import Alert from '@/components/feedback/Alert';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import ToolWorkspaceLayout from './ToolWorkspaceLayout';
import { segmentListClass, segmentTriggerClass } from './YouTubeLinkGenerator';
import { toolSamples } from '@/config/tool-samples';
import { useI18n, LocalizedLink } from '@/lib/i18n';
import { fillTemplate } from '@/lib/utils';
import { isSixteenByNine } from '@/lib/youtube-thumbnails';

const TITLE_LIMIT = 100;
const ACCEPT = 'image/jpeg,image/png,image/webp,image/gif';

interface Thumb {
  url: string;
  name: string;
  width: number;
  height: number;
}

type Layout = 'home' | 'search' | 'suggested' | 'mobile';
type Theme = 'light' | 'dark';

interface CardProps {
  thumb: Thumb;
  title: string;
  channel: string;
  meta: string;
  duration: string;
  theme: Theme;
}

function palette(theme: Theme) {
  return theme === 'dark'
    ? { frame: 'bg-[#0f0f0f]', text: 'text-[#f1f1f1]', muted: 'text-[#aaaaaa]', avatar: 'bg-[#3ea6ff] text-[#0f0f0f]' }
    : { frame: 'bg-white', text: 'text-[#0f0f0f]', muted: 'text-[#606060]', avatar: 'bg-[#065fd4] text-white' };
}

function Avatar({ channel, theme, size }: { channel: string; theme: Theme; size: number }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex shrink-0 items-center justify-center rounded-full font-semibold ${palette(theme).avatar}`}
      style={{ width: size, height: size, fontSize: size * 0.45 }}
    >
      {channel.trim().charAt(0).toUpperCase() || 'C'}
    </span>
  );
}

function ThumbImage({ thumb, duration, rounded }: { thumb: Thumb; duration: string; rounded: string }) {
  return (
    <div className={`relative aspect-video w-full overflow-hidden bg-black ${rounded}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={thumb.url} alt="" className="h-full w-full object-cover" />
      {duration.trim() && (
        <span className="absolute bottom-1 right-1 rounded bg-black/80 px-1 py-px text-[11px] font-medium leading-4 text-white">
          {duration}
        </span>
      )}
    </div>
  );
}

function HomeCard({ thumb, title, channel, meta, duration, theme }: CardProps) {
  const c = palette(theme);
  return (
    <div className="w-full max-w-[360px]">
      <ThumbImage thumb={thumb} duration={duration} rounded="rounded-xl" />
      <div className="mt-3 flex gap-3">
        <Avatar channel={channel} theme={theme} size={36} />
        <div className="min-w-0">
          <p className={`line-clamp-2 text-[15px] font-semibold leading-[1.4] ${c.text}`}>{title}</p>
          <p className={`mt-1 truncate text-[13px] ${c.muted}`}>{channel}</p>
          <p className={`truncate text-[13px] ${c.muted}`}>{meta}</p>
        </div>
      </div>
    </div>
  );
}

function SearchCard({ thumb, title, channel, meta, duration, theme }: CardProps) {
  const c = palette(theme);
  return (
    <div className="flex w-full gap-3">
      <div className="w-[44%] shrink-0">
        <ThumbImage thumb={thumb} duration={duration} rounded="rounded-xl" />
      </div>
      <div className="min-w-0">
        <p className={`line-clamp-2 text-[15px] font-normal leading-[1.35] ${c.text}`}>{title}</p>
        <p className={`mt-1 truncate text-[12px] ${c.muted}`}>{meta}</p>
        <p className={`mt-2 flex items-center gap-2 truncate text-[12px] ${c.muted}`}>
          <Avatar channel={channel} theme={theme} size={22} />
          <span className="truncate">{channel}</span>
        </p>
      </div>
    </div>
  );
}

function SuggestedCard({ thumb, title, channel, meta, duration, theme }: CardProps) {
  const c = palette(theme);
  return (
    <div className="flex w-full max-w-[402px] gap-2">
      <div className="w-[168px] shrink-0">
        <ThumbImage thumb={thumb} duration={duration} rounded="rounded-lg" />
      </div>
      <div className="min-w-0">
        <p className={`line-clamp-2 text-[14px] font-semibold leading-[1.4] ${c.text}`}>{title}</p>
        <p className={`mt-1 truncate text-[12px] ${c.muted}`}>{channel}</p>
        <p className={`truncate text-[12px] ${c.muted}`}>{meta}</p>
      </div>
    </div>
  );
}

function MobileCard({ thumb, title, channel, meta, duration, theme }: CardProps) {
  const c = palette(theme);
  return (
    <div className="w-full max-w-[360px]">
      <ThumbImage thumb={thumb} duration={duration} rounded="" />
      <div className="flex gap-3 px-3 pt-3">
        <Avatar channel={channel} theme={theme} size={36} />
        <div className="min-w-0">
          <p className={`line-clamp-2 text-[14px] font-medium leading-[1.4] ${c.text}`}>{title}</p>
          <p className={`mt-1 line-clamp-1 text-[12px] ${c.muted}`}>
            {channel} · {meta}
          </p>
        </div>
      </div>
    </div>
  );
}

const cards: Record<Layout, (props: CardProps) => React.JSX.Element> = {
  home: HomeCard,
  search: SearchCard,
  suggested: SuggestedCard,
  mobile: MobileCard,
};

function loadThumb(file: File): Promise<Thumb> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => resolve({ url, name: file.name, width: image.naturalWidth, height: image.naturalHeight });
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('decode'));
    };
    image.src = url;
  });
}

export default function ThumbnailTester() {
  const { t } = useI18n();
  const p = t.thumbnailTester;
  const [thumbs, setThumbs] = useState<{ a?: Thumb; b?: Thumb }>({});
  const [title, setTitle] = useState('');
  const [channel, setChannel] = useState('');
  const [meta, setMeta] = useState(p.metaDefault);
  const [duration, setDuration] = useState('10:24');
  const [theme, setTheme] = useState<Theme>('light');
  const [layout, setLayout] = useState<Layout>('home');
  const [error, setError] = useState<string | null>(null);
  const [resetKey, setResetKey] = useState(0);

  // Object URLs are released when a thumbnail is replaced or removed, and all of them on unmount.
  const objectUrls = useRef(new Set<string>());
  useEffect(() => {
    const urls = objectUrls.current;
    return () => urls.forEach((url) => URL.revokeObjectURL(url));
  }, []);
  const release = (thumb?: Thumb) => {
    if (!thumb) return;
    URL.revokeObjectURL(thumb.url);
    objectUrls.current.delete(thumb.url);
  };

  const select = (slot: 'a' | 'b') => async (file: File) => {
    setError(null);
    try {
      const thumb = await loadThumb(file);
      objectUrls.current.add(thumb.url);
      release(thumbs[slot]);
      setThumbs((current) => ({ ...current, [slot]: thumb }));
    } catch {
      setError(p.errorDecode);
    }
  };

  const removeB = () => {
    release(thumbs.b);
    setThumbs((current) => ({ a: current.a }));
  };

  const reset = () => {
    release(thumbs.a);
    release(thumbs.b);
    setThumbs({});
    setTitle('');
    setChannel('');
    setMeta(p.metaDefault);
    setDuration('10:24');
    setError(null);
    setResetKey((key) => key + 1);
  };

  const versions = (['a', 'b'] as const).flatMap((slot) => (thumbs[slot] ? [{ slot, thumb: thumbs[slot] as Thumb }] : []));
  const shownTitle = title.trim() || p.titleFallback;
  const shownChannel = channel.trim() || p.channelFallback;
  const c = palette(theme);
  const layouts: { value: Layout; label: string }[] = [
    { value: 'home', label: p.layoutHome },
    { value: 'search', label: p.layoutSearch },
    { value: 'suggested', label: p.layoutSuggested },
    { value: 'mobile', label: p.layoutMobile },
  ];

  return (
    <ToolWorkspaceLayout
      workspace={
        <>
          <DropZone
            key={`a-${resetKey}`}
            id="thumb-test-a"
            label={p.dropzoneLabelA}
            accept={ACCEPT}
            maxSizeMB={20}
            privacyNote={p.dropzoneHint}
            onFileSelect={select('a')}
            onError={setError}
            samples={toolSamples['youtube-thumbnail-tester']}
          />

          {thumbs.a && (
            <div className="space-y-2">
              <DropZone
                key={`b-${resetKey}`}
                id="thumb-test-b"
                label={p.dropzoneLabelB}
                accept={ACCEPT}
                maxSizeMB={20}
                privacyNote={p.dropzoneHint}
                onFileSelect={select('b')}
                onError={setError}
              />
              {!thumbs.b && <p className="text-[11px] text-[var(--text-muted)]">{p.compareHint}</p>}
              {thumbs.b && (
                <Button variant="outline" size="sm" onClick={removeB}>
                  {p.removeB}
                </Button>
              )}
            </div>
          )}

          {error && <Alert variant="error" title={p.errorTitle}>{error}</Alert>}

          {versions
            .filter(({ thumb }) => !isSixteenByNine(thumb.width, thumb.height))
            .map(({ slot, thumb }) => (
              <Alert key={slot} variant="warning">
                {fillTemplate(p.ratioWarning, { version: slot.toUpperCase(), width: thumb.width, height: thumb.height })}{' '}
                <LocalizedLink href="/tools/youtube-thumbnail-resizer" className="font-medium underline hover:no-underline">
                  {p.resizerLink}
                </LocalizedLink>
              </Alert>
            ))}

          <Input
            id="thumb-test-title"
            label={p.titleLabel}
            placeholder={p.titlePlaceholder}
            value={title}
            maxLength={TITLE_LIMIT}
            autoComplete="off"
            onChange={(event) => setTitle(event.target.value)}
            hint={fillTemplate(p.titleCount, { count: title.length, limit: TITLE_LIMIT })}
          />
          <Input
            id="thumb-test-channel"
            label={p.channelLabel}
            placeholder={p.channelPlaceholder}
            value={channel}
            autoComplete="off"
            onChange={(event) => setChannel(event.target.value)}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input id="thumb-test-meta" label={p.metaLabel} value={meta} autoComplete="off" onChange={(event) => setMeta(event.target.value)} />
            <Input id="thumb-test-duration" label={p.durationLabel} value={duration} autoComplete="off" onChange={(event) => setDuration(event.target.value)} />
          </div>

          <fieldset className="space-y-2">
            <legend className="text-xs font-medium text-[var(--text-ink)]">{p.themeLabel}</legend>
            <div className="inline-flex rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-subtle)] p-1">
              {(['light', 'dark'] as const).map((value) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={theme === value}
                  onClick={() => setTheme(value)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium focus-ring ${
                    theme === value
                      ? 'bg-[var(--bg-canvas-elevated)] text-[var(--text-ink)] shadow-xs'
                      : 'text-[var(--text-muted)]'
                  }`}
                >
                  {value === 'light' ? p.themeLight : p.themeDark}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="flex justify-end border-t border-[var(--border-hairline-subtle)] pt-4">
            <Button variant="outline" size="sm" onClick={reset}>{p.reset}</Button>
          </div>
        </>
      }
      results={
        versions.length ? (
          <Tabs value={layout} onValueChange={(value) => setLayout(value as Layout)} className="gap-4">
            <TabsList aria-label={p.layoutLabel} className={`${segmentListClass} grid w-full grid-cols-4`}>
              {layouts.map((item) => (
                <TabsTrigger key={item.value} value={item.value} className={`${segmentTriggerClass} px-1 text-xs sm:text-sm`}>
                  {item.label}
                </TabsTrigger>
              ))}
            </TabsList>
            {layouts.map((item) => {
              const Card = cards[item.value];
              return (
                <TabsContent key={item.value} value={item.value}>
                  <div className={`space-y-5 rounded-xl border border-[var(--border-hairline)] p-4 ${c.frame}`}>
                    {versions.map(({ slot, thumb }) => (
                      <figure key={slot} className="space-y-2">
                        {versions.length > 1 && (
                          <figcaption className={`text-xs font-mono font-semibold ${c.muted}`}>
                            {fillTemplate(p.versionLabel, { version: slot.toUpperCase() })}
                          </figcaption>
                        )}
                        <Card thumb={thumb} title={shownTitle} channel={shownChannel} meta={meta} duration={duration} theme={theme} />
                      </figure>
                    ))}
                  </div>
                </TabsContent>
              );
            })}
            <p className="text-[11px] text-[var(--text-muted)]">{p.approxNote}</p>
          </Tabs>
        ) : (
          <p className="text-sm text-[var(--text-body)]">{p.emptyState}</p>
        )
      }
    />
  );
}
