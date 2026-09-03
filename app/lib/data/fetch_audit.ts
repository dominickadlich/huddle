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
    full_name: string | null
}

export async function fetchAuditByDate(
    date: string,
    tableName: string,
): Promise<AuditRow[] | null> {
    const supabase = await createClient()

    const { data, error } = await supabase
        .rpc('fetch_audit_by_date', { target_date: date, dept: tableName })

    if (error) throw error;

    return data;
}