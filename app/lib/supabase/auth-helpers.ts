import { auth } from "@/auth";
import { createClient } from "./server";


// ============================================
// HELPER: Get authenticated client
// ============================================

export async function getAuthenticatedClient() {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Authentication required");
  }
  
  const supabase = await createClient();
  return { supabase, userId: session.user.id };
}