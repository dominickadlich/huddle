"use server";

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { getAuthenticatedClient } from '../supabase/auth-helpers';
import type {
    Distribution,
    DistributionInsert,
    DistributionUpdate,
} from '../types/database'
import { SharedSchema, type SharedErrors } from '../types/huddle-schemas';

// ============================================
// ZOD VALIDATION SCHEMAS
// ============================================
const DistributionBaseSchema = z.object({
    date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
    shift: z.enum(["morning", "afternoon", "evening"]),
    hot_spots: z.string().nullable().optional(),
    ca_tpn: z.string().nullable().optional(),
    hc_tpn: z.string().nullable().optional(),
})

const DistributionSchema = z.object({
    ...DistributionBaseSchema.shape,
    ...SharedSchema.shape
})

// ============================================
// STATE TYPES FOR FORM ACTIONS
// ============================================
export type DistributionUpdateState = {
    errors?: SharedErrors & {
        date?: string[];
        shift?: string[];
        hot_spots?: string[];
        ca_tpn?: string[];
        hc_tpn?: string[];
        _form?: string[];
    }
    message?: string | null;
    data?: Distribution | null
}


// ============================================
// UPSERT Distribution (Create or Update)
// ============================================
export async function upsertDistribution(
    prevState: DistributionUpdateState,
    formData: FormData
): Promise<DistributionUpdateState> {
    try {
        const { supabase, userId } = await getAuthenticatedClient()

        const rawData = {
            date: formData.get('date'),
            shift: formData.get('shift'),
            hot_spots: formData.get('hot_spots') || null,
            ca_tpn: formData.get('ca_tpn') || null,
            hc_tpn: formData.get('hc_tpn') || null,
            safety: formData.get('safety') || null,
            barriers: formData.get('barriers') || null,
            wins: formData.get('wins') || null,
            opportunities: formData.get('opportunities') || null,
            announcements: formData.get('announcements') || null,
            summary_text: formData.get('summary_text') || null
        }

        const validatedFields = DistributionSchema.safeParse(rawData);

        if (!validatedFields.success) {
            return {
                errors: validatedFields.error.flatten().fieldErrors,
                message: 'Invalid fields. Please double check your input.'
            };
        }

        const { date, shift, ...fields } = validatedFields.data;

        // Check if Distribution exists
        const { data: existing, error: existingError } = await supabase
            .from('distribution')
            .select('id')
            .eq('date', date)
            .eq('shift', shift)
            .single()

        if (existingError && existingError.code !== 'PGRST116') {
            throw existingError;
        }

        if (existing) {
            // UPDATE existing record
            const updateData: DistributionUpdate = {
                ...fields,
                updated_by: userId,
                updated_at: new Date().toISOString(),
            };

            const { data, error } = await supabase
                .from('distribution')
                .update(updateData)
                .eq('id', existing.id)
                .select()
                .single()

            if (error) throw error;

            revalidatePath('/dashboard')

            return {
                message: 'Distribution Data has been updated successfully!',
                data
            };
        } else {
            // CREATE new record 
            const insertData: DistributionInsert = {
                date,
                shift,
                ...fields,
                created_by: userId,
                updated_by: userId,
            };

            const { data, error } = await supabase
                .from('distribution')
                .insert(insertData)
                .select()
                .single();

            if (error) throw error;

            revalidatePath('/dashboard')

            return {
                message: 'Distribution data created successfully!',
                data,
            };
        }
    } catch (error) {
        console.error('Failed to save Distribution data:', error);
        return {
            message: 'Database error: Failed to save Distribution data.'
        }
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