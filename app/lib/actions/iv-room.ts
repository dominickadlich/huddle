"use server";

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { getAuthenticatedClient } from '../supabase/auth-helpers';
import type {
    IvRoom,
    IvRoomInsert,
    IvRoomUpdate,
} from '../types/database'

// ============================================
// ZOD VALIDATION SCHEMAS
// ============================================
const IVRoomBaseSchema = z.object({
    date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
    shift: z.enum(["morning", "afternoon", "evening"]),
    bell_iv: z.string().nullable().optional(),
    tpn: z.string().nullable().optional(),
    hazardous: z.string().nullable().optional(),
    sc: z.string().nullable().optional(),
    assignment_two: z.string().nullable().optional(),
    training: z.string().nullable().optional(),
    iv_support: z.string().nullable().optional(),
    inventory: z.string().nullable().optional(),
    team_building: z.string().nullable().optional(),
});

export const SharedSchema = z.object({
    safety: z.string().nullable().optional(),
    barriers: z.string().nullable().optional(),
    wins: z.string().nullable().optional(),
    opportunities: z.string().nullable().optional(),
    announcements: z.string().nullable().optional(),
    summary_text: z.string().nullable().optional(),
});

const IVRoomSchema = z.object({
    ...IVRoomBaseSchema.shape,
    ...SharedSchema.shape
})

// ============================================
// STATE TYPES FOR FORM ACTIONS
// ============================================
export type SharedErrors = {
    safety?: string[],
    barriers?: string[],
    wins?: string[],
    opportunities?: string[],
    announcements?: string[],
    summary_text?: string[]
}

export type IVRoomUpdateState = {
    errors?: SharedErrors & {
        date?: string[];
        shift?: string[];
        bell_iv?: string[];
        tpn?: string[];
        hazardous?: string[];
        sc?: string[];
        assignment_two?: string[];
        training?: string[];
        iv_support?: string[];
        inventory?: string[],
        team_building?: string[],
        _form?: string[];
    }
    message?: string | null;
    data?: IvRoom | null;
}

// ============================================
// UPSERT IV Room (Create or Update)
// ============================================
export async function upsertIVRoom(
    prevState: IVRoomUpdateState,
    formData: FormData,
): Promise<IVRoomUpdateState> {
    try {
        const { supabase, userId } = await getAuthenticatedClient();

        const rawData = {
            date: formData.get("date"),
            shift: formData.get("shift"),
            bell_iv: formData.get('bell_iv') || null,
            tpn: formData.get('tpn') || null,
            hazardous: formData.get('hazardous') || null,
            sc: formData.get('sc') || null,
            assignment_two: formData.get('assignment_two') || null,
            training: formData.get('training') || null,
            iv_support: formData.get('iv_support') || null,
            safety: formData.get('safety') || null,
            barriers: formData.get('barriers') || null,
            wins: formData.get('wins') || null,
            opportunities: formData.get('opportunities') || null,
            announcements: formData.get('announcements') || null,
            inventory: formData.get('inventory') || null,
            team_building: formData.get('team_building') || null,
            summary_text: formData.get('summary_text') || null
        }

        const validatedFields = IVRoomSchema.safeParse(rawData);

        if (!validatedFields.success) {
            return {
                errors: validatedFields.error.flatten().fieldErrors,
                message: "Invalid fields. Please double check your input."
            };
        }

        const { date, shift, ...fields } = validatedFields.data;

        // Check if IV Room exists
        const { data: existing, error: existingError } = await supabase
            .from('iv_room')
            .select('id')
            .eq('date', date)
            .eq('shift', shift)
            .single();
        
        if (existingError && existingError.code !== 'PGRST116') {
            throw existingError;
        }

        if (existing) {
            // UPDATE existing record
            const updateData: IvRoomUpdate = {
                ...fields,
                updated_by: userId,
                updated_at: new Date().toISOString(),
            };

            const { data, error } = await supabase
                .from('iv_room')
                .update(updateData)
                .eq('id', existing.id)
                .select()
                .single();

            if (error) throw error;

            revalidatePath('/dashboard');

            return {
                message: "IV Room Data has been updated successfully!",
                data,
            };
        } else {
            // CREATE new record
            const insertData: IvRoomInsert = {
                date,
                shift,
                ...fields,
                created_by: userId,
                updated_by: userId,
            };

            const { data, error } = await supabase
                .from('iv_room')
                .insert(insertData)
                .select()
                .single();
            
            if (error) throw error;

            revalidatePath('/dashboard')

            return {
                message: 'IV Room data created successfully!',
                data,
            };
        }
    } catch (error) {
        console.error('Failed to save IV Room data:', error);
        return {
            message: 'Database error: Failed to save IV Room data.'
        }
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
        updated_at: new Date().toISOString(),
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