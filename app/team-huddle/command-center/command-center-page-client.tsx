'use client'

import { commandCenterConfig } from "@/app/lib/config/team-huddles"
import { HuddleUpdate, CommandCenter } from "@/app/lib/types/database"
import MiniHuddlePageClient from "@/app/ui/team-huddle/page-client"

export default function CommandCenterClient({ 
    initialData,
    census,
    shiftLead,
    huddleUpdates
}: {
    initialData: CommandCenter,
    census: number | null,
    shiftLead: string | null,
    huddleUpdates: HuddleUpdate[] | null,
}) {
    return(
        <MiniHuddlePageClient
            {...commandCenterConfig}
            initialData={initialData}
            census={census}
            shiftLead={shiftLead}        
            grid_cols={4} 
            huddleUpdates={huddleUpdates}
        />
    )
}