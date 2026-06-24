"use server"

import { getAuthenticatedClient } from "../supabase/auth-helpers";

export interface HuddleRow {
    department: string;
    safety: string;
    barriers: string;
    inventory: string;
    wins: string
}


export async function getHuddleCategoriesAction(
    date: string,
    shift: string
): Promise <{ 
    success: boolean,
    message: string,
    data: HuddleRow[] | null
}> {
    try {
        const { supabase } = await getAuthenticatedClient();

        const { data, error } = await supabase.rpc('huddle_categories', {
            p_date: date,
            p_shift: shift
        });

        if (error) throw error;

        return {
            success: true,
            message: `Returned ${data.length} results for ${date} (${shift} shift)`,
            data: data as HuddleRow[]
        }
    } catch (error) {
        console.error(`Failed to return results for ${date} - ${shift}`, error)
        return {
            success: false,
            message: "Database error. Retry Query with different input",
            data: null
        }
    }
}