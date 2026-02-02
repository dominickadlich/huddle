'use client'

import { SetStateAction, useMemo, useState } from 'react'
import StaticSearch from "../ui/static-search"
import { schedule, Shift } from '../lib/script-docs/schedule'
import Fuse from 'fuse.js'

function formatDateToCSVFormat(date: Date): string {
    const month = date.getMonth() + 1
    const day = date.getDate()
    const year = date.getFullYear() % 100
    return `${month}/${day}/${year}`
}

type WideScheduleRow = {
  name: string
  team: string
  shifts: { [date: string]: string }
}

function transformToWideFormat(shifts: Shift[]): {
  dates: string[]
  people: WideScheduleRow[]
} {
  // Get all unique dates, sorted
  const dates = [...new Set(shifts.map(s => s.date))].sort((a, b) => {
    return new Date(a).getTime() - new Date(b).getTime()
  })

  // Get all unique people
  const uniquePeople = [...new Set(shifts.map(s => s.name))]

  // Build wide format
  const people: WideScheduleRow[] = uniquePeople.map(name => {
    const personShifts = shifts.filter(s => s.name === name)
    const team = personShifts[0]?.team || ''

    const shiftsMap: { [date: string]: string } = {}
    dates.forEach(date => {
      const shift = personShifts.find(s => s.date === date)
      shiftsMap[date] = shift?.shiftName || '-'
    })

    return { name, team, shifts: shiftsMap }
  })

  return { dates, people }
}

export default function Page() {
    const [searchQuery, setSearchQuery] = useState('')
    const [dateRange, setDateRange] = useState<'week' | 'month' | 'all'>('all')

    const now = new Date()
    const today = formatDateToCSVFormat(now)

    const fuse = useMemo(
        () => new Fuse(schedule, {
            keys: ['name', 'team', 'shiftName'],
            threshold: 0.3
        }),
        []
    )

    function handleSearchQuery(e: { target: { value: SetStateAction<string> } }) {
        setSearchQuery(e.target.value)
    }

    // Apply date range filter
    let dateFilteredShifts = schedule
    if (dateRange === 'week') {
        // Get unique dates and take first 7
        const allDates = [...new Set(schedule.map(s => s.date))].sort()
        const weekDates = allDates.slice(0, 7)
        dateFilteredShifts = schedule.filter(s => weekDates.includes(s.date))
    } else if (dateRange === 'month') {
        const allDates = [...new Set(schedule.map(s => s.date))].sort()
        const monthDates = allDates.slice(0, 30)
        dateFilteredShifts = schedule.filter(s => monthDates.includes(s.date))
    }

    // Apply search filter (searches people, not individual shifts)
    let displayedShifts = dateFilteredShifts
    if (searchQuery) {
        const searchResults = fuse.search(searchQuery).map(r => r.item)
        const matchedNames = [...new Set(searchResults.map(s => s.name))]
        displayedShifts = dateFilteredShifts.filter(s => matchedNames.includes(s.name))
    }

    // Transform to wide format for display
    const { dates, people } = transformToWideFormat(displayedShifts)

    return (
        <div className="mt-20 px-4">
            <div className="flex mb-4">
                <h1 className="text-4xl font-bold pr-4">Schedule</h1>
                <div className="flex-1">
                    <StaticSearch
                        placeholder="Search by name, team, or shift..."
                        onChange={handleSearchQuery}
                        value={searchQuery}    
                    />
                </div>
            </div>

            <div className='flex justify-between'>
                <p className="text-gray-400">
                    {now.toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                    })}
                </p>

                <p className="text-gray-400 mb-4">
                Showing {people.length} people × {dates.length} days
                </p>
            </div>

            {/* Filters */}
            {/* <div className="flex gap-4 mb-6 items-center">
                <div className="flex gap-2">
                    <button 
                        onClick={() => setDateRange('week')}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                            dateRange === 'week' 
                                ? 'bg-indigo-600 text-white' 
                                : 'bg-gray-800/30 text-gray-300 hover:bg-gray-700/50'
                        }`}
                    >
                        This Week
                    </button>
                    <button 
                        onClick={() => setDateRange('month')}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                            dateRange === 'month' 
                                ? 'bg-indigo-600 text-white' 
                                : 'bg-gray-800/30 text-gray-300 hover:bg-gray-700/50'
                        }`}
                    >
                        This Month
                    </button>
                    <button 
                        onClick={() => setDateRange('all')}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                            dateRange === 'all' 
                                ? 'bg-indigo-600 text-white' 
                                : 'bg-gray-800/30 text-gray-300 hover:bg-gray-700/50'
                        }`}
                    >
                        Full Schedule
                    </button>
                </div>
            </div> */}


            {/* Wide format table */}
            <div className="overflow-x-auto rounded-lg border border-gray-400/50">
                <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-gray-800/50 sticky top-0">
                        <tr>
                            <th className="sticky left-0 z-10 bg-gray-900 px-6 py-3 text-left text-sm font-semibold text-white border-r border-gray-700">
                                Name
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-white border-r border-gray-700">
                                Team
                            </th>
                            {dates.map(date => (
                                <th key={date} className="px-4 py-3 text-center text-sm font-semibold text-white">
                                    {date}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {people.map((person) => (
                            <tr key={person.name} className="hover:bg-gray-800/30 transition-colors">
                                <td className="sticky left-0 z-10 bg-gray-900 px-6 py-4 text-sm font-medium text-white border-r border-gray-700">
                                    {person.name}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-300 border-r border-gray-700">
                                    {person.team}
                                </td>
                                {dates.map(date => (
                                    <td 
                                        key={date} 
                                        className={`px-4 py-4 text-sm text-center border-r border-gray-700 ${
                                            person.shifts[date] === '-' 
                                                ? 'text-gray-600' 
                                                : 'text-gray-200 font-medium'
                                        }`}
                                    >
                                        {person.shifts[date]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}