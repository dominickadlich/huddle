import { fetchDailySummaryByDateAndShift, fetchDailySummaryLiveWithFallback, fetchHuddleUpdatesByDate, fetchHuddleUpdatesLiveWithFallback, fetchLatestDailySummary, fetchLatestHuddleUpdates } from "@/app/lib/data";
import { fetchORPharmacyByDate, fetchORPharmacyLiveWithFallback } from "@/app/lib/data/or-pharmacy"
import ORPharmacyClient from "./or-pharmacy-page-client";
import { ORPharmacy } from "@/app/lib/types/database";
import { getLocalDate } from "@/app/lib/utils/utils";
import { DEFAULT_SHIFT } from "@/app/lib/config/team-huddles";

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{ date?: string }>
}) {
    const { date } = await searchParams;
    const today = getLocalDate();
    const targetDate = date ?? today
    const shift = DEFAULT_SHIFT

    const [orPharmacyData, dailySummary, huddleUpdates] = date
        ? await Promise.all([
                fetchORPharmacyByDate(targetDate, shift),
                fetchDailySummaryByDateAndShift(targetDate, shift),
                fetchHuddleUpdatesByDate(targetDate, shift)
            ])
        :  await Promise.all([
                fetchORPharmacyLiveWithFallback(today, shift),
                fetchDailySummaryLiveWithFallback(today, shift),
                fetchHuddleUpdatesLiveWithFallback(today, shift),
            ])

    const mode: 'live' | 'future' | 'past' =
        targetDate === today ? 'live' : targetDate > today ? 'future' : 'past';

    return (
        <ORPharmacyClient
            key={targetDate}
            initialData={orPharmacyData ?? ({} as ORPharmacy)}
            census={dailySummary?.census ?? null}
            shiftLead={dailySummary?.shift_lead ?? null}
            huddleUpdates={huddleUpdates ?? null}
            viewDate={targetDate}
            mode={mode}
        />
    )
}
