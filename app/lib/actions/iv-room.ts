"use server";

import { revalidatePath } from 'next/cache';
import { getAuthenticatedClient } from '../supabase/auth-helpers';
import type { IvRoomUpdate } from '../types/database'
import { IVRoomSchema } from '../types/huddle-schemas';
import { fetchIVRoomLiveWithFallback } from '../data/iv-room';

const CARRY_FORWARD_FIELDS = [
  'safety',
  'barriers',
  'inventory',
  'announcements',
  'monthly_clean',
] as const;


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
            // New row for this date — backfill only the approved carry-forward fields
            const mostRecent = await fetchIVRoomLiveWithFallback(validated.date, validated.shift);

            const insertPayload: Record<string, unknown> = {
              ...validated,
              created_by: userId,
              updated_by: userId,
            }

            for (const field of CARRY_FORWARD_FIELDS) {
              if (insertPayload[field] == null && mostRecent?.[field] != null) {
                insertPayload[field] = mostRecent[field]
              }
            }

            const { error } = await supabase.from('iv_room').insert(insertPayload);

            if (error) throw error;
        }
        revalidatePath('/team-huddle/iv-room');
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