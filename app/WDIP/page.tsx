import { fetchWDIPAssignments } from "../lib/data/wdip-assignments";
import { WDIPAssignment } from "../lib/types/database";
import { getChicagoShiftContext } from "../lib/utils/shift";
import WdipPageClient from "./WdipPageClient";

export default async function Page() {
  const { shift, shiftDate } = getChicagoShiftContext();
  let assignments: WDIPAssignment[] = [];
  try {
    assignments = await fetchWDIPAssignments(shiftDate, shift);
  } catch (error) {
    console.error("Failed to load WDIP assignments:", error);
  }

  return (
    <WdipPageClient 
      shift={shift}
      shiftDate={shiftDate}
      assignments={assignments}
    />
  )
}