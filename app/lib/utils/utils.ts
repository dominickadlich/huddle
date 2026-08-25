import { ShiftType } from "../types/database";

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

export const getLocalDate = () => {
    return new Intl.DateTimeFormat('en-CA', {
        timeZone: 'America/Chicago',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).format(new Date());
};

export const getLocalDateFormatted = () => {
    const parts = new Intl.DateTimeFormat('en-CA', {
        timeZone: 'America/Chicago',
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
    timeZone: 'America/Chicago',
    month: '2-digit',
    day: '2-digit',
    year: 'numeric'
  })
}


