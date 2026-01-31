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

    // Morning
    safety_morning: formData.get("safety_morning") || "",
    inventory_morning: formData.get("inventory_morning") || "",
    go_lives_morning: formData.get("go_lives_morning") || "",
    barriers_morning: formData.get("barriers_morning") || "",
    pass_off_morning: formData.get("pass_off_morning") || "",
    unresolved_issues_morning: formData.get("unresolved_issues_morning") || "",
    opportunities_morning: formData.get("opportunities_morning") || "",
    shout_outs_morning: formData.get("shout_outs_morning") || "",

    // Noon
    safety_noon: formData.get("safety_noon") || "",
    inventory_noon: formData.get("inventory_noon") || "",
    go_lives_noon: formData.get("go_lives_noon") || "",
    barriers_noon: formData.get("barriers_noon") || "",
    pass_off_noon: formData.get("pass_off_noon") || "",
    unresolved_issues_noon: formData.get("unresolved_issues_noon") || "",
    opportunities_noon: formData.get("opportunities_noon") || "",
    shout_outs_noon: formData.get("shout_outs_noon") || "",

    // Night
    safety_night: formData.get("safety_night") || "",
    inventory_night: formData.get("inventory_night") || "",
    go_lives_night: formData.get("go_lives_night") || "",
    barriers_night: formData.get("barriers_night") || "",
    pass_off_night: formData.get("pass_off_night") || "",
    unresolved_issues_night: formData.get("unresolved_issues_night") || "",
    opportunities_night: formData.get("opportunities_night") || "",
    shout_outs_night: formData.get("shout_outs_night") || "",
  };
}
