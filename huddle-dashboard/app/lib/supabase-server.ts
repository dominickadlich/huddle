import { createClient } from "@supabase/supabase-js";
import { auth } from "../auth.config";

export function getServiceSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}

export async function getCurrentUserId() {
  const session = await auth();

  if (!session?.user?.email) {
    throw new Error("Not Authenticated");
  }

  const supabase = getServiceSupabase();

  const { data: userData, error: userError } = await supabase
    .from("users")
    .select("id")
    .eq("email", session.user.email)
    .single();

  if (userError && userError.code !== "PGRST116") {
    throw userError;
  }

  let userId = userData?.id;

  if (!userId) {
    const { data: newUser, error: createError } = await supabase
      .from("users")
      .insert({
        email: session.user.email,
        name: session.user.name,
      })
      .select("id")
      .single();

    if (createError) throw createError;
    userId = newUser.id;
  }

  return userId;
}
