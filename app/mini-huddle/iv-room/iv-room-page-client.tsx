'use client'

import { IvRoom } from "@/app/lib/types/database";
import GenerateSummary from "@/app/ui/mini-huddle/generate-summary";
import Header from "@/app/ui/global/header";
import  IVCard from "@/app/ui/mini-huddle/iv-room/iv_card";
import TeamBuildingTextArea from "@/app/ui/mini-huddle/iv-room/team-building-text-area";
import SharedTextArea, { AnnouncementTextArea } from "@/app/ui/mini-huddle/shared-text-area";
import { useState } from "react"
import { upsertIVRoom } from "@/app/lib/actions/iv-room";
import { useRouter } from "next/navigation";
import { getCurrentShift, getLocalDate } from "@/app/lib/utils";

const ivRoomCardFields = [
    { key: 'opportunities', title: 'Bladder Instills' }, // CHANGE IN DATABASE
    { key: 'tpn', title: 'TPN + Batch' },
    { key: 'hazardous', title: 'Haz' },
    { key: 'sc', title: 'SC' },
    { key: 'assignment_two', title: 'Asgmt 2' },
    { key: 'training', title: 'Training' },
    { key: 'iv_support', title: 'IV Support' },
    { key: 'bell_iv', title: 'Monthly Clean' }, // CHANGE IN DATABASE
] as const;

const ivRoomTextAreaFields = [
    { key: 'safety' , title: 'Safety (Concerns, Good Catches, Work Arounds)' },
    { key: 'barriers', title: 'Barriers (Medkeeper, DP, Missing or Failing Equipment)' },
    { key: 'inventory', title: 'Inventory' },
    { key: 'wins', title: 'Team Wins & Recognition'},
] as const;

export default function IVRoomPageClient({ 
    initialData,
    census,
    shiftLead
}: {
    initialData: IvRoom;
    census: number | null;
    shiftLead: string | null;
}) {
    const router = useRouter();
    const [isEditMode, setIsEditMode] = useState(false);
    const [fields, setFields] = useState(initialData || {})
    const [showSummaryModal, setShowSummaryModal] = useState(false);

    return (
        <div className="mt-20">
        <Header title="IV Room Dashboard" census={census} shiftlead={shiftLead}/>
        <div className="mt-10 lg:grid grid-cols-[20%_1fr] gap-6">
            <div>
                <AnnouncementTextArea 
                    value={fields.announcements}
                    isEditMode={isEditMode}
                    onChange={(val) => setFields({...fields, announcements: val})}
                />
            </div>

            <div>
                
                   <div className="flex gap-4 mb-4">
                    <button onClick={() => setIsEditMode(!isEditMode)}>
                        {isEditMode ? 'Cancel' : 'Edit'}
                    </button>
                    <button onClick={() => setShowSummaryModal(true)}>
                        Submit
                    </button>
                </div>
                <div className='grid grid-cols-1 lg:grid-cols-4 gap-4'>
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
                <div className="mt-4 grid grid-cols-1 gap-4">
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
                    <TeamBuildingTextArea 
                        value={fields.team_building}
                        isEditMode={isEditMode}
                        onChange={(val) => setFields({...fields, team_building: val})}
                        />
                        </div>
        

        <GenerateSummary 
            fields={fields}
            open={showSummaryModal}
            onClose={() => setShowSummaryModal(false)}
            onSave={async (summary) => {
                const localDate = getLocalDate()
                const currentShift = getCurrentShift(); // Make sure this is imported!
                
                const dataToSave = {
                    ...fields,
                    summary_text: summary,
                    date: localDate,
                    shift: currentShift,
                };

                const result = await upsertIVRoom(dataToSave)

                if (result.success) {
                    setShowSummaryModal(false);
                    setIsEditMode(false);
                    router.push('/dashboard');  // ← Use router.push, not redirect
                    router.refresh();  // ← Refresh to see new data
                } else {
                    alert(result.message);  // ← Show error to user
                }
            }}
        />
        </div>
            </div>
        </div>
    )
}