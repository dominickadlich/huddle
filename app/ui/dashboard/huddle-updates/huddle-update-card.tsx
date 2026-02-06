'use client'

import { useEffect, useRef, useState } from "react";
// import { upsertDailySummaryField } from "@/app/lib/actions/daily-summary";
import {
    ArrowsPointingOutIcon,
    LockClosedIcon,
    BeakerIcon,
    EyeDropperIcon,
    PresentationChartLineIcon,
    PencilIcon,
    CheckIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import { upsertHuddleUpdate, upsertHuddleUpdateField } from "@/app/lib/actions/huddle-updates";

const iconMap = {
  distribution: ArrowsPointingOutIcon,
  csr: LockClosedIcon,
  ivr: BeakerIcon,
  nonsterile: EyeDropperIcon,
  rx_leadership: PresentationChartLineIcon
};

export default function HuddleUpdateCard({
    id,
    title,
    value,
    type,
}: {
    id: string | null | undefined;
    title: string;
    value: number | string | null | undefined;
    type:
        | "distribution"
        | "csr"
        | "ivr"
        | "nonsterile"
        | "rx_leadership";
}) {
  const Icon = iconMap[type];
  const [isEditing, setIsEditing] = useState<boolean | null>(false)
  const [inputValue, setInputValue] = useState<string | null>('')
  const [message, setMessage] = useState<string | null>(null)

  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    // Check if click is outside cardRef
    if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
      setIsEditing(false);
    }
  };

  // Add listener
  document.addEventListener('mousedown', handleClickOutside);
  // Clean up listener
  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, [isEditing]);

// TODO: Create query for individual upsert huddle update
//   const handleSave = async () => {
//     setMessage(null)
//     const result = await upsertHuddleUpdateField(type, inputValue) 

//     if (result) {
//         setMessage(result.message)
//     }
//   }


  return (
    <>
        {/* Outline on hover */}
        <div 
            className="group relative overflow-hidden rounded-2xl border border-gray-400/50 bg-gray-800/30 backdrop-blur-sm p-6 transition-all duration-300 hover:bg-gray-800/50 hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/10"
            onClick={() => !isEditing && setIsEditing(true)}
            ref={cardRef}
        >

        {/* Gradient overlay on hover */}
        {!isEditing && (
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/50 to-purple-500/50 opacity-0 group-hover:opacity-50 duration-300">
                <div className="flex items-center justify-center h-full">
                    <PencilIcon className="h-8 w-8 text-white" />
                </div>
            </div>
        )}

        {/* Content */}
        <div className="relative z-10">
            {/* Header with Icon */}
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-700/50 group-hover:border-indigo-500/30 transition-colors duration-300">
                {isEditing &&
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsEditing(false);
                    }}>
                        <XMarkIcon className="h-8 w-8 text-md font-semibold text-red-700 hover:text-red-500 transition-colors duration-300" />
                    </button>}
                    <div className="flex items-center justify-center gap-2 flex-1">
                        <Icon className="h-6 w-6 text-md font-semibold text-gray-300 group-hover:text-indigo-300 transition-colors duration-300" />
                        <h3 className="text-lg font-semibold text-gray-300 group-hover:text-indigo-300 transition-colors duration-300">
                            {title}
                        </h3>
                    </div>
                {isEditing &&
                  <button
                    onClick={(e) => {
                        e.stopPropagation();
                        // handleSave();
                        setIsEditing(false);
                    }}>
                    <CheckIcon className="h-8 w-8 text-md font-semibold text-green-700 hover:text-green-500 transition-colors duration-300"/>
                </button>}
            </div>
            </div>

            {/* Value Display */}
            <div className="flex justify-center items-center min-h-[2rem]">
                {isEditing
                    ? <input
                        onKeyDown={(e) => {
                            if (e.key === 'Escape') setIsEditing(false)
                            if (e.key === 'Enter') {
                                // handleSave();
                                setIsEditing(false);
                            }
                        }}
                        autoFocus
                        name={type}
                        type="text"
                        onChange={e => setInputValue(e.target.value)}
                        value={inputValue?.toString()}
                        placeholder={`${title}`}
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                    />
                    : <p className="text-xl font-bold text-white group-hover:text-indigo-200 transition-colors duration-300">{value}</p>
                }
                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-0.25 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
        </div>
    </>
  );
}
