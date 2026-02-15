// ============================================
// Import Supabase-generated types
// ============================================
import type { Database, Tables, TablesInsert, TablesUpdate } from "./supabase";



// ============================================
// RE-EXPORT Supabase types
// ============================================
export type { Database, Tables, TablesInsert, TablesUpdate };



// ============================================
// Type Aliases
// ============================================

// Users
export type User = Tables<"users">;

// Daily Summary
export type DailySummary = Tables<"daily_summary">;
export type DailySummaryInsert = TablesInsert<"daily_summary">;
export type DailySummaryUpdate = TablesUpdate<"daily_summary">;

// Huddle Updates
export type HuddleUpdate = Tables<"huddle_updates">;
export type HuddleUpdateInsert = TablesInsert<"huddle_updates">;
export type HuddleUpdateUpdate = TablesUpdate<"huddle_updates">;

// IV Room
export type IvRoom = Tables<'iv_room'>;
export type IvRoomInsert = TablesInsert<'iv_room'>;
export type IvRoomUpdate = TablesUpdate<'iv_room'>;

// Command Center
export type CommandCenter = Tables<'command_center'>;
export type CommandCenterInsert = TablesInsert<'command_center'>;
export type CommandCenterUpdate = TablesUpdate<'command_center'>;

// Distribution
export type Distribution = Tables<'distribution'>;
export type DistributionInsert = TablesInsert<'distribution'>;
export type DistributionUpdate = TablesUpdate<'distribution'>;

// Nonsterile
export type NonSterile = Tables<'non_sterile'>;
export type NonSterileInsert = TablesInsert<'non_sterile'>;
export type NonSterileUpdate = TablesUpdate<'non_sterile'>;



// ============================================
// CUSTOM ENUMS (for app logic)
// ============================================
export type ShiftType = "morning" | "afternoon" | "evening";

export type DepartmentType =
  | "Distribution"
  | "CSR"
  | "IVR"
  | "Nonsterile"
  | "RX Leadership";


  
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

export type DepartmentUpdate = {
  id: string;
  update_text: string | null;
} | null;
