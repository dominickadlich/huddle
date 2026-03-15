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
    ] as const,
    textFields: [
        { key: 'safety' , title: 'Safety (Concerns, Good Catches, Work Arounds)' },
        { key: 'barriers', title: 'Barriers (Missing or Failing Equipment, Supplies, etc.)' },
        { key: 'wins', title: 'Team Wins & Recognition'},
    ] as const,
    iconMap: {
        hot_spots: FireIcon,
        ca_tpn: CakeIcon,
        hc_tpn: HeartIcon,
        workload_csr: LockClosedIcon,
        workload_cmd: ClipboardDocumentCheckIcon,
    },
    upsertFn: upsertCommandCenter
}

export const distributionConfig = {
    title: "Distribution",
    cardFields: [
        { key: 'hot_spots', title: 'Hot Spots' },
        { key: 'ca_tpn', title: 'CA TPNs' },
        { key: 'hc_tpn', title: 'HC TPNs' },
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
    },
    upsertFn: upsertDistribution
}

export const ivRoomConfig = {
    title: "IV Room",
    cardFields: [
        { key: 'opportunities', title: 'Bladder Instills' }, // CHANGE IN DATABASE
        { key: 'tpn', title: 'TPN + Batch' },
        { key: 'hazardous', title: 'Haz' },
        { key: 'sc', title: 'SC' },
        { key: 'assignment_two', title: 'Asgmt 2' },
        { key: 'training', title: 'Training' },
        { key: 'iv_support', title: 'IV Support' },
        { key: 'bell_iv', title: 'Monthly Clean' }, // CHANGE IN DATABASE
    ] as const,

    textFields: [
        { key: 'safety' , title: 'Safety (Concerns, Good Catches, Work Arounds)' },
        { key: 'barriers', title: 'Barriers (Medkeeper, DP, Missing or Failing Equipment)' },
        { key: 'inventory', title: 'Inventory' },
        { key: 'wins', title: 'Team Wins & Recognition'},
    ] as const,

    iconMap: {
        bell_iv: SparklesIcon,
        tpn: CakeIcon,
        hazardous: ExclamationTriangleIcon,
        assignment_two: UserPlusIcon,
        sc: NumberedListIcon,
        training: UsersIcon,
        iv_support: UserGroupIcon,
        opportunities: FunnelIcon,
    },
    upsertFn: upsertIVRoom
}