import { DEFAULT_SHIFT } from "@/app/lib/config/team-huddles";
import { fetchDailySummaryByDateAndShift, fetchDailySummaryLiveWithFallback, fetchHuddleUpdatesByDate, fetchHuddleUpdatesLiveWithFallback } from "@/app/lib/data";
import { fetchMedHistoryByDate, fetchMedHistoryLiveWithFallback } from "@/app/lib/data/med-history";
import { getLocalDate } from "@/app/lib/utils/utils";
import { MedHistory } from "@/app/lib/types/database";
import MedHistoryClient from "./med-history-page-client";


export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{ date?: string }>
}) {
    const { date } = await searchParams;
    const today = getLocalDate();
    const targetDate = date ?? today
    const shift = DEFAULT_SHIFT

    const [medHistoryData, dailySummary, huddleUpdates] = date
        ? await Promise.all([
                fetchMedHistoryByDate(targetDate, shift),
                fetchDailySummaryByDateAndShift(targetDate, shift),
                fetchHuddleUpdatesByDate(targetDate, shift)
            ])
        :  await Promise.all([
                fetchMedHistoryLiveWithFallback(today, shift),
                fetchDailySummaryLiveWithFallback(today, shift),
                fetchHuddleUpdatesLiveWithFallback(today, shift),
            ])

    const mode: 'live' | 'future' | 'past' =
        targetDate === today ? 'live' : targetDate > today ? 'future' : 'past';

    return (
        <MedHistoryClient 
            key={targetDate}
            initialData={medHistoryData ?? ({} as MedHistory)} 
            census={dailySummary?.census ?? null}
            shiftLead={dailySummary?.shift_lead ?? null}
            huddleUpdates={huddleUpdates ?? null}
            viewDate={targetDate}
            mode={mode}
        />
    )
}