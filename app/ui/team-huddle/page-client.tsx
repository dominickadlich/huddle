'use client'

import { CommandCenter, Distribution, HuddleUpdate, IvRoom, Nonsterile, ShiftType } from "@/app/lib/types/database";
import GenerateSummary from "@/app/ui/team-huddle/generate-summary";
import Header, { CensusCard, ShiftLeadCard } from "@/app/ui/global/header";
import SharedTextArea, { AnnouncementTextArea } from "@/app/ui/team-huddle/shared-text-area";
import { useEffect, useState, useContext } from "react"
import { usePathname, useRouter } from "next/navigation";
import { formatDate, getCurrentShift, getLocalDate } from "@/app/lib/utils/utils";
import { CancelButton, EditButton, SubmitButton } from "@/app/ui/global/buttons";
import { HeroIcon } from "./team-huddle-card";
import TeamHuddleCard from "./team-huddle-card";
import HuddleCard from "@/app/ui/dashboard/v2/huddle-card";
import { EditModeContext } from "@/app/lib/context/EditModeContext";
import MisclickPopUp from "./misclick-modal";
import UploadPhoto from "./photos/photo-upload";
import DisplayPhoto from "./photos/load-photo";
import TeamBuildingTextArea from "./iv-room/team-building-text-area";
import ActivitiesChecklist from "./iv-room/activities";
import Calendar from "../dashboard/history/calendar";
import { DEFAULT_SHIFT } from "@/app/lib/config/team-huddles";
import { SearchAction } from "../global/search";
import AuditSummaryCard from "./audit/audit-summary-card";


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
    department,
    extraContent,
    showTeamBuilding,
    showActivities,
    viewDate,
    mode,
    searchAction,
    placeholder,
    tableName,
}: {
    title: string;
    initialData: CommandCenter | Distribution | IvRoom | Nonsterile;
    cardFields: readonly { key: string, title: string}[];
    textFields: readonly { key: string, title: string}[];
    census: number | null;
    shiftLead: string | null;
    upsertFn: (dataToSave: Record<string, string | number | boolean | null | undefined>) => Promise<{ success: boolean, message: string}>;
    iconMap: Record<string, HeroIcon>;
    grid_cols: number,
    huddleUpdates: HuddleUpdate[] | null,
    department: string
    tableName: string
    extraContent?: React.ReactNode,
    showTeamBuilding?: boolean,
    showActivities?: boolean,
    viewDate?: string;
    mode?: 'live' | 'future' | 'past';
    searchAction: SearchAction,
    placeholder?: string,
}) {
    const router = useRouter();
    const [fields, setFields] = useState<Record<string, string | number | boolean | null | undefined>>(initialData || {})
    const [showSummaryModal, setShowSummaryModal] = useState(false);
    const clientDate = getLocalDate()
    // const clientShift = getCurrentShift();
    const [editedSummary, setEditedSummary] = useState<string>('');
    const [lastUpdate, setLastUpdate] = useState<string>('')
    const pathname = usePathname()
    
    const { 
        isEditMode, 
        setIsEditMode,
        misclickWarning, 
        setMisclickWarning,
        pendingHref, 
        setPendingHref,
     } = useContext(EditModeContext)

    //  const effectiveCols = (isEditMode && extraContent) ? grid_cols + 1 : grid_cols;
    
    useEffect(() => {
        if (mode === 'past' && isEditMode) {
            setIsEditMode(false);
        }
    }, [mode]);


    useEffect(() => {
        const parts = [];
            if (fields.safety) parts.push(`Safety: ${fields.safety.toString()}`);
            if (fields.barriers) parts.push(`Barriers: ${fields.barriers.toString()}`);
            if (fields.inventory) parts.push(`Inventory: ${fields.inventory.toString()}`)
            if (fields.opportunities) parts.push(`Opportunities: ${fields.opportunities.toString()}`);
            if (fields.wins) parts.push(`Wins: ${fields.wins.toString()}`);

        setEditedSummary(parts.join('\n'));
    }, [fields])


    useEffect(() => {
        setLastUpdate(formatDate(initialData.updated_at))
    }, [initialData.updated_at])



    console.log(`Department: ${department}`)

    return (
        <div className="mt-20">
        <Header title={title} searchAction={searchAction} placeholder={placeholder} />
        <div className="mt-10 flex flex-col lg:grid grid-cols-[20%_1fr] gap-6">
            {/* Edit/Last Update bar — order-1 on mobile, sits above cards in right column on desktop */}
            <div className="order-1 lg:col-start-2 lg:row-start-1 items-center gap-4 px-4 grid grid-cols-[1fr_3fr_1fr]">
                <div className="flex items-center gap-4">
                    {isEditMode
                        ? (
                            <>
                                <CancelButton onClick={() => setIsEditMode(false)}/>
                                <SubmitButton onClick={() => setShowSummaryModal(true)} />
                            </>
                          )
                        : mode !== 'past' 
                            ? <EditButton onClick={() => setIsEditMode(true)}/> 
                            : null
                    }
                    {mode !== 'live' && (
                        <div className='rounded-lg px-3 py-1.5 text-sm font-medium bg-amber-500/10 text-amber-600 border border-amber-500/20'>
                            ⚠️ Viewing {viewDate} 
                        </div>
                    )}
                </div>

                {/* {(extraContent) && (
                        <div className="">
                            {extraContent}
                        </div>
                    )} */}

                {/* Center - grouped metrics with divider */}
                <div className="flex flex-col lg:flex-row lg:gap-8">
                    <CensusCard census={census} />
                    <ShiftLeadCard shiftlead={shiftLead} />
                </div>

                <div className="mt-2 justify-self-end whitespace-nowrap px-4 text-sm text-gray-400">
                    Last Update: {lastUpdate}
                </div>
            </div>


            {/* Announcements — order-2 on mobile, spans full left column on desktop */}
            <div className="order-2 lg:col-start-1 lg:row-start-1 lg:row-span-2">
                <div>
                    <AnnouncementTextArea
                        value={fields.announcements as string | number | null | undefined}
                        isEditMode={isEditMode}
                        onChange={(val) => setFields({...fields, announcements: val})}
                    />
                    {isEditMode
                        ? <UploadPhoto department={department} />
                        : <DisplayPhoto department={department} />
                    }
                    {showTeamBuilding && (
                        <TeamBuildingTextArea
                            value={fields.team_building as string | null | undefined}
                            isEditMode={isEditMode}
                            onChange={(val) => setFields({ ...fields, team_building: val })}
                            viewDate={viewDate ?? getLocalDate()}
                        />
                    )}
                    <div className="mt-6">
                        <Calendar />
                    </div>

                    <div className="mt-6">
                        <AuditSummaryCard 
                            tableName={tableName}
                            date={viewDate ?? clientDate}
                        />
                    </div>
                </div>
            </div>
            

            {/* Cards + text fields — order-3 on mobile, right column row 2 on desktop */}
            <div className="order-3 lg:col-start-2 lg:row-start-2">
                <div className="mb-4 pt-4 border-t border-gray-700/50">
                    {(extraContent) && (
                        <div className="">
                            {extraContent}
                        </div>
                    )}
                </div>

                <div className={`grid grid-cols-1 ${gridColsMap[grid_cols]} gap-4`}>
                    {cardFields.map(({ key, title }) => (
                        <TeamHuddleCard
                            key={key}
                            title={title}
                            value={fields[key] as string | number | null | undefined}
                            type={key}
                            isEditMode={isEditMode}
                            onChange={(val) => setFields({ ...fields, [key]: val })}
                            iconMap={iconMap}
                        />
                    ))}
                </div>
                
                {/* Activities Checklist for IV Room */}
                {showActivities && (
                    <ActivitiesChecklist 
                        isEditMode={isEditMode}
                        activities={fields}
                        onChange={(column, value) => setFields({ ...fields, [column]: value })}
                    />
                )}

                <div className="mt-4 grid grid-cols-1 gap-4">
                    {textFields.map(({ key, title }) => (
                        <SharedTextArea
                            key={key}
                            name={key}
                            title={title}
                            value={fields[key] as string | number | null | undefined}
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
                        const effectiveDate = viewDate ?? clientDate;
                        
                        const dataToSave = {
                            ...fields,
                            summary_text: summary,
                            date: effectiveDate,
                            shift: DEFAULT_SHIFT,
                        };

                        const result = await upsertFn(dataToSave);

                        if (result?.success) {
                            setShowSummaryModal(false);
                            setIsEditMode(false);
                            router.push(effectiveDate > clientDate ? `${pathname}?date=${effectiveDate}` : '/dashboard');
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