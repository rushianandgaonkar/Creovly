'use client';

import { useEffect, useMemo, useState } from 'react';
import Select from '@/components/form/Select';
import ToolWorkspaceLayout from './ToolWorkspaceLayout';
import { publishPlan } from '@/lib/post-time';
import { useI18n } from '@/lib/i18n';

const hourLabel = (hour: number, loc: string) => {
  const d = new Date(Date.UTC(2026, 0, 1, hour, 0, 0));
  return new Intl.DateTimeFormat(loc, { hour: 'numeric', minute: '2-digit', timeZone: 'UTC' }).format(d);
};

export default function BestTimeToPost() {
  const { t, locale } = useI18n();
  // Zones and "now" are browser facts; read them after mount so server and client HTML match.
  const [zones, setZones] = useState<string[]>(['UTC']);
  const [yourZone, setYourZone] = useState('UTC');
  const [peakZone, setPeakZone] = useState('UTC');
  const [now, setNow] = useState<Date>();
  const [peakHour, setPeakHour] = useState('18');
  const [lead, setLead] = useState('120');

  useEffect(() => {
    const detected = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
    const supported =
      (Intl as unknown as { supportedValuesOf?: (key: string) => string[] }).supportedValuesOf?.(
        'timeZone'
      ) ?? [];
    setZones(Array.from(new Set(['UTC', detected, ...supported])).sort());
    setYourZone(detected);
    setPeakZone(detected);
    setNow(new Date());
  }, []);

  const hours = useMemo(
    () => Array.from({ length: 24 }, (_, hour) => ({ value: String(hour), label: hourLabel(hour, locale) })),
    [locale]
  );

  const leads = useMemo(
    () => [
      { value: '0', label: t.bestTimeToPost.leadPeak },
      { value: '60', label: t.bestTimeToPost.lead1h },
      { value: '120', label: t.bestTimeToPost.lead2h },
      { value: '180', label: t.bestTimeToPost.lead3h },
    ],
    [t]
  );

  const zoneOptions = useMemo(
    () => zones.map((zone) => ({ value: zone, label: zone.replace(/_/g, ' ') })),
    [zones]
  );

  const slots = useMemo(
    // Plan one extra day so a slot already past today drops off and seven remain.
    () =>
      now
        ? publishPlan({
            peakZone,
            peakHour: Number(peakHour),
            leadMinutes: Number(lead),
            from: now,
            days: 8,
          })
            .filter((slot) => slot.publish > now)
            .slice(0, 7)
        : [],
    [now, peakZone, peakHour, lead]
  );

  const fmt = (zone: string, options: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat(locale, { timeZone: zone, ...options });

  const day = (zone: string) => fmt(zone, { weekday: 'short', month: 'short', day: 'numeric' });
  const time = (zone: string) => fmt(zone, { hour: 'numeric', minute: '2-digit' });
  const sameZone = yourZone === peakZone;
  const first = slots[0];

  const audienceTime = first && !sameZone
    ? t.bestTimeToPost.audienceTimeSuffix.replace('{time}', time(peakZone).format(first.publish))
    : '';

  return (
    <ToolWorkspaceLayout
      workspace={
        <div className="space-y-5">
          <p className="text-sm text-[var(--text-body)] leading-relaxed">
            {t.bestTimeToPost.intro}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              id="post-peak-hour"
              label={t.bestTimeToPost.peakHourLabel}
              options={hours}
              value={peakHour}
              onChange={(event) => setPeakHour(event.target.value)}
            />
            <Select
              id="post-lead"
              label={t.bestTimeToPost.publishLabel}
              options={leads}
              value={lead}
              onChange={(event) => setLead(event.target.value)}
            />
            <Select
              id="post-peak-zone"
              label={t.bestTimeToPost.peakZoneLabel}
              options={zoneOptions}
              value={peakZone}
              onChange={(event) => setPeakZone(event.target.value)}
            />
            <Select
              id="post-your-zone"
              label={t.bestTimeToPost.yourZoneLabel}
              options={zoneOptions}
              value={yourZone}
              onChange={(event) => setYourZone(event.target.value)}
            />
          </div>
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            {t.bestTimeToPost.noDataTip}
          </p>
        </div>
      }
      results={
        first ? (
          <div className="space-y-5">
            <div>
              <h2 className="text-sm font-semibold text-[var(--text-ink)]">
                {t.bestTimeToPost.nextPublishTime}
              </h2>
              <p className="mt-2 font-mono text-3xl font-semibold text-[var(--text-ink)]">
                {time(yourZone).format(first.publish)}
              </p>
              <p className="mt-1 text-sm text-[var(--text-body)]">
                {t.bestTimeToPost.publishContext
                  .replace('{day}', day(yourZone).format(first.publish))
                  .replace('{audienceTime}', audienceTime)}
              </p>
            </div>
            <div className="overflow-x-auto rounded-xl border border-[var(--border-hairline)]">
              <table className="w-full text-sm">
                <caption className="sr-only">{t.bestTimeToPost.tableCaption}</caption>
                <thead className="bg-[var(--bg-canvas-subtle)] text-xs text-[var(--text-muted)]">
                  <tr>
                    <th scope="col" className="px-3 py-2 text-left font-medium">
                      {t.bestTimeToPost.colDay}
                    </th>
                    <th scope="col" className="px-3 py-2 text-left font-medium">
                      {t.bestTimeToPost.colPublish}
                    </th>
                    <th scope="col" className="px-3 py-2 text-left font-medium">
                      {t.bestTimeToPost.colPeak}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-hairline)]">
                  {slots.map((slot) => (
                    <tr key={slot.peak.toISOString()}>
                      <th
                        scope="row"
                        className="px-3 py-2 text-left font-medium text-[var(--text-ink)]"
                      >
                        {day(yourZone).format(slot.publish)}
                      </th>
                      <td className="px-3 py-2 font-mono text-[var(--text-ink)]">
                        {time(yourZone).format(slot.publish)}
                      </td>
                      <td className="px-3 py-2 font-mono text-[var(--text-body)]">
                        {time(peakZone).format(slot.peak)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-[var(--text-body)] leading-relaxed">
              {t.bestTimeToPost.dstNote}
            </p>
          </div>
        ) : (
          <p className="py-16 text-center text-xs text-[var(--text-muted)]">
            {t.bestTimeToPost.loadingState}
          </p>
        )
      }
    />
  );
}
