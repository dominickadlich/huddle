'use client'

import GenrateCalendarDates from "./calendar-date-generator";
import { addMonths, format, parseISO, subMonths } from "date-fns";
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

          {/* Header */}
          <div className="grid grid-cols-7 text-xs/6 text-gray-400">
            <div>S</div>
            <div>M</div>
            <div>T</div>
            <div>W</div>
            <div>T</div>
            <div>F</div>
            <div>S</div>
          </div>
          <div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg text-sm ring-1 bg-white/15 shadow-none ring-white/15">
            {days.map((day) => (
              <button
                key={day.date}
                type="button"
                data-is-today={day.isToday ? "" : undefined}
                data-is-selected={day.isSelected ? "" : undefined}
                data-is-current-month={day.isCurrentMonth ? "" : undefined}
                onClick={() => handleDateClick(day.date)}
                className="py-1.5 first:rounded-tl-lg last:rounded-br-lg focus:z-10 data-is-selected:font-semibold data-is-today:font-semibold data-is-today:not-data-is-selected:text-indigo-400 nth-36:rounded-bl-lg nth-7:rounded-tr-lg not-data-is-current-month:bg-gray-900/75 not-data-is-selected:not-data-is-current-month:not-data-is-today:text-gray-500 hover:bg-gray-900/25 data-is-current-month:bg-gray-900/90 not-data-is-selected:data-is-current-month:not-data-is-today:text-white data-is-current-month:hover:bg-gray-900/50 data-is-selected:text-gray-900"
              >
                <time
                  dateTime={day.date}
                  className="mx-auto flex size-7 items-center justify-center rounded-full in-data-is-selected:in-data-is-today:bg-indigo-500 in-data-is-selected:not-in-data-is-today:bg-white dark:in-data-is-selected:in-data-is-today:bg-indigo-500"
                >
                  {format(parseISO(day.date), "d")}
                </time>
              </button>
            ))}
          </div>
          <div className="mt-5 flex items-center text-white">
            <button
              type="button"
              className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-500 hover:text-white"
              onClick={handleSubMonth}
            >
              <span className="sr-only">Previous month</span>
              <ChevronLeftIcon aria-hidden="true" className="size-5" />
            </button>
            <div className="flex-auto text-sm font-semibold">{format(currentMonth, 'MMMM yyyy')}</div>
            <button
              type="button"
              className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-500 hover:text-white"
              onClick={handleAddMonth}
            >
              <span className="sr-only">Next month</span>
              <ChevronRightIcon aria-hidden="true" className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
