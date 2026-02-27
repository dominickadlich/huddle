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


export const getLocalDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;  // Local YYYY-MM-DD
};

export const getLocalDateFormatted = () => {
    const now = new Date();
    const year = now.getFullYear() % 100;
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${month}/${day}/${year}`;  // Local YYYY-MM-DD
};