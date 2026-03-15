import { fetchLatestDailySummary } from "@/app/lib/data";
import DailySummaryCard from "./daily-summary-card";

export default async function DailySummaryCardWrapper() {
  const data = await fetchLatestDailySummary();

  if (!data) {
    return (
      <>
        <DailySummaryCard
          title="Census"
          value="Click to add"
          type="census"
          id={null}
        />
        <DailySummaryCard
          title="TPN"
          value="Click to add"
          type="tpn"
          id={null}
        />
        <DailySummaryCard
          title="Hazardous"
          value="Click to add"
          type="hazardous"
          id={null}
        />
        <DailySummaryCard
          title="Staffing"
          value="Click to add"
          type="staffing"
          id={null}
        />
        <DailySummaryCard
          title="Shift Lead"
          value="Click to add"
          type="shift_lead"
          id={null}
        />
      </>
    );
  }
  const { id, census, tpn, hazardous, staffing, shift_lead } = data;

  return (
    <>
      <DailySummaryCard
        title="Census"
        value={census ? census : "Click to add"}
        type="census"
        id={id}
      />
      <DailySummaryCard
        title="TPN"
        value={tpn ? tpn : "Click to add"}
        type="tpn"
        id={id}
      />
      <DailySummaryCard
        title="Hazardous"
        value={hazardous ? hazardous : "Click to add"}
        type="hazardous"
        id={id}
      />
      <DailySummaryCard
        title="Staffing"
        value={staffing ? staffing : "Click to add"}
        type="staffing"
        id={id}
      />
      <DailySummaryCard
        title="Shift Lead"
        value={shift_lead ? shift_lead : "Click to add"}
        type="shift_lead"
        id={id}
      />
    </>
  );
}
