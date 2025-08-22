import { createClient } from "@supabase/supabase-js";
import { User, HuddleData } from "./defintions"

console.log('=== SUPABASE DEBUG ===')
console.log('SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
console.log('POSTGRES_URL:', process.env.POSTGRES_URL)
console.log('=====================')

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// export async function testSupabaseConnection() {
//     try {
//         const { data, error } = await supabase
//             .from('huddle_data')
//             .select('count(*)', { count: 'exact' })
        
//         console.log('Supabase test result:', { data, error })
//         return { success: true, data, error }
//     } catch (error) {
//         console.log('Supabase test failed:', error)
//         return { success: false, error }
//     }
// }

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

// import postgres from "postgres";

// const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

// export async function fetchLatestHuddleData() {
//     try {
//         const data = await sql`
//             SELECT * FROM huddle_data
//             ORDER BY date DESC
//         `;

//         console.log('Data found:', data);
//         return data[0];
//     } catch (error) {
//         console.error('Database Error:', error);
//         throw new Error('Failed to fetch latest huddle data.');
//     }
// }

export async function fetchLatestHuddleData() {
    try {
        console.log('Attempting to fetch data...')

        const { data, error } = await supabase
        .from('huddle_data')
        .select('*')
        .order('date', { ascending: false })
        .limit(1)
        .single()
        
        console.log('Raw data from Supabase:', data)
        console.log('Any error:', error)

        if (error) throw error
        return data
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch latest huddle data.')
    }
}

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
        .limit(4)

        if (error) throw error
        return data?.flatMap(row => row.opportunities || []) || []
    } catch (error) {
        console.log('Database Error:', error);
        throw new Error('Failed to fetch opportunity data')
    }
}