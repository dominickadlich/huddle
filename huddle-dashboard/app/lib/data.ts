import { createClient } from "@supabase/supabase-js";
import { User, HuddleData } from "./defintions"

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!
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