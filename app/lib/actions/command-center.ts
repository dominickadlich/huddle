"use sever";

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { getAuthenticatedClient } from '../supabase/auth-helpers';
import type {
    CommandCenter,
    CommandCenterInsert,
    CommandCenterUpdate,
} from '../types/database'
import { SharedSchema, type SharedErrors } from './iv-room';

// ============================================
// ZOD VALIDATION SCHEMAS
// ============================================
const CommandCenterBaseSchema = z.object({
    date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
    shift: z.enum(["morning", "afternoon", "evening"]),
    hot_spots: z.string().nullable().optional(),
    ca_tpn: z.string().nullable().optional(),
    hc_tpn: z.string().nullable().optional(),
    workload_csr: z.string().nullable().optional(),
    workload_cmd: z.string().nullable().optional(),
})

const CommandCenterScheme = z.object({
    ...CommandCenterBaseSchema.shape,
    ...SharedSchema.shape
})

// ============================================
// STATE TYPES FOR FORM ACTIONS
// ============================================
export type CommandCenterUpdateSchema = {
    errors?: SharedErrors & {
        date?: string[];
        shift?: string[];
        hot_spots?: string[];
        ca_tpn?: string[];
        hc_tpn?: string[];
        workload_cst: string[];
        workload_cmd: string[];
        _form?: string[]
    }
    message?: string | null;
    data?: CommandCenter | null
}