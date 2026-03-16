import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    // Return a dummy client during build/prerender when env vars aren't available
    return createBrowserClient(
      "https://placeholder.supabase.co",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.placeholder"
    );
  }

  // In demo mode, use the service role key to bypass RLS policies.
  // This is safe because demo mode only contains synthetic training data.
  const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === "true";
  const demoKey = process.env.NEXT_PUBLIC_SUPABASE_DEMO_KEY;
  const key = isDemoMode && demoKey ? demoKey : anonKey;

  return createBrowserClient(url, key);
}
