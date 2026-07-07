// ============================================
// Import Supabase-generated types
// ============================================
import { fetchDailySummaryWithUpdates } from "../data";
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
export type Nonsterile = Tables<'non_sterile'>;
export type NonsterileInsert = TablesInsert<'non_sterile'>;
export type NonsterileUpdate = TablesUpdate<'non_sterile'>;

// OR Pharmacy
export type ORPharmacy = Tables<'or_pharmacy'>;
export type ORPharmacyInsert = TablesInsert<'or_pharmacy'>;
export type ORPharmacyUpdate = TablesUpdate<'or_pharmacy'>;

// Team Eight
export type TeamEight = Tables<'team_eight'>;
export type TeamEightInsert = TablesInsert<'team_eight'>;
export type TeamEightUpdate = TablesUpdate<'team_eight'>;


// ============================================
// CUSTOM ENUMS (for app logic)
// ============================================
export type ShiftType = "morning" | "afternoon" | "evening";

export type DepartmentType =
  | "Distribution"
  | "CSR"
  | "IVR"
  | "Nonsterile"
  | "ORP"
  | "T8"
  | "RX Leadership";

// export type DepartmentType =
//   | "Distribution"
//   | "Command Center"
//   | "IV Room"
//   | "Non Sterile"
//   | "RX Leadership";

  
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
    or_pharmacy: HuddleUpdate | null;
    team_eight: HuddleUpdate | null;
    rx_leadership: HuddleUpdate | null;
  };
}

export type DepartmentUpdate = {
  id: string;
  update_text: string | null;
} | null;
