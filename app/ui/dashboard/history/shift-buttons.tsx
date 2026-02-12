"use client";

import { ShiftType } from "@/app/lib/types/database";
import { useRouter, useSearchParams } from "next/navigation";

export default function ShiftButtons() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const selectedShift = searchParams.get('shift')

    const handleShiftClick = (shift: ShiftType) => {
        const params = new URLSearchParams(searchParams)
        params.set('shift', shift)
        router.push(`/dashboard/history?${params.toString()}`)
    }

    const shifts: ShiftType[] = ["morning", "afternoon", "evening"];

  return (
    <div className="flex grid grid-1">
      {shifts.map((shift) => (
        <button
          key={shift}
          type="button"
          className={`mt-8 w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm
            ${selectedShift === shift 
                ? 'bg-indigo-700 hover:bg-indigo-600' 
                : 'bg-indigo-600 hover:bg-indigo-500'
            }
            hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:shadow-none dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500`}
          onClick={() => handleShiftClick(shift)}
        >
          {shift.charAt(0).toUpperCase() + shift.slice(1)}
        </button>
      ))}
    </div>
  );
}
