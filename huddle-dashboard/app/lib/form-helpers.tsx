import { z } from "zod";

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
  };
}

// Reusable validation error handler
export function handleValidationError<T>(
  result: z.SafeParseReturnType<T, T>,
  errorMessage: string,
) {
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
      message: errorMessage,
    };
  }
  return null;
}