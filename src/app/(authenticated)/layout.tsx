"use client";

import { DemoBanner } from "@/components/layout/DemoBanner";
import { Sidebar } from "@/components/layout/Sidebar";
import { MobileNav } from "@/components/layout/MobileNav";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DemoBanner />
      <Sidebar />
      <main className="min-h-screen pb-20 lg:pl-60 lg:pb-0">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
      <MobileNav />
    </>
  );
}
