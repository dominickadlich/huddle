import { createClient } from "../supabase/server";
import type { Distribution } from "../types/database";

// ============================================
// Fetch Latest Distribution Data
// ============================================
export async function fetchLatestDistribution(): Promise<Distribution | null> {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('distribution')
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
// Fetch Distribution By Date
// ============================================
export async function fetchDistributionByDate(
    date: string,
    shift: string
): Promise<Distribution | null> {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('distribution')
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
export async function fetchDistributionLiveWithFallback(
    today: string,
    shift: string
): Promise<Distribution | null> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('distribution')
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
export async function fetchRecentDistribution(
    limit: number = 7
): Promise<Distribution[]> {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('distribution')
        .select('*')
        .order('date', { ascending: false})
        .limit(limit)

    if (error) throw error;

    return data ?? []; 
}