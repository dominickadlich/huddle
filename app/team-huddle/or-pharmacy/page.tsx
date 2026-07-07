import { fetchLatestDailySummary, fetchLatestHuddleUpdates } from "@/app/lib/data";
import { fetchLatestORPharmacy } from "@/app/lib/data/or-pharmacy"
import ORPharmacyClient from "./or-pharmacy-page-client";
import { ORPharmacy } from "@/app/lib/types/database";

export default async function Page() {
    const orPharmacyData = await fetchLatestORPharmacy();
    const dailySummary = await fetchLatestDailySummary();
    const huddleUpdate = await fetchLatestHuddleUpdates();

    if (!orPharmacyData) {
        return (
            <ORPharmacyClient 
                initialData={{} as ORPharmacy}  // Empty object cast to type
                census={dailySummary?.census ?? null}
                shiftLead={dailySummary?.shift_lead ?? null}
                huddleUpdates={huddleUpdate ?? null}
            />
        )
    }

    return (
        <ORPharmacyClient 
            initialData={orPharmacyData}
            census={dailySummary?.census ?? null}
            shiftLead={dailySummary?.shift_lead ?? null}
            huddleUpdates={huddleUpdate ?? null}
        />
    )
}