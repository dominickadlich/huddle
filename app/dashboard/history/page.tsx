"use client"

import { fetchDailySummaryWithUpdates } from "@/app/lib/data";
import { ShiftType } from "@/app/lib/types/database";
import Calendar from "@/app/ui/dashboard/history/calendar";
import ShiftButtons from "@/app/ui/dashboard/history/shift-buttons";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline"
import { useState } from "react"

export default function Page() {
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedShift, setSelectedShift] = useState<ShiftType | null>(null);

    // Fetch data when date/shift change
    const data = fetchDailySummaryWithUpdates(selectedDate, selectedShift)

    if (!data || data === null) {
        return null
    }

    return (
        <div>
            {/* Month Selector */}
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-16">
        <div className="mt-10 text-center lg:col-start-8 lg:col-end-13 lg:row-start-1 lg:mt-9 xl:col-start-9">
          <div className="flex items-center text-gray-900 dark:text-white">
            <button
              type="button"
              className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-white"
            >
              <span className="sr-only">Previous month</span>
              <ChevronLeftIcon aria-hidden="true" className="size-5" />
            </button>
            <div className="flex-auto text-sm font-semibold">January</div>
            <button
              type="button"
              className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-white"
            >
              <span className="sr-only">Next month</span>
              <ChevronRightIcon aria-hidden="true" className="size-5" />
            </button>
          </div>

          {/* Header */}
          <div className="mt-6 grid grid-cols-7 text-xs/6 text-gray-500 dark:text-gray-400">
            <div>M</div>
            <div>T</div>
            <div>W</div>
            <div>T</div>
            <div>F</div>
            <div>S</div>
            <div>S</div>
          </div>

          {/* TODO: Caledar */}
          <Calendar />

          {/* Shift Buttons */}
          <ShiftButtons />
          
        </div>
        </div>
        </div>
    )
}