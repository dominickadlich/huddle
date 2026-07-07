import { fetchLatestDailySummary, fetchLatestHuddleUpdates } from "@/app/lib/data";
import { ORPharmacy, TeamEight } from "@/app/lib/types/database";
import { fetchLatestTeamEight } from "@/app/lib/data/team-eight";
import TeamEightPageClient from "./team-eight-page-client";

export default async function Page() {
    const teamEightData = await fetchLatestTeamEight();
    const dailySummary = await fetchLatestDailySummary();
    const huddleUpdate = await fetchLatestHuddleUpdates();

    if (!teamEightData) {
        return (
            <TeamEightPageClient 
                initialData={{} as TeamEight}  // Empty object cast to type
                census={dailySummary?.census ?? null}
                shiftLead={dailySummary?.shift_lead ?? null}
                huddleUpdates={huddleUpdate ?? null}
            />
        )
    }

    return (
        <TeamEightPageClient 
            initialData={teamEightData}
            census={dailySummary?.census ?? null}
            shiftLead={dailySummary?.shift_lead ?? null}
            huddleUpdates={huddleUpdate ?? null}
        />
    )
}