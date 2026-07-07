"use server";

import { revalidatePath } from 'next/cache';
import { getAuthenticatedClient } from '../supabase/auth-helpers';
import type { TeamEightUpdate } from '../types/database'
import { TeamEightSchema } from '../types/huddle-schemas';


// ============================================
// UPSERT Team Eight Data (Create or Update)
// ============================================
export async function upsertTeamEight(
    data: TeamEightUpdate
): Promise<{ success: boolean, message: string}> {
    try {
        const { supabase, userId } = await getAuthenticatedClient();

        const validated = TeamEightSchema.parse(data);

        // Check if Team Eight exists
        const { data: existing } = await supabase
            .from('team_eight')
            .select('id')
            .eq('date', validated.date)
            .eq('shift', validated.shift)
            .single();

        if (existing) {
            // UPDATE existing record
            const {  error } = await supabase.from('team_eight').update({
                ...validated,
                updated_by: userId,
            }).eq('id', existing.id);

            if (error) throw error;
        } else {
            const { error } = await supabase.from('team_eight').insert({
                ...validated,
                created_by: userId,
                updated_by: userId,
            });

            if (error) throw error;
        }
        revalidatePath('/team-huddle/team-eight');
        revalidatePath('/dashboard');
        return { success: true, message: 'Saved Successfully!' }
    } catch (error) {
        console.error('Failed to save Team Eight data:', error)
        return { success: false, message: 'Failed to save' }
    }
}

// ============================================
// GENERIC FIELD UPDATER
// ============================================
export async function updateTeamEightField(
  id: string,
  field: keyof TeamEightUpdate,
  value: string | null,
): Promise<{ success: boolean; message: string }> {
  try {
    const { supabase, userId } = await getAuthenticatedClient();

    const { error } = await supabase
      .from("team_eight")
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
// DELETE Team Eight Data
// ============================================
export async function deleteTeamEight(id: string): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    const { supabase } = await getAuthenticatedClient();

    const { error } = await supabase
      .from("team_eight")
      .delete()
      .eq("id", id);

    if (error) throw error;

    revalidatePath("/dashboard");

    return {
      success: true,
      message: "Team Eight data deleted successfully!",
    };
  } catch (error) {
    console.error("Failed to delete Team Eight data:", error);
    return {
      success: false,
      message: "Database error: Failed to delete Team Eight data.",
    };
  }
}