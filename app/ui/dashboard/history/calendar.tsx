import { useState } from 'react'
import GenrateCalendarDates from "./calendar-dates";
import { format, parseISO } from 'date-fns';

export default function Calendar() {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const today = new Date()

    const days = GenrateCalendarDates(today, selectedDate)

    return (
        <div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow-sm ring-1 ring-gray-200 dark:bg-white/15 dark:shadow-none dark:ring-white/15">
            {days.map((day) => (
                <button
                    key={day.date}
                    type="button"
                    data-is-today={day.isToday ? '' : undefined}
                    data-is-selected={day.isSelected ? '' : undefined}
                    data-is-current-month={day.isCurrentMonth ? '' : undefined}
                    onClick={() => setSelectedDate(parseISO(day.date))}
                    className="py-1.5 not-data-is-current-month:bg-gray-50 not-data-is-selected:not-data-is-current-month:not-data-is-today:text-gray-400 first:rounded-tl-lg last:rounded-br-lg hover:bg-gray-100 focus:z-10 data-is-current-month:bg-white not-data-is-selected:data-is-current-month:not-data-is-today:text-gray-900 data-is-current-month:hover:bg-gray-100 data-is-selected:font-semibold data-is-selected:text-white data-is-today:font-semibold data-is-today:not-data-is-selected:text-indigo-600 nth-36:rounded-bl-lg nth-7:rounded-tr-lg dark:not-data-is-current-month:bg-gray-900/75 dark:not-data-is-selected:not-data-is-current-month:not-data-is-today:text-gray-500 dark:hover:bg-gray-900/25 dark:data-is-current-month:bg-gray-900/90 dark:not-data-is-selected:data-is-current-month:not-data-is-today:text-white dark:data-is-current-month:hover:bg-gray-900/50 dark:data-is-selected:text-gray-900 dark:data-is-today:not-data-is-selected:text-indigo-400"
                >
                <time
                    dateTime={day.date}
                    className="mx-auto flex size-7 items-center justify-center rounded-full in-data-is-selected:not-in-data-is-today:bg-gray-900 in-data-is-selected:in-data-is-today:bg-indigo-600 dark:in-data-is-selected:not-in-data-is-today:bg-white dark:in-data-is-selected:in-data-is-today:bg-indigo-500"
                >
                    {format(parseISO(day.date), 'd')}
                </time>
                </button>
           ))}
        </div>
    )
}