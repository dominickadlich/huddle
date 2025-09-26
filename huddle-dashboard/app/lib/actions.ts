"use server";

// const d_day = "I'm having a baby" // Baby Violet's first commit.

import { date, number, string, z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { auth } from "@/auth";
import { parseHuddleFormData } from "./form-helpers";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

const FormSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Please select a name."),
  extension: z.string().min(1, "Please enter an extension."),
  created_at: z.string(),
});

const CreateExtension = FormSchema.omit({ id: true, created_at: true });
const UpdateExtension = FormSchema.omit({ id: true, created_at: true });

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
  safety: z.string(),
  inventory: z.string(),
  go_lives: z.string(),
  barriers: z.string(),
  pass_off: z.string(),
  unresolved_issues: z.string(),
  opportunities: z.string(),
  shout_outs: z.string(),
});

const CreateHuddleReportSchema = HuddleFormSchema.omit({
  id: true,
  created_at: true,
});

const UpdateHuddleReportSchema = HuddleFormSchema.omit({
  id: true,
  created_at: true,
});

export type State = {
  errors?: {
    name?: string[];
    extension?: string[];
  };
  message?: string | null;
};

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
    safety?: string[];
    inventory?: string[];
    go_lives?: string[];
    barriers?: string[];
    pass_off?: string[];
    unresolved_issues?: string[];
    opportunities?: string[];
    shout_outs?: string[];
  };
  message?: string | null;
};

export async function createHuddleReport(
  prevState: HuddleState,
  formData: FormData,
) {
  const session = await auth();

  if (!session?.user) {
    return { message: "Authentication required" };
  }

  console.log("Authenticated user:", session?.user);

  const parsedData = parseHuddleFormData(formData);
  const validatedFields = CreateHuddleReportSchema.safeParse(parsedData);

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
    safety,
    inventory,
    go_lives,
    barriers,
    pass_off,
    unresolved_issues,
    opportunities,
    shout_outs,
  } = validatedFields.data;

  const currentDate = new Date().toISOString();

  try {
    const { error } = await supabase.from("huddle_data").insert([
      {
        date: currentDate,
        user_id: session?.user?.id,
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
        safety,
        inventory,
        go_lives,
        barriers,
        pass_off,
        unresolved_issues,
        opportunities,
        shout_outs,
      },
    ]);

    if (error) throw error;
  } catch (error) {
    console.log("Database Error:", error);
    return { message: "Missing Fields. Failed to create a huddle report." };
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
    const { error } = await supabase
      .from("huddle_data")
      .update(updateData)
      .eq("id", id);

    if (error) throw error;
  } catch (error) {
    console.log("Database Error:", error);
    return { message: "Failed to update Huddle Report" };
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
}

export async function updateExtension(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = UpdateExtension.safeParse({
    name: formData.get("name"),
    extension: formData.get("extension"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to update extension",
    };
  }

  const { name, extension } = validatedFields.data;

  try {
    const { data, error } = await supabase
      .from("central_directory")
      .update({
        name: name,
        extension: extension,
      })
      .eq("id", id);

    if (error) throw error;
  } catch (error) {
    console.error("Database Error:", error);
    return { message: "Failed to update extension" };
  }

  revalidatePath("/directory");
  redirect("/directory");
}

export async function createExtension(prevState: State, formData: FormData) {
  const validatedFields = CreateExtension.safeParse({
    name: formData.get("name"),
    extension: formData.get("extension"),
  });

  // If form validation fails, return errors early. Otherwise, continue
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to create extension.",
    };
  }

  // Prepare data for insertion into the database
  const { name, extension } = validatedFields.data;
  const created_at = new Date().toISOString().split("T")[0];

  try {
    const { data, error } = await supabase.from("central_directory").insert([
      {
        name: name,
        extension: extension,
        created_at: created_at,
      },
    ]);

    if (error) throw error;
  } catch (error) {
    console.error("Database Error:", error);
    return { message: "Database Error: Failed to create extension." };
  }

  revalidatePath("/directory");
  redirect("/directory");
}

export async function deleteExtension(id: string) {
  // throw new Error('Failed to Delete Extension')

  try {
    const { data, error } = await supabase
      .from("central_directory")
      .delete()
      .eq("id", id);

    if (error) throw error;

    revalidatePath("/dashboard/directory");
    // return { message: 'Extension deleted successfully!' }
  } catch (error) {
    console.error("Database Error:", error);
    // return { message: 'Database Error: Failed to delete extension' };
    throw new Error("Failed to delete extension");
  }
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
