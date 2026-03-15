"use client";

import { useEffect, useState, useMemo, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { Wizard, type WizardStep } from "@/components/ui/Wizard";
import { Input } from "@/components/ui/Input";
import { Select, type SelectOption } from "@/components/ui/Select";
import { Badge } from "@/components/ui/Badge";
import { Skeleton } from "@/components/ui/Skeleton";
import { useCapabilityGaps, type CreateGapData } from "@/hooks/useCapabilityGaps";
import { useTasks, type Task } from "@/hooks/useTasks";
import { DOTMLPF_DOMAINS } from "@/lib/constants/dotmlpf";

const severityOptions: SelectOption[] = [
  { value: "critical", label: "Critical — Mission failure likely" },
  { value: "significant", label: "Significant — Major degradation" },
  { value: "moderate", label: "Moderate — Partial impact" },
  { value: "minor", label: "Minor — Minimal impact" },
];

const sourceTypeOptions: SelectOption[] = [
  { value: "gauge_trend", label: "Gauge trend (behavioral observation pattern)" },
  { value: "readiness_gap", label: "Readiness gap (training proficiency data)" },
  { value: "oct_observation", label: "OC/T observation (CTC/WFX AAR data)" },
  { value: "cer_trend", label: "CER/Compass trend (evaluation pattern)" },
  { value: "compass_trend", label: "Compass trend (360° feedback decline)" },
  { value: "teo_analysis", label: "T&EO analysis (standards gap)" },
  { value: "other", label: "Other" },
];

const echelonOptions = ["battalion", "brigade", "division", "corps", "theater"];
const compoOptions = [
  { value: "active", label: "Active Duty" },
  { value: "arng", label: "Army National Guard" },
  { value: "usar", label: "Army Reserve" },
];

export default function NewGapPage() {
  return (
    <Suspense fallback={<><Breadcrumbs /><PageHeader title="Report New Gap" /><Card><Skeleton className="h-64 w-full" /></Card></>}>
      <NewGapContent />
    </Suspense>
  );
}

function NewGapContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const prefilledTaskId = searchParams.get("taskId");

  const { createGap, loading: submitting, error: submitError } = useCapabilityGaps();
  const { fetchTask } = useTasks();
  const [prefilledTask, setPrefilledTask] = useState<Task | null>(null);

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [operationalImpact, setOperationalImpact] = useState("");
  const [severity, setSeverity] = useState("moderate");
  const [sourceType, setSourceType] = useState("other");
  const [sourceDescription, setSourceDescription] = useState("");
  const [docRefs, setDocRefs] = useState<string[]>([""]);
  const [selectedDomains, setSelectedDomains] = useState<Set<string>>(new Set());
  const [selectedEchelons, setSelectedEchelons] = useState<Set<string>>(new Set());
  const [selectedCompos, setSelectedCompos] = useState<Set<string>>(new Set());
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Pre-fill from task
  useEffect(() => {
    if (prefilledTaskId) {
      fetchTask(prefilledTaskId).then((t) => {
        if (t) {
          setPrefilledTask(t);
          setTitle(`${t.id} — ${t.has_teo ? "Proficiency gap" : "T&EO gap"}: ${t.title}`);
          setSourceType(t.has_teo ? "readiness_gap" : "teo_analysis");
          setSourceDescription(t.teo_gap_notes || `Task ${t.id} identified through task analysis`);
          if (t.doctrinal_source.length > 0) setDocRefs(t.doctrinal_source);
          setSelectedEchelons(new Set([t.echelon]));
          if (!t.has_teo) {
            setSelectedDomains(new Set(["doctrine", "training"]));
            setSeverity("significant");
          }
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefilledTaskId]);

  const toggleDomain = (d: string) => {
    setSelectedDomains((prev) => { const n = new Set(prev); n.has(d) ? n.delete(d) : n.add(d); return n; });
  };
  const toggleEchelon = (e: string) => {
    setSelectedEchelons((prev) => { const n = new Set(prev); n.has(e) ? n.delete(e) : n.add(e); return n; });
  };
  const toggleCompo = (c: string) => {
    setSelectedCompos((prev) => { const n = new Set(prev); n.has(c) ? n.delete(c) : n.add(c); return n; });
  };

  const handleSubmit = async () => {
    const data: CreateGapData = {
      title,
      description,
      operational_impact: operationalImpact,
      severity,
      source_type: sourceType,
      source_description: sourceDescription || undefined,
      doctrinal_references: docRefs.filter((r) => r.trim()),
      dotmlpf_domains: Array.from(selectedDomains),
      affected_echelons: Array.from(selectedEchelons),
      affected_compos: Array.from(selectedCompos),
    };
    const result = await createGap(data);
    if (result) router.push(`/cam/gaps/${result.id}`);
  };

  const steps: WizardStep[] = [
    {
      title: "Identify the Gap",
      description: "Describe the missing or inadequate capability.",
      validate: () => {
        const errs: Record<string, string> = {};
        if (!title.trim()) errs.title = "Title is required";
        if (!description.trim()) errs.description = "Description is required";
        if (!operationalImpact.trim()) errs.impact = "Operational impact is required";
        setErrors(errs);
        return Object.keys(errs).length === 0;
      },
      content: (
        <div className="space-y-4">
          {prefilledTask && (
            <div className="rounded-lg bg-fluent-light/30 px-4 py-3 text-sm text-text">
              Pre-populated from task <span className="font-mono font-bold">{prefilledTask.id}</span>
            </div>
          )}
          <Input label="Gap Title" value={title} onChange={(e) => setTitle(e.target.value)} required error={errors.title} placeholder="Short, descriptive title" />
          <div>
            <label className="mb-1.5 block text-sm font-medium text-text">Description <span className="text-status-untrained">*</span></label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3}
              className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-text focus:border-fluent focus:ring-2 focus:ring-fluent-light focus:outline-none"
              placeholder="What capability is missing or inadequate?" />
            {errors.description && <p className="mt-1 text-sm text-status-untrained">{errors.description}</p>}
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-text">Operational Impact <span className="text-status-untrained">*</span></label>
            <textarea value={operationalImpact} onChange={(e) => setOperationalImpact(e.target.value)} rows={3}
              className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-text focus:border-fluent focus:ring-2 focus:ring-fluent-light focus:outline-none"
              placeholder="How does this gap affect LSCO readiness?" />
            {errors.impact && <p className="mt-1 text-sm text-status-untrained">{errors.impact}</p>}
          </div>
          <Select label="Severity" options={severityOptions} value={severity} onChange={(e) => setSeverity(e.target.value)} required />
        </div>
      ),
    },
    {
      title: "Link Sources",
      description: "How was this gap identified? Link supporting evidence.",
      content: (
        <div className="space-y-4">
          <Select label="Source Type" options={sourceTypeOptions} value={sourceType} onChange={(e) => setSourceType(e.target.value)} />
          <div>
            <label className="mb-1.5 block text-sm font-medium text-text">Supporting Evidence</label>
            <textarea value={sourceDescription} onChange={(e) => setSourceDescription(e.target.value)} rows={3}
              className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-text focus:border-fluent focus:ring-2 focus:ring-fluent-light focus:outline-none"
              placeholder="Describe the evidence that supports this gap identification..." />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-text">Doctrinal References</label>
            {docRefs.map((ref, i) => (
              <div key={i} className="mb-2">
                <input value={ref} onChange={(e) => { const n = [...docRefs]; n[i] = e.target.value; setDocRefs(n); }}
                  className="h-10 w-full rounded-lg border border-border bg-white px-3 text-sm text-text focus:border-fluent focus:ring-2 focus:ring-fluent-light focus:outline-none"
                  placeholder="e.g., FM 3-83, Para 4-12" />
              </div>
            ))}
            <button onClick={() => setDocRefs([...docRefs, ""])} className="text-xs text-fluent hover:underline">+ Add Reference</button>
          </div>
        </div>
      ),
    },
    {
      title: "Define Scope",
      description: "Which echelons, components, and DOTMLPF-P domains are affected?",
      content: (
        <div className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-text">Affected Echelons</label>
            <div className="flex flex-wrap gap-2">
              {echelonOptions.map((e) => (
                <button key={e} onClick={() => toggleEchelon(e)}
                  className={`rounded-lg border-2 px-4 py-2 text-sm font-medium capitalize transition-all
                    ${selectedEchelons.has(e) ? "border-fluent bg-fluent-light text-fluent" : "border-border text-text-secondary hover:border-fluent/30"}`}>
                  {e}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-text">Affected Components</label>
            <div className="flex flex-wrap gap-2">
              {compoOptions.map((c) => (
                <button key={c.value} onClick={() => toggleCompo(c.value)}
                  className={`rounded-lg border-2 px-4 py-2 text-sm font-medium transition-all
                    ${selectedCompos.has(c.value) ? "border-fluent bg-fluent-light text-fluent" : "border-border text-text-secondary hover:border-fluent/30"}`}>
                  {c.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-text">DOTMLPF-P Domains (initial assessment)</label>
            <div className="grid gap-2 sm:grid-cols-2">
              {DOTMLPF_DOMAINS.map((d) => (
                <button key={d.id} onClick={() => toggleDomain(d.id)}
                  className={`flex items-center gap-2 rounded-lg border-2 px-4 py-2.5 text-left transition-all
                    ${selectedDomains.has(d.id) ? "border-fluent bg-fluent-light" : "border-border hover:border-fluent/30"}`}>
                  <input type="checkbox" checked={selectedDomains.has(d.id)} readOnly className="h-4 w-4 rounded border-border text-fluent" />
                  <span className="text-sm font-medium text-text">{d.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Review and Submit",
      description: "Verify all information before submitting.",
      content: (
        <div className="space-y-4">
          {submitError && <div className="rounded-lg bg-status-untrained/10 px-4 py-3 text-sm text-status-untrained">{submitError}</div>}
          <div className="rounded-lg border border-border bg-surface p-4 space-y-3">
            <div><div className="text-xs text-text-tertiary">Title</div><div className="text-sm font-medium text-text">{title}</div></div>
            <div><div className="text-xs text-text-tertiary">Severity</div><Badge color={severity === "critical" ? "red" : severity === "significant" ? "orange" : "gold"}>{severity}</Badge></div>
            <div><div className="text-xs text-text-tertiary">Source</div><div className="text-sm text-text capitalize">{sourceType.replace(/_/g, " ")}</div></div>
            <div><div className="text-xs text-text-tertiary">Domains</div><div className="flex gap-1 flex-wrap">{Array.from(selectedDomains).map((d) => <Badge key={d} color="navy">{d}</Badge>)}</div></div>
            <div><div className="text-xs text-text-tertiary">Echelons</div><div className="flex gap-1 flex-wrap">{Array.from(selectedEchelons).map((e) => <Badge key={e} color="fluent">{e}</Badge>)}</div></div>
            {description && <div><div className="text-xs text-text-tertiary">Description</div><div className="text-sm text-text">{description}</div></div>}
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      <Breadcrumbs />
      <PageHeader title="Report New Gap" subtitle="Capability Gap Entry Wizard" />
      <Card className="max-w-2xl">
        <Wizard steps={steps} onComplete={handleSubmit} onCancel={() => router.push("/cam/gaps")} completeLabel="Submit Gap" loading={submitting} />
      </Card>
    </>
  );
}
