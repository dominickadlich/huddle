"use server";

import { revalidatePath } from 'next/cache';
import { getAuthenticatedClient } from '../supabase/auth-helpers';
import type { IvRoomUpdate } from '../types/database'
import { IVRoomSchema } from '../types/huddle-schemas';


// ============================================
// UPSERT IV Room (Create or Update)
// ============================================
export async function upsertIVRoom(
    data: IvRoomUpdate
): Promise<{ success: boolean, message: string}> {
    try {
        const { supabase, userId } = await getAuthenticatedClient();

        const validated = IVRoomSchema.parse(data);

        // Check if IV Room exists
        const { data: existing } = await supabase
            .from('iv_room')
            .select('id')
            .eq('date', validated.date)
            .eq('shift', validated.shift)
            .single();

        if (existing) {
            // UPDATE existing record
            const {  error } = await supabase.from('iv_room').update({
                ...validated,
                updated_by: userId,
            }).eq('id', existing.id);

            if (error) throw error;
        } else {
            const { error } = await supabase.from('iv_room').insert({
                ...validated,
                created_by: userId,
                updated_by: userId,
            });

            if (error) throw error;
        }
        revalidatePath('/mini-huddle/iv-room');
        revalidatePath('/dashboard');
        return { success: true, message: 'Saved Successfully!' }
    } catch (error) {
        console.error('Failed to save IV Room:', error)
        return { success: false, message: 'Failed to save' }
    }
}

// ============================================
// GENERIC FIELD UPDATER
// ============================================
export async function updateIVRoomField(
  id: string,
  field: keyof IvRoomUpdate,
  value: string | null,
): Promise<{ success: boolean; message: string }> {
  try {
    const { supabase, userId } = await getAuthenticatedClient();

    const { error } = await supabase
      .from("iv_room")
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
// DELETE IV Room Data
// ============================================
export async function deleteIVRoom(id: string): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    const { supabase } = await getAuthenticatedClient();

    const { error } = await supabase
      .from("iv_room")
      .delete()
      .eq("id", id);

    if (error) throw error;

    revalidatePath("/dashboard");

    return {
      success: true,
      message: "IV Room data deleted successfully!",
    };
  } catch (error) {
    console.error("Failed to delete IV Room data:", error);
    return {
      success: false,
      message: "Database error: Failed to delete IV Room data.",
    };
  }
}