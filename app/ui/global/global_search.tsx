import { useState } from "react";

interface ResultData {
    department: string,
    date: string,
    summary: string
}

export default function GloabalSearch() {
    const [showModal, setShowModal] = useState<boolean>(false)
    const [value, setValue] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [results, setResults] = useState<ResultData[] | null>(null)

    return(
        <>
        </>
    )
}