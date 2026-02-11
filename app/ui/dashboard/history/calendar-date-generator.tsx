import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  isSameDay,
  isToday,
  isSameMonth,
  format,
} from "date-fns";

export default function GenrateCalendarDates(
  currentMonth: Date,
  selectedDate: Date | null,
) {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  const days = eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd,
  });

  return days.map((day) => ({
    date: format(day, "yyyy-MM-dd"),
    isToday: isToday(day),
    isSelected: selectedDate ? isSameDay(day, selectedDate) : false,
    isCurrentMonth: isSameMonth(day, currentMonth),
  }));
}
