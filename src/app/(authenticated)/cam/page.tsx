"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { SkeletonCard } from "@/components/ui/Skeleton";
import { EmptyState } from "@/components/ui/EmptyState";
import { GapPipeline } from "@/components/charts/GapPipeline";
import { DotmlpfBar } from "@/components/charts/DotmlpfBar";
import { useCapabilityGaps, type CapabilityGap, type GapStats } from "@/hooks/useCapabilityGaps";
import { BarChart3, Plus, BookOpen, FileText, AlertTriangle } from "lucide-react";

const severityColors: Record<string, "red" | "orange" | "gold" | "gray"> = {
  critical: "red",
  significant: "orange",
  moderate: "gold",
  minor: "gray",
};

export default function CamDashboardPage() {
  const { fetchGaps, fetchGapStats } = useCapabilityGaps();
  const [gaps, setGaps] = useState<CapabilityGap[]>([]);
  const [stats, setStats] = useState<GapStats | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const [gapData, statsData] = await Promise.all([
        fetchGaps(),
        fetchGapStats(),
      ]);
      if (!cancelled) {
        setGaps(gapData);
        setStats(statsData);
        setLoaded(true);
      }
    }
    load();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const activeGaps = gaps.filter((g) => g.status !== "resolved" && g.status !== "deferred");
  const recentGaps = gaps.slice(0, 5);

  if (!loaded) {
    return (
      <>
        <Breadcrumbs />
        <PageHeader title="CHC Capability Analysis Module" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      </>
    );
  }

  return (
    <>
      <Breadcrumbs />
      <PageHeader
        title="CHC Capability Analysis Module"
        subtitle="Task analysis, capability gap identification, and DOTMLPF-P requirements generation"
        actions={
          <div className="flex gap-2">
            <Link href="/cam/gaps/new">
              <Button><Plus size={16} /> Report New Gap</Button>
            </Link>
            <Link href="/cam/tasks">
              <Button variant="secondary"><BookOpen size={16} /> Task Library</Button>
            </Link>
            <Link href="/cam/reports">
              <Button variant="secondary"><FileText size={16} /> Reports</Button>
            </Link>
          </div>
        }
      />

      {gaps.length === 0 ? (
        <EmptyState
          icon={<BarChart3 size={40} />}
          title="No capability gaps recorded"
          description="The CHC-CAM tracks capability gaps across the Chaplain Corps. Start by reviewing the task library or reporting a new gap."
          actionLabel="Report First Gap"
          onAction={() => { window.location.href = "/cam/gaps/new"; }}
        />
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left column: Active Gaps + Pipeline */}
          <div className="space-y-6">
            {/* Active Gaps Card */}
            <Card>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-sm font-medium text-text-secondary">Active Gaps</div>
                  <div className="mt-1 text-4xl font-semibold text-navy">{activeGaps.length}</div>
                </div>
                <div className="text-right space-y-1">
                  {(["critical", "significant", "moderate", "minor"] as const).map((sev) => {
                    const count = stats?.bySeverity[sev] ?? 0;
                    if (count === 0) return null;
                    return (
                      <div key={sev} className="flex items-center justify-end gap-2">
                        <span className="text-xs text-text-secondary">{count}</span>
                        <Badge color={severityColors[sev]}>{sev}</Badge>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Card>

            {/* Gap Pipeline */}
            <Card padding={false}>
              <CardHeader title="Gap Pipeline" accent="navy" />
              <div className="p-4">
                <GapPipeline statusCounts={stats?.byStatus ?? {}} />
              </div>
            </Card>
          </div>

          {/* Right column: DOTMLPF-P + Recent Activity */}
          <div className="space-y-6">
            {/* Domain Distribution */}
            <Card padding={false}>
              <CardHeader title="By DOTMLPF-P Domain" />
              <div className="p-4">
                <DotmlpfBar domainCounts={stats?.byDomain ?? {}} />
              </div>
            </Card>

            {/* Recent Activity */}
            <Card padding={false}>
              <CardHeader title="Recent Activity" action={
                <Link href="/cam/gaps"><Button variant="ghost" size="sm">View All</Button></Link>
              } />
              {recentGaps.length === 0 ? (
                <div className="p-6 text-center text-sm text-text-tertiary">No recent activity</div>
              ) : (
                <div className="divide-y divide-border">
                  {recentGaps.map((gap) => (
                    <Link
                      key={gap.id}
                      href={`/cam/gaps/${gap.id}`}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-surface transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-text truncate">{gap.title}</div>
                        <div className="text-xs text-text-tertiary">
                          {new Date(gap.updated_at).toLocaleDateString()}
                        </div>
                      </div>
                      <Badge color={severityColors[gap.severity] ?? "gray"}>{gap.severity}</Badge>
                    </Link>
                  ))}
                </div>
              )}
            </Card>
          </div>

          {/* Bottom: Task Proficiency Alerts */}
          <div className="lg:col-span-2">
            <Card padding={false}>
              <CardHeader title="Task Proficiency Alerts" accent="gold" />
              <div className="p-6">
                <div className="flex items-start gap-3 rounded-lg bg-status-practiced/10 px-4 py-3 text-sm text-text-secondary">
                  <AlertTriangle size={18} className="mt-0.5 shrink-0 text-status-practiced" />
                  <div>
                    Task proficiency alerts will appear here once training data is loaded.
                    Tasks below 60% T/P, tasks with no T&EO, and declining trends will be flagged automatically.
                    <Link href="/cam/tasks" className="ml-1 text-fluent hover:underline">
                      View Task Library →
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}
    </>
  );
}
