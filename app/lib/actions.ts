"use server";

// const d_day = "I'm having a baby" // Baby Violet's first commit.

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn, auth } from "@/auth";
import { AuthError } from "next-auth";
import { parseHuddleFormData } from "./form-helpers";
import { OIDCUserProfile } from "./definitions";
import { createClient } from "@supabase/supabase-js";


const supabase =  createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );


async function getCurrentUserId() {
  const session = await auth();
  
  if (!session?.user?.id) {
    throw new Error("Not authenticated");
  }
  
  return session.user.id;
}


const FormSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Please select a name."),
  extension: z.string().min(1, "Please enter an extension."),
  hours: z.string().min(1, "Please enter available hours"),
  created_at: z.string(),
});

const HuddleFormSchema = z.object({
  id: z.string(),
  created_at: z.string(),
  census: z.number().min(0, "Please enter the census count."),
  tpn_count: z.number().min(0, "Please enter a TPN count."),
  haz_count: z.number().min(0, "Please enter the hazardous count."),
  non_sterile_count: z.number().min(0, "Please enter a non-sterile count."),
  restock: z.boolean(),
  cs_queue: z.boolean(),
  staffing: z.string().min(0, "Please select a staffing status."),
  complex_preps_count: z
    .number()
    .min(0, "Please enter the number of complex preps."),
  missed_dispense_prep: z
    .number()
    .min(0, "Please enter missed dispense preps."),
  missed_dispense_check: z
    .number()
    .min(0, "Please enter missed dispense checks."),
  safety_morning: z.string(),
  inventory_morning: z.string(),
  go_lives_morning: z.string(),
  barriers_morning: z.string(),
  pass_off_morning: z.string(),
  unresolved_issues_morning: z.string(),
  opportunities_morning: z.string(),
  shout_outs_morning: z.string(),
  safety_noon: z.string(),
  inventory_noon: z.string(),
  go_lives_noon: z.string(),
  barriers_noon: z.string(),
  pass_off_noon: z.string(),
  unresolved_issues_noon: z.string(),
  opportunities_noon: z.string(),
  shout_outs_noon: z.string(),
  safety_night: z.string(),
  inventory_night: z.string(),
  go_lives_night: z.string(),
  barriers_night: z.string(),
  pass_off_night: z.string(),
  unresolved_issues_night: z.string(),
  opportunities_night: z.string(),
  shout_outs_night: z.string(),
});

const CreateHuddleReportSchema = HuddleFormSchema.omit({
  id: true,
  created_at: true,
});

const UpdateHuddleReportSchema = HuddleFormSchema.omit({
  id: true,
  created_at: true,
});


export type HuddleState = {
  errors?: {
    census?: string[];
    tpn_count?: string[];
    haz_count?: string[];
    non_sterile_count?: string[];
    restock?: string[];
    cs_queue?: string[];
    staffing?: string[];
    complex_preps_count?: string[];
    missed_dispense_prep?: string[];
    missed_dispense_check?: string[];
    safety_morning?: string[];
    inventory_morning?: string[];
    go_lives_morning?: string[];
    barriers_morning?: string[];
    pass_off_morning?: string[];
    unresolved_issues_morning?: string[];
    opportunities_morning?: string[];
    shout_outs_morning?: string[];
    safety_noon?: string[];
    inventory_noon?: string[];
    go_lives_noon?: string[];
    barriers_noon?: string[];
    pass_off_noon?: string[];
    unresolved_issues_noon?: string[];
    opportunities_noon?: string[];
    shout_outs_noon?: string[];
    safety_night?: string[];
    inventory_night?: string[];
    go_lives_night?: string[];
    barriers_night?: string[];
    pass_off_night?: string[];
    unresolved_issues_night?: string[];
    opportunities_night?: string[];
    shout_outs_night?: string[];
  };
  message?: string | null;
};

// Create Huddle Report
export async function createHuddleReport(
  prevState: HuddleState,
  formData: FormData,
) {
  const parsedData = parseHuddleFormData(formData);
  const validatedFields = CreateHuddleReportSchema.safeParse(parsedData);

  const session = await auth();

  if (!session?.user) {
    return { message: "Authentication required" };
  }

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to create huddle report",
    };
  }

  // Prepare data for insertion into the database
  const {
    census,
    tpn_count,
    haz_count,
    non_sterile_count,
    restock,
    cs_queue,
    staffing,
    complex_preps_count,
    missed_dispense_check,
    missed_dispense_prep,
    safety_morning,
    inventory_morning,
    go_lives_morning,
    barriers_morning,
    pass_off_morning,
    unresolved_issues_morning,
    opportunities_morning,
    shout_outs_morning,
    safety_noon,
    inventory_noon,
    go_lives_noon,
    barriers_noon,
    pass_off_noon,
    unresolved_issues_noon,
    opportunities_noon,
    shout_outs_noon,
    safety_night,
    inventory_night,
    go_lives_night,
    barriers_night,
    pass_off_night,
    unresolved_issues_night,
    opportunities_night,
    shout_outs_night,
  } = validatedFields.data;

  const currentDate = new Date().toISOString();

  try {
    const userId = await getCurrentUserId();

    const { error } = await supabase.from("huddle_data").insert([
      {
        date: currentDate,
        user_id: userId,
        census,
        tpn_count,
        haz_count,
        non_sterile_count,
        restock,
        cs_queue,
        missed_dispense_check,
        missed_dispense_prep,
        staffing,
        complex_preps_count,
        safety_morning,
        inventory_morning,
        go_lives_morning,
        barriers_morning,
        pass_off_morning,
        unresolved_issues_morning,
        opportunities_morning,
        shout_outs_morning,
        safety_noon,
        inventory_noon,
        go_lives_noon,
        barriers_noon,
        pass_off_noon,
        unresolved_issues_noon,
        opportunities_noon,
        shout_outs_noon,
        safety_night,
        inventory_night,
        go_lives_night,
        barriers_night,
        pass_off_night,
        unresolved_issues_night,
        opportunities_night,
        shout_outs_night,
      },
    ]);

    if (error) throw error;
  } catch (error) {
    console.log("Database Error:", error);
    if (error instanceof Error) {
      if (
        error.message === "Not authenticated" ||
        error.message === "User not found in database"
      ) {
        return { message: "Authentication required. Please log in." };
      }
    }

    return { message: "Failed to create a huddle report." };
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
}



export async function updateHuddleReport(
  id: string,
  prevState: HuddleState,
  formData: FormData,
) {
  const session = await auth();

  if (!session?.user) {
    return { message: "Authentication required" };
  }

  const parsedData = parseHuddleFormData(formData);
  const validatedFields = UpdateHuddleReportSchema.safeParse(parsedData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to update huddle report",
    };
  }

  const updateData = validatedFields.data;

  try {
    await getCurrentUserId();

    const { error } = await supabase
      .from("huddle_data")
      .update(updateData)
      .eq("id", id);

    if (error) throw error;
  } catch (error) {
    console.log("Database Error:", error);
    if (error instanceof Error) {
      if (
        error.message === "Not authenticated" ||
        error.message === "User not found in database"
      ) {
        return { message: "Authentication required. Please log in." };
      }
    }

    return { message: "Failed to create a huddle report." };
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
}



export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  console.log("Authenticate function called");

  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}