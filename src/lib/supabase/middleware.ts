import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Refresh the auth token on every request
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === "true";
  const isLoginPage = request.nextUrl.pathname === "/login";
  const isPublicPath =
    request.nextUrl.pathname.startsWith("/compass/respond/") ||
    request.nextUrl.pathname.startsWith("/api/");

  // Allow public paths without auth
  if (isPublicPath) {
    return supabaseResponse;
  }

  // If not logged in and not in demo mode, redirect to login
  if (!user && !isDemoMode && !isLoginPage) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
