import { z } from 'zod';
import { IvRoom } from './database';

// ============================================
// ZOD VALIDATION SCHEMAS
// ============================================
export const IVRoomBaseSchema = z.object({
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

export const IVRoomSchema = z.object({
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