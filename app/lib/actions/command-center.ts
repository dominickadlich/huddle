"use server";

import { revalidatePath } from 'next/cache';
import { getAuthenticatedClient } from '../supabase/auth-helpers';
import type {
    CommandCenterUpdate,
} from '../types/database'
import { CommandCenterSchema } from '../types/huddle-schemas';


// ============================================
// UPSERT Command Center (Create or Update)
// ============================================
export async function upsertCommandCenter(
    data: CommandCenterUpdate
): Promise<{ success: boolean, message: string}> {
    try {
        const { supabase, userId } = await getAuthenticatedClient();

        const validated = CommandCenterSchema.parse(data);

        // Check if Command Center exists
        const { data: existing } = await supabase
            .from('command_center')
            .select('id')
            .eq('date', validated.date)
            .eq('shift', validated.shift)
            .single();

        if (existing) {
            // UPDATE existing record
            const {  error } = await supabase.from('command_center').update({
                ...validated,
                updated_by: userId,
            }).eq('id', existing.id);

            if (error) throw error;
        } else {
            const { error } = await supabase.from('command_center').insert({
                ...validated,
                created_by: userId,
                updated_by: userId,
            });

            if (error) throw error;
        }
        revalidatePath('/mini-huddle/command-center');
        revalidatePath('/dashboard');
        return { success: true, message: 'Saved Successfully!' }
    } catch (error) {
        console.error('Failed to save Command Center:', error)
        return { success: false, message: 'Failed to save' }
    }
}


// ============================================
// GENERIC FIELD UPDATER
// ============================================
export async function updateCommandCenterField(
  id: string,
  field: keyof CommandCenterUpdate,
  value: string | null,
): Promise<{ success: boolean; message: string }> {
  try {
    const { supabase, userId } = await getAuthenticatedClient();

    const { error } = await supabase
      .from("command_center")
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
// DELETE Command Center Data
// ============================================
export async function deleteCommandCenter(id: string): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    const { supabase } = await getAuthenticatedClient();

    const { error } = await supabase
      .from("command_center")
      .delete()
      .eq("id", id);

    if (error) throw error;

    revalidatePath("/dashboard");

    return {
      success: true,
      message: "Command Center data deleted successfully!",
    };
  } catch (error) {
    console.error("Failed to delete Command Center data:", error);
    return {
      success: false,
      message: "Database error: Failed to delete Command Center data.",
    };
  }
}