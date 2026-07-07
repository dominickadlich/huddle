"use server";

import { revalidatePath } from 'next/cache';
import { getAuthenticatedClient } from '../supabase/auth-helpers';
import type { ORPharmacyUpdate } from '../types/database'
import { ORPharmacySchema } from '../types/huddle-schemas';


// ============================================
// UPSERT OR Pharmacy (Create or Update)
// ============================================
export async function upsertORPharmacy(
    data: ORPharmacyUpdate
): Promise<{ success: boolean, message: string}> {
    try {
        const { supabase, userId } = await getAuthenticatedClient();

        const validated = ORPharmacySchema.parse(data);

        // Check if OR exists
        const { data: existing } = await supabase
            .from('or_pharmacy')
            .select('id')
            .eq('date', validated.date)
            .eq('shift', validated.shift)
            .single();

        if (existing) {
            // UPDATE existing record
            const {  error } = await supabase.from('or_pharmacy').update({
                ...validated,
                updated_by: userId,
            }).eq('id', existing.id);

            if (error) throw error;
        } else {
            const { error } = await supabase.from('or_pharmacy').insert({
                ...validated,
                created_by: userId,
                updated_by: userId,
            });

            if (error) throw error;
        }
        revalidatePath('/team-huddle/or-pharmacy');
        revalidatePath('/dashboard');
        return { success: true, message: 'Saved Successfully!' }
    } catch (error) {
        console.error('Failed to save OR Pharmacy:', error)
        return { success: false, message: 'Failed to save' }
    }
}

// ============================================
// GENERIC FIELD UPDATER
// ============================================
export async function updateORPharmacyField(
  id: string,
  field: keyof ORPharmacyUpdate,
  value: string | null,
): Promise<{ success: boolean; message: string }> {
  try {
    const { supabase, userId } = await getAuthenticatedClient();

    const { error } = await supabase
      .from("or_pharmacy")
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
// DELETE OR Pharmacy Data
// ============================================
export async function deleteORPharmacy(id: string): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    const { supabase } = await getAuthenticatedClient();

    const { error } = await supabase
      .from("or_pharmacy")
      .delete()
      .eq("id", id);

    if (error) throw error;

    revalidatePath("/dashboard");

    return {
      success: true,
      message: "OR Pharmacy data deleted successfully!",
    };
  } catch (error) {
    console.error("Failed to delete OR Pharmacy data:", error);
    return {
      success: false,
      message: "Database error: Failed to delete OR Pharmacy data.",
    };
  }
}