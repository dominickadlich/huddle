import { DEFAULT_SHIFT } from "@/app/lib/config/team-huddles";
import { fetchDailySummaryByDateAndShift, fetchDailySummaryLiveWithFallback, fetchHuddleUpdatesByDate, fetchHuddleUpdatesLiveWithFallback } from "@/app/lib/data";
import { fetchTeamEightByDate, fetchTeamEightLiveWithFallback } from "@/app/lib/data/team-eight";
import { TeamEight } from "@/app/lib/types/database";
import { getLocalDate } from "@/app/lib/utils/utils";
import TeamEightPageClient from "./team-eight-page-client";


export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{ date?: string }>
}) {
    const { date } = await searchParams;
    const today = getLocalDate();
    const targetDate = date ?? today
    const shift = DEFAULT_SHIFT

    const [teamEightData, dailySummary, huddleUpdates] = date
        ? await Promise.all([
                fetchTeamEightByDate(targetDate, shift),
                fetchDailySummaryByDateAndShift(targetDate, shift),
                fetchHuddleUpdatesByDate(targetDate, shift)
            ])
        :  await Promise.all([
                fetchTeamEightLiveWithFallback(today, shift),
                fetchDailySummaryLiveWithFallback(today, shift),
                fetchHuddleUpdatesLiveWithFallback(today, shift),
            ])

    const mode: 'live' | 'future' | 'past' =
        targetDate === today ? 'live' : targetDate > today ? 'future' : 'past';
    
    return (
        <TeamEightPageClient
            key={targetDate}
            initialData={teamEightData ?? ({} as TeamEight)}
            census={dailySummary?.census ?? null}
            shiftLead={dailySummary?.shift_lead ?? null}
            huddleUpdates={huddleUpdates ?? null}
            viewDate={targetDate}
            mode={mode}
        />
    )
}