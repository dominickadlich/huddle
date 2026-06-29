'use client'

import { CommandCenter, Distribution, HuddleUpdate, IvRoom, Nonsterile, ShiftType } from "@/app/lib/types/database";
import GenerateSummary from "@/app/ui/team-huddle/generate-summary";
import Header from "@/app/ui/global/header";
import SharedTextArea, { AnnouncementTextArea } from "@/app/ui/team-huddle/shared-text-area";
import { useEffect, useState, useContext } from "react"
import { useRouter } from "next/navigation";
import { formatDate, getCurrentShift, getLocalDate } from "@/app/lib/utils/utils";
import { CancelButton, EditButton, SubmitButton } from "@/app/ui/global/buttons";
import teamHuddleCard, { HeroIcon } from "./team-huddle-card";
import TeamHuddleCard from "./team-huddle-card";
import HuddleCard from "@/app/ui/dashboard/v2/huddle-card";
import { EditModeContext } from "@/app/lib/context/EditModeContext";
import MisclickPopUp from "./misclick-modal";


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
    huddleUpdates,
}: {
    title: string;
    initialData: CommandCenter | Distribution | IvRoom | Nonsterile;
    cardFields: readonly { key: string, title: string}[];
    textFields: readonly { key: string, title: string}[];
    census: number | null;
    shiftLead: string | null;
    upsertFn: (dataToSave: Record<string, string | number | null | undefined> ) => Promise<{ success: boolean, message: string}>;
    iconMap: Record<string, HeroIcon>;
    grid_cols: number,
    huddleUpdates: HuddleUpdate[] | null,
}) {
    const router = useRouter();
    const [fields, setFields] = useState<Record<string, string | number | null | undefined>>(initialData || {})
    const [showSummaryModal, setShowSummaryModal] = useState(false);
    const clientDate = getLocalDate()
    const clientShift = getCurrentShift();
    const [editedSummary, setEditedSummary] = useState<string>('');
    
    const { 
        isEditMode, 
        setIsEditMode,
        misclickWarning, 
        setMisclickWarning,
        pendingHref, 
        setPendingHref,
     } = useContext(EditModeContext)


    useEffect(() => {
        const parts = [];
            if (fields.safety) parts.push(`Safety: ${fields.safety.toString()}`);
            if (fields.barriers) parts.push(`Barriers: ${fields.barriers.toString()}`);
            if (fields.inventory) parts.push(`Inventory: ${fields.inventory.toString()}`)
            if (fields.opportunities) parts.push(`Opportunities: ${fields.opportunities.toString()}`);
            if (fields.wins) parts.push(`Wins: ${fields.wins.toString()}`);

        setEditedSummary(parts.join('\n'));
    }, [fields])

    return (
        <div className="mt-20">
        <Header title={`${title} Dashboard`} census={census} shiftlead={shiftLead}/>
        <div className="mt-10 flex flex-col lg:grid grid-cols-[20%_1fr] gap-6">
            {/* Edit/Last Update bar — order-1 on mobile, sits above cards in right column on desktop */}
            <div className="order-1 lg:col-start-2 lg:row-start-1 flex justify-between gap-4">
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

            {/* Announcements — order-2 on mobile, spans full left column on desktop */}
            <div className="order-2 lg:col-start-1 lg:row-start-1 lg:row-span-2">
                <AnnouncementTextArea
                    value={fields.announcements}
                    isEditMode={isEditMode}
                    onChange={(val) => setFields({...fields, announcements: val})}
                />
            </div>

            {/* Cards + text fields — order-3 on mobile, right column row 2 on desktop */}
            <div className="order-3 lg:col-start-2 lg:row-start-2">
                <div className={`grid grid-cols-1 ${gridColsMap[grid_cols]} gap-4`}>
                    {cardFields.map(({ key, title }) => (
                        <TeamHuddleCard
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

                {huddleUpdates && (
                    <div className="mt-4 grid grid-cols-1 gap-4">
                        <HuddleCard
                            name="rx_leadership"
                            title="RX Leadership"
                            value={huddleUpdates.find(u => u.department === 'RX Leadership')?.update_text}
                            isEditMode={false}
                        />
                    </div>
                )}

                <MisclickPopUp summaryModal={setShowSummaryModal} />

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
                            router.push('/dashboard');
                            router.refresh();
                        } else {
                            alert(result?.message);
                        }
                    }}
                />
            </div>
        </div>
        </div>
    )
}