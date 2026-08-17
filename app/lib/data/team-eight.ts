import { createClient } from "../supabase/server";
import type { TeamEight } from "../types/database";

// ============================================
// Fetch Latest TeamEight Data
// ============================================
export async function fetchLatestTeamEight(): Promise<TeamEight | null> {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('team_eight')
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
// Fetch TeamEight By Date
// ============================================
export async function fetchTeamEightByDate(
    date: string,
    shift: string
): Promise<TeamEight | null> {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('team_eight')
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
export async function fetchTeamEightLiveWithFallback(
    today: string,
    shift: string
): Promise<TeamEight | null> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('team_eight')
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
export async function fetchRecentTeamEight(
    limit: number = 7
): Promise<TeamEight[]> {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('team_eight')
        .select('*')
        .order('date', { ascending: false})
        .limit(limit)

    if (error) throw error;

    return data ?? []; 
}