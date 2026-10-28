import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const email = process.env.INITIAL_ADMIN_EMAIL;
const password = process.env.INITIAL_ADMIN_PASSWORD;
const displayName = process.env.INITIAL_ADMIN_NAME;

if (!url || !serviceRoleKey || !email || !password || !displayName) {
  throw new Error(
    "Missing required values. Set NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, INITIAL_ADMIN_EMAIL, INITIAL_ADMIN_PASSWORD, and INITIAL_ADMIN_NAME in .env.local.",
  );
}

if (password.length < 10) {
  throw new Error("INITIAL_ADMIN_PASSWORD must be at least 10 characters.");
}

const supabase = createClient(url, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const { data: existingAdmins, error: existingAdminsError } = await supabase
  .from("profiles")
  .select("user_id")
  .eq("role", "admin")
  .limit(1);

if (existingAdminsError) throw existingAdminsError;
if ((existingAdmins ?? []).length > 0) {
  throw new Error("An admin profile already exists. This bootstrap command can only run once.");
}

const { data: authData, error: authError } = await supabase.auth.admin.createUser({
  email: email.trim().toLowerCase(),
  password,
  email_confirm: true,
});

if (authError || !authData.user) throw authError ?? new Error("Unable to create the admin auth account.");

const { error: profileError } = await supabase.from("profiles").insert({
  user_id: authData.user.id,
  display_name: displayName.trim(),
  role: "admin",
  active: true,
});

if (profileError) {
  await supabase.auth.admin.deleteUser(authData.user.id);
  throw profileError;
}

await supabase.from("audit_log").insert({
  actor_id: authData.user.id,
  action: "initial_admin_created",
  entity_type: "profile",
  entity_id: authData.user.id,
  after_data: { display_name: displayName.trim(), email: email.trim().toLowerCase(), role: "admin" },
});

console.log("Initial admin account created successfully.");
