import { 
    fetchDailySummaryByDateAndShift,
    fetchLatestDailySummary,
    fetchUpdatesByDailySummaryId
} from ".";
import { 
    DailySummary,
    DashboardData,
    DepartmentType,
    HuddleUpdate,
    ShiftType
} from "../types/database";
import { getAuthenticatedClient } from "../supabase/auth-helpers";



/// ===========================================
// TYPE GUARDS
// ============================================
function isValidShift(shift: string): shift is ShiftType {
  return ["morning", "afternoon", "evening"].includes(shift);
}

function isValidDepartment(department: string): department is DepartmentType {
  return ["Distribution", "CSR", "IVR", "Nonsterile", "RX Leadership"].includes(
    department,
  );
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

    // Organize updates by department
    const updatesByDept = updates.reduce(
      (acc, update) => {
        if (!isValidDepartment(update.department)) {
          console.warn(`Invalid department: ${update.department}`);
          return acc;
        }

        const key = update.department
          .toLowerCase()
          .replace(" ", "_") as keyof typeof acc;
        acc[key] = update;
        return acc;
      },
      {
        distribution: null as HuddleUpdate | null,
        csr: null as HuddleUpdate | null,
        ivr: null as HuddleUpdate | null,
        nonsterile: null as HuddleUpdate | null,
        rx_leadership: null as HuddleUpdate | null,
      },
    );

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

    const updatesByDept = updates.reduce(
      (acc, update) => {
        if (!isValidDepartment(update.department)) {
          console.warn(`Invalid department: ${update.department}`);
          return acc;
        }

        const key = update.department
          .toLowerCase()
          .replace(" ", "_") as keyof typeof acc;
        acc[key] = update;
        return acc;
      },
      {
        distribution: null as HuddleUpdate | null,
        csr: null as HuddleUpdate | null,
        ivr: null as HuddleUpdate | null,
        nonsterile: null as HuddleUpdate | null,
        rx_leadership: null as HuddleUpdate | null,
      },
    );

    return {
      daily_summary: dailySummary,
      updates: updatesByDept,
    };
  } catch (error) {
    console.error("Failed to fetch dashboard data:", error);
    throw new Error("Failed to fetch dashboard data");
  }
}