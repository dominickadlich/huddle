// Reusable function to parse FormData for huddle reports
export function parseHuddleFormData(formData: FormData) {
  return {
    census: Number(formData.get("census")),
    tpn_count: Number(formData.get("tpn_count")),
    haz_count: Number(formData.get("haz_count")),
    non_sterile_count: Number(formData.get("non_sterile_count")),
    restock:
      formData.get("restock") === "on" || formData.get("restock") === "true",
    cs_queue:
      formData.get("cs_queue") === "on" || formData.get("cs_queue") === "true",
    staffing: formData.get("staffing") || "",
    complex_preps_count: Number(formData.get("complex_preps_count")),
    missed_dispense_prep: Number(formData.get("missed_dispense_prep")),
    missed_dispense_check: Number(formData.get("missed_dispense_check")),
    safety: formData.get("safety") || "",
    
    inventory: formData.get("inventory") || "",
    go_lives: formData.get("go_lives") || "",
    barriers: formData.get("barriers") || "",
    pass_off: formData.get("pass_off") || "",
    unresolved_issues: formData.get("unresolved_issues") || "",
    opportunities: formData.get("opportunities") || "",
    shout_outs: formData.get("shout_outs") || "",

    // Morning
    // inventory_morning: formData.get("inventory") || "",
    // go_lives_morning: formData.get("go_lives") || "",
    // barriers_morning: formData.get("barriers") || "",
    // pass_off_morning: formData.get("pass_off") || "",
    // unresolved_issues_morning: formData.get("unresolved_issues") || "",
    // opportunities_morning: formData.get("opportunities") || "",
    // shout_outs_morning: formData.get("shout_outs") || "",

    // Noon
    // inventory_noon: formData.get("inventory") || "",
    // go_lives_noon: formData.get("go_lives") || "",
    // barriers_noon: formData.get("barriers") || "",
    // pass_off_noon: formData.get("pass_off") || "",
    // unresolved_issues_noon: formData.get("unresolved_issues") || "",
    // opportunities_noon: formData.get("opportunities") || "",
    // shout_outs_noon: formData.get("shout_outs") || "",

    // Night
    // inventory_night: formData.get("inventory") || "",
    // go_lives_night: formData.get("go_lives") || "",
    // barriers_night: formData.get("barriers") || "",
    // pass_off_night: formData.get("pass_off") || "",
    // unresolved_issues_night: formData.get("unresolved_issues") || "",
    // opportunities_night: formData.get("opportunities") || "",
    // shout_outs_night: formData.get("shout_outs") || "",
  };
}
