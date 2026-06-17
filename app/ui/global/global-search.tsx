'use client'

import { globalSearch } from "@/app/lib/actions/global-search";
import { useState, useEffect, SetStateAction } from "react";
import StaticSearch from "../static-search";
import SearchModal from "./search-modal";

export interface ResultData {
    department: string,
    date: string,
    summary: string
}

export default function GloabalSearch() {
    const [showModal, setShowModal] = useState<boolean>(false)
    const [value, setValue] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [results, setResults] = useState<ResultData[] | null>(null)

    function handleSetValue(e: { target: { value: SetStateAction<string> } }) {
        setValue(e.target.value);
    }

    useEffect(() => {
        if (value === '') return
        
        const timeout = setTimeout(() => {
            const search = async () => {
                setIsLoading(true)
                const result = await globalSearch(value)
                setResults(result.data)
                setIsLoading(false)
            }
            search()
        }, 500)

        return () => {
            clearTimeout(timeout)
        }
    }, [value])

    return(
        <>
        <div>
            <StaticSearch 
                placeholder={"Search recent huddle summaries"}
                onChange={handleSetValue}
                value={value}
                onFocus={() => setShowModal(true)}
            />
            <SearchModal 
                showModal={showModal}
                onClose={() => setShowModal(false)}
                onChange={handleSetValue}
                value={value} 
                isLoading={isLoading} 
                results={results}                
            />
        </div>
        </>
    )
}