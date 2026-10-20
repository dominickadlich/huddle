import { ShiftType } from "../types/database";

const CHICAGO_TZ = 'America/Chicago';

export function getCurrentShift(): ShiftType {
  const hour = new Date().getHours();

  switch (true) {
    case hour >= 7 && hour < 14:
      return "morning";
    case hour >= 14 && hour < 22:
      return "afternoon";
    default:
      return "evening";
  }
}

export function weekdayOf(date: string) {
    // Noon UTC keeps the date stable. `new Date('2026-10-15')` is midnight UTC,
    // which is still Oct 14 in Chicago.
    return new Date(`${date}T12:00:00Z`).getUTCDay();
}

export const getLocalDate = () => {
    return new Intl.DateTimeFormat('en-CA', {
        timeZone: CHICAGO_TZ,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).format(new Date());
};

export const getLocalDateFormatted = () => {
    const parts = new Intl.DateTimeFormat('en-CA', {
        timeZone: CHICAGO_TZ,
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
    }).formatToParts(new Date());
    const get = (type: string) => parts.find(p => p.type === type)?.value ?? '';
    return `${get('month')}/${get('day')}/${get('year')}`;
};

export function formatDate(date: string | null): string {
  if (!date) return 'No data'
  const localDate = new Date(date)
  return localDate.toLocaleDateString('en-US', {
    timeZone: CHICAGO_TZ,
    month: '2-digit',
    day: '2-digit',
    year: 'numeric'
  })
}


const OVERNIGHT_RESET_HOUR = 21;

export function getOvernightAnchorDate(now: Date = new Date()): string {
  const dateStr = new Intl.DateTimeFormat('en-CA', {
    timeZone: CHICAGO_TZ,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(now); // "YYYY-MM-DD"

  const hour = Number(
    new Intl.DateTimeFormat('en-US', {
      timeZone: CHICAGO_TZ,
      hour: '2-digit',
      hourCycle: 'h23',
    }).format(now)
  );

  if (hour >= OVERNIGHT_RESET_HOUR) return dateStr;

  const [y, m, d] = dateStr.split('-').map(Number);
  const prev = new Date(Date.UTC(y, m - 1, d));
  prev.setUTCDate(prev.getUTCDate() - 1);
  return prev.toISOString().slice(0, 10);
}