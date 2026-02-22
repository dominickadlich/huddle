import { getAuthenticatedClient } from "../supabase/auth-helpers";
import { DailySummary, DailySummaryWithUpdates, HuddleUpdate, ShiftType } from "../types/database";


// ============================================
// Fetch Latest Daily Summary
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


// ============================================
// Fetch Recent Daily Summaries
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


// ============================================
// Fetch Latest Daily Summary by Date & Shift
// ============================================
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



// ============================================
// Fetch Latest Daily Summary w/ Updates
// ============================================
export async function fetchLatestDailySummaryWithUpdates(): Promise<DailySummaryWithUpdates | null> {
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
    console.error("Failed to fetch latest daily summary with updates:", error);
    throw new Error("Failed to fetch latest daily summary with updates");
  }
}

// ============================================
// Fetch Latest Daily Summary w/ Updates
// ============================================
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