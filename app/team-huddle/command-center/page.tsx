import { DEFAULT_SHIFT } from "@/app/lib/config/team-huddles";
import { fetchDailySummaryByDateAndShift, fetchDailySummaryLiveWithFallback, fetchHuddleUpdatesByDate, fetchHuddleUpdatesLiveWithFallback } from "@/app/lib/data";
import { fetchCommandCenterByDate, fetchCommandCenterLiveWithFallback } from "@/app/lib/data/command-center";
import { getLocalDate } from "@/app/lib/utils/utils";
import CommandCenterClient from "./command-center-page-client";
import { CommandCenter } from "@/app/lib/types/database";


export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{ date?: string }>
}) {
    const { date } = await searchParams;
    const today = getLocalDate();
    const targetDate = date ?? today
    const shift = DEFAULT_SHIFT

    const [commandCenterData, dailySummary, huddleUpdates] = date
        ? await Promise.all([
                fetchCommandCenterByDate(targetDate, shift),
                fetchDailySummaryByDateAndShift(targetDate, shift),
                fetchHuddleUpdatesByDate(targetDate, shift)
            ])
        :  await Promise.all([
                fetchCommandCenterLiveWithFallback(today, shift),
                fetchDailySummaryLiveWithFallback(today, shift),
                fetchHuddleUpdatesLiveWithFallback(today, shift),
            ])

    const mode: 'live' | 'future' | 'past' =
        targetDate === today ? 'live' : targetDate > today ? 'future' : 'past';

    return (
        <CommandCenterClient
            key={targetDate}
            initialData={commandCenterData ?? ({} as CommandCenter)}
            census={dailySummary?.census ?? null}
            shiftLead={dailySummary?.shift_lead ?? null}      
            huddleUpdates={huddleUpdates ?? null}
            viewDate={targetDate}
            mode={mode}
        />
    )
}