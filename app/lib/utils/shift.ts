// lib/utils/shift.ts
import type { Shift } from "../script-docs/floor-coverage";

export function getChicagoShiftContext(now = new Date()): {
  shift: Shift;
  shiftDate: string;
} {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Chicago",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      weekday: "short",
      hour: "2-digit",
      hourCycle: "h23",
    })
      .formatToParts(now)
      .map((p) => [p.type, p.value]),
  );

  const shiftDate = `${parts.year}-${parts.month}-${parts.day}`;
  const hour = Number(parts.hour);
  const isWeekend = parts.weekday === "Sat" || parts.weekday === "Sun";

  const shift: Shift = isWeekend
    ? "weekend"
    : hour >= 14
      ? "weekday-evening"
      : "weekday-day";

  return { shift, shiftDate };
}