"use server"

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


// Current SQL Query:
// CREATE OR REPLACE FUNCTION global_search(search_term TEXT)
// RETURNS TABLE (department TEXT, date DATE, summary TEXT)
// LANGUAGE sql
// AS $$
// SELECT DISTINCT department, daily_summary.date, update_text as summary
// FROM huddle_updates
// JOIN daily_summary ON huddle_updates.daily_summary_id = daily_summary.id
// WHERE update_text ILIKE '%' || search_term || '%'
// ORDER BY date DESC
// $$;


// Deparment specific query:
// CREATE OR REPLACE FUNCTION iv_room_search(search_term TEXT)
// RETURNS TABLE (department TEXT, date DATE, summary TEXT, field_label TEXT)
// LANGUAGE sql
// AS $$
// SELECT 'IV Room', date, announcements, 'Announcements'
// FROM iv_room
// WHERE announcements ILIKE '%' || search_term || '%'

// UNION ALL

// SELECT 'IV Room', date, team_building, 'Team Building'
// FROM iv_room
// WHERE team_building ILIKE '%' || search_term || '%'
// $$;


// Department everything:
// CREATE OR REPLACE FUNCTION department_search(search_term TEXT, dept TEXT)
// RETURNS TABLE (department TEXT, date DATE, summary TEXT, field_label TEXT)
// LANGUAGE plpgsql
// AS $$
// BEGIN
//     RETURN QUERY
//     SELECT department, daily_summary.date, update_text, category
//     FROM huddle_updates
//     JOIN daily_summary ON huddle_updates.daily_summary_id = daily_summary.id
//     WHERE update_text ILIKE '%' || search_term || '%'
//       AND department = dept;

//     IF dept = 'IV Room' THEN
//         RETURN QUERY SELECT * FROM iv_room_search(search_term);
//     ELSIF dept = 'Command Center' THEN
//         RETURN QUERY SELECT * FROM command_center_search(search_term);
//     ELSIF dept = 'Distribution' THEN
//         RETURN QUERY SELECT * FROM distribution_search(search_term);
//     -- ... one branch per department
//     END IF;
// END;
// $$;