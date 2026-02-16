import { createClient } from "../supabase/server";
import type { IvRoom } from "../types/database";

// ============================================
// Fetch Latest IV Room Data
// ============================================
export async function fetchLatestIVRoom(): Promise<IvRoom | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('iv_room')
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
// Fetch IV Room By Date
// ============================================
export async function fetchIVRoomByDate(
    date: string,
    shift: string
): Promise<IvRoom | null> {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('iv_room')
        .select('*')
        .eq('date', date)
        .eq('shift', shift)
        .single()

    if (error) {
        if (error.code === 'PGRST116') return null; // No rows found
        throw error;
    }

    return data;
}

// ============================================
// Fetch Last 7 IV Room Data
// ============================================
export async function fetchRecentIVRoom(
    limit: number = 7
): Promise<IvRoom[]> {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('iv_room')
        .select('*')
        .order('date', { ascending: false })
        .limit(limit)

    if (error) throw error;

    return data ?? [];
}