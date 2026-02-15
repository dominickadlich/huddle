import { getAuthenticatedClient } from "../supabase/auth-helpers";
import { 
    DepartmentType,
    HuddleUpdate
} from "../types/database";


// ============================================
// Fetch Huddle Updates by Daily Summary
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


// ============================================
// Fetch Latest Huddle Updates
// ============================================
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


// ============================================
// Fetch Huddle Updates By Department
// ============================================
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

