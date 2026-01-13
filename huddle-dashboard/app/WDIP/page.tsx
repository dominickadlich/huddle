'use client'

import Header from "../ui/header";
import Search from "../ui/search";
import { floorCoverage, findCoverageByFloor, type Coverage } from "../lib/floor-coverage";
import { SetStateAction, useEffect, useMemo, useState } from "react";
import Fuse from "fuse.js";

function getCurrentShift(): 'weekday-day' | 'weekday-evening' | 'weekend' {
    const now = new Date();
    const dayOfWeek = now.getDay()
    const hour = now.getHours()

    console.log(`Date: ${now}`)
    console.log(`Date Day: ${dayOfWeek}`)
    console.log(`Date hour: ${hour}`)

    let shift: 'weekday-day' | 'weekday-evening' | 'weekend'

    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        if (hour >= 14) {
            shift = 'weekday-evening'
        } else {
            shift = 'weekday-day'
        }
    } else {
        shift = 'weekend'
    }
    return shift
}

export default function Page() {
    const [shift, setShift] = useState<'weekday-day' | 'weekday-evening' | 'weekend'>("weekday-day")
    const [searchQuery, setSearchQuery] = useState('')
    const [filteredCoverage, setFilteredCoverage] = useState<Coverage[]>([])

    const fuse = useMemo(
        () => new Fuse(filteredCoverage, {
            keys: ['team', 'floors', 'service'],
            threshold: 0.3
        }),
        [filteredCoverage]
    )
    

    function handleSearchQuery(e: { target: { value: SetStateAction<string>; }; }) {
        setSearchQuery(e.target.value)
    }

    // Calculate shift on mount
    useEffect(() => {
        const currentShift = getCurrentShift()
        setShift(currentShift)

        // Filter by current shift
        const shiftCoverage = floorCoverage.filter(c => c.shift === currentShift)
        setFilteredCoverage(shiftCoverage)
    }, [])

    // Filter by search query
    const displayedCoverage = searchQuery
        ? fuse.search(searchQuery).map(result => result.item)
        : filteredCoverage
    

    return (
        <>
            {/* <Header title="WDIP"/> */}
            <div className="mt-20">
                <div className="flex justify-center mt-10">
                    <Search placeholder={"Enter a service"} />
                </div>
                {/* <div className="flex justify-center text-3xl">
                    Date: {now}
                </div> */}
                <div className="flex justify-center text-3xl mt-20">
                    Current Staffing Schedule: {shift.charAt(0).toUpperCase() + shift.slice(1)}
                </div>
                <div className="flex justify-center mt-20">
                     <table className="rounded-2xl overflow-hidden border border-gray-400/50 border-separate border-spacing-0">
                        <thead>
                            <tr>
                                <th className="border-r border-b border-gray-400/50 bg-gray-800/30 py-4 pl-16 pr-16 text-white first:rounded-tl-2xl">Team</th>
                                <th className="border-r border-b border-gray-400/50 bg-gray-800/30 py-4 pl-16 pr-16 text-white">Phone</th>
                                <th className="border-r border-b border-gray-400/50 bg-gray-800/30 py-4 pl-16 pr-16 text-white">Floors</th>
                                <th className="border-b border-gray-400/50 bg-gray-800/30 py-4 pl-16 pr-16 text-white last:rounded-tr-2xl">Service</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayedCoverage.map((coverage, index) => (
                                <tr key={coverage.team}>
                                    <td className={`border-r border-gray-400/50 py-4 pl-16 pr-16 ${index === displayedCoverage.length - 1 ? 'first:rounded-bl-2xl' : 'border-b'}`}>{coverage.team}</td>
                                    <td className={`border-r border-gray-400/50 py-4 pl-16 pr-16 ${index !== displayedCoverage.length - 1 ? 'border-b' : ''}`}>{coverage.phone}</td>
                                    <td className={`border-r border-gray-400/50 py-4 pl-16 pr-16 ${index !== displayedCoverage.length - 1 ? 'border-b' : ''}`}>{coverage.floors.join(', ')}</td>
                                    <td className={`py-4 pl-16 pr-16 ${index === displayedCoverage.length - 1 ? 'last:rounded-br-2xl' : 'border-b'}`}>{coverage.service}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}