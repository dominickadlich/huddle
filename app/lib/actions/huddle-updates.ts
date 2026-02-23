"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { getAuthenticatedClient } from "../supabase/auth-helpers";
import { getOrCreateDailySummary } from "./daily-summary";
import type {
  HuddleUpdate,
  HuddleUpdateInsert,
  HuddleUpdateUpdate,
  DepartmentType,
  ShiftType,
} from "../types/database";
import { getCurrentShift, getLocalDate } from "../utils";

// ============================================
// ZOD VALIDATION SCHEMAS
// ============================================

const HuddleUpdateSchema = z.object({
  daily_summary_id: z.string().uuid(),
  department: z.enum([
    "Distribution",
    "CSR",
    "IVR",
    "Nonsterile",
    "RX Leadership",
  ]),
  update_text: z.string().optional().nullable(),
});

// ============================================
// STATE TYPES FOR FORM ACTIONS
// ============================================

export type HuddleUpdateState = {
  errors?: {
    daily_summary_id?: string[];
    department?: string[];
    update_text?: string[];
    _form?: string[];
  };
  message?: string | null;
  data?: HuddleUpdate | null;
};

// ============================================
// UPSERT HUDDLE UPDATE (Create or Update)
// ============================================

export async function upsertHuddleUpdate(
  prevState: HuddleUpdateState,
  formData: FormData,
): Promise<HuddleUpdateState> {
  try {
    const { supabase, userId } = await getAuthenticatedClient();

    const rawData = {
      daily_summary_id: formData.get("daily_summary_id"),
      department: formData.get("department"),
      update_text: formData.get("update_text") || null,
    };

    const validatedFields = HuddleUpdateSchema.safeParse(rawData);

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: "Invalid fields. Please check your input.",
      };
    }

    const { daily_summary_id, department, update_text } = validatedFields.data;

    // Check if update exists
    const { data: existing, error: existingError } = await supabase
      .from("huddle_updates")
      .select("id")
      .eq("daily_summary_id", daily_summary_id)
      .eq("department", department)
      .single();

    if (existingError && existingError.code !== "PGRST116") {
      throw existingError;
    }

    if (existing) {
      // UPDATE existing record
      const updateData: HuddleUpdateUpdate = {
        update_text,
        updated_by: userId,
      };

      const { data, error } = await supabase
        .from("huddle_updates")
        .update(updateData)
        .eq("id", existing.id)
        .select()
        .single();

      if (error) throw error;

      revalidatePath("/dashboard");

      return {
        message: "Department update updated successfully!",
        data,
      };
    } else {
      // CREATE new record
      const insertData: HuddleUpdateInsert = {
        daily_summary_id,
        department,
        update_text,
        created_by: userId,
        updated_by: userId,
      };

      const { data, error } = await supabase
        .from("huddle_updates")
        .insert(insertData)
        .select()
        .single();

      if (error) throw error;

      revalidatePath("/dashboard");

      return {
        message: "Department update created successfully!",
        data,
      };
    }
  } catch (error) {
    console.error("Failed to save huddle update:", error);
    return {
      message: "Database error: Failed to save update.",
    };
  }
}

// ============================================
// GENERIC HUDDLE UPDATE FIELD UPSERTER
// ============================================
export async function upsertHuddleUpdateField(
  department: DepartmentType,
  value: string | null,
  date: string,
  shift: ShiftType
): Promise<{ success: boolean; message: string }> {
  try {
    const { supabase, userId } = await getAuthenticatedClient();

    const summaryId = await getOrCreateDailySummary(date, shift);

    // 3. Check if record exists for today + current shift
    const { data: existing } = await supabase
      .from("huddle_updates")
      .select("id")
      .eq("department", department)
      .eq("daily_summary_id", summaryId)
      .single();

    if (existing) {
      // UPDATE
      const { error } = await supabase
        .from("huddle_updates")
        .update({
          update_text: value,
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
      const { error } = await supabase.from("huddle_updates").insert({
        daily_summary_id: summaryId,
        department: department,
        update_text: value,
        created_by: userId,
        updated_by: userId,
      });

      if (error) throw error;

      revalidatePath("/dashboard");

      return {
        success: true,
        message: "Huddle Update created successfully!",
      };
    }
  } catch (error) {
    console.error("Failed to save huddle update:", error);
    return {
      success: false,
      message: "Database error: Failed to save huddle update.",
    };
  }
}

// ============================================
// DELETE HUDDLE UPDATE
// ============================================

export async function deleteHuddleUpdate(id: string): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    const { supabase } = await getAuthenticatedClient();

    const { error } = await supabase
      .from("huddle_updates")
      .delete()
      .eq("id", id);

    if (error) throw error;

    revalidatePath("/dashboard");

    return {
      success: true,
      message: "Department update deleted successfully!",
    };
  } catch (error) {
    console.error("Failed to delete huddle update:", error);
    return {
      success: false,
      message: "Database error: Failed to delete update.",
    };
  }
}

// ============================================
// QUICK UPDATE TEXT ONLY
// ============================================

export async function updateDepartmentText(
  dailySummaryId: string,
  department: DepartmentType,
  updateText: string,
): Promise<{ success: boolean; message: string }> {
  try {
    const { supabase, userId } = await getAuthenticatedClient();

    // Check if update exists
    const { data: existing } = await supabase
      .from("huddle_updates")
      .select("id")
      .eq("daily_summary_id", dailySummaryId)
      .eq("department", department)
      .single();

    if (existing) {
      // Update existing
      const { error } = await supabase
        .from("huddle_updates")
        .update({
          update_text: updateText,
          updated_by: userId,
        })
        .eq("id", existing.id);

      if (error) throw error;
    } else {
      // Create new
      const { error } = await supabase.from("huddle_updates").insert({
        daily_summary_id: dailySummaryId,
        department,
        update_text: updateText,
        created_by: userId,
        updated_by: userId,
      });

      if (error) throw error;
    }

    revalidatePath("/dashboard");

    return {
      success: true,
      message: "Update saved successfully!",
    };
  } catch (error) {
    console.error("Failed to update department text:", error);
    return {
      success: false,
      message: "Failed to save update.",
    };
  }
}

// ============================================
// USAGE EXAMPLES (for reference in frontend)
// ============================================

/*
// Example 1: Upsert huddle update (form submission)
const result = await upsertHuddleUpdate(prevState, formData);

// Example 2: Quick text update (click-to-edit)
const result = await updateDepartmentText(summaryId, 'CSR', 'Rane C. - 5 preps done');

// Example 3: Delete a department update
const result = await deleteHuddleUpdate(updateId);
*/
