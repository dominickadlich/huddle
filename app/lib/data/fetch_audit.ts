'use server'

import { createClient } from "../supabase/server";

export interface AuditRow {
    id: string
    user_id: string | null
    department: string | null
    table_name: string
    record_id: string
    operation: 'INSERT' | 'UPDATE' | 'DELETE'
    category: string | null
    change_summary: string | null
    old_data: Record<string, unknown> | null
    new_data: Record<string, unknown> | null
    created_at: string
    users: { full_name: string | null } | null
}


// ============================================
// Fetch IV Room By Date
// ============================================
export async function fetchAuditByDate(
    date: string,
    tableName: string,
): Promise<AuditRow[] | null> {
    // console.log('querying audit for', { date, tableName })

    const supabase = await createClient()

    const { data, error } = await supabase
        .from('audit')
        .select('*, users(full_name)')
        .eq('department', tableName)
        .gte('created_at', `${date}T00:00:00`)
        .lt('created_at', `${date}T23:59:59.999`)
        .order('created_at', { ascending: false })
        
    console.log('audit query result:', { data, error })

    if (error) throw error;

    return data;
}