"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { createClient } from "../supabase/server";
import type { 
  DailySummary, 
  DailySummaryInsert, 
  DailySummaryUpdate,
  ShiftType 
} from "../types/database";

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
// HELPER: Get authenticated client
// ============================================

async function getAuthenticatedClient() {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Authentication required");
  }
  
  const supabase = await createClient();
  return { supabase, userId: session.user.id };
}

// ============================================
// CREATE DAILY SUMMARY
// ============================================

export async function createDailySummary(
  prevState: DailySummaryState,
  formData: FormData
): Promise<DailySummaryState> {
  try {
    const { supabase, userId } = await getAuthenticatedClient();

    // Parse form data
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

    // Check if daily summary already exists
    const { data: existing } = await supabase
      .from('daily_summary')
      .select('id')
      .eq('date', date)
      .eq('shift', shift)
      .single();

    if (existing) {
      return {
        errors: {
          _form: ["A daily summary for this date and shift already exists."]
        },
        message: "Daily summary already exists.",
      };
    }

    // Create the daily summary
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
  } catch (error) {
    console.error("Failed to create daily summary:", error);
    return {
      message: "Database error: Failed to create daily summary.",
    };
  }
}

// ============================================
// UPDATE DAILY SUMMARY
// ============================================

export async function updateDailySummary(
  id: string,
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

    const updateData: DailySummaryUpdate = {
      ...validatedFields.data,
      updated_by: userId,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('daily_summary')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    revalidatePath('/dashboard');
    
    return {
      message: "Daily summary updated successfully!",
      data,
    };
  } catch (error) {
    console.error("Failed to update daily summary:", error);
    return {
      message: "Database error: Failed to update daily summary.",
    };
  }
}

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
    const { data: existing } = await supabase
      .from('daily_summary')
      .select('id')
      .eq('date', date)
      .eq('shift', shift)
      .single();

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

// ============================================
// QUICK UPDATE HELPERS (for single fields)
// ============================================

export async function updateCensus(
  id: string, 
  census: number
): Promise<{ success: boolean; message: string }> {
  try {
    const { supabase, userId } = await getAuthenticatedClient();

    const { error } = await supabase
      .from('daily_summary')
      .update({ 
        census, 
        updated_by: userId,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id);

    if (error) throw error;

    revalidatePath('/dashboard');
    
    return {
      success: true,
      message: "Census updated successfully!",
    };
  } catch (error) {
    console.error("Failed to update census:", error);
    return {
      success: false,
      message: "Failed to update census.",
    };
  }
}

export async function updateStaffing(
  id: string, 
  staffing: string
): Promise<{ success: boolean; message: string }> {
  try {
    const { supabase, userId } = await getAuthenticatedClient();

    const { error } = await supabase
      .from('daily_summary')
      .update({ 
        staffing, 
        updated_by: userId,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id);

    if (error) throw error;

    revalidatePath('/dashboard');
    
    return {
      success: true,
      message: "Staffing updated successfully!",
    };
  } catch (error) {
    console.error("Failed to update staffing:", error);
    return {
      success: false,
      message: "Failed to update staffing.",
    };
  }
}