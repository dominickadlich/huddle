"use server";

import { auth } from "@/auth";
import { createClient } from "./supabase/server";
import type {
  DailySummary,
  Huddle,
  HuddleMetrics,
  HuddleItem,
  HuddleWithMetrics,
  DailySummaryWithHuddles,
  DashboardData,
  ShiftType,
  DepartmentType,
} from "../lib/types/database";

// ============================================
// HELPER: Get authenticated Supabase client
// ============================================
async function getAuthenticatedClient() {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Authentication required");
  }
  
  const supabase = await createClient(); // Uses anon key, respects RLS
  return { supabase, userId: session.user.id };
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
      if (error.code === "PGRST116") return null; // No rows found
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Failed to fetch latest daily summary:", error);
    throw new Error("Failed to fetch latest daily summary");
  }
}

export async function fetchDailySummaryByDateAndShift(
  date: string,
  shift: ShiftType
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
// HUDDLE QUERIES (with related data)
// ============================================

export async function fetchHuddlesByDateAndShift(
  date: string,
  shift: ShiftType
): Promise<HuddleWithMetrics[]> {
  const { supabase } = await getAuthenticatedClient();

  try {
    const { data, error } = await supabase
      .from("huddles")
      .select(`
        *,
        metrics:huddle_metrics(*),
        items:huddle_items(*)
      `)
      .eq("date", date)
      .eq("shift", shift)
      .order("department", { ascending: true });

    if (error) throw error;

    // Transform the data to match our type
    return (data || []).map((huddle) => ({
      ...huddle,
      metrics: Array.isArray(huddle.metrics) ? huddle.metrics[0] || null : huddle.metrics,
      items: huddle.items || [],
    }));
  } catch (error) {
    console.error("Failed to fetch huddles:", error);
    throw new Error("Failed to fetch huddles");
  }
}

export async function fetchHuddleById(id: string): Promise<HuddleWithMetrics | null> {
  const { supabase } = await getAuthenticatedClient();

  try {
    const { data, error } = await supabase
      .from("huddles")
      .select(`
        *,
        metrics:huddle_metrics(*),
        items:huddle_items(*)
      `)
      .eq("id", id)
      .single();

    if (error) {
      if (error.code === "PGRST116") return null;
      throw error;
    }

    return {
      ...data,
      metrics: Array.isArray(data.metrics) ? data.metrics[0] || null : data.metrics,
      items: data.items || [],
    };
  } catch (error) {
    console.error("Failed to fetch huddle:", error);
    throw new Error("Failed to fetch huddle");
  }
}

export async function fetchHuddleByDepartmentDateShift(
  department: DepartmentType,
  date: string,
  shift: ShiftType
): Promise<HuddleWithMetrics | null> {
  const { supabase } = await getAuthenticatedClient();

  try {
    const { data, error } = await supabase
      .from("huddles")
      .select(`
        *,
        metrics:huddle_metrics(*),
        items:huddle_items(*)
      `)
      .eq("department", department)
      .eq("date", date)
      .eq("shift", shift)
      .single();

    if (error) {
      if (error.code === "PGRST116") return null;
      throw error;
    }

    return {
      ...data,
      metrics: Array.isArray(data.metrics) ? data.metrics[0] || null : data.metrics,
      items: data.items || [],
    };
  } catch (error) {
    console.error("Failed to fetch huddle:", error);
    throw new Error("Failed to fetch huddle");
  }
}

// ============================================
// DASHBOARD QUERIES (complete view)
// ============================================

export async function fetchLatestDashboardData(): Promise<DashboardData | null> {
  const { supabase } = await getAuthenticatedClient();

  try {
    // First, get the latest daily summary
    const latestSummary = await fetchLatestDailySummary();
    if (!latestSummary) return null;

    // Then get all huddles for that date/shift
    const huddles = await fetchHuddlesByDateAndShift(
      latestSummary.date,
      latestSummary.shift
    );

    // Organize by department
    const huddlesByDept = huddles.reduce((acc, huddle) => {
      acc[huddle.department.toLowerCase() as keyof typeof acc] = huddle;
      return acc;
    }, {
      csr: null as HuddleWithMetrics | null,
      ivr: null as HuddleWithMetrics | null,
      cambridge: null as HuddleWithMetrics | null,
      operations: null as HuddleWithMetrics | null,
    });

    return {
      daily_summary: latestSummary,
      huddles: huddlesByDept,
    };
  } catch (error) {
    console.error("Failed to fetch dashboard data:", error);
    throw new Error("Failed to fetch dashboard data");
  }
}

export async function fetchDashboardDataByDateAndShift(
  date: string,
  shift: ShiftType
): Promise<DashboardData | null> {
  const { supabase } = await getAuthenticatedClient();

  try {
    const dailySummary = await fetchDailySummaryByDateAndShift(date, shift);
    if (!dailySummary) return null;

    const huddles = await fetchHuddlesByDateAndShift(date, shift);

    const huddlesByDept = huddles.reduce((acc, huddle) => {
      acc[huddle.department.toLowerCase() as keyof typeof acc] = huddle;
      return acc;
    }, {
      csr: null as HuddleWithMetrics | null,
      ivr: null as HuddleWithMetrics | null,
      cambridge: null as HuddleWithMetrics | null,
      operations: null as HuddleWithMetrics | null,
    });

    return {
      daily_summary: dailySummary,
      huddles: huddlesByDept,
    };
  } catch (error) {
    console.error("Failed to fetch dashboard data:", error);
    throw new Error("Failed to fetch dashboard data");
  }
}

// ============================================
// HUDDLE ITEMS QUERIES
// ============================================

export async function fetchOpenIssuesAndBarriers(): Promise<HuddleItem[]> {
  const { supabase } = await getAuthenticatedClient();

  try {
    const { data, error } = await supabase
      .from("huddle_items")
      .select(`
        *,
        huddle:huddles(date, shift, department)
      `)
      .in("type", ["unresolved_issue", "barrier"])
      .eq("status", "open")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Failed to fetch open issues:", error);
    throw new Error("Failed to fetch open issues");
  }
}

export async function fetchItemsByHuddleId(huddleId: string): Promise<HuddleItem[]> {
  const { supabase } = await getAuthenticatedClient();

  try {
    const { data, error } = await supabase
      .from("huddle_items")
      .select("*")
      .eq("huddle_id", huddleId)
      .order("created_at", { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Failed to fetch huddle items:", error);
    throw new Error("Failed to fetch huddle items");
  }
}

// ============================================
// HISTORICAL DATA QUERIES
// ============================================

export async function fetchRecentDailySummaries(limit: number = 7): Promise<DailySummary[]> {
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

export async function fetchHuddlesByDateRange(
  startDate: string,
  endDate: string,
  department?: DepartmentType
): Promise<HuddleWithMetrics[]> {
  const { supabase } = await getAuthenticatedClient();

  try {
    let query = supabase
      .from("huddles")
      .select(`
        *,
        metrics:huddle_metrics(*),
        items:huddle_items(*)
      `)
      .gte("date", startDate)
      .lte("date", endDate)
      .order("date", { ascending: false });

    if (department) {
      query = query.eq("department", department);
    }

    const { data, error } = await query;

    if (error) throw error;

    return (data || []).map((huddle) => ({
      ...huddle,
      metrics: Array.isArray(huddle.metrics) ? huddle.metrics[0] || null : huddle.metrics,
      items: huddle.items || [],
    }));
  } catch (error) {
    console.error("Failed to fetch huddles by date range:", error);
    throw new Error("Failed to fetch huddles by date range");
  }
}