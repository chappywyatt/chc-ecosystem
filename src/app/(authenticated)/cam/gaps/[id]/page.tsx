"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { StatusPill, type GapStatus } from "@/components/ui/StatusPill";
import { Select, type SelectOption } from "@/components/ui/Select";
import { Modal } from "@/components/ui/Modal";
import { SkeletonCard } from "@/components/ui/Skeleton";
import { GapPipeline } from "@/components/charts/GapPipeline";
import { useCapabilityGaps, type CapabilityGap } from "@/hooks/useCapabilityGaps";
import { useDotmlpfAnalysis, type DotmlpfAnalysis } from "@/hooks/useDotmlpfAnalysis";
import { DOTMLPF_DOMAINS, DOMAIN_COLORS } from "@/lib/constants/dotmlpf";
import { ArrowLeft, Play, FileText, Check, Clock } from "lucide-react";

const severityColors: Record<string, "red" | "orange" | "gold" | "gray"> = {
  critical: "red", significant: "orange", moderate: "gold", minor: "gray",
};

const STATUS_ORDER: GapStatus[] = ["identified", "under_analysis", "documented", "submitted", "in_progress", "resolved"];

const statusTransitions: SelectOption[] = [
  { value: "identified", label: "Identified" },
  { value: "under_analysis", label: "Under Analysis" },
  { value: "documented", label: "Documented" },
  { value: "submitted", label: "Submitted" },
  { value: "in_progress", label: "In Progress" },
  { value: "resolved", label: "Resolved" },
  { value: "deferred", label: "Deferred" },
];

export default function GapDetailPage() {
  const params = useParams();
  const router = useRouter();
  const gapId = params.id as string;
  const { fetchGap, updateGap, loading } = useCapabilityGaps();
  const { fetchAnalyses } = useDotmlpfAnalysis();

  const [gap, setGap] = useState<CapabilityGap | null>(null);
  const [analyses, setAnalyses] = useState<DotmlpfAnalysis[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [newStatus, setNewStatus] = useState("");

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const [g, a] = await Promise.all([fetchGap(gapId), fetchAnalyses(gapId)]);
      if (!cancelled) { setGap(g); setAnalyses(a); setLoaded(true); }
    }
    load();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gapId]);

  const handleUpdateStatus = async () => {
    if (!gap || !newStatus) return;
    const result = await updateGap(gap.id, { status: newStatus } as Partial<CapabilityGap>);
    if (result) { setGap(result); setShowStatusModal(false); }
  };

  if (!loaded) return <><Breadcrumbs /><PageHeader title="Gap Detail" /><div className="space-y-4"><SkeletonCard /><SkeletonCard /></div></>;

  if (!gap) return (
    <><Breadcrumbs /><PageHeader title="Gap Detail" /><Card><div className="py-12 text-center"><p className="text-text-secondary mb-4">Gap not found.</p>
    <Button variant="secondary" onClick={() => router.push("/cam/gaps")}><ArrowLeft size={16} /> Back</Button></div></Card></>
  );

  const analyzedDomains = new Set(analyses.map((a) => a.domain));
  const totalDomains = gap.dotmlpf_domains.length;
  const analyzedCount = gap.dotmlpf_domains.filter((d) => analyzedDomains.has(d)).length;
  const coreAnalyzed = ["doctrine", "organization", "training"].every((d) => analyzedDomains.has(d));

  // Build status pipeline highlighting current
  const pipelineCounts: Record<string, number> = {};
  STATUS_ORDER.forEach((s) => { pipelineCounts[s] = s === gap.status ? 1 : 0; });

  return (
    <>
      <Breadcrumbs />
      <PageHeader
        title={gap.title}
        subtitle="Capability Gap Detail"
        actions={
          <div className="flex gap-2">
            <Button variant="secondary" onClick={() => router.back()}><ArrowLeft size={16} /> Back</Button>
            <Button variant="secondary" onClick={() => { setNewStatus(gap.status); setShowStatusModal(true); }}>Update Status</Button>
            <Link href={`/cam/gaps/${gap.id}/analyze`}><Button><Play size={16} /> {analyzedCount > 0 ? "Continue" : "Start"} Analysis</Button></Link>
          </div>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {/* Status Tracker */}
          <Card>
            <div className="flex items-center gap-2 mb-4">
              {STATUS_ORDER.map((status, idx) => {
                const isCurrent = status === gap.status;
                const isPast = STATUS_ORDER.indexOf(gap.status as GapStatus) > idx;
                return (
                  <div key={status} className="flex items-center gap-2 flex-1">
                    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold
                      ${isCurrent ? "bg-fluent text-white ring-2 ring-fluent-light" : isPast ? "bg-status-trained text-white" : "bg-border text-text-tertiary"}`}>
                      {isPast ? <Check size={14} /> : idx + 1}
                    </div>
                    {idx < STATUS_ORDER.length - 1 && (
                      <div className={`h-0.5 flex-1 ${isPast ? "bg-status-trained" : "bg-border"}`} />
                    )}
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between text-[10px] text-text-tertiary">
              {STATUS_ORDER.map((s) => (
                <span key={s} className={`${s === gap.status ? "font-bold text-fluent" : ""}`}>
                  {s.replace(/_/g, " ")}
                </span>
              ))}
            </div>
          </Card>

          {/* Gap Information */}
          <Card padding={false}>
            <CardHeader title="Gap Information" accent="navy" />
            <div className="p-6 space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge color={severityColors[gap.severity]}>{gap.severity}</Badge>
                <StatusPill status={gap.status as GapStatus} />
                <Badge color="gray">{gap.solution_pathway.replace(/_/g, " ")}</Badge>
                <Badge color="fluent">{gap.source_type.replace(/_/g, " ")}</Badge>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-text-tertiary uppercase mb-1">Description</h4>
                <p className="text-sm text-text">{gap.description}</p>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-text-tertiary uppercase mb-1">Operational Impact</h4>
                <p className="text-sm text-text">{gap.operational_impact}</p>
              </div>
              {gap.source_description && (
                <div>
                  <h4 className="text-xs font-semibold text-text-tertiary uppercase mb-1">Source Evidence</h4>
                  <p className="text-sm text-text-secondary">{gap.source_description}</p>
                </div>
              )}
              {gap.proposed_solution && (
                <div>
                  <h4 className="text-xs font-semibold text-text-tertiary uppercase mb-1">Proposed Solution</h4>
                  <p className="text-sm text-text">{gap.proposed_solution}</p>
                </div>
              )}
            </div>
          </Card>

          {/* DOTMLPF-P Analysis Status */}
          <Card padding={false}>
            <CardHeader title="DOTMLPF-P Analysis" subtitle={`${analyzedCount} of ${totalDomains} domains analyzed`}
              action={<Link href={`/cam/gaps/${gap.id}/analyze`}><Button variant="ghost" size="sm"><Play size={12} /> Open Workspace</Button></Link>} />
            <div className="divide-y divide-border">
              {gap.dotmlpf_domains.map((domainId) => {
                const analysis = analyses.find((a) => a.domain === domainId);
                const domainDef = DOTMLPF_DOMAINS.find((d) => d.id === domainId);
                return (
                  <div key={domainId} className="flex items-center gap-3 px-6 py-3">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: DOMAIN_COLORS[domainId] ?? "#ccc" }} />
                    <span className="flex-1 text-sm font-medium text-text">{domainDef?.name ?? domainId}</span>
                    {analysis ? (
                      <Badge color="green"><Check size={10} className="mr-1" /> Analyzed</Badge>
                    ) : (
                      <Badge color="gray"><Clock size={10} className="mr-1" /> Pending</Badge>
                    )}
                    {analysis?.confidence_level && (
                      <Badge color={analysis.confidence_level === "high" ? "green" : analysis.confidence_level === "medium" ? "gold" : "orange"}>
                        {analysis.confidence_level}
                      </Badge>
                    )}
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <Card>
            <h3 className="text-sm font-semibold text-navy mb-3">Scope</h3>
            {gap.affected_echelons.length > 0 && (
              <div className="mb-3">
                <div className="text-xs text-text-tertiary mb-1">Echelons</div>
                <div className="flex flex-wrap gap-1">{gap.affected_echelons.map((e) => <Badge key={e} color="navy">{e}</Badge>)}</div>
              </div>
            )}
            {gap.affected_compos.length > 0 && (
              <div className="mb-3">
                <div className="text-xs text-text-tertiary mb-1">Components</div>
                <div className="flex flex-wrap gap-1">{gap.affected_compos.map((c) => <Badge key={c} color="fluent">{c}</Badge>)}</div>
              </div>
            )}
            <div>
              <div className="text-xs text-text-tertiary mb-1">Domains</div>
              <div className="flex flex-wrap gap-1">{gap.dotmlpf_domains.map((d) => <Badge key={d} color="gold">{d}</Badge>)}</div>
            </div>
          </Card>

          {gap.doctrinal_references.length > 0 && (
            <Card>
              <h3 className="text-sm font-semibold text-navy mb-2">References</h3>
              {gap.doctrinal_references.map((ref, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-text mb-1">
                  <FileText size={12} className="text-text-tertiary" />{ref}
                </div>
              ))}
            </Card>
          )}

          {coreAnalyzed && (
            <Link href={`/cam/reports?gapId=${gap.id}`}>
              <Button className="w-full"><FileText size={16} /> Generate DCR Draft</Button>
            </Link>
          )}

          <Card>
            <div className="space-y-1.5 text-xs text-text-tertiary">
              <div>Created: {new Date(gap.created_at).toLocaleString()}</div>
              <div>Updated: {new Date(gap.updated_at).toLocaleString()}</div>
              <div className="font-mono truncate">ID: {gap.id}</div>
            </div>
          </Card>
        </div>
      </div>

      {/* Status Update Modal */}
      <Modal open={showStatusModal} onClose={() => setShowStatusModal(false)} title="Update Gap Status"
        confirmLabel="Update" onConfirm={handleUpdateStatus} loading={loading}>
        <Select label="New Status" options={statusTransitions} value={newStatus} onChange={(e) => setNewStatus(e.target.value)} />
      </Modal>
    </>
  );
}
