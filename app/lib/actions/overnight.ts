"use server";

import { revalidatePath } from 'next/cache';
import { getAuthenticatedClient } from '../supabase/auth-helpers';
import type {
    OvernightUpdate,
} from '../types/database'
import { OvernightSchema } from '../types/huddle-schemas';


// ============================================
// UPSERT Overnight (Create or Update)
// ============================================
export async function upsertOvernight(
    data: OvernightUpdate
): Promise<{ success: boolean, message: string}> {
    try {
        const { supabase, userId } = await getAuthenticatedClient();

        const validated = OvernightSchema.parse(data);

        // Check if Overnight exists
        const { data: existing, error: checkError } = await supabase
            .from('overnight')
            .select('id')
            .eq('date', validated.date)
            .eq('shift', validated.shift)
            .maybeSingle()

        if (checkError) throw checkError;

        if (existing) {
            // UPDATE existing record
            const {  error } = await supabase.from('overnight').update({
                ...validated,
                updated_by: userId,
            }).eq('id', existing.id);

            if (error) throw error;
        } else {
            const { error } = await supabase.from('overnight').insert({
                ...validated,
                created_by: userId,
                updated_by: userId,
            });

            if (error) throw error;
        }
        revalidatePath('/team-huddle/overnight');
        revalidatePath('/dashboard');
        return { success: true, message: 'Saved Successfully!' }
    } catch (error) {
        console.error('Failed to save Overnight:', error)
        return { success: false, message: 'Failed to save' }
    }
}


// ============================================
// GENERIC FIELD UPDATER
// ============================================
export async function updateOvernightField(
  id: string,
  field: keyof OvernightUpdate,
  value: string | null,
): Promise<{ success: boolean; message: string }> {
  try {
    const { supabase, userId } = await getAuthenticatedClient();

    const { error } = await supabase
      .from("overnight")
      .update({
        [field]: value,
        updated_by: userId,
      })
      .eq("id", id);

    if (error) throw error;
      
    revalidatePath('/team-huddle/overnight');
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
// DELETE Overnight Data
// ============================================
export async function deleteOvernight(id: string): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    const { supabase } = await getAuthenticatedClient();

    const { error } = await supabase
      .from("overnight")
      .delete()
      .eq("id", id);

    if (error) throw error;

    revalidatePath('/team-huddle/overnight');
    revalidatePath("/dashboard");

    return {
      success: true,
      message: "Overnight data deleted successfully!",
    };
  } catch (error) {
    console.error("Failed to delete Overnight data:", error);
    return {
      success: false,
      message: "Database error: Failed to delete Overnight data.",
    };
  }
}