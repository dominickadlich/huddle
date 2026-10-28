'use client'

import { CommandCenter, Distribution, HuddleUpdate, IvRoom, Nonsterile } from "@/app/lib/types/database";
import Header, { CensusCard, ShiftLeadCard } from "@/app/ui/global/header";
import SharedTextArea from "@/app/ui/team-huddle/shared-text-area";
import { useEffect, useState, useContext } from "react"
import { usePathname, useRouter } from "next/navigation";
import { formatDate, getLocalDate } from "@/app/lib/utils/utils";
import { CancelButton, EditButton, SubmitButton } from "@/app/ui/global/buttons";
import { HeroIcon } from "./team-huddle-card";
import TeamHuddleCard from "./team-huddle-card";
import HuddleCard from "@/app/ui/dashboard/v2/huddle-card";
import { EditModeContext } from "@/app/lib/context/EditModeContext";
import MisclickPopUp from "./misclick-modal";
import UploadPhoto from "./photos/photo-upload";
import DisplayPhoto from "./photos/load-photo";
import TeamBuildingTextArea from "./iv-room/team-building-text-area";
import Calendar from "../dashboard/history/calendar";
import { DEFAULT_SHIFT } from "@/app/lib/config/team-huddles";
import { SearchAction } from "../global/search";
import AuditSummaryCard from "./audit/audit-summary-card";
import HuddleChecklist, { ChecklistConfig } from "./or/activities";
import InfoPopover from "../global/info-popover";

type Fields = Record<string, string | number | boolean | null | undefined>;

const gridColsMap: Record<number, string> = {
        2: 'lg:grid-cols-2',
        3: 'lg:grid-cols-3',
        4: 'lg:grid-cols-4',
        5: 'lg:grid-cols-5',
        8: 'lg:grid-cols-8',
    }

const SUMMARY_SECTIONS: [key: string, label: string][] = [
    ['safety', 'Safety'],
    ['barriers', 'Barriers'],
    ['inventory', 'Inventory'],
    ['opportunities', 'Opportunities'],
    ['wins', 'Wins'],
];

function buildSummary(fields: Fields): string {
    return SUMMARY_SECTIONS
        .filter(([key]) => fields[key])
        .map(([key, label]) => `${label}: ${fields[key]!.toString()}`)
        .join('\n');
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
    secondaryCards,
    checklist,
    pairedTextFields,
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
    secondaryCards?: {
        cols: number;
        rows: number;
        fields: readonly { key: string; title: string }[];
    };
    checklist?: ChecklistConfig;
    pairedTextFields?: readonly { key: string; title: string }[];
}) {
    const router = useRouter();
    const [fields, setFields] = useState<Record<string, string | number | boolean | null | undefined>>(initialData || {})
    const clientDate = getLocalDate()
    const [lastUpdate, setLastUpdate] = useState<string>('')
    const pathname = usePathname()
    const [isSaving, setIsSaving] = useState(false)
    
    const { isEditMode, setIsEditMode } = useContext(EditModeContext)

    const handleSave = async () => {
        if (isSaving) return;
        setIsSaving(true);

        const effectiveDate = viewDate ?? clientDate;

        try {
            const result = await upsertFn({
                ...fields,
                summary_text: buildSummary(fields),
                date: effectiveDate,
                shift: DEFAULT_SHIFT,
            });

            if (result?.success) {
                setIsEditMode(false);
                router.push(effectiveDate > clientDate ? `${pathname}?date=${effectiveDate}` : '/dashboard');
                router.refresh();
            } else {
                alert(result?.message);
            }
        } finally {
            setIsSaving(false);
        }
    };
    
    useEffect(() => {
        if (mode === 'past' && isEditMode) {
            setIsEditMode(false);
        }
    }, [mode]);

    useEffect(() => {
        setLastUpdate(formatDate(initialData.updated_at))
    }, [initialData.updated_at])

    return (
        <div className="mt-20">
        <Header title={title} searchAction={searchAction} placeholder={placeholder} calendar={<Calendar />}/>
        <div className="mt-10 flex flex-col gap-6">
            {/* Edit/Last Update bar — order-1 on mobile, sits above cards in right column on desktop */}
            <div className="order-1 lg:col-start-2 lg:row-start-1 items-center gap-4 px-4 grid grid-cols-[1fr_3fr_1fr]">
                <div className="flex items-center gap-4">
                    {isEditMode
                        ? (
                            <>
                                <CancelButton onClick={() => setIsEditMode(false)}/>
                                <SubmitButton onClick={handleSave} disabled={isSaving}/>
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


                {/* Center - grouped metrics with divider */}
                <div className="flex flex-col justify-center lg:flex-row lg:gap-8">
                    <CensusCard census={census} />
                    <ShiftLeadCard shiftlead={shiftLead} />
                </div>

                <div className="mt-2 justify-self-end whitespace-nowrap px-4 text-sm text-gray-400">
                    <InfoPopover trigger={<>Last Update: {lastUpdate}</>}>
                        <AuditSummaryCard
                            tableName={tableName}
                            date={viewDate ?? clientDate}
                        />
                    </InfoPopover>
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
                {/* {showActivities && (
                    <ActivitiesChecklist 
                        isEditMode={isEditMode}
                        activities={fields}
                        onChange={(column, value) => setFields({ ...fields, [column]: value })}
                    />
                )} */}

                {checklist && (
                    <HuddleChecklist
                        title={checklist.title}
                        items={checklist.items}
                        isEditMode={isEditMode}
                        values={fields}
                        onChange={(column, value) => setFields(prev => ({ ...prev, [column]: value }))}
                    />
                )}
                
                {/* OR Kits Section */}
                {secondaryCards && (
                    <div className={`mt-4 grid grid-cols-1 ${gridColsMap[secondaryCards.cols]} gap-4`}>
                        {secondaryCards.fields.map(({ key, title }) => (
                            <TeamHuddleCard
                                key={key}
                                title={title}
                                value={fields[key] as string | number | null | undefined}
                                type={key}
                                isEditMode={isEditMode}
                                onChange={(val) => setFields({ ...fields, [key]: val })}
                                iconMap={iconMap}
                                rows={secondaryCards.rows}
                            />
                        ))}
                    </div>
                )}

                {/* OR Batching Schedule */}
                {pairedTextFields && (
                    <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {pairedTextFields.map(({ key, title }) => (
                            <SharedTextArea
                                key={key}
                                name={key}
                                title={title}
                                align="center"
                                value={fields[key] as string | number | null | undefined}
                                isEditMode={isEditMode}
                                onChange={(val) => setFields(prev => ({ ...prev, [key]: val }))}
                            />
                        ))}
                    </div>
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
                    {showTeamBuilding && (
                        <TeamBuildingTextArea
                            value={fields.team_building as string | null | undefined}
                            isEditMode={isEditMode}
                            onChange={(val) => setFields({ ...fields, team_building: val })}
                            viewDate={viewDate ?? getLocalDate()}
                        />
                    )}

                    <div className="grid grid-cols-2 gap-4">
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

                        <div>
                            {isEditMode
                                ? <UploadPhoto department={department} />
                                : <DisplayPhoto department={department} />
                            }
                        </div>
                    </div>
                </div>

                <MisclickPopUp onSave={handleSave} />

            </div>
        </div>
        </div>
    )
}