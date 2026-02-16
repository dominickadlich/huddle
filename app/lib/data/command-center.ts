import { createClient } from "../supabase/server";
import type { CommandCenter } from "../types/database";

// ============================================
// Fetch Latest Command Center Data
// ============================================
export async function fetchLatestCommandCenter(): Promise<CommandCenter | null> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('command_center')
        .select('*')
        .order('date', { ascending: false })
        .order('created_at', { ascending: false })
        .limit(1)
        .single()

    if (error) {
        if (error.code === "PGRST116") return null; // No row found
        throw error
    }

    return data;
}

// ============================================
// Fetch Command Center By Date
// ============================================
export async function fetchCommandCenterByDate(
    date: string,
    shift: string,
): Promise<CommandCenter | null> {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('command_center')
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
// Fetch Last 7 IV Room Data
// ============================================
export async function fetchRecentCommandCenter(
    limit: number = 7
): Promise<CommandCenter[]> {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('command_center')
        .select('*')
        .order('date', { ascending: false })
        .limit(limit)

    if (error) throw error;

    return data ?? [];
}