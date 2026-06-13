import { getAuthenticatedClient } from "../supabase/auth-helpers";


export async function globalSearch(input: string,): Promise <{ 
    success: boolean,
    message: string,
    data: Array<{
        department: string,
        date: string,
        summary: string
    }> | null
}> {
    try {
        const { supabase } = await getAuthenticatedClient();

        const { data, error } = await supabase.rpc('global_search', { search_term: input });

        if (error) throw error;

        return {
            success: true,
            message: `Returned ${data.length} results for ${input}`,
            data
        }
    } catch (error) {
        console.error(`Failed to return results for ${input}`)
        return {
            success: false,
            message: "Database error. Retry Query with different input",
            data: null
        }
    }
}