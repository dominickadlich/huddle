import { fetchLatestDailySummary } from "@/app/lib/data";
import DailySummaryCard from "./daily-summary-card";

export default async function DailySummaryCardWrapper() {
  const data = await fetchLatestDailySummary()

  if (!data) {
    return (
      <>
        <DailySummaryCard title="Census" value="Click + to add" type="census" id={null} />
        <DailySummaryCard title="TPN" value="Click + to add" type="tpn" id={null} />
        <DailySummaryCard title="Hazardous" value="Click + to add" type="hazardous" id={null} />
        <DailySummaryCard title="Staffing" value="Click + to add" type="staffing" id={null} />
      </>
    );
  } 
  const { id, census, tpn, hazardous, staffing } = data
  
  return (
    <>
      <DailySummaryCard title="Census" value={census} type="census" id={id}/>
      <DailySummaryCard title="TPN" value={tpn} type="tpn" id={id} />
      <DailySummaryCard title="Hazardous" value={hazardous} type="hazardous" id={id} />
      <DailySummaryCard title="Staffing" value={staffing} type="staffing" id={id} />
    </>
  );
}