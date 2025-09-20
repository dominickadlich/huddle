export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type CensusData = {
  census: number;
  date: string;
};

export type OpportunityData = {
  date: string;
  title: string;
  body: string;
  priority: string;
};

export type HuddleData = {
  id: string;
  date: Date;
  census: number;
  tpn_count: number;
  haz_count: number;
  non_sterile_count: number;
  opportunities: {
    body: string;
    date: Date;
    title: string;
    priority: "low" | "medium" | "high";
  }[];
};

export type ExtensionField = {
  name: string;
  extension: string;
};

export type ExtensionForm = {
  id: string;
  name: string;
  extension: string;
};

export type HuddleDataForm = {
  id: string,
  census: string;
  tpn_count: string;
  haz_count: string;
  non_sterile_count: string;
  restock: string;
  cs_queue: string;
  staffing: string;
  complex_preps_count: string;
  missed_dispense_check: string,
  missed_dispense_prep: string,
  safety: string;
  inventory: string;
  go_lives: string;
  barriers: string;
  pass_off: string;
  unresolved_issues: string;
  opportunities: string;
  shout_outs: string;
}