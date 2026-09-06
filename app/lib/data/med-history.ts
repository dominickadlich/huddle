import { createClient } from "../supabase/server";
import type { MedHistory } from "../types/database";

// ============================================
// Fetch Latest Med History Data
// ============================================
export async function fetchLatestMedHistory(): Promise<MedHistory | null> {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('med_history')
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
// Fetch Med History By Date
// ============================================
export async function fetchMedHistoryByDate(
    date: string,
    shift: string
): Promise<MedHistory | null> {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('med_history')
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
export async function fetchMedHistoryLiveWithFallback(
    today: string,
    shift: string
): Promise<MedHistory | null> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('med_history')
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
// Fetch Last 7 Med History Data
// ============================================
export async function fetchRecentMedHistory(
    limit: number = 7
): Promise<MedHistory[]> {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('med_history')
        .select('*')
        .order('date', { ascending: false})
        .limit(limit)

    if (error) throw error;

    return data ?? []; 
}