'use client'

import { ivRoomConfig } from "@/app/lib/config/mini-huddles";
import { IvRoom } from "@/app/lib/types/database";
import MiniHuddlePageClient from "@/app/ui/mini-huddle/page-client";

export default function IVCLient({
    initialData,
    census,
    shiftLead,
}: {
    initialData: IvRoom,
    census: number | null,
    shiftLead: string | null,
}) {
    return(
        <MiniHuddlePageClient 
            {...ivRoomConfig}
            initialData={initialData}
            census={census}
            shiftLead={shiftLead}
            grid_cols={4}
        />
    )
}