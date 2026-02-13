import { fetchDailySummaryWithUpdates } from "@/app/lib/data";
import { ShiftType } from "@/app/lib/types/database";
import Calendar from "@/app/ui/dashboard/history/calendar";
import DisplayHistoricalData from "@/app/ui/dashboard/history/historical-card-wrapper";
import ShiftButtons from "@/app/ui/dashboard/history/shift-buttons";

export default async function HistoryPage({
    searchParams
}: {
    searchParams: Promise<{
        date?: string
        shift?: ShiftType
    }>
}) {
    const { date, shift } = await searchParams;

    const data = date && shift
        ? await fetchDailySummaryWithUpdates(date, shift)
        : null;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[25%_1fr] gap-6 mt-20">
            <div>
                <Calendar />
                <ShiftButtons />
            </div>

            <div>
                {data
                    ? (<DisplayHistoricalData data={data} />)
                    : (<div>Select a date and shift</div>)
                }
            </div>
        </div>
    )
}