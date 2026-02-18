"use server";

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { getAuthenticatedClient } from '../supabase/auth-helpers';
import type {
    Nonsterile,
    NonsterileInsert,
    NonsterileUpdate,
} from '../types/database'
import { SharedSchema, type SharedErrors } from './iv-room';

// ============================================
// ZOD VALIDATION SCHEMAS
// ============================================
const NonsterileBaseSchema = z.object({
    date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
    shift: z.enum(["morning", "afternoon", "evening"]),
})

const NonsterileSchema = z.object({
    ...NonsterileBaseSchema.shape,
    ...SharedSchema.shape
})

// ============================================
// STATE TYPES FOR FORM ACTIONS
// ============================================
export type NonsterileUpdateState = {
    errors?: SharedErrors & {
        date?: string[];
        shift?: string[];
        _form?: string[];
    }
    message?: string | null;
    data?: Nonsterile | null
}


// ============================================
// UPSERT Nonsterile (Create or Update)
// ============================================
export async function upsertNonsterile(
    prevState: NonsterileUpdateState,
    formData: FormData
): Promise<NonsterileUpdateState> {
    try {
        const { supabase, userId } = await getAuthenticatedClient()

        const rawData = {
            date: formData.get('date'),
            shift: formData.get('shift'),
            safety: formData.get('safety') || null,
            barriers: formData.get('barriers') || null,
            wins: formData.get('wins') || null,
            opportunities: formData.get('opportunities') || null,
            announcements: formData.get('announcements') || null,
            summary_text: formData.get('summary_text') || null
        }

        const validatedFields = NonsterileSchema.safeParse(rawData);

        if (!validatedFields.success) {
            return {
                errors: validatedFields.error.flatten().fieldErrors,
                message: 'Invalid fields. Please double check your input.'
            };
        }

        const { date, shift, ...fields } = validatedFields.data;

        // Check if Nonsterile exists
        const { data: existing, error: existingError } = await supabase
            .from('non_sterile')
            .select('id')
            .eq('date', date)
            .eq('shift', shift)
            .single()

        if (existingError && existingError.code !== 'PGRST116') {
            throw existingError;
        }

        if (existing) {
            // UPDATE existing record
            const updateData: NonsterileUpdate = {
                ...fields,
                updated_by: userId,
                updated_at: new Date().toISOString(),
            };

            const { data, error } = await supabase
                .from('non_sterile')
                .update(updateData)
                .eq('id', existing.id)
                .select()
                .single()

            if (error) throw error;

            revalidatePath('/dashboard')

            return {
                message: 'Nonsterile Data has been updated successfully!',
                data
            };
        } else {
            // CREATE new record 
            const insertData: NonsterileInsert = {
                date,
                shift,
                ...fields,
                created_by: userId,
                updated_by: userId,
            };

            const { data, error } = await supabase
                .from('non_sterile')
                .insert(insertData)
                .select()
                .single();

            if (error) throw error;

            revalidatePath('/dashboard')

            return {
                message: 'Nonsterile data created successfully!',
                data,
            };
        }
    } catch (error) {
        console.error('Failed to save Nonsterile data:', error);
        return {
            message: 'Database error: Failed to save Nonsterile data.'
        }
    }
}


// ============================================
// GENERIC FIELD UPDATER
// ============================================
export async function updateNonsterileField(
  id: string,
  field: keyof NonsterileUpdate,
  value: string | null,
): Promise<{ success: boolean; message: string }> {
  try {
    const { supabase, userId } = await getAuthenticatedClient();

    const { error } = await supabase
      .from("non_sterile")
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
// DELETE Nonsterile Data
// ============================================
export async function deleteNonsterile(id: string): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    const { supabase } = await getAuthenticatedClient();

    const { error } = await supabase
      .from("non_sterile")
      .delete()
      .eq("id", id);

    if (error) throw error;

    revalidatePath("/dashboard");

    return {
      success: true,
      message: "Nonsterile data deleted successfully!",
    };
  } catch (error) {
    console.error("Failed to delete Nonsterile data:", error);
    return {
      success: false,
      message: "Database error: Failed to delete Nonsterile data.",
    };
  }
}