// Force all authenticated pages to render dynamically (not at build time).
// This prevents Supabase client errors during static prerendering on Vercel.
export const dynamic = "force-dynamic";

export default function AuthenticatedTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
