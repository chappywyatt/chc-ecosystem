"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { SkeletonCard } from "@/components/ui/Skeleton";
import { EmptyState } from "@/components/ui/EmptyState";
import { useObservations, type Observation } from "@/hooks/useObservations";
import { useOrganization } from "@/hooks/useOrganization";
import { PILLAR_LABELS } from "@/lib/data/indicators-seed";
import { Eye, Plus, TrendingUp } from "lucide-react";

const pillarBadgeColors: Record<string, "green" | "fluent" | "orange" | "purple"> = {
  character: "green",
  competence: "fluent",
  connection: "orange",
  constitutional: "purple",
};

export default function GaugeDashboardPage() {
  const { fetchObservations } = useObservations();
  const { fetchAllOrgs } = useOrganization();
  const [observations, setObservations] = useState<Observation[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const orgs = await fetchAllOrgs();
      const orgIds = orgs.map((o) => o.id);
      if (orgIds.length > 0) {
        const obs = await fetchObservations({ orgIds });
        if (!cancelled) setObservations(obs);
      }
      if (!cancelled) setLoaded(true);
    }
    load();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Stats
  const now = new Date();
  const qStart = new Date(now.getFullYear(), Math.floor(now.getMonth() / 3) * 3, 1);
  const thisQuarter = observations.filter(
    (o) => new Date(o.observation_date) >= qStart
  );
  const uniqueSubjects = new Set(observations.map((o) => o.subject_id));
  const recent = observations.slice(0, 5);

  if (!loaded) {
    return (
      <>
        <Breadcrumbs />
        <PageHeader title="Behavioral Sustainment Gauge" />
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
        title="Behavioral Sustainment Gauge"
        subtitle="Four-pillar behavioral observation tool — Character, Competence, Connection, Constitutional Fidelity"
        actions={
          <div className="flex gap-2">
            <Link href="/gauge/observe">
              <Button>
                <Plus size={16} />
                New Observation
              </Button>
            </Link>
            <Link href="/gauge/trends">
              <Button variant="secondary">
                <TrendingUp size={16} />
                View Trends
              </Button>
            </Link>
          </div>
        }
      />

      {/* Summary Cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <Card>
          <div className="text-sm font-medium text-text-secondary">Total Observations</div>
          <div className="mt-1 text-3xl font-semibold text-navy">{observations.length}</div>
          <div className="mt-1 text-xs text-text-tertiary">All time</div>
        </Card>
        <Card>
          <div className="text-sm font-medium text-text-secondary">This Quarter</div>
          <div className="mt-1 text-3xl font-semibold text-navy">{thisQuarter.length}</div>
          <div className="mt-1 text-xs text-text-tertiary">Observations recorded</div>
        </Card>
        <Card>
          <div className="text-sm font-medium text-text-secondary">Subjects Observed</div>
          <div className="mt-1 text-3xl font-semibold text-navy">{uniqueSubjects.size}</div>
          <div className="mt-1 text-xs text-text-tertiary">Unique individuals</div>
        </Card>
      </div>

      {/* Recent Observations */}
      <Card padding={false}>
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h3 className="text-lg font-semibold text-navy">Recent Observations</h3>
          <Link href="/gauge/history">
            <Button variant="ghost" size="sm">View All</Button>
          </Link>
        </div>

        {recent.length === 0 ? (
          <div className="p-6">
            <EmptyState
              icon={<Eye size={40} />}
              title="No observations yet"
              description="Start observing chaplains and RAS to build behavioral data for evaluation support and leader development."
              actionLabel="Begin First Observation"
              onAction={() => { window.location.href = "/gauge/observe"; }}
            />
          </div>
        ) : (
          <div className="divide-y divide-border">
            {recent.map((obs) => {
              // Compute pillar averages from ratings
              const pillarAvgs: Record<string, { sum: number; count: number }> = {};
              for (const [, entry] of Object.entries(obs.ratings ?? {})) {
                // We'd need indicator data to map to pillar — show overall avg instead
                if ((entry as { rating: number }).rating > 0) {
                  const key = "overall";
                  if (!pillarAvgs[key]) pillarAvgs[key] = { sum: 0, count: 0 };
                  pillarAvgs[key].sum += (entry as { rating: number }).rating;
                  pillarAvgs[key].count++;
                }
              }
              const overallAvg = pillarAvgs.overall
                ? (pillarAvgs.overall.sum / pillarAvgs.overall.count).toFixed(1)
                : "—";

              return (
                <Link
                  key={obs.id}
                  href={`/gauge/history?obs=${obs.id}`}
                  className="flex items-center gap-4 px-6 py-4 hover:bg-surface transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-text">
                      {obs.subject
                        ? `${obs.subject.rank} ${obs.subject.last_name}, ${obs.subject.first_name}`
                        : "Unknown subject"}
                    </div>
                    <div className="mt-0.5 flex items-center gap-3 text-xs text-text-secondary">
                      <span>{new Date(obs.observation_date).toLocaleDateString()}</span>
                      {obs.context && <span>{obs.context}</span>}
                      <span className="capitalize">{obs.echelon_setting}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-navy">{overallAvg}</div>
                    <div className="text-[10px] text-text-tertiary">avg score</div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </Card>
    </>
  );
}
