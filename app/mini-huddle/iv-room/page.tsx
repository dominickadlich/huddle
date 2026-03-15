import { fetchLatestIVRoom } from "@/app/lib/data/iv-room";
import { fetchLatestDailySummary } from "@/app/lib/data";
import IVRoomPageClient from "./iv-room-page-client";
import { IvRoom } from "@/app/lib/types/database";
import IVCLient from "./iv-room-page-client";

export default async function Page() {
    const ivRoomData = await fetchLatestIVRoom();
    const dailySummary = await fetchLatestDailySummary();

    // Handle null case - show empty state or use defaults
    if (!ivRoomData) {
        return (
            <IVCLient 
                initialData={{} as IvRoom}  // Empty object cast to type
                census={dailySummary?.census ?? null}
                shiftLead={dailySummary?.shift_lead ?? null}
            />
        );
    }

    return (
        <IVCLient 
            initialData={ivRoomData} 
            census={dailySummary?.census ?? null}
            shiftLead={dailySummary?.shift_lead ?? null}
        />
    )
}