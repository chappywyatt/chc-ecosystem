"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { StatusPill } from "@/components/ui/StatusPill";
import { EmptyState } from "@/components/ui/EmptyState";
import { SkeletonCard } from "@/components/ui/Skeleton";
import { useTasks, type Task } from "@/hooks/useTasks";
import { useTrainingEvents, type TrainingEvent } from "@/hooks/useTrainingEvents";
import { useOrganization } from "@/hooks/useOrganization";
import { ArrowLeft, Flag, AlertTriangle, FileText } from "lucide-react";

const pillarBadgeColors: Record<string, "green" | "fluent" | "orange" | "purple"> = {
  character: "green",
  competence: "fluent",
  connection: "orange",
  constitutional: "purple",
};

export default function TaskDetailPage() {
  const params = useParams();
  const router = useRouter();
  const taskId = params.id as string;
  const { fetchTask } = useTasks();
  const { fetchEvents } = useTrainingEvents();
  const { fetchAllOrgs } = useOrganization();

  const [task, setTask] = useState<Task | null>(null);
  const [events, setEvents] = useState<TrainingEvent[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const t = await fetchTask(taskId);
      if (cancelled) return;
      setTask(t);

      const orgs = await fetchAllOrgs();
      const orgIds = orgs.map((o) => o.id);
      if (orgIds.length > 0) {
        const ev = await fetchEvents(orgIds, { taskId });
        if (!cancelled) setEvents(ev);
      }
      if (!cancelled) setLoaded(true);
    }
    load();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskId]);

  if (!loaded) {
    return <><Breadcrumbs /><PageHeader title="Task Detail" /><div className="space-y-4"><SkeletonCard /><SkeletonCard /></div></>;
  }

  if (!task) {
    return (
      <><Breadcrumbs /><PageHeader title="Task Detail" /><Card>
        <div className="py-12 text-center"><p className="text-text-secondary mb-4">Task not found.</p>
        <Button variant="secondary" onClick={() => router.push("/cam/tasks")}><ArrowLeft size={16} /> Back</Button></div>
      </Card></>
    );
  }

  // Proficiency stats
  const rated = events.filter((e) => e.rating);
  const tCount = rated.filter((e) => e.rating === "T" || e.rating === "T_minus").length;
  const pCount = rated.filter((e) => e.rating === "P" || e.rating === "P_minus").length;
  const uCount = rated.filter((e) => e.rating === "U").length;
  const totalRated = tCount + pCount + uCount;
  const tpPercent = totalRated > 0 ? Math.round(((tCount + pCount) / totalRated) * 100) : 0;

  const steps = (task.performance_steps as { step_number: number; description: string; sub_steps?: string[] }[]) ?? [];

  return (
    <>
      <Breadcrumbs />
      <PageHeader
        title={task.title}
        subtitle={`Task ${task.id}`}
        actions={
          <div className="flex gap-2">
            <Button variant="secondary" onClick={() => router.back()}><ArrowLeft size={16} /> Back</Button>
            <Link href={`/cam/gaps/new?taskId=${task.id}`}>
              <Button><Flag size={16} /> Flag Capability Gap</Button>
            </Link>
          </div>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {/* Metadata */}
          <Card padding={false}>
            <CardHeader title="Task Information" accent="navy" />
            <div className="p-6">
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge color="navy">{task.echelon}</Badge>
                <Badge color="fluent">{task.task_type.replace(/_/g, " ")}</Badge>
                {task.has_teo ? (
                  <Badge color="green">T&EO Available</Badge>
                ) : (
                  <Badge color="red"><AlertTriangle size={10} className="mr-1" /> No T&EO</Badge>
                )}
                {task.pillar_mapping.map((p) => (
                  <Badge key={p} color={pillarBadgeColors[p] ?? "gray"}>{p}</Badge>
                ))}
              </div>

              {task.conditions && (
                <div className="mb-4">
                  <h4 className="text-xs font-semibold text-text-tertiary uppercase mb-1">Conditions</h4>
                  <p className="text-sm text-text">{task.conditions}</p>
                </div>
              )}
              {task.standards && (
                <div className="mb-4">
                  <h4 className="text-xs font-semibold text-text-tertiary uppercase mb-1">Standards</h4>
                  <p className="text-sm text-text">{task.standards}</p>
                </div>
              )}
            </div>
          </Card>

          {/* Performance Steps */}
          {steps.length > 0 && (
            <Card padding={false}>
              <CardHeader title="Performance Steps" />
              <div className="divide-y divide-border">
                {steps.map((step, idx) => (
                  <div key={idx} className="px-6 py-4">
                    <div className="flex items-start gap-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-navy text-xs font-bold text-white">
                        {step.step_number ?? idx + 1}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-text">{step.description}</p>
                        {step.sub_steps && step.sub_steps.length > 0 && (
                          <ul className="mt-2 space-y-1">
                            {step.sub_steps.map((sub, si) => (
                              <li key={si} className="flex items-start gap-2 text-xs text-text-secondary">
                                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-text-tertiary" />
                                {sub}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* T&EO Gap Notes */}
          {task.teo_gap_notes && (
            <Card padding={false}>
              <CardHeader title="T&EO Gap Analysis" accent="gold" />
              <div className="p-6">
                <div className="flex items-start gap-3 rounded-lg bg-status-practiced/10 px-4 py-3">
                  <AlertTriangle size={18} className="mt-0.5 shrink-0 text-status-practiced" />
                  <p className="text-sm text-text">{task.teo_gap_notes}</p>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Proficiency Data */}
          <Card padding={false}>
            <CardHeader title="Force Proficiency" />
            <div className="p-6">
              {totalRated === 0 ? (
                <div className="text-center py-4">
                  <p className="text-sm text-text-tertiary">No training data for this task</p>
                </div>
              ) : (
                <>
                  <div className="mb-4 text-center">
                    <div className="text-3xl font-bold text-navy">{tpPercent}%</div>
                    <div className="text-xs text-text-tertiary">Trained/Practiced</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-text-secondary">Trained</span>
                      <span className="font-medium text-status-trained">{tCount}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-text-secondary">Practiced</span>
                      <span className="font-medium text-status-practiced">{pCount}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-text-secondary">Untrained</span>
                      <span className="font-medium text-status-untrained">{uCount}</span>
                    </div>
                  </div>
                  <div className="mt-3 text-xs text-text-tertiary">{totalRated} evaluations across {new Set(events.map((e) => e.org_id)).size} units</div>
                </>
              )}
            </div>
          </Card>

          {/* Doctrinal References */}
          {task.doctrinal_source.length > 0 && (
            <Card>
              <h3 className="text-sm font-semibold text-navy mb-2">Doctrinal References</h3>
              <div className="space-y-1">
                {task.doctrinal_source.map((ref, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <FileText size={12} className="text-text-tertiary" />
                    <span className="text-sm text-text">{ref}</span>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* BFT Capability Mapping */}
          {task.bft_capability_mapping.length > 0 && (
            <Card>
              <h3 className="text-sm font-semibold text-navy mb-2">BFT Enduring Capabilities</h3>
              <div className="flex flex-wrap gap-1">
                {task.bft_capability_mapping.map((cap, i) => (
                  <Badge key={i} color="gold">{cap}</Badge>
                ))}
              </div>
            </Card>
          )}

          {/* Recent Evaluations */}
          {events.length > 0 && (
            <Card padding={false}>
              <CardHeader title={`Recent Evaluations (${events.length})`} />
              <div className="divide-y divide-border max-h-64 overflow-y-auto">
                {events.slice(0, 10).map((ev) => (
                  <Link
                    key={ev.id}
                    href={`/training/events/${ev.id}`}
                    className="flex items-center justify-between px-4 py-2.5 hover:bg-surface transition-colors"
                  >
                    <div>
                      <div className="text-xs text-text">{ev.organization?.name ?? "—"}</div>
                      <div className="text-[10px] text-text-tertiary">{new Date(ev.date).toLocaleDateString()}</div>
                    </div>
                    {ev.rating && <StatusPill status={ev.rating as "T" | "T_minus" | "P" | "P_minus" | "U"} />}
                  </Link>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </>
  );
}
