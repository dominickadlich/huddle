"use server";

import { revalidatePath } from 'next/cache';
import { getAuthenticatedClient } from '../supabase/auth-helpers';
import type {
    MedHistoryUpdate,
} from '../types/database'
import { MedHistorySchema } from '../types/huddle-schemas';


// ============================================
// UPSERT Med History (Create or Update)
// ============================================
export async function upsertMedHistory(
    data: MedHistoryUpdate
): Promise<{ success: boolean, message: string}> {
    try {
        const { supabase, userId } = await getAuthenticatedClient();

        const validated = MedHistorySchema.parse(data);

        // Check if Med History exists
        const { data: existing } = await supabase
            .from('med_history')
            .select('id')
            .eq('date', validated.date)
            .eq('shift', validated.shift)
            .maybeSingle();

        if (existing) {
            // UPDATE existing record
            const {  error } = await supabase.from('med_history').update({
                ...validated,
                updated_by: userId,
            }).eq('id', existing.id);

            if (error) throw error;
        } else {
            const { error } = await supabase.from('med_history').insert({
                ...validated,
                created_by: userId,
                updated_by: userId,
            });

            if (error) throw error;
        }
        revalidatePath('/team-huddle/med-history');
        revalidatePath('/dashboard');
        return { success: true, message: 'Saved Successfully!' }
    } catch (error) {
        console.error('Failed to save Med History:', error)
        return { success: false, message: 'Failed to save' }
    }
}


// ============================================
// GENERIC FIELD UPDATER
// ============================================
export async function updateMedHistoryField(
  id: string,
  field: keyof MedHistoryUpdate,
  value: string | null,
): Promise<{ success: boolean; message: string }> {
  try {
    const { supabase, userId } = await getAuthenticatedClient();

    const { error } = await supabase
      .from("med_history")
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
// DELETE MedHistory Data
// ============================================
export async function deleteMedHistory(id: string): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    const { supabase } = await getAuthenticatedClient();

    const { error } = await supabase
      .from("med_history")
      .delete()
      .eq("id", id);

    if (error) throw error;

    revalidatePath("/dashboard");

    return {
      success: true,
      message: "Med History data deleted successfully!",
    };
  } catch (error) {
    console.error("Failed to delete Med History data:", error);
    return {
      success: false,
      message: "Database error: Failed to delete Med History data.",
    };
  }
}