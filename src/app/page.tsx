import { redirect } from "next/navigation";
import { landingPath, requireProfile } from "@/lib/auth/session";
import { isSupabaseConfigured } from "@/lib/config";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  // Keep a usable first-run experience when the database has not been connected yet.
  if (!isSupabaseConfigured) redirect("/demo");

  const profile = await requireProfile();
  redirect(landingPath(profile.role));
}
