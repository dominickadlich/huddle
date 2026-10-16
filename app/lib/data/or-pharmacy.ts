import { OR_BATCHING_SCHEDULE } from "../config/or-batching-schedule";
import { createClient } from "../supabase/server";
import type { ORPharmacy } from "../types/database";
import { getLocalDate, weekdayOf } from "../utils/utils";

// ============================================
// Fetch Latest OR Pharmacy Data
// ============================================
export async function fetchLatestORPharmacy(): Promise<ORPharmacy | null> {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('or_pharmacy')
        .select('*')
        .order('date', { ascending: false })
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

    if (error) {
        if (error.code === 'PGRST116') return null; // No row found
        throw error;
    }

    return data;
}


// ============================================
// Fetch OR Pharmacy By Date
// ============================================
export async function fetchORPharmacyByDate(
    date: string,
    shift: string
): Promise<ORPharmacy | null> {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('or_pharmacy')
        .select('*')
        .eq('date', date)
        .eq('shift', shift)
        .single()

    if (error) {
        if (error.code === 'PGRST116') return null; // No rows found
        throw error
    }

    return data;
}

// ============================================
// Fetch Most Recent Data 
// ============================================
export async function fetchORPharmacyLiveWithFallback(
    today: string,
    shift: string
): Promise<ORPharmacy | null> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('or_pharmacy')
        .select('*')
        .lte('date', today)
        .eq('shift', shift)
        .order('date', { ascending: false })
        .limit(1)
        .maybeSingle();

    if (error) throw error;
    return data;
}


// ============================================
// Fetch Last 7 IV Room Data
// ============================================
export async function fetchRecentORPharmacy(
    limit: number = 7
): Promise<ORPharmacy[]> {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('or_pharmacy')
        .select('*')
        .order('date', { ascending: false})
        .limit(limit)

    if (error) throw error;

    return data ?? []; 
}



// ============================================
// Apply Batching Template
// ============================================
export function applyBatchingTemplate(row: ORPharmacy | null, viewDate: string) {
    const isPast = viewDate < getLocalDate();
    const template = OR_BATCHING_SCHEDULE[weekdayOf(viewDate)];

    // Live view can fall back to an earlier day's row; its batching isn't today's
    const savedForDay = row?.date === viewDate ? row : null;
    const orTemplate = (value: string) => (isPast ? null : value);

    return {
        ...row,
        batching: savedForDay?.batching ?? orTemplate(template.batching),
        short_dated: savedForDay?.short_dated ?? orTemplate(template.short_dated),
    };
}