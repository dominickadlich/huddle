import { createClient } from "../supabase/server";
import type { IvRoom } from "../types/database";

const CARRY_FORWARD_FIELDS = [
  'safety',
  'barriers',
  'inventory',
  'announcements',
  'monthly_clean',
] as const;

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
// Fetch Most Recent Data 
// ============================================
export async function fetchIVRoomLiveWithFallback(
    today: string,
    shift: string
): Promise<IvRoom | null> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('iv_room')
        .select('*')
        .lte('date', today)
        .eq('shift', shift)
        .order('date', { ascending: false })
        .limit(1)
        .maybeSingle();

    if (error) throw error;
    return data;
}


// =======================================================
// Fetch Data From Last 7 Days to Pre-Populate Dashboard
// =======================================================
export async function fetchIVRoomLiveWithCarryForward(
  today: string,
  shift: string
): Promise<IvRoom | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('iv_room')
    .select('*')
    .lte('date', today)
    .eq('shift', shift)
    .order('date', { ascending: false })
    .limit(7);

  if (error) throw error;
  if (!data?.length) return null;

  const [latest, ...prior] = data;

  // No row for today: latest is already the fallback row, return as-is
  if (latest.date !== today) return latest;

  // Today's row exists (e.g. pre-populated Team Building): fill gaps from prior days
  const merged: Record<string, unknown> = { ...latest };
  for (const field of CARRY_FORWARD_FIELDS) {
    if (merged[field] == null) {
      merged[field] = prior.find((r) => r[field] != null)?.[field] ?? null;
    }
  }
  return merged as IvRoom;
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