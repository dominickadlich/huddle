'use client'

import { commandCenterConfig } from "@/app/lib/config/mini-huddles"
import { CommandCenter } from "@/app/lib/types/database"
import MiniHuddlePageClient from "@/app/ui/mini-huddle/page-client"

export default function CommandCenterClient({ 
    initialData,
    census,
    shiftLead
}: {
    initialData: CommandCenter,
    census: number | null,
    shiftLead: string | null
}) {
    return(
        <MiniHuddlePageClient
            {...commandCenterConfig}
            initialData={initialData}
            census={census}
            shiftLead={shiftLead}        
            grid_cols={5} 
        />
    )
}