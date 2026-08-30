'use client'

import { teamEightConfig } from "@/app/lib/config/team-huddles";
import { teamEightSearch } from "@/app/lib/department_search/team_eight_search";
import { HuddleUpdate, TeamEight } from "@/app/lib/types/database";
import MiniHuddlePageClient from "@/app/ui/team-huddle/page-client";


export default function TeamEightPageClient({
    initialData,
    census,
    shiftLead,
    huddleUpdates,
    viewDate,
    mode,
}: {
    initialData: TeamEight,
    census: number | null,
    shiftLead: string | null,
    huddleUpdates: HuddleUpdate[] | null,
    viewDate: string,
    mode: 'live' | 'future' | 'past',
}) {
    return (
        <MiniHuddlePageClient
            key={viewDate}
            searchAction={teamEightSearch}
            placeholder="Search Team 8 huddle history"
            {...teamEightConfig}
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