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
  // opportunities: {
  //   body: string;
  //   date: Date;
  //   title: string;
  //   priority: "low" | "medium" | "high";
  // }[];
};

export type ExtensionField = {
  name: string;
  extension: string;
  hours: string;
};

export type ExtensionForm = {
  id: string;
  name: string;
  extension: string;
  hours: string;
};

export type HuddleDataForm = {
  id: string;
  census: string;
  tpn_count: string;
  haz_count: string;
  non_sterile_count: string;
  restock: string;
  cs_queue: string;
  staffing: string;
  complex_preps_count: string;
  missed_dispense_check: string;
  missed_dispense_prep: string;
  safety_morning: string;
  inventory_morning: string;
  go_lives_morning: string;
  barriers_morning: string;
  pass_off_morning: string;
  unresolved_issues_morning: string;
  opportunities_morning: string;
  shout_outs_morning: string;
  safety_noon: string;
  inventory_noon: string;
  go_lives_noon: string;
  barriers_noon: string;
  pass_off_noon: string;
  unresolved_issues_noon: string;
  opportunities_noon: string;
  shout_outs_noon: string;
  safety_night: string;
  inventory_night: string;
  go_lives_night: string;
  barriers_night: string;
  pass_off_night: string;
  unresolved_issues_night: string;
  opportunities_night: string;
  shout_outs_night: string;
};
