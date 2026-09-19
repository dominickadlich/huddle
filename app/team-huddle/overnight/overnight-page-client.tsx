'use client'

import { overnightConfig } from "@/app/lib/config/team-huddles";
import { overnightSearch } from "@/app/lib/department_search/overnight_search";
import { HuddleUpdate, Overnight } from "@/app/lib/types/database";
import MiniHuddlePageClient from "@/app/ui/team-huddle/page-client";

export default function OvernightClient({
    initialData,
    census,
    shiftLead,
    huddleUpdates,
    viewDate,
    mode,
}: {
    initialData: Overnight,
    census: number | null,
    shiftLead: string | null,
    huddleUpdates: HuddleUpdate[] | null,
    viewDate: string,
    mode: 'live' | 'future' | 'past',
}) {
    return (
        <MiniHuddlePageClient
            key={viewDate}
            searchAction={overnightSearch}
            placeholder="Search overnight huddle history"
            {...overnightConfig}
            initialData={initialData}
            census={census}
            shiftLead={shiftLead}
            grid_cols={2}
            huddleUpdates={huddleUpdates}
            viewDate={viewDate}
            mode={mode}        
        />
    )
}