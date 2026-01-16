'use client'

import { floorCoverage, findCoverageByFloor, type Coverage } from "../lib/floor-coverage";
import { SetStateAction, useEffect, useMemo, useState } from "react";
import Fuse from "fuse.js";
import StaticSearch from "../ui/static-search";

function getCurrentShift(): 'weekday-day' | 'weekday-evening' | 'weekend' {
    const now = new Date();
    const dayOfWeek = now.getDay()
    const hour = now.getHours()

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
            keys: ['team', 'floors', 'service', 'phone'],
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
                <div className="flex">
                    <div className="text-4xl font-bold pr-4">
                        WDIP: {shift.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </div>

                    {/* Search Bar */}
                    <div className="flex-3 justify-center">
                        <StaticSearch
                            placeholder={"Enter a team name, phone number, floor number, or service"} 
                            onChange={handleSearchQuery}
                            value={searchQuery}    
                        />
                    </div>
                </div>

                <div className="mb-4 flex items-center gap-4 mt-10">
                    <h2 className="flex items-center justify-start w-40 px-3 text-3xl font-bold text-indigo-400">
                        Team
                    </h2>
                    <h2 className="flex-1 flex items-center justify-center text-3xl font-bold text-indigo-400">
                        Number
                    </h2>
                    <h2 className="flex-1 flex items-center justify-center text-3xl font-bold text-indigo-400">
                        Floors
                    </h2>
                    <h2 className="flex-1 flex items-center justify-center text-3xl font-bold text-indigo-400">
                        Service
                    </h2>
                </div>
                
                {/* <div className="h-0.5 bg-indigo-500/50" /> */}

                {/* Information Row */}
                <div className="grid grid-cols-1 md:grid-cols-1 gap-6 ">
                    {displayedCoverage.map((coverage) => (
                        <div
                            key={coverage.team}
                            className="group relative overflow-hidden rounded-2xl border border-gray-400/50 bg-gray-800/30 backdrop-blur-sm transition-all duration-300 hover:bg-gray-800/50 hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/10"
                        >

                        {/* Gradient overlay on hover */}
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        {/* Content */}
                        <div className="relative z-10 flex items-center pl-2">

                        {/* Team Section */}
                        <div className="flex items-center justify-start w-40 px-3">
                            <h3 className="text-lg font-semibold text-white group-hover:text-indigo-300 transition-colors duration-300 truncate">
                                {coverage.team}
                            </h3>
                        </div>

                        {/* Divider */}
                        <div className="h-12 w-px bg-gradient-to-b from-transparent via-gray-700 to-transparent group-hover:via-indigo-500/50 transition-colors duration-300" />

                        {/* Extension Number */}
                        <div className="flex-1 flex items-center justify-center">
                            <p className="text-lg font-medium text-gray-300 group-hover:text-white transition-colors duration-300">
                                {coverage.phone}
                            </p>
                        </div>

                        {/* Divider */}
                        <div className="h-12 w-px bg-gradient-to-b from-transparent via-gray-700 to-transparent group-hover:via-indigo-500/50 transition-colors duration-300" />

                        {/* Floor Coverage */}
                        <div className="flex-1 flex items-center justify-center w-80">
                            <p className="text-lg font-medium text-gray-300 group-hover:text-white transition-colors duration-300">
                                {coverage.floors.join(', ')}
                            </p>
                        </div>

                        {/* Divider */}
                        <div className="h-12 w-px bg-gradient-to-b from-transparent via-gray-700 to-transparent group-hover:via-indigo-500/50 transition-colors duration-300" />

                        {/* Service */}
                        <div className="flex-1 flex items-center justify-center">
                            <p className="text-lg font-medium text-gray-300 group-hover:text-white transition-colors duration-300">
                                {coverage.service}
                            </p>
                        </div>
                    </div>

                     {/* Bottom accent line */}
                        <div className="absolute bottom-0 left-0 right-0 h-0.25 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}