import { ShiftType } from "./types/database";

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