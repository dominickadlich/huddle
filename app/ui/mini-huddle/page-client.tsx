'use client'

import { CommandCenter, Distribution, IvRoom, Nonsterile, ShiftType } from "@/app/lib/types/database";
import GenerateSummary from "@/app/ui/mini-huddle/generate-summary";
import Header from "@/app/ui/global/header";
import SharedTextArea, { AnnouncementTextArea } from "@/app/ui/mini-huddle/shared-text-area";
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";
import { formatDate, getCurrentShift, getLocalDate } from "@/app/lib/utils";
import { CancelButton, EditButton, SubmitButton } from "@/app/ui/global/buttons";
import MiniHuddleCard, { HeroIcon } from "./mini-huddle-card";

const gridColsMap: Record<number, string> = {
        3: 'lg:grid-cols-3',
        4: 'lg:grid-cols-4',
        5: 'lg:grid-cols-5',
        8: 'lg:grid-cols-8',
    }

export default function MiniHuddlePageClient({ 
    title,
    initialData,
    cardFields,
    textFields,
    census,
    shiftLead,
    upsertFn,
    iconMap,
    grid_cols,
}: {
    title: string;
    initialData: CommandCenter | Distribution | IvRoom | Nonsterile;
    cardFields: readonly { key: string, title: string}[];
    textFields: readonly { key: string, title: string}[];
    census: number | null;
    shiftLead: string | null;
    upsertFn: (dataToSave: Record<string, string | number | null | undefined> ) => Promise<{ success: boolean, message: string}>;
    iconMap: Record<string, HeroIcon>;
    grid_cols: number
}) {
    const router = useRouter();
    const [isEditMode, setIsEditMode] = useState(false);
    const [fields, setFields] = useState<Record<string, string | number | null | undefined>>(initialData || {})
    const [showSummaryModal, setShowSummaryModal] = useState(false);
    const clientDate = getLocalDate()
    const clientShift = getCurrentShift();
    const [editedSummary, setEditedSummary] = useState<string>('');

    useEffect(() => {
        const parts = [];
            if (fields.safety) parts.push(`Safety: ${fields.safety.toString()}`);
            if (fields.barriers) parts.push(`Barriers: ${fields.barriers.toString()}`);
            if (fields.wins) parts.push(`Wins: ${fields.wins.toString()}`);
        
        setEditedSummary(parts.join('.\n'));
    }, [fields])

    return (
        <div className="mt-20">
        <Header title={`${title} Dashboard`} census={census} shiftlead={shiftLead}/>
        <div className="mt-10 lg:grid grid-cols-[20%_1fr] gap-6">
            <div>
                <AnnouncementTextArea 
                    value={fields.announcements}
                    isEditMode={isEditMode}
                    onChange={(val) => setFields({...fields, announcements: val})}
                />
            </div>

            <div>
                <div className="flex justify-between gap-4 mb-4"> 
                    <div className="flex gap-4">
                        {isEditMode 
                            ? ( 
                                <>
                                    <CancelButton onClick={() => setIsEditMode(false)}/>
                                    <SubmitButton onClick={() => setShowSummaryModal(true)} />
                                </> 
                                )
                            : <EditButton onClick={() => setIsEditMode(true)}/>
                        }
                    </div>
                    <div className="flex items-center px-4 text-sm text-gray-400">
                        Last Update: {formatDate(initialData.updated_at)}
                    </div>
                </div>
                <div className={`grid grid-cols-1 ${gridColsMap[grid_cols]} gap-4`}>
                    {cardFields.map(({ key, title }) => (
                        <MiniHuddleCard 
                            key={key}
                            title={title}
                            value={fields[key]}
                            type={key}
                            isEditMode={isEditMode}
                            onChange={(val) => setFields({ ...fields, [key]: val })} 
                            iconMap={iconMap}                        
                        />
                    ))}
                </div>
                <div className="mt-4 grid grid-cols-1 gap-4">
                    {textFields.map(({ key, title }) => (
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
        

        <GenerateSummary 
            open={showSummaryModal}
            onClose={() => setShowSummaryModal(false)}
            onChange={(editedSummary) => setEditedSummary(editedSummary)}
            editedSummary={editedSummary}
            onSave={async (summary) => {

                const dataToSave = {
                    ...fields,
                    summary_text: summary,
                    date: clientDate,
                    shift: clientShift,
                };

                const result = await upsertFn(dataToSave);

                if (result?.success) {
                    setShowSummaryModal(false);
                    setIsEditMode(false);
                    router.push('/dashboard'); // ← Use router.push, not redirect
                    router.refresh(); // ← Refresh to see new data
                } else {
                    alert(result?.message); // ← Show error to user
                }
            }} 
            />
        </div>
            </div>
        </div>
    )
}