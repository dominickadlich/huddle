import { fetchLatestDistribution } from "@/app/lib/data/distribution";
import { fetchLatestDailySummary } from "@/app/lib/data";
import DistributionPageClient from "./distribution-page-client";
import { Distribution } from "@/app/lib/types/database";
import DistributionClient from "./distribution-page-client";

export default async function Page() {
    const distributionData = await fetchLatestDistribution();
    const dailySummary = await fetchLatestDailySummary();

    // Handle null case - show empty state or use defaults
    if (!distributionData) {
        return (
            <DistributionClient 
                initialData={{} as Distribution}  // Empty object cast to type
                census={dailySummary?.census ?? null}
                shiftLead={dailySummary?.shift_lead ?? null}
            />
        );
    }

    return (
        <DistributionClient 
            initialData={distributionData} 
            census={dailySummary?.census ?? null}
            shiftLead={dailySummary?.shift_lead ?? null}
        />
    )
}