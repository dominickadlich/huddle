import { fetchLatestDistribution } from "@/app/lib/data/distribution";
import { fetchLatestDailySummary, fetchLatestHuddleUpdates } from "@/app/lib/data";
import { Distribution } from "@/app/lib/types/database";
import DistributionClient from "./distribution-page-client";

export default async function Page() {
    const distributionData = await fetchLatestDistribution();
    const dailySummary = await fetchLatestDailySummary();
    const huddleUpdate = await fetchLatestHuddleUpdates();

    // Handle null case - show empty state or use defaults
    if (!distributionData) {
        return (
            <DistributionClient 
                initialData={{} as Distribution}  // Empty object cast to type
                census={dailySummary?.census ?? null}
                shiftLead={dailySummary?.shift_lead ?? null}
                huddleUpdates={huddleUpdate ?? null}
            />
        );
    }

    return (
        <DistributionClient 
            initialData={distributionData} 
            census={dailySummary?.census ?? null}
            shiftLead={dailySummary?.shift_lead ?? null}
            huddleUpdates={huddleUpdate ?? null}
        />
    )
}