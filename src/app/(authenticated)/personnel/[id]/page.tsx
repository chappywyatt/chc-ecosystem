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
import { usePersonnel, type Person } from "@/hooks/usePersonnel";
import { useObservations, type Observation } from "@/hooks/useObservations";
import { useTrainingEvents, type TrainingEvent } from "@/hooks/useTrainingEvents";
import { useIdp, type IdpRecord } from "@/hooks/useIdp";
import { ArrowLeft, FileText, Eye, ClipboardCheck } from "lucide-react";

type Tab = "overview" | "evaluations" | "development" | "training";

export default function PersonnelDetailPage() {
  const params = useParams();
  const router = useRouter();
  const personId = params.id as string;
  const { fetchPerson, displayName } = usePersonnel();
  const { fetchObservations } = useObservations();
  const { fetchEvents } = useTrainingEvents();
  const { fetchIdps } = useIdp();

  const [person, setPerson] = useState<Person | null>(null);
  const [observations, setObservations] = useState<Observation[]>([]);
  const [events, setEvents] = useState<TrainingEvent[]>([]);
  const [idps, setIdps] = useState<IdpRecord[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const p = await fetchPerson(personId);
      if (cancelled) return;
      setPerson(p);
      if (p) {
        const [obs, ev, idpList] = await Promise.all([
          fetchObservations({ subjectId: p.id }),
          fetchEvents([p.org_id]),
          fetchIdps(p.id),
        ]);
        if (!cancelled) {
          setObservations(obs);
          setEvents(ev.filter((e) => e.attendee_ids?.includes(p.id)));
          setIdps(idpList);
        }
      }
      if (!cancelled) setLoaded(true);
    }
    load();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [personId]);

  if (!loaded) {
    return <><Breadcrumbs /><PageHeader title="Personnel" /><div className="space-y-4"><SkeletonCard /><SkeletonCard /></div></>;
  }

  if (!person) {
    return (
      <><Breadcrumbs /><PageHeader title="Personnel" /><Card>
        <div className="py-12 text-center"><p className="text-text-secondary mb-4">Person not found.</p>
        <Button variant="secondary" onClick={() => router.push("/personnel")}><ArrowLeft size={16} /> Back</Button></div>
      </Card></>
    );
  }

  const tabs: { key: Tab; label: string; count?: number }[] = [
    { key: "overview", label: "Overview" },
    { key: "evaluations", label: "Evaluations", count: observations.length },
    { key: "development", label: "Development", count: idps.length },
    { key: "training", label: "Training History", count: events.length },
  ];

  const latestObs = observations[0] ?? null;
  const latestWp = latestObs?.word_picture as { summary_narrative?: string; pillar_averages?: Record<string, number> } | null;
  const activeIdp = idps.find((i) => i.status === "active" || i.status === "draft");

  return (
    <>
      <Breadcrumbs />
      <PageHeader
        title={displayName(person)}
        subtitle={`${person.position_title} · ${person.organization?.name ?? ""}`}
        actions={<Button variant="secondary" onClick={() => router.back()}><ArrowLeft size={16} /> Back</Button>}
      />

      {/* Info card */}
      <Card className="mb-6">
        <div className="grid gap-4 sm:grid-cols-4">
          <div><div className="text-xs text-text-tertiary">Rank</div><div className="text-sm font-medium text-text">{person.rank}</div></div>
          <div><div className="text-xs text-text-tertiary">MOS</div><Badge color={person.mos === "56A" ? "navy" : "gold"}>{person.mos}</Badge></div>
          <div><div className="text-xs text-text-tertiary">Duty Status</div><Badge color="green">{person.duty_status.replace(/_/g, " ")}</Badge></div>
          <div><div className="text-xs text-text-tertiary">Email</div><div className="text-sm text-text">{person.email || "—"}</div></div>
        </div>
      </Card>

      {/* Tabs */}
      <div className="mb-6 flex gap-1 border-b border-border overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`whitespace-nowrap px-4 py-2.5 text-sm font-medium border-b-2 transition-colors
              ${activeTab === tab.key
                ? "border-fluent text-fluent"
                : "border-transparent text-text-secondary hover:text-text"
              }`}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span className="ml-1.5 text-xs text-text-tertiary">({tab.count})</span>
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "overview" && (
        <div className="grid gap-6 lg:grid-cols-2">
          <Card padding={false}>
            <CardHeader title="Latest Gauge Word Picture" accent="navy" action={
              latestObs ? <Link href={`/gauge/history?obs=${latestObs.id}`}><Button variant="ghost" size="sm">View Full</Button></Link> : undefined
            } />
            <div className="p-6">
              {latestWp?.summary_narrative ? (
                <p className="text-sm text-text leading-relaxed">{latestWp.summary_narrative}</p>
              ) : (
                <p className="text-sm text-text-tertiary">No behavioral observations recorded yet.</p>
              )}
              {latestWp?.pillar_averages && (
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {Object.entries(latestWp.pillar_averages).map(([p, avg]) => (
                    <div key={p} className="flex items-center justify-between rounded bg-surface px-3 py-1.5">
                      <span className="text-xs text-text-secondary capitalize">{p}</span>
                      <span className="text-sm font-bold text-navy">{(avg as number).toFixed(1)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Card>

          <Card padding={false}>
            <CardHeader title="IDP Status" accent="gold" action={
              <Link href={`/personnel/${person.id}/idp`}><Button variant="ghost" size="sm">Manage</Button></Link>
            } />
            <div className="p-6">
              {activeIdp ? (
                <div>
                  <Badge color={activeIdp.status === "active" ? "green" : "gold"}>{activeIdp.status}</Badge>
                  <p className="mt-2 text-sm text-text">Created {new Date(activeIdp.created_date).toLocaleDateString()}</p>
                  <p className="mt-1 text-xs text-text-tertiary">
                    {activeIdp.professional_goals.length} professional goals · {activeIdp.personal_goals.length} personal goals
                  </p>
                </div>
              ) : (
                <p className="text-sm text-text-tertiary">No active IDP. Create one to support development planning.</p>
              )}
            </div>
          </Card>
        </div>
      )}

      {activeTab === "evaluations" && (
        observations.length === 0 ? (
          <EmptyState icon={<Eye size={40} />} title="No evaluations" description="No behavioral observations have been recorded for this individual." />
        ) : (
          <div className="space-y-3">
            {observations.map((obs) => (
              <Card key={obs.id} className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => router.push(`/gauge/history?obs=${obs.id}`)}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-text">{new Date(obs.observation_date).toLocaleDateString()}</div>
                    <div className="text-xs text-text-tertiary">{obs.context || obs.echelon_setting}</div>
                  </div>
                  <div className="text-lg font-semibold text-navy">
                    {(() => {
                      const vals = Object.values(obs.ratings).map((e) => (e as {rating:number}).rating).filter((v) => v > 0);
                      return vals.length > 0 ? (vals.reduce((s,v) => s+v, 0) / vals.length).toFixed(1) : "—";
                    })()}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )
      )}

      {activeTab === "development" && (
        <div>
          <div className="mb-4 flex justify-end">
            <Link href={`/personnel/${person.id}/idp`}>
              <Button><FileText size={16} /> Manage IDPs</Button>
            </Link>
          </div>
          {idps.length === 0 ? (
            <EmptyState icon={<FileText size={40} />} title="No IDPs" description="No Individual Development Plans have been created for this person."
              actionLabel="Create IDP" onAction={() => router.push(`/personnel/${person.id}/idp`)} />
          ) : (
            <div className="space-y-3">
              {idps.map((idp) => (
                <Card key={idp.id}>
                  <div className="flex items-center justify-between">
                    <div>
                      <Badge color={idp.status === "active" ? "green" : idp.status === "completed" ? "gray" : "gold"}>{idp.status}</Badge>
                      <div className="mt-1 text-sm text-text">{new Date(idp.created_date).toLocaleDateString()}</div>
                      <div className="text-xs text-text-tertiary">
                        {idp.professional_goals.length + idp.personal_goals.length} goals
                      </div>
                    </div>
                    <div className="text-right text-xs text-text-tertiary">
                      <div>Follow-up 1: {idp.followup_1_completed ? "✓" : idp.followup_1_date ? new Date(idp.followup_1_date).toLocaleDateString() : "—"}</div>
                      <div>Follow-up 2: {idp.followup_2_completed ? "✓" : idp.followup_2_date ? new Date(idp.followup_2_date).toLocaleDateString() : "—"}</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "training" && (
        events.length === 0 ? (
          <EmptyState icon={<ClipboardCheck size={40} />} title="No training history" description="This individual has not been listed as an attendee in any training events." />
        ) : (
          <div className="space-y-3">
            {events.map((ev) => (
              <Card key={ev.id} className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => router.push(`/training/events/${ev.id}`)}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-text">{ev.task?.title ?? ev.task_id}</div>
                    <div className="text-xs text-text-tertiary">
                      {new Date(ev.date).toLocaleDateString()} · {ev.context.replace(/_/g, " ")}
                    </div>
                  </div>
                  {ev.rating && <StatusPill status={ev.rating as "T"|"T_minus"|"P"|"P_minus"|"U"} />}
                </div>
              </Card>
            ))}
          </div>
        )
      )}
    </>
  );
}
