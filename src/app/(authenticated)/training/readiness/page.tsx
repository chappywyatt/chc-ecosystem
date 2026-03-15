"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { SkeletonCard } from "@/components/ui/Skeleton";
import { Modal } from "@/components/ui/Modal";
import { StatusPill } from "@/components/ui/StatusPill";
import { ReadinessHeatmap } from "@/components/charts/ReadinessHeatmap";
import { useOrganization, type Organization } from "@/hooks/useOrganization";
import { useTrainingEvents, type TrainingEvent } from "@/hooks/useTrainingEvents";
import { useTasks, type Task } from "@/hooks/useTasks";
import { BarChart3, Plus } from "lucide-react";

interface CellDetail {
  orgName: string;
  taskTitle: string;
  events: TrainingEvent[];
}

export default function ReadinessMatrixPage() {
  const router = useRouter();
  const { fetchAllOrgs } = useOrganization();
  const { fetchEvents } = useTrainingEvents();
  const { fetchTasks } = useTasks();

  const [orgs, setOrgs] = useState<Organization[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [events, setEvents] = useState<TrainingEvent[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Cell detail modal
  const [cellDetail, setCellDetail] = useState<CellDetail | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const [orgsData, tasksData] = await Promise.all([
        fetchAllOrgs(),
        fetchTasks(),
      ]);
      if (cancelled) return;
      setOrgs(orgsData);
      setTasks(tasksData);

      const orgIds = orgsData.map((o) => o.id);
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

  const handleCellClick = useCallback(
    (orgId: string, taskId: string) => {
      const org = orgs.find((o) => o.id === orgId);
      const task = tasks.find((t) => t.id === taskId);
      const cellEvents = events
        .filter((e) => e.org_id === orgId && e.task_id === taskId)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

      setCellDetail({
        orgName: org?.name ?? "Unknown",
        taskTitle: task ? `${task.id} — ${task.title}` : taskId,
        events: cellEvents,
      });
    },
    [orgs, tasks, events]
  );

  // Build heatmap data
  const heatmapCells = events
    .filter((e) => e.rating)
    .map((e) => ({
      orgId: e.org_id,
      taskId: e.task_id,
      rating: e.rating,
      date: e.date,
      eventCount: events.filter(
        (ev) => ev.org_id === e.org_id && ev.task_id === e.task_id
      ).length,
    }));

  // Only show tasks that have at least one event (or all tasks if none)
  const activeTasks =
    events.length > 0
      ? tasks.filter((t) => events.some((e) => e.task_id === t.id))
      : tasks.slice(0, 10);

  if (!loaded) {
    return (
      <>
        <Breadcrumbs />
        <PageHeader title="Readiness Matrix" />
        <div className="space-y-4">
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </>
    );
  }

  if (events.length === 0) {
    return (
      <>
        <Breadcrumbs />
        <PageHeader title="Readiness Matrix" subtitle="Unit proficiency by task" />
        <EmptyState
          icon={<BarChart3 size={40} />}
          title="No training data recorded"
          description="The readiness matrix will display your unit's proficiency across all tasks once training events are logged."
          actionLabel="Log First Event"
          onAction={() => router.push("/training/events/new")}
        />
      </>
    );
  }

  return (
    <>
      <Breadcrumbs />
      <PageHeader
        title="Readiness Matrix"
        subtitle="Unit proficiency by task — click any cell to see evaluation history"
        actions={
          <Button onClick={() => router.push("/training/events/new")}>
            <Plus size={16} />
            Log Event
          </Button>
        }
      />

      <Card padding={false} className="p-4">
        <ReadinessHeatmap
          orgs={orgs.map((o) => ({
            id: o.id,
            name: o.name,
            uic: o.uic,
          }))}
          tasks={activeTasks.map((t) => ({
            id: t.id,
            title: t.title,
          }))}
          cells={heatmapCells}
          onCellClick={handleCellClick}
        />
      </Card>

      {/* Cell Detail Modal */}
      <Modal
        open={!!cellDetail}
        onClose={() => setCellDetail(null)}
        title="Evaluation History"
      >
        {cellDetail && (
          <div className="space-y-3">
            <div>
              <div className="text-xs text-text-tertiary">Unit</div>
              <div className="text-sm font-medium text-text">
                {cellDetail.orgName}
              </div>
            </div>
            <div>
              <div className="text-xs text-text-tertiary">Task</div>
              <div className="text-sm font-medium text-text">
                {cellDetail.taskTitle}
              </div>
            </div>

            {cellDetail.events.length === 0 ? (
              <div className="rounded-lg bg-surface px-4 py-6 text-center text-sm text-text-secondary">
                No evaluations recorded for this unit and task.
              </div>
            ) : (
              <div className="rounded-lg border border-border">
                <div className="bg-navy px-4 py-2 text-xs font-medium text-white">
                  {cellDetail.events.length} evaluation{cellDetail.events.length !== 1 ? "s" : ""}
                </div>
                <div className="divide-y divide-border">
                  {cellDetail.events.map((ev) => (
                    <button
                      key={ev.id}
                      onClick={() => {
                        setCellDetail(null);
                        router.push(`/training/events/${ev.id}`);
                      }}
                      className="flex w-full items-center justify-between px-4 py-3 text-left
                        hover:bg-surface transition-colors"
                    >
                      <div>
                        <div className="text-sm text-text">
                          {new Date(ev.date).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-text-tertiary capitalize">
                          {ev.context.replace(/_/g, " ")}
                          {ev.location && ` · ${ev.location}`}
                        </div>
                      </div>
                      {ev.rating && (
                        <StatusPill
                          status={ev.rating as "T" | "T_minus" | "P" | "P_minus" | "U"}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </>
  );
}
