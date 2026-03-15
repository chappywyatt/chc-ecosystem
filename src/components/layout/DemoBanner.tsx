"use client";

export function DemoBanner() {
  const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === "true";

  if (!isDemoMode) return null;

  return (
    <div className="sticky top-0 z-50 flex h-8 items-center justify-center bg-gold text-xs font-semibold text-navy">
      DEMONSTRATION MODE — Sample Data — Not for Official Use
    </div>
  );
}
