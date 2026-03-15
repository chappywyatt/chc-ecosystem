"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { Select, type SelectOption } from "@/components/ui/Select";
import { Input } from "@/components/ui/Input";
import { StatusPill } from "@/components/ui/StatusPill";
import { EmptyState } from "@/components/ui/EmptyState";
import { SkeletonTable } from "@/components/ui/Skeleton";
import { Table, type Column } from "@/components/ui/Table";
import {
  useTrainingEvents,
  type TrainingEvent,
  type TrainingEventFilters,
} from "@/hooks/useTrainingEvents";
import { useOrganization } from "@/hooks/useOrganization";
import { Plus, ClipboardCheck } from "lucide-react";

const ratingOptions: SelectOption[] = [
  { value: "", label: "All Ratings" },
  { value: "T", label: "Trained (T)" },
  { value: "T_minus", label: "Trained- (T-)" },
  { value: "P", label: "Practiced (P)" },
  { value: "P_minus", label: "Practiced- (P-)" },
  { value: "U", label: "Untrained (U)" },
];

const contextOptions: SelectOption[] = [
  { value: "", label: "All Contexts" },
  { value: "garrison", label: "Garrison" },
  { value: "stx", label: "STX" },
  { value: "ftx", label: "FTX" },
  { value: "cpx", label: "CPX" },
  { value: "ctc", label: "CTC" },
  { value: "wfx", label: "WFX" },
  { value: "deployment", label: "Deployment" },
  { value: "home_station", label: "Home Station" },
  { value: "ltp", label: "LTP" },
  { value: "mfgi", label: "MFGI" },
];

const columns: Column<TrainingEvent>[] = [
  {
    key: "date",
    header: "Date",
    sortable: true,
    render: (row) => new Date(row.date).toLocaleDateString(),
    className: "whitespace-nowrap",
  },
  {
    key: "task_id",
    header: "Task",
    sortable: true,
    render: (row) => (
      <div>
        <span className="font-mono text-xs text-text-tertiary">{row.task_id}</span>
        <div className="text-sm text-text truncate max-w-[250px]">
          {row.task?.title ?? "—"}
        </div>
      </div>
    ),
  },
  {
    key: "organization",
    header: "Unit",
    render: (row) => (
      <span className="text-sm">{row.organization?.name ?? "—"}</span>
    ),
  },
  {
    key: "rating",
    header: "Rating",
    sortable: true,
    render: (row) =>
      row.rating ? (
        <StatusPill status={row.rating as "T" | "T_minus" | "P" | "P_minus" | "U"} />
      ) : (
        <span className="text-text-tertiary">—</span>
      ),
    className: "text-center",
  },
  {
    key: "context",
    header: "Context",
    sortable: true,
    render: (row) => (
      <span className="text-sm capitalize">{row.context.replace(/_/g, " ")}</span>
    ),
  },
  {
    key: "location",
    header: "Location",
    render: (row) => (
      <span className="text-sm text-text-secondary">{row.location || "—"}</span>
    ),
  },
];

export default function TrainingEventsPage() {
  const router = useRouter();
  const { fetchEvents, loading: eventsLoading } = useTrainingEvents();
  const { fetchAllOrgs } = useOrganization();
  const [events, setEvents] = useState<TrainingEvent[]>([]);
  const [loaded, setLoaded] = useState(false);

  const [filters, setFilters] = useState<TrainingEventFilters>({});
  const [filterRating, setFilterRating] = useState("");
  const [filterContext, setFilterContext] = useState("");
  const [filterDateFrom, setFilterDateFrom] = useState("");
  const [filterDateTo, setFilterDateTo] = useState("");

  const loadEvents = useCallback(async () => {
    const orgs = await fetchAllOrgs();
    const orgIds = orgs.map((o) => o.id);
    if (orgIds.length === 0) {
      setLoaded(true);
      return;
    }
    const activeFilters: TrainingEventFilters = {};
    if (filterRating) activeFilters.rating = filterRating;
    if (filterContext) activeFilters.context = filterContext;
    if (filterDateFrom) activeFilters.dateFrom = filterDateFrom;
    if (filterDateTo) activeFilters.dateTo = filterDateTo;

    const ev = await fetchEvents(orgIds, activeFilters);
    setEvents(ev);
    setLoaded(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterRating, filterContext, filterDateFrom, filterDateTo]);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  const loading = !loaded && eventsLoading;

  return (
    <>
      <Breadcrumbs />
      <PageHeader
        title="Training Events"
        subtitle="All training events across your organization"
        actions={
          <Link href="/training/events/new">
            <Button>
              <Plus size={16} />
              Log Event
            </Button>
          </Link>
        }
      />

      {/* Filters */}
      <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Input
          label="From Date"
          type="date"
          value={filterDateFrom}
          onChange={(e) => setFilterDateFrom(e.target.value)}
        />
        <Input
          label="To Date"
          type="date"
          value={filterDateTo}
          onChange={(e) => setFilterDateTo(e.target.value)}
        />
        <Select
          label="Rating"
          options={ratingOptions}
          value={filterRating}
          onChange={(e) => setFilterRating(e.target.value)}
        />
        <Select
          label="Context"
          options={contextOptions}
          value={filterContext}
          onChange={(e) => setFilterContext(e.target.value)}
        />
      </div>

      {loading ? (
        <SkeletonTable rows={8} />
      ) : events.length === 0 ? (
        <EmptyState
          icon={<ClipboardCheck size={40} />}
          title="No training events found"
          description={
            loaded && filterRating === "" && filterContext === ""
              ? "Start logging training events to build your unit's readiness picture."
              : "No events match your current filters. Try adjusting your search criteria."
          }
          actionLabel={
            filterRating === "" && filterContext === ""
              ? "Log First Event"
              : undefined
          }
          onAction={
            filterRating === "" && filterContext === ""
              ? () => router.push("/training/events/new")
              : undefined
          }
        />
      ) : (
        <Table<TrainingEvent>
          columns={columns}
          data={events}
          keyField="id"
          onRowClick={(row) => router.push(`/training/events/${row.id}`)}
        />
      )}
    </>
  );
}
