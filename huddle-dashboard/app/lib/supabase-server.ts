import { createClient } from "@supabase/supabase-js";
import { auth } from "@/auth"

export function getServiceSupabase() {
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
    );
}

export async function getCurrentUserId() {
    const session = await auth();

    if (!session?.user?.email) {
        throw new Error("Not Authenticated")
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

    const userId = userData?.id;

      if (!userId) {
    throw new Error("User not found in database");
  }

      return userId;
}