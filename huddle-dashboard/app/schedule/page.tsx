"use client";

import { SetStateAction, useMemo, useState } from "react";
import StaticSearch from "../ui/static-search";
import { schedule, Shift } from "../lib/schedule";
import Fuse from "fuse.js";

function formatDateToCSVFormat(date: Date) {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear() % 100;
  return `${month}/${day}/${year}`;
}

export default function Page() {
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState<'all' | 'today' | 'week'>('all')

  const now: Date = new Date();
  const today = formatDateToCSVFormat(now);

  const fuse = useMemo(
    () => new Fuse(schedule, {
        keys: ["name", "team", "date", "shiftName"],
        threshold: 0.3,
      }),
    [],
  );

  function handleSearchQuery(e: { target: { value: SetStateAction<string> } }) {
    setSearchQuery(e.target.value);
  }

  let dateFilterShifts = schedule
  if (dateFilter === 'today') {
    dateFilterShifts = schedule.filter(s => s.date === today)
  } else if (dateFilter === 'week') {
    // Show next 7 days
    const weekDates = [...new Set(schedule.map(s => s.date))].slice(0, 7)
    dateFilterShifts = schedule.filter(s => weekDates.includes(s.date))
  }

  // Filter by search query
  const displayedShifts = searchQuery
    ? fuse.search(searchQuery).map(r => r.item)
    : dateFilterShifts

  return (
    <>
      {/* <Header title="WDIP"/> */}
      <div className="mt-20">
        <div className="flex">
          <div className="text-4xl font-bold pr-4">
            Schedule
          </div>


          {/* Search Bar */}
          <div className="flex-3 justify-center">
            <StaticSearch
              placeholder={"Enter a team, name, date, or shift title"}
              onChange={handleSearchQuery}
              value={searchQuery}
            />
          </div>
        </div>

        <div className="mt-10">
            <div className="flex justify-center">
        {/* <div className="text-4xl font-bold pr-4">
            {now.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })}
          </div> */}

        {/* Filters */}
          <div className="flex items-center">
            {/* Date Filter Buttons */}
            <div className="flex gap-20">
                <button
                    onClick={() => setDateFilter('all')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                            dateFilter === 'all' 
                                ? 'bg-indigo-600 text-white' 
                                : 'bg-gray-800/30 text-gray-300 hover:bg-gray-700/50'
                        }`}
                >
                    All Dates
                </button>
                <button
                    onClick={() => setDateFilter('today')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                            dateFilter === 'all' 
                                ? 'bg-indigo-600 text-white' 
                                : 'bg-gray-800/30 text-gray-300 hover:bg-gray-700/50'
                        }`}
                >
                    Today
                </button>
                <button
                    onClick={() => setDateFilter('week')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                            dateFilter === 'all' 
                                ? 'bg-indigo-600 text-white' 
                                : 'bg-gray-800/30 text-gray-300 hover:bg-gray-700/50'
                        }`}
                >
                    Week
                </button>
            </div>
          </div>
      </div>
      </div>
      </div>
      
      <p className="text-sm text-gray-400 mb-4">
        Showing {displayedShifts.length} shifts
        </p>

      {/* Table */}
            <div className="overflow-x-auto rounded-lg border border-gray-400/50">
                <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-gray-800/50">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                                Name
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                                Team
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                                Date
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                                Shift
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {displayedShifts.map((shift, index) => (
                            <tr 
                                key={shift.name + shift.date}
                                className="hover:bg-gray-800/30 transition-colors"
                            >
                                <td className="px-6 py-4 text-sm text-white">
                                    {shift.name}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-300">
                                    {shift.team}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-300">
                                    {shift.date}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-300">
                                    {shift.shiftName}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}