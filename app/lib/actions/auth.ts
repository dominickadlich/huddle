"use server";

import { supabaseAdmin } from "../supabase/admin";

export type OIDCUserProfile = {
  sub: string;
  email: string;
  name?: string;
  given_name?: string;
  family_name?: string;
};

export async function upsertUser(userData: OIDCUserProfile) {
  try {
    const { sub, email, name, given_name, family_name } = userData;

    const user = {
      id: sub,
      email,
      full_name: name || "",
      first_name: given_name || "",
      last_name: family_name || "",
      last_sign_in: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabaseAdmin.from("users").upsert(user, {
      onConflict: "id",
      ignoreDuplicates: false,
    });

    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Failed to upsert user:", error);
    return false;
  }
}
