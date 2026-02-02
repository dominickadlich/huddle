"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { createClient } from "../supabase/server";

// Zod schemas
const CreateHuddleSchema = z.object({
  date: z.string(),
  shift: z.enum(['morning', 'afternoon', 'evening']),
  department: z.enum(['CSR', 'IVR', 'Cambridge', 'Operations']),
  daily_summary_id: z.string().uuid(),
});

export type HuddleState = {
  errors?: {
    date?: string[];
    shift?: string[];
    department?: string[];
  };
  message?: string | null;
};

export async function createHuddle(
  prevState: HuddleState,
  formData: FormData
) {
  const session = await auth();
  if (!session?.user?.id) {
    return { message: "Authentication required" };
  }

  const validatedFields = CreateHuddleSchema.safeParse({
    date: formData.get('date'),
    shift: formData.get('shift'),
    department: formData.get('department'),
    daily_summary_id: formData.get('daily_summary_id'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing fields. Failed to create huddle.",
    };
  }

  const { date, shift, department, daily_summary_id } = validatedFields.data;

  try {
    // Creates client with ANON key - respects RLS!
    const supabase = await createClient();

    const { error } = await supabase
      .from('huddles')
      .insert({
        date,
        shift,
        department,
        daily_summary_id,
        created_by: session.user.id,  // This will be checked by RLS
      });

    if (error) throw error;
  } catch (error) {
    console.error("Database Error:", error);
    return { message: "Failed to create huddle." };
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
}