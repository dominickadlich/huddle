'use client'

import { globalSearch } from "@/app/lib/actions/global-search";
import { useState, useEffect, SetStateAction, useRef } from "react";
import SearchModal, { SearchResult } from "./search-modal";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export interface SearchAction {
    (input: string): Promise<{
        success: boolean,
        message: string,
        data: SearchResult[] | null
    }>
}

export interface ResultData {
    department: string,
    date: string,
    summary: string
}

export default function Search({
    searchAction,
    placeholder = "Search huddle history",
}: {
    searchAction: SearchAction,
    placeholder?: string
}) {
    const [showModal, setShowModal] = useState<boolean>(false)
    const [value, setValue] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [results, setResults] = useState<ResultData[] | null>(null)
    const [hasSearched, setHasSearched] = useState<boolean>(false)
    const blurRef = useRef<HTMLInputElement>(null);

    function handleSetValue(e: { target: { value: SetStateAction<string> } }) {
        setValue(e.target.value);
    }
    
    useEffect(() => {
        const timeout = setTimeout(() => {
            if (showModal === false) {
                blurRef.current?.blur()
            }
        }, 250)

        return () => {
            clearTimeout(timeout)
        }
    }, [showModal])

    useEffect(() => {
        if (value === '') return
        
        const timeout = setTimeout(() => {
            const search = async () => {
                setIsLoading(true)
                const result = await searchAction(value)
                setResults(result.data)
                setHasSearched(true)
                setIsLoading(false)
            }
            search()
        }, 500)

        return () => {
            clearTimeout(timeout)
        }
    }, [value, searchAction])

    return(
        <>
        <div className="flex flex-1 max-w-4xl">
            <div className="relative flex flex-1 flex-shrink-0">
                {/* Search Icon */}
                <label htmlFor="search" className="sr-only">
                    Search
                </label>
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                    <MagnifyingGlassIcon className="h-5 w-5 text-white" />
                </div>

                {/* Search Input */}
                <input
                    id="search"
                    className="peer block w-full rounded-2xl border border-gray-400/50 bg-gray-800/30 py-2 pl-16 pr-4 text-white placeholder:text-gray-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 focus:bg-gray-800/50 hover:border-gray-600/50"
                    placeholder={placeholder}
                    onClick={() => setShowModal(true)}
                    ref={blurRef}
                />
            </div>
            <SearchModal 
                showModal={showModal}
                onClose={() => {
                    setShowModal(false)
                    setResults(null)
                    setValue('')
                    setHasSearched(false)
                }}
                onChange={handleSetValue}
                value={value} 
                isLoading={isLoading}
                hasSearched={hasSearched}
                results={results}                
            />
        </div>
        </>
    )
}