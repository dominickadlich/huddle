'use client'

import { ivRoomConfig } from "@/app/lib/config/team-huddles";
import { HuddleUpdate, IvRoom } from "@/app/lib/types/database";
import RollCall from "@/app/ui/team-huddle/iv-room/roll-call";
import MiniHuddlePageClient from "@/app/ui/team-huddle/page-client";

export default function IVCLient({
    initialData,
    census,
    shiftLead,
    huddleUpdates,
    viewDate,
    mode,
}: {
    initialData: IvRoom,
    census: number | null,
    shiftLead: string | null,
    huddleUpdates: HuddleUpdate[] | null,
    viewDate: string;
    mode: 'live' | 'future' | 'past';
}) {
    
    return(
        <MiniHuddlePageClient
            key={viewDate}
            {...ivRoomConfig}
            initialData={initialData}
            census={census}
            shiftLead={shiftLead}
            grid_cols={4}
            huddleUpdates={huddleUpdates}
            // department={ivRoomConfig.department}
            extraContent={<RollCall />}
            showTeamBuilding={true}
            showActivities={true}
            viewDate={viewDate}
            mode={mode}
        />
    )
}