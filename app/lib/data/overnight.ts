import { createClient } from "../supabase/server";
import type { Overnight } from "../types/database";

// ============================================
// Fetch Latest Overnight Data
// ============================================
export async function fetchLatestOvernight(): Promise<Overnight | null> {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('overnight')
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
// Fetch Overnight By Date
// ============================================
export async function fetchOvernightByDate(
    date: string,
    shift: string
): Promise<Overnight | null> {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('overnight')
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
export async function fetchOvernightLiveWithFallback(
    today: string,
    shift: string
): Promise<Overnight | null> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('overnight')
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
// Fetch Last 7 Overnight Data
// ============================================
export async function fetchRecentOvernight(
    limit: number = 7
): Promise<Overnight[]> {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('overnight')
        .select('*')
        .order('date', { ascending: false})
        .limit(limit)

    if (error) throw error;

    return data ?? []; 
}