"use server";

import { revalidatePath } from 'next/cache';
import { getAuthenticatedClient } from '../supabase/auth-helpers';
import type {
    DistributionUpdate,
} from '../types/database'
import { DistributionSchema } from '../types/huddle-schemas';


// ============================================
// UPSERT Distribution (Create or Update)
// ============================================
export async function upsertDistribution(
    data: DistributionUpdate
): Promise<{ success: boolean, message: string}> {
    try {
        const { supabase, userId } = await getAuthenticatedClient();

        const validated = DistributionSchema.parse(data);

        // Check if Distribution exists
        const { data: existing } = await supabase
            .from('distribution')
            .select('id')
            .eq('date', validated.date)
            .eq('shift', validated.shift)
            .single();

        if (existing) {
            // UPDATE existing record
            const {  error } = await supabase.from('distribution').update({
                ...validated,
                updated_by: userId,
            }).eq('id', existing.id);

            if (error) throw error;
        } else {
            const { error } = await supabase.from('distribution').insert({
                ...validated,
                created_by: userId,
                updated_by: userId,
            });

            if (error) throw error;
        }
        revalidatePath('/mini-huddle/distribution');
        revalidatePath('/dashboard');
        return { success: true, message: 'Saved Successfully!' }
    } catch (error) {
        console.error('Failed to save Distribution:', error)
        return { success: false, message: 'Failed to save' }
    }
}


// ============================================
// GENERIC FIELD UPDATER
// ============================================
export async function updateDistributionField(
  id: string,
  field: keyof DistributionUpdate,
  value: string | null,
): Promise<{ success: boolean; message: string }> {
  try {
    const { supabase, userId } = await getAuthenticatedClient();

    const { error } = await supabase
      .from("distribution")
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
// DELETE Distribution Data
// ============================================
export async function deleteDistribution(id: string): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    const { supabase } = await getAuthenticatedClient();

    const { error } = await supabase
      .from("distribution")
      .delete()
      .eq("id", id);

    if (error) throw error;

    revalidatePath("/dashboard");

    return {
      success: true,
      message: "Distribution data deleted successfully!",
    };
  } catch (error) {
    console.error("Failed to delete Distribution data:", error);
    return {
      success: false,
      message: "Database error: Failed to delete Distribution data.",
    };
  }
}