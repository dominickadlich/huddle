'use client'

import { distributionConfig } from "@/app/lib/config/team-huddles";
import { HuddleUpdate, Distribution } from "@/app/lib/types/database";
import MiniHuddlePageClient from "@/app/ui/team-huddle/page-client";

export default function DistributionClient({
    initialData,
    census,
    shiftLead,
    huddleUpdates,
}: {
    initialData: Distribution,
    census: number | null,
    shiftLead: string | null,
    huddleUpdates: HuddleUpdate[] | null,
}) {
    return (
        <MiniHuddlePageClient 
            {...distributionConfig}
            initialData={initialData}
            census={census}
            shiftLead={shiftLead}
            grid_cols={4}
            huddleUpdates={huddleUpdates}
            // department={distributionConfig.department}
        />
    )
}