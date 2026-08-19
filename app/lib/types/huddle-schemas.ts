import { z } from 'zod';
import { CommandCenter, Distribution, IvRoom, ORPharmacy, TeamEight } from './database';

// ============================================
// IV ROOM - ZOD VALIDATION SCHEMAS
// ============================================
export const IVRoomBaseSchema = z.object({
    date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
    shift: z.enum(["morning", "afternoon", "evening"]),
    monthly_clean: z.string().nullable().optional(),
    tpn: z.string().nullable().optional(),
    hazardous: z.string().nullable().optional(),
    sc: z.string().nullable().optional(),
    assignment_two: z.string().nullable().optional(),
    training: z.string().nullable().optional(),
    iv_support: z.string().nullable().optional(),
    inventory: z.string().nullable().optional(),
    team_building: z.string().nullable().optional(),
    unique_work: z.string().nullable().optional(),
    bell_ivrm_activities: z.boolean().nullable().optional(),
    bell_dp_activities: z.boolean().nullable().optional(),
    tpn_activities: z.boolean().nullable().optional(),
    sc_activities: z.boolean().nullable().optional(),
    chm_activities: z.boolean().nullable().optional(),
});

export const SharedSchema = z.object({
    safety: z.string().nullable().optional(),
    barriers: z.string().nullable().optional(),
    wins: z.string().nullable().optional(),
    opportunities: z.string().nullable().optional(),
    announcements: z.string().nullable().optional(),
    summary_text: z.string().nullable().optional(),
    inventory: z.string().nullable().optional(),
});

export const IVRoomSchema = z.object({
    ...IVRoomBaseSchema.shape,
    ...SharedSchema.shape
})

// ============================================
// IV ROOM - STATE TYPES FOR FORM ACTIONS
// ============================================
export type SharedErrors = {
    safety?: string[],
    barriers?: string[],
    wins?: string[],
    inventory?: string[],
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
        inventory?: string[];
        team_building?: string[];
        unique_work?: string[];
        monthly_clean?: string[];
        _form?: string[];
    }
    message?: string | null;
    data?: IvRoom | null;
}


// ============================================
// COMMAND CENTER - ZOD VALIDATION SCHEMAS
// ============================================
export const CommandCenterBaseSchema = z.object({
    date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
    shift: z.enum(["morning", "afternoon", "evening"]),
    hot_spots: z.string().nullable().optional(),
    ca_tpn: z.string().nullable().optional(),
    hc_tpn: z.string().nullable().optional(),
    workload_csr: z.string().nullable().optional(),
    workload_cmd: z.string().nullable().optional(),
    workload_pp: z.string().nullable().optional(),
    five_oh_three_b: z.string().nullable().optional(),
    dispense_prep: z.string().nullable().optional(),
    dispense_check: z.string().nullable().optional(),
    // inventory: z.string().nullable().optional(),
})

export const CommandCenterSchema = z.object({
    ...CommandCenterBaseSchema.shape,
    ...SharedSchema.shape
})

// ============================================
// COMMAND CENTER - STATE TYPES FOR FORM ACTIONS
// ============================================
export type CommandCenterUpdateState = {
    errors?: SharedErrors & {
        date?: string[];
        shift?: string[];
        hot_spots?: string[];
        ca_tpn?: string[];
        hc_tpn?: string[];
        workload_csr?: string[];
        workload_cmd?: string[];
        workload_pp?: string[];
        five_oh_three_b: string[];
        dispense_prep: string[];
        dispense_check: string[];
        _form?: string[];
    }
    message?: string | null;
    data?: CommandCenter | null
}


// ============================================
// DISTRIBUTION - ZOD VALIDATION SCHEMAS
// ============================================
export const DistributionBaseSchema = z.object({
    date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
    shift: z.enum(["morning", "afternoon", "evening"]),
    hot_spots: z.string().nullable().optional(),
    ca_tpn: z.string().nullable().optional(),
    hc_tpn: z.string().nullable().optional(),
    five_oh_three_b: z.string().nullable().optional(),
})

export const DistributionSchema = z.object({
    ...DistributionBaseSchema.shape,
    ...SharedSchema.shape
})

// ============================================
// DISTRIBUTION - STATE TYPES FOR FORM ACTIONS
// ============================================
export type DistributionUpdateState = {
    errors?: SharedErrors & {
        date?: string[];
        shift?: string[];
        hot_spots?: string[];
        ca_tpn?: string[];
        hc_tpn?: string[];
        five_oh_three_b: string[];
        _form?: string[];
    }
    message?: string | null;
    data?: Distribution | null
}


// ============================================
// OR Pharmacy - ZOD VALIDATION SCHEMAS
// ============================================
export const ORPharmacyBaseSchema = z.object({
    date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
    shift: z.enum(["morning", "afternoon", "evening"]),
    assignment_one: z.string().nullable().optional(),
    assignment_two: z.string().nullable().optional(),
    orft: z.string().nullable().optional(),
    training: z.string().nullable().optional(),
    support: z.string().nullable().optional(),
    monthly_clean: z.string().nullable().optional(),
})

export const ORPharmacySchema = z.object({
    ...ORPharmacyBaseSchema.shape,
    ...SharedSchema.shape
})

// ============================================
// OR Pharmacy - STATE TYPES FOR FORM ACTIONS
// ============================================
export type ORPharmacyUpdateState = {
    errors?: SharedErrors & {
        date?: string[];
        shift?: string[];
        assignment_one?: string[];
        assignment_two?: string[];
        orft?: string[];
        training?: string[];
        support?: string[];
        monthly_clean?: string[];
        _form?: string[];
    }
    message?: string | null;
    data?: ORPharmacy | null
}


// ============================================
// Team Eight - ZOD VALIDATION SCHEMAS
// ============================================
export const TeamEightBaseSchema = z.object({
    date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
    shift: z.enum(["morning", "afternoon", "evening"]),
    eight_a: z.string().nullable().optional(),
    eight_b: z.string().nullable().optional(),
    iv_one: z.string().nullable().optional(),
    iv_two: z.string().nullable().optional(),
})

export const TeamEightSchema = z.object({
    ...TeamEightBaseSchema.shape,
    ...SharedSchema.shape
})

// ============================================
// Team Eight - STATE TYPES FOR FORM ACTIONS
// ============================================
export type TeamEightUpdateState = {
    errors?: SharedErrors & {
        date?: string[];
        shift?: string[];
        eight_a?: string[];
        eight_b?: string[];
        iv_one?: string[];
        iv_two?: string[];
        _form?: string[];
    }
    message?: string | null;
    data?: TeamEight | null
}