// ============================================
// Import Supabase-generated types
// ============================================
import type { Database, Tables, TablesInsert, TablesUpdate } from './supabse'

// ============================================
// RE-EXPORT Supabase types for convenience
// ============================================
export type { Database, Tables, TablesInsert, TablesUpdate };

// Type aliases for cleaner code
export type User = Tables<'users'>;
export type DailySummary = Tables<'daily_summary'>;
export type Huddle = Tables<'huddles'>;
export type HuddleMetrics = Tables<'huddle_metrics'>;
export type HuddleItem = Tables<'huddle_items'>;

// Insert types (for creating new records)
export type DailySummaryInsert = TablesInsert<'daily_summary'>;
export type HuddleInsert = TablesInsert<'huddles'>;
export type HuddleMetricsInsert = TablesInsert<'huddle_metrics'>;
export type HuddleItemInsert = TablesInsert<'huddle_items'>;

// Update types (for partial updates)
export type DailySummaryUpdate = TablesUpdate<'daily_summary'>;
export type HuddleUpdate = TablesUpdate<'huddles'>;
export type HuddleMetricsUpdate = TablesUpdate<'huddle_metrics'>;
export type HuddleItemUpdate = TablesUpdate<'huddle_items'>;

// ============================================
// CUSTOM ENUMS (for app logic)
// ============================================
export type ShiftType = 'morning' | 'afternoon' | 'evening';
export type DepartmentType = 'CSR' | 'IVR' | 'Cambridge' | 'Operations';
export type HuddleItemType = 
  | 'unresolved_issue' 
  | 'barrier' 
  | 'shout_out' 
  | 'go_live' 
  | 'safety' 
  | 'inventory';
export type ItemStatus = 'open' | 'completed';

// ============================================
// DEPARTMENT-SPECIFIC METRICS TYPES (FIXED)
// ============================================
export interface CSRMetrics {
  csr_queue: boolean;
  complex_preps_csr: number;
  non_sterile_projects: number;
}

export interface IVRMetrics {
  tpn_count: string;
  complex_preps_iv: string;
}

export interface CambridgeMetrics {
  haz: string;
}

export interface OperationsMetrics {
  restock: boolean;
}

// Union type for all possible metrics
export type DepartmentMetrics = 
  | CSRMetrics 
  | IVRMetrics 
  | CambridgeMetrics 
  | OperationsMetrics;

// ============================================
// COMPOSITE TYPES (for joined queries)
// ============================================
export interface HuddleWithMetrics extends Huddle {
  metrics: HuddleMetrics | null;
  items: HuddleItem[];
}

export interface DailySummaryWithHuddles extends DailySummary {
  huddles: HuddleWithMetrics[];
}

export interface DashboardData {
  daily_summary: DailySummary;
  huddles: {
    csr: HuddleWithMetrics | null;
    ivr: HuddleWithMetrics | null;
    cambridge: HuddleWithMetrics | null;
    operations: HuddleWithMetrics | null;
  };
}