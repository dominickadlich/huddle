import { createClient } from "@supabase/supabase-js";
import { User, HuddleData } from "./defintions"

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function fetchHuddleData() {
    try {
        const { data, error } = await supabase
            .from('huddle_data')
            .select('*')
            .overrideTypes<HuddleData[]>()
        
        if (error) throw error
        return data || []
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch huddle data.')
    }
}

import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function fetchLatestHuddleData() {
    try {
        const data = await sql`
            SELECT * FROM huddle_data
            ORDER BY date DESC
            LIMIT 1
        `;

        console.log('Data found:', data);
        return data[0];
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch latest huddle data.');
    }
}

// export async function fetchLatestHuddleData() {
//     try {
//         console.log('Attempting to fetch data...')

//         const { data, error } = await supabase
//         .from('huddle_data')
//         .select('*')
//         .order('date', { ascending: false })
//         .limit(1)
//         .single()
        
//         console.log('Raw data from Supabase:', data)
//         console.log('Any error:', error)

//         if (error) throw error
//         return data
//     } catch (error) {
//         console.error('Database Error:', error);
//         throw new Error('Failed to fetch latest huddle data.')
//     }
// }

export async function fetchAllCensusData() {
    try {
        const { data, error } = await supabase
        .from('huddle_data')
        .select('census, date')
        .order('date', { ascending: false })

        if (error) throw error
        return data
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch census data.')
    }
}

export async function fetchLatestOpportunities() {
    try {
        const { data, error } = await supabase
        .from('huddle_data')
        .select('*')
        .order('date', { ascending: false })

        if (error) throw error
        return data?.flatMap(row => row.opportunities || []) || []
    } catch (error) {
        console.log('Database Error:', error);
        throw new Error('Failed to fetch opportunity data')
    }
}