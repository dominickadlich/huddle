'use client'

import { medHistoryConfig } from "@/app/lib/config/team-huddles";
import { medHistorySearch } from "@/app/lib/department_search/med_history_search";
import { HuddleUpdate, MedHistory } from "@/app/lib/types/database";
import MiniHuddlePageClient from "@/app/ui/team-huddle/page-client";

export default function MedHistoryClient({
    initialData,
    census,
    shiftLead,
    huddleUpdates,
    viewDate,
    mode,
}: {
    initialData: MedHistory,
    census: number | null,
    shiftLead: string | null,
    huddleUpdates: HuddleUpdate[] | null,
    viewDate: string,
    mode: 'live' | 'future' | 'past',
}) {
    return (
        <MiniHuddlePageClient
            cardFields={[]} 
            iconMap={{}}
            searchAction={medHistorySearch}
            placeholder="Search med history huddle history"
            {...medHistoryConfig}
            initialData={initialData}
            census={census}
            shiftLead={shiftLead}
            grid_cols={4}
            huddleUpdates={huddleUpdates}
            viewDate={viewDate}
            mode={mode}        
        />
    )
}