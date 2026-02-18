'use client'

import { IvRoom } from "@/app/lib/types/database";
import Header from "@/app/ui/global/header";
import  IVCard from "@/app/ui/mini-huddle/iv-room/iv_card";
import SharedTextArea, { AnnouncementTextArea } from "@/app/ui/mini-huddle/shared-text-area";
import { useState } from "react"

const ivRoomCardFields = [
  { key: 'bell_iv', title: 'Bell IV' },
  { key: 'tpn', title: 'TPN + Batch' },
  { key: 'hazardous', title: 'Haz' },
  { key: 'sc', title: 'SC' },
  { key: 'assignment_two', title: 'Asgmt 2' },
  { key: 'training', title: 'Training' },
  { key: 'iv_support', title: 'IV Support' },
] as const;

const ivRoomTextAreaFields = [
    { key: 'safety' , title: 'Safety (Concerns, Good Catches, Work Arounds)' },
    { key: 'barriers', title: 'Barriers (Medkeeper, DP, Missing or Failing Equipment)' },
    { key: 'wins', title: 'Team Wins & Recognition'},
    { key: 'opportunities', title: 'Opportunities' },
] as const;

export default function Page({ initialData }: {initialData: IvRoom}) {
    const [isEditMode, setIsEditMode] = useState(false);
    const [fields, setFields] = useState(initialData || {})

    return (
        <div className="mt-20">
        <Header title="IV Room Dashboard" census={null} shiftlead={null}/>
        <div className="mt-10 grid grid-cols-[20%_1fr] gap-6">
            <div>
                <AnnouncementTextArea value={undefined} isEditMode={isEditMode} />
            </div>

            <div>
                <div className='grid grid-cols-1 lg:grid-cols-4 gap-4'>
                    <button
                onClick={() => setIsEditMode(true)}
            >
                {isEditMode ? 'Cancel' : 'Edit'}
            </button>
                    {ivRoomCardFields.map(({ key, title }) => (
                        <IVCard 
                            key={key}
                            title={title}
                            value={fields[key]}
                            type={key}
                            isEditMode={isEditMode}
                            onChange={(val) => setFields({...fields, [key]: val})}       
                        />
                    ))}
                </div>
                <div className="mt-10 grid grid-cols-1 gap-4">
                    {ivRoomTextAreaFields.map(({ key, title }) => (
                        <SharedTextArea 
                            key={key}
                            name={key}
                            title={title}
                            value={fields[key]}
                            isEditMode={isEditMode}
                            onChange={(val) => setFields({...fields, [key]: val})}  
                        />
                    ))}
                </div>
            </div>
        </div>
        </div>
    )
}