"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { StatusPill } from "@/components/ui/StatusPill";
import { SkeletonCard } from "@/components/ui/Skeleton";
import { EmptyState } from "@/components/ui/EmptyState";
import { useTrainingEvents, type TrainingEvent } from "@/hooks/useTrainingEvents";
import { useOrganization } from "@/hooks/useOrganization";
import { ClipboardCheck, BarChart3, Plus } from "lucide-react";

export default function TrainingDashboardPage() {
  const { fetchEvents, loading: eventsLoading } = useTrainingEvents();
  const { fetchAllOrgs, loading: orgsLoading } = useOrganization();
  const [events, setEvents] = useState<TrainingEvent[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const orgs = await fetchAllOrgs();
      const orgIds = orgs.map((o) => o.id);
      if (orgIds.length > 0) {
        const ev = await fetchEvents(orgIds);
        if (!cancelled) setEvents(ev);
      }
      if (!cancelled) setLoaded(true);
    }
    load();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loading = !loaded && (eventsLoading || orgsLoading);

  // Compute summary stats
  const now = new Date();
  const thisMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  const eventsThisMonth = events.filter((e) => e.date.startsWith(thisMonth));
  const rated = events.filter((e) => e.rating);
  const tCount = rated.filter((e) => e.rating === "T" || e.rating === "T_minus").length;
  const pCount = rated.filter((e) => e.rating === "P" || e.rating === "P_minus").length;
  const uCount = rated.filter((e) => e.rating === "U").length;
  const recent = events.slice(0, 5);

  if (loading) {
    return (
      <>
        <Breadcrumbs />
        <PageHeader title="Training" subtitle="Readiness Tracker" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      <Breadcrumbs />
      <PageHeader
        title="Training"
        subtitle="Readiness Tracker — Log events, track proficiency, manage your METL"
        actions={
          <div className="flex gap-2">
            <Link href="/training/events/new">
              <Button>
                <Plus size={16} />
                Log Training Event
              </Button>
            </Link>
            <Link href="/training/readiness">
              <Button variant="secondary">
                <BarChart3 size={16} />
                Readiness Matrix
              </Button>
            </Link>
          </div>
        }
      />

      {/* Summary Cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <div className="text-sm font-medium text-text-secondary">Total Events</div>
          <div className="mt-1 text-3xl font-semibold text-navy">{events.length}</div>
          <div className="mt-1 text-xs text-text-tertiary">All time</div>
        </Card>
        <Card>
          <div className="text-sm font-medium text-text-secondary">This Month</div>
          <div className="mt-1 text-3xl font-semibold text-navy">{eventsThisMonth.length}</div>
          <div className="mt-1 text-xs text-text-tertiary">Events logged</div>
        </Card>
        <Card>
          <div className="text-sm font-medium text-text-secondary">T/P/U Distribution</div>
          <div className="mt-2 flex gap-3">
            <div className="text-center">
              <div className="text-lg font-semibold text-status-trained">{tCount}</div>
              <div className="text-[10px] text-text-tertiary">Trained</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-status-practiced">{pCount}</div>
              <div className="text-[10px] text-text-tertiary">Practiced</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-status-untrained">{uCount}</div>
              <div className="text-[10px] text-text-tertiary">Untrained</div>
            </div>
          </div>
        </Card>
        <Card>
          <div className="text-sm font-medium text-text-secondary">Proficiency Rate</div>
          <div className="mt-1 text-3xl font-semibold text-navy">
            {rated.length > 0
              ? `${Math.round(((tCount + pCount) / rated.length) * 100)}%`
              : "—"}
          </div>
          <div className="mt-1 text-xs text-text-tertiary">Trained or Practiced</div>
        </Card>
      </div>

      {/* Recent Events */}
      <Card padding={false}>
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h3 className="text-lg font-semibold text-navy">Recent Training Events</h3>
          <Link href="/training/events">
            <Button variant="ghost" size="sm">View All</Button>
          </Link>
        </div>

        {recent.length === 0 ? (
          <div className="p-6">
            <EmptyState
              icon={<ClipboardCheck size={40} />}
              title="No training events yet"
              description="Start logging training events to track your unit's readiness and build proficiency data."
              actionLabel="Log First Event"
              onAction={() => {
                window.location.href = "/training/events/new";
              }}
            />
          </div>
        ) : (
          <div className="divide-y divide-border">
            {recent.map((event) => (
              <Link
                key={event.id}
                href={`/training/events/${event.id}`}
                className="flex items-center gap-4 px-6 py-4 hover:bg-surface transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-text-tertiary">
                      {event.task_id}
                    </span>
                    <span className="text-sm font-medium text-text truncate">
                      {event.task?.title ?? event.task_id}
                    </span>
                  </div>
                  <div className="mt-0.5 flex items-center gap-3 text-xs text-text-secondary">
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                    <span>{event.organization?.name}</span>
                    {event.location && <span>{event.location}</span>}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="hidden text-xs text-text-tertiary capitalize sm:block">
                    {event.context.replace(/_/g, " ")}
                  </span>
                  {event.rating && (
                    <StatusPill status={event.rating as "T" | "T_minus" | "P" | "P_minus" | "U"} />
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </Card>
    </>
  );
}
