import { DEFAULT_SHIFT } from "@/app/lib/config/team-huddles";
import { fetchDailySummaryByDateAndShift, fetchDailySummaryLiveWithFallback, fetchHuddleUpdatesByDate, fetchHuddleUpdatesLiveWithFallback } from "@/app/lib/data";
import { Overnight } from "@/app/lib/types/database";
import { getLocalDate, getOvernightAnchorDate } from "@/app/lib/utils/utils";
import OvernightClient from "./overnight-page-client";
import { fetchOvernightByDate, fetchOvernightLiveWithFallback } from "@/app/lib/data/overnight";


export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{ date?: string }>
}) {
    const { date } = await searchParams;
    const today = getLocalDate();
    const overnightDate = getOvernightAnchorDate();
    const targetDate = date ?? overnightDate;
    const shift = DEFAULT_SHIFT

    const [overnightData, dailySummary, huddleUpdates] = await Promise.all([
        fetchOvernightByDate(targetDate, shift),
        date
            ? fetchDailySummaryByDateAndShift(targetDate, shift)
            : fetchDailySummaryLiveWithFallback(today, shift),
        date
            ? fetchHuddleUpdatesByDate(targetDate, shift)
            : fetchHuddleUpdatesLiveWithFallback(today, shift),
        ])

    const mode: 'live' | 'future' | 'past' =
        targetDate === overnightDate ? 'live' : targetDate > overnightDate ? 'future' : 'past';

    return (
        <OvernightClient 
            key={targetDate}
            initialData={overnightData ?? ({} as Overnight)} 
            census={dailySummary?.census ?? null}
            shiftLead={dailySummary?.shift_lead ?? null}
            huddleUpdates={huddleUpdates ?? null}
            viewDate={targetDate}
            mode={mode}
        />
    )
}