"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { EmptyState } from "@/components/ui/EmptyState";
import { SkeletonCard } from "@/components/ui/Skeleton";
import { usePersonnel, type Person } from "@/hooks/usePersonnel";
import { useIdp, type IdpRecord, type IdpGoal, type CreateIdpData } from "@/hooks/useIdp";
import { ArrowLeft, Plus, FileText, Check, X } from "lucide-react";

type View = "list" | "create" | "detail";

const EMPTY_GOAL: IdpGoal = { what: "", why: "", how: "", when: "", support: "" };

export default function IdpPage() {
  const params = useParams();
  const router = useRouter();
  const personId = params.id as string;
  const { fetchPerson, displayName } = usePersonnel();
  const { fetchIdps, createIdp, updateIdp, loading: saving, error: saveError } = useIdp();

  const [person, setPerson] = useState<Person | null>(null);
  const [idps, setIdps] = useState<IdpRecord[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [view, setView] = useState<View>("list");
  const [selectedIdp, setSelectedIdp] = useState<IdpRecord | null>(null);

  // Create form state
  const [profGoals, setProfGoals] = useState<IdpGoal[]>([{ ...EMPTY_GOAL }]);
  const [persGoals, setPersGoals] = useState<IdpGoal[]>([{ ...EMPTY_GOAL }]);
  const [strengths, setStrengths] = useState<string[]>([""]);
  const [needs, setNeeds] = useState<string[]>([""]);
  const [reflection, setReflection] = useState<Record<string, string>>({});
  const [followup1Date, setFollowup1Date] = useState("");
  const [followup2Date, setFollowup2Date] = useState("");

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const [p, idpList] = await Promise.all([
        fetchPerson(personId),
        fetchIdps(personId),
      ]);
      if (!cancelled) { setPerson(p); setIdps(idpList); setLoaded(true); }
    }
    load();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [personId]);

  const updateGoal = useCallback(
    (
      type: "prof" | "pers",
      index: number,
      field: keyof IdpGoal,
      value: string
    ) => {
      const setter = type === "prof" ? setProfGoals : setPersGoals;
      setter((prev) => {
        const next = [...prev];
        next[index] = { ...next[index], [field]: value };
        return next;
      });
    },
    []
  );

  const handleCreate = async () => {
    if (!person) return;
    const data: CreateIdpData = {
      personnel_id: person.id,
      supervisor_id: person.id, // In demo mode, self-assign
      professional_goals: profGoals.filter((g) => g.what.trim()),
      personal_goals: persGoals.filter((g) => g.what.trim()),
      strengths_to_maximize: strengths.filter((s) => s.trim()),
      needs_to_mitigate: needs.filter((n) => n.trim()),
      reflection_notes: reflection,
      followup_1_date: followup1Date || undefined,
      followup_2_date: followup2Date || undefined,
    };
    const result = await createIdp(data);
    if (result) {
      setIdps((prev) => [result, ...prev]);
      setView("list");
    }
  };

  const toggleFollowup = async (idp: IdpRecord, num: 1 | 2) => {
    const field = num === 1 ? "followup_1_completed" : "followup_2_completed";
    const current = num === 1 ? idp.followup_1_completed : idp.followup_2_completed;
    const result = await updateIdp(idp.id, { [field]: !current });
    if (result) {
      setIdps((prev) => prev.map((i) => (i.id === result.id ? result : i)));
      if (selectedIdp?.id === result.id) setSelectedIdp(result);
    }
  };

  if (!loaded) {
    return <><Breadcrumbs /><PageHeader title="IDP Management" /><SkeletonCard /></>;
  }

  if (!person) {
    return <><Breadcrumbs /><PageHeader title="IDP Management" /><Card><div className="py-12 text-center text-text-secondary">Person not found.</div></Card></>;
  }

  // ── Detail View ──────────────────────────────────────────
  if (view === "detail" && selectedIdp) {
    return (
      <>
        <Breadcrumbs />
        <PageHeader
          title="Individual Development Plan"
          subtitle={`${displayName(person)} — ${new Date(selectedIdp.created_date).toLocaleDateString()}`}
          actions={<Button variant="secondary" onClick={() => { setView("list"); setSelectedIdp(null); }}><ArrowLeft size={16} /> Back</Button>}
        />

        <div className="space-y-6 max-w-3xl">
          <Card>
            <div className="flex items-center gap-3 mb-4">
              <Badge color={selectedIdp.status === "active" ? "green" : selectedIdp.status === "completed" ? "gray" : "gold"}>
                {selectedIdp.status}
              </Badge>
            </div>

            {selectedIdp.strengths_to_maximize.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-navy mb-1">Strengths to Maximize</h4>
                <ul className="list-disc list-inside text-sm text-text space-y-0.5">
                  {selectedIdp.strengths_to_maximize.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </div>
            )}
            {selectedIdp.needs_to_mitigate.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-navy mb-1">Needs to Mitigate</h4>
                <ul className="list-disc list-inside text-sm text-text space-y-0.5">
                  {selectedIdp.needs_to_mitigate.map((n, i) => <li key={i}>{n}</li>)}
                </ul>
              </div>
            )}
          </Card>

          {/* Goals */}
          {selectedIdp.professional_goals.length > 0 && (
            <Card padding={false}>
              <CardHeader title="Professional Goals" accent="navy" />
              <div className="divide-y divide-border">
                {selectedIdp.professional_goals.map((g, i) => (
                  <div key={i} className="p-4">
                    <div className="font-medium text-sm text-text mb-2">{g.what}</div>
                    <div className="grid gap-2 sm:grid-cols-2 text-xs text-text-secondary">
                      <div><span className="text-text-tertiary">Why:</span> {g.why || "—"}</div>
                      <div><span className="text-text-tertiary">How:</span> {g.how || "—"}</div>
                      <div><span className="text-text-tertiary">When:</span> {g.when || "—"}</div>
                      <div><span className="text-text-tertiary">Support:</span> {g.support || "—"}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {selectedIdp.personal_goals.length > 0 && (
            <Card padding={false}>
              <CardHeader title="Personal Goals" accent="gold" />
              <div className="divide-y divide-border">
                {selectedIdp.personal_goals.map((g, i) => (
                  <div key={i} className="p-4">
                    <div className="font-medium text-sm text-text mb-2">{g.what}</div>
                    <div className="grid gap-2 sm:grid-cols-2 text-xs text-text-secondary">
                      <div><span className="text-text-tertiary">Why:</span> {g.why || "—"}</div>
                      <div><span className="text-text-tertiary">How:</span> {g.how || "—"}</div>
                      <div><span className="text-text-tertiary">When:</span> {g.when || "—"}</div>
                      <div><span className="text-text-tertiary">Support:</span> {g.support || "—"}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Follow-ups */}
          <Card>
            <h3 className="text-sm font-semibold text-navy mb-3">Follow-Up Tracking</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-lg border border-border p-3">
                <div>
                  <div className="text-sm font-medium text-text">Follow-Up 1</div>
                  <div className="text-xs text-text-tertiary">
                    {selectedIdp.followup_1_date ? new Date(selectedIdp.followup_1_date).toLocaleDateString() : "No date set"}
                  </div>
                </div>
                <Button
                  variant={selectedIdp.followup_1_completed ? "primary" : "secondary"}
                  size="sm"
                  onClick={() => toggleFollowup(selectedIdp, 1)}
                >
                  {selectedIdp.followup_1_completed ? <><Check size={14} /> Complete</> : "Mark Complete"}
                </Button>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border p-3">
                <div>
                  <div className="text-sm font-medium text-text">Follow-Up 2</div>
                  <div className="text-xs text-text-tertiary">
                    {selectedIdp.followup_2_date ? new Date(selectedIdp.followup_2_date).toLocaleDateString() : "No date set"}
                  </div>
                </div>
                <Button
                  variant={selectedIdp.followup_2_completed ? "primary" : "secondary"}
                  size="sm"
                  onClick={() => toggleFollowup(selectedIdp, 2)}
                >
                  {selectedIdp.followup_2_completed ? <><Check size={14} /> Complete</> : "Mark Complete"}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </>
    );
  }

  // ── Create View ──────────────────────────────────────────
  if (view === "create") {
    return (
      <>
        <Breadcrumbs />
        <PageHeader
          title="New IDP"
          subtitle={`CHAP-T.A.L.K.S. Individual Development Plan for ${displayName(person)}`}
          actions={<Button variant="secondary" onClick={() => setView("list")}><X size={16} /> Cancel</Button>}
        />

        <div className="space-y-6 max-w-3xl">
          {saveError && (
            <div className="rounded-lg bg-status-untrained/10 px-4 py-3 text-sm text-status-untrained">{saveError}</div>
          )}

          {/* Strengths & Needs */}
          <Card>
            <h3 className="text-sm font-semibold text-navy mb-3">Strengths to Maximize</h3>
            {strengths.map((s, i) => (
              <div key={i} className="mb-2 flex gap-2">
                <input
                  value={s}
                  onChange={(e) => { const n = [...strengths]; n[i] = e.target.value; setStrengths(n); }}
                  className="flex-1 h-10 rounded-lg border border-border bg-white px-3 text-sm text-text focus:border-fluent focus:ring-2 focus:ring-fluent-light focus:outline-none"
                  placeholder="Strength area..."
                />
              </div>
            ))}
            <Button variant="ghost" size="sm" onClick={() => setStrengths([...strengths, ""])}>+ Add Strength</Button>

            <h3 className="text-sm font-semibold text-navy mb-3 mt-6">Needs to Mitigate</h3>
            {needs.map((n, i) => (
              <div key={i} className="mb-2 flex gap-2">
                <input
                  value={n}
                  onChange={(e) => { const next = [...needs]; next[i] = e.target.value; setNeeds(next); }}
                  className="flex-1 h-10 rounded-lg border border-border bg-white px-3 text-sm text-text focus:border-fluent focus:ring-2 focus:ring-fluent-light focus:outline-none"
                  placeholder="Area for development..."
                />
              </div>
            ))}
            <Button variant="ghost" size="sm" onClick={() => setNeeds([...needs, ""])}>+ Add Need</Button>
          </Card>

          {/* Professional Goals */}
          <Card padding={false}>
            <CardHeader title="Professional Goals" accent="navy" action={
              <Button variant="ghost" size="sm" onClick={() => setProfGoals([...profGoals, { ...EMPTY_GOAL }])}>+ Add Goal</Button>
            } />
            <div className="divide-y divide-border">
              {profGoals.map((g, i) => (
                <div key={i} className="p-4 space-y-3">
                  <div className="text-xs font-medium text-text-tertiary">Goal {i + 1}</div>
                  <Input label="What" value={g.what} onChange={(e) => updateGoal("prof", i, "what", e.target.value)} placeholder="What do you want to accomplish?" />
                  <Input label="Why" value={g.why} onChange={(e) => updateGoal("prof", i, "why", e.target.value)} placeholder="Why is this important?" />
                  <Input label="How" value={g.how} onChange={(e) => updateGoal("prof", i, "how", e.target.value)} placeholder="How will you achieve it?" />
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Input label="When" value={g.when} onChange={(e) => updateGoal("prof", i, "when", e.target.value)} placeholder="Target date" />
                    <Input label="Support Needed" value={g.support} onChange={(e) => updateGoal("prof", i, "support", e.target.value)} placeholder="Resources or help needed" />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Personal Goals */}
          <Card padding={false}>
            <CardHeader title="Personal Goals" accent="gold" action={
              <Button variant="ghost" size="sm" onClick={() => setPersGoals([...persGoals, { ...EMPTY_GOAL }])}>+ Add Goal</Button>
            } />
            <div className="divide-y divide-border">
              {persGoals.map((g, i) => (
                <div key={i} className="p-4 space-y-3">
                  <div className="text-xs font-medium text-text-tertiary">Goal {i + 1}</div>
                  <Input label="What" value={g.what} onChange={(e) => updateGoal("pers", i, "what", e.target.value)} placeholder="What do you want to accomplish?" />
                  <Input label="Why" value={g.why} onChange={(e) => updateGoal("pers", i, "why", e.target.value)} placeholder="Why is this important?" />
                  <Input label="How" value={g.how} onChange={(e) => updateGoal("pers", i, "how", e.target.value)} placeholder="How will you achieve it?" />
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Input label="When" value={g.when} onChange={(e) => updateGoal("pers", i, "when", e.target.value)} placeholder="Target date" />
                    <Input label="Support Needed" value={g.support} onChange={(e) => updateGoal("pers", i, "support", e.target.value)} placeholder="Resources or help needed" />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Reflection */}
          <Card>
            <h3 className="text-sm font-semibold text-navy mb-3">Reflection Questions</h3>
            <div className="space-y-3">
              {[
                { key: "grateful_for", label: "What are you most grateful for in your current assignment?" },
                { key: "best", label: "What has been your best ministry moment recently?" },
                { key: "most_difficult", label: "What has been your most difficult challenge?" },
                { key: "growth", label: "Where do you see yourself growing?" },
                { key: "hopes", label: "What are your hopes for the next year?" },
              ].map((q) => (
                <div key={q.key}>
                  <label className="mb-1 block text-xs text-text-secondary">{q.label}</label>
                  <textarea
                    value={reflection[q.key] ?? ""}
                    onChange={(e) => setReflection((prev) => ({ ...prev, [q.key]: e.target.value }))}
                    rows={2}
                    className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-text focus:border-fluent focus:ring-2 focus:ring-fluent-light focus:outline-none"
                  />
                </div>
              ))}
            </div>
          </Card>

          {/* Follow-up dates */}
          <Card>
            <h3 className="text-sm font-semibold text-navy mb-3">Follow-Up Schedule</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <Input label="Follow-Up 1 Date" type="date" value={followup1Date} onChange={(e) => setFollowup1Date(e.target.value)} helperText="Recommended: 1 day after counseling" />
              <Input label="Follow-Up 2 Date" type="date" value={followup2Date} onChange={(e) => setFollowup2Date(e.target.value)} helperText="Recommended: 1 month after counseling" />
            </div>
          </Card>

          <div className="flex justify-end gap-3 pb-8">
            <Button variant="secondary" onClick={() => setView("list")}>Cancel</Button>
            <Button onClick={handleCreate} loading={saving}>Create IDP</Button>
          </div>
        </div>
      </>
    );
  }

  // ── List View ────────────────────────────────────────────
  return (
    <>
      <Breadcrumbs />
      <PageHeader
        title="IDP Management"
        subtitle={`Individual Development Plans for ${displayName(person)}`}
        actions={
          <div className="flex gap-2">
            <Button variant="secondary" onClick={() => router.back()}><ArrowLeft size={16} /> Back</Button>
            <Button onClick={() => setView("create")}><Plus size={16} /> New IDP</Button>
          </div>
        }
      />

      {idps.length === 0 ? (
        <EmptyState
          icon={<FileText size={40} />}
          title="No Individual Development Plans"
          description="Create an IDP using the CHAP-T.A.L.K.S. framework to support this individual's professional and personal development."
          actionLabel="Create First IDP"
          onAction={() => setView("create")}
        />
      ) : (
        <div className="space-y-3">
          {idps.map((idp) => (
            <Card
              key={idp.id}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => { setSelectedIdp(idp); setView("detail"); }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Badge color={idp.status === "active" ? "green" : idp.status === "completed" ? "gray" : "gold"}>
                      {idp.status}
                    </Badge>
                    <span className="text-sm text-text">
                      {new Date(idp.created_date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="mt-1 text-xs text-text-tertiary">
                    {idp.professional_goals.length} professional goals · {idp.personal_goals.length} personal goals
                    · {idp.strengths_to_maximize.length} strengths · {idp.needs_to_mitigate.length} needs
                  </div>
                </div>
                <div className="text-xs text-text-tertiary text-right">
                  {idp.followup_1_completed && idp.followup_2_completed ? (
                    <Badge color="green">All follow-ups complete</Badge>
                  ) : (
                    <span>{[idp.followup_1_completed, idp.followup_2_completed].filter(Boolean).length}/2 follow-ups</span>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
