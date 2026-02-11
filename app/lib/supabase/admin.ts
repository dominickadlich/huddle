import { createClient } from "@supabase/supabase-js";

// ⚠️ ADMIN CLIENT - Use ONLY for operations that MUST bypass RLS
// Examples: upsertUser during auth, system-level operations
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!, // God Mode
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  },
);
