"use server"

import { getAuthenticatedClient } from "../supabase/auth-helpers"
import { DepartmentSearchResult } from "./distribution_search";


export async function ivRoomSearch(input: string): Promise<{
    success: boolean,
    message: string,
    data: DepartmentSearchResult[] | null
}> {
    try {
        const { supabase } = await getAuthenticatedClient()

        const { data, error } = await supabase.rpc('iv_room_search', { search_term: input });

        if (error) throw error;

        return {
            success: true,
            message: `Returned ${data.length} results for ${input}`,
            data
        }
    } catch (error) {
        console.error(`Failed to return results for ${input}`, error)
        return {
            success: false,
            message: "Database error. Retry query with different input",
            data: null
        }
    }
}