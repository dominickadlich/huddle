'use client'

import GenrateCalendarDates from "./calendar-date-generator";
import { addMonths, format, parseISO, setDate, subMonths } from "date-fns";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Calendar() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const today = new Date();
    const selectedDate = searchParams.get('date')
    const [currentMonth, setCurrentMonth] = useState<Date>(today);

    const handleDateClick = (date: string) => {
        const params = new URLSearchParams(searchParams)
        params.set('date', date)
        router.push(`/dashboard/history?${params.toString()}`)
    }

    const days = GenrateCalendarDates(
        currentMonth,
        selectedDate ? parseISO(selectedDate) : null
    )

    function handleAddMonth() {
      const nextMonth = addMonths(currentMonth, 1)
      setCurrentMonth(nextMonth)
    }

    function handleSubMonth() {
      const prevMonth = subMonths(currentMonth, 1)
      setCurrentMonth(prevMonth)
    }

  return (
    <div>
      {/* Month Selector */}
      <div>
        <div className="text-center lg:col-start-8 lg:col-end-13 lg:row-start-1 xl:col-start-9">
          <div className="flex items-center text-gray-900 dark:text-white">
            <button
              type="button"
              className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-white"
              onClick={handleSubMonth}
            >
              <span className="sr-only">Previous month</span>
              <ChevronLeftIcon aria-hidden="true" className="size-5" />
            </button>
            <div className="flex-auto text-sm font-semibold">{format(currentMonth, 'MMMM yyyy')}</div>
            <button
              type="button"
              className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-white"
              onClick={handleAddMonth}
            >
              <span className="sr-only">Next month</span>
              <ChevronRightIcon aria-hidden="true" className="size-5" />
            </button>
          </div>

          {/* Header */}
          <div className="mt-6 grid grid-cols-7 text-xs/6 text-gray-500 dark:text-gray-400">
            <div>S</div>
            <div>M</div>
            <div>T</div>
            <div>W</div>
            <div>T</div>
            <div>F</div>
            <div>S</div>
          </div>
          <div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow-sm ring-1 ring-gray-200 dark:bg-white/15 dark:shadow-none dark:ring-white/15">
            {days.map((day) => (
              <button
                key={day.date}
                type="button"
                data-is-today={day.isToday ? "" : undefined}
                data-is-selected={day.isSelected ? "" : undefined}
                data-is-current-month={day.isCurrentMonth ? "" : undefined}
                onClick={() => handleDateClick(day.date)}
                className="py-1.5 not-data-is-current-month:bg-gray-50 not-data-is-selected:not-data-is-current-month:not-data-is-today:text-gray-400 first:rounded-tl-lg last:rounded-br-lg hover:bg-gray-100 focus:z-10 data-is-current-month:bg-white not-data-is-selected:data-is-current-month:not-data-is-today:text-gray-900 data-is-current-month:hover:bg-gray-100 data-is-selected:font-semibold data-is-selected:text-white data-is-today:font-semibold data-is-today:not-data-is-selected:text-indigo-600 nth-36:rounded-bl-lg nth-7:rounded-tr-lg dark:not-data-is-current-month:bg-gray-900/75 dark:not-data-is-selected:not-data-is-current-month:not-data-is-today:text-gray-500 dark:hover:bg-gray-900/25 dark:data-is-current-month:bg-gray-900/90 dark:not-data-is-selected:data-is-current-month:not-data-is-today:text-white dark:data-is-current-month:hover:bg-gray-900/50 dark:data-is-selected:text-gray-900 dark:data-is-today:not-data-is-selected:text-indigo-400"
              >
                <time
                  dateTime={day.date}
                  className="mx-auto flex size-7 items-center justify-center rounded-full in-data-is-selected:not-in-data-is-today:bg-gray-900 in-data-is-selected:in-data-is-today:bg-indigo-600 dark:in-data-is-selected:not-in-data-is-today:bg-white dark:in-data-is-selected:in-data-is-today:bg-indigo-500"
                >
                  {format(parseISO(day.date), "d")}
                </time>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
