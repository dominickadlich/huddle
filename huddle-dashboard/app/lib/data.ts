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


const ITEMS_PER_PAGE = 6;
export async function fetchFilteredExtensions(
    query: string,
    currentPage: number,
) {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;

    try {
        const { data, error } = await supabase
        .from('central_directory')
        .select('*')
        .ilike('name', `%${query}%`)
        .order('name')
        .range(offset, offset + ITEMS_PER_PAGE - 1)

        if (error) throw error
        return data || []
    } catch (error) {
        console.error('Extension database error:', error);
        throw new Error('Failed to fetch extension data')
    }
}


export async function fetchExtensionsPages(query: string) {
    try {
        const { count, error } = await supabase
        .from('central_directory')
        .select('*', { count: 'exact', head: true })
        .or(`name.ilike.%${query}%,extension.ilike.%${query}%`)

        if (error) throw error

        const totalPages = Math.ceil((count || 0) / ITEMS_PER_PAGE);
        return totalPages;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch total number of extensions')
    }

}

export async function fetchExtensionById(id: string) {
    try {
        const { data, error } = await supabase
        .from('central_directory')
        .select('*')
        .eq('id', id)
        .single()

        if (error) throw  error
        return data
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error(`Failed to fetch extension with id: ${id}`)
    }
}