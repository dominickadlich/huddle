'use client'

import { ivRoomConfig } from "@/app/lib/config/team-huddles";
import { HuddleUpdate, IvRoom } from "@/app/lib/types/database";
import MiniHuddlePageClient from "@/app/ui/team-huddle/page-client";

export default function IVCLient({
    initialData,
    census,
    shiftLead,
    huddleUpdates,
}: {
    initialData: IvRoom,
    census: number | null,
    shiftLead: string | null,
    huddleUpdates: HuddleUpdate[] | null,
}) {
    return(
        <MiniHuddlePageClient
            {...ivRoomConfig}
            initialData={initialData}
            census={census}
            shiftLead={shiftLead}
            grid_cols={4}
            huddleUpdates={huddleUpdates}
            // department={ivRoomConfig.department}
        />
    )
}