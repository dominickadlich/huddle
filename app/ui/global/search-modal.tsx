"use client"

import React, { SetStateAction, useEffect } from "react"
import type { ResultData } from "./search"
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react"
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { useRef } from "react"
import Link from "next/link"
import { formatDate } from "@/app/lib/utils/utils"
import { highlightMatch } from "@/app/lib/utils/highlight"
import Spinner from "./spinner"
import { DepartmentSearchResult } from "@/app/lib/department_search/distribution_search"

const DEPT_SEARCH_ROUTE: Record<string, string> = {
  "IV Room": "iv-room",
  "Command Center": "command-center",
  "Distribution": "distribution",
  "Non-Sterile": "non-sterile",
  "OR Pharmacy": "or-pharmacy",
  "Team Eight": "team-eight",
};

export type SearchResult = ResultData | DepartmentSearchResult

function isDepartmentResult(result: SearchResult): result is DepartmentSearchResult {
    return 'field_label' in result
}

function getResultHref(result: SearchResult, searchValue: string): string {
    const query = encodeURIComponent(searchValue)

    if (isDepartmentResult(result)) {
        const slug = DEPT_SEARCH_ROUTE[result.department]

        if (!slug) {
            console.error(`No route mapping for department: ${result.department}`)
            return '/dashboard'
        }
        return `/team-huddle/${slug}?date=${result.date}&field=${encodeURIComponent(result.field_label)}&q=${query}`
    }

    return `/dashboard/history?date=${result.date}&shift=morning&q=${query}`
}

export default function SearchModal({
    showModal,
    onClose,
    onChange,
    value,
    isLoading,
    hasSearched,
    results,
    placeholder,
}: {
    showModal: boolean,
    onClose: () => void,
    onChange: (e: { target: { value: SetStateAction<string> } }) => void;
    value: string,
    isLoading: boolean,
    hasSearched: boolean,
    results: SearchResult[] | null,
    placeholder?: string
}) {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (showModal === true) {
                inputRef.current?.focus()
            }
        }, 100)

        return () => {
            clearTimeout(timeout)
        }
    }, [showModal])

    return(
        <div>
            <Dialog open={showModal} onClose={onClose} className="relative z-10">
                <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-900/50 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
                />
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center mt-50 sm:items-start sm:p-0">
                    <DialogPanel
                    transition
                    className="relative transform overflow-hidden rounded-lg bg-gray-800 px-4 pt-4 pb-4 text-left shadow-xl outline -outline-offset-1 outline-white/10 transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-4xl sm:p-6 data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                    >
                        <div className="flex items-center rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500">
                        <MagnifyingGlassIcon className="h-5 w-5 text-white" />
                        <input
                            id="search"
                            name="search"
                            type="text"
                            placeholder={placeholder}
                            onChange={onChange}
                            value={value}
                            className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6"
                            ref={inputRef}
                        />
                        </div>
                    <div className="grid grid-cols-1 max-h-84 overflow-y-auto">
                        {isLoading && 
                            <Spinner />
                        }
                        {!isLoading && results?.length === 0 && hasSearched &&
                            <p className="flex justify-center mt-4">No Results</p>
                        }
                        {results && results.length > 0 &&
                          results.map((result) => (
                            <div key={formatDate(result.date) + result.summary} className="mt-4 border p-6 border-gray-700/50 hover:border-gray-400">
                                <Link href={getResultHref(result, value)} className="grid grid-cols-1">
                                    <div>
                                        <span className="mb-2">{formatDate(`${result.date}T00:00:00`)}</span>
                                        {isDepartmentResult(result) &&
                                            <span className="text-xs text-gray-400">{result.field_label}</span>
                                        }
                                    </div>
                                    <div className="">{highlightMatch(result.summary, value)}</div>
                                </Link>
                            </div>
                          ))
                        }
                    </div>
                    </DialogPanel>
                </div>
                </div>
            </Dialog>
        </div>
    )
}