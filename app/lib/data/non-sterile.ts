import { createClient } from "../supabase/server";
import type { NonSterile } from "../types/database";

// ============================================
// Fetch Latest Nonsterile By Date
// ============================================
export async function fetchLatestNonsterile(): Promise<NonSterile | null> {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('non_sterile')
        .select('*')
        .order('date', { ascending: false })
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

    if (error) {
        if (error.code === 'PGRST116') return null;
        throw error;
    }

    return data;
}

// ============================================
// Fetch Nonsterile By Date
// ============================================
export async function fetchNonsterileByDate(
    date: string,
    shift: string
): Promise<NonSterile | null> {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('non_sterile')
        .select('*')
        .eq('date', date)
        .eq('shift', shift)
        .single()

    if (error) {
        if (error.code === 'PGRST116') return null; // No row found
        throw error
    }

    return data;
}


// ============================================
// Fetch Last 7 IV Room Data
// ============================================
export async function fetchRecentNonsterile(
    limit: number = 7
): Promise<NonSterile[]> {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('non_sterile')
        .select('*')
        .order('date', { ascending: false})
        .limit(limit)

    if (error) throw error;

    return data ?? [];
}