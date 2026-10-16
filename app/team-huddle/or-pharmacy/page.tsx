import {
    fetchDailySummaryByDateAndShift,
    fetchDailySummaryLiveWithFallback,
    fetchHuddleUpdatesByDate,
    fetchHuddleUpdatesLiveWithFallback,
} from "@/app/lib/data";
import { applyBatchingTemplate, fetchORPharmacyByDate, fetchORPharmacyLiveWithFallback } from "@/app/lib/data/or-pharmacy";
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
    const targetDate = date ?? today;
    const shift = DEFAULT_SHIFT;

    const mode: 'live' | 'future' | 'past' =
        targetDate === today ? 'live' : targetDate > today ? 'future' : 'past';

    const [orPharmacyData, dailySummary, huddleUpdates] = date
        ? await Promise.all([
              fetchORPharmacyByDate(targetDate, shift),
              fetchDailySummaryByDateAndShift(targetDate, shift),
              fetchHuddleUpdatesByDate(targetDate, shift),
          ])
        : await Promise.all([
              fetchORPharmacyLiveWithFallback(today, shift),
              fetchDailySummaryLiveWithFallback(today, shift),
              fetchHuddleUpdatesLiveWithFallback(today, shift),
          ]);

    const initialData = applyBatchingTemplate(orPharmacyData, targetDate) as ORPharmacy;

    return (
        <ORPharmacyClient
            key={targetDate}
            initialData={initialData}
            census={dailySummary?.census ?? null}
            shiftLead={dailySummary?.shift_lead ?? null}
            huddleUpdates={huddleUpdates ?? null}
            viewDate={targetDate}
            mode={mode}
        />
    );
}