import { DEFAULT_SHIFT } from "@/app/lib/config/team-huddles";
import { fetchDailySummaryByDateAndShift, fetchDailySummaryLiveWithFallback, fetchHuddleUpdatesByDate, fetchHuddleUpdatesLiveWithFallback } from "@/app/lib/data";
import { Overnight } from "@/app/lib/types/database";
import { getLocalDate } from "@/app/lib/utils/utils";
import OvernightClient from "./overnight-page-client";
import { fetchOvernightByDate, fetchOvernightLiveWithFallback } from "@/app/lib/data/overnight";


export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{ date?: string }>
}) {
    const { date } = await searchParams;
    const today = getLocalDate();
    const targetDate = date ?? today
    const shift = DEFAULT_SHIFT

    const [overnightData, dailySummary, huddleUpdates] = date
        ? await Promise.all([
                fetchOvernightByDate(targetDate, shift),
                fetchDailySummaryByDateAndShift(targetDate, shift),
                fetchHuddleUpdatesByDate(targetDate, shift)
            ])
        :  await Promise.all([
                fetchOvernightLiveWithFallback(today, shift),
                fetchDailySummaryLiveWithFallback(today, shift),
                fetchHuddleUpdatesLiveWithFallback(today, shift),
            ])

    const mode: 'live' | 'future' | 'past' =
        targetDate === today ? 'live' : targetDate > today ? 'future' : 'past';

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