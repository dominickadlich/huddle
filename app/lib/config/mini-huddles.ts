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
    UserGroupIcon,
    FunnelIcon,
    EyeDropperIcon,
    CheckCircleIcon,
    DocumentCheckIcon,
} from "@heroicons/react/24/outline";
import { upsertCommandCenter } from "../actions/command-center";
import { upsertDistribution } from "../actions/distribution";
import { upsertIVRoom } from "../actions/iv-room";


export const commandCenterConfig = {
    title: "Command Center",
    cardFields: [
        { key: 'hot_spots', title: 'Hot Spots' },
        { key: 'ca_tpn', title: 'CA TPNs' },
        { key: 'hc_tpn', title: 'HC TPNs' },
        { key: 'workload_csr', title: 'Workload CSR' },
        { key: 'workload_cmd', title: 'Workload CMD' },
        { key: 'five_oh_three_b', title: '503b' },
        { key: "dispense_prep", title: "Dispense Prep" },
        { key: "dispense_check", title: "Dispense Check" },
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
        five_oh_three_b: EyeDropperIcon,
        dispense_prep: DocumentCheckIcon,
        dispense_check: CheckCircleIcon,
    },
    upsertFn: upsertCommandCenter
}

export const distributionConfig = {
    title: "Distribution",
    cardFields: [
        { key: 'hot_spots', title: 'Hot Spots' },
        { key: 'ca_tpn', title: 'CA TPNs' },
        { key: 'hc_tpn', title: 'HC TPNs' },
        { key: 'five_oh_three_b', title: '503b' },
    ] as const,

    textFields: [
        { key: 'safety' , title: 'Safety (Concerns, Good Catches, Work Arounds)' },
        { key: 'barriers', title: 'Barriers (Missing or Failing Equipment, Supplies, etc.)' },
        { key: 'opportunities', title: 'Inventory'}, // Change in Datatbase!
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
    title: "IV Room",
    cardFields: [
        { key: 'bladder_instills', title: 'Bladder Instills' }, 
        { key: 'tpn', title: 'TPN + Batch' },
        { key: 'hazardous', title: 'Haz' },
        { key: 'sc', title: 'SC' },
        { key: 'assignment_two', title: 'Asgmt 2' },
        { key: 'training', title: 'Training' },
        { key: 'iv_support', title: 'IV Support' },
        { key: 'monthly_clean', title: 'Monthly Clean' },
    ] as const,

    textFields: [
        { key: 'safety' , title: 'Safety (Concerns, Good Catches, Work Arounds)' },
        { key: 'barriers', title: 'Barriers (Medkeeper, DP, Missing or Failing Equipment)' },
        { key: 'inventory', title: 'Inventory (Ingredients or supplies getting low)' },
        { key: 'wins', title: 'Team Wins & Recognition'},
    ] as const,

    iconMap: {
        monthly_clean: SparklesIcon,
        tpn: CakeIcon,
        hazardous: ExclamationTriangleIcon,
        assignment_two: UserPlusIcon,
        sc: NumberedListIcon,
        training: UsersIcon,
        iv_support: UserGroupIcon,
        bladder_instills: FunnelIcon,
    },
    upsertFn: upsertIVRoom
}