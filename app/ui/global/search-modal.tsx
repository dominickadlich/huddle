"use client"

import React, { SetStateAction, useEffect } from "react"
import type { ResultData } from "./global-search"
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react"
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { useRef } from "react"

export default function SearchModal({
    showModal,
    onClose,
    onChange,
    value,
    isLoading,
    results,
}: {
    showModal: boolean,
    onClose: () => void,
    onChange: (e: { target: { value: SetStateAction<string> } }) => void;
    value: string,
    isLoading: boolean,
    results: ResultData[] | null,
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
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                    transition
                    className="relative transform overflow-hidden rounded-lg bg-gray-800 px-4 pt-4 pb-4 text-left shadow-xl outline -outline-offset-1 outline-white/10 transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-4xl sm:p-6 data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                    >
                        {/* <div className="gap-x-6 gap-y-6"> */}
                            {/* <div className="sm:col-span-4"> */}
                            {/* <div className="mt-2"> */}
                                <div className="flex items-center rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500">
                                <MagnifyingGlassIcon className="h-5 w-5 text-white" />
                                <input
                                    id="search"
                                    name="search"
                                    type="text"
                                    placeholder={"Search huddle summaries"}
                                    onChange={onChange}
                                    value={value}
                                    className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6"
                                    ref={inputRef}
                                />
                                </div>
                            {/* </div> */}
                            {/* </div> */}
                        {/* </div> */}
                    </DialogPanel>
                </div>
                </div>
            </Dialog>
        </div>
    )
}