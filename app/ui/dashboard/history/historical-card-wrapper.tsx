import { DailySummaryWithUpdates, DepartmentUpdate } from "@/app/lib/types/database";
import HistoricalHuddleCard from "./historical-huddle-card";
import HistoricalSummaryCard from "./historical-summary-card";

export default function DisplayHistoricalData({
    data
}: {
    data: DailySummaryWithUpdates
}) {
    const updatesByDepartment = data.updates.reduce(
        (acc, update) => {
            const key = update.department
            .toLowerCase()
            .replace(" ", "_") as keyof typeof acc;
            acc[key] = {
                id: update.id,
                update_text: update.update_text
            };
            return acc
        },
        {
            distribution: null as DepartmentUpdate,
            csr: null as DepartmentUpdate,
            ivr: null as DepartmentUpdate,
            nonsterile: null as DepartmentUpdate,
            rx_leadership: null as DepartmentUpdate,
        },
    );

    const { distribution, csr, ivr, nonsterile, rx_leadership } =
    updatesByDepartment;

    const { census, tpn, hazardous, staffing } = data;

    return (
        <>
            <div className="w-full h-full">
                <div className="grid grid-cols-4 gap-6">
                    <HistoricalSummaryCard
                        title="Census"
                        value={census ? census : "No Data"}
                        type="census"
                    />
                    <HistoricalSummaryCard
                        title="TPN"
                        value={tpn ? tpn : "No Data"}
                        type="tpn"
                    />
                    <HistoricalSummaryCard
                        title="Hazardous"
                        value={hazardous ? hazardous : "No Data"}
                        type="hazardous"
                    />
                    <HistoricalSummaryCard
                        title="Staffing"
                        value={staffing ? staffing : "No Data"}
                        type="staffing"
                    />
                </div>

                <div className="mt-10 grid grid-cols-1 gap-6">
                    <HistoricalHuddleCard
                        title="Distribution"
                        value={distribution?.update_text ?? "No Data"}
                        type="distribution"
                    />
                    <HistoricalHuddleCard
                        title="CSR"
                        value={csr?.update_text ?? "No Data"}
                        type="csr"
                    />
                    <HistoricalHuddleCard
                        title="IVR"
                        value={ivr?.update_text ?? "No Data"}
                        type="ivr"
                    />
                    <HistoricalHuddleCard
                        title="Non-Sterile"
                        value={nonsterile?.update_text ?? "No Data"}
                        type="nonsterile"
                    />
                    <HistoricalHuddleCard
                        title="Rx Leadership"
                        value={rx_leadership?.update_text ?? "No Data"}
                        type="rx_leadership"
                    />
                </div>
            </div>
        </>
      );
}