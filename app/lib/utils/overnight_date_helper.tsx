const CHICAGO_TZ = 'America/Chicago';

function getChicagoDateParts(date: Date): { dateStr: string; hour: number } {
  const dateStr = new Intl.DateTimeFormat('en-CA', {
    timeZone: CHICAGO_TZ,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date); // "YYYY-MM-DD"

  const hour = Number(
    new Intl.DateTimeFormat('en-US', {
      timeZone: CHICAGO_TZ,
      hour: '2-digit',
      hourCycle: 'h23',
    }).format(date)
  );

  return { dateStr, hour };
}

function addDays(dateStr: string, days: number): string {
  const [y, m, d] = dateStr.split('-').map(Number);
  const utcDate = new Date(Date.UTC(y, m - 1, d));
  utcDate.setUTCDate(utcDate.getUTCDate() + days);
  return utcDate.toISOString().slice(0, 10);
}

export function isOvernightStillActive(createdAt: Date, now: Date = new Date()): boolean {
  const created = getChicagoDateParts(createdAt);
  // If created before 19:00, it expires later THAT day; if at/after 19:00, next day.
  const cutoffDateStr = created.hour < 19 ? created.dateStr : addDays(created.dateStr, 1);

  const current = getChicagoDateParts(now);

  if (current.dateStr < cutoffDateStr) return true;
  if (current.dateStr > cutoffDateStr) return false;
  return current.hour < 19; // same day as cutoff — active only until 19:00
}