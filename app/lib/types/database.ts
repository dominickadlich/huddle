// ============================================
// Import Supabase-generated types
// ============================================
import type { Database, Tables, TablesInsert, TablesUpdate } from './supabse'

// ============================================
// RE-EXPORT Supabase types
// ============================================
export type { Database, Tables, TablesInsert, TablesUpdate };

// Type aliases for tables
export type User = Tables<'users'>;
export type DailySummary = Tables<'daily_summary'>;
export type HuddleUpdate = Tables<'huddle_updates'>;

// Insert types (for creating new records)
export type DailySummaryInsert = TablesInsert<'daily_summary'>;
export type HuddleUpdateInsert = TablesInsert<'huddle_updates'>;

// Update types (for partial updates)
export type DailySummaryUpdate = TablesUpdate<'daily_summary'>;
export type HuddleUpdateUpdate = TablesUpdate<'huddle_updates'>;

// ============================================
// CUSTOM ENUMS (for app logic)
// ============================================
export type ShiftType = 'morning' | 'afternoon' | 'evening';

export type DepartmentType = 
  | 'Distribution'
  | 'CSR'
  | 'IVR'
  | 'Nonsterile'
  | 'RX Leadership';

// ============================================
// COMPOSITE TYPES (for joined queries)
// ============================================
export interface DailySummaryWithUpdates extends DailySummary {
  updates: HuddleUpdate[];
}

export interface DashboardData {
  daily_summary: DailySummary;
  updates: {
    distribution: HuddleUpdate | null;
    csr: HuddleUpdate | null;
    ivr: HuddleUpdate | null;
    nonsterile: HuddleUpdate | null;
    rx_leadership: HuddleUpdate | null;
  };
}