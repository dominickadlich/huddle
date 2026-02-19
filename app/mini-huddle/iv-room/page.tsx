import { fetchLatestIVRoom } from "@/app/lib/data/iv-room";
import { fetchLatestDailySummary } from "@/app/lib/data";
import PageClient from "./page-client";
import { IvRoom } from "@/app/lib/types/database";

export default async function Page() {
    const ivRoomData = await fetchLatestIVRoom();
    const dailySummary = await fetchLatestDailySummary();

    // Handle null case - show empty state or use defaults
    if (!ivRoomData) {
        return (
            <PageClient 
                initialData={{} as IvRoom}  // Empty object cast to type
                census={dailySummary?.census ?? null}
                shiftLead={dailySummary?.shift_lead ?? null}
            />
        );
    }

    return (
        <PageClient 
            initialData={ivRoomData} 
            census={dailySummary?.census ?? null}
            shiftLead={dailySummary?.shift_lead ?? null}
        />
    )
}