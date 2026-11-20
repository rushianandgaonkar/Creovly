// Turns a viewer peak hour into publish times, across time zones and DST changes.

/** Minutes the zone is ahead of UTC at the given instant. */
export function zoneOffsetMinutes(zone: string, at: Date): number {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-US', {
      timeZone: zone, hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit',
    }).formatToParts(at).map((part) => [part.type, part.value]),
  );
  const asUtc = Date.UTC(+parts.year, +parts.month - 1, +parts.day, +parts.hour, +parts.minute, +parts.second);
  return Math.round((asUtc - Math.floor(at.getTime() / 1000) * 1000) / 60000);
}

/** The instant when the wall clock in `zone` reads y-m-d h:min. */
export function zonedTimeToUtc(year: number, month: number, day: number, hour: number, minute: number, zone: string): Date {
  const guess = Date.UTC(year, month - 1, day, hour, minute);
  const first = zoneOffsetMinutes(zone, new Date(guess));
  const instant = guess - first * 60000;
  const second = zoneOffsetMinutes(zone, new Date(instant));
  return new Date(second === first ? instant : guess - second * 60000);
}

export function isValidTimeZone(zone: string): boolean {
  try {
    new Intl.DateTimeFormat('en-US', { timeZone: zone });
    return true;
  } catch {
    return false;
  }
}

export interface PublishSlot { peak: Date; publish: Date }

/** One slot per day for the next `days` days, counted in the peak's time zone. */
export function publishPlan(options: { peakZone: string; peakHour: number; leadMinutes: number; from: Date; days?: number }): PublishSlot[] {
  const { peakZone, peakHour, leadMinutes, from, days = 7 } = options;
  if (!isValidTimeZone(peakZone)) throw new Error('Choose a valid time zone.');
  if (!Number.isInteger(peakHour) || peakHour < 0 || peakHour > 23) throw new Error('Peak hour must be 0 to 23.');
  if (!Number.isFinite(leadMinutes) || leadMinutes < 0) throw new Error('Lead time cannot be negative.');
  const today = Object.fromEntries(
    new Intl.DateTimeFormat('en-US', { timeZone: peakZone, year: 'numeric', month: '2-digit', day: '2-digit' })
      .formatToParts(from).map((part) => [part.type, part.value]),
  );
  const slots: PublishSlot[] = [];
  for (let i = 0; i < days; i += 1) {
    const date = new Date(Date.UTC(+today.year, +today.month - 1, +today.day + i));
    const peak = zonedTimeToUtc(date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate(), peakHour, 0, peakZone);
    slots.push({ peak, publish: new Date(peak.getTime() - leadMinutes * 60000) });
  }
  return slots;
}
