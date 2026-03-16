'use client'

import { useRouter } from "next/navigation"
import { type DashboardData } from "../lib/types/database"
import { useState } from "react"
import { formatDate, getCurrentShift, getLocalDate } from "../lib/utils"
import { DateCard } from "../ui/global/header"
import { CancelButton, EditButton, SubmitButton } from "../ui/global/buttons"
import HuddleCard from "../ui/dashboard/v2/huddle-card"
import SummaryCard from "../ui/dashboard/v2/summary-card"
import { AnnouncementTextArea } from "../ui/mini-huddle/shared-text-area"
import { upsertDailySummary } from "../lib/actions/daily-summary"
import { upsertHuddleUpdateField } from "../lib/actions/huddle-updates"

const dashboardCardFields = [
    { key: "census", title: "Census" },
    { key: "tpn" , title: "TPN" },
    { key: "hazardous" , title: "Hazardous" },
    { key: "staffing", title: "Staffing" },
    { key: "shift_lead", title: "Shift Lead" },
] as const;

const huddleUpdateFields = [
    { key: "distribution", title: "Distribution", department: "Distribution" },
    { key: "ivr", title: "IV Room", department: "IVR"},
    { key: "csr" , title: "Command Center", department: "CSR" },
    { key: "rx_leadership", title: "RX Leadership", department: "RX Leadership" },
    // { key: "nonsterile", title: "Non Sterile" department: "Nonsterile"},
] as const;

export default function DashboardPageClient({
    initialData,
}: {
    initialData?: DashboardData
}) {
    const router = useRouter();
    const [isEditMode, setIsEditMode] = useState(false);
    const [fields, setFields] = useState<DashboardData | null>(initialData ?? null);
    const clientDate =  getLocalDate()
    const clientShift = getCurrentShift();


    if (!fields) {
        return (
            <div className="mt-20">
            <div className="flex justify-between items-center pb-6 mb-8 border-b-2 border-indigo-500/30">
                <h1 className="text-4xl font-bold">Huddle Dashboard</h1>
                <DateCard />
            </div>
            <p className="text-gray-400">No huddle data available for today.</p>
            </div>
        )
    }

    return (
        <div className="mt-20">
            <div className="flex justify-between items-center pb-6 mb-8 border-b-2 border-indigo-500/30">
                {/* Left */}
                <h1 className="text-4xl font-bold">Huddle Dashboard</h1>
                
                {/* Right */}
                <DateCard />
            </div>

        <div className="mt-10 lg:grid grid-cols-[20%_1fr] gap-6">
            <div>
                <AnnouncementTextArea 
                    value={fields?.daily_summary.announcements}
                    isEditMode={isEditMode}
                    onChange={(val) => 
                        setFields({
                            ...fields,
                            daily_summary: {
                                ...fields?.daily_summary,
                                announcements: val
                            }
                        })
                    }
                />
            </div>
        

            <div>
                <div className="flex justify-between gap-4 mb-4"> 
                    <div className="flex gap-4">
                        {isEditMode 
                            ? ( 
                                <>
                                    <CancelButton onClick={() => setIsEditMode(false)}/>
                                    <SubmitButton onClick={async () => {
                                        const dsDataToSave = {
                                            ...fields.daily_summary,
                                            date: clientDate,
                                            shift: clientShift
                                        };

                                        const huDataToSave = {
                                            ...fields.updates,
                                            date: clientDate,
                                            shift: clientShift
                                        };

                                        const result = await Promise.all([
                                            upsertDailySummary(dsDataToSave),
                                            ...huddleUpdateFields.map((field) => (
                                                upsertHuddleUpdateField(
                                                    field.department,
                                                    fields.updates[field.key as keyof typeof fields.updates]?.update_text ?? null,
                                                    getLocalDate(),
                                                    getCurrentShift()
                                                )
                                            ))  
                                        ])

                                        if (result.every((r) => r.success)) {
                                            setIsEditMode(false)
                                            router.refresh()
                                        } else {
                                            alert(`
                                                Daily Summary Error: ${result[0].message ?? ''}
                                                Huddle Update Error: ${result.filter((r) => r.success === false).map((m) => m.message).join('\n')}   
                                            `)
                                        }

                                    }} />
                                </> 
                                )
                            : <EditButton onClick={() => setIsEditMode(true)}/>
                        }
                    </div>
                    <div className="flex items-center px-4 text-sm text-gray-400">
                        Last Update: {formatDate(initialData?.daily_summary?.updated_at ?? 'No data')}
                    </div>
                </div>
                 <div className='grid grid-cols-1 lg:grid-cols-5 gap-4'>
                    {dashboardCardFields.map(({ key, title }) => (
                        <SummaryCard 
                            key={key}
                            title={title}
                            value={fields?.daily_summary[key]}
                            type={key}
                            isEditMode={isEditMode}
                            onChange={(val) => 
                                setFields({
                                    ...fields,
                                    daily_summary: {
                                        ...fields?.daily_summary,
                                        [key]: val
                                    } 
                                }
                            )}       
                        />
                    ))}
                </div>
                <div className="mt-4 grid grid-cols-1 gap-4">
                    {huddleUpdateFields.map(({ key, title }) => (
                        <HuddleCard 
                            key={key}
                            name={key}
                            title={title}
                            value={fields?.updates[key]?.update_text}
                            isEditMode={isEditMode}
                            onChange={(val) => 
                                setFields({
                                    ...fields, // Spread fields
                                    updates: {
                                        ...fields?.updates, // Spread fields.updates
                                        [key]: {
                                            ...fields?.updates[key],
                                            update_text: val // Override one department with new update text
                                        }
                                    }
                                }
                            )}  
                        />
                    ))}
                </div>
            </div>
        </div>
        </div>
    )
}


