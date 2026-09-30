'use server';

import { revalidatePath } from "next/cache";
import { getAuthenticatedClient } from "../supabase/auth-helpers";
import { WDIPAssignmentBatchSchema, type WDIPAssignmentInput, WDIPAssignmentSchema } from "../types/huddle-schemas";


// ============================================
// UPSERT WDIP Assignments (Create or Update)
// ============================================
export async function upsertWDIPAssignments(
  input: WDIPAssignmentInput[],
): Promise<{ success: boolean; message: string }> {
  const parsed = WDIPAssignmentBatchSchema.safeParse(input);
    if (!parsed.success) {
        return { success: false, message: parsed.error.issues[0]?.message ?? "Invalid Input" }
    }

    try {
        const { supabase, userId } = await getAuthenticatedClient();

        const { error } = await supabase.from("wdip_assignments").upsert(
            parsed.data.map((row) => ({
                ...row,
                source: "manual",
                updated_by: userId,
                updated_at: new Date().toISOString(),
            })),
            { onConflict: "team,shift,shift_date" },
        )

        if (error) throw error;

        revalidatePath("/team-huddle/wdip")
        return { success: true, message: "Saved" };
    } catch (error) {
        console.error("Failed to save WDIP assignment:", error);
        return { success: false, message: "Failed to save" };
    }
}