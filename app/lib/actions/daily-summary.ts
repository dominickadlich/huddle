"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { getAuthenticatedClient } from "../supabase/auth-helpers";
import { fetchDailySummaryByDateAndShift } from "../data";
import type {
  DailySummary,
  DailySummaryInsert,
  DailySummaryUpdate,
  ShiftType,
} from "../types/database";
import { getCurrentShift, getLocalDate } from "../utils";

// ============================================
// ZOD VALIDATION SCHEMAS
// ============================================
const DailySummarySchema = z.object({
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
  shift: z.enum(["morning", "afternoon", "evening"]),
  census: z.coerce.number().int().min(0).nullable().optional(),
  tpn: z.string().nullable().optional(),
  hazardous: z.string().nullable().optional(),
  staffing: z.string().nullable().optional(),
  shift_lead: z.string().nullable().optional(),
  // Weekend fields (optional)
  recognition: z.string().nullable().optional(),
  issues_safety: z.string().nullable().optional(),
  announcements: z.string().nullable().optional(),
});

// ============================================
// STATE TYPES FOR FORM ACTIONS
// ============================================
export type DailySummaryState = {
  errors?: {
    date?: string[];
    shift?: string[];
    census?: string[];
    tpn?: string[];
    hazardous?: string[];
    staffing?: string[];
    recognition?: string[];
    issues_safety?: string[];
    announcements?: string[];
    _form?: string[];
  };
  message?: string | null;
  data?: DailySummary | null;
};

// ============================================
// UPSERT DAILY SUMMARY (Create or Update)
// ============================================
export async function upsertDailySummary(
  data: DailySummaryUpdate
): Promise<{ success: boolean, message: string }> {
  try { 
    const { supabase, userId } = await getAuthenticatedClient();


    const validated = DailySummarySchema.parse(data);

    // Check if record exists
    const { data: existing } = await supabase
      .from("daily_summary")
      .select("id")
      .eq("date", validated.date)
      .eq("shift", validated.shift)
      .single();

    if (existing) {
      // UPDATE existing record
      const { error } = await supabase
        .from('daily_summary')
        .update({
          ...validated,
          updated_by: userId,
        })
        .eq('id', existing.id);

      if (error) throw error;
    } else {
      // CREATE new record
      const { error } = await supabase
        .from("daily_summary")
        .insert({
          ...validated,
          created_by: userId,
          updated_by: userId,
        })

      if (error) throw error;
    }

      revalidatePath("/dashboard");
      return {
        success: true,
        message: "Daily summary created successfully!",
      }
  } catch (error) {
    console.error("Failed to save daily summary:", error);
    return { success: false, message: "Failed to save Daily Summary.",};
  }
}

// ============================================
// GENERIC FIELD UPSERTER
// ============================================
export async function upsertDailySummaryField(
  field: keyof DailySummaryUpdate,
  value: string | null,
  date: string,
  shift: ShiftType
): Promise<{ success: boolean; message: string }> {
  try {
    const { supabase, userId } = await getAuthenticatedClient();

    // 3. Check if record exists for today + current shift
    const { data: existing } = await supabase
      .from("daily_summary")
      .select("id")
      .eq("date", date)
      .eq("shift", shift)
      .single();

    if (existing) {
      // UPDATE
      const { error } = await supabase
        .from("daily_summary")
        .update({
          [field]: value,
          updated_by: userId,
        })
        .eq("id", existing.id);

      if (error) throw error;

      revalidatePath("/dashboard");

      return {
        success: true,
        message: "Daily summary updated successfully!",
      };
    } else {
      // INSERT
      const { error } = await supabase.from("daily_summary").insert({
        date,
        shift,
        [field]: value,
        updated_by: userId,
        created_by: userId,
      });

      if (error) throw error;

      revalidatePath("/dashboard");

      return {
        success: true,
        message: "Daily summary created successfully!",
      };
    }
  } catch (error) {
    console.error("Failed to save daily summary:", error);
    return {
      success: false,
      message: "Database error: Failed to save daily summary.",
    };
  }
}

// ============================================
// GENERIC FIELD UPDATER
// ============================================
export async function updateDailySummaryField(
  id: string,
  field: keyof DailySummaryUpdate,
  value: string | null,
): Promise<{ success: boolean; message: string }> {
  try {
    const { supabase, userId } = await getAuthenticatedClient();

    const { error } = await supabase
      .from("daily_summary")
      .update({
        [field]: value,
        updated_by: userId,
      })
      .eq("id", id);

    if (error) throw error;

    revalidatePath("/dashboard");

    return {
      success: true,
      message: `${String(field)} updated successfully!`,
    };
  } catch (error) {
    console.error(`Failed to update ${String(field)}:`, error);
    return {
      success: false,
      message: `Failed to update ${String(field)}.`,
    };
  }
}

// ============================================
// DELETE DAILY SUMMARY
// ============================================
export async function deleteDailySummary(id: string): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    const { supabase } = await getAuthenticatedClient();

    const { error } = await supabase
      .from("daily_summary")
      .delete()
      .eq("id", id);

    if (error) throw error;

    revalidatePath("/dashboard");

    return {
      success: true,
      message: "Daily summary deleted successfully!",
    };
  } catch (error) {
    console.error("Failed to delete daily summary:", error);
    return {
      success: false,
      message: "Database error: Failed to delete daily summary.",
    };
  }
}

// ============================================================
// GET OR CREATE DAILY SUMMARY FOR HUDDLE UPDATE FK
// ============================================================
export async function getOrCreateDailySummary(
  date: string,
  shift: ShiftType,
): Promise<string> {
  try {
    const { supabase, userId } = await getAuthenticatedClient();
    const data = await fetchDailySummaryByDateAndShift(date, shift);

    if (!data) {
      const { data: newSummary, error } = await supabase
        .from("daily_summary")
        .insert({
          date: date,
          shift: shift,
          created_by: userId,
          updated_by: userId,
        })
        .select("id")
        .single();

      if (error || !newSummary) {
        throw new Error("Failed to create daily summary");
      }

      return newSummary.id;
    } else {
      return data.id;
    }
  } catch (error) {
    console.error("Failed to get or create a daily summary:", error);
    throw new Error("Failed to get or create daily summary");
  }
}