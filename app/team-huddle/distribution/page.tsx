import { DEFAULT_SHIFT } from "@/app/lib/config/team-huddles";
import { fetchDailySummaryByDateAndShift, fetchDailySummaryLiveWithFallback, fetchHuddleUpdatesByDate, fetchHuddleUpdatesLiveWithFallback } from "@/app/lib/data";
import { fetchDistributionByDate, fetchDistributionLiveWithFallback } from "@/app/lib/data/distribution";
import { Distribution } from "@/app/lib/types/database";
import { getLocalDate } from "@/app/lib/utils/utils";
import DistributionClient from "./distribution-page-client";


export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{ date?: string }>
}) {
    const { date } = await searchParams;
    const today = getLocalDate();
    const targetDate = date ?? today
    const shift = DEFAULT_SHIFT

    const [distributionData, dailySummary, huddleUpdates] = date
        ? await Promise.all([
                fetchDistributionByDate(targetDate, shift),
                fetchDailySummaryByDateAndShift(targetDate, shift),
                fetchHuddleUpdatesByDate(targetDate, shift)
            ])
        :  await Promise.all([
                fetchDistributionLiveWithFallback(today, shift),
                fetchDailySummaryLiveWithFallback(today, shift),
                fetchHuddleUpdatesLiveWithFallback(today, shift),
            ])

    const mode: 'live' | 'future' | 'past' =
        targetDate === today ? 'live' : targetDate > today ? 'future' : 'past';

    return (
        <DistributionClient 
            key={targetDate}
            initialData={distributionData ?? ({} as Distribution)} 
            census={dailySummary?.census ?? null}
            shiftLead={dailySummary?.shift_lead ?? null}
            huddleUpdates={huddleUpdates ?? null}
            viewDate={targetDate}
            mode={mode}
        />
    )
}