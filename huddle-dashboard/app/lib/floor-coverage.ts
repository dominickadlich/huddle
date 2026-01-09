// Auto-generated from CSV files
// Do not edit manually - run pnpm run parse-coverage to regenerate

export type Coverage = {
    team: string
    phone: string
    floors: string[]
    service?: string
    shift: 'weekday-day' | 'weekday-evening' | 'weekend'
}

export const floorCoverage: Coverage[] = [
  {
    "team": "Team 1A",
    "phone": "8-4035",
    "floors": [
      "PEDS-44",
      "PICU-44",
      "LDR-54"
    ],
    "service": "Pediatrics, PICU",
    "shift": "weekday-day"
  },
  {
    "team": "Team 1B",
    "phone": "8-5681",
    "floors": [
      "55 (NICU)",
      "56N"
    ],
    "service": "NICU – Red Team",
    "shift": "weekday-day"
  },
  {
    "team": "Team 1C",
    "phone": "5-9481",
    "floors": [
      "55 (NICU)",
      "56 (MB)"
    ],
    "service": "NICU – Blue Team",
    "shift": "weekday-day"
  },
  {
    "team": "Team 2A",
    "phone": "5-8781",
    "floors": [
      "New dofetilide/sotalol starts"
    ],
    "service": "Cardiology Service",
    "shift": "weekday-day"
  },
  {
    "team": "Team 2C",
    "phone": "8-8155",
    "floors": [
      "HC3-ICU"
    ],
    "service": "Cardiothor Surg-Cardiac/Thoracic (HC3-ICU)",
    "shift": "weekday-day"
  },
  {
    "team": "Team 2G",
    "phone": "4-3315",
    "floors": [
      "HC4/HC5/ HC9 off-service"
    ],
    "service": "Cardiothor Surg- Cardiac/Thoracic (HC4)",
    "shift": "weekday-day"
  },
  {
    "team": "Team 3A",
    "phone": "5-8253",
    "floors": [
      "46"
    ],
    "service": "Med 1, MPA",
    "shift": "weekday-day"
  },
  {
    "team": "Team 3B",
    "phone": "TBD",
    "floors": [
      "45"
    ],
    "service": "MPW, MPR",
    "shift": "weekday-day"
  },
  {
    "team": "Team 3C",
    "phone": "8-0930",
    "floors": [
      "66"
    ],
    "service": "Med 2, PH patients",
    "shift": "weekday-day"
  },
  {
    "team": "Team 3D",
    "phone": "5-9365",
    "floors": [
      "MPO Voalte Triage"
    ],
    "service": "Med 3, MPO",
    "shift": "weekday-day"
  },
  {
    "team": "Team 3F",
    "phone": "5-5058",
    "floors": [
      "BH15",
      "18"
    ],
    "service": "MPB, MPM, CF patients",
    "shift": "weekday-day"
  },
  {
    "team": "Team 3G",
    "phone": "--",
    "floors": [
      "42"
    ],
    "service": "MPE, MPS",
    "shift": "weekday-day"
  },
  {
    "team": "Team 3H",
    "phone": "5-8251",
    "floors": [
      "Med pts CA7"
    ],
    "service": "Stroke, Epilepsy, MPV",
    "shift": "weekday-day"
  },
  {
    "team": "Team 3I",
    "phone": "5-8881",
    "floors": [
      "Med pts CA6"
    ],
    "service": "Neurology, MPU",
    "shift": "weekday-day"
  },
  {
    "team": "Team 3J",
    "phone": "8-2920",
    "floors": [
      "41"
    ],
    "service": "MPC, MPX",
    "shift": "weekday-day"
  },
  {
    "team": "Team 3K",
    "phone": "5-9391",
    "floors": [
      "Med pts HC8"
    ],
    "service": "MPQ, FM2",
    "shift": "weekday-day"
  },
  {
    "team": "Team 3L",
    "phone": "5-9390",
    "floors": [
      "HC7"
    ],
    "service": "FM1, FM3",
    "shift": "weekday-day"
  },
  {
    "team": "Team 3M",
    "phone": "8-0948",
    "floors": [
      "64",
      "53 (non-surgical patients)"
    ],
    "service": "MPF, MPJ",
    "shift": "weekday-day"
  },
  {
    "team": "Team 3N",
    "phone": "--",
    "floors": [
      "62"
    ],
    "service": "MPY, MPG",
    "shift": "weekday-day"
  },
  {
    "team": "Team 4A",
    "phone": "8-2850",
    "floors": [
      "SIC (26/28)",
      "52 (off service)"
    ],
    "service": "Trauma, Burn",
    "shift": "weekday-day"
  },
  {
    "team": "Team 4B",
    "phone": "Unit 65 8-0800",
    "floors": [
      "MIC (65)"
    ],
    "service": "MICU 1, MICU 2",
    "shift": "weekday-day"
  },
  {
    "team": "Team 4C",
    "phone": "Unit 63 8-5950",
    "floors": [
      "TICU(63) & 61/63/65 off service"
    ],
    "service": "MICU 3",
    "shift": "weekday-day"
  },
  {
    "team": "Team 4D",
    "phone": "UnitCA8 ICU 4-4450",
    "floors": [
      "CA8 ICU",
      "CA8 ICU off-service"
    ],
    "service": "MICU 4",
    "shift": "weekday-day"
  },
  {
    "team": "Team 4F",
    "phone": "Unit CA5 4-4100",
    "floors": [
      "CA5 (NEICU)"
    ],
    "service": "Neuro Critical Care",
    "shift": "weekday-day"
  },
  {
    "team": "Team 5A",
    "phone": "UnitCA9 4-4566",
    "floors": [
      "CA9"
    ],
    "service": "Hematology",
    "shift": "weekday-day"
  },
  {
    "team": "Team 5B1",
    "phone": "--",
    "floors": [
      "CA10"
    ],
    "service": "Med-BMT Allo",
    "shift": "weekday-day"
  },
  {
    "team": "Team 5B2",
    "phone": "--",
    "floors": [
      "CA10"
    ],
    "service": "Med-Acute Leukemia",
    "shift": "weekday-day"
  },
  {
    "team": "Team 5B3",
    "phone": "--",
    "floors": [
      "CA9"
    ],
    "service": "Med-BMT and Cell Therapy",
    "shift": "weekday-day"
  },
  {
    "team": "Team 5C",
    "phone": "4-3628 (CA11 office)",
    "floors": [
      "HC8 (Gyn/GynONC)",
      "CA11 off-service"
    ],
    "service": "Oncology, GynOnc, ONC Consults",
    "shift": "weekday-day"
  },
  {
    "team": "Team 5F",
    "phone": "--",
    "floors": [
      "CA8 non-ICU",
      "CA11 CLN TRT"
    ],
    "service": "MPP, Heme consults",
    "shift": "weekday-day"
  },
  {
    "team": "Team 6A",
    "phone": "82826",
    "floors": [
      "BH43",
      "BH51",
      "BH53 (surgery)",
      "CA6 (surgery)",
      "CA7 (surgery)",
      "HC8 (surgery)",
      "BHPP (boarders)",
      "CAPP (boarders)"
    ],
    "service": "Surgery-Trauma (excluding Floor Trauma on 26/28), Surgery-Urology (non-ICU LOC)",
    "shift": "weekday-day"
  },
  {
    "team": "ED1",
    "phone": "8-6565",
    "floors": [
      "ED1/15C"
    ],
    "service": "--",
    "shift": "weekday-day"
  },
  {
    "team": "ORE",
    "phone": "8-4155",
    "floors": [
      "BHPP (non-boarders)",
      "BHIR",
      "BHOR (Before 9 am)"
    ],
    "service": "--",
    "shift": "weekday-day"
  },
  {
    "team": "ORL",
    "phone": "8-4155",
    "floors": [
      "BHPP (non-boarders)",
      "BHIR",
      "BHOR (after 9 am)"
    ],
    "service": "--",
    "shift": "weekday-day"
  },
  {
    "team": "Heart Center OR",
    "phone": "8-3812",
    "floors": [
      "HC2; New dofetilide/sotalol starts on non-cardiology teams"
    ],
    "service": "--",
    "shift": "weekday-day"
  },
  {
    "team": "COD",
    "phone": "4-3350",
    "floors": [
      "CAIR",
      "CAOR",
      "CAPP (non-boarders)"
    ],
    "service": "--",
    "shift": "weekday-day"
  },
  {
    "team": "PAC",
    "phone": "8-0496/8-4298",
    "floors": [
      "Preoperative Assessment Clinic"
    ],
    "service": "--",
    "shift": "weekday-day"
  },
  {
    "team": "Psych",
    "phone": "Marillac 4-3839",
    "floors": [
      "0800 - 1630"
    ],
    "service": "--",
    "shift": "weekday-day"
  },
  {
    "team": "Psych",
    "phone": "Strawberry Hill 4-3720",
    "floors": [
      "0800-1630"
    ],
    "service": "--",
    "shift": "weekday-day"
  },
  {
    "team": "RH",
    "phone": "4-1100",
    "floors": [
      "Rehab"
    ],
    "service": "Rehab Medicine, MPK",
    "shift": "weekday-day"
  },
  {
    "team": "ICC",
    "phone": "4-1843",
    "floors": [
      "IC3"
    ],
    "service": "Surg-Onc, Surg-Bariatric",
    "shift": "weekday-day"
  },
  {
    "team": "ID",
    "phone": "Voalte",
    "floors": [
      "See Voalte shift tag to identify which ID consult team this pharmacist is assigned to. In O2",
      "hover over picture of patient’s provider to see which ID consult team is seeing that patient."
    ],
    "service": "--",
    "shift": "weekday-day"
  },
  {
    "team": "ASP",
    "phone": "Voalte",
    "floors": [
      "Direct all curbside questions to the ASP pharmacist. Reviews BCID results and other ASP-specific initiatives."
    ],
    "service": "--",
    "shift": "weekday-day"
  },
  {
    "team": "TID",
    "phone": "Voalte",
    "floors": [
      "Rounds on a transplant-focused ID consult team (ID BMT1",
      "ID BMT2",
      "or ID SOT) and performs ASP-specific initiatives on these patients"
    ],
    "service": "--",
    "shift": "weekday-day"
  },
  {
    "team": "Team 1E",
    "phone": "8-4035 or 8-5681",
    "floors": [
      "PEDS-44",
      "PIC-44",
      "56MB",
      "LDR-54",
      "55(NICU)",
      "56(MB)",
      "56N"
    ],
    "shift": "weekday-evening"
  },
  {
    "team": "Team 2E",
    "phone": "8-3812",
    "floors": [
      "HCOR",
      "HC2",
      "HC3- ICU",
      "HC4",
      "HC5",
      "HC9-ICU",
      "Heart Transplant"
    ],
    "shift": "weekday-evening"
  },
  {
    "team": "Team 3EA",
    "phone": "--",
    "floors": [
      "BH15",
      "18",
      "41",
      "45",
      "46",
      "66",
      "Rehab"
    ],
    "shift": "weekday-evening"
  },
  {
    "team": "Team 3EB",
    "phone": "--",
    "floors": [
      "42",
      "53",
      "62",
      "64",
      "HC7",
      "CA6 Medicine pts"
    ],
    "shift": "weekday-evening"
  },
  {
    "team": "Team 4E",
    "phone": "--",
    "floors": [
      "SIC (26/28)",
      "52 (BBC",
      "BCI)",
      "MIC (65)",
      "63",
      "CA5",
      "CA8ICU",
      "IR",
      "51"
    ],
    "shift": "weekday-evening"
  },
  {
    "team": "Team 5E",
    "phone": "--",
    "floors": [
      "CA8",
      "CA9",
      "CA10",
      "CA11",
      "HC8"
    ],
    "shift": "weekday-evening"
  },
  {
    "team": "Team 6E",
    "phone": "4-3350",
    "floors": [
      "CAIR",
      "CAOR",
      "CAPP",
      "BH43",
      "CA6 Surg pts",
      "CA7",
      "ICC orders after 1800",
      "GB PTM support after 1700",
      "Bell OR after 1700"
    ],
    "shift": "weekday-evening"
  },
  {
    "team": "8EA",
    "phone": "--",
    "floors": [
      "Anything on main campus not covered by other shifts Psych after 1630 (Marillac + Strawberry Hill) GB orders after 1700"
    ],
    "shift": "weekday-evening"
  },
  {
    "team": "ED3",
    "phone": "Desk 8-6565",
    "floors": [
      "ED/15C"
    ],
    "shift": "weekday-evening"
  },
  {
    "team": "Psych",
    "phone": "Marillac 4-3839 Strawberry Hill 4-3720",
    "floors": [
      "0800-1630 0800-1630"
    ],
    "shift": "weekday-evening"
  },
  {
    "team": "Team 1A",
    "phone": "8-4035 or 8-5681",
    "floors": [
      "PEDS-44",
      "PIC-44",
      "LDR-54 55(NICU)",
      "56MB",
      "56N"
    ],
    "shift": "weekend"
  },
  {
    "team": "Team 2A",
    "phone": "--",
    "floors": [
      "Cardiology Service",
      "MPD",
      "MPQ",
      "MPR",
      "sotalol/dofetilide (re)starts"
    ],
    "shift": "weekend"
  },
  {
    "team": "Team 2B",
    "phone": "--",
    "floors": [
      "Cardiothor Surg-Cardiac/Thoracic",
      "Advanced HF",
      "index OHT and VAD",
      "(off-svc HC2 CVL PP",
      "HC3-ICU",
      "HC4",
      "HC5",
      "HC9-ICU); MPL"
    ],
    "shift": "weekend"
  },
  {
    "team": "Team 3A",
    "phone": "--",
    "floors": [
      "Med 1",
      "Med 3",
      "MPA",
      "MPF",
      "MPG",
      "MPJ",
      "MPY (45",
      "46",
      "62",
      "41)"
    ],
    "shift": "weekend"
  },
  {
    "team": "Team 3B",
    "phone": "--",
    "floors": [
      "Neurology",
      "Neuro-stroke",
      "Epilepsy",
      "Fam Med 1/3",
      "MPE",
      "MPV",
      "MPW",
      "MPX (HC7",
      "CA6",
      "CA7 (non-onc))"
    ],
    "shift": "weekend"
  },
  {
    "team": "Team 3C",
    "phone": "--",
    "floors": [
      "Fam Med 2",
      "Med 2",
      "MPB",
      "MPC",
      "MPK",
      "MPM (15",
      "18",
      "66",
      "42)",
      "Rehab *CPI monitors rehab & reviews w RPh"
    ],
    "shift": "weekend"
  },
  {
    "team": "Team 7W",
    "phone": "--",
    "floors": [
      "MPN",
      "MPT",
      "Surg Tx (53",
      "64)",
      "*clinical PTM warfarin support for GB"
    ],
    "shift": "weekend"
  },
  {
    "team": "Team 6W",
    "phone": "--",
    "floors": [
      "Surg-trauma (excluding Flour Trauma on 26/28)",
      "Burn (non-ICU LOC)",
      "Otolaryngology",
      "Surgery-Neuro (non-ICU LOC)",
      "Surg-urology",
      "Surg-ortho",
      "(Off svc – 43",
      "51",
      "52 (non-ICU LOC)",
      "ICC",
      "Boarders in Bell and Cambridge OR and periop locations; Clinic locations (MOB",
      "MPA",
      "MPB",
      "CVM BHG",
      "BHG SPN)"
    ],
    "shift": "weekend"
  },
  {
    "team": "Team 4A",
    "phone": "--",
    "floors": [
      "CA5 (Neuro ENT ICU)",
      "CA8ICU (MICU 4)",
      "Bell 26/28 (SICU)",
      "Bell 52 (Burn ICU)"
    ],
    "shift": "weekend"
  },
  {
    "team": "Team 4B",
    "phone": "--",
    "floors": [
      "MICU 1",
      "2",
      "3 (off-svc 61",
      "63",
      "65)"
    ],
    "shift": "weekend"
  },
  {
    "team": "Team 5A",
    "phone": "--",
    "floors": [
      "Hematology",
      "Oncology",
      "CA8",
      "CA11",
      "Onc cs"
    ],
    "shift": "weekend"
  },
  {
    "team": "Team 5B1",
    "phone": "--",
    "floors": [
      "Med-BMT Allo",
      "MPU",
      "HC8"
    ],
    "shift": "weekend"
  },
  {
    "team": "Team 5B2",
    "phone": "--",
    "floors": [
      "Med-Acute Leukemia",
      "MPP",
      "CA10"
    ],
    "shift": "weekend"
  },
  {
    "team": "Team 5B3",
    "phone": "--",
    "floors": [
      "Med-BMT and Cell Therapy",
      "MPS",
      "CA9",
      "Heme cs"
    ],
    "shift": "weekend"
  },
  {
    "team": "ED1, ED2",
    "phone": "8-6565",
    "floors": [
      "ED",
      "15c",
      "GB-ED"
    ],
    "shift": "weekend"
  },
  {
    "team": "Psych",
    "phone": "Strawberry Hill 4-3720",
    "floors": [
      "08:00 – 16:00 Strawberry Hill & Marillac (patient monitoring",
      "pharmacy operations and orders)"
    ],
    "shift": "weekend"
  },
  {
    "team": "Cancer Center Pharmacy",
    "phone": "8-7747",
    "floors": [
      "Cancer Center"
    ],
    "shift": "weekend"
  },
  {
    "team": "ASW",
    "phone": "Voalte",
    "floors": [
      "Direct all antimimcrobial-related curbside questions to the ASW pharmacist OV duties: GB non-ED pts 0700-1500; PTM abx for specific KC and GB teams 0700-1500; Team 4 pts 1000-1200 Full list of responsibilities listed here: ID ASP Team Shift Descriptions"
    ],
    "shift": "weekend"
  },
  {
    "team": "CAIV",
    "phone": "--",
    "floors": [
      "SurgOnc",
      "GynOnc",
      "Gyn on HC8 0730-1000",
      "inpatient hazardous compounds"
    ],
    "shift": "weekend"
  },
  {
    "team": "OE3",
    "phone": "--",
    "floors": [
      "SurgOnc",
      "GynOnc",
      "Gyn on HC8 1000-1800 All Bell/HC/R39/CA/GB/ICC orders; Strawberry Hill & Marillac orders after 1600"
    ],
    "shift": "weekend"
  },
  {
    "team": "OE1 / OE2",
    "phone": "--",
    "floors": [
      "All Bell/HC/R39/CA/GB/ICC orders; Strawberry Hill & Marillac orders after 1600"
    ],
    "shift": "weekend"
  }
]

// Helper function to find coverage by floor name
export function findCoverageByFloor(
    floorName: string,
    shift: Coverage['shift']
): Coverage[] {
    const searchTerm = floorName.toUpperCase().trim()

    return floorCoverage.filter(coverage =>
        coverage.shift === shift &&
        coverage.floors.some(floor =>
            floor.toUpperCase().includes(searchTerm) ||
            searchTerm.includes(floor.toUpperCase())
        )
    )
}
