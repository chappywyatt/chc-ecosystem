"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { SkeletonCard } from "@/components/ui/Skeleton";
import { useCompass, type CompassCycle } from "@/hooks/useCompass";
import { Compass, Plus } from "lucide-react";

const statusColors: Record<string, "fluent" | "gold" | "green" | "gray"> = {
  open: "fluent",
  collecting: "gold",
  closed: "green",
  reviewed: "gray",
};

export default function CompassDashboardPage() {
  const { fetchCycles } = useCompass();
  const [cycles, setCycles] = useState<CompassCycle[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const data = await fetchCycles();
      if (!cancelled) { setCycles(data); setLoaded(true); }
    }
    load();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const active = cycles.filter((c) => c.status !== "reviewed");

  if (!loaded) {
    return (
      <>
        <Breadcrumbs />
        <PageHeader title="C³ Compass 360°" />
        <div className="grid gap-4 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      </>
    );
  }

  return (
    <>
      <Breadcrumbs />
      <PageHeader
        title="C³ Compass 360°"
        subtitle="Anonymous 360° feedback across 18 Character, Competence, and Connection qualities"
        actions={
          <Link href="/compass/cycles/new">
            <Button>
              <Plus size={16} />
              Initiate Assessment
            </Button>
          </Link>
        }
      />

      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <Card>
          <div className="text-sm font-medium text-text-secondary">Total Cycles</div>
          <div className="mt-1 text-3xl font-semibold text-navy">{cycles.length}</div>
        </Card>
        <Card>
          <div className="text-sm font-medium text-text-secondary">Active</div>
          <div className="mt-1 text-3xl font-semibold text-navy">{active.length}</div>
        </Card>
        <Card>
          <div className="text-sm font-medium text-text-secondary">Completed</div>
          <div className="mt-1 text-3xl font-semibold text-navy">
            {cycles.filter((c) => c.status === "reviewed").length}
          </div>
        </Card>
      </div>

      <Card padding={false}>
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h3 className="text-lg font-semibold text-navy">Assessment Cycles</h3>
        </div>

        {cycles.length === 0 ? (
          <div className="p-6">
            <EmptyState
              icon={<Compass size={40} />}
              title="No assessment cycles yet"
              description="Initiate a C³ Compass assessment to collect anonymous 360° feedback for a chaplain's development."
              actionLabel="Initiate First Assessment"
              onAction={() => { window.location.href = "/compass/cycles/new"; }}
            />
          </div>
        ) : (
          <div className="divide-y divide-border">
            {cycles.map((cycle) => (
              <Link
                key={cycle.id}
                href={`/compass/cycles/${cycle.id}`}
                className="flex items-center gap-4 px-6 py-4 hover:bg-surface transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-text">
                    {cycle.subject
                      ? `${cycle.subject.rank} ${cycle.subject.last_name}, ${cycle.subject.first_name}`
                      : "Unknown"}
                  </div>
                  <div className="mt-0.5 text-xs text-text-secondary">
                    {cycle.assessment_period}
                    {cycle.subject?.position_title && ` · ${cycle.subject.position_title}`}
                  </div>
                </div>
                <Badge color={statusColors[cycle.status] ?? "gray"}>
                  {cycle.status}
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </Card>
    </>
  );
}
