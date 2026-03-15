"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Select, type SelectOption } from "@/components/ui/Select";
import { StatusPill, type GapStatus } from "@/components/ui/StatusPill";
import { EmptyState } from "@/components/ui/EmptyState";
import { SkeletonTable } from "@/components/ui/Skeleton";
import { Table, type Column } from "@/components/ui/Table";
import { useCapabilityGaps, type CapabilityGap } from "@/hooks/useCapabilityGaps";
import { Plus, BarChart3 } from "lucide-react";

const statusOptions: SelectOption[] = [
  { value: "", label: "All Statuses" },
  { value: "identified", label: "Identified" },
  { value: "under_analysis", label: "Under Analysis" },
  { value: "documented", label: "Documented" },
  { value: "submitted", label: "Submitted" },
  { value: "in_progress", label: "In Progress" },
  { value: "resolved", label: "Resolved" },
];

const severityOptions: SelectOption[] = [
  { value: "", label: "All Severities" },
  { value: "critical", label: "Critical" },
  { value: "significant", label: "Significant" },
  { value: "moderate", label: "Moderate" },
  { value: "minor", label: "Minor" },
];

const pathwayOptions: SelectOption[] = [
  { value: "", label: "All Pathways" },
  { value: "dcr", label: "DCR" },
  { value: "icd", label: "ICD" },
  { value: "training_revision", label: "Training Revision" },
  { value: "policy_change", label: "Policy Change" },
  { value: "org_change", label: "Org Change" },
  { value: "pending_analysis", label: "Pending Analysis" },
];

const severityDots: Record<string, number> = { critical: 4, significant: 3, moderate: 2, minor: 1 };
const severityColors: Record<string, string> = { critical: "text-status-untrained", significant: "text-pillar-connection", moderate: "text-status-practiced", minor: "text-text-tertiary" };

const columns: Column<CapabilityGap>[] = [
  {
    key: "severity",
    header: "Sev.",
    render: (row) => (
      <span className={`text-lg tracking-tight ${severityColors[row.severity] ?? ""}`}>
        {"●".repeat(severityDots[row.severity] ?? 1)}
      </span>
    ),
    className: "w-16",
  },
  {
    key: "title",
    header: "Title",
    sortable: true,
    render: (row) => <span className="text-sm font-medium text-text">{row.title}</span>,
  },
  {
    key: "status",
    header: "Status",
    sortable: true,
    render: (row) => <StatusPill status={row.status as GapStatus} />,
  },
  {
    key: "solution_pathway",
    header: "Pathway",
    sortable: true,
    render: (row) => (
      <Badge color="gray">{row.solution_pathway.replace(/_/g, " ")}</Badge>
    ),
  },
  {
    key: "dotmlpf_domains",
    header: "Domains",
    render: (row) => (
      <div className="flex flex-wrap gap-1">
        {row.dotmlpf_domains.slice(0, 3).map((d) => (
          <Badge key={d} color="navy">{d.charAt(0).toUpperCase()}</Badge>
        ))}
        {row.dotmlpf_domains.length > 3 && (
          <Badge color="gray">+{row.dotmlpf_domains.length - 3}</Badge>
        )}
      </div>
    ),
  },
  {
    key: "updated_at",
    header: "Updated",
    sortable: true,
    render: (row) => <span className="text-xs text-text-tertiary">{new Date(row.updated_at).toLocaleDateString()}</span>,
  },
];

export default function GapRegisterPage() {
  const router = useRouter();
  const { fetchGaps, loading } = useCapabilityGaps();
  const [gaps, setGaps] = useState<CapabilityGap[]>([]);
  const [loaded, setLoaded] = useState(false);

  const [filterStatus, setFilterStatus] = useState("");
  const [filterSeverity, setFilterSeverity] = useState("");
  const [filterPathway, setFilterPathway] = useState("");

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const data = await fetchGaps();
      if (!cancelled) { setGaps(data); setLoaded(true); }
    }
    load();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = useMemo(() => {
    let result = gaps;
    if (filterStatus) result = result.filter((g) => g.status === filterStatus);
    if (filterSeverity) result = result.filter((g) => g.severity === filterSeverity);
    if (filterPathway) result = result.filter((g) => g.solution_pathway === filterPathway);
    return result;
  }, [gaps, filterStatus, filterSeverity, filterPathway]);

  return (
    <>
      <Breadcrumbs />
      <PageHeader
        title="Capability Gap Register"
        subtitle={`${gaps.length} gaps tracked`}
        actions={
          <Link href="/cam/gaps/new"><Button><Plus size={16} /> New Gap</Button></Link>
        }
      />

      <div className="mb-6 grid gap-3 sm:grid-cols-3">
        <Select label="Status" options={statusOptions} value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} />
        <Select label="Severity" options={severityOptions} value={filterSeverity} onChange={(e) => setFilterSeverity(e.target.value)} />
        <Select label="Pathway" options={pathwayOptions} value={filterPathway} onChange={(e) => setFilterPathway(e.target.value)} />
      </div>

      {!loaded ? (
        <SkeletonTable rows={6} />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={<BarChart3 size={40} />}
          title="No gaps found"
          description={gaps.length === 0 ? "Report your first capability gap to begin tracking." : "No gaps match your filters."}
          actionLabel={gaps.length === 0 ? "Report First Gap" : undefined}
          onAction={gaps.length === 0 ? () => router.push("/cam/gaps/new") : undefined}
        />
      ) : (
        <Table<CapabilityGap>
          columns={columns}
          data={filtered}
          keyField="id"
          onRowClick={(row) => router.push(`/cam/gaps/${row.id}`)}
        />
      )}
    </>
  );
}
