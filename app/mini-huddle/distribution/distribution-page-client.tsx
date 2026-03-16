'use client'

import { distributionConfig } from "@/app/lib/config/mini-huddles";
import { Distribution } from "@/app/lib/types/database";
import MiniHuddlePageClient from "@/app/ui/mini-huddle/page-client";

export default function DistributionClient({
    initialData,
    census,
    shiftLead,
}: {
    initialData: Distribution,
    census: number | null,
    shiftLead: string | null,
}) {
    return (
        <MiniHuddlePageClient 
            {...distributionConfig}
            initialData={initialData}
            census={census}
            shiftLead={shiftLead}
            grid_cols={4}
        />
    )
}