// export const commandCenterConfig = {
//   cardFields: [...],
//   textFields: [...],
//   iconMap: {...}
//   upsertFn: 
// }

import { 
    FireIcon,
    CakeIcon,
    HeartIcon,
    LockClosedIcon,
    ClipboardDocumentCheckIcon,
    SparklesIcon,
    ExclamationTriangleIcon,
    UserPlusIcon,
    NumberedListIcon,
    UsersIcon,
    UserIcon,
    UserGroupIcon,
    EyeDropperIcon,
    CheckCircleIcon,
    DocumentCheckIcon,
    WrenchIcon,
    BeakerIcon,
    BellIcon,
    BuildingOffice2Icon,
    ShoppingCartIcon
} from "@heroicons/react/24/outline";
import { upsertCommandCenter } from "../actions/command-center";
import { upsertDistribution } from "../actions/distribution";
import { upsertIVRoom } from "../actions/iv-room";
import { upsertORPharmacy } from "../actions/or-pharmacy";
import { upsertTeamEight } from "../actions/team-eight";


export const DEFAULT_SHIFT = "morning"; // stopgap until shift is fully removed

export const commandCenterConfig = {
    title: "CM/CSR/PP",
    department: "CSR",
    cardFields: [
        { key: 'workload_csr', title: 'Workload CSR' },
        { key: 'workload_cmd', title: 'Workload CMD' },
        { key: "workload_pp", title: "Workload PP" },
        { key: 'hot_spots', title: 'Hot Spots' },
        { key: 'five_oh_three_b', title: '503b' },
        // { key: 'ca_tpn', title: 'CA TPNs' },
        // { key: 'hc_tpn', title: 'HC TPNs' },
        // { key: "dispense_prep", title: "Dispense Prep" },
        // { key: "dispense_check", title: "Dispense Check" },
    ] as const,
    textFields: [
        { key: 'safety' , title: 'Safety (Concerns, Good Catches, Work Arounds)' },
        { key: 'barriers', title: 'Barriers (Missing or Failing Equipment, Supplies, etc.)' },
        { key: 'inventory', title: 'Inventory' },
        { key: 'wins', title: 'Team Wins & Recognition'},
    ] as const,
    iconMap: {
        hot_spots: FireIcon,
        ca_tpn: CakeIcon,
        hc_tpn: HeartIcon,
        workload_csr: LockClosedIcon,
        workload_cmd: ClipboardDocumentCheckIcon,
        workload_pp: BeakerIcon,
        five_oh_three_b: EyeDropperIcon,
        dispense_prep: DocumentCheckIcon,
        dispense_check: CheckCircleIcon,
    },
    upsertFn: upsertCommandCenter
}

export const distributionConfig = {
    title: "Distribution",
    department: "Distribution",
    cardFields: [
        { key: 'hot_spots', title: 'Hot Spots' },
        { key: 'ca_tpn', title: 'CA TPNs' },
        { key: 'hc_tpn', title: 'HC TPNs' },
        { key: 'five_oh_three_b', title: '503b' },
    ] as const,

    textFields: [
        { key: 'safety' , title: 'Safety (Concerns, Good Catches, Work Arounds)' },
        { key: 'barriers', title: 'Barriers (Missing or Failing Equipment, Supplies, etc.)' },
        { key: 'inventory', title: 'Inventory'}, 
        { key: 'opportunities', title: 'Opportunities'},
        { key: 'wins', title: 'Team Wins & Recognition'},
    ] as const,
    
    iconMap: {
        hot_spots: FireIcon,
        ca_tpn: CakeIcon,
        hc_tpn: HeartIcon,
        five_oh_three_b: EyeDropperIcon
    },
    upsertFn: upsertDistribution
}

export const ivRoomConfig = {
    title: "Sterile Compounding",
    department: "IVR",
    cardFields: [
        { key: 'unique_work', title: 'Unique Work' }, 
        { key: 'tpn', title: 'TPN' },
        { key: 'hazardous', title: 'Haz + PAPR' },
        { key: 'sc', title: 'SC' },
        { key: 'assignment_two', title: 'Asmt 2 + TPN Batching' },
        { key: 'training', title: 'Training' },
        { key: 'iv_support', title: 'IV Support' },
        { key: 'monthly_clean', title: 'Monthly Clean' },
    ] as const,

    textFields: [
        { key: 'safety' , title: 'Safety (Concerns, Good Catches, Work Arounds)' },
        { key: 'barriers', title: 'Barriers (Medkeeper, Dispense Prep, Equipment)' },
        { key: 'inventory', title: 'Inventory (Ingredients, Supplies)' },
        { key: 'wins', title: 'Team Wins & Recognition'},
        // { key: 'team_building', title: "Team Building"}
    ] as const,

    iconMap: {
        monthly_clean: SparklesIcon,
        tpn: CakeIcon,
        hazardous: ExclamationTriangleIcon,
        assignment_two: UserPlusIcon,
        sc: NumberedListIcon,
        training: UsersIcon,
        iv_support: UserGroupIcon,
        unique_work: WrenchIcon,
    },
    upsertFn: upsertIVRoom
}


export const orPharmacyConfig = {
    title: "OR Pharmacy",
    department: "ORP",
    cardFields: [
        { key: 'assignment_one', title: 'Asgmt 1' }, 
        { key: 'assignment_two', title: 'Asgmt 2' },
        { key: 'orft', title: 'ORFT' },
        { key: 'training', title: 'Training' },
        { key: 'support', title: 'Support/Shift Coverage' },
        { key: 'monthly_clean', title: 'Monthly Clean' },
    ] as const,

    textFields: [
        { key: 'safety' , title: 'Safety (Concerns, Good Catches, Work Arounds)' },
        { key: 'barriers', title: 'Barriers (Medkeeper, DP, Missing or Failing Equipment)' },
        { key: 'inventory', title: 'Inventory (Ingredients or supplies getting low)' },
        { key: 'wins', title: 'Team Wins & Recognition'},
    ] as const,

    iconMap: {
        assignment_one: BellIcon,
        assignment_two: BuildingOffice2Icon,
        orft: ShoppingCartIcon,
        training: UsersIcon,
        support: UserGroupIcon,
        monthly_clean: SparklesIcon,
    },
    upsertFn: upsertORPharmacy
}


export const teamEightConfig = {
    title: "Team 8",
    department: "T8",
    cardFields: [
        { key: 'eight_a', title: '8A' }, 
        { key: 'eight_b', title: '8B' },
        { key: 'iv_one', title: 'IV 1' },
        { key: 'iv_two', title: 'IV 2' },
    ] as const,

    textFields: [
        { key: 'safety' , title: 'Safety (Concerns, Good Catches, Work Arounds)' },
        { key: 'barriers', title: 'Barriers (Medkeeper, DP, Missing or Failing Equipment)' },
        { key: 'inventory', title: 'Inventory (Ingredients or supplies getting low)' },
        { key: 'wins', title: 'Team Wins & Recognition'},
    ] as const,

    iconMap: {
        eight_a: BellIcon,
        eight_b: BuildingOffice2Icon,
        iv_one: UserIcon,
        iv_two: UsersIcon,
    },
    upsertFn: upsertTeamEight
}