'use client'

import { orPharmacyConfig } from "@/app/lib/config/team-huddles";
import { HuddleUpdate, ORPharmacy } from "@/app/lib/types/database";
import MiniHuddlePageClient from "@/app/ui/team-huddle/page-client";


export default function ORPharmacyClient({
    initialData,
    census,
    shiftLead,
    huddleUpdates,
    viewDate,
    mode,
}: {
    initialData: ORPharmacy,
    census: number | null,
    shiftLead: string | null,
    huddleUpdates: HuddleUpdate[] | null,
    viewDate: string,
    mode: 'live' | 'future' | 'past',
}) {
    return (
        <MiniHuddlePageClient
            key={viewDate}
            {...orPharmacyConfig}
            initialData={initialData}
            census={census}
            shiftLead={shiftLead}
            grid_cols={3}
            huddleUpdates={huddleUpdates}
            viewDate={viewDate}
            mode={mode}
        />
    )
}