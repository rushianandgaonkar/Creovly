'use client';

import { useEffect, useMemo, useState } from 'react';
import Select from '@/components/form/Select';
import ToolWorkspaceLayout from './ToolWorkspaceLayout';
import { publishPlan } from '@/lib/post-time';

const hourLabel = (hour: number) => `${hour % 12 || 12}:00 ${hour < 12 ? 'AM' : 'PM'}`;
const HOURS = Array.from({ length: 24 }, (_, hour) => ({ value: String(hour), label: hourLabel(hour) }));
const LEADS = [
  { value: '0', label: 'At the peak' },
  { value: '60', label: '1 hour before' },
  { value: '120', label: '2 hours before' },
  { value: '180', label: '3 hours before' },
];

const fmt = (zone: string, options: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat('en-US', { timeZone: zone, ...options });

export default function BestTimeToPost() {
  // Zones and "now" are browser facts; read them after mount so server and client HTML match.
  const [zones, setZones] = useState<string[]>(['UTC']);
  const [yourZone, setYourZone] = useState('UTC');
  const [peakZone, setPeakZone] = useState('UTC');
  const [now, setNow] = useState<Date>();
  const [peakHour, setPeakHour] = useState('18');
  const [lead, setLead] = useState('120');

  useEffect(() => {
    const detected = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
    const supported = (Intl as unknown as { supportedValuesOf?: (key: string) => string[] }).supportedValuesOf?.('timeZone') ?? [];
    setZones(Array.from(new Set(['UTC', detected, ...supported])).sort());
    setYourZone(detected);
    setPeakZone(detected);
    setNow(new Date());
  }, []);

  const zoneOptions = useMemo(() => zones.map((zone) => ({ value: zone, label: zone.replace(/_/g, ' ') })), [zones]);
  const slots = useMemo(
    // Plan one extra day so a slot already past today drops off and seven remain.
    () => (now ? publishPlan({ peakZone, peakHour: Number(peakHour), leadMinutes: Number(lead), from: now, days: 8 }).filter((slot) => slot.publish > now).slice(0, 7) : []),
    [now, peakZone, peakHour, lead],
  );

  const day = (zone: string) => fmt(zone, { weekday: 'short', month: 'short', day: 'numeric' });
  const time = (zone: string) => fmt(zone, { hour: 'numeric', minute: '2-digit' });
  const sameZone = yourZone === peakZone;
  const first = slots[0];

  return (
    <ToolWorkspaceLayout
      workspace={
        <div className="space-y-5">
          <p className="text-sm text-[var(--text-body)] leading-relaxed">
            In YouTube Studio, open Analytics, then the Audience tab, and find “When your viewers are on YouTube.” Enter the darkest hour from that card. Studio shows it in your local time.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select id="post-peak-hour" label="Audience peak hour" options={HOURS} value={peakHour} onChange={(event) => setPeakHour(event.target.value)} />
            <Select id="post-lead" label="Publish" options={LEADS} value={lead} onChange={(event) => setLead(event.target.value)} />
            <Select id="post-peak-zone" label="Peak hour time zone" options={zoneOptions} value={peakZone} onChange={(event) => setPeakZone(event.target.value)} />
            <Select id="post-your-zone" label="Your time zone" options={zoneOptions} value={yourZone} onChange={(event) => setYourZone(event.target.value)} />
          </div>
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            No Studio data yet? Set the time zone where most of your viewers live and an hour when they are usually free, such as 6:00 PM.
          </p>
        </div>
      }
      results={
        first ? (
          <div className="space-y-5">
            <div>
              <h2 className="text-sm font-semibold text-[var(--text-ink)]">Next publish time</h2>
              <p className="mt-2 font-mono text-3xl font-semibold text-[var(--text-ink)]">{time(yourZone).format(first.publish)}</p>
              <p className="mt-1 text-sm text-[var(--text-body)]">
                {day(yourZone).format(first.publish)}, your time{sameZone ? '' : ` (${time(peakZone).format(first.publish)} for your audience)`}.
              </p>
            </div>
            <div className="overflow-x-auto rounded-xl border border-[var(--border-hairline)]">
              <table className="w-full text-sm">
                <caption className="sr-only">Publish times for the next seven days</caption>
                <thead className="bg-[var(--bg-canvas-subtle)] text-xs text-[var(--text-muted)]">
                  <tr>
                    <th scope="col" className="px-3 py-2 text-left font-medium">Day</th>
                    <th scope="col" className="px-3 py-2 text-left font-medium">Publish, your time</th>
                    <th scope="col" className="px-3 py-2 text-left font-medium">Audience peak</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-hairline)]">
                  {slots.map((slot) => (
                    <tr key={slot.peak.toISOString()}>
                      <th scope="row" className="px-3 py-2 text-left font-medium text-[var(--text-ink)]">{day(yourZone).format(slot.publish)}</th>
                      <td className="px-3 py-2 font-mono text-[var(--text-ink)]">{time(yourZone).format(slot.publish)}</td>
                      <td className="px-3 py-2 font-mono text-[var(--text-body)]">{time(peakZone).format(slot.peak)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-[var(--text-body)] leading-relaxed">
              Times include daylight saving changes. Schedule the video in YouTube Studio at the publish time.
            </p>
          </div>
        ) : (
          <p className="py-16 text-center text-xs text-[var(--text-muted)]">Loading your time zone.</p>
        )
      }
    />
  );
}
