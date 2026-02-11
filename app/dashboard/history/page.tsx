import { fetchDailySummaryByDateAndShift } from "@/app/lib/data";
import { ShiftType } from "@/app/lib/types/database";
import Calendar from "@/app/ui/dashboard/history/calendar";
import ShiftButtons from "@/app/ui/dashboard/history/shift-buttons";

export default async function HistoryPage({
    searchParams
}: {
    searchParams: {
        date: string
        shift: string
    }
}) {
    const date = searchParams.date;
    const shift = searchParams.shift as ShiftType | undefined

    const data = date && shift
        ? await fetchDailySummaryByDateAndShift(date, shift)
        : null;

    return (
        <>
            <Calendar />
            <ShiftButtons />

            {/* {data
                ? (<DisplayHistoricalData data={data} />)
                : (<div>Select a date and shift</div>)
            } */}
        </>
    )
}