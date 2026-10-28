import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase/types";

/**
 * Server-only Supabase client for tightly controlled admin workflows.
 * Never import this module from a Client Component or expose its key as NEXT_PUBLIC_*.
 */
export function createAdminSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error("إعداد إنشاء الحسابات غير مكتمل: أضف SUPABASE_SERVICE_ROLE_KEY إلى .env.local على الخادم فقط.");
  }

  return createClient<Database>(url, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
