"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { getAuthenticatedClient } from "../supabase/auth-helpers";
import { fetchDailySummaryByDateAndShift } from "../data";
import type { 
  DailySummary, 
  DailySummaryInsert, 
  DailySummaryUpdate,
  ShiftType
} from "../types/database";
import { getCurrentShift } from "../utils";

// ============================================
// ZOD VALIDATION SCHEMAS
// ============================================

const DailySummarySchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
  shift: z.enum(['morning', 'afternoon', 'evening']),
  census: z.coerce.number().int().min(0).nullable().optional(),
  tpn: z.string().nullable().optional(),
  hazardous: z.string().nullable().optional(),
  staffing: z.string().nullable().optional(),
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
  prevState: DailySummaryState,
  formData: FormData
): Promise<DailySummaryState> {
  try {
    const { supabase, userId } = await getAuthenticatedClient();

    const rawData = {
      date: formData.get('date'),
      shift: formData.get('shift'),
      census: formData.get('census') ? parseInt(formData.get('census') as string) : null,
      tpn: formData.get('tpn') || null,
      hazardous: formData.get('hazardous') || null,
      staffing: formData.get('staffing') || null,
      recognition: formData.get('recognition') || null,
      issues_safety: formData.get('issues_safety') || null,
      announcements: formData.get('announcements') || null,
    };

    const validatedFields = DailySummarySchema.safeParse(rawData);

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: "Invalid fields. Please check your input.",
      };
    }

    const { date, shift, ...fields } = validatedFields.data;

    // Check if record exists
    const { data: existing, error: existingError } = await supabase
      .from('daily_summary')
      .select('id')
      .eq('date', date)
      .eq('shift', shift)
      .single();

      if (existingError && existingError.code !== 'PGRST116') {
        throw existingError;
      }

    if (existing) {
      // UPDATE existing record
      const updateData: DailySummaryUpdate = {
        ...fields,
        updated_by: userId,
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from('daily_summary')
        .update(updateData)
        .eq('id', existing.id)
        .select()
        .single();

      if (error) throw error;

      revalidatePath('/dashboard');
      
      return {
        message: "Daily summary updated successfully!",
        data,
      };
    } else {
      // CREATE new record
      const insertData: DailySummaryInsert = {
        date,
        shift,
        ...fields,
        created_by: userId,
        updated_by: userId,
      };

      const { data, error } = await supabase
        .from('daily_summary')
        .insert(insertData)
        .select()
        .single();

      if (error) throw error;

      revalidatePath('/dashboard');
      
      return {
        message: "Daily summary created successfully!",
        data,
      };
    }
  } catch (error) {
    console.error("Failed to save daily summary:", error);
    return {
      message: "Database error: Failed to save daily summary.",
    };
  }
}


// ============================================
// GENERIC FIELD UPSERTER
// ============================================
export async function upsertDailySummaryField(
  field: keyof DailySummaryUpdate,
  value: string | null
): Promise<{ success: boolean; message: string }> {
  try {
    const { supabase, userId } = await getAuthenticatedClient();

    const shift = getCurrentShift();
    const date = new Date().toISOString().split('T')[0]

    // 3. Check if record exists for today + current shift
    const { data: existing } = await supabase
      .from('daily_summary')
      .select('id')
      .eq('date', date)
      .eq('shift', shift)
      .single();

    if (existing) {
      // UPDATE 
      const { error } = await supabase
        .from('daily_summary')
        .update({
          [field]: value,
          updated_by: userId,
          updated_at: new Date().toISOString(),
        })
        .eq('id', existing.id);

        if (error) throw error;

      revalidatePath('/dashboard');
      
      return {
        success: true,
        message: "Daily summary updated successfully!",
      };
    } else {
      // INSERT
      const { error } = await supabase
        .from('daily_summary')
        .insert({ 
          date,
          shift,
          [field]: value,
          updated_by: userId,
          updated_at: new Date().toISOString(),
          created_by: userId,
        })

        if (error) throw error;

      revalidatePath('/dashboard');
      
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
  value: string | null
): Promise<{ success: boolean; message: string }> {
  try {
    const { supabase, userId } = await getAuthenticatedClient();

    const { error } = await supabase
      .from('daily_summary')
      .update({ 
        [field]: value,
        updated_by: userId,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id);

    if (error) throw error;

    revalidatePath('/dashboard');
    
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
  message: string 
}> {
  try {
    const { supabase } = await getAuthenticatedClient();

    const { error } = await supabase
      .from('daily_summary')
      .delete()
      .eq('id', id);

    if (error) throw error;

    revalidatePath('/dashboard');
    
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
    shift: ShiftType
): Promise<string> {
  try {
    const { supabase, userId } = await getAuthenticatedClient();
    const data = await fetchDailySummaryByDateAndShift(date, shift)
    
    if (!data) {
      const { data: newSummary, error } = await supabase
        .from('daily_summary')
        .insert({
          date: date,
          shift: shift,
          created_by: userId,
          updated_by: userId,
        })
        .select('id')
        .single()
  
        if (error || !newSummary) {
          throw new Error('Failed to create daily summary');
        }
  
        return newSummary.id
      } else {
          return data.id
      }
  } catch (error) {
    console.error("Failed to get or create a daily summary:", error);
    throw new Error('Failed to get or create daily summary');
  }
}


// ============================================
// USAGE EXAMPLES (for reference in frontend)
// ============================================

/*
// Example 1: Upsert entire daily summary (form submission)
const result = await upsertDailySummary(prevState, formData);

// Example 2: Update single field (click-to-edit)
const result = await updateDailySummaryField(summaryId, 'census', 42);
const result = await updateDailySummaryField(summaryId, 'staffing', 'Full');
const result = await updateDailySummaryField(summaryId, 'tpn', '22 total');

// Example 3: Delete a daily summary
const result = await deleteDailySummary(summaryId);
*/