// import { fetchLatestIVRoom } from "@/app/lib/data/iv-room";
// import { fetchLatestDailySummary, fetchLatestHuddleUpdates } from "@/app/lib/data";
// import { IvRoom } from "@/app/lib/types/database";
// import IVCLient from "./iv-room-page-client";

// export default async function Page() {
//     const ivRoomData = await fetchLatestIVRoom();
//     const dailySummary = await fetchLatestDailySummary();
//     const huddleUpdate = await fetchLatestHuddleUpdates();

//     // Handle null case - show empty state or use defaults
//     if (!ivRoomData) {
//         return (
//             <IVCLient 
//                 initialData={{} as IvRoom}  // Empty object cast to type
//                 census={dailySummary?.census ?? null}
//                 shiftLead={dailySummary?.shift_lead ?? null}
//                 huddleUpdates={huddleUpdate ?? null}
//             />
//         );
//     }

//     return (
//         <IVCLient 
//             initialData={ivRoomData}
//             census={dailySummary?.census ?? null}
//             shiftLead={dailySummary?.shift_lead ?? null} 
//             huddleUpdates={huddleUpdate ?? null}        
//         />
//     )
// }




import { fetchIVRoomByDate, fetchIVRoomLiveWithFallback } from "@/app/lib/data/iv-room";
import { fetchDailySummaryByDateAndShift, fetchDailySummaryLiveWithFallback, fetchHuddleUpdatesByDate, fetchHuddleUpdatesLiveWithFallback } from "@/app/lib/data";
import { getLocalDate } from "@/app/lib/utils/utils";
import { DEFAULT_SHIFT } from "@/app/lib/config/team-huddles";
import { IvRoom } from "@/app/lib/types/database";
import IVCLient from "./iv-room-page-client";

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{ date?: string }>;
}) {
    const { date } = await searchParams;
    const today = getLocalDate();
    const targetDate = date ?? today;
    const shift = DEFAULT_SHIFT;

    const [ivRoomData, dailySummary, huddleUpdates] = date
        ? await Promise.all([
                fetchIVRoomByDate(targetDate, shift),
                fetchDailySummaryByDateAndShift(targetDate, shift),
                fetchHuddleUpdatesByDate(targetDate, shift),
            ]) 
        : await Promise.all([
                fetchIVRoomLiveWithFallback(today, shift),
                fetchDailySummaryLiveWithFallback(today, shift),
                fetchHuddleUpdatesLiveWithFallback(today, shift),
            ])

    console.log(ivRoomData)

    const mode: 'live' | 'future' | 'past' =
        targetDate === today ? 'live' : targetDate > today ? 'future' : 'past';

    console.log(`Target Date: ${targetDate}`)
    console.log(`Today: ${today}`)
    console.log(`Mode: ${mode}`)
    console.log(`Shift: ${shift}`)
    
    
    return (
        <IVCLient
            key={targetDate}
            initialData={ivRoomData ?? ({} as IvRoom)}
            census={dailySummary?.census ?? null}
            shiftLead={dailySummary?.shift_lead ?? null}
            huddleUpdates={huddleUpdates ?? null}
            viewDate={targetDate}
            mode={mode}
        />
    );
}