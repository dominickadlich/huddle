"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { createClient } from "../supabase/server";
import type { 
  HuddleUpdate, 
  HuddleUpdateInsert, 
  HuddleUpdateUpdate,
  DepartmentType 
} from "../types/database";

// ============================================
// ZOD VALIDATION SCHEMAS
// ============================================

const HuddleUpdateSchema = z.object({
  daily_summary_id: z.string().uuid(),
  department: z.enum(['Distribution', 'CSR', 'IVR', 'Nonsterile', 'RX Leadership']),
  update_text: z.string().min(1, "Update text is required").nullable().optional(),
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
// CREATE HUDDLE UPDATE
// ============================================

export async function createHuddleUpdate(
  prevState: HuddleUpdateState,
  formData: FormData
): Promise<HuddleUpdateState> {
  try {
    const { supabase, userId } = await getAuthenticatedClient();

    const rawData = {
      daily_summary_id: formData.get('daily_summary_id'),
      department: formData.get('department'),
      update_text: formData.get('update_text') || null,
    };

    const validatedFields = HuddleUpdateSchema.safeParse(rawData);

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: "Invalid fields. Please check your input.",
      };
    }

    const { daily_summary_id, department, update_text } = validatedFields.data;

    // Check if update already exists for this department
    const { data: existing } = await supabase
      .from('huddle_updates')
      .select('id')
      .eq('daily_summary_id', daily_summary_id)
      .eq('department', department)
      .single();

    if (existing) {
      return {
        errors: {
          _form: ["An update for this department already exists."]
        },
        message: "Update already exists for this department.",
      };
    }

    // Create the update
    const insertData: HuddleUpdateInsert = {
      daily_summary_id,
      department,
      update_text,
      created_by: userId,
      updated_by: userId,
    };

    const { data, error } = await supabase
      .from('huddle_updates')
      .insert(insertData)
      .select()
      .single();

    if (error) throw error;

    revalidatePath('/dashboard');
    
    return {
      message: "Department update created successfully!",
      data,
    };
  } catch (error) {
    console.error("Failed to create huddle update:", error);
    return {
      message: "Database error: Failed to create update.",
    };
  }
}

// ============================================
// UPDATE HUDDLE UPDATE
// ============================================

export async function updateHuddleUpdate(
  id: string,
  prevState: HuddleUpdateState,
  formData: FormData
): Promise<HuddleUpdateState> {
  try {
    const { supabase, userId } = await getAuthenticatedClient();

    const rawData = {
      daily_summary_id: formData.get('daily_summary_id'),
      department: formData.get('department'),
      update_text: formData.get('update_text') || null,
    };

    const validatedFields = HuddleUpdateSchema.safeParse(rawData);

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: "Invalid fields. Please check your input.",
      };
    }

    const updateData: HuddleUpdateUpdate = {
      ...validatedFields.data,
      updated_by: userId,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('huddle_updates')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    revalidatePath('/dashboard');
    
    return {
      message: "Department update updated successfully!",
      data,
    };
  } catch (error) {
    console.error("Failed to update huddle update:", error);
    return {
      message: "Database error: Failed to update.",
    };
  }
}

// ============================================
// UPSERT HUDDLE UPDATE (Create or Update)
// ============================================

export async function upsertHuddleUpdate(
  prevState: HuddleUpdateState,
  formData: FormData
): Promise<HuddleUpdateState> {
  try {
    const { supabase, userId } = await getAuthenticatedClient();

    const rawData = {
      daily_summary_id: formData.get('daily_summary_id'),
      department: formData.get('department'),
      update_text: formData.get('update_text') || null,
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
    const { data: existing } = await supabase
      .from('huddle_updates')
      .select('id')
      .eq('daily_summary_id', daily_summary_id)
      .eq('department', department)
      .single();

    if (existing) {
      // UPDATE existing record
      const updateData: HuddleUpdateUpdate = {
        update_text,
        updated_by: userId,
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from('huddle_updates')
        .update(updateData)
        .eq('id', existing.id)
        .select()
        .single();

      if (error) throw error;

      revalidatePath('/dashboard');
      
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
        .from('huddle_updates')
        .insert(insertData)
        .select()
        .single();

      if (error) throw error;

      revalidatePath('/dashboard');
      
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
// DELETE HUDDLE UPDATE
// ============================================

export async function deleteHuddleUpdate(id: string): Promise<{ 
  success: boolean; 
  message: string 
}> {
  try {
    const { supabase } = await getAuthenticatedClient();

    const { error } = await supabase
      .from('huddle_updates')
      .delete()
      .eq('id', id);

    if (error) throw error;

    revalidatePath('/dashboard');
    
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
  updateText: string
): Promise<{ success: boolean; message: string }> {
  try {
    const { supabase, userId } = await getAuthenticatedClient();

    // Check if update exists
    const { data: existing } = await supabase
      .from('huddle_updates')
      .select('id')
      .eq('daily_summary_id', dailySummaryId)
      .eq('department', department)
      .single();

    if (existing) {
      // Update existing
      const { error } = await supabase
        .from('huddle_updates')
        .update({ 
          update_text: updateText,
          updated_by: userId,
          updated_at: new Date().toISOString(),
        })
        .eq('id', existing.id);

      if (error) throw error;
    } else {
      // Create new
      const { error } = await supabase
        .from('huddle_updates')
        .insert({
          daily_summary_id: dailySummaryId,
          department,
          update_text: updateText,
          created_by: userId,
          updated_by: userId,
        });

      if (error) throw error;
    }

    revalidatePath('/dashboard');
    
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