import { auth } from "@/auth";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export async function fetchHuddleData() {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Authentication required");
  }

  try {
    const { data, error } = await supabase
      .from("huddle_data")
      .select("*")
      .order("date", { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch huddle data.");
  }
}

export async function fetchLatestHuddleData() {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Authentication required");
  }

  try {
    console.log("Attempting to fetch data...");

    const { data, error } = await supabase
      .from("huddle_data")
      .select("*")
      .order("date", { ascending: false })
      .limit(1)
      .single();

    console.log("Raw data from Supabase:", data);
    console.log("Any error:", error);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch latest huddle data.");
  }
}

export async function fetchHuddleDataById(id: string) {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Authentication required");
  }

  try {
    const { data, error } = await supabase
      .from("huddle_data")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        // No rows found
        return null;
      }
      throw error;
    }

    return data;
  } catch (error) {
    console.log("Database Error:", error);
    return { message: "Failed to fetch huddle report with url id" };
  }
}
