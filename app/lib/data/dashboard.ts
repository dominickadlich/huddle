import { 
    fetchDailySummaryByDateAndShift,
    fetchLatestDailySummary,
    fetchUpdatesByDailySummaryId
} from ".";
import { 
    DashboardData,
    DepartmentType,
    HuddleUpdate,
    ShiftType
} from "../types/database";



/// ===========================================
// TYPE GUARDS
// ============================================
function isValidShift(shift: string): shift is ShiftType {
  return ["morning", "afternoon", "evening"].includes(shift);
}

function isValidDepartment(department: string): department is DepartmentType {
  return ["Distribution", "CSR", "IVR", "Nonsterile", "RX Leadership", "ORP", "T8"].includes(
    department,
  );
}

const DEPT_TO_SLUG: Record<DepartmentType, keyof DashboardData["updates"]> = {
  Distribution: "distribution",
  CSR: "csr",
  IVR: "ivr",
  Nonsterile: "nonsterile",
  ORP: "or_pharmacy",
  T8: "team_eight",
  "RX Leadership": "rx_leadership",
};

function groupUpdatesByDepartment(updates: HuddleUpdate[]): DashboardData["updates"] {
// Organize updates by department
    const updatesByDept = updates.reduce(
      (acc, update) => {
        if (!isValidDepartment(update.department)) {
          console.warn(`Invalid department: ${update.department}`);
          return acc;
        }

        const key = DEPT_TO_SLUG[update.department]
        acc[key] = update;
        return acc;
      },
      {
        distribution: null as HuddleUpdate | null,
        csr: null as HuddleUpdate | null,
        ivr: null as HuddleUpdate | null,
        nonsterile: null as HuddleUpdate | null,
        rx_leadership: null as HuddleUpdate | null,
        or_pharmacy: null as HuddleUpdate | null,
        team_eight: null as HuddleUpdate | null
      },
    );

    return updatesByDept
}


/// ===========================================
// Fetch Latest Dashboard Data
// ============================================
export async function fetchLatestDashboardData(): Promise<DashboardData | null> {
  try {
    const latestSummary = await fetchLatestDailySummary();
    if (!latestSummary) return null;

    if (!isValidShift(latestSummary.shift)) {
      throw new Error(`Invalid shift type: ${latestSummary.shift}`);
    }

    const updates = await fetchUpdatesByDailySummaryId(latestSummary.id);

    const updatesByDept = groupUpdatesByDepartment(updates)

    return {
      daily_summary: latestSummary,
      updates: updatesByDept,
    };
  } catch (error) {
    console.error("Failed to fetch dashboard data:", error);
    throw new Error("Failed to fetch dashboard data");
  }
}


/// ===========================================
// Fetch Dashboard Data by Date & Shift
// ============================================
export async function fetchDashboardDataByDateAndShift(
  date: string,
  shift: ShiftType,
): Promise<DashboardData | null> {
  try {
    const dailySummary = await fetchDailySummaryByDateAndShift(date, shift);
    if (!dailySummary) return null;

    const updates = await fetchUpdatesByDailySummaryId(dailySummary.id);

    const updatesByDept = groupUpdatesByDepartment(updates)

    return {
      daily_summary: dailySummary,
      updates: updatesByDept,
    };
  } catch (error) {
    console.error("Failed to fetch dashboard data:", error);
    throw new Error("Failed to fetch dashboard data");
  }
}