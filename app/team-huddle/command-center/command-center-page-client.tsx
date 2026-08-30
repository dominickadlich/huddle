'use client'

import { commandCenterConfig } from "@/app/lib/config/team-huddles"
import { commandCenterSearch } from "@/app/lib/department_search/command_center_search"
import { HuddleUpdate, CommandCenter } from "@/app/lib/types/database"
import MiniHuddlePageClient from "@/app/ui/team-huddle/page-client"

export default function CommandCenterClient({ 
    initialData,
    census,
    shiftLead,
    huddleUpdates,
    viewDate,
    mode,
}: {
    initialData: CommandCenter,
    census: number | null,
    shiftLead: string | null,
    huddleUpdates: HuddleUpdate[] | null,
    viewDate: string,
    mode: 'live' | 'future' | 'past',
}) {
    return(
        <MiniHuddlePageClient
            key={viewDate}
            searchAction={commandCenterSearch}
            placeholder="Search CM/CSR/PP huddle history"
            {...commandCenterConfig}
            initialData={initialData}
            census={census}
            shiftLead={shiftLead}        
            grid_cols={5} 
            huddleUpdates={huddleUpdates}
            viewDate={viewDate}
            mode={mode}
        />
    )
}