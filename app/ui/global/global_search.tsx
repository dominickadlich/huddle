'use client'

import { globalSearch } from "@/app/lib/actions/global-search";
import { useState, useEffect } from "react";

interface ResultData {
    department: string,
    date: string,
    summary: string
}

export default function GloabalSearch({
    resultData
}: {
    resultData: Promise<{
        department?: string,
        date?: string,
        summary?: string
    }>
}) {
    const [showModal, setShowModal] = useState<boolean>(false)
    const [value, setValue] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [results, setResults] = useState<ResultData[] | null>(null)

    // setTimeout example:
    // setTimeout(() => { console.log("some message")}, 5000)

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

        </div>
        </>
    )
}