"use server";

import { getAuthenticatedClient } from "./supabase/auth-helpers";
import type {
  DailySummary,
  HuddleUpdate,
  DailySummaryWithUpdates,
  DashboardData,
  ShiftType,
  DepartmentType,
} from "./types/database";

// ============================================
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

// ============================================
// DAILY SUMMARY QUERIES
// ============================================

export async function fetchLatestDailySummary(): Promise<DailySummary | null> {
  const { supabase } = await getAuthenticatedClient();

  try {
    const { data, error } = await supabase
      .from("daily_summary")
      .select("*")
      .order("date", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (error) {
      if (error.code === "PGRST116") return null; // Handle no results
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Failed to fetch latest daily summary:", error);
    throw new Error("Failed to fetch latest daily summary");
  }
}

export async function fetchLatestHuddleUpdates(): Promise<
  HuddleUpdate[] | null
> {
  const { supabase } = await getAuthenticatedClient();

  try {
    const { data, error } = await supabase
      .from("huddle_updates")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      if (error.code === "PGRST116") return null; // Handle no results
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Failed to fetch latest huddle updates:", error);
    throw new Error("Failed to fetch latest huddle updates");
  }
}

export async function fetchDailySummaryByDateAndShift(
  date: string,
  shift: ShiftType,
): Promise<DailySummary | null> {
  const { supabase } = await getAuthenticatedClient();

  try {
    const { data, error } = await supabase
      .from("daily_summary")
      .select("*")
      .eq("date", date)
      .eq("shift", shift)
      .single();

    if (error) {
      if (error.code === "PGRST116") return null;
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Failed to fetch daily summary:", error);
    throw new Error("Failed to fetch daily summary");
  }
}

export async function fetchDailySummaryWithUpdates(
  date: string | null,
  shift: ShiftType | null,
): Promise<DailySummaryWithUpdates | null> {
  const { supabase } = await getAuthenticatedClient();

  try {
    const { data, error } = await supabase
      .from("daily_summary")
      .select(
        `
        *,
        updates:huddle_updates(*)
      `,
      )
      .eq("date", date)
      .eq("shift", shift)
      .single();

    if (error) {
      if (error.code === "PGRST116") return null;
      throw error;
    }

    return {
      ...data,
      updates: data.updates || [],
    };
  } catch (error) {
    console.error("Failed to fetch daily summary with updates:", error);
    throw new Error("Failed to fetch daily summary with updates");
  }
}

// ============================================
// HUDDLE UPDATES QUERIES
// ============================================

export async function fetchUpdatesByDailySummaryId(
  dailySummaryId: string,
): Promise<HuddleUpdate[]> {
  const { supabase } = await getAuthenticatedClient();

  try {
    const { data, error } = await supabase
      .from("huddle_updates")
      .select("*")
      .eq("daily_summary_id", dailySummaryId)
      .order("department", { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Failed to fetch huddle updates:", error);
    throw new Error("Failed to fetch huddle updates");
  }
}

export async function fetchUpdateByDepartment(
  dailySummaryId: string,
  department: DepartmentType,
): Promise<HuddleUpdate | null> {
  const { supabase } = await getAuthenticatedClient();

  try {
    const { data, error } = await supabase
      .from("huddle_updates")
      .select("*")
      .eq("daily_summary_id", dailySummaryId)
      .eq("department", department)
      .single();

    if (error) {
      if (error.code === "PGRST116") return null;
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Failed to fetch department update:", error);
    throw new Error("Failed to fetch department update");
  }
}

// ============================================
// DASHBOARD QUERY (complete view)
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

// ============================================
// HISTORICAL QUERIES
// ============================================

export async function fetchRecentDailySummaries(
  limit: number = 7,
): Promise<DailySummary[]> {
  const { supabase } = await getAuthenticatedClient();

  try {
    const { data, error } = await supabase
      .from("daily_summary")
      .select("*")
      .order("date", { ascending: false })
      .order("shift", { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Failed to fetch recent summaries:", error);
    throw new Error("Failed to fetch recent summaries");
  }
}
