import 'server-only'

import { createClient } from "../supabase/server";
import type { WDIPAssignment } from '../types/database';
import type { Shift } from '../script-docs/floor-coverage';

export async function fetchWDIPAssignments(
  shiftDate: string,
  shift: Shift,
): Promise<WDIPAssignment[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("wdip_assignments")
    .select("*")
    .eq("shift_date", shiftDate)
    .eq("shift", shift);

  if (error) throw error;
  return data ?? [];
}