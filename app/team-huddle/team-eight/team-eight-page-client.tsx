'use client'

import { teamEightConfig } from "@/app/lib/config/team-huddles";
import { HuddleUpdate, TeamEight } from "@/app/lib/types/database";
import MiniHuddlePageClient from "@/app/ui/team-huddle/page-client";


export default function TeamEightPageClient({
    initialData,
    census,
    shiftLead,
    huddleUpdates
}: {
    initialData: TeamEight,
    census: number | null,
    shiftLead: string | null,
    huddleUpdates: HuddleUpdate[] | null,
}) {
    return (
        <MiniHuddlePageClient 
            {...teamEightConfig}
            initialData={initialData}
            census={census}
            shiftLead={shiftLead}
            grid_cols={4}
            huddleUpdates={huddleUpdates}
        />
    )
}